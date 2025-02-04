import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bcrypt, { compare } from "bcrypt";
import passport from "passport";
import pool from "../Config/db.js";
import "../Config/Passport.js";
import path from "path";

console.log("Resolved Path:", path.resolve("Config/db.js"));


const router=express();
const saltRounds = 10;

router.get('/checkauth', (req, res) => {
  try {
      console.log("Session ID:", req.sessionID);
      console.log("Stored User in Session:", req.user); // Debugging Google login issue

      if (req.user) { 
          return res.status(200).json({ isAuthenticated: true, user: req.user });
      } else {
          return res.status(200).json({ isAuthenticated: false });
      }
  } catch (error) {
      console.error("Error checking authentication:", error);
      return res.status(500).json({ message: "Internal server error. Please try again." });
  }
});

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
      if (err) {
          console.error("Logout error:", err);
          return res.status(500).json({ message: "Logout failed. Please try again." });
      }

      req.session.destroy((err) => {
          if (err) {
              console.error("Session destruction error:", err);
              return res.status(500).json({ message: "Error clearing session. Please try again." });
          }

          res.clearCookie("connect.sid"); // Ensure cookie is removed
          return res.status(200).json({ message: "Logged out successfully." });
      });
  });
});

router.get("/portfolio", async (req, res) => {
  console.log(req.user.id);
  try{
   
    if(!req.isAuthenticated()){
     return res.status(401).json({message:'Unauthorized. Please log in'});
    }
    const [rows, fields] = await pool.query(
      "SELECT * FROM user_stocks WHERE user_id = ?",
      [req.user.id]
    );
    if (rows.length === 0) {
      return res.json({ message: "No stocks available", stocks: [] });
    }
    res.json({message:'Success', stocks:rows});
  } 
  catch(err){
   console.log('Error fetching: ',err);
   res.status(500).json({message:'Server error, Please try again'});
  }
 
   
});


router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error." });
    }
    if (!user) {
      return res.status(401).json({ message: info.message || "Invalid credentials." });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed." });
      }
      return res.status(200).json({ message: "Login successful.", user });
    });
  })(req, res, next);
});


router.post("/register", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = String(req.body.password);

  try {
    // MySQL query to check if user exists
    const [checkResult] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    console.log(checkResult);
    if (checkResult.length > 0) {
      return res.status(409).json({ error: 'User already registered with this email.' });
    } else {
      // Hashing the password
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).json({ error: err });
        }

        
        try {
          const [insertResult] = await pool.query(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [email, hash]
          );

          
          const newUserId = insertResult.insertId;
          req.login({ id: newUserId }, (err) => {
            if (err) {
              console.error('Error logging in after registration:', err);
              return res.status(500).json({ message: 'Registration successful but login failed.' });
            }
            return res.status(201).json({ message: 'Registration and login successful.', userId: newUserId });
          });
         
        } catch (insertErr) {
          console.error("Error registering user:", insertErr);
          return res.status(500).json({ message: "Registration failed", error: insertErr.message });
        }
      });
    }
  } catch (err) {
    console.log('Error checking user:', err);
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});


export default router;

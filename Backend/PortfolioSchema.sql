CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    google_ID VARCHAR(255) 
);
CREATE TABLE user_stocks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    stock_name VARCHAR(255) NOT NULL,
    ticker VARCHAR(20) ,
    quantity INT DEFAULT 1, 
    price DOUBLE ,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE sessions(
sid VARCHAR PRIMARY KEY,
sess JSON NOT NULL,
expire TIMESTAMP NOT NULL 
);

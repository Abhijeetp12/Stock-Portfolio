# Stock Portfolio Tracker

## Overview

The **Stock Portfolio Tracker** is a web application designed to help users manage and track their stock investments efficiently. Users can add stocks to their portfolio, view real-time price updates, and analyze performance over time. The project consists of a **React** frontend and a **Node.js** backend.

## Features

- User authentication and portfolio management
- Add, edit, and remove stocks from the portfolio
- Real-time stock price updates
- Responsive UI for seamless access across devices

## Tech Stack

### Frontend:

- React.js (with Vite)
- Tailwind CSS / Bootstrap for styling

### Backend:

- Node.js with Express.js
- MySQL for database management
- Axios for fetching real-time stock data
- Session and Passport.js for authentication

### API Usage

This project fetches real-time stock data using the **Alpha Vantage API**. Ensure you have an API key and add it to your `.env` file as follows:

```env
API_URL="https://www.alphavantage.co"
API_KEY="your_alpha_vantage_api_key"
```

For more details, visit [Alpha Vantage API documentation](https://www.alphavantage.co/documentation/).

## Installation & Setup

### Prerequisites:

- Node.js installed on your system
- MySQL database setup

### Steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/stock-portfolio-tracker.git
   cd stock-portfolio-tracker
   ```

2. **Install dependencies**

   ```bash
   # Backend setup
   cd backend
   npm install
   ```

   ```bash
   # Frontend setup
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**

   - Create a `.env` file in the backend directory and add:
     ```env
     DB_USER="your_db_user"
     DB_HOST="your_db_host"
     DB_NAME="your_db_name"
     DB_PASSWORD="your_db_password"
     DB_PORT=your_db_port
     GOOGLE_CLIENT_ID="your_google_client_id"
     GOOGLE_CLIENT_SECRET="your_google_client_secret"
     GOOGLE_CALLBACK_URL="your_google_callback_url"
     SESSION_SECRET="your_session_secret"
     API_URL="your_api_url"
     API_KEY="your_api_key"
     ```

4. **MySQL Setup**

   - Create a MySQL database using the credentials above.
   - Run the SQL script to set up the necessary tables.

5. **Start the development servers**

   ```bash
   # Start backend server
   cd backend
   npm run dev
   ```

   ```bash
   # Start frontend server
   cd frontend
   npm run dev
   ```

6. **Access the application**

   - Open `http://localhost:3000` in your browser

## API Endpoints

| Method   | Endpoint                      | Description                      |
| -------- | ----------------------------- | -------------------------------- |
| `GET`    | `/checkauth`                  | Check user authentication status |
| `GET`    | `/logout`                     | Logout user                      |
| `GET`    | `/portfolio`                  | Fetch user's portfolio           |
| `POST`   | `/login`                      | User login                       |
| `POST`   | `/register`                   | Register a new user              |
| `GET`    | `/auth/google`                | Google OAuth authentication      |
| `GET`    | `/auth/google/portfolio`      | Google OAuth callback            |
| `POST`   | `/portfolio/stock`            | Add a stock to portfolio         |
| `PUT`    | `/portfolio/update/stock/:id` | Update a stock in portfolio      |
| `DELETE` | `/portfolio/delete/stock/:id` | Remove a stock from portfolio    |

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

### Contact

For any questions or feedback, reach out at [Paniabhijeet505@gmail.com](mailto:Paniabhijeet505@gmail.com).


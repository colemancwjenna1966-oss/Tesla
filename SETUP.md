# Setup Guide - Tesla Prize Portal

## Prerequisites

- Node.js v16+
- MongoDB Atlas or Local MongoDB instance
- npm or yarn

## Environment Variables

Create `.env` files in both frontend and backend directories:

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Installation

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Database Setup

Run migration scripts in the database directory to initialize collections.

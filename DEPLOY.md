# Student Expense Tracker 

A full-stack **Student Expense Tracker** web application designed to help students manage their income, expenses, and monthly budget in a simple and interactive way.

---

## Live Demo
🔗 Frontend: https://your-frontend-link  
🔗 Backend API: https://your-backend-link  

---

##  Features
- User authentication (Login & Register)
- Add, update, and delete expenses
- Category-wise expense tracking
- Monthly budget and balance overview
- Interactive charts and statistics
- Responsive and mobile-friendly UI
- Secure backend using JWT authentication

---

## Tech Stack

**Frontend**
- React (Vite)
- HTML5, CSS3, JavaScript
- Chart library for data visualization

**Backend**
- Node.js
- Express.js
- MongoDB
- JWT Authentication

Deployment
- Frontend: Not deployed yet (can be deployed on Netlify/Vercel)
- Backend: Local development (Node + Express)
- Database: MongoDB Atlas (cloud)


---

##  Project Structure
tudent-expense-tracker/
│── frontend/
│ ├── src/
│ ├── dist/
│ └── package.json
│
│── backend/
│ ├── routes/
│ ├── models/
│ ├── controllers/
│ └── server.js



---

##Run the Project Locally

### Backend
```bash
cd backend
npm install
npm run dev
Runs on: http://localhost:5000

cd frontend
npm install
npm run dev
Runs on: http://localhost:5173

Backend (.env)
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

Frontend (.env)
VITE_API_BASE=http://localhost:5000
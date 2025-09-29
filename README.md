# Grade Calculator

A full-stack web application for managing student grades and calculating their performance metrics. This project allows users to add, view, update, and delete student records while automatically calculating grades based on marks.

## 🚀 Features

- **Student Management**: Add, view, update, and delete student records
- **Automatic Grade Calculation**: Grades are automatically calculated based on marks
- **Department-wise Organization**: Students can be organized by departments
- **Subject-wise Tracking**: Track marks and grades for different subjects
- **History Management**: View complete history of student records
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Real-time Updates**: Instant updates without page refresh

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
Grade Calculator/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── models/
│   │   └── student.js         # Student data model
│   ├── routes/
│   │   └── studentdata.js     # API routes for student operations
│   ├── package.json
│   └── server.js              # Express server setup
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentForm.jsx    # Form for adding/editing students
│   │   │   └── StudentList.jsx    # List view of students
│   │   ├── pages/
│   │   │   └── History.jsx        # History page
│   │   ├── assets/
│   │   ├── api.jsx               # API functions
│   │   ├── App.jsx               # Main application component
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx              # Application entry point
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
└── README.md
```

## 🚦 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Grade Calculator"
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/gradecalculator
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gradecalculator
   ```

5. **Start the Application**

   **Backend Server:**
   ```bash
   cd backend
   npm start
   ```

   **Frontend Development Server:**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📊 Student Data Model

The application manages student records with the following structure:

```javascript
{
  role: "student" | "user",        // User role (default: "student")
  name: String,                    // Student name (required)
  rollNo: Number,                  // Unique roll number (required)
  department: String,              // Department name (required)
  subject: String,                 // Subject name (required)
  marks: Number,                   // Marks obtained (required)
  grade: String                    // Automatically calculated grade
}
```

## 🔗 API Endpoints

### Student Operations

- `GET /api/students` - Get all students
- `POST /api/students` - Add a new student
- `PUT /api/students/:id` - Update student by ID
- `DELETE /api/students/:id` - Delete student by ID

## 🎨 Grade Calculation Logic

The application automatically calculates grades based on marks:
- **A+**: 90-100 marks
- **A**: 80-89 marks
- **B+**: 70-79 marks
- **B**: 60-69 marks
- **C+**: 50-59 marks
- **C**: 40-49 marks
- **F**: Below 40 marks

## 🔧 Development Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
npm start        # Start the server
npm test         # Run tests (not configured yet)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Mustafa Adil**
- GitHub: [@mustafaaadil448](https://github.com/mustafaaadil448)

## 🐛 Issues

If you encounter any issues or have suggestions for improvements, please create an issue in the repository.

## 🚀 Future Enhancements

- [ ] User authentication and authorization
- [ ] Bulk import/export of student data
- [ ] Advanced filtering and sorting options
- [ ] Dashboard with analytics and charts
- [ ] Email notifications for grade updates
- [ ] PDF report generation
- [ ] Multi-language support

---

**Happy Coding! 🎓**

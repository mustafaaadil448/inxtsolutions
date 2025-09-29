// import { useEffect, useState } from "react";
// import { deleteStudent, getStudents, updateStudent } from "./api";
// import StudentForm from "./components/StudentForm";
// import StudentList from "./components/StudentList";

// function App() {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     getStudents().then((res) => setStudents(res.data));
//   }, []);

//   const handleAdd = (student) => setStudents([...students, student]);
//   const handleDelete = async (id) => {
//     await deleteStudent(id);
//     setStudents(students.filter((s) => s._id !== id));
//   };

//   const handleUpdate = async (id, updatedData) => {
//     const res = await updateStudent(id, updatedData);
//     setStudents(students.map((s) => (s._id === id ? res.data : s)));
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">📊 Grade Calculator</h1>
//       <StudentForm students={students} onAdd={handleAdd} onDelete={handleDelete} onUpdate={handleUpdate} />
//       <StudentList students={students} onDelete={handleDelete} onUpdate={handleUpdate} />
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { deleteStudent, getStudents, updateStudent } from "./api";
import StudentForm from "./components/StudentForm";
import "./index.css";
import History from "./pages/History";

function HomePage() {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);

  useEffect(() => {
    getStudents().then((res) => setStudents(res.data));
  }, []);

  const handleAdd = (student) => {
    setStudents([...students, student]);
    setCurrentStudent(null);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    setStudents(students.filter((s) => s._id !== id));
  };

  const handleUpdate = async (id, updatedData) => {
    const res = await updateStudent(id, updatedData);
    setStudents(students.map((s) => (s._id === id ? res.data : s)));
    setCurrentStudent(null);
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-3 sm:mb-4 md:mb-6 shadow-2xl float">
            <span className="text-xl sm:text-2xl md:text-4xl">🎓</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2 sm:mb-3 md:mb-4">
            Student Grade Management
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Add, edit, and manage student grades with our intuitive grade calculator system
          </p>
        </div>

        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
          {/* Add / Edit Student Form */}
          <div className="xl:col-span-2 glass-card p-4 sm:p-6 md:p-8">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6 md:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-lg sm:text-2xl">{currentStudent ? '✏️' : '➕'}</span>
              </div>
              <div>
                <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800">
                  {currentStudent ? 'Edit Student' : 'Add New Student'}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {currentStudent ? 'Update student information' : 'Enter student details to calculate grade'}
                </p>
              </div>
            </div>
            <StudentForm
              onAdd={handleAdd}
              onUpdate={handleUpdate}
              currentStudent={currentStudent}
            />
          </div>

          {/* Quick Stats & Activity Panel */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Stats */}
            <div className="glass-card p-4 sm:p-6 md:p-8">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-lg sm:text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Quick Stats</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Overview metrics</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-2xl shadow-inner">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2">{students.length}</div>
                  <div className="text-xs sm:text-sm font-semibold text-blue-800">Total Students</div>
                </div>
                <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 via-green-100 to-green-200 rounded-2xl shadow-inner">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-2">
                    {students.length > 0
                      ? (students.reduce((sum, s) => sum + s.marks, 0) / students.length).toFixed(1)
                      : '0.0'
                    }
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-green-800">Average Marks</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-4 sm:p-6 md:p-8">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-lg sm:text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Recent Activity</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Latest additions</p>
                </div>
              </div>
              
              {students.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">📝</div>
                  <p className="text-gray-600 font-medium text-sm sm:text-base">No students added yet</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">Add your first student to get started!</p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto">
                  {students.slice(-5).reverse().map((student) => (
                    <div key={student._id} className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-xs sm:text-sm">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 truncate text-sm sm:text-base">{student.name}</p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{student.subject} - Grade {student.grade}</p>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-blue-600">
                        {student.marks}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Enhanced Navigation Header */}
      <nav className="glass-card sticky top-0 z-50 shadow-2xl border-b border-white/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl hover-scale">
                <span className="text-lg sm:text-2xl md:text-3xl">📊</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold gradient-text">
                  Grade Calculator
                </h1>
                <p className="text-xs md:text-sm text-gray-600 font-medium">Student Performance Management System</p>
              </div>
            </div>
            
            <div className="flex space-x-2 sm:space-x-3 md:space-x-4">
              <Link
                to="/"
                className={`btn px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
                  location.pathname === '/' 
                    ? 'btn-primary' 
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-xl'
                }`}
              >
                <span className="flex items-center space-x-1 sm:space-x-2">
                  <span className="text-sm sm:text-base md:text-lg">🏠</span>
                  <span className="hidden xs:inline text-sm sm:text-base">Home</span>
                </span>
              </Link>
              
              <Link
                to="/history"
                className={`btn px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
                  location.pathname === '/history' 
                    ? 'btn-secondary' 
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-xl'
                }`}
              >
                <span className="flex items-center space-x-1 sm:space-x-2">
                  <span className="text-sm sm:text-base md:text-lg">📚</span>
                  <span className="hidden xs:inline text-sm sm:text-base">History</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;

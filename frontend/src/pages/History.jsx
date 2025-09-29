import { useEffect, useState } from "react";
import { getStudents, deleteStudent, updateStudent } from "../api";

export default function History() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingStudent, setEditingStudent] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [filterGrade, setFilterGrade] = useState("");
    const [sortBy, setSortBy] = useState("name");

    useEffect(() => {
        const fetchAllStudents = async () => {
            try {
                setLoading(true);
                const res = await getStudents();
                setStudents(res.data);
            } catch (error) {
                console.error("Error loading students:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllStudents();
    }, []);

    // Handle Delete
    const handleDelete = async (studentId) => {
        if (window.confirm("Kya aap sure hain yeh student delete karna chahte hain?")) {
            try {
                await deleteStudent(studentId);
                setStudents(students.filter(student => student._id !== studentId));
                alert("Student successfully deleted!");
            } catch (error) {
                console.error("Error deleting student:", error);
                alert("Error deleting student. Please try again.");
            }
        }
    };

    // Handle Edit
    const handleEdit = (student) => {
        setEditingStudent(student._id);
        setEditForm({
            name: student.name,
            rollNo: student.rollNo,
            department: student.department,
            subject: student.subject,
            marks: student.marks
        });
    };

    // Handle Edit Form Change
    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    // Handle Edit Submit
    const handleEditSubmit = async (studentId) => {
        try {
            const res = await updateStudent(studentId, editForm);
            setStudents(students.map(student =>
                student._id === studentId ? res.data : student
            ));
            setEditingStudent(null);
            alert("Student successfully updated!");
        } catch (error) {
            console.error("Error updating student:", error);
            alert("Error updating student. Please try again.");
        }
    };

    // Handle Cancel Edit
    const handleCancelEdit = () => {
        setEditingStudent(null);
        setEditForm({});
    };

    // Filter and search students
    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.department.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGrade = filterGrade === "" || student.grade === filterGrade;
        return matchesSearch && matchesGrade;
    });

    // Sort students
    const sortedStudents = [...filteredStudents].sort((a, b) => {
        switch (sortBy) {
            case "name":
                return a.name.localeCompare(b.name);
            case "marks":
                return b.marks - a.marks;
            case "grade":
                const gradeOrder = ['S', 'A+', 'A', 'B+', 'B', 'C', 'D', 'F'];
                return gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
            case "department":
                return a.department.localeCompare(b.department);
            default:
                return 0;
        }
    });

    // Group students by department
    const groupedStudents = sortedStudents.reduce((acc, student) => {
        acc[student.department] = acc[student.department] || [];
        acc[student.department].push(student);
        return acc;
    }, {});

    // Statistics
    const totalStudents = students.length;
    const filteredCount = filteredStudents.length;
    const averageMarks = students.length > 0
        ? (students.reduce((sum, s) => sum + s.marks, 0) / students.length).toFixed(1)
        : 0;

    const gradeDistribution = students.reduce((acc, s) => {
        acc[s.grade] = (acc[s.grade] || 0) + 1;
        return acc;
    }, {});

    const topPerformer = students.length > 0
        ? students.reduce((prev, curr) => prev.marks > curr.marks ? prev : curr)
        : null;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
                <div className="glass-card p-8 text-center">
                    <div className="spinner mx-auto mb-6"></div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Loading Student History</h3>
                    <p className="text-gray-600">Please wait while we fetch all student records...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto">
                {/* Header - FIXED */}
                <div className="text-center mb-8 lg:mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 md:mb-6 shadow-2xl float">
                        <span className="text-2xl md:text-4xl">📊</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                        Student History & Analytics
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        Complete record of all students and their academic performance across different departments
                    </p>

                    {/* Search and Filter Bar - FIXED */}
                    <div className="mt-8 max-w-4xl mx-auto">
                        <div className="glass-card p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Search Input */}
                                <div className="lg:col-span-2">
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">🔍</span>
                                        <input
                                            type="text"
                                            placeholder="Search students, subjects, roll no..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Grade Filter */}
                                <div>
                                    <select
                                        value={filterGrade}
                                        onChange={(e) => setFilterGrade(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">All Grades</option>
                                        <option value="S">Grade S</option>
                                        <option value="A+">Grade A+</option>
                                        <option value="A">Grade A</option>
                                        <option value="B+">Grade B+</option>
                                        <option value="B">Grade B</option>
                                        <option value="C">Grade C</option>
                                    </select>
                                </div>

                                {/* Sort By */}
                                <div>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="name">Sort by Name</option>
                                        <option value="marks">Sort by Marks</option>
                                        <option value="grade">Sort by Grade</option>
                                        <option value="department">Sort by Department</option>
                                    </select>
                                </div>
                            </div>

                            {/* Results Counter */}
                            <div className="mt-4 text-center">
                                <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-semibold">
                                    Showing {filteredCount} of {totalStudents} students
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Statistics Cards - FIXED */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 lg:mb-12">
                    {[
                        { value: totalStudents, label: "Total Students", icon: "👥", color: "from-blue-500 to-blue-600" },
                        { value: `${averageMarks}%`, label: "Average Score", icon: "📈", color: "from-green-500 to-green-600" },
                        { value: Object.keys(groupedStudents).length, label: "Departments", icon: "🏫", color: "from-purple-500 to-purple-600" },
                        { value: topPerformer ? `${topPerformer.marks}%` : 'N/A', label: "Highest Score", icon: "🏆", color: "from-orange-500 to-orange-600" }
                    ].map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                            <div className="text-center">
                                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                                    <span className="text-2xl">{stat.icon}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                                <p className="text-gray-600 font-medium">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Grade Distribution - FIXED */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8 lg:mb-12">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                            <span className="text-2xl">🎯</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Grade Distribution</h2>
                            <p className="text-gray-600">Performance breakdown across all grades</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                        {Object.entries(gradeDistribution)
                            .sort(([a], [b]) => {
                                const gradeOrder = ['S', 'A+', 'A', 'B+', 'B', 'C', 'D', 'F'];
                                return gradeOrder.indexOf(a) - gradeOrder.indexOf(b);
                            })
                            .map(([grade, count]) => (
                                <div key={grade} className="text-center p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all">
                                    <div className={`text-2xl font-bold mb-2 ${grade === 'S' ? 'text-purple-600' :
                                            grade === 'A+' ? 'text-green-600' :
                                                grade === 'A' ? 'text-blue-600' :
                                                    grade === 'B+' ? 'text-yellow-600' :
                                                        grade === 'B' ? 'text-orange-600' :
                                                            grade === 'C' ? 'text-red-600' :
                                                                'text-gray-600'
                                        }`}>{count}</div>
                                    <div className="text-sm text-gray-600 font-medium">Grade {grade}</div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Students Grid Layout - FIXED */}
                {students.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-200 rounded-full mb-8">
                            <span className="text-4xl">📚</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-600 mb-4">No Student Records Found</h2>
                        <p className="text-lg text-gray-500">Add some students to see their comprehensive history and analytics here.</p>
                    </div>
                ) : filteredStudents.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-600 mb-2">No Results Found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {Object.entries(groupedStudents).map(([department, deptStudents]) => (
                            <div key={department} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                {/* Department Header */}
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                                <span className="text-2xl text-white">🏫</span>
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-white">{department}</h2>
                                                <p className="text-indigo-100">{deptStudents.length} students enrolled</p>
                                            </div>
                                        </div>
                                        <div className="text-center md:text-right">
                                            <div className="text-3xl font-bold text-white">
                                                {(deptStudents.reduce((sum, s) => sum + s.marks, 0) / deptStudents.length).toFixed(1)}%
                                            </div>
                                            <div className="text-indigo-100">Department Average</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Student Cards */}
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {deptStudents.map((student) => (
                                            <div key={student._id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all">
                                                {editingStudent === student._id ? (
                                                    // Edit Form
                                                    <div className="space-y-3">
                                                        <input
                                                            name="name"
                                                            value={editForm.name || ''}
                                                            onChange={handleEditChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                            placeholder="Student Name"
                                                        />
                                                        <input
                                                            name="rollNo"
                                                            value={editForm.rollNo || ''}
                                                            onChange={handleEditChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                            placeholder="Roll Number"
                                                        />
                                                        <input
                                                            name="subject"
                                                            value={editForm.subject || ''}
                                                            onChange={handleEditChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                            placeholder="Subject"
                                                        />
                                                        <input
                                                            name="marks"
                                                            type="number"
                                                            value={editForm.marks || ''}
                                                            onChange={handleEditChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                            placeholder="Marks"
                                                        />
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => handleEditSubmit(student._id)}
                                                                className="flex-1 bg-green-500 text-white py-2 rounded-lg"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={handleCancelEdit}
                                                                className="flex-1 bg-gray-500 text-white py-2 rounded-lg"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    // Student Card Content
                                                    <>
                                                        <div className="text-center mb-4">
                                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                                                <span className="text-2xl font-bold text-white">
                                                                    {student.name.charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <h3 className="font-bold text-lg text-gray-800">{student.name}</h3>
                                                            <p className="text-gray-500 text-sm">#{student.rollNo}</p>
                                                        </div>

                                                        <div className="text-center mb-4">
                                                            <span className={`inline-block px-4 py-2 rounded-full font-bold text-white ${student.grade === 'S' ? 'bg-purple-500' :
                                                                    student.grade === 'A+' ? 'bg-green-500' :
                                                                        student.grade === 'A' ? 'bg-blue-500' :
                                                                            student.grade === 'B+' ? 'bg-yellow-500' :
                                                                                student.grade === 'B' ? 'bg-orange-500' :
                                                                                    student.grade === 'C' ? 'bg-red-500' :
                                                                                        'bg-gray-500'
                                                                }`}>
                                                                Grade {student.grade}
                                                            </span>
                                                        </div>

                                                        <div className="space-y-3 text-sm mb-4">
                                                            <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                                                                <span className="text-gray-600">Subject:</span>
                                                                <span className="font-medium">{student.subject}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                                                                <span className="text-gray-600">Marks:</span>
                                                                <span className="font-medium">{student.marks}/100</span>
                                                            </div>
                                                        </div>

                                                        {/* Progress Bar */}
                                                        <div className="mb-4">
                                                            <div className="flex justify-between text-sm mb-1">
                                                                <span>Performance</span>
                                                                <span>{student.marks}%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                <div
                                                                    className={`h-2 rounded-full ${student.marks >= 90 ? 'bg-green-500' :
                                                                            student.marks >= 70 ? 'bg-blue-500' :
                                                                                student.marks >= 50 ? 'bg-yellow-500' :
                                                                                    'bg-red-500'
                                                                        }`}
                                                                    style={{ width: `${student.marks}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>

                                                        {/* Action Buttons */}
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => handleEdit(student)}
                                                                className="flex-1 bg-yellow-500 text-white py-2 rounded-lg text-sm"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(student._id)}
                                                                className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// export default function StudentList({ students, onDelete }) {
//     return (
//         <div className="mt-4">
//             <h2 className="text-lg font-bold mb-2">Student Grades</h2>
//             <ul className="space-y-2">
//                 {students.map((s) => (
//                     <li
//                         key={s._id}
//                         className="flex justify-between p-2 bg-gray-200 rounded"
//                     >
//                         <span>
//                             {s.name} - {s.subject} - {s.marks} Marks → Grade: {s.grade}
//                         </span>
//                         <button
//                             onClick={() => onDelete(s._id)}
//                             className="bg-red-500 text-white px-2 py-1 rounded"
//                         >
//                             Delete
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }


// export default function StudentList({ students, onDelete, onUpdate }) {
//     return (
//         <div className="mt-4">
//             {students.map((s) => (
//                 <div key={s._id} className="flex justify-between items-center p-2 bg-white shadow mb-2 rounded">
//                     <div>
//                         <p className="font-bold">{s.name} ({s.rollNo})</p>
//                         <p>{s.department} | {s.subject} | Marks: {s.marks} | Grade: {s.grade}</p>
//                     </div>
//                     <div className="space-x-2">
//                         <button
//                             onClick={() => onUpdate(s._id, s)} // 👈 Edit trigger
//                             className="bg-yellow-500 text-white px-3 py-1 rounded"
//                         >
//                             ✏️ Edit
//                         </button>
//                         <button
//                             onClick={() => onDelete(s._id)}
//                             className="bg-red-500 text-white px-3 py-1 rounded"
//                         >
//                             🗑 Delete
//                         </button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }
export default function StudentList({ students, onDelete, onEdit }) {
    // Group students by department
    const grouped = students.reduce((acc, student) => {
        acc[student.department] = acc[student.department] || [];
        acc[student.department].push(student);
        return acc;
    }, {});

    if (students.length === 0) {
        return (
            <div className="text-center py-12 sm:py-16">
                <div className="glass-card p-6 sm:p-8 max-w-md mx-auto">
                    <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 float">📝</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-600 mb-2 sm:mb-3">No Students Added Yet</h3>
                    <p className="text-gray-500 text-sm sm:text-base">
                        Start by adding your first student using the form above. All students will appear here with their grades and performance metrics.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8">
            {Object.keys(grouped).map((dept) => (
                <div key={dept} className="glass-card overflow-hidden">
                    {/* Enhanced Department Header */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <span className="text-lg sm:text-2xl">🏫</span>
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-white">{dept}</h2>
                                    <p className="text-indigo-100 text-sm sm:text-base">
                                        {grouped[dept].length} student{grouped[dept].length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                            </div>
                            <div className="text-center sm:text-right">
                                <div className="text-xl sm:text-2xl font-bold text-white">
                                    {(grouped[dept].reduce((sum, s) => sum + s.marks, 0) / grouped[dept].length).toFixed(1)}%
                                </div>
                                <div className="text-indigo-100 text-xs sm:text-sm">Department Average</div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Student Cards */}
                    <div className="p-4 sm:p-6">
                        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {grouped[dept].map((s) => (
                                <div
                                    key={s._id}
                                    className="glass-card p-4 sm:p-6 hover-scale card-hover group"
                                >
                                    {/* Student Header */}
                                    <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                            <span className="text-white font-bold text-sm sm:text-lg">
                                                {s.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-800 truncate">
                                                {s.name}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-500">#{s.rollNo}</p>
                                        </div>
                                        <div className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold ${
                                            s.grade === 'S' ? 'badge-success bg-purple-100 text-purple-800' :
                                            s.grade === 'A+' ? 'badge-success' :
                                            s.grade === 'A' ? 'bg-blue-100 text-blue-800' :
                                            s.grade === 'B+' ? 'badge-warning' :
                                            s.grade === 'B' ? 'bg-orange-100 text-orange-800' :
                                            s.grade === 'C' ? 'badge-danger' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {s.grade}
                                        </div>
                                    </div>

                                    {/* Enhanced Student Info */}
                                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                                        <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                            <span className="text-gray-600 flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                                                <span>📚</span>
                                                <span className="hidden xs:inline">Subject</span>
                                            </span>
                                            <span className="font-semibold text-gray-800 text-xs sm:text-sm truncate ml-2">{s.subject}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                            <span className="text-gray-600 flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                                                <span>📝</span>
                                                <span className="hidden xs:inline">Marks</span>
                                            </span>
                                            <span className={`font-bold text-xs sm:text-sm ${
                                                s.marks >= 90 ? 'text-green-600' :
                                                s.marks >= 70 ? 'text-blue-600' :
                                                s.marks >= 50 ? 'text-yellow-600' :
                                                'text-red-600'
                                            }`}>
                                                {s.marks}/100
                                            </span>
                                        </div>
                                    </div>

                                    {/* Enhanced Progress Bar */}
                                    <div className="mb-4 sm:mb-6">
                                        <div className="flex justify-between items-center mb-1 sm:mb-2">
                                            <span className="text-xs sm:text-sm text-gray-600 font-medium">Performance</span>
                                            <span className="text-xs sm:text-sm font-bold text-gray-800">{s.marks}%</span>
                                        </div>
                                        <div className="progress-bar h-2 sm:h-3">
                                            <div 
                                                className={`progress-fill ${
                                                    s.marks >= 90 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                                                    s.marks >= 70 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                                                    s.marks >= 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                                                    'bg-gradient-to-r from-red-400 to-red-600'
                                                }`}
                                                style={{ width: `${s.marks}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>0</span>
                                            <span className={`font-semibold ${
                                                s.marks >= 90 ? 'text-green-600' :
                                                s.marks >= 70 ? 'text-blue-600' :
                                                s.marks >= 50 ? 'text-yellow-600' :
                                                'text-red-600'
                                            }`}>
                                                {s.marks >= 90 ? 'Excellent!' :
                                                 s.marks >= 70 ? 'Good' :
                                                 s.marks >= 50 ? 'Average' :
                                                 'Needs Work'}
                                            </span>
                                            <span>100</span>
                                        </div>
                                    </div>

                                    {/* Enhanced Actions */}
                                    <div className="flex gap-2 sm:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={() => onEdit(s)}
                                            className="btn btn-warning flex-1 py-2 px-3 sm:px-4 text-xs sm:text-sm font-semibold ripple"
                                        >
                                            <span className="flex items-center justify-center space-x-1">
                                                <span>✏️</span>
                                                <span className="hidden xs:inline">Edit</span>
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => onDelete(s._id)}
                                            className="btn btn-danger flex-1 py-2 px-3 sm:px-4 text-xs sm:text-sm font-semibold ripple"
                                        >
                                            <span className="flex items-center justify-center space-x-1">
                                                <span>🗑️</span>
                                                <span className="hidden xs:inline">Delete</span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

import { useEffect, useState } from "react";
import { addStudent, updateStudent } from "../api";

export default function StudentForm({ students = [], onAdd, onUpdate, onDelete, currentStudent }) {
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ name: "", rollNo: "", department: "", subject: "", marks: "" });

    useEffect(() => {
        if (currentStudent) {
            setForm(currentStudent);
        }
    }, [currentStudent]);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentStudent) {
            const res = await updateStudent(currentStudent._id, form);
            onUpdate(currentStudent._id, res.data);
        } else {
            const res = await addStudent(form);
            onAdd(res.data);
        }
        setForm({ name: "", rollNo: "", department: "", subject: "", marks: "" });
    };
    const handleAdd = (student) => {
        onAdd(student);
        setForm({ name: "", rollNo: "", department: "", subject: "", marks: "" });
        setEditId(null);
    };
    const handleUpdate = async (id) => {
        const res = await updateStudent(id, {
            ...form,
            marks: Number(form.marks),
        });
        onUpdate(id, res.data);
        setEditId(null);
        setForm({ name: "", subject: "", marks: "" });
    };

    const handleEdit = (student) => {
        setForm(student);
        setEditId(student._id);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-4 sm:space-y-6">
                {/* Student Name */}
                <div className="space-y-1 sm:space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-bold text-gray-700">
                        <span className="text-base sm:text-lg">👤</span>
                        <span>Student Name</span>
                    </label>
                    <input
                        name="name"
                        placeholder="Enter student's full name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                {/* Roll Number & Department */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1 sm:space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-bold text-gray-700">
                            <span className="text-base sm:text-lg">🎫</span>
                            <span>Roll Number</span>
                        </label>
                        <input
                            name="rollNo"
                            placeholder="e.g., 2246042"
                            value={form.rollNo}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-bold text-gray-700">
                            <span className="text-base sm:text-lg">🏫</span>
                            <span>Department</span>
                        </label>
                        <input
                            name="department"
                            placeholder="e.g., Computer Science"
                            value={form.department}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                </div>

                {/* Subject & Marks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1 sm:space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-bold text-gray-700">
                            <span className="text-base sm:text-lg">📚</span>
                            <span>Subject</span>
                        </label>
                        <input
                            name="subject"
                            placeholder="e.g., Mathematics"
                            value={form.subject}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-bold text-gray-700">
                            <span className="text-base sm:text-lg">📝</span>
                            <span>Marks (out of 100)</span>
                        </label>
                        <input
                            type="number"
                            name="marks"
                            placeholder="e.g., 85"
                            min="0"
                            max="100"
                            value={form.marks}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                </div>

                {/* Grade Preview */}
                {form.marks && (
                    <div className="glass-card p-3 sm:p-4">
                        <div className="flex items-center justify-center space-x-3">
                            <span className="text-sm font-medium text-gray-600">Calculated Grade:</span>
                            <span className={`px-3 py-1 rounded-full font-bold text-sm ${
                                form.marks >= 95 ? 'badge-success bg-purple-100 text-purple-800' :
                                form.marks >= 90 ? 'badge-success' :
                                form.marks >= 80 ? 'bg-blue-100 text-blue-800' :
                                form.marks >= 70 ? 'badge-warning' :
                                form.marks >= 60 ? 'bg-orange-100 text-orange-800' :
                                form.marks >= 50 ? 'badge-danger' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                                Grade {
                                    form.marks >= 95 ? 'S' :
                                    form.marks >= 90 ? 'A+' :
                                    form.marks >= 80 ? 'A' :
                                    form.marks >= 70 ? 'B+' :
                                    form.marks >= 60 ? 'B' :
                                    form.marks >= 50 ? 'C' :
                                    'F'
                                }
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="pt-2 sm:pt-4">
                <button 
                    type="submit" 
                    className="btn btn-primary w-full py-3 sm:py-4 md:py-5 text-base sm:text-lg font-bold ripple"
                >
                    <span className="flex items-center justify-center space-x-2 sm:space-x-3">
                        <span className="text-lg sm:text-xl md:text-2xl">{currentStudent ? '✏️' : '➕'}</span>
                        <span>{currentStudent ? 'Update Student Record' : 'Add New Student'}</span>
                    </span>
                </button>
            </div>
        </form>
    )};



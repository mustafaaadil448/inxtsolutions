import express from "express";
import Student from "../models/student.js";

const router = express.Router();

// Calculate grade
const getGrade = (marks) => {
    if (marks >= 95) return "S";
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B+";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    if (marks >= 40) return "D";
    return "F";
};

// Add student (with rollNo & department)
router.post("/", async (req, res, next) => {
    try {
        const { name, rollNo, department, subject, marks } = req.body;

        // Validation
        if (!name || !rollNo || !department || !subject || marks == null) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (marks < 0 || marks > 100) {
            return res.status(400).json({ error: "Marks must be between 0 and 100" });
        }

        const grade = getGrade(marks);
        const student = new Student({ name, rollNo, department, subject, marks, grade });
        await student.save();

        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
        next(err); // Pass error to global error handler
    }
});

// Get all students
router.get("/", async (req, res, next) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        next(err); // Pass error to global error handler
    }
});

// Delete student
router.delete("/:id", async (req, res, next) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        next(err); // Pass error to global error handler
    }
});

// Update student
router.put("/:id", async (req, res, next) => {
    try {
        const { name, rollNo, department, subject, marks } = req.body;

        if (!name || !rollNo || !department || !subject || marks == null) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (marks < 0 || marks > 100) {
            return res.status(400).json({ error: "Marks must be between 0 and 100" });
        }

        const grade = getGrade(marks);
        const updated = await Student.findByIdAndUpdate(
            req.params.id,
            { name, rollNo, department, subject, marks, grade },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json(updated);
    } catch (err) {
        console.error("Update error:", err.message);
        res.status(500).json({ error: err.message });
        next(err); // Pass error to global error handler
    }
});

export default router;

import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    role:{
        type: String,
        enum: ["student","user"],
        default: "student",
    },
    name: {
        type: String,
        required: true,
    },
    rollNo:{
        type: Number,
        required: true,
        unique: true,
    },
    department:{
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    marks: {
        type: Number,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

export default Student;

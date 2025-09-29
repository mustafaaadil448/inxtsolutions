import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getStudents = () => API.get("/students");
export const addStudent = (data) => API.post("/students", data);
export const deleteStudent = (id) => API.delete(`/students/${id}`);
export const updateStudent = (id, data) => API.put(`/students/${id}`, data);


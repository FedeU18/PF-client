import axios from "axios";

export const searchProfesor = (count, page, subject) =>
axios.get(`/profesores/api?count=${count}&page=${page}&subject=${subject}`);
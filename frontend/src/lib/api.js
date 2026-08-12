import axios from "axios";

export const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const submitDemoRequest = (data) => axios.post(`${API}/demo-requests`, data);
export const submitContactMessage = (data) => axios.post(`${API}/contact-messages`, data);

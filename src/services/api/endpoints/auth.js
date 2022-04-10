import axios from "../axios";

const endpoints = {
  login: (data) => axios.post("/login/", data),
  getDate: () => axios.get("/requests"),
  getProfile: () => axios.get("/me/"),
  form: (data) => axios.post("/create_request", data),
  updateToken: (data) => axios.post("/token/refresh/", data),
  createReview: (data) => axios.post("/create_review", data),
  deletePost: (data) => axios.delete("/create_review", data),
  getStats: () => axios.get("/getstats"),
  getTemplate: () => axios.get("/getTemplateTexts"),
};

export default endpoints;

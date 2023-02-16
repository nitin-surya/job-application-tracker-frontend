import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:8000/jat",
  //baseURL: "https://jat-appl-tracker.herokuapp.com/jat",
  baseURL: "https://possible-phase-spoon.glitch.me/jat/getAllJobs",
});

export default instance;

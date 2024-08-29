import axios from "axios";

const instance = axios.create({
  /**/ baseURL: "http://localhost:8080/api",
  /* Heroku - baseURL: "https://jat-appl-tracker.herokuapp.com/jat",/
  /* Glitch - baseURL: "https://possible-phase-spoon.glitch.me/jat",/  
  /* Cyclic  baseURL: "https://handsome-teal-walkingstick.cyclic.app/jat", */
  /* Render baseURL:
    "https://job-application-tracker-backend-s1bt.onrender.com/api",*/
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;

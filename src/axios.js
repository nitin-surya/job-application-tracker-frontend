import axios from "axios";

const instance = axios.create({
  /* baseURL: "http://localhost:8000/jat",/
  /* Heroku - baseURL: "https://jat-appl-tracker.herokuapp.com/jat",/
  /* Glitch - baseURL: "https://possible-phase-spoon.glitch.me/jat",/  
  /* Cyclic  baseURL: "https://handsome-teal-walkingstick.cyclic.app/jat", */
  /* Render*/ baseURL:
    "https://job-application-tracker-backend-s1bt.onrender.com/jat",
});

export default instance;
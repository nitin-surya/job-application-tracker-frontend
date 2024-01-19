import axios from "axios";

const instance = axios.create({
  /* baseURL: "http://localhost:8000/jat",/
  /* Heroku - baseURL: "https://jat-appl-tracker.herokuapp.com/jat",/
  /* Glitch - baseURL: "https://possible-phase-spoon.glitch.me/jat",/  
  /* Cyclic */ baseURL: "https://handsome-teal-walkingstick.cyclic.app/jat",
});

export default instance;





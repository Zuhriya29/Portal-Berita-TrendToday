// src/utils/csrf.js
import axios from "../api/axios";

const csrf = async () => {
  await axios.get("/sanctum/csrf-cookie");
};

export default csrf;

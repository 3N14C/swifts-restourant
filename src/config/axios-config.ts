import axios from "axios";

export const axiosInstanse = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://swifts-restourant.vercel.app/api"
      : "http://localhost:5700/api",
  // headers: {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
  //   "Access-Control-Allow-Headers": "Content-Type",
  //   "Access-Control-Allow-Credentials": "true",
  //   "Access-Control-Max-Age": "3600",
  // },
});

import axios from "axios";

export const axiosInstance = axios.create();

export const axiosPrivate = axios.create({
  withCredentials: true,
});

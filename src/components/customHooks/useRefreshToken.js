import { login } from "../../store/slices/AuthSlice.js";
import { useDispatch } from "react-redux";
import axios from "axios";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    try {
      const response = await axios.post("/api/v1/users/refresh-token", {
        withCredentials: true,
      });
      // console.log(response);?
      if (response.status === 200) {
        dispatch(login(response.data.data));
      }
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  return refresh;
};

export default useRefreshToken;

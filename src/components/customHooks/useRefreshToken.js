import { login } from "../../store/AuthSlice.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const useRefreshToken = () => {
  // const accessToken = useSelector((state) => state.auth?.userData?.accessToken);

  const dispatch = useDispatch();
  const refresh = async () => {
    try {
      const response = await axios.post("/api/v1/users/refresh-token", {
        withCredentials: true,
      });
      // console.log(accessToken);
      // const userData = response.data;
      // console.log(userData);
      dispatch(login(response.data.data.userData));
      // console.log(response.data.data.userData);
      return response.data.data.accessToken;
    } catch (error) {
      console.log(error);
    }
  };
  return refresh;
};

export default useRefreshToken;

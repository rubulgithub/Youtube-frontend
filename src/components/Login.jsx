import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "./customHooks/useAxiosPrivate";
import Input from "./Input";
import Button from "./Button";
import { axiosInstance } from "../api/axiosInstance";
import { login } from "../store/slices/AuthSlice";

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  const submit = async (data) => {
    try {
      const isEmail = data.username.includes("@");
      const loginData = isEmail
        ? { email: data.username, password: data.password }
        : data;
      const loginRes = await axiosInstance.post(
        "/api/v1/users/login",
        loginData
      );
      // console.log(loginRes.status);
      const currentUserRes = await axiosPrivate.get(
        "/api/v1/users/current-user"
      );
      // console.log(currentUserRes);
      if ((loginRes.status && currentUserRes.status) === 200) {
        dispatch(login(loginRes.data.data));
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-screen text-white p-3 flex justify-center items-start">
        <div className="flex max-w-5xl flex-col space-y-5 justify-center items-center border border-slate-600 p-3 mt-20">
          <div className="flex items-center gap-2 mt-5">{/* <Logo /> */}</div>

          <form onSubmit={handleSubmit(submit)} className="space-y-5 p-2">
            <Input
              label="Username / email"
              type="text"
              placeholder="example@gmail.com"
              {...register("username", {
                required: "username is required",
              })}
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
            <Input
              label="Password"
              type="password"
              placeholder="1kd074fjw0"
              {...register("password", {
                required: "password is required",
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}

            <Button
              type="submit"
              bgColor="bg-purple-500"
              className="w-full sm:py-3 py-2 hover:bg-purple-700 text-lg"
            >
              Login
            </Button>

            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to={"/signup"}
                className="text-purple-600 cursor-pointer hover:opacity-70"
              >
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "./customHooks/useAxiosPrivate";
import Input from "./Input";
import Button from "./Button";
import { axiosInstance } from "../api/axiosInstance";

function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth?.loading);
  const axiosPrivate = useAxiosPrivate();

  const submit = async (data) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("fullName", data.fullName);

    try {
      console.log(formData);
      const registerRes = await axiosInstance.post(
        "/api/v1/users/register",
        formData
      );
      if (registerRes.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-screen text-white p-3 flex justify-center items-start sm:mt-8">
        <div className="flex max-w-5xl flex-col space-y-5 justify-center items-center border border-slate-600 p-3">
          <div className="flex items-center gap-2 mt-5">{/* <Logo /> */}</div>
          <form onSubmit={handleSubmit(submit)} className="space-y-5 p-2">
            <Input
              label="Username: "
              type="text"
              placeholder=""
              {...register("username", {
                required: "username is required",
              })}
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
            <Input
              label="Email: "
              type="email"
              placeholder=""
              {...register("email", {
                required: "email is required",
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
            <Input
              label="Fullname: "
              type="text"
              placeholder=""
              {...register("fullName", {
                required: "fullName is required",
              })}
            />
            {errors.fullName && (
              <span className="text-red-500">{errors.fullName.message}</span>
            )}
            <Input
              label="Password: "
              type="password"
              placeholder=""
              {...register("password", {
                required: "password is required",
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
            <Input
              label="Profile Picture: "
              type="file"
              placeholder=""
              {...register("avatar", {
                required: "avatar is required",
              })}
              accept="image/png, image/jpeg"
            />
            {errors.password && (
              <span className="text-red-500">{errors.avatar.message}</span>
            )}

            <Button
              type="submit"
              bgColor="bg-purple-500"
              className="w-full sm:py-3 py-2 hover:bg-purple-700 text-lg"
            >
              Signup
            </Button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-purple-600 cursor-pointer hover:opacity-70"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;

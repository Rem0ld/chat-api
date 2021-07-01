/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import Spinner from "components/IconsComponents/Spinner";
import ctl from "helpers/ctl";
import React, { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import classes from "./styles";

type Inputs = {
  email: string;
  password: string;
};

const link = ctl(`
inline-block 
align-baseline 
font-bold 
text-sm 
text-primary 
hover:underline
`);

export default function Login(): ReactElement {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data): void => {
    setIsLoading(true);
  };

  return (
    <div className="content-container">
      <div className="w-11/12 max-w-xs mx-4 mt-16 bg-white rounded-md">
        <h2 className="font-bold text-xl text-center pt-6">Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-4 pb-8"
        >
          <div className="mb-4">
            <label className={classes.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              className={classes.input}
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs italic">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mb-6">
            <label className={classes.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="******************"
              className={classes.input}
              {...register("password", { required: "This field is required" })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs italic">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="p-1 border rounded-md ">
              Submit
            </button>
            {isLoading ? <Spinner /> : ""}
            <Link to="/forgot-password" className={link}>
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

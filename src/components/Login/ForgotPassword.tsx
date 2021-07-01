/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import classes from "./styles";

type Inputs = {
  email: string;
};

export default function ForgotPassword(): ReactElement {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data): void => {};

  return (
    <div className="content-container">
      <div className="w-11/12 max-w-xs mx-4 bg-white rounded-md">
        <h2 className="font-bold text-xl text-center pt-6">Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-4 pb-8"
        >
          <div className="mb-4">
            <label className={classes.label} htmlFor="email">
              Please enter a valid Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="jon.doe@gmail.com"
              className={classes.input}
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs italic">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="text-gray-800">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

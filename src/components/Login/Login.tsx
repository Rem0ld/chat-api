/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import { gql, useMutation } from "@apollo/client";
// import { LOGIN } from "api/graphql/user.schema";
import Spinner from "components/IconsComponents/Spinner";
import ctl from "helpers/ctl";
import React, { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "SessionProvider";
import classes from "./styles";

type Inputs = {
  username: string;
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
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export default function Login(): ReactElement {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  // Session provider
  const auth = useAuth();
  const history = useHistory();
  const [login] = useMutation(LOGIN);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data): Promise<void> => {
    setIsLoading(true);
    console.log("data :", data);
    try {
      const response = await login({ variables: data });
      console.log("My response ", response);

      localStorage.setItem("token", JSON.stringify(response.data.login.token));
      localStorage.setItem("user", JSON.stringify(response.data.login.user));
    } catch (error) {}

    setIsLoading(false);
    history.push("/chat");
  };

  return (
    <div className="w-full lg:w-3/5 h-full border-gray-300">
      <h2 className="font-bold text-xl text-center pt-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="px-8 pt-4 pb-8">
        <div className="mb-4">
          <label className={classes.label} htmlFor="email">
            Email
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className={classes.input}
            {...register("username", { required: "This field is required" })}
          />
          {errors.username && (
            <span className="text-red-500 text-xs italic">
              {errors.username.message}
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
          <button className="bg-primary px-2 py-1 rounded-sm shadow-md text-white">
            Connect
          </button>
          {isLoading ? <Spinner /> : ""}
          <Link to="/forgot-password" className={link}>
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}

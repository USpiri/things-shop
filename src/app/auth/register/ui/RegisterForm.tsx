"use client";

import { Button, InputForm as Input } from "@/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { login, register as registerUser } from "@/actions/auth";
import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { name, email, password } = data;
    const resUser = await registerUser(name, email, password);

    if (!resUser.ok) {
      setErrorMsg(resUser.message ?? "Error");
      return;
    }

    setErrorMsg("");
    await login(email, password);
    window.location.replace("/");
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => await onSubmit(data))}
      className="flex flex-col gap-4"
    >
      {errorMsg.length > 0 && (
        <p className="text-sm text-red-400">{errorMsg}.</p>
      )}
      <div>
        <Input
          label="Full name"
          placeholder="Jhon Dow"
          {...register("name", { required: true })}
        />
        {errors?.name && errors.name.type === "required" && (
          <p className="text-sm text-red-400">* Name is required</p>
        )}
      </div>
      <div>
        <Input
          label="Email"
          placeholder="example@email.com"
          {...register("email", { required: true })}
        />
        {errors?.email && errors.email.type === "required" && (
          <p className="text-sm text-red-400">* Email is required</p>
        )}
      </div>
      <div>
        <Input
          label="Password"
          placeholder="******"
          type="password"
          {...register("password", { required: true })}
        />
        {errors?.password && errors.password.type === "required" && (
          <p className="text-sm text-red-400">* Password is required</p>
        )}
      </div>
      <div>
        <Input
          label="Confirm Password"
          placeholder="******"
          type="password"
          {...register("confirmPassword", {
            required: true,
            validate: (value) => {
              if (watch("password") !== value || value.length === 0)
                return "Password do not match";
            },
          })}
        />
        {errors?.confirmPassword && (
          <p className="text-sm text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
        {errors?.confirmPassword &&
          errors.confirmPassword.type === "required" && (
            <p className="text-sm text-red-400">* Password is required</p>
          )}
      </div>
      <Button variant="primary" className="text-sm" size="lg" type="submit">
        Register
      </Button>
    </form>
  );
};

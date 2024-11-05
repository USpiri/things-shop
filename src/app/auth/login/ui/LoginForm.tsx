"use client";

import { authenticate } from "@/actions/auth";
import { Button, Input } from "@/components";
import { useFormState } from "react-dom";

export const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);
  console.log({ state });

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Input
        label="Email"
        placeholder="example@email.com"
        type="email"
        name="email"
      />
      <Input
        label="Password"
        placeholder="******"
        type="password"
        name="password"
      />
      <Button variant="primary" className="text-sm" size="lg" type="submit">
        Login
      </Button>
    </form>
  );
};

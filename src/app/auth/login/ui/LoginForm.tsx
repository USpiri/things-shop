"use client";

import { authenticate } from "@/actions/auth";
import { Button, Input } from "@/components";
import { TriangleAlert } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

export const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);

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
      <LoginButton />
      {state && (
        <div className="flex gap-2 items-center justify-center">
          <TriangleAlert className="h-4 w-4 text-red-400" />
          <p className="text-sm text-red-400">{state}</p>
        </div>
      )}
    </form>
  );
};

const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="primary"
      className="text-sm"
      size="lg"
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      Login
    </Button>
  );
};

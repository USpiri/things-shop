"use client";

import { authenticate } from "@/actions/auth";
import { Button, Input } from "@/components";
import { cn } from "@/utils";
import { Check, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

export const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);
  useEffect(() => {
    if (state === "Success") {
      window.location.replace("/");
    }
  }, [state]);

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
        <div
          className={cn(
            "flex gap-2 items-center justify-center",
            state === "Success" ? "*:text-emerald-500" : "*:text-red-400",
          )}
        >
          {state === "Success" ? (
            <Check className="h-4 w-4" />
          ) : (
            <TriangleAlert className="h-4 w-4" />
          )}
          <p className="text-sm">{state}</p>
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

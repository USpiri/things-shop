"use client";

import { updateRole } from "@/actions/user";
import { UserRole } from "@/models/user.interface";

interface Props {
  userId: string;
  value: "user" | "admin";
}

export const UserRoleSelector = ({ value, userId }: Props) => {
  const onChange = async (value: UserRole) => {
    await updateRole(userId, value);
  };

  return (
    <label className="block w-full rounded p-2 placeholder:text-neutral-500 border border-neutral-700 focus:border-blue-600/50 bg-transparent text-center">
      <select
        className="*:bg-background bg-transparent outline-none w-full"
        value={value}
        onChange={(e) => onChange(e.target.value as UserRole)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </label>
  );
};

"use server";

import { validateRequest } from "@/auth";

export const getCurrentUser = async () => {
  const { user } = await validateRequest();
  return {
    user,
  };
};

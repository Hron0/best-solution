import { db } from "@/backend/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email,email),
    })

    return user;
  } catch {
    return null;
  }
};
export const getUserByLogin = async (login: string) => {
  try {
    const user = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.login, login),
    })

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.user.findFirst({ where: (user, { eq }) => eq(user.id, id) });

    return user;
  } catch {
    return null;
  }
};
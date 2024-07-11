"use server";

import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ActionResult } from "next/dist/server/app-render/types";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { compareSync, hashSync } from "bcrypt";
import { generateIdFromEntropySize } from "lucia";
import { validateRequest } from "@/lib/validateRequest";

type InputValues = {
  username: string;
  password: string;
};

export type prevStateType = {
  success: boolean;
  error?: string;
  inputValues: InputValues;
};
export async function login(formData: FormData): Promise<prevStateType> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      success: false,
      error: "Invalid username",
      inputValues: {
        username,
        password,
      },
    };
  }
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      success: false,

      error: "Invalid password",
      inputValues: {
        username,
        password,
      },
    };
  }

  const existingUser = await db.query.userTable.findFirst({
    where: eq(userTable.username, username.toLowerCase()),
  });

  if (!existingUser) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid usernames from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid usernames.
    // However, valid usernames can be already be revealed with the signup page among other methods.
    // It will also be much more resource intensive.
    // Since protecting against this is non-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If usernames are public, you may outright tell the user that the username is invalid.
    return {
      success: false,

      error: "Incorrect username or password",
      inputValues: {
        username,
        password,
      },
    };
  }

  const validPassword = compareSync(password, existingUser.password_hash);
  if (!validPassword) {
    return {
      success: false,

      error: "Incorrect username or password",
      inputValues: {
        username,
        password,
      },
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return {
    success: true,
    inputValues: {
      username,
      password,
    },
  };
}

export async function signup(formData: FormData): Promise<prevStateType> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      success: false,
      error: "Invalid username",
      inputValues: {
        username,
        password,
      },
    };
  }
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      success: false,
      error: "Invalid password",
      inputValues: {
        username,
        password,
      },
    };
  }

  const passwordHash = hashSync(password, 10);
  const userId = generateIdFromEntropySize(10); // 16 characters long

  // TODO: check if username is already used

  const userExist = await db.query.userTable.findFirst({
    where: eq(userTable.username, username),
  });
  if (userExist) {
    return {
      success: false,

      error: "User already exist",
      inputValues: {
        username,
        password,
      },
    };
  }

  await db.insert(userTable).values({
    id: userId,
    password_hash: passwordHash,
    username: username.toLowerCase(),
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return {
    success: true,
    inputValues: {
      username,
      password,
    },
  };
}

export async function logout(): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/auth/signin");
}

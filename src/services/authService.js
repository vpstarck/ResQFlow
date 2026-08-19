// src/services/authService.js

import {
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { auth } from "./firebase";

/**
 * Login user with email and password
 */
export const loginUser = async (
  email,
  password
) => {
  try {
    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Login Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};

/**
 * Logout current user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Logout Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};

/**
 * Get current logged in user
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Check authentication status
 */
export const isAuthenticated = () => {
  return !!auth.currentUser;
};

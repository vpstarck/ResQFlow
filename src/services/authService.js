import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "./firebase";

/**
 * Register a new user
 * role = "ambulance" | "hospital"
 */
export const registerUser = async ({
  name,
  email,
  password,
  role,
}) => {
  try {
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    });

    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * Login user
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

    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

/**
 * Get currently logged-in user
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Get role from Firestore
 */
export const getUserRole = async (uid) => {
  try {
    const userDoc = await getDoc(
      doc(db, "users", uid)
    );

    if (userDoc.exists()) {
      return userDoc.data().role;
    }

    return null;
  } catch (error) {
    throw error;
  }
};

/**
 * Get complete user profile
 */
export const getUserProfile = async (
  uid
) => {
  try {
    const userDoc = await getDoc(
      doc(db, "users", uid)
    );

    if (userDoc.exists()) {
      return userDoc.data();
    }

    return null;
  } catch (error) {
    throw error;
  }
};

/**
 * Real-time auth listener
 */
export const observeAuthState = (
  callback
) => {
  return onAuthStateChanged(
    auth,
    callback
  );
};

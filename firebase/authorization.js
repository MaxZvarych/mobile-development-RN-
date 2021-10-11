import { auth } from "./firebase";

export const signUp = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("User account created & signed in!");
      setLoggedIn(true);
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }

      console.error(error);
    });
};

export const logIn = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Successfully signed in!");
      setLoggedIn(true);
    })
    .catch((error) => alert(error.message));
};

export const logOut = () => {
  auth()
    .signOut()
    .then(() => {
      console.log("User signed out!");
      setLoggedIn(false);
    });
};

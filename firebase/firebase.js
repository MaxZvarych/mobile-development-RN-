import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyA12kH4-hWUGPKHFT2yqq3MUBntjEnOprw",
  authDomain: "masya-mobile-auth.firebaseapp.com",
  projectId: "masya-mobile-auth",
  storageBucket: "masya-mobile-auth.appspot.com",
  messagingSenderId: "721860695457",
  appId: "1:721860695457:web:765ffd699dccf6135da7e0",
  measurementId: "G-HVDS9VCQ1V",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.default.auth;

export { auth };

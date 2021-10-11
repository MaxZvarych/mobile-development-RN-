import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { auth } from "./firebase/firebase";
import styles from "./Appstyles";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const signUp = () => {
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

  const logIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Successfully signed in!");
        setLoggedIn(true);
      })
      .catch((error) => alert(error.message));
  };

  const logOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log("User signed out!");
        setLoggedIn(false);
      });
  };

  return (
    <View style={styles.container}>
      {!loggedIn ? (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Email'
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              style={styles.input}
            />
            <TextInput
              placeholder='Password'
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              style={styles.input}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={logIn}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOutline} onPress={signUp}>
              <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Image
            source={{
              uri: "https://www.cloudav.ru/upload/iblock/331/pandasecurity-How-do-hackers-pick-their-targets.jpg",
            }}
            style={{ width: 400, height: 400 }}
          />
          <Text style={styles.buttonOutlineText}>
            You've been hacked! Your data is : {email} and {password}
          </Text>
          <TouchableOpacity style={styles.buttonOutline} onPress={logOut}>
            <Text style={styles.buttonOutlineText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style='auto' />
    </View>
  );
}

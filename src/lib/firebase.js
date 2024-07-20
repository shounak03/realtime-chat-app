
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-app-b1dd2.firebaseapp.com",
  projectId: "chat-app-b1dd2",
  storageBucket: "chat-app-b1dd2.appspot.com",
  messagingSenderId: "554216943578",
  appId: "1:554216943578:web:93db9f5d42e263b2db5ae3",
  measurementId: "G-LGJ5LTHH9W"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()

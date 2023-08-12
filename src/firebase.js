// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDruNpTI_nXDb-WJzwIcmyD2f9MsyfM5tc",
  authDomain: "todo-1a672.firebaseapp.com",
  projectId: "todo-1a672",
  storageBucket: "todo-1a672.appspot.com",
  messagingSenderId: "372527808623",
  appId: "1:372527808623:web:d5246173ceb818dd078d9a",
  measurementId: "G-SDT899Y7M7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
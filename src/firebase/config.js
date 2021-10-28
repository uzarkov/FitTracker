import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBFmnkmRVzc20F7UXEoZu-YO81ytjGQfE4",
    authDomain: "fit-tracker-6ce95.firebaseapp.com",
    projectId: "fit-tracker-6ce95",
    storageBucket: "fit-tracker-6ce95.appspot.com",
    messagingSenderId: "105359919566",
    appId: "1:105359919566:web:b90d0e5f204dae6a36039f"
};

export const FirebaseApp = initializeApp(firebaseConfig)

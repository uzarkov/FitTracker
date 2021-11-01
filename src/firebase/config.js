import { initializeApp, } from "firebase/app";
import { initializeFirestore } from "@firebase/firestore";

export const FirebaseApp = initializeApp({
    apiKey: "AIzaSyBFmnkmRVzc20F7UXEoZu-YO81ytjGQfE4",
    authDomain: "fit-tracker-6ce95.firebaseapp.com",
    projectId: "fit-tracker-6ce95",
    storageBucket: "fit-tracker-6ce95.appspot.com",
    messagingSenderId: "105359919566",
    appId: "1:105359919566:web:b90d0e5f204dae6a36039f"
});

export const Firestore = initializeFirestore(FirebaseApp, {
    experimentalForceLongPolling: true,
});

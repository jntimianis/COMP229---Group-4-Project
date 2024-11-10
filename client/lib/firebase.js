import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6edRgETjyS_QMRh1u7hToxZY_OQ7yTGI",

  authDomain: "concertapp-b034c.firebaseapp.com",

  projectId: "concertapp-b034c",

  storageBucket: "concertapp-b034c.firebasestorage.app",

  messagingSenderId: "170678849244",

  appId: "1:170678849244:web:d02bbf59b40f7e98b3ee19",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

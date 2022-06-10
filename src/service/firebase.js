
// import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
// import { serviceAccount } from '../clavesSDK/adminsdk.jsx';
// dotenv.config();
const firebaseConfig = {
  apiKey: "AIzaSyDthzXYyY2U3oNgQM_w76wA3dahKX2uN2w",
  authDomain: "fluttergewete.firebaseapp.com",
  projectId: "fluttergewete",
  storageBucket: "fluttergewete.appspot.com",
  messagingSenderId: "175864252916",
  appId: "1:175864252916:web:a62e62b2ca803f5c2111a1",
  measurementId: "G-7LV9544FT4"
};

const app = initializeApp(firebaseConfig);
// initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
const db = getFirestore();
export { db }; 
import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBM0aywjgSRkYAp9itJ8MNYxDoSVyJ49DY",
    authDomain: "proyectointegrador-d933c.firebaseapp.com",
    projectId: "proyectointegrador-d933c",
    storageBucket: "proyectointegrador-d933c.appspot.com",
    messagingSenderId: "566295273585",
    appId: "1:566295273585:web:68cd6fee9549e94c487bd0"
  };

  app.initializeApp(firebaseConfig)

  export const auth = firebase.auth()
  export const storage = app.storage()
  export const db = app.firestore()
import {initializeApp} from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {getDatabase, ref} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCWKR_jNl8DBypN-KgTjZdSHNdPpuQ9cNA",
    authDomain: "gb-test-6f5a7.firebaseapp.com",
    projectId: "gb-test-6f5a7",
    storageBucket: "gb-test-6f5a7.appspot.com",
    messagingSenderId: "597101321541",
    appId: "1:597101321541:web:a386066594b3d526db722c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
}
export const logIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
}
export const logOut = async () => {
    await signOut(auth)
}

export const db = getDatabase(app);
export const userRef = ref(db, 'user');
export const chatsRef = ref(db, 'chats');
export const messagesRef = ref(db, 'messages');

export const getChatRefById = (id) => ref(db, `chats/${id}`);
export const getMessageRefById = (chatId) => ref(db, `messages/${chatId}`);
export const getMessageListRefById = (chatId) => ref(db, `messages/${chatId}/messageList`);



import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup,signInWithRedirect,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged } from 'firebase/auth';
import { getFirestore,doc,getDoc,setDoc,collection,writeBatch ,query,getDocs} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC6h6qJ0kNXxWXBe2SAay_cDbLOJKjJLSo",
    authDomain: "crwn-clothing-db-d9258.firebaseapp.com",
    projectId: "crwn-clothing-db-d9258",
    storageBucket: "crwn-clothing-db-d9258.firebasestorage.app",
    messagingSenderId: "485693632232",
    appId: "1:485693632232:web:57a1aecf9a749d28b7235d"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const Googleprovider=new GoogleAuthProvider();
  Googleprovider.setCustomParameters({prompt:'select_account'});
  export const auth=getAuth();
  export const signInWithGooglePopup=()=>signInWithPopup(auth,Googleprovider);
  export const signInWithGoogleRedirect=()=>signInWithRedirect(auth,Googleprovider);
  export const db=getFirestore();
  export const addCollectionAndDocuments= async(collectionKey,objectsToAdd)=>{
    const collectionRef=collection(db,collectionKey);
    const batch=writeBatch(db);

    objectsToAdd.forEach((object)=>{
        const docRef=doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef,object);
    });
     await batch.commit();
    console.log('done')
  }
  export const getCategoriesAndDocuments=async()=>{
    const collectionRef=collection(db,'categories');
    const q= query(collectionRef);
    const querySnapshot=await getDocs(q);
    const categoryMap=querySnapshot.docs.reduce((acc,docSnapshot)=>{
        const {title,items}=docSnapshot.data();
        acc[title.toLowerCase()]=items;
        return acc;
    },{})
    return categoryMap;
  }
  export const batch=writeBatch(db);
export const createUserDocumentFromAuth=async(userAuth,additionalInformation)=>{
if(!userAuth) return;
const userDocRef=doc(db,'users',userAuth.uid);  
const userSnapshot=await getDoc(userDocRef);
if(!userSnapshot.exists()){
    const {displayName,email}=userAuth;
    const createdAt=new Date();
    try{
        await setDoc(userDocRef,{displayName,email,createdAt,...additionalInformation});
    }catch(error){
        console.log('error creating user',error.message);
    }
}
return userDocRef;
}
export const signInAuthUserWithEmailAndPassword=async(email,password)=>{
    if(!email||!password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}
export const createAuthUserWithEmailAndPassword=async(email,password)=>{
    if(!email||!password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
}
export const signOutUser=async()=> await signOut(auth);

export const onAuthStateChangedListener=(callback)=>{
    onAuthStateChanged(auth,callback);
}
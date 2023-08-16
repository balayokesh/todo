import { useEffect, useState } from 'react';

import app from './firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

const provider = new GoogleAuthProvider();

export default function TopBar() {

    const [user, setUser] = useState();
    const auth = getAuth(app);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                console.log("user is logged out")
            }
        });
    }, [])

    const loginWithPopUp = () => {
        if (!auth.currentUser) {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const user = result.user;
                    setUser(user);
                    sessionStorage.setItem('userEmail', user.email);
                    console.log(user.email);
                    console.log(user);
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                });
        }
    }

    const handleLogout = () => {               
        signOut(auth).then(() => {
            console.log("Signed out successfully")
            setUser(null);
            sessionStorage.removeItem('userEmail');
        }).catch((error) => {
            // An error happened.
        });
    }

    if (user) {
        return (
            <div className='d-flex justify-content-between align-items-center'>
                <h3 className='align-middle m-2'>Welcome, {user.displayName}</h3>
                <img src={user.photoURL} alt='Profile' className='rounded-circle' onClick={handleLogout} height={'50px'} title='Log Out' id='logout' />
            </div>
        )
    }
    else {
        return (
            <p className='text-center m-2'>Plese login to save tasks <button onClick={loginWithPopUp} className='btn btn-sm'>Login now</button></p>
        );
    }
}
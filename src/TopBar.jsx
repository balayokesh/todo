import { useEffect, useState, useRef } from 'react';

import app from './firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

const provider = new GoogleAuthProvider();

export default function TopBar({onStateChange}) {

    const [user, setUser] = useState();
    const auth = getAuth(app);

    const onStateChangeRef = useRef(onStateChange);

    useEffect(() => {
        onStateChangeRef.current = onStateChange;
    }, [onStateChange]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            onStateChangeRef.current(user);
        });
        return () => unsubscribe();
    }, [auth]);

    const loginWithPopUp = () => {
        if (!auth.currentUser) {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    setUser(user);
                    sessionStorage.setItem('userEmail', user.email);
                }).catch((error) => {
                    console.error("Error during sign-in:", error);
                });
        }
    }

    const handleLogout = () => {               
        signOut(auth).then(() => {
            console.log("Signed out successfully")
            setUser(null);
            sessionStorage.removeItem('userEmail');
        }).catch((error) => {
            console.error(error);
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
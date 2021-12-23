import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const auth = getAuth();
    const signInUsingGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                console.log(result.user);
                setUser(result.user)
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const user = result.user;
                // ...
            })
            .catch(error => {
                setError(error.message);
            })
    }

    const signInUsingGithub = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                console.log(result.user);
                setUser(result.user)
            })
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                setUser({})
            })
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log('inside state change', user);
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUser(user)
                //   const uid = user.uid;
                // ...
            } else {
                // User is signed out
                // ...
            }
        })
    }, [])

    return {
        user,
        error,
        signInUsingGoogle,
        signInUsingGithub,
        logout
    }
}
export default useFirebase;
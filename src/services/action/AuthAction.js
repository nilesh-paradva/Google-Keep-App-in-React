import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { google_keep, Google_keep_auth, provider } from "../../Firebase"
import { addDoc, collection, getDocs } from "firebase/firestore"
import { UserIdGet } from "../reducer/StoreIgGet"

export const AuthToggleAct = () => {
    return {
        type: "AUTH_TOGGLE"
    }
}

const SignUpAct = (data) => {
    return {
        type: "SIGNUP",
        payload: data
    }
}

const SignInAct = (data) => {
    return {
        type: "SIGNIN",
        payload: data
    }
}

const SignInUserGetAct = (data) => {
    return {
        type: "SIGNIN_USER_GET",
        payload: data
    }
}

export const SignInFalseAct = () => {
    return {
        type: "SIGNFALSE"
    }
}

const UserLogOutAct = () => {
    return {
        type: "SIGNOUT"
    }
}

const Lodding = () => {
    return {
        type: "LODING"
    }
}


//Thunk

export const SignUpThunk = (data) => async (dispatch) => {

    dispatch(Lodding());

    try {
        const res = await createUserWithEmailAndPassword(Google_keep_auth, data.email, data.password);
        const user = res.user;

        const userData = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName || data.username
        };
        await addDoc(collection(google_keep, "users"), userData);
        // localStorage.setItem("User_Login_Id", JSON.stringify(userData.uid));
        dispatch(SignUpAct(userData));

    } catch (err) {
        console.log("err", err);
    }
}

export const GetSignInUserThunk = () => async dispatch => {

    dispatch(Lodding());

    try {
        const recs = (await getDocs(collection(google_keep, "users"))).docs.map(doc => ({ ...doc.data(), id: doc.id }));
        // setTimeout(() => {
        dispatch(SignInUserGetAct(recs));
        // }, 2000);
    } catch (err) {
        console.error("Error get recipes:", err);
    }
};

export const SignInThunk = (data) => async dispatch => {

    dispatch(Lodding());

    signInWithEmailAndPassword(Google_keep_auth, data.email, data.password).then((res) => {
        localStorage.setItem("User_Login_Id", JSON.stringify(res.user.uid));
        dispatch(SignInAct(res.user));
    }).catch((error) => {
        console.log("error", error);
    });
};

export const SignInPopupThunk = () => async dispatch => {
    try {
        const res = await signInWithPopup(Google_keep_auth, provider);

        await addDoc(collection(google_keep, "users"), {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL
        });
        localStorage.setItem("User_Login_Id", JSON.stringify(res.user.uid));
        dispatch(SignInAct(res.user));
    } catch (error) {
        console.error("Sign in error:", error);
    }
};


export const UserFindThunk = () => async (dispatch) => {
    try {
        const userid = UserIdGet();
        const res = await getDocs(collection(google_keep, "users"));
        const userDoc = res.docs.find(doc => doc.data().uid === userid);

        if (userDoc) {
            const userData = userDoc.data();
            console.log("User Data:", userData);
            
            dispatch(SignInAct(userData));
        } else {
            console.log("No user found with UID:", userid);
        }

    } catch (error) {
        console.error("Error fetching user:", error);
    }
};

export const SignOutThunk = () => async dispatch => {
    try {
        await signOut(Google_keep_auth);
        localStorage.removeItem("User_Login_Id");
        dispatch(UserLogOutAct());
        return true; 
    } catch (error) {
        console.error("Sign out error:", error);
        return false;
    }
};
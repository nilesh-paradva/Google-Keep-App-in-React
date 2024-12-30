import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { google_keep } from "../../Firebase"

export const SearchAct = () => {
    return {
        type: "SEARCH"
    }
}

export const SidebarsrAct = () => {
    return {
        type: "SIDEBAR_TOGGLE"
    }
}




const AddNotesAct = () => {
    return {
        type: "ADD_NOTES"
    }
}

const TrashNotesAct = (data) => {
    return {
        type: "TRASH_NOTES",
        payload: data
    }
}

const GetNotesAct = (data) => {
    return {
        type: "GET_NOTES",
        payload: data
    }
}

const GetTrashNotesAct = (data) => {
    return {
        type: "GET_TRASH_NOTES",
        payload: data
    }
}

const GetArchiveNotesAct = (data) => {
    return {
        type: "GET_ARCHIVE_NOTES",
        payload: data
    }
}

const SingleNotes = (data) => {
    return {
        type: "SINGLE_NOTES",
        payload: data
    }
}

const UpdateNotes = (data) => {
    return {
        type: "UPDATE_NOTES",
        payload: data
    }
}

const Lodding = () => {
    return {
        type: "LODING"
    }
}

//Thunk

export const AddNotesThunk = (data) => async (dispatch) => {
    
    dispatch(Lodding());

    await addDoc(collection(google_keep, "notes"), data);
    dispatch(AddNotesAct())
}

export const GetNotesThunk = () => async dispatch => {

    dispatch(Lodding());

    try {
        const recs = (await getDocs(collection(google_keep, "notes"))).docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setTimeout(() => {
            dispatch(GetNotesAct(recs));
        }, 2000);
    } catch (err) {
        console.error("Error get recipes:", err);
    }
};

export const GetTrashNotesThunk = () => async dispatch => {

    dispatch(Lodding());

    try {
        const recs = (await getDocs(collection(google_keep, "trash"))).docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setTimeout(() => {
            dispatch(GetTrashNotesAct(recs));
        }, 2000)
    } catch (err) {
        console.error("Error get recipes:", err);
    }
};

export const GetArchiveNotesThunk = () => async dispatch => {

    dispatch(Lodding());

    try {
        const recs = (await getDocs(collection(google_keep, "archives"))).docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setTimeout(() => {
            dispatch(GetArchiveNotesAct(recs));
        }, 2000)
    } catch (err) {
        console.error("Error get recipes:", err);
    }
};


export const SingleNotesThunk = (id) => async dispatch => {

    // dispatch(Lodding());

    try {
        const rec = await getDoc(doc(google_keep, "notes", id));
        let getData = rec.data();
        getData.id = rec.id;
        dispatch(SingleNotes(getData));
    } catch (err) {
        console.error(err);
    }
}

export const UpdateNotesThunk = (data) => async dispatch => {

    dispatch(Lodding());

    try {
        await setDoc(doc(google_keep, "notes", data.id), data);
        dispatch(UpdateNotes(data));
    } catch (err) {
        console.error(err);
    }
}

export const DeleteNotesThunk = (id, data) => async dispatch => {

    dispatch(Lodding());

    try {
        await deleteDoc(doc(google_keep, "notes", id));
        await setDoc(doc(google_keep, "trash", id), data);

        dispatch(GetNotesThunk());
    } catch (err) {
        console.error(err);
    }
}

export const AddArchiveNotesThunk = (id, data) => async dispatch => {
    try {
        await deleteDoc(doc(google_keep, "notes", id));
        await setDoc(doc(google_keep, "archives", id), data);

        dispatch(GetNotesThunk());
    } catch (err) {
        console.error(err);
    }
}


export const DeleteTrashNotesThunk = (id) => async dispatch => {
    try {
        await deleteDoc(doc(google_keep, "trash", id));
        dispatch(GetTrashNotesThunk());
    } catch (err) {
        console.error(err);
    }
}

export const DeleteArchiveNotesThunk = (id, data) => async dispatch => {
    try {
        await deleteDoc(doc(google_keep, "trash", id));
        await deleteDoc(doc(google_keep, "archives", id));
        await setDoc(doc(google_keep, "notes", id), data);

        dispatch(GetTrashNotesThunk());
        dispatch(GetArchiveNotesThunk());
    } catch (err) {
        console.error(err);
    }
}
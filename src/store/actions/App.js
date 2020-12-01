import firebase from "../../containers/Firebase/firebase";


import {
    FETCH_START,
    FETCH_END,
    FETCH_ERROR,
    SET_SCOUTNOTE_ADD_STATUS,
    SET_SCOUT_NOTES,
    SET_AUTH_USER,
    SET_FAILED_LOGIN_STATUS
  } from "../../constants/ActionTypes";

  import { history } from "..";

  const db = firebase.firestore();
  const auth = firebase.auth();

export const startFetching = () => ({
  type: FETCH_START
});

export const fetchSuccessful = () => ({
  type: FETCH_END
});

export const fetchError = payload => ({
  type: FETCH_ERROR,
  payload: payload
});

export const resetNoteAddStatus = () => ({
  type:SET_SCOUTNOTE_ADD_STATUS,
  payload:'init_state'
})

export const resetFailedLoginStatus = () => ({
  type:SET_FAILED_LOGIN_STATUS,
  payload1:'init_state',
  payload2:""
})

const setAuth = (access_token,email) => {
  localStorage.setItem("access_token",access_token);
  localStorage.setItem("auth_email",email);
}

const setNotes = (notes) => {
  localStorage.setItem("fetched_notes",JSON.stringify(notes));
}

const setAuthEmail = (authEmail) => ({
  type:SET_AUTH_USER,
  payload:authEmail
});


export const FetchNotes = () => dispatch => {
  dispatch(startFetching());
  db.collection("notes").orderBy("dateOfNote", "desc")
  .get()
  .then(querySnapshot => {
    const data = querySnapshot.docs.map(doc => doc.data());
    console.log(data); // array of notes objects
    setNotes(data);
    dispatch({
      type:SET_SCOUT_NOTES,
      payload:data
    });
    dispatch(fetchSuccessful());
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
      dispatch(fetchError());
  });  
  
};

export const addNotes = (formData) => dispatch => {
  dispatch(startFetching());
  db.collection("notes").add({
    name: formData.name,
    dateOfNote: formData.dateOfNote,
    description:formData.description
  })
  .then(function() {
    console.log("Document successfully written!");
    dispatch({
      type:SET_SCOUTNOTE_ADD_STATUS,
      payload:"success"
    });
    dispatch(FetchNotes());
    dispatch(fetchSuccessful());
})
.catch(function(error) {
    console.error("Error writing document: ", error);
    dispatch(fetchError());
});  
  
};

export const login = (formData) => dispatch => {
  dispatch(startFetching());
  auth.signInWithEmailAndPassword(formData.email, formData.password)
  .then((user) => {
    // Signed in 
    // ...
    setAuth(user.user.ya,user.user.email);
    dispatch(setAuthEmail(user.user.email));
    console.log(user);
    history.push("/")
    dispatch(fetchSuccessful());
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    dispatch(fetchError());
    dispatch({
      type:SET_FAILED_LOGIN_STATUS,
      payload1:"failed",
      payload2:errorMessage
    });
  });
  
};

export const logout = () => dispatch => {
  auth.signOut().then(function() {
    // Sign-out successful.
    localStorage.clear();
    history.push("/")
  }).catch(function(error) {
    // An error happened.
  });
  
};
  
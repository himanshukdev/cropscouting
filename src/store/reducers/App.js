import {
  FETCH_START,
  FETCH_END,
  FETCH_ERROR,
  SET_SCOUTNOTE_ADD_STATUS,
  SET_SCOUT_NOTES,
  SET_AUTH_USER,
  SET_FAILED_LOGIN_STATUS
} from "../../constants/ActionTypes";

const notesParser = () => {
  const notes = JSON.parse(localStorage.getItem("fetched_notes"));
  if(notes){
    return notes;
  }else{
    return []
  }
}

let initState = {
 isFetchingData: false,
 serachedUserData:{},
 userRepoData:[],
 fakeToken: '',
 noteAddstatus:'init_state',
 scoutNotes: notesParser(),
 authUserEmail:localStorage.getItem("auth_email") || "",
 failedLoginStatus:"init_state",
 failedLoginMessage:""
};

const app = (state = initState, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        isFetchingData: true,
        isFetchedError: false,
        fetchError: ""
      };
    case FETCH_END:
      return {
        ...state,
        isFetchingData: false,
        isFetchedError: false,
        fetchError: ""
      };
    case FETCH_ERROR:
      return {
        ...state,
        isFetchingData: false,
        isFetchedError: true,
        fetchError: action.payload
      };
    case SET_SCOUTNOTE_ADD_STATUS:
      return {
        ...state,
        noteAddstatus:action.payload
      };
    case SET_SCOUT_NOTES:
      return {
        ...state,
        scoutNotes:action.payload
      };
    case SET_AUTH_USER:
      return {
        ...state,
        authUserEmail:action.payload
      };
    case SET_FAILED_LOGIN_STATUS:
      return {
        ...state,
        failedLoginStatus:action.payload1,
        failedLoginMessage: action.payload2
      }
    default:
      return state;
  }
};

export default app;

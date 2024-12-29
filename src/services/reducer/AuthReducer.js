const initialState = {
    users: [],
    user: null,
    AuthToggle: false,
    isSignUp: false,
    isSignIn: false,
    isLoading: false
};


export const AuthReducer = (state = initialState, action) => {

    switch (action.type) {

        case "SIGNUP":
            return { ...state, users: [...state.users, action.payload], user: action.payload, isSignUp: true, isSignIn: false, isLoading: false }

        case "SIGNIN_USER_GET":
            return { ...state, users: action.payload, isSignIn: false, isSignUp: false, isLoading: false }

        case 'SIGNFALSE':
            return { ...state, isSignUp: false, isSignIn: false, isLoading: false }

        case "SIGNIN":
            return { ...state, user: action.payload, isSignUp: false, isSignIn: true, AuthToggle: true, isLoading: false }

        case "SIGNOUT":
            return { ...state, user: null, isSignUp: false, isSignIn: false, AuthToggle: false, isLoading: false }

        case "AUTH_TOGGLE":
            return { ...state, AuthToggle: !state.AuthToggle }

        case "LODING":
            return { ...state, isLoading: true }

        default:
            return state;
    }
}

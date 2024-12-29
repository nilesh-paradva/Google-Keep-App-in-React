const initialState = {
    notes: [],
    trash: [],
    archive: [],
    loading: false,
    note: null,
    thisNote: null,
    isCreated: false,
    SidebarToggle: false,
    SearchToggle: false,
};


export const GoogleKeepReducer = (state = initialState, action) => {

    switch (action.type) {

        case "ADD_NOTES":
            return { ...state, isCreated: true }

        case "TRASH_NOTES":
            return { ...state, isCreated: false }

        case "GET_NOTES":
            return { ...state, notes: action.payload, isCreated: false, loading: false}

        case "GET_TRASH_NOTES":
            return { ...state, trash: action.payload, isCreated: false , loading: false}

        case "GET_ARCHIVE_NOTES":
            return { ...state, archive: action.payload, isCreated: false, loading: false}

        case "SINGLE_NOTES":
            return { ...state, note: action.payload, isCreated: false, loading: false}

        case "UPDATE_NOTES":
            return { ...state, note: action.payload, isCreated: true, loading: false}

        case "SEARCH":
            return { ...state, SearchToggle: !state.SearchToggle, isCreated: false }

        case "SIDEBAR_TOGGLE":
            return { ...state, SidebarToggle: !state.SidebarToggle, isCreated: false }

        case 'LODING':
            return { ...state, loading: true, isCreated: false }

        default:
            return state;
    }
}
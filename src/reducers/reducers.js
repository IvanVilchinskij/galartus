const initialState = {
    collections: [],
    exhibitions: [],
    pictures: [],
    loadingCollections: true,
    darkHeader: false,
    currentCollection: null,
    currentPicture: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_HEADER_COLOR':
            return {
                ...state,
                darkHeader: action.darkHeader
            }
        case 'COLLECTIONS_LOADED':
            return {
                ...state,
                collections: action.payload,
                loadingCollections: false
            };
        case 'EXHIBITIONS_LOADED':
            return {
                ...state,
                exhibitions: action.payload
            };
        case 'PICTURES_LOADED':
            return {
                ...state,
                pictures: action.payload
            };
        case 'DEF_CURRENT_COLLECTION':
            return {
                ...state,
                currentCollection: action.currentId
            }
        case 'SET_CURRENT_PICTURE':
            return {
                ...state,
                currentPicture: action.payload
            }
        default:
            return state;
    }
};

export default reducer;
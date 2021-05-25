const initialState = {
    collections: [],
    exhibitions: [],
    pictures: [],
    isLoadingCollections: true,
    isErrorCollcetions: false,
    isLoadingPictures: true,
    isErrorPictures: false,
    isLoadingExhibitions: true,
    isErrorExhibitions: false,
    darkHeader: false,
    currentPicture: [],
    isAutorization: null,
    likesId: null,
    cartCount: null,
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
                isLoadingCollections: false,
                isErrorCollcetions: false
            };
        case 'COLLECTIONS_REQUSTED':
            return {
                ...state,
                isErrorCollcetions: false,
                isLoadingCollections: true
            }
        case 'COLLECTIONS_ERROR':
            return {
                ...state,
                isLoadingCollections: false,
                collections: null,
                isErrorCollcetions: true
            };
        case 'EXHIBITIONS_LOADED':
            return {
                ...state,
                exhibitions: action.payload,
                isLoadingExhibitions: false,
                isErrorExhibitions: false
            };
        case 'EXHIBITIONS_REQUSTED':
            return {
                ...state,
                isErrorExhibitions: false,
                isLoadingExhibitions: true
            };
        case 'EXHIBITIONS_ERROR':
            return {
                ...state,
                exhibitions: null,
                isLoadingExhibitions: false,
                isErrorExhibitions: true
            };
        case 'PICTURES_LOADED':
            return {
                ...state,
                pictures: action.payload,
                isLoadingPictures: false,
                isErrorPictures: false
            };
        case 'PICTURES_REQUSTED':
            return {
                ...state,
                isErrorPictures: false,
                isLoadingPictures: true
            };
        case 'PICTURES_ERROR':
            return {
                ...state,
                pictures: null,
                isLoadingPictures: false,
                isErrorPictures: true
            }
        case 'SET_CURRENT_PICTURE':
            return {
                ...state,
                currentPicture: action.payload
            }
        case 'SET_IS_AUTORIZATION':
            return {
                ...state,
                isAutorization: action.isAutorization
            }
        case 'SET_LIKES_ID':
            return {
                ...state,
                likesId: action.payload,
            }
        case 'SET_CART_COUNT':
            return {
                ...state,
                cartCount: action.count
            }
        default:
            return state;
    }
};

export default reducer;
const collectionsLoaded = (newCollections) => {
    return {
        type: 'COLLECTIONS_LOADED',
        payload: newCollections
    }
};

const collectionsRequsted = () => {
    return {
        type: 'COLLECTIONS_REQUSTED'
    }
};

const collectionsError = () => {
    return {
        type: 'COLLECTIONS_ERROR'
    }
};

const exhibitionsLoaded = (newExhibitions) => {
    return {
        type: 'EXHIBITIONS_LOADED',
        payload: newExhibitions
    }
};

const exhibitionsRequsted = () => {
    return {
        type: 'EXHIBITIONS_REQUSTED'
    }
};

const exhibitionsError = () => {
    return {
        type: 'EXHIBITIONS_ERROR'
    }
};

const picturesLoaded = (newPictures) => {
    return {
        type: 'PICTURES_LOADED',
        payload: newPictures
    }
};

const picturesRequsted = () => {
    return {
        type: 'PICTURES_REQUSTED'
    }
};

const picturesError = () => {
    return {
        type: 'PICTURES_ERROR'
    }
};

const toggleHeaderColor = (isDarkHeader) => {
    return {
        type: 'TOGGLE_HEADER_COLOR',
        darkHeader: isDarkHeader
    }
};

const defCurrentCollection = (collectionId) => {
    localStorage.setItem('collectionId', collectionId);

    return {
        type: 'DEF_CURRENT_COLLECTION',
        currentId: collectionId
    }
};

const setCurrentPicture = (newPicture) => {
    return {
        type: 'SET_CURRENT_PICTURE',
        payload: newPicture
    }
};

const setAutorization = (isAuto) => {
    return {
        type: 'SET_IS_AUTORIZATION',
        isAutorization: isAuto
    }
};

export {
    collectionsLoaded,
    exhibitionsLoaded,
    picturesLoaded,
    toggleHeaderColor,
    defCurrentCollection,
    setCurrentPicture,
    collectionsError,
    picturesError,
    exhibitionsError,
    collectionsRequsted,
    exhibitionsRequsted,
    picturesRequsted,
    setAutorization,
};
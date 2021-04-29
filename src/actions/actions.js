const collectionsLoaded = (newCollections) => {
    return {
        type: 'COLLECTIONS_LOADED',
        payload: newCollections
    }
};

const exhibitionsLoaded = (newExhibitions) => {
    return {
        type: 'EXHIBITIONS_LOADED',
        payload: newExhibitions
    }
};

const picturesLoaded = (newPictures) => {
    return {
        type: 'PICTURES_LOADED',
        payload: newPictures
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

export {
    collectionsLoaded,
    exhibitionsLoaded,
    picturesLoaded,
    toggleHeaderColor,
    defCurrentCollection,
    setCurrentPicture
};
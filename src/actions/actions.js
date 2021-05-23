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

const setLikesId = (newLikes) => {
    const newLikesId = new Set();

    if (newLikes) {
        newLikes.forEach(item => {
            newLikesId.add(item.picture.id);
        });
    }

    return {
        type: 'SET_LIKES_ID',
        payload: newLikesId,
    }
};

const setCartCount = (oldCount, newCount) => {
    const count = oldCount + newCount;
    
    return {
        type: 'SET_CART_COUNT',
        count: count
    }
};

export {
    collectionsLoaded,
    exhibitionsLoaded,
    picturesLoaded,
    toggleHeaderColor,
    setCurrentPicture,
    collectionsError,
    picturesError,
    exhibitionsError,
    collectionsRequsted,
    exhibitionsRequsted,
    picturesRequsted,
    setAutorization,
    setLikesId,
    setCartCount,
};
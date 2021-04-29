import React from 'react';

import MuseamServiceContext from '../museamServiceContext/museamServiceContext';

const WithMuseamService = () => (Wrapped) => {
    return (props) => {
        return (
            <MuseamServiceContext.Consumer>
                {
                    (MuseamService) => {
                        return <Wrapped {...props} MuseamService={MuseamService}/>
                    }
                }
            </MuseamServiceContext.Consumer>
        );
    };
};

export default WithMuseamService;
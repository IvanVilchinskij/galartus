import React from 'react';

const FormErrors = ({formErrors, typeFor}) => {
    
    return (
        <div className="form-errors">
            {formErrors[typeFor]}
        </div>
    );

};

export default FormErrors;
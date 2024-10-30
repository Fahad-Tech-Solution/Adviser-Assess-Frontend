import { useField } from 'formik';
import React from 'react'

const CInput = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);

    return (
        <div className="input-wrapper">
            {label && <label htmlFor={props.id || props.name}>{label}</label>}
            <input
                {...field}
                {...props}
                className={`form-control ${props.className || ""} ${meta.touched && meta.error ? "is-invalid" : ""
                    }`}
            />
            {meta.touched && meta.error ? (
                <div className="error-text">{meta.error}</div>
            ) : null}
        </div>
    );
};



export default CInput

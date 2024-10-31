import React from "react";

const CInput = ({ label, meta, className, ...props }) => {
    return (
        <div className="input-wrapper">
            {label && <label htmlFor={props.id || props.name}>{label}</label>}
            <input
                {...props}
                className={`form-control ${className || ""} ${meta.touched && meta.error ? "is-invalid" : ""
                    }`}
            />
            {meta.touched && meta.error ? (
                <div className="error-text">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default CInput;

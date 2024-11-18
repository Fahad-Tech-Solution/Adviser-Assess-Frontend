import { notification } from "antd";
import axios from "axios";
import { BiInfoCircle } from "react-icons/bi";

let GetAxios = async (Api) => {
    console.log("Get api Chali")
    try {
        const response = await axios.get(Api);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:",
            error.message); // Log error message
        console.error("Response:", error.response); // Log response error details if available
        throw error; // Rethrow the error to be caught in the calling function
    }
}

const PostAxios = async (Api, data) => {
    console.log("Post Chala ");
    try {
        const response = await axios.post(Api, data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.message); // Log error message
        console.error("Response:", error.response); // Log response error details if available
        throw error; // Rethrow the error to be caught in the calling function
    }
};

let PutAxios = async (Api, data) => {
    console.log("Put api Chali")
    try {
        const response = await axios.put(Api, data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.message); // Log error message
        console.error("Response:", error.response); // Log response error details if available
        throw error; // Rethrow the error to be caught in the calling function
    }
}

let PatchAxios = async (Api, data) => {
    console.log("Patch api Chali")
    try {
        const response = await axios.patch(Api, data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.message); // Log error message
        console.error("Response:", error.response); // Log response error details if available
        throw error; // Rethrow the error to be caught in the calling function
    }
}

let DeleteAxios = async (Api) => {
    console.log("Delete api Chali")
    try {
        const response = await axios.delete(Api);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.message); // Log error message
        console.error("Response:", error.response); // Log response error details if available
        throw error; // Rethrow the error to be caught in the calling function
    }
}

let DateHandler = async (value) => {
    // console.log("DateHandler Chal gaya", value);
    let a = await new Date(value);
    return a
}

const openNotification = (type, placement, message, description) => {
    notification[type]({
        message: <span style={{ fontWeight: '600' }}>{message}</span>,
        description: description,
        placement,
        duration: 3,
        // duration: 0,
        showProgress: true,
        style: {
            padding: '10px',
            lineHeight: '1.5',
            alignItems: 'center'
        },
    });
};

const toCommaAndDollar = (x) =>
    "$" +
    Math.ceil(x)
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const toNumericValue = (formattedValue) => {
    if (formattedValue && typeof formattedValue === "string") {
        return formattedValue.replace(/[$,]/g, "");
    }
    return "0";
};

let toPercentage = (x) => {
    if (typeof x !== 'number' || isNaN(x)) {
        throw new Error("Input must be a valid number");
    }
    return x.toFixed(2) + "%";
};

let RenderName = (Input) => {
    if (Input === "client") {
        return (localStorage.getItem("UserName"))
    }
    else if (Input === "partner") {
        return (localStorage.getItem("PartnerName"))
    }
    else if (Input === "joint") {
        let userStatus = localStorage.getItem('UserStatus');
        if (userStatus === "Married") {
            return (localStorage.getItem("UserName") + " + " + localStorage.getItem("PartnerName"))
        } else {
            return (localStorage.getItem("UserName"))
        }
    }
}

const handleInputChange = (e, setFieldValue, FormulaSetting, values, stakeHolder) => {
    let value = parseFloat(e.target.value.replace(/[^0-9.]+/g, "")); // Remove all non-numeric characters except '.'

    if (value > 100) {
        setFieldValue(e.target.name, "100%");

        // Call your custom formula logic
        FormulaSetting(values, setFieldValue, e.target, stakeHolder);
    } else {
        setFieldValue(e.target.name, e.target.value); // Update value without '%'
    }
};

const handleInputFocus = (e, setFieldValue) => {
    // Remove the percentage sign
    let value = e.target.value.replace(/[^0-9.]+/g, ""); // Remove all non-numeric characters except '.'
    setFieldValue(e.target.name, value); // Update value without '%'
};

const handleInputKeyDown = (e) => {
    const allowedKeys = [
        "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab",
        "Home", "End", "Escape", "."
    ];

    // Allow default behavior for allowed keys
    if (allowedKeys.includes(e.key)) {
        return; // Let default behavior happen
    }

    // Trigger onBlur on pressing Enter (for example)
    if (e.key === "Enter") {
        e.target.blur(); // This will trigger the onBlur event
    }

    // Prevent non-numeric input
    if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
    }
};

const handleInputBlur = (e, setFieldValue, toPercentage, FormulaSetting, values, stakeHolder) => {
    let value = e.target.value.replace(/[^0-9.]+/g, "");
    let numericValue = parseFloat(value);

    // Validate and convert to percentage if necessary
    if (!isNaN(numericValue)) {
        if (numericValue > 100) {
            numericValue = 100;
        }
        setFieldValue(e.target.name, toPercentage(numericValue));
    } else {
        setFieldValue(e.target.name, ""); // Clear if not valid
    }

    // Call your custom formula logic
    FormulaSetting(values, setFieldValue, e.target, stakeHolder);
};

const validateName = (value) => {
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, ''); // Allow only letters and spaces
    return filteredValue
};


const CheckValidation = async (currentPath, cLocation, validateForm, validateField, setFieldTouched, keyObj, values) => {
    // Safely access diseaseAndConditions length or default to 0
    const loopLength = values?.[`${keyObj.key}_diseaseAndConditions`]?.length || 0;
    let hasErrors = false;

    try {
        // Iterate through each dynamic field and validate it
        for (let i = 0; i < loopLength; i++) {
            const fieldNameActivityType = `${keyObj.key}_ActivityType${i}`;
            const fieldNameFrequency = `${keyObj.key}_Frequency${i}`;

            // Mark fields as touched
            await setFieldTouched(fieldNameActivityType, true, false);
            await setFieldTouched(fieldNameFrequency, true, false);

            // Validate the fields
            await validateField(fieldNameActivityType);
            await validateField(fieldNameFrequency);

            // Check if any errors are present
            const errors = await validateForm();
            if (
                errors[fieldNameActivityType] ||
                errors[fieldNameFrequency]
            ) {
                hasErrors = true;
            }
        }

        console.log("Validation complete. Errors:", hasErrors);
    } catch (error) {
        console.error("An error occurred during validation:", error);
        hasErrors = true; // Treat exceptions as validation failures
    }

    // Return whether the form is valid or not
    return !hasErrors;
};

const validateDynamicFields = async (
    keyObj,
    values,
    dynamicFields,
    setFieldTouched,
    validateField,
    validateForm
) => {
    let hasErrors = false;

    try {
        // Iterate through each dynamic field and validate it
        for (let field of dynamicFields) {
            const fieldName = `${keyObj.key}_${field.name}`;


            // Mark the field as touched
            await setFieldTouched(fieldName, true, false);

            // Validate the field
            await validateField(fieldName);

            // Check if any errors are present
            const errors = await validateForm();
            console.log(errors)
            if (errors[fieldName]) {
                hasErrors = true;
            }
        }

        console.log("Dynamic field validation complete. Errors:", hasErrors);
    } catch (error) {
        console.error("An error occurred during dynamic field validation:", error);
        hasErrors = true; // Treat exceptions as validation failures
    }

    // Return whether the form is valid or not
    return !hasErrors;
};



export {
    DeleteAxios,
    GetAxios,
    PostAxios,
    PutAxios,
    PatchAxios,
    DateHandler,
    openNotification,
    toCommaAndDollar,
    toNumericValue,
    toPercentage,
    RenderName,
    handleInputChange,
    handleInputFocus,
    handleInputKeyDown,
    handleInputBlur,
    validateName,
    CheckValidation,
    validateDynamicFields
};


import React from "react";
import CButton from "../Custom/CButton";
import FormComponent from "../Custom/FormComponent";

const DynamicComp = {
    "listOfItems": [
        {
            component: <CButton />, // Directly using JSX, no function
            Title: "Button 1",
            subDescription: "Simple button",
            textLog: `let {styles, extra, callBackFunction, 
            text,type}=props
//Types can be {"primary","dashed","text","link"}
//Types can be {"dashed","filled","text","link"}
            <Button
              style={styles} 
              className={extra} 
              onClick={() => { callBackFunction() }}
            > 
                {text}
            </Button>`,
            route: "/Button",
            Props: {
                style: {},
                extra: "",
                callBackFunction: () => { alert("button Clicked") },
                text: "button",
            }
        },
        {
            component: <CButton />, // Wrap in a function
            Title: "Button 2",
            subDescription: "Buttons solid",
            textLog: `
        let {styles,extra,callBackFunction,text,type}=props
            
            <Button
              style={styles} 
              className={extra} 
              onClick={() => { callBackFunction() }}
            > 
                {text}
            </Button>`,
            route: "/ButtonSolid",
            Props: {
                style: {},
                extra: "",
                callBackFunction: () => { alert("button Clicked") },
                text: "button",
                type: "primary",
                variant: "text",
            }

        },
        {
            component: <CButton />,
            Title: "From",
            subDescription: "",
            textLog: `
                <Formik
                  initialValues={{ inputName: "", inputNumber: "" }}
                  validationSchema={Yup.object({ /* validation rules */ })}
                  onSubmit={(values) => console.log(values)}
                >
                  <Form>
                    <Field name="inputName" component={CInput} placeholder="Enter name..." />
                    <Field name="inputNumber" component={CInput} placeholder="Enter number..." />
                    <button type="submit">Submit</button>
                  </Form>
                </Formik>`,
            route: "/Form",
            Props: {
                style: {},
                extra: "",
                callBackFunction: () => { alert("button Clicked") },
                text: "button",
                type: "primary",
                variant: "text",
            }
        },
        {
            component: "",
            Title: "CheckBox",
            subDescription: "",
            textLog: "",
            route: "/CheckBox"
        },
        {
            component: "",
            Title: "Radio",
            subDescription: "",
            textLog: "",
            route: "/Radio"
        },
        {
            component: "",
            Title: "Image",
            subDescription: "",
            textLog: "",
            route: "/Image"
        },
        {
            component: "",
            Title: "Table",
            subDescription: "",
            textLog: "",
            route: "/Table"
        },
    ]
}


export default DynamicComp;
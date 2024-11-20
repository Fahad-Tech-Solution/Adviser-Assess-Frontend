import React, { useEffect, useState } from 'react';
import { Anchor, ConfigProvider } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Content from '../assets/Content';
import { handleTouchFields, openNotification } from '../assets/Api/Api';

const SideSteps = (props) => {
    const { Link } = Anchor;
    const { Pages } = Content;
    const location = useLocation();
    const navigate = useNavigate();

    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    const [items, setItems] = useState([]);

    useEffect(() => {
        const currentPath = location.pathname.split("/")[1] || "";

        // Filter and map items based on the current condition
        const itemsToRender = Pages;
        const conditionCheck = true;

        const updatedItems = itemsToRender.filter(item => item.condition(conditionCheck)).map(item => {
            const isCurrentStep = currentPath === item.route.replace("/", "");

            return {
                ...item,
                isCurrentStep,
                title: (
                    <span
                        style={{
                            color: isCurrentStep ? "green" : "#808080",  // Green if active
                            fontSize: "14px",
                            width: "100%",
                            fontWeight: isCurrentStep ? "700" : "600"
                        }}
                        role="button"
                        onClick={async () => {
                            if (currentPath === "PersonalDetails") {
                                const touch = await setFieldTouched("EmailAddress");
                                if (!touch.EmailAddress) {
                                    handleStepClick(item.route);
                                } else {
                                    openNotification("error", "topRight", "Warning Notification", "Please! enter email before proceeding");
                                }
                            }
                            else {


                                let handleTouchFieldsResult = await handleTouchFields(location, setFieldTouched, values, validateForm);

                                if (!handleTouchFieldsResult) return false;

                                handleStepClick(item.route);
                            }

                        }}
                    >
                        {item.Title}
                    </span>
                )
            };
        });

        setItems(updatedItems);
    }, [location.pathname, values]);  // Update items when location changes

    const handleStepClick = (route) => {
        navigate(route);
    };

    return (
        <div
            className='py-5 bg-lightGreen h-100  rounded position-relative  w-100'
            style={{
                minHeight: "85vh"
            }}
        >
            <ConfigProvider>
                <Anchor
                    className="custom-anchor position-fixed w-100"
                    affix={false} // Optional: Disable sticky behavior
                >
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            to={item.route}
                            title={item.title}
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default anchor behavior
                                handleStepClick(item.route); // Use custom navigation
                            }}
                            className={item.isCurrentStep ? "active-step" : ""}
                        />
                    ))}
                </Anchor>
            </ConfigProvider>
        </div>
    );
};

export default SideSteps;


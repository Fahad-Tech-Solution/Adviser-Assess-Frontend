import React, { useEffect, useState } from 'react';
import { Anchor, ConfigProvider } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Content from '../assets/Content';

const SideSteps = (props) => {
    const { Link } = Anchor;
    const { Pages } = Content;
    const location = useLocation();
    const navigate = useNavigate();

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
                        onClick={() => handleStepClick(item.route)}
                    >
                        {item.Title}
                    </span>
                )
            };
        });

        setItems(updatedItems);
    }, [location.pathname]);  // Update items when location changes

    const handleStepClick = (route) => {
        navigate(route);
    };

    return (
        <div
            className='py-5 bg-lightGreen h-100  rounded position-relative  w-100'
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

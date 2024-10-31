import React from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const LandingPage = (props) => {
    const { elem } = props;
    const imageUrl = elem?.img || 'default-image.jpg'; // Provide a default image if img is undefined
    let Nav = useNavigate();

    return (
        <div className='container-fluid'>
            <div className='container d-flex flex-column pt-5 justify-content-center align-items-center gap-3'>
                <Image src={imageUrl} fluid alt="Landing Page Image" />

                <h1 className='Head1'>INSURANCE PRE-ASSESSMENT FORM</h1>
                <div className="w-100 ">
                    <div className="row justify-content-center ">
                        <div className="col-md-3 ">
                            <button className='btn btnCustom w-100' onClick={() => Nav("/Disclosure")}> <MdKeyboardDoubleArrowRight size={25} />Start</button>
                        </div>
                    </div>
                </div>
                <p className='fw-bold text-center'>Denaro Wealth Pty Ltd (ABN 23 625 686 464) is a Corporate Authorised Representative (ASIC No. 1263750) of Lifespan Financial Planning Pty Ltd (AFSL: 229892)</p>
            </div>
            <div className='px-4'>
                <p style={{ textAlign: "justify" }}>The information you provide will be used to conduct a <strong> pre-assessment of your insurance needs</strong>. This process helps to determine the level of coverage most suitable for your individual situation, including income protection or life insurance. The pre-assessment allows the insurer or financial adviser to review your personal, medical, and financial details to offer accurate advice and potential insurance solutions.</p>
                <p style={{ textAlign: "justify" }}>By fully disclosing your health history, lifestyle factors, and other relevant information, the pre-assessment ensures that any recommendations made are tailored to your needs, and that the policy you apply for provides the appropriate coverage. It also helps to identify any potential exclusions or loadings (adjustments to premiums) upfront, avoiding surprises later in the application process.</p>
                <p style={{ textAlign: "justify" }}>Rest assured that the information will be kept confidential and used solely for the purpose of determining your insurance requirements. This process enables you to make informed decisions and choose the right protection for your financial security and peace of mind.</p>
                <p style={{ textAlign: "justify" }}>If you have any questions, feel free to reach out. We’re here to help every step of the way. Thank you for your time and trust.</p>
            </div>
        </div>
    );

}

LandingPage.propTypes = {
    elem: PropTypes.shape({
        img: PropTypes.string.isRequired, // Ensure img is a string and required
    })
};

export default LandingPage;

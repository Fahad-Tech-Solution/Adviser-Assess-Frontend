import React from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import CInput from '../assets/Custom/CInput';

const Disclosure = (props) => {
    const { elem } = props;
    const imageUrl = elem?.img || 'default-image.jpg'; // Provide a default image if img is undefined
    let Nav = useNavigate();

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center align-items-center vh-100'>
                <div className='col-md-8'>
                    <h4 className='fw-bold text-center'>Disclosure</h4>
                    <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', width: "100%", height: "70vh", textWrap: "wrap", }}>
                        <code>
                            <div className='px-4'>
                                <h4 className='fw-bold'>Duty of Disclosure</h4>
                                <p style={{ textAlign: "justify" }}>You have a duty, under the Insurance Contracts Act 1984, to inform an insurer of every matter that you know, or could reasonably be expected to know, is relevant to the decision whether to insure you and, if so, on what terms.</p>
                                <p style={{ textAlign: "justify" }}>The “Duty of Disclosure” applies before you enter into, extend, vary or reinstate a Policy, and applies until the time when the insurer issue a policy schedule, membership certificate or other written confirmation of the issue, extension, variation or reinstatement.</p>
                                <p style={{ textAlign: "justify" }}>If any information provided changes (including any change to your health, occupation or pastimes) before the insurer sends the policy schedule, membership certificate or other written confirmation of cover to you, you must tell the insurer.</p>
                                <p style={{ textAlign: "justify" }}>The duty does not require disclosure of any matter:</p>
                                <ul>
                                    <li>That diminishes the risk to be undertaken by an insurer;</li>
                                    <li>That is of common knowledge;</li>
                                    <li>That we know or, in the ordinary course of our business, ought to know; or</li>
                                    <li>As to which compliance with your duty is waived by us.</li>
                                </ul>
                                <h4 className='fw-bold'>Non-disclosure</h4>
                                <p style={{ textAlign: "justify" }}>If you fail to comply with your duty and the Policy would not have been entered into if the failure had not occurred:</p>
                                <ul>
                                    <li>The Policy may be varied to reduce the sum insured or to reflect the terms that would have applied if you had complied with your duty; or</li>
                                    <li>The Policy may be treated as never having existed if your non-disclosure was fraudulent or, if it is within 3 years of entering into the Policy, the insurer would not have been prepared to enter into the contract of life insurance on any terms.</li>
                                </ul>
                            </div>
                        </code>
                    </pre>
                    <CInput checked={props.values["disclosureAccept"]} className={"form-check-input me-3"} name="disclosureAccept" label="I have read and acknowledge my Duty of Disclosure  * " type="checkBox" />
                    <div>
                        <div className="row mt-3  justify-content-end">
                            <div className="col-md-3">
                                <button className='btn btnCustom w-100' disabled={!props.values.disclosureAccept} onClick={() => { localStorage.setItem("AdviserAssess", JSON.stringify(props.values)); Nav("/PersonalDetails"); }}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

Disclosure.propTypes = {
    elem: PropTypes.shape({
        img: PropTypes.string.isRequired, // Ensure img is a string and required
    })
};

export default Disclosure;

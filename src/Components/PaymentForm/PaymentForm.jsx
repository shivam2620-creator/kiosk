import React from "react";
import "./style.css";

const PaymentForm = () => {
    return (
        <div className="payment-container">
            <div className="payment-box">
                <h2>Please Add Your Payment Details :</h2>

                <form className="pay-form" action="">

                {/* Email Section */}
                <div className="form-section">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" />
                </div>

                {/* Card Information Section */}
                <div className="form-section">
                    <label>Card information</label>
                    <input className="card-number-input" type="text" placeholder="1234 1234 1234 1234" />
                    <div className="card-details">
                        <input type="text" placeholder="MM / YY" />
                        <input type="text" placeholder="CVC" />
                    </div>
                </div>

                {/* Cardholder Name Section */}
                <div className="form-section">
                    <label>Cardholder name</label>
                    <input type="text" placeholder="Full name on card" />
                </div>

                {/* Country and ZIP Section */}
                <div className="form-section">
                    <label>Country or region</label>
                    <select className="country-select">
                        <option>United States</option>
                        <option>India</option>
                        <option>United Kingdom</option>
                    </select>
                    <input className="zip-code-input" type="text" placeholder="ZIP" />
                </div>

                {/* Pay Button */}
                <button className="pay-btn">Pay</button>
                </form>

                {/* Terms */}
                <p className="terms">
                    By clicking Pay, you agree to the Link Terms and Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default PaymentForm;
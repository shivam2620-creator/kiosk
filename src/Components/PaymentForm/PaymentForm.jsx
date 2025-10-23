// src/components/PaymentForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { createAppointment } from "../../Apis/CreateAppointmentApi";
import "./style.css";

/**
 * Props:
 *  - data: { amount, appointmentId? (optional) , ...other appointment fields }
 *
 * Environment (Vite):
 *  - VITE_SQUARE_APPLICATION_ID  (client application id)
 *  - VITE_SQUARE_ACCESS_TOKEN   (Bearer token)  <-- INSECURE if used client-side
 *
 * NOTE: It's insecure to place your Square Access Token in client-side env (VITE_...). See comments below.
 */

const LOCATIONS_ENDPOINT = "https://connect.squareupsandbox.com/v2/locations";
// Cloud Function that creates the payment (your provided URL)
const CLOUD_PAYMENT_URL = "https://us-central1-tattoo-shop-printing-dev.cloudfunctions.net/payment";
const locationId = "LH7WPD2X1KVQZ";

const PaymentFormComponent = ({ data }) => {

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const applicationId = import.meta.env.VITE_SQUARE_APPLICATION_ID || "";

//   useEffect(() => {
//     // Option A: Direct client request to Square ListLocations using VITE_SQUARE_ACCESS_TOKEN
//     // WARNING: This exposes your access token to the browser. Use only for quick testing.
//     const fetchLocationsClientSide = async () => {
//       try {
//         const token = import.meta.env.VITE_SQUARE_ACCESS_TOKEN;
//         console.log("token" , token)
//         if (!token) {
//           console.warn("VITE_SQUARE_ACCESS_TOKEN not set (client-side). Skipping client-side location fetch.");
//           setLoadingLocations(false);
//           return;
//         }

//         const resp = await axios.get(LOCATIONS_ENDPOINT, {
//           headers: {
//             Authorization: token, // e.g. "Bearer EAAA...."
//             "Content-Type": "application/json",
//           },
//         });
//         const locs = resp.data?.locations || [];
//         if (locs.length) setLocationId(locs[0].id || "");
//       } catch (err) {
//         console.warn("Client-side location fetch failed (insecure).", err?.response?.data || err.message);
//       } finally {
//         setLoadingLocations(false);
//       }
//     };

//     // Option B: If you have a secure backend endpoint to get locations, call it instead:
//     // const fetchLocationsServerSide = async () => {
//     //   try {
//     //     const resp = await axios.get("/api/locations");
//     //     const locs = resp.data?.locations || [];
//     //     if (locs.length) setLocationId(locs[0].id || "");
//     //   } catch (err) { console.warn(err); } finally { setLoadingLocations(false); }
//     // };

//     // Choose one:
//     fetchLocationsClientSide();
//     // fetchLocationsServerSide();
//   }, []);

  // Called by react-square-web-payments-sdk after tokenization
  const cardTokenizeResponseReceived = async (token, verifiedBuyer) => {
    // token may be string token or object depending on version; normalize:
    const sourceId = typeof token === "string" ? token : token?.token || token?.id || null;
    if (!sourceId) {
      setError("Tokenization failed: no token returned.");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      // 1) Create appointment first (if your flow requires appointment created before payment)
      const appointmentRes = await createAppointment(data);
      console.log(appointmentRes)
      // Expect appointmentRes.data to contain appointment id (adjust if your API differs)
      const appointmentId =
        appointmentRes?.data?.newAppointment.id;
      if (!appointmentId) {
        console.warn("createAppointment did not return an appointmentId. Using data.appointmentId if present.");
      }

      // 2) Call your cloud function to create payment
      const payload = {
        sourceId,
        amount: data.amount, // IMPORTANT: ensure this is in the units your cloud function expects (example used: 20)
        appointmentId: appointmentId || data.appointmentId,
        locationId: locationId || undefined,
      };

      const resp = await axios.post(CLOUD_PAYMENT_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Cloud payment response:", resp.data);
      if (resp.status === 200) {
        alert("Payment successful!");
      } else {
        setError("Payment failed: " + JSON.stringify(resp.data));
      }
    } catch (err) {
      console.error("Payment flow error:", err?.response?.data || err.message);
      setError(err?.response?.data?.message || err?.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  if (!applicationId) {
    return <div style={{ color: "orange" }}>Set VITE_SQUARE_APPLICATION_ID in your .env</div>;
  }

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h2>Please Add Your Payment Details :</h2>

        {/* Wrap the credit card component in PaymentForm from the SDK */}
        <PaymentForm
          applicationId={applicationId}
          cardTokenizeResponseReceived={cardTokenizeResponseReceived}
          locationId={locationId || undefined}
        >
          {/* Keep the rest of your form UI if you want, but CreditCard renders its own card UI + pay button */}
          
          <div className="pay-form">
            {/* Email */}
            <div className="form-section">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>
             {/* Cardholder Name */}
            <div className="form-section">
              <label>Cardholder name</label>
              <input type="text" placeholder="Full name on card" />
            </div>

            {/* Credit card UI (this renders card fields + pay button) */}
            <div className="form-section">
              <label>Card information</label>
              <CreditCard
                buttonProps={{
                  css: { fontSize: "14px", padding: "10px 16px" },
                }}
              />
            </div>

           

            {/* Country and ZIP
            <div className="form-section">
              <label>Country or region</label>
              <select className="country-select">
                <option>United States</option>
                <option>India</option>
                <option>United Kingdom</option>
              </select>
              <input className="zip-code-input" type="text" placeholder="ZIP" />
            </div> */}

            {/* Amount (readonly)
            <div className="form-section">
              <label>Amount</label>
              <input type="text" value={data?.amount ?? ""} readOnly />
            </div> */}

            {processing && <div>Processing payment…</div>}
            {error && <div className="payment-error">{error}</div>}
          </div>
        </PaymentForm>

        <p className="terms">
          By clicking Pay, you agree to the Link Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default PaymentFormComponent;

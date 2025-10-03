import { useState } from "react"
import { useDispatch } from "react-redux";
import { onChangeAppointmentDetails } from "../../Redux/AppointmentDetailSlice"
import { useNavigate } from "react-router-dom";
import "./style.css"

const AppointmentForm = () => {
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    fullName: "",
    mobileNumber: "",
    email: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isFieldsEmpty =
    !appointmentData.date ||
    !appointmentData.time ||
    !appointmentData.fullName ||
    !appointmentData.mobileNumber ||
    !appointmentData.email;

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    dispatch(onChangeAppointmentDetails({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();                // <- prevent full page reload
    if (isFieldsEmpty) return;

    // If you need to dispatch any final action before navigating, do it here.
    // e.g. dispatch(setAppointment(...)) or set some "isActive" flag for the service.

    navigate("/payment-page");         // SPA navigation without reload
  };

  return (
    <div className="appointment-form-wrapper">
      <h3 className="form-heading">Book Your Appointment :</h3>

      <form className="appointment-form" onSubmit={handleSubmit}>
        <input
          className="input-full"
          type="text"
          value={appointmentData.fullName}
          placeholder="Full Name"
          name="fullName"
          onChange={handelInputChange}
          required
        />

        <div className="two-col-row">
          <input
            type="tel"               // tel is better for phone numbers
            placeholder="Mobile Number"
            required
            name="mobileNumber"
            onChange={handelInputChange}
            value={appointmentData.mobileNumber}
            maxLength={15}
            inputMode="numeric"
          />
          <input
            type="email"
            value={appointmentData.email}
            required
            onChange={handelInputChange}
            placeholder="Email Address"
            name="email"
          />
        </div>

        <div className="two-col-row">
          <input
            type="date"
            placeholder="Date"
            required
            name="date"
            onChange={handelInputChange}
            value={appointmentData.date}
          />

          <input
            type="time"
            placeholder="Time"
            value={appointmentData.time}
            required
            onChange={handelInputChange}
            name="time"
          />
        </div>

        <button type="submit" className="submit-button" disabled={isFieldsEmpty}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;

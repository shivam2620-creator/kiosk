import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { onChangeAppointmentDetails } from "../../Redux/AppointmentDetailSlice";
import { getAllAvailableSlotsFroParticularService } from "../../Apis/ArtistAvailability";
import { useNavigate } from "react-router-dom";
import { setAvailability } from "../../Redux/availabilitySlice";
import { useSelector } from "react-redux";
import "./Style.css";

const AppointmentForm = ({ studioId }) => {
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    fullName: "",
    mobileNumber: "",
    email: "",
  });

  const [minDate, setMinDate] = useState("");
  const [minTimeForToday, setMinTimeForToday] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appointmentDetail = useSelector((state) => state.appointment)
  console.log(appointmentDetail)
  // ---- Set minimum date and current time ----
  useEffect(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    setMinDate(`${yyyy}-${mm}-${dd}`);

    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    setMinTimeForToday(`${hh}:${min}`);
  }, []);

  // ---- Helper to fetch slots ----
  const fetchSlots = useCallback(
    async (selectedDate) => {
      
      if (!studioId || !selectedDate) return;
      try {
        const res = await getAllAvailableSlotsFroParticularService(
          studioId,
          selectedDate,
          "tattoo"
        );
        console.log("Available slots response:", res.data);

        // Dispatch availability into redux so ArtistSlots can consume it
        // res.data is expected to be an array of artist objects (artistId, artistName, availableSlots)
        console.log("Dispatching setAvailability with", { list: res.data, studioId, date: selectedDate });
        dispatch(setAvailability(res.data));
      } catch (err) {
        console.error("Failed to fetch available slots:", err);
        // you can show toast here if needed
      }
    },
    [studioId, dispatch]
  );

  // ---- Handle input changes ----
  const handelInputChange = async (e) => {
    const { name, value } = e.target;

    setAppointmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    dispatch(onChangeAppointmentDetails({ name, value }));

    // when user selects a date, fetch slots and store them into redux
    if (name === "date") {
      if (value < minDate) {
        alert("You cannot select a past date.");
        const clamped = minDate;
        setAppointmentData((prev) => ({ ...prev, date: clamped }));
        await fetchSlots(clamped);
      } else {
        await fetchSlots(value);
      }
    }

    // when time is selected, ensure it's valid if today
    if (name === "time" && appointmentData.date === minDate) {
      const now = new Date();
      const selectedTime = new Date(`${appointmentData.date}T${value}`);
      if (selectedTime < now) {
        alert("Please select a future time.");
        setAppointmentData((prev) => ({
          ...prev,
          time: minTimeForToday,
        }));
      }
    }
  };

  const isFieldsEmpty =
    !appointmentData.date ||
    !appointmentData.fullName ||
    !appointmentData.mobileNumber ||
    !appointmentData.email;

  // ---- Submit form ----
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFieldsEmpty) return;

    const selectedDateTime = new Date(
      `${appointmentData.date}T${appointmentData.time}`
    );
    const now = new Date();
    if (selectedDateTime < now) {
      alert("Please choose a future date and time.");
      return;
    }

    navigate("/payment-page");
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
            type="tel"
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
            min={minDate} // prevent back date
          />

          <input
            type="time"
            placeholder="Time"
            value={appointmentData.time}
         
            onChange={handelInputChange}
            name="time"
            min={appointmentData.date === minDate ? minTimeForToday : undefined}
          />
        </div>

        <button type="submit" className="submit-button" disabled={isFieldsEmpty || !appointmentDetail.time }>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;

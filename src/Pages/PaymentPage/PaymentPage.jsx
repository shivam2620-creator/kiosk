import AppointmentTopBar from "../../Components/AppointmentTopBar/AppointmentTopBar";
import AppointmentDetails from "../../Components/AppointmentDetails/AppointmentDetails";
import { useSelector } from "react-redux";
import FlashTattoHeader from "../../Components/Headers/FlashTattoHeader";
import CustomTattooHeader from "../../Components/Headers/CustomTattooHeader";
import PiercingHeader from "../../Components/Headers/PiercingHeader";
import Transition from "../../Transition";
import "./style.css";
import { useEffect, useState } from "react";
import PaymentForm from "../../Components/PaymentForm/PaymentForm";
// import { createAppointment } from "../../Apis/CreateAppointmentApi" // keep as needed

const PaymentPage = () => {
  const appointmentDetails = useSelector((state) => state.appointment);
  const [service, setService] = useState({});
  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    date: "",
    startMinute: null,
    endMinute: null,
    amount: 200,
    artistId: null,
    studioId: null,
  });

  // initialize details when appointmentDetails become available
  useEffect(() => {
    if (!appointmentDetails) return;
    setDetails((prev) => ({
      ...prev,
      fullName: appointmentDetails.fullName ?? prev.fullName,
      email: appointmentDetails.email ?? prev.email,
      phone: appointmentDetails.mobileNumber ?? prev.mobileNumber,
      date: appointmentDetails.date ?? prev.date,
      startMinute: appointmentDetails?.time?.startMinute ?? prev.startMinute,
      endMinute: appointmentDetails?.time?.endMinute ?? prev.endMinute,
      artistId: appointmentDetails?.time?.artistId ?? prev.artistId,
      studioId: appointmentDetails?.time?.studioId ?? prev.studioId,
      // amount left as default (200) — adjust if you compute it later
    }));
  }, [
    appointmentDetails?.fullName,
    appointmentDetails?.email,
    appointmentDetails?.mobileNumber,
    appointmentDetails?.date,
    appointmentDetails?.time?.startMinute,
    appointmentDetails?.time?.endMinute,
    appointmentDetails?.time?.artistId,
    appointmentDetails?.time?.studioId,
  ]);

  return (
    <>
      {service.isActive && service.service === "custom-tattoo" && <CustomTattooHeader />}
      {service.isActive && service.service === "flash-tattoo" && <FlashTattoHeader />}
      {service.isActive && service.service === "piercing" && <PiercingHeader />}
      {service.isActive && service.service === "coverup-tattoo" && <CustomTattooHeader />}

      <div className="payment-page">
        <AppointmentTopBar title={"Please Complete The Payment"} />
        {/* AppointmentDetails will call setDetails & setService as the selected service becomes known */}
        <AppointmentDetails setDetails={setDetails} setService={setService} />

        <hr style={{ borderTop: "1px solid #9A9A9A" }} />
        <div className="payment-detail-form">
          <PaymentForm data={details} />
        </div>
      </div>
    </>
  );
};

export default Transition(PaymentPage);

import AppointmentTopBar from "../../Components/AppointmentTopBar/AppointmentTopBar"
import AppointmentDetails from "../../Components/AppointmentDetails/AppointmentDetails"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import FlashTattoHeader from "../../Components/Headers/FlashTattoHeader"
import CustomTattooHeader from "../../Components/Headers/CustomTattooHeader"
import PiercingHeader from "../../Components/Headers/PiercingHeader"
import Transition from "../../Transition"
import "./style.css"
import { useEffect, useState } from "react"
import PaymentForm from "../../Components/PaymentForm/PaymentForm"

const PaymentPage = () => {
     const appointmentDetail = useSelector((state) => state.appointment)
     const customTattooDetail = useSelector((state) => state.customTattoo)
     const flashTattoDetail = useSelector((state) => state.flashTattoo);
     const coverupTattooDetail = useSelector((state)=> state.coverupTattoo)
     const piercingDetail = useSelector((state) => state.piercing);
     const navigate = useNavigate();

     const [selectedServiceDetail,setSelectedServiceDetail] = useState({});
   

      useEffect(() => {
  // navigate away only when we know all slices are false
  if (
    !customTattooDetail.isActive &&
    !flashTattoDetail.isActive &&
    !coverupTattooDetail.isActive &&
    !piercingDetail.isActive
  ) {
    navigate("/");
  }
}, [
  customTattooDetail.isActive,
  flashTattoDetail.isActive,
  coverupTattooDetail.isActive,
  piercingDetail.isActive,
  navigate
]);

useEffect(() => {
  if (customTattooDetail.isActive) {
    setSelectedServiceDetail(customTattooDetail);
  } else if (flashTattoDetail.isActive) {
    setSelectedServiceDetail(flashTattoDetail);
  } else if (coverupTattooDetail.isActive) {
    setSelectedServiceDetail(coverupTattooDetail);
  } else if (piercingDetail.isActive) {
    setSelectedServiceDetail(piercingDetail);
  } else {
    setSelectedServiceDetail({}); // optional fallback
  }
}, [
  customTattooDetail,
  flashTattoDetail,
  coverupTattooDetail,
  piercingDetail
]);


  return (
    <>
    { selectedServiceDetail.isActive && selectedServiceDetail.service === "custom-tattoo" && <CustomTattooHeader /> }
    { selectedServiceDetail.isActive && selectedServiceDetail.service === "flash-tattoo" && <FlashTattoHeader /> }
    { selectedServiceDetail.isActive && selectedServiceDetail.service === "piercing" && <PiercingHeader /> }
    { selectedServiceDetail.isActive && selectedServiceDetail.service === "coverup-tattoo" && <CustomTattooHeader /> }
    <div className="payment-page">

        <AppointmentTopBar title={"Please Complete The Payment"}/>
        <AppointmentDetails serviceDetail={selectedServiceDetail} appointmentDetails={appointmentDetail}/>
        
        <hr style={{"border-top" : "1px solid #9A9A9A"}}/>
        <div className="payment-detail-form">
          <PaymentForm />

        </div>
      
    </div>
    </>
  )
}

export default Transition(PaymentPage)

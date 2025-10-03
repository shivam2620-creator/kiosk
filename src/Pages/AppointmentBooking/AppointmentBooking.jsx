import React, { useEffect } from 'react'
import AppointmentTopBar from '../../Components/AppointmentTopBar/AppointmentTopBar'
import CustomTattooDetail from '../../Components/CustomDetailTattoo/CustomDetailTattoo'
import AppointmentForm from '../../Components/AppointmentForm/AppointmentForm'
import FlashTattooDetails from '../../Components/FlashTattoDetails/FlashTattooDetails'
import CoverupTattooDetail from '../../Components/CoverTattoDetails/CoverupTattooDetails'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./style.css"
import PiercingDetail from '../../Components/PiercingDetails/PiercingDetails'
const AppointmentBooking = () => {
   const customTattooDetail = useSelector((state) => state.customTattoo)
   const flashTattoDetails = useSelector((state) => state.flashTattoo)
   const coverupTattooDetails = useSelector((state) => state.coverupTattoo)
   const piercingDetail = useSelector((state) => state.piercing)
   const navigate = useNavigate();
   useEffect(() => {
       if(!customTattooDetail.isActive && !flashTattoDetails.isActive && !coverupTattooDetails.isActive && !piercingDetail.isActive){
        navigate("/");
       }
   },[])
  return (
    <div className="appointmen-booking">

        <AppointmentTopBar title={"Confirm Your Custom Tattoo Details & Book Your Appointment"} />
        {customTattooDetail.isActive && <CustomTattooDetail details={customTattooDetail}/>}
        {flashTattoDetails.isActive && <FlashTattooDetails details = {flashTattoDetails} />}
        {coverupTattooDetails.isActive && <CoverupTattooDetail details={coverupTattooDetails}/>}
        {piercingDetail.isActive && <PiercingDetail details={piercingDetail} />}

        
          <hr  className="appointment-booking-divider"/>

          <AppointmentForm />
        
      
    </div>
  )
}

export default AppointmentBooking

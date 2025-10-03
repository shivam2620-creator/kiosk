
import "./style.css"

import flashTattooImg from "../../assets/flash-tattoo.png"
const AppointmentDetails = ({serviceDetail,appointmentDetails}) => {
  return (
    <div className="appointment-details">

        <h3>Your Appointment Details :</h3>
        <div className="appointment">
              
              <div className="appointment-detail-img-cont">
                    <img src={serviceDetail.img} alt="flash tattoo img" width="100%" height="100%" />
              </div>

                {/* custom tattoo */}
              {serviceDetail.service === "custom-tattoo" && <div className="service-detail-cont">
                     <div className="service-option">
                           <span>Selected Option</span>
                           <p>{serviceDetail.service}</p>
                     </div>

                     <div className="service-option">
                           <span>Tattoo Option</span>
                           <p>{serviceDetail.tattooOption}</p>
                     </div>

                     <div className="service-option">
                           <span>Size of Tattoo</span>
                           <p>{serviceDetail.size}</p>
                     </div>
              </div>}

                {/* flash tattoo  */}
             { serviceDetail.service === "flash-tattoo" && <div className="service-detail-cont">
                     <div className="service-option">
                           <span>Tattoo Name</span>
                           <p>{serviceDetail.tattooOption}</p>
                     </div>

                     <div className="service-option flash-tattoo-size-service-option">
                           <span>Size</span>
                           <p>{serviceDetail.size}</p>
                     </div>
                     <div className="service-option">
                           <span>Tattoo Color</span>
                           <p>{serviceDetail.color}</p>
                     </div>

                     <div className="service-option">
                           <span>Tattoo Location</span>
                           <p>{serviceDetail.location}</p>
                     </div>

                     
              </div>}

              {/* coverUp tattoo */}
           {serviceDetail.service === "coverup-tattoo" && <div className="service-detail-cont">
                     <div className="service-option">
                           <span>Selected Option</span>
                           <p>Coverup / Rework Tattoo</p>
                     </div>

                     <div className="service-option">
                           <span>Tattoo Placement</span>
                           <p>{serviceDetail.placement}</p>
                     </div>

                     <div className="service-option">
                           <span>Size of Tattoo</span>
                           <p>{serviceDetail.size}</p>
                     </div>

                     <div className="service-option">
                           <span>Color of Tattoo</span>
                           <p>{serviceDetail.color}</p>
                     </div>
              </div>}
              <hr />

              {  <div className="appointment-user-detail">
                     <div className="appointment-option">
                        <p>Name: </p>
                        <p>{appointmentDetails.fullName}</p>
                     </div>

                     <div className="appointment-option">
                          <p>Mobile Number :</p>
                          <p>{appointmentDetails.mobileNumber}</p>
                     </div>

                     <div className="appointment-option">
                          <p>Email :</p>
                          <p>{appointmentDetails.email}</p>
                     </div>

                     <div className="appointment-option">
                          <p>Date :</p>
                          <p>{appointmentDetails.date}</p>
                     </div>

                     <div className="appointment-option">
                          <p>Time :</p>
                          <p>{appointmentDetails.time}</p>
                     </div>

                     
              </div>}
        </div>
      
    </div>
  )
}

export default AppointmentDetails

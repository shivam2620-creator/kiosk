import "./style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AppointmentDetails = ({ setDetails, setService }) => {
  const appointmentDetails = useSelector((state) => state.appointment);
  const customTattooDetail = useSelector((state) => state.customTattoo);
  const flashTattoDetail = useSelector((state) => state.flashTattoo);
  const coverupTattooDetail = useSelector((state) => state.coverupTattoo);
  const piercingDetail = useSelector((state) => state.piercing);

  const [selectedServiceDetail, setSelectedServiceDetail] = useState({});
  const navigate = useNavigate();

  // redirect away if no service is active (watch slices)
  useEffect(() => {
    if (
      !customTattooDetail?.isActive &&
      !flashTattoDetail?.isActive &&
      !coverupTattooDetail?.isActive &&
      !piercingDetail?.isActive
    ) {
      navigate("/");
    }
  }, [
    customTattooDetail?.isActive,
    flashTattoDetail?.isActive,
    coverupTattooDetail?.isActive,
    piercingDetail?.isActive,
    navigate,
  ]);

  // derive which service is active and set local state + inform parent via setService
  useEffect(() => {
    if (customTattooDetail?.isActive) {
      setSelectedServiceDetail(customTattooDetail);
      setService?.(customTattooDetail);
    } else if (flashTattoDetail?.isActive) {
      setSelectedServiceDetail(flashTattoDetail);
      setService?.(flashTattoDetail);
    } else if (coverupTattooDetail?.isActive) {
      setSelectedServiceDetail(coverupTattooDetail);
      setService?.(coverupTattooDetail);
    } else if (piercingDetail?.isActive) {
      setSelectedServiceDetail(piercingDetail);
      setService?.(piercingDetail);
    } else {
      setSelectedServiceDetail({});
      setService?.({});
    }
  }, [customTattooDetail, flashTattoDetail, coverupTattooDetail, piercingDetail, setService]);

  // map selectedServiceDetail into details object for parent.
  // RUN whenever selectedServiceDetail or appointmentDetails change.
  useEffect(() => {
    if (!selectedServiceDetail || Object.keys(selectedServiceDetail).length === 0) return;

    // base info from appointment slice (keeps email/name/phone/time etc in sync)
    setDetails((prev) => ({
      ...prev,
      fullName: appointmentDetails?.fullName ?? prev.fullName,
      email: appointmentDetails?.email ?? prev.email,
      mobileNumber: appointmentDetails?.mobileNumber ?? prev.mobileNumber,
      date: appointmentDetails?.date ?? prev.date,
      startMinute: appointmentDetails?.time?.startMinute ?? prev.startMinute,
      endMinute: appointmentDetails?.time?.endMinute ?? prev.endMinute,
      artistId: appointmentDetails?.time?.artistId ?? prev.artistId,
      studioId: appointmentDetails?.time?.studioId ?? prev.studioId,
    }));

    // then add service specific fields
    if (selectedServiceDetail.service === "custom-tattoo") {
      setDetails((prev) => ({
        ...prev,
        service: "tattoo",
        tattoo_type: "custom",
        tattoo_option: selectedServiceDetail.tattooOption ?? prev.tattoo_option,
        tattoo_size: selectedServiceDetail.size ?? prev.tattoo_size,
      }));
    } else if (selectedServiceDetail.service === "flash-tattoo") {
      setDetails((prev) => ({
        ...prev,
        service: "tattoo",
        tattoo_type: "flash",
        tattoo_name: selectedServiceDetail.tattooOption ?? prev.tattoo_name,
        tattoo_size: selectedServiceDetail.size ?? prev.tattoo_size,
        tattoo_color: selectedServiceDetail.color ?? prev.tattoo_color,
        // sometimes location may be an object
        studioId:
          selectedServiceDetail?.location?.id ?? selectedServiceDetail?.studioId ?? prev.studioId,
      }));
    } else if (selectedServiceDetail.service === "coverup-tattoo") {
      setDetails((prev) => ({
        ...prev,
        service: "tattoo",
        tattoo_type: "coverup",
        tattoo_placement: selectedServiceDetail.placement ?? prev.tattoo_placement,
        tattoo_size: selectedServiceDetail.size ?? prev.tattoo_size,
        tattoo_color: selectedServiceDetail.color ?? prev.tattoo_color,
      }));
    } else if (selectedServiceDetail.service === "piercing") {
      setDetails((prev) => ({
        ...prev,
        service: "piercing",
        piercing_type: selectedServiceDetail.piercingType ?? prev.piercing_type,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedServiceDetail,
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
    <div className="appointment-details">
      <h3>Your Appointment Details :</h3>
      <div className="appointment">
        <div className="appointment-detail-img-cont">
          <img src={selectedServiceDetail?.img} alt="service img" width="100%" height="100%" />
        </div>

        {/* custom tattoo */}
        {selectedServiceDetail?.service === "custom-tattoo" && (
          <div className="service-detail-cont">
            <div className="service-option">
              <span>Selected Option</span>
              <p>{selectedServiceDetail.service}</p>
            </div>

            <div className="service-option">
              <span>Tattoo Option</span>
              <p>{selectedServiceDetail.tattooOption}</p>
            </div>

            <div className="service-option">
              <span>Size of Tattoo</span>
              <p>{selectedServiceDetail.size}</p>
            </div>
          </div>
        )}

        {/* flash tattoo  */}
        {selectedServiceDetail?.service === "flash-tattoo" && (
          <div className="service-detail-cont">
            <div className="service-option">
              <span>Tattoo Name</span>
              <p>{selectedServiceDetail.tattooOption}</p>
            </div>

            <div className="service-option flash-tattoo-size-service-option">
              <span>Size</span>
              <p>{selectedServiceDetail.size}</p>
            </div>
            <div className="service-option">
              <span>Tattoo Color</span>
              <p>{selectedServiceDetail.color}</p>
            </div>

            <div className="service-option">
              <span>Tattoo Location</span>
              <p>{selectedServiceDetail?.location?.name ?? selectedServiceDetail?.location}</p>
            </div>
          </div>
        )}

        {/* coverUp tattoo */}
        {selectedServiceDetail?.service === "coverup-tattoo" && (
          <div className="service-detail-cont">
            <div className="service-option">
              <span>Selected Option</span>
              <p>Coverup / Rework Tattoo</p>
            </div>

            <div className="service-option">
              <span>Tattoo Placement</span>
              <p>{selectedServiceDetail.placement}</p>
            </div>

            <div className="service-option">
              <span>Size of Tattoo</span>
              <p>{selectedServiceDetail.size}</p>
            </div>

            <div className="service-option">
              <span>Color of Tattoo</span>
              <p>{selectedServiceDetail.color}</p>
            </div>
          </div>
        )}

        <hr />

        <div className="appointment-user-detail">
          <div className="appointment-option">
            <p>Name: </p>
            <p>{appointmentDetails?.fullName}</p>
          </div>

          <div className="appointment-option">
            <p>Mobile Number :</p>
            <p>{appointmentDetails?.mobileNumber}</p>
          </div>

          <div className="appointment-option">
            <p>Email :</p>
            <p>{appointmentDetails?.email}</p>
          </div>

          <div className="appointment-option">
            <p>Date :</p>
            <p>{appointmentDetails?.date}</p>
          </div>

          <div className="appointment-option">
            <p>Time :</p>
            <p>{appointmentDetails?.time?.display}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;

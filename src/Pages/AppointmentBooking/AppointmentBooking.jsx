import React, { useEffect, useMemo } from "react";
import AppointmentTopBar from "../../Components/AppointmentTopBar/AppointmentTopBar";
import CustomTattooDetail from "../../Components/CustomDetailTattoo/CustomDetailTattoo";
import AppointmentForm from "../../Components/AppointmentForm/AppointmentForm";
import FlashTattooDetails from "../../Components/FlashTattoDetails/FlashTattooDetails";
import CoverupTattooDetail from "../../Components/CoverTattoDetails/CoverupTattooDetails";
import PiercingDetail from "../../Components/PiercingDetails/PiercingDetails";
import ArtistSlots from "../../Components/ArtistSlots/ArtistSlots";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";

const AppointmentBooking = () => {
  const navigate = useNavigate();

  // service slices
  const customTattooDetail = useSelector((s) => s.customTattoo);
  const flashTattoDetails = useSelector((s) => s.flashTattoo);
  const coverupTattooDetails = useSelector((s) => s.coverupTattoo);
  const piercingDetail = useSelector((s) => s.piercing);

  // availability list
  const list = useSelector((s) => s.availability?.list ?? []);

  // derive the current active service (priority order: custom > flash > coverup > piercing)
  const currentService = useMemo(() => {
    if (customTattooDetail?.isActive) return customTattooDetail;
    if (flashTattoDetails?.isActive) return flashTattoDetails;
    if (coverupTattooDetails?.isActive) return coverupTattooDetails;
    if (piercingDetail?.isActive) return piercingDetail;
    return null;
  }, [customTattooDetail, flashTattoDetails, coverupTattooDetails, piercingDetail]);

  // robust studio id detection: check common possible shapes
  const studioId = useMemo(() => {
    if (!currentService) return null;
    // common possible locations where id might live:
    return (
      currentService?.location?.id ??
      currentService?.locationId ??
      currentService?.studioId ??
      currentService?.selectedStudioId ??
      null
    );
  }, [currentService]);

 console.log("Determined studioId:", studioId);
  useEffect(() => {
    const anyActive =
      !!customTattooDetail?.isActive ||
      !!flashTattoDetails?.isActive ||
      !!coverupTattooDetails?.isActive ||
      !!piercingDetail?.isActive;

    if (!anyActive) {
      navigate("/");
    }
  }, [
    customTattooDetail?.isActive,
    flashTattoDetails?.isActive,
    coverupTattooDetails?.isActive,
    piercingDetail?.isActive,
    navigate,
  ]);

  return (
    <div className="appointmen-booking">
      <AppointmentTopBar title={"Confirm Your Custom Tattoo Details & Book Your Appointment"} />

      {/* details for whichever service is active */}
      {customTattooDetail?.isActive && <CustomTattooDetail details={customTattooDetail} />}
      {flashTattoDetails?.isActive && <FlashTattooDetails details={flashTattoDetails} />}
      {coverupTattooDetails?.isActive && <CoverupTattooDetail details={coverupTattooDetails} />}
      {piercingDetail?.isActive && <PiercingDetail details={piercingDetail} />}

      <hr className="appointment-booking-divider" />

      
        <AppointmentForm studioId={studioId} />
      
        {/* <h1>Select Artist & Time Slot</h1> */}

      {list.length > 0 && <ArtistSlots studioId={studioId} />}
    </div>
  );
};

export default AppointmentBooking;

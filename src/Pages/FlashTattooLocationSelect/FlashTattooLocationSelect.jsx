import "./style.css";
import AppointmentTopBar from "../../Components/AppointmentTopBar/AppointmentTopBar";
import { useState, useEffect, useCallback, useRef } from "react";
import { useContinue } from "../../Provider/ContinueContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFlashTattooLocation } from "../../Redux/FlashTattoDetailSlice";
import { setCustomtattooLocation } from "../../Redux/CustomTattooDetailSlice";
import { setCoveruptattooLocation } from "../../Redux/CoverUpTattooDetailSlice";
import { setPiercingLocation } from "../../Redux/PiercingSlice";
import Transition from "../../Transition";

const FlashTattooLocationSelect = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentService, setCurrentService] = useState({});
  const currentServiceRef = useRef(currentService);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setOnContinue } = useContinue();

  // selectors
  const flashTattooDetail = useSelector((s) => s.flashTattoo);
  const customTattooDetail = useSelector((s) => s.customTattoo);
  const coverupTattooDetail = useSelector((s) => s.coverupTattoo);
  const piercingDetail = useSelector((s) => s.piercing);
  const allStudio = useSelector((s) => s.studios?.studios ?? []);

  // helper: is any service active according to slices (avoid relying on local state for initial redirect)
  const isAnyServiceActive =
    !!customTattooDetail?.isActive ||
    !!flashTattooDetail?.isActive ||
    !!coverupTattooDetail?.isActive ||
    !!piercingDetail?.isActive;

  // derive currentService from selectors whenever those slices change
  useEffect(() => {
    if (customTattooDetail?.isActive) {
      setCurrentService(customTattooDetail);
    } else if (flashTattooDetail?.isActive) {
      setCurrentService(flashTattooDetail);
    } else if (coverupTattooDetail?.isActive) {
      setCurrentService(coverupTattooDetail);
    } else if (piercingDetail?.isActive) {
      setCurrentService(piercingDetail);
    } else {
      setCurrentService({});
    }
  }, [customTattooDetail, flashTattooDetail, coverupTattooDetail, piercingDetail]);

  // keep a ref up-to-date so a stable continue-handler can read the latest service
  useEffect(() => {
    currentServiceRef.current = currentService;
  }, [currentService]);

  // stable continue handler (set once). It reads currentServiceRef when called.
  const continueHandler = useCallback(() => {
    const svc = currentServiceRef.current;
    if (svc?.service) {
      navigate(`/service/${svc.service}/book-appointment`);
    } else {
      navigate("/service");
    }
  }, [navigate]);

  // set the continue action ONCE on mount to avoid repeated context updates
  useEffect(() => {
    // setOnContinue may cause context state changes; do it once so we don't trigger cycles
    setOnContinue(() => continueHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally run once

  // redirect to /service if none of the service slices are active
  useEffect(() => {
    if (!isAnyServiceActive) {
      navigate("/service");
    }
  }, [isAnyServiceActive, navigate]);

  // update selected studio to redux when selectedIndex or allStudio change
  useEffect(() => {
    const studio = allStudio[selectedIndex];
    if (studio) {
      if (customTattooDetail?.isActive) {
        dispatch(
          setCustomtattooLocation({
            name: studio.location,
            id: studio.id,
          })
        );
        return;
      }
      if (coverupTattooDetail?.isActive) {
        dispatch(
          setCoveruptattooLocation({
            name: studio.location,
            id: studio.id,
          })
        );
        return;
      }
      if (flashTattooDetail?.isActive){
      dispatch(
        setFlashTattooLocation({
          name: studio.location,
          id: studio.id,
        })
      );
      return;
      }
      if (piercingDetail?.isActive) {
        dispatch(
          setPiercingLocation({
            name: studio.location,
            id: studio.id,
          })
        );
        return;

      }
    }
  }, [selectedIndex, allStudio, dispatch]);

  return (
    <div className="flash-tattoo-location-selection">
      <AppointmentTopBar title={currentService.service?.replace("-"," ")} />
      <div className="flash-tattoo-location-select-detail">
        <div className="flash-tattoo-location-heading">
          <h3>Choose Your Preferred Location</h3>
        </div>

        <div className="flash-tattoo-location">
          {allStudio.length === 0 ? (
            <div className="no-studios">No studios available</div>
          ) : (
            allStudio.map((location, indx) => {
              return (
                <div
                  key={location?.id ?? indx}
                  className={`location ${selectedIndex === indx ? "selected" : ""}`}
                  onClick={() => setSelectedIndex(indx)}
                >
                  <div className="location-img-cont">{/* image here if available */}</div>

                  <div className="location-name-cont">
                    <h3>{location.location}</h3>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Transition(FlashTattooLocationSelect);

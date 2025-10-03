import React from "react";
import AppointmentTopBar from "../../Components/AppointmentTopBar/AppointmentTopBar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import { setFlashTattooOption } from "../../Redux/FlashTattoDetailSlice";
import { setFlashTattooImg } from "../../Redux/FlashTattoDetailSlice";
import { setFlashTattooIsActive } from "../../Redux/FlashTattoDetailSlice";
import { useContinue } from "../../Provider/ContinueContext";
import { resetCoverupTattooValue } from "../../Redux/CoverUpTattooDetailSlice";
import { resetCustomTattooValue } from "../../Redux/CustomTattooDetailSlice";
import { resetPiercingValue } from "../../Redux/PiercingSlice";
import Transition from "../../Transition";

import "./style.css";

const MOCK_ITEMS = [
  { img : "sdfsdf", tattooName : "Bird"},
  {  img : "sdfsadf", tattooName: "Dog"},
  { img : "sdfsadsdff", tattooName: "Cat" }
]
const FlashTattooDesignSelect = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {setOnContinue} = useContinue();
  const navigate = useNavigate();
       const dispatch = useDispatch();
       const nextStep = () => navigate("/service/flash-tattoo/size")
        useEffect(() => {
                 dispatch(setFlashTattooOption(MOCK_ITEMS[selectedIndex].tattooName))
                 dispatch(setFlashTattooImg(MOCK_ITEMS[selectedIndex].img))
                 dispatch(setFlashTattooIsActive(true));
                 setOnContinue(() => nextStep);

                 dispatch(resetCoverupTattooValue())
                 dispatch(resetCustomTattooValue())
                 dispatch(resetPiercingValue());
        },[selectedIndex])

  return (
    <div className="flash-tattoo-service">
      <AppointmentTopBar title ={"Flash Tattoos"}/>
      <div className="flash-tattoo-search">
        <input type="text" placeholder="Search" />
      </div>
      <div className="flash-tattoo-grid-wrapper">
        <div className="flash-tattoo-grid">
          {MOCK_ITEMS.map((item,indx) => (
            <div key={item.id} 
             onClick={() => setSelectedIndex(indx)}
            className={`flash-card ${selectedIndex === indx && "selected" }`}>
              <div className="flash-card-square">
                {/* dummy square (replace with image later) */}
              </div>
        
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transition(FlashTattooDesignSelect);

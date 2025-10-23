import React from "react";
import "./style.css";
import small2x2 from "../../assets/small3x3.png";
import medium3x3 from "../../assets/medium3x3.png";
import large4x4 from "../../assets/large4x4.png";
import AppointmentTopBar from "../../Components/AppointmentTopBar/AppointmentTopBar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFlashTattoSize } from "../../Redux/FlashTattoDetailSlice";
import { useState,useEffect } from "react";
import Transition from "../../Transition";
import { useContinue } from "../../Provider/ContinueContext";
import { useSelector } from "react-redux";



const sizes = [
  { id: 1, img: small2x2, value : "2x2"  },
  { id: 2, img: medium3x3, value : "3x3" },
  { id: 3, img: large4x4,value : "4x4"  },
  
];

const FlashTattooSizeSelection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
       const navigate = useNavigate();
       const dispatch = useDispatch();
       const nextStep = () => navigate("/service/flash-tattoo/color")
       const {setOnContinue} = useContinue();
       const flashTattooDetail = useSelector(state => state.flashTattoo);
        useEffect(() => {
          if(flashTattooDetail.tattooOption === ""){
            navigate("/service")
          }
        },[])
       useEffect(() => {
                dispatch(setFlashTattoSize(sizes[selectedIndex].value))
                setOnContinue(() => nextStep)
             },[selectedIndex])
  return (
    <div className="flash-tattoo-size-selection">
        <AppointmentTopBar title={"Flash Tattoo"}/>
        <div className="flash-tattoo-size-select-detail">
       <div className="flash-tattoo-size-heading">
        <h3>Choose Your Preferred Size</h3>
      </div>

      <div className="flash-tattoo-size-grid">
        {sizes.map((size,indx) => (
          <div
            key={size.id}
            className={`size-card ${selectedIndex === indx && "selected"}`}
            onClick={() => setSelectedIndex(indx)}
          >
            <img
              src={size.img}
              alt={`size-${size.id}`}
              className="size-image"
            />
          </div>
        ))}
      </div>
        </div>
      
    </div>
  );
};

export default Transition(FlashTattooSizeSelection);

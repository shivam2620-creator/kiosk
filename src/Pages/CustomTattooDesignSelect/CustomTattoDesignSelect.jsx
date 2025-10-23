import React, { useEffect } from 'react'
import AppointmentTopBar from '../../Components/AppointmentTopBar/AppointmentTopBar'
import Traditional from "../../assets/Traditional.png";
import ColorRealism from "../../assets/Color Realism.png";
import PortraitsRealism from "../../assets/Portraits & Realism.png";
import Watercolor from "../../assets/Watercolor.png";
import Anime from "../../assets/Anime.png";
import BlackGrey from "../../assets/Black & Grey.png";
import LetteringScript from "../../assets/Lettering & Script.png";
import FineLineMacro from "../../assets/Fine Line Macro.png";
import NeoTraditional from "../../assets/Neo-Traditional.png";
import GeometricOrnamental from "../../assets/Geometric & Ornamental.png";
import SidebarButtonUi from '../../Components/SidebarButtonUi/SidebarButtonUi';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useContinue } from '../../Provider/ContinueContext';
import { useDispatch } from 'react-redux';
import { resetCustomTattooValue, setTattooOption } from '../../Redux/CustomTattooDetailSlice';
import { setCustomTattooImg } from '../../Redux/CustomTattooDetailSlice';
import { resetPiercingValue } from '../../Redux/PiercingSlice';
import { resetCoverupTattooValue } from '../../Redux/CoverUpTattooDetailSlice';
import { resetFlashTattooValue } from '../../Redux/FlashTattoDetailSlice';
import { setCustomTattooIsActive } from '../../Redux/CustomTattooDetailSlice';
import MainButtonUi from '../../Components/MainButtonUi/MainButtonUi';

import Transition from '../../Transition';

import "./style.css"

const CustomTattoDesignSelect = () => {

    
     const [selectedIndex, setSelectedIndex] = useState(0);
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const nextStep = () => navigate("/service/custom-tattoo/size")
    const buttons = [
        {img: Traditional,text: "Traditional"},
        { img: ColorRealism,text: "Color Realism",},
        {img: PortraitsRealism, text: "Portraits & Realism",},
        {img: Watercolor, text: "Watercolor",},
        { img: Anime, text: "Anime",},
        {img: BlackGrey, text: "Black & Grey"},
        { img: LetteringScript, text: "Lettering & Script"},
        {img: FineLineMacro, text: "Fine Line Macro"},
        {img: NeoTraditional, text: "Neo-Traditional",  },
        { img: GeometricOrnamental, text: "Geometric & Ornamental"},
      ];
      useEffect(() => {
          dispatch(setTattooOption(buttons[selectedIndex].text))
          dispatch(setCustomTattooImg(buttons[selectedIndex].img))
          dispatch(setCustomTattooIsActive(true));
          dispatch(resetPiercingValue());
          dispatch(resetCoverupTattooValue());
          dispatch(resetFlashTattooValue());
      },[selectedIndex])
    
  return ( 
    <div className="custom-tattoo-design-selection">
       <AppointmentTopBar title={"Custom Tattoos"}/>

       <div className="custom-tattoo-desing-selection-detail">
        <h3>
            Design Your Tattoo, Your Way
        </h3>

        <div className="custom-tattoo-design-option">
             {
                buttons.map((design,indx) => {
                    return <MainButtonUi
                                 key={indx} 
                                 service={design}  
                                 isSeleted={selectedIndex === indx} 
                                 setSelectedIndex={() => setSelectedIndex(indx)} 
                                 nextStep={() => nextStep}

                                 
                                 />
                })
             }
        </div>

       </div>

       
    </div>
  )
}

export default Transition(CustomTattoDesignSelect)

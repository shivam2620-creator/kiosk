import './style.css';
import customTattooImg from "../../assets/tattoo.jpg"
import flashTattooImg from "../../assets/flash-tattoo.png"
import coverupImg from "../../assets/cover-tattoo.jpg"
import piercingImg from "../../assets/piercing.jpg"
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SidebarButtonUi from '../SidebarButtonUi/SidebarButtonUi';



export default function Sidebar() {
    const [selectedService, setSelectedService] = useState(null);
    const navigate = useNavigate();
    const {pathname:path} = useLocation();

    const services = [
        { img: customTattooImg, text: "Custom Tattoo", click: () => navigate("/service/custom-tattoo"),service : "custom-tattoo" },
        { img: flashTattooImg, text: "Flash Tattoo", click: () => navigate("/service/flash-tattoo"),service: "flash-tattoo"},
        { img: coverupImg, text: "Coverup & Rework", click: () => navigate("/service/coverup-tattoo"),service:"coverup-tattoo" },
        { img: piercingImg, text: "Piercing", click: () => navigate("/service/piercing"),service: "piercing" },
    ];
   useEffect(() => {
      switch(true){
        case path.includes("custom-tatto"):
        setSelectedService("custom-tattoo")
        break;

        case path.includes("flash-tatto"):
        setSelectedService("flash-tattoo")
        break

        case path.includes("piercing"):
        setSelectedService("piercing")
        break

        case path.includes("coverup-tattoo"):
        setSelectedService("coverup-tattoo")
        break

        default:
         setSelectedService("custom-tattoo")
      }

   },[path])
    return (
        <div className="sidebar">
            <div className="sidebar-hiding-div">

            </div>
            
             {services.map((opt,indx) => {
                return <SidebarButtonUi key={indx}  service={opt} selectedService={selectedService} />
             })}
        </div>
    )
}
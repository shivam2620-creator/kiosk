// SidebarButtonUi.jsx
import "./style.css";
import { useContinue } from "../../Provider/ContinueContext";
import { useEffect } from "react";
import { color } from "framer-motion";

const SidebarButtonUi = ({ service, selectedService, isSeleted, setSelectedIndex, nextStep, close }) => {
  const { setOnContinue } = useContinue();

  useEffect(() => {

        setOnContinue(nextStep);


  },[setOnContinue])

  return (
    <button
      className={`main-service-button ${isSeleted ? "seleted" : ""}`}
      onClick={() => {
        service.click?.();
        setSelectedIndex?.();
        close?.();
      }}
      aria-pressed={isSeleted ? "true" : "false"}
    >
      {/* image - loading lazy */}
      <div className="main-service-image">
        {service.img && <img src={service.img} alt={service.text} loading="lazy" decoding="async" />}
      </div>
      <p className="main-service-label">{service.text}</p>
    </button>
  );
};

export default SidebarButtonUi;

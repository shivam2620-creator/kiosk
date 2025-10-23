// SidebarButtonUi.jsx
import "./style.css";
import { useContinue } from "../../Provider/ContinueContext";
import { useEffect } from "react";

const SidebarButtonUi = ({ service, selectedService, isSeleted, setSelectedIndex, nextStep, close }) => {
  const { setOnContinue } = useContinue();

  useEffect(() => {
        setOnContinue(nextStep);
  },[setOnContinue])

  return (
    <button
      className={`service-button ${selectedService === service.service || isSeleted ? "seleted" : ""}`}
      onClick={() => {
        service.click?.();
        setSelectedIndex?.();
        close?.();
      }}
      aria-pressed={isSeleted ? "true" : "false"}
    >
      {/* image - loading lazy */}
      <div className="service-image">
        <img src={service.img} alt={service.text} loading="lazy" decoding="async" />
      </div>

      <p className="service-label">{service.text}</p>
    </button>
  );
};

export default SidebarButtonUi;

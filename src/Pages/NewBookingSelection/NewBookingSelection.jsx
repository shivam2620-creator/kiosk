import "./style.css";
import customTattooImg from "../../assets/tattoo.jpg";
import flashTattooImg from "../../assets/flash-tattoo.png";
import piercingImg from "../../assets/piercing.jpg";
import coverupTattooImg from "../../assets/cover-tattoo.jpg";
import OptionUi from "../../Components/OptionUi/OptionUi";
import qrImg from "../../assets/qr.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import QrScanner from "../../Components/Scanner/Scanner";
import BackButton from "../../Components/BackButtoon/BackButton";
import { useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import Transition from "../../Transition";
const NewBookingSelection = () => {
  const [showScanner, setShowScanner] = useState(false);
  const { pathname: path } = useLocation();
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
 

  const customTattooOptions = [
    {
      img: customTattooImg,
      subTitle: "NEW CUSTOM TATTOO BOOKING",
      click : () => navigate("/service")
    },
  ];

  const flashTattooOptions = [
    {
      img: flashTattooImg,
      subTitle: "NEW FLASH TATTOO BOOKING",
      click : () => navigate("/service/flash-tattoo")
    },
  ];

  const piercingOptions = [
    {
      img: piercingImg,
      subTitle: "NEW PIERCING BOOKING",
       click : () => navigate("/service/piercing")
    },
  ];

  const coverTattooOptions = [
    {
      img: coverupTattooImg,
      subTitle: "NEW COVERUP/REWORK TATTOO BOOKING",
      click : () => navigate("/service/coverup-tattoo")
    },
  ];


  useEffect(() => {
    switch (true) {
      case path.includes("custom-tattoo"):
        setOptions(customTattooOptions);
        break;

      case path.includes("flash-tattoo"):
        setOptions(flashTattooOptions);
        break;

      case path.includes("piercing"):
        setOptions(piercingOptions);
        break;

      case path.includes("coverup-tattoo"):
        setOptions(coverTattooOptions);
        break;

      default:
        navigate("/");
    }
  }, [path]);
  return (
    <div className="new-booking-selection">
      <div className="new-booking-selection-header">
        <div className="new-booking-selection-title-cont">
          <h1>
            <span>NEW BOOKING</span> OR CHECKING IN FOR AN APPOINTMENT?
          </h1>
        </div>
        <div className="new-booking-selection-btn-cont">
          <BackButton />
        </div>
      </div>

      <div className="new-booking-selection-options">
        {options.map((opt, indx) => {
          return <OptionUi img={opt.img} key={indx} navigate={opt.click} subTitle={opt.subTitle} />;
        })}

        <OptionUi
          img={qrImg}
          subTitle={"Have Booking? Show QR Code Here"}
          openScanner={() => setShowScanner(true)}
        />
      </div>
      {showScanner && <QrScanner close={() => setShowScanner(false)} />}
    </div>
  );
};

export default Transition(NewBookingSelection);

import { createBrowserRouter } from "react-router-dom";
import WelcomeLayout from "../Layout/WelcomeLayout";
import AppointmentBookingLayout from "../Layout/AppoinmentBookingLayout/AppointmentBookingLayout";
import WelcomePage from "../Pages/WelcomPage/WelcomePage";
import TattooOptionPick from "../Pages/TattooOptionPick/TattooOptionPick";
import NewBookingSelection from "../Pages/NewBookingSelection/NewBookingSelection";
import CustomTattoDesignSelect from "../Pages/CustomTattooDesignSelect/CustomTattoDesignSelect";
import FlashTattooDesignSelect from "../Pages/FlashTattooDesignSelect/FlashTatooDesignSelect";
import PiercingSelect from "../Pages/PiercingSelect/PiercingSelect";
import CoverupTattooDesignSelect from "../Pages/CoverupTattooDesignSelect/CoverupTattooDesignSelect";
import CustomTattooSizeSelect from "../Pages/CustomTattooSizeSelect/CustomTattooSizeSelect";
import AppointmentBooking from "../Pages/AppointmentBooking/AppointmentBooking";
import FlashTattooSizeSelection from "../Pages/FlashTattooSizeSelect/FlashTattooSizeSelect";
import FlashTattooLocationSelect from "../Pages/FlashTattooLocationSelect/FlashTattooLocationSelect";
import CoverupTattooSizeSelect from "../Pages/CoverupTattooSizeSelect/CoverupTattooSizeSelect";
import CoverupTattooColorSelect from "../Pages/CoverupTattooColorSelect/CoverupTattooColorSelect";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <WelcomeLayout />,
        children : [
            {
                index: true,
                element : <WelcomePage />
            },
            {
                path: "/tattoo-options",
                element: <TattooOptionPick />
            },
            {
                path: "/custom-tattoo/select-booking",
                element: <NewBookingSelection />
            },
            {
                path: "/flash-tattoo/select-booking",
                element: <NewBookingSelection />
            },
            {
                path: "/piercing/select-booking",
                element: <NewBookingSelection />
            },
            {
                path: "/coverup-tattoo/select-booking",
                element: <NewBookingSelection />
            },

        ]
    },
    {
        path: "/service",
        element: <AppointmentBookingLayout />,
        children: [
            {
                index: true,
                element : <CustomTattoDesignSelect />
            },
            {
               
                path: "custom-tattoo",
                element : <CustomTattoDesignSelect />
            },
            {
                path: "custom-tattoo/size",
                element: <CustomTattooSizeSelect />
            },
            {
               path:"custom-tattoo/book-appointment",
               element : <AppointmentBooking />
            },
            {
                path: "flash-tattoo",
                element : <FlashTattooDesignSelect/>
            },
            ,
            {
                path: "flash-tattoo/size",
                element: <FlashTattooSizeSelection />
            },
            {
                path: "flash-tattoo/location",
                element: <FlashTattooLocationSelect />
            },
            {
                 path: "flash-tattoo/book-appointment",
                 element : <AppointmentBooking/>
            },
            {
                path: "piercing",
                element : <PiercingSelect/>
            },
            { 
                path: "piercing/book-appointment",
                element: <AppointmentBooking />
            },
            {
                path: "coverup-tattoo",
                element : <CoverupTattooDesignSelect />
            },
            {
                path: "coverup-tattoo/size",
                element: <CoverupTattooSizeSelect />
            },
            {
                 path: "coverup-tattoo/color",
                 element : <CoverupTattooColorSelect />
            },
            {
                 path: "coverup-tattoo/book-appointment",
                 element : <AppointmentBooking/>
            },
            

        ]
    },
    {
        path: `/payment-page`,
        element: <PaymentPage />
    }
])


export default router;
import React from "react";
import AppointmentCallendarComponent from "../components/appointments/AppointmentCallendarComponent";
import { CalendarContextProvider } from "../contexts/CalendarContext";

const Calendar = () => {
    return (
        <CalendarContextProvider>
            <AppointmentCallendarComponent />
        </CalendarContextProvider>
    );
};

export default Calendar;

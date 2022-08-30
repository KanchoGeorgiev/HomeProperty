import React, { useState, useEffect, useContext, Fragment } from "react";
import { getMonth } from "../../services/dateConvertService";
import WrapperCard from "../cards/WrapperCard";
import CalendarContext from "../../contexts/CalendarContext";
import AuthContext from "../../contexts/AuthContext";
import DayComponent from "./DayComponent";
import CalendarHeaderComponent from "./CalendarHeaderComponent";
import AppointmentDetailModal from "./AppointmentDetailModal";

const AppointmentCallendarComponent = () => {
    const { monthIndex, modalIsOpen } = useContext(CalendarContext);
    const [month, setMonth] = useState(getMonth());
    const [appointments, setAppointments] = useState([]);
    const { userData } = useContext(AuthContext);

    const getAllAppointments = async () => {
        const response = await fetch(`/user/appointments/${userData.id}`, {
            headers: {
                "X-Api-Key": userData.token,
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            setAppointments(data);
        } else {
            alert("Couldn't get appointments");
        }
    };

    useEffect(() => {
        getAllAppointments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return (
        <WrapperCard>
            {modalIsOpen && <AppointmentDetailModal />}
            <div className="h-screen flex flex-col">
                <CalendarHeaderComponent />

                <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-white mt-6">
                    {month.map((row, i) => {
                        return (
                            <Fragment key={i}>
                                {row.map((day, idx) => {
                                    return (
                                        <DayComponent
                                            day={day}
                                            key={idx}
                                            rowIndx={i}
                                            appointments={appointments}
                                        />
                                    );
                                })}
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </WrapperCard>
    );
};

export default AppointmentCallendarComponent;

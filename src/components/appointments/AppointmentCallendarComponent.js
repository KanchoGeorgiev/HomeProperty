import React, { useState, useEffect, useContext, Fragment } from "react";
import { getMonth } from "../../services/dateService";
import WrapperCard from "../cards/WrapperCard";
import CalendarContext from "../../contexts/CalendarContext";
import DayComponent from "./DayComponent";

const AppointmentCallendarComponent = () => {
    const { monthIndex } = useContext(CalendarContext);
    const [month, setMonth] = useState(getMonth());

    useEffect(() => {
        setMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return (
        <WrapperCard>
            <div className="h-screen flex flex-col bg-white">
                <div className="flex-1 grid grid-cols-7 grid-rows-5">
                    {month.map((row, i) => {
                        return (
                            <Fragment key={i}>
                                {row.map((day, idx) => {
                                    return (
                                        <DayComponent
                                            day={day}
                                            key={idx}
                                            rowIndx={i}
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

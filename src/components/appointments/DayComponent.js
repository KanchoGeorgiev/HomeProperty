import React from "react";
import dayjs from "dayjs";
import { useState, useEffect, useContext } from "react";
import CalendarContext from "../../contexts/CalendarContext";

const DayComponent = ({ day, rowIndx, appointments }) => {
    const [dayEvents, setDayEvents] = useState([]);
    const { modalStateHandler, detailSetter } = useContext(CalendarContext);
    useEffect(() => {
        const events = appointments.filter((evt) => {
            return dayjs(evt.time).format("DD-MM-YY") === day.format("DD-MM-YY");
        });
        setDayEvents(events);
    }, [appointments, day]);
    const getCurrentDay = () => {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            ? "bg-amber-700 text-white rounded-full w-7"
            : "";
    };
    return (
        <div className="border border-gray-200 flex flex-col rounded-lg bg-white">
            <header className="flex flex-col items-center">
                {rowIndx === 0 && (
                    <p className="text-sm mt-1">
                        {day.format("ddd").toUpperCase()}
                    </p>
                )}
                <p
                    className={`text-sm p-1 my-1 text-center ${getCurrentDay()}`}
                >
                    {day.format("DD")}
                </p>
            </header>
            <div className="flex-1">
                {dayEvents.map((evt, i) => {
                    return (
                        <div
                            onClick={() => {
                                modalStateHandler(true);
                                detailSetter(evt);
                            }}
                            key={i}
                            className="bg-stone-400 p-1 mx-1 text-stone-100 text-sm rounded mb-1 truncate cursor-pointer"
                        >
                            {evt.name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DayComponent;

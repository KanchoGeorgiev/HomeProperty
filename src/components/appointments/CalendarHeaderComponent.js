import React, { useContext } from "react";
import dayjs from "dayjs";
import CalendarContext from "../../contexts/CalendarContext";

const CalendarHeaderComponent = () => {
    const { monthIndex, indexSetter } = useContext(CalendarContext);
    const prevMonthHandler = () => {
        indexSetter(monthIndex - 1);
    };
    const nextMonthHandler = () => {
        indexSetter(monthIndex + 1);
    };
    const todayHandler = () => {
        indexSetter(
            monthIndex === dayjs().month()
                ? monthIndex + Math.random()
                : dayjs().month()
        );
    };
    return (
        <header className="px-4 py-2 flex items-center bg-white border border-neutral-200 rounded-lg">
            <h1 className="mr-10 text-xl text-neutral-500 font-bold">Calendar</h1>
            <button
                className="border rounded py-2 px-4 mr-5"
                onClick={todayHandler}
            >
                Today
            </button>
            <button onClick={prevMonthHandler}>
                <span className="material-icons-outlined cursor-pointer text-neutral-600 mx-2">
                    chevron_left
                </span>
            </button>
            <button onClick={nextMonthHandler}>
                <span className="material-icons-outlined cursor-pointer text-neutral-600 mx-2">
                    chevron_right
                </span>
            </button>
            <h2 className="ml-4 text-xl text-neutral-500 font-bold">
                {dayjs(new Date(dayjs().year(), monthIndex)).format(
                    "MMMM YYYY"
                )}
            </h2>
        </header>
    );
};

export default CalendarHeaderComponent;

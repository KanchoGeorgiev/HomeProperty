import React from "react";
import dayjs from "dayjs";

const DayComponent = ({ day, rowIndx }) => {
    const getCurrentDay = () => {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            ? "bg-blue-600 text-white rounded-full w-7"
            : "";
    };
    return (
        <div className="border border-gray-200 flex flex-col ">
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
            {/* <div className="flex-1 cursor-pointer">
                {dayEvents.map((evt, i) => {
                    return (
                        <div
                            key={i}
                            className={`bg-gray-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
                        >
                            {evt.title}
                        </div>
                    );
                })}
            </div> */}
        </div>
    );
};

export default DayComponent;

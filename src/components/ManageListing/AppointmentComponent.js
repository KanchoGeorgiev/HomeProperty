import React, { useState } from "react";
import WrapperCard from "../cards/WrapperCard";
import DateTimePicker from "react-datetime-picker";

const AppointmentComponent = () => {
    const [time, setTime] = useState(new Date());

    const handleChange = (data) => {
        setTime(data);
    };

    const submitMeetingHandler = () => {
        console.log(time);
    };

    return (
        <WrapperCard>
            <div className="min-h-full flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
                <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
                    Please, specify time of the meeting.
                </h2>
                <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
                    It will take place in the address specified in the listing.
                </h2>
                <DateTimePicker
                    onChange={handleChange}
                    value={time}
                    className="w-1/3 rounded-md border-2 border-gray-900 bordder-primary p-2 bg-primary mt-4 text-base hover:bg-opacity-90 transition"
                />
                <button
                    type="button"
                    onClick={submitMeetingHandler}
                    className="inline-flex items-center mt-3 py-3 px-24 text-xl font-bold text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                    Make an appointment
                </button>
            </div>
        </WrapperCard>
    );
};

export default AppointmentComponent;

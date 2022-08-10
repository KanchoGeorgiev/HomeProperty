import React, { useState, useContext } from "react";
import WrapperCard from "../cards/WrapperCard";
import DateTimePicker from "react-datetime-picker";
import AuthContext from "../../contexts/AuthContext";

const NewAppointmentComponent = () => {
    const [time, setTime] = useState(new Date());
    const [name, setName] = useState("");
    const { userData } = useContext(AuthContext);

    const dataChangeHandler = (data) => {
        setTime(data);
    };
    const nameChangeHandler = (e) => {
        setName(e.target.value);
    };

    const submitMeetingHandler = () => {
        console.log(name);
        console.log(time);
        console.log(userData);
    };

    return (
        <WrapperCard>
            <div className="min-h-full flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
                <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
                    Please, specify time of the meeting.
                </h2>
                <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
                    It will take place in the address designated in the listing.
                </h2>
                <input
                    onChange={nameChangeHandler}
                    value={name}
                    type="text"
                    className="w-1/3 block rounded-md border bordder-primary py-3 px-5 mt-3 bg-primary text-base"
                    placeholder="Please enter your name"
                />
                <DateTimePicker
                    onChange={dataChangeHandler}
                    value={time}
                    className="w-1/3 rounded-md border-2 bordder-primary p-2 bg-white mt-4 text-base hover:bg-opacity-90 transition"
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

export default NewAppointmentComponent;

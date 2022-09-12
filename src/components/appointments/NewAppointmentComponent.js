import React, { useState, useContext } from "react";
import WrapperCard from "../cards/WrapperCard";
import DateTimePicker from "react-datetime-picker";
import AuthContext from "../../contexts/AuthContext";
import Input from "../UI/Input";
import { dateConvert } from "../../services/dateConvertService";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const NewAppointmentComponent = () => {
    const [time, setTime] = useState(new Date());
    const [name, setName] = useState("");
    const [nameIsValid, setNameIsValid] = useState(false);
    const { userData, socket } = useContext(AuthContext);
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const style =
        "w-full rounded-md border bordder-primary p-3 bg-primary text-base hover:bg-opacity-90 transition";

    const dataChangeHandler = (data) => {
        setTime(data);
    };
    const nameChangeHandler = (data) => {
        setName(data);
    };
    const nameValidHandler = (data) => {
        setNameIsValid(data.trim().length > 0);
    };

    const submitMeetingHandler = async () => {
        const convertedTime = dateConvert(time);
        const bodyData = {
            name,
            time: convertedTime,
            property_id: params.detailId,
        };
        if (nameIsValid) {
            const response = await fetch("/property/add-appointment", {
                method: "POST",
                headers: {
                    "X-Api-Key": userData.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData),
            });
            if (response.ok) {
                navigate(`/listings/${params.detailId}`);
                socket.emit("sendNotification", {
                    sender: userData.id,
                    reciever: location.state?.id,
                });
            } else {
                alert("Appointment unsuccessful!");
            }
        }
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
                <div className="w-1/3 mt-6">
                    <Input
                        value={name}
                        type="text"
                        name="name"
                        text="Please, enter your name"
                        onChangeInput={nameChangeHandler}
                        onValidity={nameValidHandler}
                        valid={nameIsValid}
                        warning="Please enter you name"
                        styles={style}
                    />
                </div>
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

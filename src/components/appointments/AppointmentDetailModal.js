import React, { useContext } from "react";
import CalendarContext from "../../contexts/CalendarContext";

const AppointmentDetailModal = () => {
    const { modalStateHandler, appointmentDetail } =
        useContext(CalendarContext);


    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form className="bg-white rounded-lg shadow-2xl w-1/4">
                <div className="p-3">
                    <div className="grid grid-cols-1/5 items-end gap-y-7">
                        <div></div>
                        <div className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200">
                            {appointmentDetail.headline}
                        </div>

                        <div className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200">
                            {appointmentDetail.time}
                        </div>

                        <div className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200">
                            {appointmentDetail.name}
                        </div>
                    </div>
                </div>
                <footer className="flex justify-end border-t p-3 mt-5">
                    <button
                        type="button"
                        onClick={() => {
                            modalStateHandler(false);
                        }}
                        className="hover:bg-amber-700 bg-stone-400 px-6 py-2 rounded text-white"
                    >
                        Close
                    </button>
                </footer>
            </form>
        </div>
    );
};

export default AppointmentDetailModal;

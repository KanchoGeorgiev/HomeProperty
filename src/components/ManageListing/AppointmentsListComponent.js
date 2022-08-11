import React, { useState, useEffect, useContext } from "react";
import WrapperCard from "../cards/WrapperCard";
import AuthContext from "../../contexts/AuthContext";

const AppointmentsListComponent = () => {
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
    }, []);
    return (
        <WrapperCard>
            <div className="flex flex-col mt-8">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Name
                                    </th>

                                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Lisitng Headline
                                    </th>
                                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Time
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white">
                                {appointments.length > 0 &&
                                    appointments.map((x) => {
                                        return (
                                            <tr key={x.id}>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 w-10 h-10">
                                                            <img
                                                                className="w-10 h-10 rounded-full"
                                                                src="https://source.unsplash.com/user/erondu"
                                                                alt="admin dashboard ui"
                                                            />
                                                        </div>

                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium leading-5 text-gray-900">
                                                                {x.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <span className="inline-flex px-2 text-xs font-semibold leading-5">
                                                        {x.headline}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <span className="inline-flex px-2 text-xs font-semibold leading-5">
                                                        {x.time}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                {appointments.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="text-center px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-xs font-semibold leading-5">
                                            No Appointments Pending.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </WrapperCard>
    );
};

export default AppointmentsListComponent;

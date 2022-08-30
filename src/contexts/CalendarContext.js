import { createContext, useState } from "react";
import dayjs from "dayjs";

const CalendarContext = createContext({
    monthIndex: 0,
    indexSetter: (index) => {},
    modalIsOpen: false,
    modalStateHandler: (state) => {},
    appointmentDetail: null,
    detailSetter: (data) => {},
});

export const CalendarContextProvider = (props) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [appointmentDetail, setAppointmentDetail] = useState(null);

    const setIndexHandler = (index) => {
        setMonthIndex(index);
    };

    const modalStateHandler = (state) => {
        setModalIsOpen(state);
    };

    const detailSetter = (data) => {
        setAppointmentDetail(data);
    };

    return (
        <CalendarContext.Provider
            value={{
                monthIndex,
                indexSetter: setIndexHandler,
                modalIsOpen,
                modalStateHandler,
                appointmentDetail,
                detailSetter,
            }}
        >
            {props.children}
        </CalendarContext.Provider>
    );
};

export default CalendarContext;

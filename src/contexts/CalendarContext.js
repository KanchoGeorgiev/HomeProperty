import { createContext, useState } from "react";
import dayjs from "dayjs";

const CalendarContext = createContext({
    monthIndex: 0,
    indexSetter: (index) => {},
});

export const CalendarContextProvider = (props) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());

    const setIndexHandler = (index) => {
        setMonthIndex(index);
    };

    return (
        <CalendarContext.Provider
            value={{ monthIndex, indexSetter: setIndexHandler }}
        >
            {props.children}
        </CalendarContext.Provider>
    );
};

export default CalendarContext;

import dayjs from "dayjs";

export const dateConvert = (data) => {
    const year = data.getFullYear();
    const month = data.getMonth();
    const day = data.getDate();
    const hours = data.getHours();
    const minutes = data.getMinutes();
    const seconds = data.getSeconds();
    const time = `${year}-${month + 1}-${day} ${hours}:${minutes}:${seconds}`;
    return time;
};

export const getMonth = (month = dayjs().month()) => {
    month = Math.floor(month);
    const year = dayjs().year();
    const firstDayofMonth = dayjs(new Date(year, month, 0)).day();
    let currentMonthCount = 0 - firstDayofMonth;
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        });
    });
    return daysMatrix;
};

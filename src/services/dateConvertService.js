export const dateConvert = (data) => {
    const year = data.getFullYear();
    const month = data.getMonth();
    const day = data.getDate();
    const hours = data.getHours();
    const minutes = data.getMinutes();
    const seconds = data.getSeconds();
    const time = `${year}-${month+1}-${day} ${hours}:${minutes}:${seconds}`;
    return time;
};

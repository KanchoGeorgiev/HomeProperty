const data = localStorage.getItem("auth");
const storedData = JSON.parse(data);

export const deleteListingService = (id) => {
    const response = fetch(`/property/delete/${id}`, {
        method: "DELETE",
        headers: {
            "X-Api-Key": storedData.token,
            "Content-Type": "application/json",
        },
    });

    return response;
};

export const fetchOneSevice = (id) => {
    const response = fetch(`/property/view/${id}`);
    return response;
};

export const editListingService = (id, data) => {
    const response = fetch(`/property/update/${id}`, {
        method: "PUT",
        headers: {
            "X-Api-Key": storedData.token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response;
};

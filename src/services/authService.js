export const authService = (data, method) => {
    let url = "/site/login";
    if (method === "reg") {
        url = "/user/create";
    }
    const response = fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response;
};

export const logoutSevice = () => {
    const data = localStorage.getItem("auth");
    const storedData = JSON.parse(data);
    fetch("/site/logout", {
        method: "POST",
        headers: {
            "X-Api-Key": storedData.token,
            "Content-Type": "application/json",
        },
    });
    localStorage.removeItem("auth");
};

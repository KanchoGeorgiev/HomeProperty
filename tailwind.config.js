/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            spacing: {
                22: "5.5rem",
                30: "7.65rem",
                84: "21rem",
                88: "22rem",
                92: "23rem",
                128: "32rem",
                144: "36rem",
                160: "40rem",
                172: "44rem",
            },
        },
    },
    plugins: [],
};

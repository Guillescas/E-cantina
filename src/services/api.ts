import axius from "axios";

const api = axius.create({
    baseURL: "http://localhost:8080/"
});

export default api;

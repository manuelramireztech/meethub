import axios from "axios";

export default {
    getUsers: function () {
        return axios.get("/api/Registration");
    },
    registerUser: function (user) {
        return axios.post('/api/register', user)
    },
    loginUser: function () {
        return axios.post("/api/login")
    }

};
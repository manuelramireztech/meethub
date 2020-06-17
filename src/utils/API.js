import axios from "axios";

export default {
    registerUser: function (user) {
        return axios.post('/api/register', user)
    },
    loginUser: function () {
        return axios.post("/api/login");
    },
    // checkUserEmail: function () {
    //     return axios.post("/api/auth/signup");
    // }

};
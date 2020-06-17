import axios from "axios";

export default {
    registerUser: function (user) {
        return axios.post("/api/register", user)
    },
    loginUser: function (user) {
        return axios.post("/api/login", user);
    },
    // checkUserEmail: function () {
    //     return axios.post("/api/auth/signup");
    // }

};
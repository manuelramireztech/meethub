import axios from "axios";

export default {
    getUsers: function () {
        return axios.get("/api/Registration");
    }

};
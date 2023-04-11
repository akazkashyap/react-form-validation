import axios from "axios";
const ENDPOINT = "https://user-acc.onrender.com"

export default axios.create({
    baseURL: ENDPOINT
})
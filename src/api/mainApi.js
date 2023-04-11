import axios from "axios";
const ENDPOINT = process.env.REACT_APP_ENDPOINT

export default axios.create({
    baseURL: ENDPOINT
})
import axios from 'axios';


const axiosInstances = axios.create({
    baseURL: 'http://localhost:7000',
})

export default axiosInstances;
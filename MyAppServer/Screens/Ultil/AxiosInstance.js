import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP_CONFIG_LAPTOP from '../../Component/index/index'
const AxiosInstance = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: 'http://10.0.2.2:3000/api/'
    });
    //192.168.0.102
    // 172.16.64.67
    //10.22.213.132
    axiosInstance.interceptors.request.use(
        async config => {
            const token = await AsyncStorage.getItem('token');
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': contentType
            }
            return config;
        },
        err => Promise.reject(err)
    );
    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    ); // callback
    return axiosInstance;
}

export default AxiosInstance;
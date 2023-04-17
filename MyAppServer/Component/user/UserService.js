import { AxiosInstance } from "../../Screens/Ultil/AxiosIntance";

const login = async (email, password) => {
    try {
        const user = { email, password };
        const result = await AxiosInstance().post('api/user/login', user);
        return result;
    } catch (error) {
        console.log('Login error' + error)
        return false;

    }
}
//http://localhost:3000/api/user/register
const register = async (email, password, name) => {
    try {
        const user = { email, password, name };
        const result = await AxiosInstance().post('api/user/register/', user);
        return result;
    } catch (error) {
        console.log('register error' + error)
        return false;

    }
}
const deleteUserByEmail = async (email) => {
    try {
        const user = { email };
        const result = await AxiosInstance().post('api/user/delete-delete-user/', user);
        return result;
    } catch (error) {
        console.log('delete user error' + error)
        return false;

    }
}

const updateUser = async (email, password, name) => {
    try {
        const user = { email, password, name };
        const result = await AxiosInstance().post('api/user/update-user/', user);
        return result;
    } catch (error) {
        console.log('update user error' + error)
        return false;

    }
}

const getAllUser = async (page, size) => {
    try {
        const user = { email, password, name };
        const result = await AxiosInstance().post('api/user/list-user/', user);
        return result;
    } catch (error) {
        console.log('update user error' + error)
        return false;

    }
}
module.exports = { login, register, deleteUserByEmail, updateUser, getAllUser };

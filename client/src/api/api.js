import Axios from "axios";

export const profileApi = {
    getUserProfile(userId) {
        return ({
            firstName: 'John',
            lastName: 'Smith',
            userId: userId
        })
    }
}
export const authApi = {
    async login(email, password) {
        try {
            return await Axios.post('/api/auth/login', {email, password});
        } catch (e) {
            console.log('ОШИБКА! '+e.message);
        }
    },
    async register(email, password, firstName, lastName) {
        try {
            return await Axios.post('/api/auth/register', {email, password, firstName, lastName});
        } catch (e) {
            console.log('ОШИБКА! '+e.message);
        }
    },
    async verifyAuth() {
        try {
            return await Axios.post('/api/auth/verifyAuth');
        } catch (e) {
            console.log('ОШИБКА! '+e.message);
        }
    },
    async logout() {
        try {
            return await Axios.get('/api/auth/logout');
        } catch (e) {
            console.log('ОШИБКА! '+e.message);
        }
    }
}
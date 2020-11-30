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
        return await Axios.post('/api/auth/login', {email, password});
    },
    async register(email, password, firstName, lastName) {
        return await Axios.post('/api/auth/register', {email, password, firstName, lastName});
    },
    async verifyAuth() {
        return await Axios.post('/api/auth/verifyAuth');
    },
    async logout() {
        return await Axios.get('/api/auth/logout');
    }
}
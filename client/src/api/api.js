import Axios from "axios";

export const profileApi = {
    async getUserProfile(userId) {
        try {
            return await Axios.get(`/api/profile/get_profile/${userId}`);
        } catch (e) {
            console.log(e.message);
        }
    }
};
export const productApi = {
    async addNewListing(product) {
        try {
            return await Axios.post(`/api/product/add_new_product/`, product);
        } catch (e) {
            console.log(e.message);
        }
    },
    async requestProduct(productId) {
        try {
            return await Axios.get(`/api/product/get_product/${productId}`);
        } catch (e) {
            console.log(e.message);
        }
    },
    async requestProductList(skip, limit) {
        try {
            return await Axios.post(`/api/product/get_product_list`, {skip, limit});
        } catch (e) {
            console.log(e.message);
        }
    }
};

export const authApi = {
    async login(email, password) {
        try {
            return await Axios.post('/api/auth/login', {email, password});
        } catch (e) {
            console.log(e.message);
        }
    },
    async register(email, username, password, firstName, lastName) {
        try {
            return await Axios.post('/api/auth/register', {email, username, password, firstName, lastName});
        } catch (e) {
            console.log(e.message);
        }
    },
    async verifyAuth() {
        try {
            return await Axios.get('/api/auth/verifyAuth');
        } catch (e) {
            console.log(e.message);
        }
    },
    async logout() {
        try {
            return await Axios.get('/api/auth/logout');
        } catch (e) {
            console.log(e.message);
        }
    }
}
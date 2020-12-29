import Axios from "axios";

export const profileApi = {
    async getUserProfile(userId) {
        return await Axios.get(`/api/profile/get_profile/${userId}`);
    }
};

export const productApi = {
    async requestProduct(productId) {
        return await Axios.get(`/api/product/get_product/${productId}`);
    },
    async requestProductList(skip, limit) {
        return await Axios.post(`/api/product/get_product_list`, {skip, limit});
    }
};

export const authApi = {
    async login(email, password) {
        return await Axios.post('/api/auth/login', {email, password});
    },
    async register(email, username, password, firstName, lastName) {
        return await Axios.post('/api/auth/register', {email, username, password, firstName, lastName});
    },
    async verifyAuth() {
        return await Axios.get('/api/auth/verifyAuth');
    },
    async logout() {
        return await Axios.get('/api/auth/logout');
    },
    async editProfile(formData) {
        return await Axios.patch(`/api/auth/edit_profile`, formData);
    },
    async addNewListing(product) {
        return await Axios.post(`/api/product/add_new_product/`, product);
    },
    async deleteProduct(productId) {
        return await Axios.delete(`/api/product/delete_product/${productId}`);
    },
    async deleteFromCart(productId) {
        return await Axios.delete(`/api/cart/delete_from_cart/${productId}`);
    },
    async addToCart(productId) {
        return await Axios.post(`/api/cart/add_to_cart`, {productId});
    },
    async editProduct(formData) {
        return await Axios.patch(`/api/product/edit_product`, formData);
    }
}
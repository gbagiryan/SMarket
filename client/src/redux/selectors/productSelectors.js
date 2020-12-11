export const getProduct = (state) => {
    return state.productReducer.product
};
export const getProductList = (state) => {
    return state.productReducer.productList
};
export const getProductsCount = (state) => {
    return state.productReducer.productsCount
};
export const getProductsIsLoading = (state) => {
    return state.productReducer.isLoading
};
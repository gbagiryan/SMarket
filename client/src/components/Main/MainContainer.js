import React, {useEffect, useState} from 'react';
import {Main} from "./Main";
import {connect} from "react-redux";
import {productApi} from "../../api/api";

const MainContainer = (props) => {

    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(5);
    const [ProductList, setProductList] = useState([]);
    const [IsLoading, setIsLoading] = useState(true);
    const [ProductsCount, setProductsCount] = useState(0);

    const getProducts = async (skip, limit, loadMore) => {
        setIsLoading(true)
        const res = await productApi.requestProductList(skip, limit);
        if (res && res.data) {
            loadMore
                ? setProductList([...ProductList, ...res.data.products])
                : setProductList([...res.data.products]);
            setProductsCount(res.data.productsCount);
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getProducts(Skip, Limit);
    }, []);

    const loadMore = () => {
        let newSkip = Skip + Limit;
        setSkip(newSkip);
        getProducts(newSkip, Limit, true);
    };

    return (
        <div>
            <Main productList={ProductList}
                  productsCount={ProductsCount}
                  loadMore={loadMore}
                  isLoading={IsLoading}/>
        </div>
    )
};

const mapStateToProps = (state) => ({});

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(MainContainer);
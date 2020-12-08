import React, {useEffect, useState} from 'react';
import {Main} from "./Main";
import {connect} from "react-redux";
import {requestProductList} from "../../redux/reducers/ProductReducer";
import {getProductList} from "../../redux/selectors/productSelectors";

const MainContainer = (props) => {

    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(5);

    useEffect(() => {
        props.requestProductList(Skip, Limit);

    }, []);

    const loadMore = () => {
        let newSkip = Skip + Limit;
        setSkip(newSkip);
        props.requestProductList(newSkip, Limit);
    };

    return (
        <div>
            <Main productList={props.productList} loadMore={loadMore}/>
        </div>
    )
};


const mapStateToProps = (state) => ({
    productList: getProductList(state)
});

const actionCreators = {
    requestProductList
};

export default connect(mapStateToProps, actionCreators)(MainContainer);
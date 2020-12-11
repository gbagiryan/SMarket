import React from 'react';
import Loading from "../Common/Loading/Loading";
import ProductPreview from "../ProductPreview/ProductPreview";

export const Main = (props) => {
    if (!props.productList) {
        return <Loading/>
    }
    return (
        <div>
            <h1>Main PAGE</h1>
            <div>
                {props.productList.map(product =>
                    <ProductPreview product={product} key={product._id}/>
                )}
            </div>
            <div>
                {props.isLoading
                    ? <Loading/>
                    : (props.productsCount - props.productList.length > 0)
                        ? <button onClick={props.loadMore}>Load More</button>
                        : <h2>no more products to show</h2>}
            </div>
        </div>
    )
};
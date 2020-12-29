import React from 'react';
import Loading from "../Common/Loading/Loading";
import ProductPreview from "../ProductPreview/ProductPreview";
import {Error} from "../Common/Messages/Messages";

export const Main = (props) => {
    if (props.isLoading && !props.isLoadMore) {
        return <Loading/>
    }

    return (
        <div>
            <div>
                {props.productList.map(product =>
                    <div>
                        <ProductPreview product={product} key={product._id}/>
                        {props.isAuthed
                            ? <button onClick={() => props.handleAddToCart(product._id)}>Add to cart</button>
                            : null
                        }
                    </div>
                )}
            </div>
            <div>
                {props.isLoading && props.isLoadMore
                    ? <Loading/>
                    : props.errorMsg
                        ? <Error errorMsg={props.errorMsg}/>
                        : (props.productsCount - props.productList.length > 0)
                            ? <button onClick={props.loadMore}>Load More</button>
                            : <h2>no more products to show</h2>}
            </div>
        </div>
    )
};
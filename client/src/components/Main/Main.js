import React from 'react';
import Loading from "../Common/Loading/Loading";
import ProductPreview from "../ProductPreview/ProductPreview";
import {Error} from "../Common/Messages/Messages";
import {Grid, Card, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


const useStyles = makeStyles({});

export const Main = (props) => {

    const classes = useStyles();

    if (props.isLoading && !props.isLoadMore) {
        return <Loading/>
    }

    return (
        <div>
            <Grid container spacing={2}>
                {props.productList.map(product =>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Card elevation={4}>
                            {props.isAuthed &&
                            <Button onClick={() => props.handleAddToCart(product._id)}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    endIcon={<AddShoppingCartIcon/>}
                            >Add to cart </Button>}
                            <ProductPreview product={product} key={product._id}/>
                        </Card>
                    </Grid>
                )}
            </Grid>
            <div>
                {props.isLoading && props.isLoadMore
                    ? <Loading/>
                    : props.errorMsg
                        ? <Error errorMsg={props.errorMsg}/>
                        : (props.productsCount - props.productList.length > 0)
                        && <button onClick={props.loadMore}>Load More</button>
                }
            </div>
        </div>
    )
};
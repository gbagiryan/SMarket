import React from 'react';
import Loading from "../Common/Loading/Loading";
import ProductPreview from "../ProductPreview/ProductPreview";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {Button, makeStyles} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {Error} from "../Common/Messages/Messages";

const useStyles = makeStyles({});

export const Profile = (props) => {

    const classes = useStyles();

    if (props.errorMsg) {
        return <Error errorMsg={props.errorMsg}/>
    }

    if (!props.profile) {
        return <Loading/>
    }
    return (
        <div>
            <h2>Profile PAGE</h2>
            <p>{props.profile.username}</p>
            <p>{props.profile.firstName} {props.profile.lastName}</p>
            <div>
                <h2>{props.profile.username}'s products</h2>
                <Grid container spacing={2}>
                    {props.profile.products.length
                        ? props.profile.products.map(product =>
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
                        )
                        : <h3>No products to show</h3>
                    }
                </Grid>
            </div>
        </div>
    )
};
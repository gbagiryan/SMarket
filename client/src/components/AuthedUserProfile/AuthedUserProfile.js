import React from 'react';
import Loading from "../Common/Loading/Loading";
import ProductPreview from "../ProductPreview/ProductPreview";
import {Link, NavLink} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {Button, Card} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({});

export const AuthedUserProfile = (props) => {

    const classes = useStyles();

    if (!props.profile) {
        return <Loading/>
    }
    return (
        <div>
            <div>
                <h1>{props.profile.username}'s Profile</h1>
                <p>{props.profile.email}</p>
                <p>{props.profile.username}</p>
                <p>{props.profile.firstName} {props.profile.lastName}</p>
                <NavLink to={'/edit_profile'}>Edit</NavLink>
            </div>
            <div>
                <h1>My products</h1>
                <Grid container spacing={2}>
                    {props.authedUserProducts.length
                        ? props.authedUserProducts.map(product =>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Card>
                                    <Button onClick={() => props.handleDeleteProduct(product._id)}
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            endIcon={<RemoveShoppingCartIcon/>}>Delete</Button>
                                    <Button component={Link} to={`/edit_product/${product._id}`} variant="contained"
                                            color="primary" className={classes.button}
                                            endIcon={<EditIcon/>}>Edit</Button>
                                    <ProductPreview product={product} key={product._id}/>
                                </Card>
                            </Grid>)
                        : <h3>No products to show</h3>
                    }
                </Grid>

                <h1>My cart</h1>
                <Grid container spacing={2}>
                    {props.authedUserCart.length
                        ? props.authedUserCart.map(product =>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Card>
                                    <Button onClick={() => props.handleDeleteFromCart(product._id)}
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            endIcon={<RemoveShoppingCartIcon/>}>Delete</Button>
                                    <ProductPreview product={product} key={product._id}/>
                                </Card>
                            </Grid>
                        )
                        : <h3>No products in cart</h3>
                    }
                </Grid>
            </div>
        </div>
    )
};
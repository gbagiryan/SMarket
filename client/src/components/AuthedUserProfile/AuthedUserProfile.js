import React from 'react';
import Loading from "../Common/Loading/Loading";
import ProductPreview from "../ProductPreview/ProductPreview";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {Button, Card} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import {makeStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import {Error} from "../Common/Messages/Messages";

const useStyles = makeStyles(theme => ({
    paper: {
        minHeight: 200,
        width: 300,
        padding: theme.spacing(2)
    }
}));

export const AuthedUserProfile = (props) => {

    const classes = useStyles();
    if (props.errorMsg) {
        return <Error errorMsg={props.errorMsg}/>
    }
    if (!props.profile) {
        return <Loading/>
    }
    return (
        <div>
            <Paper className={classes.paper}>
                <h2>{props.profile.username}</h2>
                <p>{props.profile.email}</p>
                <p>{props.profile.username}</p>
                <p>{props.profile.firstName} {props.profile.lastName}</p>
                <Button component={Link} to={`/edit_profile`} variant="contained"
                        color="primary" className={classes.button}
                        endIcon={<EditIcon/>}>Edit Profile</Button>
            </Paper>
            <div>
                <h1>My products</h1>
                <Grid container spacing={2}>
                    {props.authedUserProducts.length
                        ? props.authedUserProducts.map(product =>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Card elevation={4}>
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
                                <Card elevation={4}>
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
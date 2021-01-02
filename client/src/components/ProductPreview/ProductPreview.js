import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import {CardActionArea, CardContent, CardMedia, Typography, CardHeader, ListItem} from '@material-ui/core';

const useStyles = makeStyles({
    media: {
        height: 140,
    },
});

const ProductPreview = (props) => {
    const classes = useStyles();

    return (
        <div>
            <CardActionArea component={Link} to={`/product/${props.product._id}`}>
                <CardHeader
                    title={props.product.productName}
                    subheader={props.product.price}
                />
                <CardMedia
                    className={classes.media}
                    image={props.product.productPicture}
                    title={props.product.productName}
                />
            </CardActionArea>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component={Link} to={`/user/${props.product.user.profileId}`}>
                    {`Posted by ${props.product.user.username}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.product.category}
                </Typography>
            </CardContent>
        </div>

        // <div>
        //     <NavLink to={`/product/${props.product._id}`}>{props.product.productName}</NavLink>
        //     <div>{props.product.description}</div>
        //     <div>{props.product.price}</div>
        //     <div>{props.product.category}</div>
        //     <NavLink to={`/user/${props.product.user.profileId}`}>{props.product.user.username}</NavLink>
        // </div>
    )
};

export default ProductPreview;
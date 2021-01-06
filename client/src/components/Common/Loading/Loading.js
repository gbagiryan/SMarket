import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"
    },
}));

const Loading = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress/>
        </div>
    );
}


// import React from 'react';
// import styles from './Loading.module.css';
//
// const Loading = () => {
//     return (
//         <div className={styles.spinner}></div>
//     );
// };

export default Loading;
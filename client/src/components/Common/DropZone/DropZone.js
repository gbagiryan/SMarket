import Paper from "@material-ui/core/Paper";
import Dropzone from "react-dropzone";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    paperStyle: {
        padding: 20,
        margin: 'auto',
        height: 450,
        width: 350,
    },
    dropZone: {}
}));

export const DropZone = (props) => {

    const classes = useStyles();
    const validFormats = props.validFormats.map((i) => `${i}`).join();

    return (
        <Dropzone onDrop={props.handleDrop} multiple={props.multipleUpload} accept={validFormats} maxSize={props.imageMaxSize}>
            {
                ({getRootProps, getInputProps}) => (
                    <Paper className={classes.dropZone} variant={'outlined'} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop image here</p>
                    </Paper>
                )
            }
        </Dropzone>
    )
}
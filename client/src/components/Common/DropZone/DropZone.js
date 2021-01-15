import Paper from "@material-ui/core/Paper";
import Dropzone from "react-dropzone";
import React from "react";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles(theme => ({
    paperStyle: {
        padding: 20,
        margin: 'auto',
        height: 450,
        width: 350,
    },
    dropZone: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    },
    imageContainer: {
        position: 'relative',
        margin: theme.spacing(1),
        width: 150,
        height: 100,
        display: "inline-block",
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    cancelIcon: {
        color: 'red',
        backgroundColor: 'black',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: 20,
        position: "absolute",
        top: 0,
        right: 0
    }
}));

export const DropZone = (props) => {

    const classes = useStyles();
    const validFormats = props.validFormats.map((i) => `${i}`).join();

    return (
        <>
            {props.thumbs.length < props.maxFilesToShow &&
            <Dropzone onDrop={props.handleDrop} multiple={props.multipleUpload} accept={validFormats}
                      maxFiles={props.maxFiles} maxSize={props.imageMaxSize}>
                {
                    ({getRootProps, getInputProps}) => (
                        <Paper className={classes.dropZone} variant={'outlined'} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>{props.dropZoneText}</p>
                        </Paper>
                    )
                }
            </Dropzone>
            }
            <Grid item xs={12}>
                {props.thumbs && props.thumbs.map(thumb =>
                    <div className={classes.imageContainer}>
                        <img src={thumb} alt="preview" className={classes.img}/>
                        <HighlightOffIcon onClick={() => props.handleClick(props.thumbs.indexOf(thumb))}
                                          className={classes.cancelIcon}/>
                    </div>
                )}
            </Grid>
        </>
    )
}
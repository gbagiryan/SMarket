import React from 'react';
import Loading from "../Common/Loading/Loading";

export const Profile = (props) => {
    if (!props.profile) {
        return <Loading/>
    }
    return (
        <div>
            <h1>Profile PAGE</h1>
            <p>{props.profile.firstName}</p>
            <p>{props.profile.userId}</p>
        </div>
    )
};
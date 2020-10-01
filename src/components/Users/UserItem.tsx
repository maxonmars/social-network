import React from "react";
import {UserType} from "../../types/entities";
import userPhoto from "../../assets/images/ContraAV.jpg"
import {NavLink} from "react-router-dom";

type PropsType = {
    user: UserType
    follow: (id: string)=> void
    unfollow: (id: string)=> void
}

export const UserItem: React.FC<PropsType> = ({user, follow, unfollow}) => {
    const {id, followed, name, uniqueUrlName, status, large, small} = {...user, ...user.photos}

    let onFollowButton = () => follow(id)
    let onUnfollowButton = () => unfollow(id)

    return (
        <div>
            <NavLink to={"/profile/" + id}><img src={small !== null ? small : userPhoto} alt="" width={100} height={100}/></NavLink>
            <div>{name}</div>
            <div>{status}</div>
            {/*<div>{`${country} ${city}`}</div>*/}
            {followed ? <button onClick={onUnfollowButton}>unfollow</button> :
                <button onClick={onFollowButton}>follow</button>}
        </div>
    )
}
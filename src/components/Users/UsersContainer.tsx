import React from "react";
import {connect} from "react-redux";
import {actions, InitialStateType} from "../../redux/user-reducer";
import {AppStateType} from "../../redux/redux-store";
import {UserType} from "../../types/entities";
import axios from "axios";
import {Users} from "./Users";

export type MapStatePropsType = {
    UserPage: InitialStateType
}

export type MapDispatchPropsType = {
    follow: (id: string) => void
    unfollow: (id: string) => void
    setCurrentPage: (p: number) => void
    setUsers(users: Array<UserType>): void
    setTotalCount(usersCount: number): void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

export class UsersAPIComponent extends React.Component<PropsType> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.UserPage.pageSize}&page=${this.props.UserPage.currentPage}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalCount(response.data.totalCount)
            })


    }

    setCurrentPage = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.UserPage.pageSize}&page=${pageNumber}`)
            .then(response => this.props.setUsers(response.data.items))
    }

    render() {
        return <Users
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            UserPage={this.props.UserPage}
            setCurrentPage={this.setCurrentPage}
        />;
    }
}

const {setCurrentPage, setTotalCount, follow, setUsers, unfollow} = actions

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({UserPage: state.UserPage})

export const UserContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setTotalCount,})(UsersAPIComponent);


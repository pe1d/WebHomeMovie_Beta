import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import SiderInfo from '../mainWatch/SiderInfo/SiderInfo.js';
import Main from '../mainWatch/Main/Main.js';

class HomePage extends Component {

    // handleClickLogout = (doctorInfo) => {
    //     // return <Redirect to={`/home/doctor-info/${doctorInfo.id}`}></Redirect>
    //     this.props.history.push(`/home/doctor-info/${doctorInfo.id}`)
    //     // alert("Check " + doctorInfo.id)
    // }
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/home/watch" component={Main} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
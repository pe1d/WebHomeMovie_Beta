import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './SideWatch.scss'
import * as actions from "../../../store/actions";
import HeaderSW from './Header/headerSW';
import BodySW from './Body/bodySW';
class SideWatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            avatar: '',
        }
    }
    render() {
        let { notice, noticeBox, noticeList } = this.state
        return (
            <>
                <div className='container-side-left'>
                    <div className='csl-header'>
                        <HeaderSW />
                    </div>
                    <div className='csl-body'>
                        <BodySW />
                    </div>
                </div >
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideWatch);
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './SideInfo.scss'
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../untils';
import '../../Auth/About.scss'
import Menu from './Menu/Menu';
class SideInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideMenu: false,
        }
    }
    changeLanguage = (language) => {
        //fire redux event : actions
        this.props.changeLanguageAppRedux(language)
    }
    handleChangeMenu = () => {
        this.setState({
            hideMenu: !this.state.hideMenu
        }, () => {
            console.log(this.state.hideMenu);
        })
    }
    render() {
        const { userInfo, language } = this.props;
        return (
            <>
                <div className='container-side-right'>
                    <div className='header'>
                        <div className='btn-menu col-4' onClick={() => this.handleChangeMenu()}>
                            <i className="fas fa-bars"></i>
                        </div>
                        <div className='name-brand col-6'>
                        </div>
                    </div>
                    <div className='sub-header'>
                        <div className='languages' style={{ width: '60px', height: '30px' }}>
                            <div className={language === LANGUAGES.VI ? 'lang-vi active' : 'lang-vi'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'lang-en active' : 'lang-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div>
                    <Menu />
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SideInfo);
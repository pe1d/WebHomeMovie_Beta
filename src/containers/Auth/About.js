import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './About.scss'
import * as actions from "../../store/actions";
import { LANGUAGES } from '../../untils'
import { FormattedMessage } from 'react-intl';
import HomeFooter from '../HomePage/HomeFooter';
import DetailAbout from '../../components/About/DetailAbout';
class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputEmail: ''
        }
    }
    changeLanguage = (language) => {
        //fire redux event : actions
        this.props.changeLanguageAppRedux(language)
    }
    hanldeLogin = () => {
        this.props.history.push(`/login`)
    }
    handleChangeInputEmail = (event) => {
        this.setState({
            inputEmail: event.target.value
        })
    }
    render() {
        const { language } = this.props;
        console.log(language);
        return (
            <>
                <div className='container-about'>
                    <div className='header-about'>
                        <div className='content-left'>
                            <div className='logo-about'>
                            </div>
                            <div className='name-logo'>
                            </div>
                        </div>
                        <div className='content-right'>
                            <div className='button-login'>
                                <button type="button" class="btn btn-danger" onClick={() => this.hanldeLogin()}><FormattedMessage id='about.login' /></button>
                            </div>
                            <div className='languages'>
                                <div className={language === LANGUAGES.VI ? 'lang-vi active' : 'lang-vi'}>
                                    <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span>
                                </div>
                                <div className={language === LANGUAGES.EN ? 'lang-en active' : 'lang-en'}>
                                    <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='banner-about'>
                        <div className='title-banner'>
                            <h1><FormattedMessage id='about.title-banner' /></h1>
                            <div className='p1'><FormattedMessage id='about.p1-banner' /></div>
                            <div className='p2'>
                                <FormattedMessage id='about.p2-banner' />
                            </div>
                        </div>
                        <div className='input-email-about'>
                            <div className="input-group input-group-lg">
                                <FormattedMessage id="about.placeholder-email">
                                    {placeholder =>
                                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
                                            placeholder={placeholder}
                                            value={this.state.inputEmail} onChange={(event) => this.handleChangeInputEmail(event)} />
                                    }
                                </FormattedMessage>

                                <button class="btn btn-danger" id="inputGroup-sizing-lg" style={{ textAlign: 'center' }}><FormattedMessage id='about.get-started' /></button>
                            </div>
                        </div>
                    </div>
                </div >
                <DetailAbout
                    id='1'
                    srcImg='https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg'
                    srcVid=''
                />
                <DetailAbout
                    id='2'
                    srcImg='https://occ-0-325-395.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABZSTDsJQCe6ndkevSo7c_grcr0f2YJ5pimzeSor98ix4Earwyoza7Liyg8OsNpA2cg3HKSF63qppfkKVP8BTEmcVRAkwa2lhcl5S.png?r=d73'
                    srcVid=''
                />
                <HomeFooter />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
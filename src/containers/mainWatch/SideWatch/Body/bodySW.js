import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './bodySW.scss'
import * as actions from "../../../../store/actions";
import TimeRangeSlider from 'react-time-range-slider';
import { LANGUAGES } from '../../../../untils';
import CslCont from './cslCont';
import CslTopRated from './cslTopRated';
import CslGenres from './cslGenres';
import { withRouter } from 'react-router';
class bodySW extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    hanldeWatchMovie = (id) => {
        // alert('Movie id: ' + id)
        this.props.history.push(`/dMovie/${id}`)
    }
    render() {

        return (
            <>
                <CslCont />
                <CslTopRated
                    idName='main.content.popular-movies'
                    typeSort='popularity.desc'
                    page='1'
                    year='2024'
                    hanldeWatchMovie={this.hanldeWatchMovie}
                />
                <CslGenres />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(bodySW));
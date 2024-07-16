import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './watchMoviePage.scss'
import * as actions from "../../store/actions";
import StarRatings from 'react-star-ratings';
import HomeFooter from '../HomePage/HomeFooter'
import { ApiKey, LANGUAGES } from '../../untils'
import { FormattedMessage } from 'react-intl';
import { Redirect, withRouter } from 'react-router';
import YouTube from 'react-youtube';
import Slider from 'react-slick';
import moment from 'moment/moment';
import ReactModal from 'react-modal';
class watchMoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vidMovie: [],
            detailMovie: {},
            creditMovie: [],
            widthScreen: window.innerWidth,
        };
    }
    changeLanguage = (language) => {
        //fire redux event : actions
        this.props.changeLanguageAppRedux(language);

    }
    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (this.props.language !== prevProps.language) {
            this.props.fetchDetailMovie(this.props.match.params.id, this.props.language)
            this.props.fetchVideoMovie(this.props.match.params.id, this.props.language)
            this.props.fetchCreditMovie(this.props.match.params.id, this.props.language)
        }
        if (this.props.detailMovie !== prevProps.detailMovie) {
            this.setState({
                detailMovie: this.props.detailMovie
            })
        }
        if (this.props.videoMovie !== prevProps.videoMovie) {
            this.setState({
                vidMovie: this.props.videoMovie
            })
        }
        if (this.props.creditMovie !== prevProps.creditMovie) {
            this.setState({
                creditMovie: this.props.creditMovie
            })
        }
        if (this.state.widthScreen !== prevState.widthScreen) {
            console.log(this.state.widthScreen);
            this.setState({
                widthScreen: window.innerWidth
            })
        }
    }
    componentDidMount = () => {
        this.props.fetchVideoMovie(this.props.match.params.id, this.props.language)
    }
    rederTrailer = () => {
        let { vidMovie } = this.state;
        let trailer = vidMovie.find(vid => vid.name.toLowerCase().includes("trailer") === true)
        return trailer
    }
    render() {
        const opts = {
            height: this.state.widthScreen * 9 / 21,
            width: this.state.widthScreen,
            playerVars: {
                autoplay: 1,
            },
        };
        let trailer = this.rederTrailer()
        console.log('check state - ', this.state.widthScreen);
        return (
            <>
                <div className='check'>id movie: {this.props.match.params.id}</div>
                <div className='body-watchMovie'>
                    {trailer && trailer.key &&
                        <YouTube
                            videoId={trailer.key}
                            opts={opts}
                        />
                    }
                </div>


                <HomeFooter />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        detailMovie: state.movie.detailsMovie,
        videoMovie: state.movie.videoMovie,
        creditMovie: state.movie.creditMovie,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
        fetchDetailMovie: (id, language) => dispatch(actions.fetchDetailMovie(id, language)),
        fetchVideoMovie: (id, language) => dispatch(actions.fetchVideoMovie(id, language)),
        fetchCreditMovie: (id, language) => dispatch(actions.fetchCreditMovie(id, language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(watchMoviePage));
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './wMoviePage.scss'
import * as actions from "../../store/actions";
import { ApiKey, LANGUAGES } from '../../untils'
import { FormattedMessage } from 'react-intl';
import { Redirect, withRouter } from 'react-router';
import YouTube from 'react-youtube';
import { lang } from 'moment/moment';
class wMoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vidMovie: [],
            detailMovie: {}
        }
    }
    changeLanguage = (language) => {
        //fire redux event : actions
        this.props.changeLanguageAppRedux(language);

    }
    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (this.props.language !== prevProps.language) {
            this.props.fetchDetailMovie(this.props.match.params.id, this.props.language)
            this.props.fetchVideoMovie(this.props.match.params.id, this.props.language)
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
    }
    componentDidMount = () => {
        this.props.fetchVideoMovie(this.props.match.params.id, this.props.language)
        this.props.fetchDetailMovie(this.props.match.params.id, this.props.language)
    }
    rederTrailer = () => {
        let { vidMovie } = this.state;
        let trailer = vidMovie.find(vid => vid.name.includes("Trailer") === true)
        return trailer
    }
    render() {
        const { language } = this.props;
        let { detailMovie } = this.state
        console.log(detailMovie);
        let trailer = this.rederTrailer()
        // console.log(this.state);
        // console.log(language);
        return (
            <>
                <div className='container-wMovie'>
                    Xem movie
                    {detailMovie.original_title}
                    {detailMovie.overview}
                    {trailer && trailer.key &&
                        <YouTube
                            videoId={trailer.key}
                        />
                    }

                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        detailMovie: state.movie.detailsMovie,
        videoMovie: state.movie.videoMovie
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
        fetchDetailMovie: (id, language) => dispatch(actions.fetchDetailMovie(id, language)),
        fetchVideoMovie: (id, language) => dispatch(actions.fetchVideoMovie(id, language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(wMoviePage));
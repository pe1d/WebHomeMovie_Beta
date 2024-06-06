import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ListMain.scss'
import * as actions from "../../../store/actions";
import { ApiKey } from '../../../untils';
import StarRatings from 'react-star-ratings';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { Redirect, withRouter } from 'react-router';
import ContentSlider from '../../../components/contentSlider';
import { getMoviesFromDB } from '../../../services/movieService';
import { set } from 'lodash';
class ListMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            errMessage: '',
            listMovie: [],
            favor: false,
        }
    }
    componentDidMount() {
        this.fetchMovieList()
    }
    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (this.props.language !== prevProps.language) {
            this.fetchMovieList()
        }
    }
    handleClickFavor = () => {
        this.setState({
            favor: !this.state.favor,
        })
    }
    hanldeWatchMovie = (id) => {
        // alert('Movie id: ' + id)
        this.props.history.push(`/watchMovie/${id}`)
    }
    onSearch = () => {

    }
    fetchMovieList = async () => {
        let movie = await getMoviesFromDB('popularity.desc', 1, this.props.language, 2024)
        this.setState({
            listMovie: movie
        })
    }
    render() {
        // console.log("Check state:", this.state);
        let { listMovie, favor } = this.state;
        let { language } = this.props;
        var settings_banner = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 10000,
            dots: false,
        };
        return (
            <>
                <div className='container-list-main'>
                    <div className='header-list-main'>
                        <div className='left'>
                            <div className='header-content active'><FormattedMessage id='main.head.movie' /></div>
                            <div className='header-content'><FormattedMessage id='main.head.tv-series' /></div>
                            <div className='header-content'><FormattedMessage id='main.head.anime' /></div>
                        </div>
                        <div className='header-search'>
                            <i class="fa fa-search"></i>
                            <input type="text" className="form-control form-input" placeholder="Search anything..." />
                            <span className="left-pan"><i class="fa fa-microphone"></i></span>
                        </div>
                    </div>
                    <div className='banner-list-main'>
                        <Slider {...settings_banner}>
                            {listMovie && listMovie.length > 0 &&
                                listMovie.map((item, index) => {
                                    if (index < 3)
                                        return (
                                            <div>
                                                <div className='banner-movie' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` }} key={index}>
                                                    <div className='name-film'>{item.title}</div>
                                                    <div className='vote-average'>
                                                        <StarRatings
                                                            rating={item.vote_average / 2}
                                                            starDimension="36px"
                                                            starSpacing="2px"
                                                            starRatedColor="#07b8a0"
                                                        />
                                                    </div>
                                                    <div className='button-watch'>
                                                        <div className='content-left'>
                                                            <div className='watch-list'>
                                                                <i className="fas fa-plus"></i>
                                                                <FormattedMessage id='main.banner.btn-watchlist' />
                                                            </div>
                                                            <div className='favorites-list' onClick={() => this.handleClickFavor()}>
                                                                {favor === false ?
                                                                    <i class="far fa-heart"></i>
                                                                    :
                                                                    <i class="fas fa-heart"></i>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className='watch' onClick={() => this.hanldeWatchMovie(item.id)}>
                                                            <FormattedMessage id='main.banner.btn-watch' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                })
                            }
                        </Slider>
                    </div>
                    <ContentSlider
                        idName='main.content.popular-movies'
                        typeSort='popularity.desc'
                        page='1'
                        year='2024'
                        hanldeWatchMovie={this.hanldeWatchMovie}
                    />
                    <ContentSlider
                        idName='main.content.toprated-movies'
                        typeSort='vote_average.desc'
                        page='1'
                        year='2024'
                        hanldeWatchMovie={this.hanldeWatchMovie}
                    />
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        movieList: state.movie.movieList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        fetchMovie: (typeSort, page, language, year) => dispatch(actions.fetchMovie(typeSort, page, language, year)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListMain));
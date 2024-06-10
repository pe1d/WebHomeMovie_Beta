import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './wMoviePage.scss'
import * as actions from "../../store/actions";
import StarRatings from 'react-star-ratings';
import HomeFooter from '../HomePage/HomeFooter'
import { ApiKey, LANGUAGES } from '../../untils'
import { FormattedMessage } from 'react-intl';
import { Redirect, withRouter } from 'react-router';
import YouTube from 'react-youtube';
import Slider from 'react-slick';
import moment from 'moment/moment';
class wMoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vidMovie: [],
            detailMovie: {},
            creditMovie: [],
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
    }
    componentDidMount = () => {
        this.props.fetchVideoMovie(this.props.match.params.id, this.props.language)
        this.props.fetchDetailMovie(this.props.match.params.id, this.props.language)
        this.props.fetchCreditMovie(this.props.match.params.id, this.props.language)
    }
    rederTrailer = () => {
        let { vidMovie } = this.state;
        let trailer = vidMovie.find(vid => vid.name.includes("Trailer") === true)
        return trailer
    }
    searchCredit = (role) => {
        let { creditMovie } = this.state
        let director = ''
        if (creditMovie && creditMovie.crew && creditMovie.crew.length > 0) {
            director = creditMovie.crew.find((e) => {
                return e.department === role
            })
            // console.log('dao dien', director.name);
        }
        return director.name
    }
    render() {
        let settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                }
            ]
        };
        const { language } = this.props;
        let { detailMovie, creditMovie } = this.state
        console.log(detailMovie);
        console.log(creditMovie);
        let trailer = this.rederTrailer()
        let year = new Date(detailMovie.release_date)
        let timeHour = moment().startOf('day').add(detailMovie.runtime, 'minutes').format(`hh`);
        let timeMinute = moment().startOf('day').add(detailMovie.runtime, 'minutes').format(`mm`);
        let rating = detailMovie.vote_average / 2;
        return (
            <>
                <div className='container-dMovie' >
                    <div className='banner-dMovie' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${detailMovie.backdrop_path})` }}> </div>
                    <div className='section-dMovie'>
                        <div className='container sectionMovie'>
                            {/* Xem movie
                            {detailMovie.original_title}
                            {detailMovie.overview}
                            {trailer && trailer.key &&
                                <YouTube
                                    videoId={trailer.key}
                                />
                            } */}
                            <div className='columm-1-4'>
                                <div className='poster-movie' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${detailMovie.poster_path})` }}></div>
                                <div className='btn-watch'><i className="fas fa-play"></i> watch</div>
                            </div>
                            <div className='column-3-4'>
                                <div className='original-title'><h1>{detailMovie.original_title}</h1></div>
                                <div className='sub-title'>{detailMovie.title} (<a href='#'>{year.getFullYear()}</a>)</div>
                                <div className='runtime-movie'>{timeHour} giờ {timeMinute} phút</div>
                                <div className='imdb-movie'>
                                    {rating && rating &&
                                        <StarRatings
                                            rating={rating}
                                            starDimension="30px"
                                            starSpacing="2px"
                                            starRatedColor="#07b8a0"
                                        />
                                    }
                                </div>
                                <div className='level-genres'>
                                    <div className='btn-list'>
                                        <div className='btn-share'><i className="fab fa-facebook-square"></i> Share</div>
                                        <div className='btn-addList'><i className="fas fa-plus"></i> Watch list</div>
                                    </div>
                                    <div className='list-genres'>
                                        {detailMovie && detailMovie.genres && detailMovie.genres.length > 0 &&
                                            detailMovie.genres.map((item, index) => {
                                                return (
                                                    <div className='item-genres'>{item.name}</div>
                                                )
                                            })

                                        }

                                    </div>
                                </div>
                                <dl className='info-movie'>
                                    <dt>Đạo diễn</dt>
                                    <dd className='csv'>
                                        <a href='#'>{this.searchCredit("Directing")}</a>
                                    </dd>
                                    <dt>Kịch bản</dt>
                                    <dd className='csv'>
                                        <a href='#'>{this.searchCredit("Directing")}</a>
                                    </dd>
                                    <dt>Quốc gia</dt>
                                    <dd className='csv'>
                                        <a href='#'>{detailMovie.origin_country}</a>
                                    </dd>
                                    <dt>Khởi chiếu</dt>
                                    <dd className='csv'>
                                        <a href='#'>{detailMovie.release_date}</a>
                                    </dd>
                                </dl>
                                <div className='overview'>
                                    {detailMovie.overview}
                                </div>
                                <div className='actor'>
                                    <div className='title-actor'>Diễn viên</div>
                                    <div className='cast'>
                                        <Slider {...settings}>
                                            {creditMovie && creditMovie.cast && creditMovie.cast.length > 0 &&
                                                creditMovie.cast.map((item, index) => {
                                                    if (index < 20) {
                                                        return (
                                                            <div className='container-list-actor'>
                                                                <div className='img-actor'
                                                                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.profile_path})` }} key={index}>
                                                                </div>
                                                                <div className='name-actor'>
                                                                    <a href='#'>{item.name}</a>
                                                                </div>
                                                                <div className='name-character'>
                                                                    {item.character}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(wMoviePage));
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './cslTopRated.scss'
import * as actions from "../../../../store/actions";
import StarRatings from 'react-star-ratings';
import { LANGUAGES } from '../../../../untils';
import { getMoviesFromDB } from '../../../../services/movieService';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
class cslTopRated extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTopRatedMovie: [

            ],
            position: 1,
            value: {
                start: "00:00",
                end: "23:59"
            }
        }
    }
    componentDidMount() {
        this.fetchMovieList();
    }
    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (this.props.language !== prevProps.language) {
            this.fetchMovieList()
        }
    }
    handleNext = () => {
        this.setState({
            position: this.state.position + 1
        })
    }
    handlePrev = () => {
        this.setState({
            position: this.state.position - 1
        })
    }
    fetchMovieList = async () => {
        let movieList = await getMoviesFromDB(this.props.typeSort, this.props.page, this.props.language, this.props.year);
        this.setState({
            dataTopRatedMovie: movieList
        })
        // console.log('Check db', movieList);
    }
    render() {
        let { dataTopRatedMovie, position } = this.state;
        console.log(dataTopRatedMovie);
        return (
            <>
                <div className='csl-top-rated'>
                    <div className='title-body'>
                        <div className='p1'>
                            <FormattedMessage id='sider-watch.top-rated' />
                            <i
                                class={position && position === 1 ?
                                    "fas fa-chevron-left disable"
                                    :
                                    "fas fa-chevron-left "
                                }
                                onClick={() => this.handlePrev()}
                            >
                            </i>
                            <i class={position && position * 2 - dataTopRatedMovie.length === 0 ?
                                "fas fa-chevron-right disable"
                                :
                                "fas fa-chevron-right "
                            }
                                onClick={() => this.handleNext()}
                            >
                            </i>
                        </div>
                        <div className='p2'>
                            <FormattedMessage id='sider-watch.see-more' />
                            <i className="far fa-eye"></i>
                        </div>
                    </div>
                    <div className='cont-detail' style={{ left: `${-200 * position + 200}px` }}>
                        {dataTopRatedMovie && dataTopRatedMovie.length > 0 &&
                            dataTopRatedMovie.map((item, index) => {
                                let i = 200 * (index - (position - 1)) + 65;
                                let time = {
                                    start: "00:00",
                                    end: item.timeCont
                                }
                                if (index < 10) {
                                    return (
                                        <>
                                            <div className='details-m-cont' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` }}>
                                                <div className='title-m'>
                                                    <div className='name-movie'>
                                                        {item.title}
                                                    </div>
                                                    <StarRatings
                                                        rating={5}
                                                        starDimension="16px"
                                                        starSpacing="2px"
                                                        starRatedColor="#07b8a0"
                                                    />
                                                </div>
                                                <div className='btn-list'>
                                                    <div className='btn-drop'><i className="fas fa-plus"></i></div>
                                                    <div className='btn-watch' onClick={() => this.props.hanldeWatchMovie(item.id)}><FormattedMessage id='sider-watch.watch' /></div>
                                                </div>
                                            </div >
                                        </>
                                    )
                                }
                            })
                        }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(cslTopRated));
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './cslGenres.scss'
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../untils';
import { FormattedMessage } from 'react-intl';
class cslGenres extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataGenres: [],
            position: 1,
        }
    }
    componentDidMount() {
        this.props.fetchGenresMovie(this.props.language);
    }
    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (this.props.language !== prevProps.language) {
            this.props.fetchGenresMovie(this.props.language)
        }
        if (this.props.genresMovie !== prevProps.genresMovie) {
            this.setState({
                dataGenres: this.props.genresMovie.genres
            })
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
    render() {
        let { dataGenres, position } = this.state;
        let data2 = dataGenres.slice(9, 17);
        console.log(data2);
        return (
            <>
                <div className='csl-genres'>
                    <div className='title-body'>
                        <div className='p1'>
                            <FormattedMessage id='sider-watch.genres' />
                            <i
                                class={position && position === 1 ?
                                    "fas fa-chevron-left disable"
                                    :
                                    "fas fa-chevron-left "
                                }
                                onClick={() => this.handlePrev()}
                            >
                            </i>
                            <i class={position && position - 9 === 0 ?
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
                    <div className='genres-detail' style={{ top: '40px', left: `${-200 * position + 200}px` }}>
                        {dataGenres && dataGenres.length > 0 &&
                            dataGenres.slice(0, 9).map((item, index) => {
                                return (
                                    <>
                                        <div className='details-genres' style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/original/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg)' }}>
                                            <div className='name-genres'>
                                                {item.name}
                                            </div>
                                        </div >
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className='genres-detail' style={{ top: '170px', left: `${-200 * position + 200}px` }}>
                        {dataGenres && dataGenres.length > 0 &&
                            dataGenres.slice(10, 18).map((item, index) => {
                                return (
                                    <>
                                        <div className='details-genres' style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/original/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg)' }}>
                                            <div className='name-genres'>
                                                {item.name}
                                            </div>
                                        </div >
                                    </>
                                )
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
        language: state.app.language,
        genresMovie: state.movie.genresMovie
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
        fetchGenresMovie: (language) => dispatch(actions.fetchGenresMovie(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(cslGenres);
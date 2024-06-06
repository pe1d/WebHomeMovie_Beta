import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './cslCont.scss'
import * as actions from "../../../../store/actions";
import TimeRangeSlider from 'react-time-range-slider';
import { LANGUAGES } from '../../../../untils';
import { FormattedMessage } from 'react-intl';
class cslCont extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataContMovie: [
                { id: 1, nMovie: "Hành tinh cát: Phần 2", timeCont: "01:23", tMovie: "02:34" },
                { id: 2, nMovie: "abc 2", timeCont: "01:23", tMovie: "01:54" },
                { id: 3, nMovie: "abc 3", timeCont: "01:23", tMovie: "02:04" }
            ],
            position: 1,
            value: {
                start: "00:00",
                end: "23:59"
            }
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
        let { dataContMovie, position } = this.state;
        return (
            <>
                <div className='csl-cont'>
                    <div className='title-body'>
                        <div className='p1'>
                            <FormattedMessage id='sider-watch.continue' />
                            <i
                                class={position && position === 1 ?
                                    "fas fa-chevron-left disable"
                                    :
                                    "fas fa-chevron-left "
                                }
                                onClick={() => this.handlePrev()}
                            >
                            </i>
                            <i class={position && position - dataContMovie.length === 0 ?
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
                            <i class="far fa-eye"></i>
                        </div>
                    </div>
                    <div className='cont-detail' style={{ left: `${-200 * position + 200}px` }}>
                        {dataContMovie && dataContMovie.length > 0 &&
                            dataContMovie.map((item, index) => {
                                let time = {
                                    start: "00:00",
                                    end: item.timeCont
                                }
                                if (index < 10) {
                                    return (
                                        <>
                                            <div className='details-m-cont' >
                                                <div className='title-m'>
                                                    <div className='img-movie'
                                                        style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/w500/8QdnKQyZDlN6rBSrfU1V5PctfUu.jpg)' }}
                                                    >
                                                    </div>
                                                    <div className='name-movie'>
                                                        <div className='name'>
                                                            {item.nMovie}
                                                        </div>
                                                        <TimeRangeSlider
                                                            disabled={false}
                                                            maxValue={item.tMovie}
                                                            minValue={"00:00"}
                                                            step={15}
                                                            value={time}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='btn-list'>
                                                    <div className='btn-drop'><FormattedMessage id='sider-watch.drop' /></div>
                                                    <div className='btn-watch'><FormattedMessage id='sider-watch.watch' /></div>
                                                </div>

                                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(cslCont);
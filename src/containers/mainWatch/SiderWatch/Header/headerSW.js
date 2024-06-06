import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './headerSW.scss'
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../untils';
class headerSW extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            avatar: '',
            noticeBox: false,
            noticeList: [
                { id: '1', title: 'notice 1', date: 1716722226, status: 'N' },
                { id: '2', title: 'notice 2', date: 1716376619, status: 'O' },
                { id: '3', title: 'notice 3', date: 1708600619, status: 'N' }
            ],
        }
    }
    handleViewNoti = () => {
        this.setState({
            notice: null,
            noticeBox: !this.state.noticeBox,
        })
    }
    handleClickONnotice = (noti) => {
        console.log(noti);
        let { noticeList } = this.state
        noticeList.map((item) => {
            if (item.id == noti.id && noti.status == 'N') {
                item.status = 'O';
            }
            return item;
        })
        // console.log(noticeList);
    }
    handleDeleteNotice = (noti) => {
        let { noticeList } = this.state
        let newNoti = noticeList.filter((item) => {
            return item.id !== noti.id;
        })
        // console.log('new noti after deleted', newNoti);
        this.setState({
            noticeList: newNoti
        })
    }
    render() {
        let { noticeBox, noticeList } = this.state
        return (
            <>
                <div typeof='button' className='btn-noti' onClick={() => this.handleViewNoti()} >
                    {noticeList && noticeList.length > 0 &&
                        noticeList.map((item, index) => {
                            let allNotice = noticeList.filter((e) => {
                                return e.status == 'N'
                            }).length;
                            if (allNotice == 0) {
                                return
                            }
                            return (
                                < div class="btn-badge pulse-button">{allNotice}</div>
                            )
                        })

                    }
                    <i className="fas fa-bell"></i>
                    {noticeBox && noticeBox === true &&
                        <div class="box">
                            <div class="display">
                                <div class="nothing">
                                    <i class="fas fa-child stick"></i>
                                    <div class="cent">Looks Like your all caught up!</div>
                                </div>
                                <div class="cont">
                                    {noticeList && noticeList.length > 0 &&
                                        noticeList.map((item, index) => {
                                            return (
                                                <div class="sec" key={index} onClick={() => this.handleClickONnotice(item)}>
                                                    <div className='delete-noti' onClick={() => this.handleDeleteNotice(item)}>x</div>
                                                    <div className='profile'></div>
                                                    <div class="profCont">
                                                        <div class="txt">{item.title}</div>
                                                        <div class="txt sub">{new Date(item.date * 1000).toLocaleString()}</div>
                                                    </div>
                                                    {item.status && item.status === 'N' &&
                                                        <div className='new'>
                                                            <i class="fas fa-circle"></i>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className='user'>
                    <div className='name'>Xuan Diep</div>
                    <div className='more-info'><i class="fas fa-caret-down"></i></div>
                    <div className='logo' style={{ backgroundImage: `url(${this.state.avatar})` }}>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(headerSW);
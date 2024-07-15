import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createPortal } from 'react-dom';
import './headerSW.scss'
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../untils';
import ReactModal from 'react-modal';
import Scrollbars from 'react-custom-scrollbars';
class headerSW extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            avatar: '',
            noticeList: [
                { id: '1', title: 'notice 1', date: 1716722226, status: 'N' },
                { id: '2', title: 'notice 2', date: 1716376619, status: 'O' },
                { id: '3', title: 'notice 3', date: 1708600619, status: 'N' },
                { id: '4', title: 'notice 4', date: 1716376619, status: 'N' },
                { id: '5', title: 'notice 5', date: 1708600619, status: 'N' },
                { id: '6', title: 'notice 6', date: 1716376619, status: 'O' },
                { id: '7', title: 'notice 7', date: 1708600619, status: 'N' }
            ],
            showModal: false
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    handleOpenModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    }
    handleClickONnotice = (noti) => {
        console.log('why');
        let { noticeList } = this.state
        let newNotice = noticeList.map((item) => {
            if (item.id == noti.id && noti.status == 'N') {
                item.status = 'O';
            }
            return item;
        })
        this.setState({
            noticeList: newNotice
        })
    }
    handleDeleteNotice = (noti) => {
        let { noticeList } = this.state
        console.log('check noti: ', noti);
        let newNoti = noticeList.filter((item) => {
            console.log('check item', item);
            return item.id !== noti.id;
        })
        console.log('check new noti', newNoti);
        this.setState({
            noticeList: newNoti
        }, () => {
            console.log('check state: ', this.state);
        })
    }
    render() {
        let { noticeList, showModal } = this.state
        return (
            <>
                <div typeof='button' className='btn-noti' onClick={() => this.handleOpenModal()} >
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
                    <i className="fas fa-bell" ></i>
                </div>
                <div className='user'>
                    <div className='name'>Xuan Diep</div>
                    <div className='more-info'><i class="fas fa-caret-down"></i></div>
                    <div className='logo' style={{ backgroundImage: `url(${this.state.avatar})` }}>
                    </div>
                </div>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="noti-box"
                    onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={true}
                    className="Modal-1"
                    overlayClassName="Overlay-1"
                >

                    <div className='box-noti'>
                        <Scrollbars style={{ height: '100%', width: '100%' }}>
                            {noticeList && noticeList.length > 0 &&
                                noticeList.map((item, index) => {
                                    return (
                                        <div class="sec" key={index} >
                                            <div className='delete-noti' onClick={() => this.handleDeleteNotice(item)} >
                                                <i className="far fa-times-circle"></i>
                                            </div>
                                            <div className='profile'></div>
                                            <div class="profCont">
                                                <div class="txt">{item.title}</div>
                                                <div class="txt sub">{new Date(item.date * 1000).toLocaleString()}</div>
                                            </div>
                                            {item.status && item.status === 'N' &&
                                                <div className='new' onClick={() => this.handleClickONnotice(item)}>
                                                    <i class="fas fa-circle"></i>
                                                </div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </Scrollbars>
                    </div>

                </ReactModal>
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
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './Main.scss'
import * as actions from "../../../store/actions";
import SiderInfo from '../SiderInfo/SiderInfo';
import ListMain from '../ListMain/ListMain';
import SiderWatch from '../SiderWatch/SiderWatch';
import { Scrollbars } from 'react-custom-scrollbars';
import WMoviePage from '../../Movie/wMoviePage';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watch: true,
        }
    }
    render() {
        let { watch } = this.state
        return (
            <>
                <div className='container-main'>
                    <div className='sider1 bg-sider'>
                        <Scrollbars
                            style={{ width: '100vh', width: '100%' }}
                            autoHide='true'
                        >

                            <SiderInfo />
                        </Scrollbars>
                    </div>
                    <div className='content-main bg-main '>
                        <Scrollbars
                            style={{ height: '100vh', width: '100%' }}
                            autoHide='true'
                        >
                            {/* <ListMain /> */}
                            <WMoviePage />
                        </Scrollbars>
                    </div>
                    <div className='sider2 bg-sider'>
                        <Scrollbars style={{ height: '100vh', width: '100%' }}>
                            <SiderWatch />
                        </Scrollbars>
                    </div>
                </div >
            </>
        )
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
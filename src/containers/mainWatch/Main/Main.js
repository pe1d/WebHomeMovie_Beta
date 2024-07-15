import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './Main.scss'
import * as actions from "../../../store/actions";
import SideInfo from '../SideInfo/SideInfo';
import ListMain from '../ListMain/ListMain';
import SideWatch from '../SideWatch/SideWatch';
import { Scrollbars } from 'react-custom-scrollbars';
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
                    <div className='side1 bg-side'>
                        <Scrollbars
                            style={{ width: '100vh', width: '100%' }}
                            autoHide='true'
                        >
                            <SideInfo />
                        </Scrollbars>
                    </div>
                    <div className='content-main bg-main '>
                        <Scrollbars
                            style={{ height: '100vh', width: '100%' }}
                            autoHide='true'
                        >
                            <ListMain />
                        </Scrollbars>
                    </div>
                    <div className='side2 bg-side'>
                        <Scrollbars style={{ height: '100vh', width: '100%' }}>
                            <SideWatch />
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
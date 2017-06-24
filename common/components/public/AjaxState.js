/**
 * @file ajaxState 全局提示
 * @author fio
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {resetAjaxState} from '../../actions';
import {Modal, Button} from 'antd';
import Interval from '../block/Interval';

function mapDispatchToProps(dispatch) {
    return {
        resetAjaxState() {
            dispatch(resetAjaxState());
        }
    };
}

class AjaxState extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleOk() {
        this.props.resetAjaxState();
        // this.context.router.push('/');
    }

    handleJump() {
        window.location.href = '/iot/#/iot/order/create~free';
    }

    render() {
        const {ajaxFail, ajaxFailedMessage} = this.props;
        const hint = (ajaxFailedMessage && ajaxFailedMessage.code) ? ajaxFailedMessage.message : '未知错误';
        if (ajaxFailedMessage.code === 'NoOrder') {
            Modal.warning({
                title: '系统提示',
                content: <p>目前，通过物管理发送的消息，仍占用物接入的消息额度，请先创建订单。每个月前一百万条免费。<Interval sencond={16} callback={::this.handleJump} />s后自动跳转</p>,
                onOk: () => this.handleJump(),
                okText: '跳转'
            });
        }
        else if (ajaxFail) {
            Modal.error({
                title: '系统提示',
                content: hint,
                onOk: () => this.handleOk()
            });
        }
        return (
      <div>
      </div>
    );
    }
}

AjaxState.contextTypes = {
    router: React.PropTypes.any
};

export default connect(state => state.appState, mapDispatchToProps)(AjaxState);

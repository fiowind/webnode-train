/**
 * @file 气泡卡片
 * @author lidandan(lidandan03@baidu.com)
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import {Icon} from 'antd';

import * as styles from './toolTip.css';

export default class toolTip extends Component {
    constructor(props) {
        super();
        this.state = {
            hidden: false
        };
    }

    close(e) {
        this.setState({
            hidden: true
        });
    }

    render() {
        return (
          <div>
            {this.state.hidden
            ? null
            : <div className={styles.tag}>
                <div className={styles.content}>
                  <a href="/iotdm/#/iotdm">点击返回旧版本</a>
                  <Icon type="close" className={`icon-close ${styles.detlete}`}
                        style={{fontSize: 18}}
                        onClick={e => this.close(e)} />
                </div>
              </div>}
          </div>
        );
    }
}

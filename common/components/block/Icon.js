/**
 * @file Icon
 * Created by fio 2017/4/26
 */

import React, {Component} from 'react';

import * as styles from './icon.css';


export default class LineLoading extends Component {

    render() {
        return <i className={`icon-${this.props.type} ${styles.icon}`}></i>;
    }
}

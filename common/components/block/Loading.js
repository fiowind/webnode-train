/**
 * @file 横条加载
 * Created by fio 2017/4/26
 */

import React, {Component} from 'react';
import {Link} from 'react-router';

import * as styles from './loading.css';


export default class LineLoading extends Component {

    render() {
        return (
          <div className={styles.loadingCeter}>
            <div className={styles.loadingCenterAbsolute}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        );
    }
}

/**
 * @file slide
 * Created by fio 2017/6/23
 */
import React from 'react';
import {Link} from 'react-router';

import * as styles from './category.css';

export default class Category extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        const data = this.props.data;
        return (
        <div className={styles.category}>
            <div className={styles.daohang}>
              <Link to='/'>首页</Link>
              <span className="icon-back"></span>
              <span>{data.name}</span>
            </div>
            <div className={styles.leibie}>
                <ul>
                    <li>类别<span className={`${styles.icon} icon-down2`}></span></li>
                    <li>区域<span className={`${styles.icon} icon-down2`}></span></li>
                    <li>排序<span className={`${styles.icon} icon-down2`}></span></li>
                </ul>
            </div>
        </div>);
    }
}


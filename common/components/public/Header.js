/**
 * @file header
 * Created by fio 2017/4/23
 */
import React from 'react';
import * as styles from './header.css';

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            location: '上海'
        };
    }

    render() {
        return (
        <div className={styles.header}>
            <span className={styles.title}>去哪儿学</span>
            <span className={styles.location}>{this.state.location}</span>
            <span className={`icon-search ${styles.icon}`}></span>
        </div>);
    }
}


/**
 * @file header
 * Created by fio 2017/4/23
 */
import React from 'react';
import {Link} from 'react-router';

import * as styles from './navigation.css';
import {navList} from '../../constants/viewData';

export default class Navigation extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
        <div className={styles.nav}>
        {navList.map((item, index) =>
          <div key={index} className={styles.navItem}>
              <Link to={`/list/${item.link}`}>
                  <span style={{background: `${item.color}`}} className={`icon-${item.icon} ${styles.icon}`}></span>
                  <p>{item.name}</p>
              </Link>
          </div>
        )}
        </div>);
    }
}


/**
 * @file header
 * Created by fio 2017/4/23
 */
import React from 'react';
import {Link} from 'react-router';

import * as styles from './item.css';

export default class Item extends React.Component {

    render() {
        const item = this.props.item;
        return (
          <Link to={`/detail/${item.pid}`}>
            <li className={styles.item}>
              <img src={item.img} alt=""/>
              <div className={styles.content}>
                <p>{item.title}</p>
                <p className={styles.score}>综合评分：{item.score}</p>
              </div>
              <button>查看详情</button>
            </li>
          </Link>);
    }
}


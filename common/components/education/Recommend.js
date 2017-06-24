/**
 * @file header
 * Created by fio
 */
import React from 'react';

import * as styles from './recommend.css';
import {navList} from '../../constants/viewData';

export default class Recommend extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        const data = this.props.recommend;
        return (
        <div className={styles.recommend}>
          <div className={styles.top}>{data.name}</div>
          <ul>
            {data.list.map((item, index) =>
              <li key={index} className={styles.item}>
                <img src={item.img} alt=""/>
                <div className={styles.content}>
                  <p>{item.title}</p>
                  <p className={styles.score}>综合评分：{item.score}</p>
                </div>
                <button>查看详情</button>
              </li>
            )}
          </ul>
        </div>);
    }
}


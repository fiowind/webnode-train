/**
 * @file header
 * Created by fio
 */
import React from 'react';

import * as styles from './recommend.css';
import {navList} from '../../constants/viewData';
import Item from '../public/Item';

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
              <Item item={item} key={index}/>
            )}
          </ul>
        </div>);
    }
}


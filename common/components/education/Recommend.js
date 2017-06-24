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
        const data = props.recommend;
        return (
        <div className={styles.recommend}>
          <div>{data.name}</div>
          {data.list.map((item, index) =>
            <div key={index}>

            </div>
          )}
        </div>);
    }
}


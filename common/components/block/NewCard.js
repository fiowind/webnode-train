/**
 * @file 添加卡片
 * Created by fio 2017/4/26
 */

import React, {Component} from 'react';
import {Link} from 'react-router';

import * as styles from './newcard.css';


export default class NewCard extends Component {

    render() {
        return (
          <div>
            <div className={styles.card}>
              <span className='icon-add'></span>
              <p>{this.props.text}</p>
            </div>
          </div>
        );
    }
}

NewCard.propTypes = {
    text: React.PropTypes.string
};

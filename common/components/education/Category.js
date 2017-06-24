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
            category: false,
            location: false,
            order: false,
            query: {}
        };
    }

    expandCategory() {
        this.setState({category: true});
    }

    expandLocation() {
        this.setState({location: true});
    }

    expandOrder() {

    }

    addCategory(e, name, id) {
        e.stopPropagation();
        let query = this.state.query;
        query.category = id;
        this.setState({
            category:false,
            categoryKey: name
        });
        this.props.update(query);
    }

    addLocation(e, name, id) {
      e.stopPropagation();
      let query = this.state.query;
      query.location = id;
      this.setState({
          location:false,
          locationKey: name
      });
      this.props.update(query);
    }

    render() {
        const data = this.props.data;
        // console.log(this.state.category);
        return (
        <div className={styles.category}>
          <div className={styles.daohang}>
            <Link to='/'>首页</Link>
            <span className="icon-back"></span>
            <span>{data.name}</span>
          </div>
          <div className={styles.leibie}>
            <ul>
              <li onClick={::this.expandCategory}>
                {this.state.categoryKey || '类别'}
                <span className={`${styles.icon} icon-down2`}></span>
                {this.state.category ?
                <div className={styles.detail}>
                  <ul>
                    {data.category.map((item, index) =>
                    <li key={index} onClick={e => this.addCategory(e, item.name, item.id)}>{item.name}</li>
                    )}
                  </ul>
                </div> : null}
              </li>
              <li onClick={::this.expandLocation}>
                {this.state.locationKey || '区域'}<span className={`${styles.icon} icon-down2`}></span>
                {this.state.location ?
                <div className={styles.detail}>
                  <ul>
                    {data.location.map((item, index) =>
                    <li key={index} onClick={e => this.addLocation(e, item.name, item.code)}>{item.name}</li>
                    )}
                  </ul>
                </div> : null}
              </li>
              <li onClick={::this.expandOrder}>排序<span className={`${styles.icon} icon-down2`}></span>
                {this.state.order ?
                <div className={styles.detail}>
                  <ul>
                    <li>评分</li>
                    <li>热度</li>
                    <li>时间</li>
                  </ul>
                </div> : null}
              </li>
            </ul>
          </div>
        </div>);
    }
}


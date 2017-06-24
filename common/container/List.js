/**
 * @file home
 * @author fio
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as styles from './list.css';
import {getListData, getListCategory, leavePage} from '../actions';
import Loading from '../components/block/Loading';
import Item from '../components/public/Item';
import Category from '../components/education/Category';
import {searchToQuery} from '../utils/localUtils'

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadover: true
        };
    }

    componentDidMount() {
        const cid = this.props.params.cid;
        const query = searchToQuery(window.location.search);
        if (!this.props.loadover) {
            this.props.getListData(cid, query);
            this.props.getListCategory(cid);
        }
    }

    componentWillUnmount() {
        document.body.scrollTop = 0;
        this.props.leavePage();
    }

    render() {
        const props = this.props;
        const content = props.loadover ?
                    <div className={styles.container}>
                      <Category data={props.category}/>
                      <div className={styles.list}>
                          {props.data.map((item, index) =>
                            <Item item={item} key={index}/>
                          )}
                      </div>
                    </div>: <Loading />
        return (
          <div>
          {content}
          </div>
        );
    }
}

List.defaultProps = {
};

List.dataRequired = [
    getListData,
    getListCategory
];

function mapStateToProps(state) {
    const {list, category} = state;
    return {
        data: list.data,
        category: category.data,
        loadover: list.loadover && category.loadover
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getListData(cid, query) {
            dispatch(getListData({cid, query}))
        },
        getListCategory(cid) {
            dispatch(getListCategory({cid}))
        },
        leavePage() {
            dispatch(leavePage());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);

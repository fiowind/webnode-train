/**
 * @file home
 * @author fio
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as styles from './list.css';
import {getListData, getListCategory, leavePage, deleteList} from '../actions';
import {getList} from '../api';
import SmallLoading from '../components/block/SmallLoading';
import Loading from '../components/block/Loading';
import Item from '../components/public/Item';
import Category from '../components/education/Category';
import {searchToQuery} from '../utils/localUtils'

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadover: true,
            pageNo: 1,
            list: [],
            loading: false
        };
    }

    componentDidMount() {
        const cid = this.props.params.cid;
        const query = searchToQuery(window.location.search);
        if (!this.props.loadover) {
            this.props.getListData(cid, query);
            this.props.getListCategory(cid);
        }
        this.addScroll();
    }

    // componentWillReceiveProps(nextProps) {
    //     // console.log(nextProps);
    //     if (nextProps.data.length === 25) {
    //         this.addScroll();
    //     }
    // }

    componentWillUnmount() {
        document.body.scrollTop = 0;
        this.props.leavePage();
    }

    addScroll() {
        window.onscroll = null;
        window.onscroll = () => {
            const windowHeight = (document.body || document.documentElement).scrollHeight;
            if (document.body.scrollTop + window.innerHeight + 150 > windowHeight) {
                if (this.props.data && !this.state.loading) {
                    this.setState({loading: true});
                    const cid = this.props.params.cid;
                    const query = this.state.query || searchToQuery(window.location.search);
                    query.pageNo = this.state.pageNo + 1;
                    getList(cid, query).then(data => {
                        let array = [];
                        const newitems = this.state.list;
                        array = newitems.concat(data);
                        setTimeout(() => {
                            this.setState({
                                loading: false,
                                list: array,
                                pageNo: query.pageNo
                            });
                        }, 500);
                        if (data.length === 0) {
                            window.onscroll = null;
                            return;
                        }
                    });
                }
            }
        };
    }

    update(addQuery) {
        this.props.deleteList();
        document.body.scrollTop = 0;
        const cid = this.props.params.cid;
        let query = searchToQuery(window.location.search);
        query = Object.assign({}, query, addQuery);
        this.setState({list: [], pageNo: 1, query});
        this.props.getListData(cid, query);
    }

    render() {
        const props = this.props;
        const list = this.state.list.length > 0 ? this.state.list : props.data;
        const content = props.loadover ?
                    <div className={styles.container}>
                      <Category data={props.category} update={query => this.update(query)}/>
                      <div className={styles.list}>
                          {list.map((item, index) =>
                            <Item item={item} key={index}/>
                          )}
                          {this.state.loading ? <SmallLoading /> : null}
                          {this.props.load2 ? <SmallLoading /> : null}
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
        loadover: list.loadover && category.loadover,
        load2: list.load2
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
        },
        deleteList() {
            dispatch(deleteList());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);

/**
 * @file home
 * @author fio
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as styles from './main.css';
import {getHomeData} from '../actions';
import Loading from '../components/block/Loading';
import Navigation from '../components/education/Navigation'
import Slide from '../components/education/Slide'
import Recommend from '../components/education/Recommend'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadover: true
        };
    }

    componentDidMount() {
        if (!this.props.loadover) {
            this.props.getHomeData();
        }
    }

    componentWillUnmount() {
        document.body.scrollTop = 0;
    }

    render() {
        const props = this.props;
        console.log(props);
        const content = props.loadover ?
                    <div className={styles.container}>
                      <Navigation />
                      <Slide items={props.data.slide}/>
                      {props.data.recommend.map((item, index) =>
                        <Recommend recommend={item} key={index}/>
                      )}
                    </div>: <Loading />
        return (
          <div>
          {content}
          </div>
        );
    }
}

Home.defaultProps = {
};

Home.dataRequired = [
    getHomeData
];

function mapStateToProps(state) {
    const recommend = state.recommend;
    return {
        data: recommend.data,
        loadover: recommend.loadover
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getHomeData() {
            dispatch(getHomeData({}))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

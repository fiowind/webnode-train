/**
 * @file home
 * @author fio
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as styles from './main.css';
import {leavePage} from '../actions';
import Loading from '../components/block/Loading';


class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadover: true
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        document.body.scrollTop = 0;
        this.props.leavePage();
    }

    render() {
        const props = this.props;
        const content = props.loadover ?
                    <div className={styles.container}>
                      developing...
                    </div>: <Loading />
        return (
          <div>
          {content}
          </div>
        );
    }
}

Detail.defaultProps = {
};

Detail.dataRequired = [
];

function mapStateToProps(state) {
    const {list, category} = state;
    return {
        // data: list.data,
        // category: category.data,
        loadover: true
    };
}

function mapDispatchToProps(dispatch) {
    return {
        leavePage() {
            dispatch(leavePage());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);

/**
 * @file 倒数计时
 * Created by fio
 */

import React, {Component} from 'react';


export default class Interval extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sencond: props.sencond
        };
    }

    componentDidMount() {
        const sh = setInterval(() => {
            const sencond = this.state.sencond - 1;
            if (sencond <= 0) {
                clearInterval(sh);
                this.props.callback();
            }
            else {
                this.setState({sencond});
            }
        }, 1000);
    }

    render() {
        return (
          <span>{this.state.sencond}</span>
        );
    }
}

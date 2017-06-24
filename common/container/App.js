/**
 * @file home
 * @author fio
 */

import React, {Component} from 'react';

import Header from '../components/public/Header';

export default class App extends Component {

    render() {
        return (
          <div>
            <Header />
            {this.props.children}
          </div>
        );
    }
}

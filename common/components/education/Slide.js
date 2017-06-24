/**
 * @file slide
 * Created by fio 2017/6/23
 */
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import * as styles from './slide.css';
import {navList} from '../../constants/viewData';

export default class Slide extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        const settings = {
            infinite: true,
            speed: 500,
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
        <div className={styles.nav}>
            <Slider {...settings}>
                {this.props.items.map((item, index) =>
                <div key={index}><a href={item.link}></a><img src={item.imgUrl} alt=""/></div>
                )}
            </Slider>
        </div>);
    }
}


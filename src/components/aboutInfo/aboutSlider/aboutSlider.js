import React, { useEffect } from 'react';
import SwiperCore, { Autoplay, Keyboard, Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import './about-slider.scss';

import image from './img/about-img.jpg';
import icons from '../../../icons/icons.svg'; 

SwiperCore.use([Navigation, Pagination, Keyboard, Autoplay]);

const aboutImgs = [
    {
        id: 1,
        src: image,
        name: 'name',
    },
    {
        id: 2,
        src: image,
        name: 'name',
    },
    {
        id: 3,
        src: image,
        name: 'name',
    },
    {
        id: 4,
        src: image,
        name: 'name',
    },
];

const AboutSlider = () => {
    useEffect(() => {
        const slider = document.querySelector('.about-slider');
        const pagination = slider.querySelector('.swiper-pagination');
        const paginationBullet = slider.querySelectorAll('.swiper-pagination-bullet');

        pagination.classList.add('about-slider__pagination');
        paginationBullet.forEach(bullet => bullet.classList.add('about-slider__pagination-bullet'));
    }, []);

    const slides = aboutImgs.map((item) => {
        return (
            <SwiperSlide className='about-slider__item' key={item.id}>
                <img src={item.src} alt={item.name}/>
            </SwiperSlide>
        )
    });

    return (
        <Swiper 
            className='about-slider'
            navigation={{
                prevEl: '.about-slider__prev',
                nextEl: '.about-slider__next'
            }}
            pagination={{clickable: true}}
            keyboard={{
                enabled: true,
                onlyInViewport: true
            }}
            loop={false}
            autoplay={{
                delay: 10000,
                disableOnInteraction: true
            }}
            speed={500}
        >
            {slides}
            
            <svg className='about-slider__next'>
                <use href={`${icons}#arrow`}></use>
            </svg>
            <svg className='about-slider__prev'>
                <use href={`${icons}#arrow`}></use>
            </svg>
        </Swiper>
    )
};

export default AboutSlider;
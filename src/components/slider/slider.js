import React, { useEffect } from 'react';
import SwiperCore, { Autoplay, Keyboard, Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import './slider.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import image1 from './imgs/img.jpg';
import image2 from './imgs/2.jpg';
import image3 from './imgs/3.jpg';

SwiperCore.use([Navigation, Pagination, Keyboard, Autoplay]);

const items = [
    {
      src: image1,
      altText: 'Slide 1',
      title: `Легендарная коллекция Сандро Боттичелли`,
      text: 'Метафора дает бессознательный биографический метод. Коллективное бессознательное изящно представляет собой постмодернизм.',
      id: 1
    },
    {
        src: image2,
        altText: 'Slide 2',
        title: 'Магическое искусство Сальвадора Дали',
        text: 'Художественная ментальность готично просветляет ритм. Экспрессионизм монотонно аккумулирует ожидания.',
        id: 2
    },
    {
        src: image3,
        altText: 'Slide 3',
        title: `Мультимедийная выставка «‎Ожившие полотна Айвазовского»‎`,
        text: 'Метафора дает бессознательный биографический метод. Коллективное бессознательное изящно представляет собой постмодернизм.',
        id: 3
    }
];

const Slider = () => {
    useEffect(() => {
        const slider = document.querySelector('.slider');
        const pagination = slider.querySelector('.swiper-pagination');
        const paginationBullet = slider.querySelectorAll('.swiper-pagination-bullet');

        pagination.classList.add('slider__pagination');
        paginationBullet.forEach(bullet => bullet.classList.add('slider__pagination-bullet'));
        
    }, []);

    const slides = items.map((item) => {
        const titleWords = item.title.split(' ');
        const firstWords = titleWords.slice(0, 2);
        const lastWords = titleWords.slice(2);

        return (
            <SwiperSlide className='slider__item' key={item.id}>
                <img src={item.src} alt={item.altText}/>
                <div className='slider__flex-wrapper container'>
                    <div className="slider__title">
                        {firstWords.join(' ')}
                        <br/>
                        {lastWords.join(' ')}
                    </div>
                    <div className="slider__text">{item.text}</div>
                </div>
            </SwiperSlide>
        );
    });

    return (
        <Swiper 
            className='slider'
            navigation={{
                prevEl: '.slider__prev',
                nextEl: '.slider__next'
            }}
            pagination={{clickable: true}}
            keyboard={{
                enabled: true,
                onlyInViewport: true
            }}
            loop={true}
            autoplay={{
                delay: 10000,
                disableOnInteraction: true
            }}
            speed={500}
        >
            {slides}
            <div className='slider__control-wrapper container'>
                <div className="slider__next">

                </div>
                <div className="slider__prev">
                    
                </div>
            </div>
        </Swiper>
    );
};

export default Slider;
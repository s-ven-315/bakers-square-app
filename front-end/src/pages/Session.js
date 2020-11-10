import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Session({ loggedIn }) {
    const { recipeId } = useParams()
    const [steps, setSteps] = useState([])

    console.log(steps)

    useEffect(() => {
        axios.get("http://localhost:5000/api/recipes/" + recipeId, {
            headers: {
                Authorization: "Bearer " + loggedIn.access_token
            }
        })
            .then((response) => {
                setSteps(response.data.data.steps)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>'
                }, clickable: true
            }
            }
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            {steps !== [] ?
                steps.map((step, idx) => {
                    return (
                        <SwiperSlide>
                            <div className="step-no">Step {idx + 1}</div>
                            <div lassName="step-text">{step.text}</div>
                            <div></div>
                        </SwiperSlide>
                    )
                })

                : null}
        </Swiper>
    );
};
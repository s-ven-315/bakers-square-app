import React, {useState, useEffect, useContext} from "react"
import axios from "axios"
import {Redirect, useParams} from "react-router-dom"
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import {DataContext, emptyUser} from "../contexts/Context";
import {GetRecipe} from "../helpers";

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Session() {
    console.log("Session() is rendered.")

    const context = useContext(DataContext)
    const {authUser, setUser} = context

    const { recipeId } = useParams()
    const [steps, setSteps] = useState([])

    console.log(steps)


    useEffect(() => {
        if (context.recipe.id !== recipeId){
            GetRecipe(context, recipeId)
        }
        if (context.user.userId){
            setUser(emptyUser)
        }
    }, [recipeId])
    if (!authUser.access_token) {
        return <Redirect to="/" />
    }

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
                            <div className="step-text">{step.text}</div>
                            <div/>
                        </SwiperSlide>
                    )
                })

                : null}
        </Swiper>
    );
};
import React, { useState, useEffect } from "react";
import SlideshowItem from "./SlideshowItem.tsx";
import Slider from "react-slick"
import {getRequest} from "../../api/api.ts"
import './SlideshowView.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SlideshowView() {

    const [sliderImages, setSlideImages] = useState<any[]>([])

    // const sliderImages = [
    //     "https://cdn.discordapp.com/attachments/789255815075725313/1324444977148854312/DSCF1461.jpg?ex=67782d01&is=6776db81&hm=d422568e576a4e2a7738fca7f33d368975dbb55d7fa97474a5e089e85829a16d&",
    //     "https://cdn.discordapp.com/attachments/789255815075725313/1324444978516328579/IMG_1127.jpg?ex=67782d01&is=6776db81&hm=ff6b9ac3a249d7dc96984a9e03127fc52b360064bfb8b87c1c59857e93c568aa&",
    //     "https://cdn.discordapp.com/attachments/789255815075725313/1324444979438817280/IMG_0744.jpg?ex=67782d02&is=6776db82&hm=2a6d488ab1cd1f81743e648d643a1fdc3f4f258260344f11cc1ab11453983b55&",
    //     "https://cdn.discordapp.com/attachments/789255815075725313/1324444980189724702/IMG_0645.jpg?ex=67782d02&is=6776db82&hm=4740c9ad5d387131cd220cc21203bbc203387c972efbb8ebbafb2dfbfc0c5c90&"
    // ]

    var settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000
    };

    async function pullSliderImages(){
        const response = await getRequest("home-slideshow?populate=*")
        console.log(response)
        setSlideImages(response.data.data.BackgroundImages)
        console.log(response.data.data.BackgroundImages)
    }
    useEffect(() => {
        console.log("in console")
        pullSliderImages()
        
    }, [])

    return (
        <div className="slideshow-view">
            <Slider {...settings} >
                {/* {sliderImages.map(slideshowImage => {
                    return (
                        <SlideshowItem
                            backgroundImage={slideshowImage}
                        />
                    )
                })} */}
                {sliderImages.map(slideshowItem => {

                    const backgroundImage = process.env.REACT_APP_BACKEND_URL + slideshowItem.url

                    return (
                        <SlideshowItem
                            key={slideshowItem.id}
                            backgroundImage={backgroundImage}
                            // bannerContent={slideshowItem.attributes.SlideshowContent.Content}
                        />
                    )
                })}
            </Slider>
        </div>
    )
}
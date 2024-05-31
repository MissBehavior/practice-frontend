import classNames from './clients.module.css'
import { Card } from '@/components/ui/card'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {
    Autoplay,
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
} from 'swiper/modules'

const clients = [
    {
        imgUrl: '/company_clients/tiivi-logo-mobile.png',
        link: 'https://www.tiivi.fi/',
    },
    {
        imgUrl: '/company_clients/SparDK.png',
        link: 'https://www.sparvinduer.dk/',
    },
    {
        imgUrl: '/company_clients/pihla.png',
        link: 'https://www.pihla.fi/',
    },
    {
        imgUrl: '/company_clients/frovin.png',
        link: 'https://www.frovin.dk/',
    },
    {
        imgUrl: '/company_clients/kpk_logo.png',
        link: 'https://www.kpk-vinduer.dk/',
    },
    {
        imgUrl: '/company_clients/klas1-logo-valk_black.png',
        link: 'https://www.klas1.fi/',
    },
    {
        imgUrl: '/company_clients/jna_logo.png',
        link: 'https://www.jna.dk/',
    },
    {
        imgUrl: '/company_clients/JackBrunsdon-Landscape-Logo.png',
        link: 'https://jackbrunsdon.co.uk/',
    },
    {
        imgUrl: '/company_clients/hajom_svart.png',
        link: 'https://www.hajom.com/',
    },
    {
        imgUrl: '/company_clients/elitfonster-logo-svart.png',
        link: 'https://www.elitfonster.se/',
    },
    {
        imgUrl: '/company_clients/elitfonster-logo-black.png',
        link: 'https://www.elitfonsterpaplats.se/',
    },
    {
        imgUrl: '/company_clients/diplomat.png',
        link: 'https://www.diplomatdorrar.se/',
    },
    {
        imgUrl: '/company_clients/cwg-choices-logo2.png',
        link: 'https://cwgchoices.com/',
    },
    {
        imgUrl: '/company_clients/carlson-logo.png',
        link: 'https://www.carlson.ie/',
    },
    {
        imgUrl: '/company_clients/allan-brothers.png',
        link: 'https://www.allanbrothers.co.uk/',
    },
    {
        imgUrl: '/company_clients/lyssand.png',
        link: 'https://www.lyssand.com/',
    },
    {
        imgUrl: '/company_clients/frekh_ug.png',
        link: 'https://www.frekhaug.no/',
    },
    {
        imgUrl: '/company_clients/web-logo_black.png',
        link: 'https://www.outline.dk/',
    },
]

export default function Clients() {
    return (
        <>
            <Swiper
                modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={6}
                loop={true}
                scrollbar={{ draggable: true }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                navigation={true}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                breakpoints={{
                    200: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                    1280: {
                        slidesPerView: 6,
                        spaceBetween: 50,
                    },
                }}
                className="h-56 mt-10 pl-10 pr-16"
            >
                {clients.map((client, index) => (
                    <SwiperSlide key={index}>
                        <Card className="flex align-middle justify-center center items-center h-40 bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                            <a
                                href={client.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="min-h-32 max-h-40 p-2 object-contain rounded-t-md select-none"
                                    src={client.imgUrl}
                                    alt=""
                                />
                            </a>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

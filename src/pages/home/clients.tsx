import React from 'react'

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

const Clients: React.FC = () => {
    return (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {clients.map((brand, index) => (
                <li key={index} className="flex justify-center">
                    <img
                        src={brand.imgUrl}
                        alt="Brand Logo"
                        className="rounded m-10 opacity-70 w-32 h-auto object-contain mix-blend-luminosity contrast-50 brightness-150 hover:scale-125 hover:transition-transform hover:duration-500 hover:ease-in-out hover:opacity-100"
                    />
                </li>
            ))}
        </ul>
    )
}

export default Clients

import homeLogo from '/1122.png'
export default function Home() {
    return (
        <>
            <div className="flex flex-row justify-center text-center center align-middle  place-items-center xs:mx-5 xs:my-5 md:mx-32 md:my-20 2xl:mx-60 xs:flex-col xl:flex-row md:gap-10">
                <p className="w-full text-left text-xl">
                    We are a growing team of dedicated talents providing
                    engineering assistance & solutions for business: we
                    calculate project’s estimates, process orders, prepare CAD
                    drawings, as well as plan production and offer IT services
                    specifically tailored to your business needs. Founded in
                    2002 by the Scandinavian window and door market leader, we
                    continuously improve our processes and expand areas of our
                    services. New ideas and their implementation is an exciting
                    part of the way our business operates. Working in the
                    international environment allows us to collect valuable know
                    - how from the different business and cultural contexts.
                    Whether you are a customer or employee – let us be a part of
                    your success story.
                </p>
                <img
                    src={homeLogo}
                    alt=""
                    className="w-1/2 xs:w-full xl:w-1/2"
                />
            </div>
            <div className="flex flex-col gap-5 xs:mx-5 md:mx-32 2xl:mx-60 xs:mb-5 md:mb-20">
                <p className="w-full text-left text-xl">
                    Winbas is the first and only official representative trading
                    Danish manufacturer – Outline windows and doors in
                    Lithuania. High-quality wooden or wood-clad aluminum windows
                    from Denmark are an excellent investment for your home. With
                    over 30 years of manufacturing experience, accumulated
                    experience allows us to offer customers the most suitable
                    architectural and design solutions that ensure the highest
                    energy efficiency. Outline offers a wide range of designs.
                    Windows opening to the outside or inside, a variety of
                    colors, the possibility to match window and door accessories
                    to your interior. Outline – Windows and doors designed for
                    your home! You can find more information about the products
                    by clicking on the link.:
                </p>
                <p className="text-xl">
                    <a
                        href="https://outline.dk"
                        className="text-blue-600 dark:text-slate-400"
                    >
                        Home (outline.dk)
                    </a>
                </p>
                <p className="text-xl">Contact us: Tel. +37060658526</p>
                <p className="text-xl">
                    <a
                        className="text-blue-600 dark:text-slate-400"
                        href="mailto:pardavimai.vilnius@winbas.eu"
                    >
                        Send request
                    </a>
                </p>
            </div>
        </>
    )
}
/*  <p>
                Winbas is the first and only official representative trading
                Danish manufacturer – Outline windows and doors in Lithuania.
                High-quality wooden or wood-clad aluminum windows from Denmark
                are an excellent investment for your home. With over 30 years of
                manufacturing experience, accumulated experience allows us to
                offer customers the most suitable architectural and design
                solutions that ensure the highest energy efficiency. Outline
                offers a wide range of designs. Windows opening to the outside
                or inside, a variety of colors, the possibility to match window
                and door accessories to your interior. Outline – Windows and
                doors designed for your home! You can find more information
                about the products by clicking on the link.: Home (outline.dk)
                Contact us: Tel. +37060658526 Send request
            </p> */

import React from "react";
import TextLoop from "react-text-loop";
import Particles from "react-tsparticles";
import RandomImage from "../../utils/RandomImage";
import { getStaticDataIndex } from "../../api/institucionAPI";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

const SliderTwo = ({ institucion = null }) => {
    // obtención de información estática
    const { isLoading: loading_static_data, data: staticData } = useQuery({
        queryKey: ["staticDataIndex"],
        queryFn: getStaticDataIndex,
    });

    if (institucion && !loading_static_data) {
        const { institucion_nombre, institucion_iniciales, portada } =
            institucion;
        const { txt_content_banner } = staticData;
        const sliderContent = {
            iniciales: institucion_iniciales,
            name: institucion_nombre,
            txt_1: "Análisis",
            txt_2: "Diseño",
            txt_3: "Ejecución",
            description: txt_content_banner,
            btnText: "Categorias",
        };
        const img = RandomImage(portada);

        return (
            <>
                {/*  Home Banner */}
                <section
                    id="home"
                    className="home-banner home-banner-two"
                    style={{
                        backgroundImage: `url(${img})`,
                    }}
                >
                    <div className="frame-layout__particles">
                        <Particles
                            id="tsparticles"
                            options={{
                                backgroundMode: {
                                    enable: true,
                                    zIndex: 1,
                                },
                                fullScreen: {
                                    enable: false,
                                    zIndex: -1,
                                },
                                fpsLimit: 70,
                                interactivity: {
                                    detectsOn: "canvas",
                                    events: {
                                        onClick: {
                                            enable: false,
                                            mode: "push",
                                        },
                                        onHover: {
                                            enable: false,
                                            mode: "repulse",
                                        },
                                        resize: true,
                                    },
                                    modes: {
                                        bubble: {
                                            distance: 400,
                                            duration: 2,
                                            opacity: 0.4,
                                            size: 40,
                                        },
                                        push: {
                                            quantity: 4,
                                        },
                                        repulse: {
                                            distance: 200,
                                            duration: 0.4,
                                        },
                                    },
                                },
                                particles: {
                                    color: {
                                        value: "#ddd",
                                    },
                                    links: {
                                        color: "#ffffff",
                                        distance: 150,
                                        enable: true,
                                        opacity: 0.5,
                                        width: 1,
                                    },
                                    collisions: {
                                        enable: true,
                                    },
                                    move: {
                                        direction: "none",
                                        enable: true,
                                        outMode: "bounce",
                                        random: false,
                                        speed: 2,
                                        straight: false,
                                    },
                                    number: {
                                        density: {
                                            enable: true,
                                            value_area: 800,
                                        },
                                        value: 30,
                                    },
                                    opacity: {
                                        value: 0.5,
                                    },
                                    shape: {
                                        type: "circle",
                                    },
                                    size: {
                                        random: true,
                                        value: 6,
                                    },
                                },

                                detectRetina: true,
                            }}
                        />
                    </div>
                    {/* End particle animation */}
                    <div className="container">
                        <div className="row full-screen align-items-center">
                            <div className="col-lg-12">
                                <div className="type-box">
                                    <h6
                                        data-aos="fade-up"
                                        data-aos-duration="1200"
                                    >
                                        {sliderContent.iniciales}
                                    </h6>
                                    <h1
                                        className="font-alt"
                                        data-aos="fade-up"
                                        data-aos-duration="1200"
                                        data-aos-delay="100"
                                        style={{
                                            textShadow:
                                                "5px 5px 15px rgba(0,0,0,.5)",
                                        }}
                                    >
                                        {sliderContent.name}
                                    </h1>
                                    <div
                                        data-aos="fade-up"
                                        data-aos-duration="1200"
                                        data-aos-delay="200"
                                    >
                                        <TextLoop>
                                            <p className="loop-text lead">
                                                {" "}
                                                {sliderContent.txt_1}
                                            </p>
                                            <p className="loop-text lead">
                                                {sliderContent.txt_2}
                                            </p>
                                            <p className="loop-text lead">
                                                {" "}
                                                {sliderContent.txt_3}
                                            </p>
                                        </TextLoop>
                                    </div>
                                    <p
                                        className="desc"
                                        data-aos="fade-up"
                                        data-aos-duration="1200"
                                        data-aos-delay="300"
                                    >
                                        {sliderContent.description}
                                    </p>
                                    <div
                                        className="mt-4"
                                        data-aos="fade-up"
                                        data-aos-duration="1200"
                                        data-aos-delay="400"
                                    >
                                        <NavLink
                                            className="px-btn px-btn-white"
                                            to={`/Categorias`}
                                            download
                                        >
                                            {sliderContent.btnText}
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Container*/}
                </section>

                {/* End Home Banner  */}
            </>
        );
    }
    return null;
};

export default SliderTwo;

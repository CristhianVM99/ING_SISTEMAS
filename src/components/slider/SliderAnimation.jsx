import React from "react";
import TextLoop from "react-text-loop";
import { getStaticDataIndex } from "../../api/institucionAPI";
import { useQuery } from "@tanstack/react-query";
import RandomImage from "../../utils/RandomImage";
import { NavLink } from "react-router-dom";
import { TIPOS } from "../../types/types";
import RedesAnimation from "../RedesAnimation";

const Slider = ({ title, institucion = null }) => {
    // obtención de información estática
    const { isLoading: loading_static_data, data: staticData } = useQuery({
        queryKey: ["staticDataIndex"],
        queryFn: getStaticDataIndex,
    });

    if (institucion && !loading_static_data) {
        const {
            institucion_correo1,
            institucion_celular1,
            institucion_iniciales,
            portada,
        } = institucion;
        const { txt_content_banner_three } = staticData;

        if (title === TIPOS.CALENDARIO) title = "CALENDARIO ACADÉMICO";
        if (title === TIPOS.HORARIO) title = "HORARIO ACADÉMICO";
        if (title === TIPOS.PLANESTUDIO) title = "PLAN DE ESTUDIO";
        if (title === TIPOS.REGLAMENTO)
            title = "REGLAMENTO Y MODO DE GRADUACIÓN";
        if (title === TIPOS.PASANTIAS) title = "PASANTÍAS INSTITUCIONALES";
        if (title === TIPOS.CONVENIOS) title = "CONVENIOS INSTITUCIONALES";
        if (title === TIPOS.TRABAJOS) title = "TRABAJOS DIRIGIDOS";
        if (title === TIPOS.INSTITUTO) title = "INSTITUTO DE INVESTIGACIÓN";

        const sliderContent = {
            iniciales: institucion_iniciales,
            name: title,
            designation: "Full-stack Developer",
            txt_1: "Análisis",
            txt_2: "Diseño",
            txt_3: "Ejecución",
            description: txt_content_banner_three,
            btnText: "Categorias",
        };
        const conctInfo = {
            phone: `Celular : +591 ${institucion_celular1}`,
            email: `Correo : ${institucion_correo1}`,
        };

        const img = RandomImage(portada);

        return (
            <>
                {/*  Home Banner */}
                <section id="home" className="home-banner">
                    <div className="hb-top-fixed d-flex">
                        <div className="hb-info">
                            <a
                                href={`tel:${conctInfo.phone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {conctInfo.phone}
                            </a>
                            <a
                                href={`mailto:mail${conctInfo.email}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {conctInfo.email}
                            </a>
                        </div>
                        {/* <div className="hb-lang">
                            <ul className="nav">
                                <li className="active">
                                    <a href="#">EN</a>
                                </li>
                                <li>
                                    <a href="#">FR</a>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                    {/* End hp-top-fixed */}

                    <div className="container">
                        <div className="row full-screen align-items-center">
                            <div className="col-lg-7">
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
                                            <p
                                                className="loop-text lead"
                                                style={{
                                                    fontSize: "3em",
                                                }}
                                            >
                                                - {sliderContent.txt_1} -
                                            </p>
                                            <p
                                                className="loop-text lead"
                                                style={{
                                                    fontSize: "3em",
                                                }}
                                            >
                                                - {sliderContent.txt_2} -
                                            </p>
                                            <p
                                                className="loop-text lead"
                                                style={{
                                                    fontSize: "3em",
                                                }}
                                            >
                                                - {sliderContent.txt_3} -
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

                    <div
                        className="hb-me animation_blob"
                        style={{
                            backgroundImage: `url(${img})`,
                        }}
                    >
                        <RedesAnimation
                            t="auto"
                            r="auto"
                            b="0px"
                            l="0px"
                            style={{ zIndex: "0" }}
                        />
                        <RedesAnimation
                            t="0px"
                            r="0px"
                            b="auto"
                            l="auto"
                            style={{ zIndex: "0" }}
                        />
                    </div>
                </section>

                {/* End Home Banner  */}
            </>
        );
    }
    return null;
};

export default Slider;

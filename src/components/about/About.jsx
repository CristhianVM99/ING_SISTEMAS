import React, { useEffect } from "react";
import Social from "../Social";
import Testimonials from "../../components/testimonial/Testimonial";
import Services from "../../components/service/Service";
import Awards from "../../components/award/Awards";
import { getGacetas, getStaticDataAcademia } from "../../api/institucionAPI";
import { useQuery } from "@tanstack/react-query";
import { TIPOS } from "../../types/types";
import { NavLink } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import RandomImage from "../../utils/RandomImage";

const About = ({ categoria, institucion }) => {
    /* OBTENCION DE INFORMACION DEL STORE API GACETAS*/
    const { isLoading: loading_gacetas, data: gacetas } = useQuery({
        queryKey: ["gacetas"],
        queryFn: getGacetas,
    });
    /* OBTENCION DE INFORMACION DEL STORE STATICO */
    const { isLoading: loading_static_data, data: staticData } = useQuery({
        queryKey: ["staticDataAcademia"],
        queryFn: getStaticDataAcademia,
    });
    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    });
    if (
        categoria != TIPOS.REGLAMENTO &&
        !loading_static_data &&
        !loading_gacetas &&
        institucion
    ) {
        const {
            txt_content_btn,
            txt_content_calendario,
            txt_content_horario,
            txt_content_plan_de_estudio,
        } = staticData;
        const { institucion_nombre } = institucion;
        var item = null;
        var content = "";

        if (categoria === TIPOS.CALENDARIO) {
            /* OBTENEMOS EL CALENDARIO DE LA INSTITUCION */
            item = gacetas.find((e) =>
                e.gaceta_titulo.includes(TIPOS.CALENDARIO)
            );
            content = txt_content_calendario;
        }
        if (categoria === TIPOS.HORARIO) {
            /* OBTENEMOS EL CALENDARIO DE LA INSTITUCION */
            item = gacetas.find((e) => e.gaceta_titulo.includes(TIPOS.HORARIO));
            content = txt_content_horario;
        }
        if (categoria === TIPOS.PLANESTUDIO) {
            /* OBTENEMOS EL CALENDARIO DE LA INSTITUCION */
            item = gacetas.find((e) => e.gaceta_titulo.includes(TIPOS.PLAN));
            content = txt_content_plan_de_estudio;
        }
        return (
            <>
                <section id="about" className="section theme-light dark-bg">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-6 col-lg-4">
                                <div className="">
                                    <div className="img">
                                        <div className="img-in">
                                            <Document
                                                file={`${process.env.REACT_APP_ROOT_API}/Gaceta/${item.gaceta_documento}`}
                                            >
                                                <Page
                                                    pageNumber={1}
                                                    width="330"
                                                />
                                            </Document>
                                        </div>

                                        {/* End social icon */}
                                    </div>
                                    {/* End img */}
                                    <div
                                        className="info"
                                        style={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <h3 style={{ paddingTop: "20px" }}>
                                            {item.gaceta_titulo}
                                        </h3>
                                    </div>
                                    {/* End info */}
                                </div>
                                {/* End about-me */}
                            </div>
                            {/* End col */}

                            <div className="col-lg-7 ml-auto">
                                <div className="about-info">
                                    <div className="title">
                                        <h3>{categoria}</h3>
                                    </div>
                                    <div className="about-text">
                                        <p>{content}</p>
                                    </div>

                                    <a
                                        className="px-btn px-btn-white"
                                        href={`${process.env.REACT_APP_ROOT_API}/Gaceta/${item.gaceta_documento}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {txt_content_btn}
                                    </a>
                                </div>
                            </div>
                            {/* End col */}
                        </div>
                    </div>
                </section>
            </>
        );
    }
    if (categoria == TIPOS.REGLAMENTO && !loading_static_data && institucion) {
        /* DATOS DE LA INSTITUCION */
        const {
            institucion_sobre_ins,
            institucion_nombre,
            portada,
            institucion_logo,
        } = institucion;

        /* DATOS ESTATICOS */
        const { txt_content_reglamento } = staticData;

        const img = RandomImage(portada);

        return (
            <>
                <section id="about" className="section theme-light dark-bg">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-6 col-lg-4">
                                <div className="">
                                    <div className="img">
                                        <div className="img-in">
                                            <img
                                                src={`${process.env.REACT_APP_ROOT_API}/InstitucionUpea/${institucion_logo}`}
                                                alt="about"
                                            />
                                        </div>

                                        {/* End social icon */}
                                    </div>
                                    {/* End img */}
                                    <div
                                        className="info"
                                        style={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <h3 style={{ paddingTop: "20px" }}>
                                            {institucion_nombre}
                                        </h3>
                                    </div>
                                    {/* End info */}
                                </div>
                                {/* End about-me */}
                            </div>
                            {/* End col */}

                            <div className="col-lg-7 ml-auto">
                                <div className="about-info">
                                    <div className="title">
                                        <h3>{txt_content_reglamento}</h3>
                                    </div>
                                    <div
                                        className="about-text"
                                        style={{ color: "#fff" }}
                                        dangerouslySetInnerHTML={{
                                            __html: institucion_sobre_ins,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            {/* End col */}
                        </div>
                    </div>
                </section>
            </>
        );
    }
    return null;
};

export default About;

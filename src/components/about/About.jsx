import React, { useEffect } from "react";
import { getGacetas, getStaticDataAcademia } from "../../api/institucionAPI";
import { useQuery } from "@tanstack/react-query";
import { TIPOS } from "../../types/types";
import { Document, Page, pdfjs } from "react-pdf";
import { FaRegFilePdf } from "react-icons/fa";
import SinRegistros from "../SinRegistros";

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
        categoria !== TIPOS.REGLAMENTO &&
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

        var item = null;
        var content = "";
        var title = "";

        if (categoria === TIPOS.CALENDARIO) {
            /* OBTENEMOS EL CALENDARIO DE LA INSTITUCION */
            item = gacetas.find((e) => e.gaceta_titulo.includes(TIPOS.HORARIO));
            content = txt_content_calendario;
            title = "CALENDARIO ACADÉMICO";
        }
        if (categoria === TIPOS.HORARIO) {
            /* OBTENEMOS EL CALENDARIO DE LA INSTITUCION */
            item = gacetas.find((e) => e.gaceta_titulo.includes(TIPOS.HORARIO));
            content = txt_content_horario;
            title = "HORARIO ACADÉMICO";
        }
        if (categoria === TIPOS.PLANESTUDIO) {
            /* OBTENEMOS EL CALENDARIO DE LA INSTITUCION */
            item = gacetas.find((e) => e.gaceta_titulo.includes(TIPOS.PLAN));
            content = txt_content_plan_de_estudio;
            title = "PLAN DE ESTUDIO";
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
                                            {item && (
                                                <a
                                                    href={`${process.env.REACT_APP_ROOT_API}/Gaceta/${item.gaceta_documento}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Document
                                                        file={`${process.env.REACT_APP_ROOT_API}/Gaceta/${item.gaceta_documento}`}
                                                    >
                                                        <Page
                                                            pageNumber={1}
                                                            width="330"
                                                        />
                                                    </Document>
                                                </a>
                                            )}
                                            {!item && (
                                                <SinRegistros
                                                    title={categoria}
                                                />
                                            )}
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
                                        {item && (
                                            <h3 style={{ paddingTop: "20px" }}>
                                                {item.gaceta_titulo}
                                            </h3>
                                        )}
                                    </div>
                                    {/* End info */}
                                </div>
                                {/* End about-me */}
                            </div>
                            {/* End col */}

                            <div className="col-lg-7 ml-auto">
                                <div className="about-info">
                                    <div className="title">
                                        <h3>{title}</h3>
                                    </div>
                                    <div className="about-text">
                                        <p>{content}</p>
                                    </div>

                                    {item && (
                                        <a
                                            className="px-btn px-btn-white"
                                            href={`${process.env.REACT_APP_ROOT_API}/Gaceta/${item.gaceta_documento}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {txt_content_btn}{" "}
                                            <FaRegFilePdf
                                                style={{
                                                    fontSize: "1.2em",
                                                }}
                                            />
                                        </a>
                                    )}
                                </div>
                            </div>
                            {/* End col */}
                        </div>
                    </div>
                </section>
            </>
        );
    }
    if (categoria === TIPOS.REGLAMENTO && !loading_static_data && institucion) {
        /* DATOS DE LA INSTITUCION */
        const { institucion_sobre_ins, institucion_nombre, institucion_logo } =
            institucion;

        /* DATOS ESTATICOS */
        const { txt_content_reglamento } = staticData;

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
                                                alt="logo sistemas"
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
                                        <h3
                                            style={{
                                                paddingTop: "20px",
                                                fontSize: "3em",
                                            }}
                                        >
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
                                        <h3 style={{ fontSize: "3em" }}>
                                            {txt_content_reglamento}
                                        </h3>
                                    </div>
                                    <div
                                        className="about-text"
                                        style={{
                                            color: "#fff",
                                            background: "rgba(0,0,0,.5)",
                                            padding: "20px",
                                            borderRadius: "20px",
                                            boxShadow:
                                                "-5px 5px 15px rgba(0,0,0,.5)",
                                        }}
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

import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { FiLink } from "react-icons/fi";
import Masonry from "react-masonry-css";
import { Document, Page, pdfjs } from "react-pdf";
import { getGacetas } from "../../api/institucionAPI";
import { useQuery } from "@tanstack/react-query";
import { TIPOS } from "../../types/types";
import SinRegistros from "../SinRegistros";

const Portfolio = ({ categoria, institucion = null }) => {
    /* OBTENCION DE INFORMACION DEL STORE API GACETAS*/
    const { isLoading: loading_gacetas, data: gacetas } = useQuery({
        queryKey: ["gacetas"],
        queryFn: getGacetas,
    });

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    });

    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1,
    };

    const tabList = [
        "TODOS",
        "PASANTÍAS",
        "CONVENIOS",
        "TRABAJOS DIRIGIDOS",
        "INSTITUTO DE INVESTIGACIÓN",
    ];

    if (!loading_gacetas && institucion) {
        const { institucion_nombre } = institucion;

        /* FILTRADOE DE CONVENIOS PARA GACETAS DE TIPO CONVENIO */
        const convenios = gacetas.filter(
            (e) => e.gaceta_tipo === TIPOS.CONVENIO
        );

        /* FILTRADOE DE CONVENIOS PARA GACETAS DE TIPO PASANTIA */
        const pasantias = gacetas.filter(
            (e) => e.gaceta_tipo === TIPOS.PASANTIA
        );

        /* FILTRADOE DE CONVENIOS PARA GACETAS DE TIPO TRABAJO DIRIGIDO */
        const trabajos = gacetas.filter(
            (e) => e.gaceta_tipo === TIPOS.TRABAJO_DIRIGIDO
        );

        /* FILTRADOE DE CONVENIOS PARA GACETAS DE TIPO TRABAJO DIRIGIDO */
        const institutoInvestigacion = gacetas.filter(
            (e) => e.gaceta_tipo === TIPOS.INSTITUTO_INVESTIGACION
        );

        const todos = [
            ...convenios,
            ...pasantias,
            ...trabajos,
            ...institutoInvestigacion,
        ];

        const tabListContent = [
            {
                porftoliItems: todos.map((gaceta, index) => ({
                    img: `${process.env.REACT_APP_ROOT_API}/Gaceta/${gaceta.gaceta_documento}`,
                    width: 400,
                    height: 550,
                    title: gaceta.gaceta_titulo,
                    subTitle: institucion_nombre,
                    alterText: "GACETAS",
                    portfolioLink: `${process.env.REACT_APP_ROOT_API}/Gaceta/${gaceta.gaceta_documento}`,
                })),
            },
            {
                porftoliItems: pasantias.map((gaceta, index) => ({
                    img: `${process.env.REACT_APP_ROOT_API}/Gaceta/${gaceta.gaceta_documento}`,
                    width: 400,
                    height: 550,
                    title: gaceta.gaceta_titulo,
                    subTitle: "PASANTÍAS",
                    alterText: "gaceta",
                    portfolioLink: `${process.env.REACT_APP_ROOT_API}/Gaceta/${gaceta.gaceta_documento}`,
                })),
            },
            {
                porftoliItems: convenios.map((gaceta, index) => ({
                    img: `${process.env.REACT_APP_ROOT_API}/Gaceta/${gaceta.gaceta_documento}`,
                    width: 400,
                    height: 550,
                    title: gaceta.gaceta_titulo,
                    subTitle: "CONVENIOS",
                    alterText: "gaceta",
                    portfolioLink: `${process.env.REACT_APP_ROOT_API}/Gaceta/${gaceta.gaceta_documento}`,
                })),
            },
            {
                porftoliItems: trabajos.map((gaceta, index) => ({
                    img: `${process.env.REACT_APP_ROOT_API}/Gaceta/${gaceta.gaceta_documento}`,
                    width: 400,
                    height: 550,
                    title: gaceta.gaceta_titulo,
                    subTitle: "TRABAJOS DIRIGIDOS",
                    alterText: "gaceta",
                    portfolioLink: `${process.env.REACT_APP_ROOT_API}/Gaceta/${gaceta.gaceta_documento}`,
                })),
            },
            {
                porftoliItems: institutoInvestigacion.map((gaceta, index) => ({
                    img: `${process.env.REACT_APP_ROOT_API}/Gaceta/${gaceta.gaceta_documento}`,
                    width: 400,
                    height: 550,
                    title: gaceta.gaceta_titulo,
                    subTitle: "INSTITUTO DE INVESTIGACIÓN",
                    alterText: "gaceta",
                    portfolioLink: `${process.env.REACT_APP_ROOT_API}/Gaceta/${gaceta.gaceta_documento}`,
                })),
            },
        ];

        return (
            <div className="portfolio-filter-01">
                <Tabs>
                    <TabList className="filter d-flex flex-wrap justify-content-start">
                        {tabList.map((val, i) => (
                            <Tab key={i}>{val}</Tab>
                        ))}
                    </TabList>
                    {/* End tablist */}
                    <Gallery>
                        {tabListContent.map((tabContent, i) => (
                            <TabPanel key={i}>
                                <div className="portfolio-content ">
                                    <Masonry
                                        breakpointCols={breakpointColumnsObj}
                                        className="my-masonry-grid"
                                        columnClassName="my-masonry-grid_column"
                                    >
                                        {tabContent.porftoliItems.map(
                                            (val, i) => (
                                                <div
                                                    className="portfolio-box-01"
                                                    key={i}
                                                >
                                                    <div className="portfolio-img">
                                                        <div className="portfolio-info">
                                                            <h5>
                                                                <a
                                                                    href={
                                                                        val.portfolioLink
                                                                    }
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    {val.title}
                                                                </a>
                                                            </h5>
                                                            <span
                                                                style={{
                                                                    color: "#fff",
                                                                    background:
                                                                        "var(--color-terciario)",
                                                                    padding:
                                                                        "5px 10px",
                                                                    borderRadius:
                                                                        "20px",
                                                                }}
                                                            >
                                                                {val.subTitle}
                                                            </span>
                                                        </div>
                                                        {/* End .portfolio-info */}
                                                        <Item
                                                            original={val.img}
                                                            thumbnail={val.img}
                                                            width={val.width}
                                                            height={val.height}
                                                        >
                                                            {({
                                                                ref,
                                                                open,
                                                            }) => (
                                                                <a
                                                                    href={
                                                                        val.img
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <div className="gallery-link">
                                                                        <Document
                                                                            file={
                                                                                val.img
                                                                            }
                                                                        >
                                                                            <Page
                                                                                pageNumber={
                                                                                    1
                                                                                }
                                                                                height={
                                                                                    500
                                                                                }
                                                                            />
                                                                        </Document>
                                                                    </div>
                                                                </a>
                                                            )}
                                                        </Item>

                                                        <a
                                                            className="portfolio-icon"
                                                            href={
                                                                val.portfolioLink
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <FiLink />
                                                        </a>
                                                        {/* End .portfolio-icon */}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                        {tabContent.porftoliItems.length ===
                                            0 && (
                                            <SinRegistros title={"GACETAS"} />
                                        )}
                                    </Masonry>
                                </div>
                                {/* End list wrapper */}
                            </TabPanel>
                        ))}
                    </Gallery>
                    {/* End tabpanel */}
                </Tabs>
            </div>
        );
    }
    return null;
};

export default Portfolio;

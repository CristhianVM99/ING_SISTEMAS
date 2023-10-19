import React from "react";
import { Tabs, TabPanel } from "react-tabs";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { FiLink } from "react-icons/fi";
import Masonry from "react-masonry-css";
import { TIPOS } from "../../types/types";
import { NavLink } from "react-router-dom";

const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
};

const PortfolioAnimation = ({ institucion }) => {
    if (institucion) {
        const { institucion_nombre } = institucion;
        const tabListContent = [
            {
                porftoliItems: [
                    {
                        img: "/images/convocatorias.jpg",
                        width: 400,
                        height: 550,
                        title: "Convocatorias",
                        subTitle: institucion_nombre,
                        alterText: "convocatorias",
                        delayAnimation: "",
                        portfolioLink: `/Recurso/${TIPOS.CONVOCATORIAS}`,
                    },
                    {
                        img: "/images/comunicados.jpg",
                        width: 400,
                        height: 400,
                        title: "Comunicados",
                        subTitle: institucion_nombre,
                        alterText: "comunicados",
                        delayAnimation: "100",
                        portfolioLink: `/Recurso/${TIPOS.COMUNICADOS}`,
                    },
                    {
                        img: "/images/avisos.png",
                        width: 400,
                        height: 700,
                        title: "Avisos",
                        subTitle: institucion_nombre,
                        alterText: "avisos",
                        delayAnimation: "200",
                        portfolioLink: `/Recurso/${TIPOS.AVISOS}`,
                    },
                    {
                        img: "/images/cursos.jpg",
                        width: 400,
                        height: 400,
                        title: "Cursos",
                        subTitle: institucion_nombre,
                        alterText: "curso",
                        delayAnimation: "0",
                        portfolioLink: `/Recurso/${TIPOS.CURSOS}`,
                    },
                    {
                        img: "/images/seminarios.jpg",
                        width: 400,
                        height: 700,
                        title: "Seminarios",
                        subTitle: institucion_nombre,
                        alterText: "seminarios",
                        delayAnimation: "100",
                        portfolioLink: `/Recurso/${TIPOS.SEMINARIOS}`,
                    },
                    {
                        img: "/images/servicios.jpg",
                        width: 400,
                        height: 500,
                        title: "Servicios",
                        subTitle: institucion_nombre,
                        alterText: "servicios",
                        delayAnimation: "200",
                        portfolioLink: `/Recurso/${TIPOS.SERVICIOS}`,
                    },
                    {
                        img: "/images/ofertasacademicas.jpg",
                        width: 400,
                        height: 700,
                        title: "Ofertas Académicas",
                        subTitle: institucion_nombre,
                        alterText: "ofertas",
                        delayAnimation: "0",
                        portfolioLink: `/Recurso/${TIPOS.OFERTAS_ACADEMICAS}`,
                    },
                    {
                        img: "/images/publicaciones.jpg",
                        width: 400,
                        height: 550,
                        title: "Publicaciones",
                        subTitle: institucion_nombre,
                        alterText: "publicaciones",
                        delayAnimation: "100",
                        portfolioLink: `/Recurso/${TIPOS.PUBLICACIONES}`,
                    },
                    {
                        img: "/images/gacetas.jpg",
                        width: 400,
                        height: 400,
                        title: "Gacetas",
                        subTitle: institucion_nombre,
                        alterText: "gacetas",
                        delayAnimation: "200",
                        portfolioLink: `/Recurso/${TIPOS.GACETAS}`,
                    },
                    {
                        img: "/images/eventos.jpg",
                        width: 400,
                        height: 400,
                        title: "Eventos",
                        subTitle: institucion_nombre,
                        alterText: "eventos",
                        delayAnimation: "",
                        portfolioLink: `/Recurso/${TIPOS.EVENTOS}`,
                    },
                    {
                        img: "/images/videos.jpg",
                        width: 400,
                        height: 400,
                        title: "Videos",
                        subTitle: institucion_nombre,
                        alterText: "videos",
                        delayAnimation: "100",
                        portfolioLink: `/Recurso/${TIPOS.VIDEOS}`,
                    },
                ],
            },
        ];

        return (
            <div className="portfolio-filter-01">
                <Tabs>
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
                                                    data-aos="fade-right"
                                                    data-aos-duration="1200"
                                                    data-aos-delay={
                                                        val.delayAnimation
                                                    }
                                                >
                                                    <div className="portfolio-img">
                                                        <div className="portfolio-info">
                                                            <h5>
                                                                <NavLink
                                                                    to={
                                                                        val.portfolioLink
                                                                    }
                                                                >
                                                                    {val.title}
                                                                </NavLink>
                                                            </h5>
                                                            <span>
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
                                                                <div className="gallery-link">
                                                                    <img
                                                                        src={
                                                                            val.img
                                                                        }
                                                                        alt="Childhood"
                                                                        role="button"
                                                                        ref={
                                                                            ref
                                                                        }
                                                                        onClick={
                                                                            open
                                                                        }
                                                                    />
                                                                    <h5
                                                                        style={{
                                                                            textAlign:
                                                                                "center",
                                                                            background:
                                                                                "var(--color-primario)",
                                                                            color: "#fff",
                                                                        }}
                                                                    >
                                                                        <NavLink
                                                                            to={
                                                                                val.portfolioLink
                                                                            }
                                                                            style={{
                                                                                color: "#fff",
                                                                            }}
                                                                        >
                                                                            {
                                                                                val.title
                                                                            }
                                                                        </NavLink>
                                                                    </h5>
                                                                </div>
                                                            )}
                                                        </Item>

                                                        <NavLink
                                                            className="portfolio-icon"
                                                            to={
                                                                val.portfolioLink
                                                            }
                                                        >
                                                            <FiLink />
                                                        </NavLink>
                                                        {/* End .portfolio-icon */}
                                                    </div>
                                                </div>
                                            )
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

export default PortfolioAnimation;

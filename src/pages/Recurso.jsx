import React, { useEffect } from "react";
import Header from "../components/header/HeaderTwo";
import Slider from "../components/slider/SliderAnimation";
import About from "../components/about/AboutAnimation";
import Resume from "../components/resume/ResumeAnimation";
import Portfolio from "../components/portfolio/PortfolioAnimation";
import Blog from "../components/blog/BlogAnimation";
import Contact from "../components/contact/Contact";
import ContactInfo from "../components/contact/ContactInfo";
import Map from "../components/contact/Map";
import Footer from "../components/footer/FooterAnimation";
import useDocumentTitle from "../components/useDocumentTitle";
import { getInstitucion } from "../api/institucionAPI";
import { useQuery } from "@tanstack/react-query";
import ConfigColorIcon from "../utils/ConfigColorIcon";
import { useParams } from "react-router-dom";
import { TIPOS } from "../types/types";

const Recurso = () => {
    const { categoria } = useParams();
    // obtención de la información sobre la carrera
    const { isLoading: loading_institucion, data: institucion } = useQuery({
        queryKey: ["institucion"],
        queryFn: getInstitucion,
    });
    //configuracion del icono y logo de la pagina
    useEffect(() => {
        institucion && ConfigColorIcon(institucion, "RECURSOS");
    }, [institucion]);
    return (
        <div className="main-left theme-dark">
            <Header institucion={institucion} />
            {/* End Header Section */}

            <Slider
                title={
                    categoria.toUpperCase() === TIPOS.OFERTAS_ACADEMICAS
                        ? "OFERTAS ACADÉMICAS"
                        : categoria.toUpperCase()
                }
                institucion={institucion}
            />
            {/* End Slider Section */}

            <section id="blog" className="section">
                <div className="container">
                    <div className="title">
                        <h3>
                            Lo Ultimo de{" "}
                            {categoria === TIPOS.OFERTAS_ACADEMICAS
                                ? "OFERTAS ACADÉMICAS"
                                : categoria}
                        </h3>
                    </div>
                    <Blog categoria={categoria} institucion={institucion} />
                </div>
            </section>
            {/* End Portfolio Section */}

            <footer className="footer white">
                <div className="container">
                    <Footer institucion={institucion} />
                </div>
            </footer>
            {/* End Contact Section */}
        </div>
    );
};

export default Recurso;

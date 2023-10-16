import React, { useEffect, useState } from "react";
import Header from "../components/header/HeaderTwo";
import Slider from "../components/slider/SliderThree";
import About from "../components/about/AboutTwo";
import Resume from "../components/resume/Resume";
import Portfolio from "../components/portfolio/Portfolio";
import Blog from "../components/blog/Blog";
import Contact from "../components/contact/Contact";
import ContactInfo from "../components/contact/ContactInfo";
import Map from "../components/contact/Map";
import Footer from "../components/footer/Footer";
import useDocumentTitle from "../components/useDocumentTitle";
import { useQuery } from "@tanstack/react-query";
import { getInstitucion } from "../api/institucionAPI";
import ConfigColorIcon from "../utils/ConfigColorIcon";
import { TIPOS } from "../types/types";
import Autoridades from "../components/autoridades/autoridades";
import RandomImage from "../utils/RandomImage";
import Awards from "../components/award/AwardsAnimation";
import RedesAnimation from "../components/RedesAnimation";
import ImageIntermedio from "../components/ImageIntermedio";
import Loader from "../components/Loader";

const Principal = () => {
    // obtención de la información sobre la carrera
    const { isLoading: loading_institucion, data: institucion } = useQuery({
        queryKey: ["institucion"],
        queryFn: getInstitucion,
    });

    //configuracion del icono y logo de la pagina
    useEffect(() => {
        institucion && ConfigColorIcon(institucion, "PRINCIPAL");
    }, [institucion]);

    if (loading_institucion) <Loader />;
    //retorno del componente principal
    if (!loading_institucion) {
        const img = RandomImage(institucion.portada);
        return (
            <>
                <div className="main-left theme-dark">
                    <Header institucion={institucion} />
                    {/* End Header Section */}
                    <Slider institucion={institucion} />
                    {/* End Slider Section */}
                    <section className="section">
                        <RedesAnimation t="auto" r="auto" b="-50px" l="-50px" />
                        <RedesAnimation t="0px" r="0px" b="auto" l="auto" />
                        <div className="container">
                            <div className="title">
                                <h3>Autoridades</h3>
                            </div>
                            <Autoridades institucion={institucion} />
                            {/* End About Section */}
                        </div>
                    </section>
                    {/* End Portfolio Section */}
                    <ImageIntermedio img={img} />
                    <section className="section">
                        <RedesAnimation t="0px" r="auto" b="auto" l="0px" />
                        <RedesAnimation t="auto" r="0px" b="0px" l="auto" />
                        <div className="container">
                            <div className="title">
                                <h3>Convocatorias, Comunicados y Avisos</h3>
                            </div>
                            <Blog
                                categoria={TIPOS.ALL_CONVOCATORIAS}
                                institucion={institucion}
                            />
                        </div>
                    </section>
                    {/* End Portfolio Section */}
                    <section className="section">
                        <RedesAnimation t="auto" r="auto" b="-50px" l="-50px" />
                        <RedesAnimation t="0px" r="0px" b="auto" l="auto" />
                        <div className="container">
                            <div className="title">
                                <h3>Cursos y Seminarios</h3>
                            </div>
                            <Blog
                                categoria={TIPOS.ALL_CURSOS}
                                institucion={institucion}
                            />
                        </div>
                    </section>
                    {/* End Portfolio Section */}
                    <section className="section">
                        <RedesAnimation t="0px" r="auto" b="auto" l="0px" />
                        <RedesAnimation t="auto" r="-25px" b="-15px" l="auto" />
                        <div className="container">
                            <div className="title">
                                <h3>Enlaces Virtuales</h3>
                            </div>
                            <Awards institucion={institucion} />
                        </div>
                    </section>
                    <ImageIntermedio img={img} />
                    <footer className="footer white">
                        <div className="container">
                            <Footer institucion={institucion} />
                        </div>
                    </footer>
                    {/* End Contact Section */}
                </div>
            </>
        );
    }
    return null;
};

export default Principal;

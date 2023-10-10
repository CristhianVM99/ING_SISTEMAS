import React, { useEffect } from "react";
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

    //retorno del componente principal
    if (!loading_institucion) {
        return (
            <div className="main-left theme-dark">
                <Header institucion={institucion} />
                {/* End Header Section */}

                <Slider institucion={institucion} />
                {/* End Slider Section */}

                <Resume />
                {/* End Resume Section */}

                <section id="blog" className="section">
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

                {/* theme-light dark-bg */}
                <section id="blog" className="section">
                    <div className="container">
                        <div className="title">
                            <h3>Autoridades</h3>
                        </div>
                        <Autoridades institucion={institucion} />
                        {/* End About Section */}
                    </div>
                </section>
                {/* End Portfolio Section */}

                <section id="blog" className="section">
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

                <footer className="footer white">
                    <div className="container">
                        <Footer />
                    </div>
                </footer>
                {/* End Contact Section */}
            </div>
        );
    }
    return null;
};

export default Principal;

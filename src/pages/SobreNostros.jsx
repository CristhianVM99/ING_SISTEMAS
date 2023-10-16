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

const SobreNosotros = () => {
    // obtención de la información sobre la carrera
    const { isLoading: loading_institucion, data: institucion } = useQuery({
        queryKey: ["institucion"],
        queryFn: getInstitucion,
    });
    //configuracion del icono y logo de la pagina
    useEffect(() => {
        institucion && ConfigColorIcon(institucion, "SOBRE NOSOTROS");
    }, [institucion]);
    return (
        <div className="main-left theme-dark">
            <Header institucion={institucion} />
            {/* End Header Section */}

            <Slider title={`Sobre Nosotros`} institucion={institucion} />
            {/* End Slider Section */}

            <About institucion={institucion} />
            {/* End About Section */}

            <footer className="footer white">
                <div className="container">
                    <Footer institucion={institucion} />
                </div>
            </footer>
            {/* End Contact Section */}
        </div>
    );
};

export default SobreNosotros;

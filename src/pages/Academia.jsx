import React, { useEffect } from "react";
import Header from "../components/header/HeaderTwo";
import Slider from "../components/slider/SliderAnimation";
import About from "../components/about/About";
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

const Academia = () => {
    // obtención de la información sobre la carrera
    const { isLoading: loading_institucion, data: institucion } = useQuery({
        queryKey: ["institucion"],
        queryFn: getInstitucion,
    });
    //configuracion del icono y logo de la pagina
    useEffect(() => {
        institucion && ConfigColorIcon(institucion, "ACADEMIA");
    }, [institucion]);
    const { categoria } = useParams();
    return (
        <div className="main-left theme-dark">
            <Header institucion={institucion} />
            {/* End Header Section */}

            <Slider title={categoria} institucion={institucion} />
            {/* End Slider Section */}

            <About categoria={categoria} institucion={institucion} />
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

export default Academia;

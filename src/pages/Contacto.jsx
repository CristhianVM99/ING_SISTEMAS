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
import { getInstitucion } from "../api/institucionAPI";
import { useQuery } from "@tanstack/react-query";
import ConfigColorIcon from "../utils/ConfigColorIcon";

const Contacto = () => {
    // obtención de la información sobre la carrera
    const { isLoading: loading_institucion, data: institucion } = useQuery({
        queryKey: ["institucion"],
        queryFn: getInstitucion,
    });
    //configuracion del icono y logo de la pagina
    useEffect(() => {
        institucion && ConfigColorIcon(institucion, "CONTACTO");
    }, [institucion]);
    return (
        <div className="main-left theme-dark">
            <Header institucion={institucion} />
            {/* End Header Section */}

            <Slider title={`Contacto`} institucion={institucion} />
            {/* End Slider Section */}

            <section id="contactus" className="section theme-light dark-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-xl-4 m-15px-tb">
                            <ContactInfo institucion={institucion} />
                        </div>
                        {/* End Contact info */}

                        <div className="col-lg-7 col-xl-8 m-15px-tb">
                            <Map institucion={institucion} />
                            {/* End google-map */}
                        </div>
                        {/* End Col */}
                    </div>
                </div>
            </section>
            {/* End Contact Section */}

            <footer className="footer white">
                <div className="container">
                    <Footer />
                </div>
            </footer>
            {/* End Contact Section */}
        </div>
    );
};

export default Contacto;

import React, { useEffect } from "react";
import Header from "../components/header/HeaderTwo";
import Slider from "../components/slider/SliderAnimation";
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
    useEffect(() => {
        //configuracion del icono y logo de la pagina
        institucion && ConfigColorIcon(institucion, "CONTACTO");
    }, [institucion]);

    if (!loading_institucion) {
        return (
            <div className="main-left theme-dark">
                {/* HEADER --------------------------------------- */}
                <Header institucion={institucion} />

                {/* SLIDER --------------------------------------- */}
                <Slider title={`CONTACTO`} institucion={institucion} />

                {/* INFORMACIÓN DEL CONTACTO ----------------------*/}
                <section id="contactus" className="section theme-light dark-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-xl-4 m-15px-tb">
                                <ContactInfo institucion={institucion} />
                            </div>
                            <div className="col-lg-7 col-xl-8 m-15px-tb">
                                <Map institucion={institucion} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FOOTER ---------------------------------------- */}
                <footer className="footer white">
                    <div className="container">
                        <Footer institucion={institucion} />
                    </div>
                </footer>
            </div>
        );
    }
    return null;
};

export default Contacto;

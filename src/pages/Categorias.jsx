import React, { useEffect } from "react";
import Header from "../components/header/HeaderTwo";
import Slider from "../components/slider/SliderAnimation";
import Portfolio from "../components/portfolio/PortfolioAnimation";
import Footer from "../components/footer/FooterAnimation";
import { getInstitucion } from "../api/institucionAPI";
import { useQuery } from "@tanstack/react-query";
import ConfigColorIcon from "../utils/ConfigColorIcon";

const Categorias = () => {
    // obtención de la información sobre la carrera
    const { isLoading: loading_institucion, data: institucion } = useQuery({
        queryKey: ["institucion"],
        queryFn: getInstitucion,
    });

    useEffect(() => {
        //configuracion del icono y logo de la pagina
        institucion && ConfigColorIcon(institucion, "CATEGORÍAS");
    }, [institucion]);

    if (!loading_institucion) {
        return (
            <div className="main-left theme-dark">
                {/* HEADER ----------------------------------------- */}
                <Header institucion={institucion} />

                {/* SLIDER ----------------------------------------- */}
                <Slider title={`Categorias`} institucion={institucion} />

                {/* CATEGORIAS ------------------------------------- */}
                <section id="work" className="section theme-light dark-bg">
                    <div className="container">
                        <div className="title">
                            <h3>Categorias</h3>
                        </div>
                        <Portfolio institucion={institucion} />
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

export default Categorias;

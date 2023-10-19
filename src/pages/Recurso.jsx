import React, { useEffect } from "react";
import Header from "../components/header/HeaderTwo";
import Slider from "../components/slider/SliderAnimation";
import Blog from "../components/blog/BlogAnimation";
import Footer from "../components/footer/FooterAnimation";
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

    useEffect(() => {
        //configuracion del icono y logo de la pagina
        institucion && ConfigColorIcon(institucion, "RECURSOS");
    }, [institucion]);

    if (!loading_institucion) {
        return (
            <div className="main-left theme-dark">
                {/* HEADER -------------------------------------------- */}
                <Header institucion={institucion} />

                {/* SLIDER -------------------------------------------- */}
                <Slider
                    title={
                        categoria.toUpperCase() === TIPOS.OFERTAS_ACADEMICAS
                            ? "OFERTAS ACADÉMICAS"
                            : categoria.toUpperCase()
                    }
                    institucion={institucion}
                />

                {/* RECURSO --------------------------------------------- */}
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

                {/* FOOTER ----------------------------------------------- */}
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

export default Recurso;

import React, { useEffect } from "react";
import Header from "../components/header/HeaderTwo";
import Slider from "../components/slider/SliderAnimation";
import Portfolio from "../components/portfolio/Portfolio";
import Footer from "../components/footer/FooterAnimation";
import { getInstitucion } from "../api/institucionAPI";
import { useQuery } from "@tanstack/react-query";
import ConfigColorIcon from "../utils/ConfigColorIcon";
import { useParams } from "react-router-dom";
import { TIPOS } from "../types/types";
import Blog from "../components/blog/BlogAnimation";

const Instituto = () => {
    // obtención de la información sobre la carrera
    const { isLoading: loading_institucion, data: institucion } = useQuery({
        queryKey: ["institucion"],
        queryFn: getInstitucion,
    });

    // obtenemos el parámetro de la URL
    const { categoria } = useParams();

    useEffect(() => {
        //configuracion del icono y logo de la pagina
        institucion && ConfigColorIcon(institucion, "INSTITUTO");
    }, [institucion]);

    if (!loading_institucion) {
        return (
            <div className="main-left theme-dark">
                {/* HEADER -------------------------------------- */}
                <Header institucion={institucion} />

                {/* SLIDER -------------------------------------- */}
                <Slider title={categoria} institucion={institucion} />

                {/* INSTITUCION --------------------------------- */}
                <section id="work" className="section theme-light dark-bg">
                    <div className="container">
                        <div className="title">
                            <h3>{categoria}</h3>
                        </div>
                        <Portfolio
                            categoria={categoria}
                            institucion={institucion}
                        />
                    </div>
                </section>

                {/* RECURSO --------------------------------------------- */}
                {categoria === TIPOS.INSTITUTO ? (
                    <section id="blog" className="section">
                        <div className="container">
                            <div className="title">
                                <h3>
                                    Las Ultimas Publicaciones del{" "}
                                    {categoria === TIPOS.INSTITUTO
                                        ? "INSTITUTO DE INVESTIGACION"
                                        : null}
                                </h3>
                            </div>
                            <Blog
                                categoria={categoria}
                                institucion={institucion}
                            />
                        </div>
                    </section>
                ) : null}

                {/* FOOTER --------------------------------------- */}
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

export default Instituto;

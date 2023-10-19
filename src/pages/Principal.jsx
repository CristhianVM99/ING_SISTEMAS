import React, { useEffect, useState } from "react";
import Header from "../components/header/HeaderTwo";
import Slider from "../components/slider/SliderThree";
import Blog from "../components/blog/Blog";
import Footer from "../components/footer/Footer";
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
import SinRegistros from "../components/SinRegistros";

const Principal = () => {
    // obtención de la información sobre la carrera
    const { isLoading: loading_institucion, data: institucion } = useQuery({
        queryKey: ["institucion"],
        queryFn: getInstitucion,
    });
    const [mostrarMiComponente, setMostrarMiComponente] = useState(true);

    useEffect(() => {
        //configuracion del icono y logo de la pagina
        institucion && ConfigColorIcon(institucion, "PRINCIPAL");

        //temporizador del loader
        const timer = setTimeout(() => {
            setMostrarMiComponente(false);
        }, 1000); // 3000 milisegundos (3 segundos)

        // Limpieza del temporizador al desmontar el componente
        return () => clearTimeout(timer);
    }, [institucion]);

    //retorno del componente principal
    if (!loading_institucion) {
        // imagen generada randomicamente
        const img = RandomImage(institucion.portada);
        return (
            <>
                <div className="main-left theme-dark">
                    {/* HEADER ---------------------------- */}
                    <Header institucion={institucion} />
                    {/* SLIDER PRINCIPAL ------------------ */}
                    <Slider institucion={institucion} />

                    {/* LOADER ---------------------------- */}
                    {mostrarMiComponente && <Loader />}

                    {/* AUTORIDADES ----------------------- */}
                    <section className="section">
                        <RedesAnimation t="auto" r="auto" b="-50px" l="-50px" />
                        <RedesAnimation t="0px" r="0px" b="auto" l="auto" />
                        <div className="container">
                            <div className="title">
                                <h3>Autoridades</h3>
                            </div>
                            <Autoridades institucion={institucion} />
                        </div>
                    </section>

                    {/* IMAGEN INTERMEDIA ----------------- */}
                    <ImageIntermedio img={img} />

                    {/* CONVOCATORIAS - COMUNICADOS - AVISOS ----------- */}
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

                    {/* CURSOS - SEMINARIOS ----------------------------- */}
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

                    {/* ENLACES VIRTUALES ------------------------------- */}
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

                    {/* IMAGEN INTERMEDIO ------------------ */}
                    <ImageIntermedio img={img} />

                    {/* FOOTER ----------------------------- */}
                    <footer className="footer white">
                        <div className="container">
                            <Footer institucion={institucion} />
                        </div>
                    </footer>
                </div>
            </>
        );
    }
    return null;
};

export default Principal;

import React, { useEffect } from "react";
import Header from "../components/header/HeaderTwo";
import Slider from "../components/slider/SliderAnimation";
import About from "../components/about/About";
import Footer from "../components/footer/FooterAnimation";
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

    useEffect(() => {
        //configuracion del icono y logo de la pagina
        institucion && ConfigColorIcon(institucion, "ACADEMIA");
    }, [institucion]);

    //obtenemos el parametro de la URL
    const { categoria } = useParams();

    return (
        <div className="main-left theme-dark">
            {/* HEADER -------------------------------------- */}
            <Header institucion={institucion} />

            {/* SLIDER -------------------------------------- */}
            <Slider title={categoria} institucion={institucion} />

            {/* SOBRE LA ACADEMIA --------------------------- */}
            <About categoria={categoria} institucion={institucion} />

            {/* FOOTER -------------------------------------- */}
            <footer className="footer white">
                <div className="container">
                    <Footer institucion={institucion} />
                </div>
            </footer>
        </div>
    );
};

export default Academia;

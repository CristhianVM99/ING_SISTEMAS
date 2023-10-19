import React, { useEffect } from "react";
import Header from "../components/header/HeaderTwo";
import Slider from "../components/slider/SliderAnimation";
import About from "../components/about/AboutAnimation";
import Footer from "../components/footer/FooterAnimation";
import { getInstitucion } from "../api/institucionAPI";
import { useQuery } from "@tanstack/react-query";
import ConfigColorIcon from "../utils/ConfigColorIcon";

const SobreNosotros = () => {
    // obtención de la información sobre la carrera
    const { isLoading: loading_institucion, data: institucion } = useQuery({
        queryKey: ["institucion"],
        queryFn: getInstitucion,
    });

    useEffect(() => {
        //configuracion del icono y logo de la pagina
        institucion && ConfigColorIcon(institucion, "SOBRE NOSOTROS");
    }, [institucion]);

    if (!loading_institucion) {
        return (
            <div className="main-left theme-dark">
                {/* HEADER -------------------------------------------- */}
                <Header institucion={institucion} />

                {/* SALIDER ------------------------------------------- */}
                <Slider title={`SOBRE NOSOTROS`} institucion={institucion} />

                {/* DATOS DE LA INSTITUCION --------------------------- */}
                <About institucion={institucion} />

                {/* FOOTER -------------------------------------------- */}
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

export default SobreNosotros;

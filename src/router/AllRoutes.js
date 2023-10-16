import React from "react";
import Preview from "../views/Preview";
import LightProfessionalAnimation from "../views/all-home-version/LightProfessionalAnimation";
import HomeLightProfessional2 from "../views/all-home-version/HomeLightProfessional2";
import HomeLightAnimation from "../views/all-home-version/HomeLightAnimation";
import HomeLightRtlAnimation from "../views/all-home-version/HomeLightRtlAnimation";
import HomeDarkParticles from "../views/all-home-version/HomeDarkParticles";
import HomeDarkAnimation from "../views/all-home-version/HomeDarkAnimation";
import NotFound from "../views/NotFound";
import { Routes, Route } from "react-router-dom";
import ScrollTopBehaviour from "../components/ScrollTopBehaviour";
import Principal from "../pages/Principal";
import SobreNosotros from "../pages/SobreNostros";
import Contacto from "../pages/Contacto";
import Instituto from "../pages/Instituto";
import Academia from "../pages/Academia";
import Recurso from "../pages/Recurso";
import Detalle from "../pages/Detalle";
import Categorias from "../pages/Categorias";

const AllRoutes = () => {
    return (
        <>
            <ScrollTopBehaviour />
            <Routes>
                <Route path="/" element={<Principal />} />
                <Route path="/SobreNosotros" element={<SobreNosotros />} />
                <Route path="/Contacto" element={<Contacto />} />
                <Route path="/Instituto/:categoria" element={<Instituto />} />
                <Route path="/Academia/:categoria" element={<Academia />} />
                <Route path="/Recurso/:categoria" element={<Recurso />} />
                <Route path="/Detalle" element={<Detalle />} />
                <Route path="/Categorias" element={<Categorias />} />
                <Route
                    path="/home-light-animation"
                    element={<HomeLightAnimation />}
                />
                <Route
                    path="/home-light-rtl-animation"
                    element={<HomeLightRtlAnimation />}
                />
                <Route
                    path="/dark-particle-effect"
                    element={<HomeDarkParticles />}
                />
                <Route
                    path="/home-light-professional"
                    element={<LightProfessionalAnimation />}
                />
                <Route
                    path="/home-light-professional-2"
                    element={<HomeLightProfessional2 />}
                />
                <Route
                    path="/home-dark-animation"
                    element={<HomeDarkAnimation />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default AllRoutes;

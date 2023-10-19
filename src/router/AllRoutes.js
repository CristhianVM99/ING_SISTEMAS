import React from "react";
import NotFound from "../views/NotFound";
import { Routes, Route } from "react-router-dom";
import ScrollTopBehaviour from "../components/ScrollTopBehaviour";
import Principal from "../pages/Principal";
import SobreNosotros from "../pages/SobreNostros";
import Contacto from "../pages/Contacto";
import Instituto from "../pages/Instituto";
import Academia from "../pages/Academia";
import Recurso from "../pages/Recurso";
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
                <Route path="/Categorias" element={<Categorias />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default AllRoutes;

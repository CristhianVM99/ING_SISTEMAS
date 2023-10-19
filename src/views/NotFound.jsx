import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import useDocumentTitle from "../components/useDocumentTitle";
import { getInstitucion } from "../api/institucionAPI";
import { useQuery } from "@tanstack/react-query";

const NotFound = () => {
    useDocumentTitle("Not Found || React Personal Portfolio Template");
    // obtención de la información sobre la carrera
    const { isLoading: loading_institucion, data: institucion } = useQuery({
        queryKey: ["institucion"],
        queryFn: getInstitucion,
    });
    if (!loading_institucion) {
        return (
            <>
                <section className="error-page-wrapper">
                    <div className="container">
                        <div className="row justify-content-center full-screen align-items-center">
                            <div className="col-lg-8 text-center">
                                <div className="inner">
                                    <h1 className="display-3 white-color m-15px-b">
                                        404 - Pagina no encontrada
                                    </h1>
                                    <p className="h4">
                                        tuvimos un error en la URL, inténtelo
                                        mas tarde o vuelva a la pagina principal
                                    </p>
                                    <div className="btn-bar mt-4">
                                        <Link
                                            className="px-btn px-btn-white"
                                            to="/"
                                        >
                                            VOLVER PAGINA PRINCIPAL
                                        </Link>
                                        {/* End purchase_button */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Error Page Wrapper */}

                {/* Footer */}
                <footer className="footer white">
                    <div className="container">
                        <Footer institucion={institucion} />
                    </div>
                </footer>
                {/* End footer */}
            </>
        );
    }
    return null;
};

export default NotFound;

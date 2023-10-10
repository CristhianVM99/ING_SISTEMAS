import React from "react";
import { getLinksInstExtAll } from "../../api/institucionAPI";
import { useQuery } from "@tanstack/react-query";
import { TIPOS } from "../../types/types";

const Awards = ({ institucion = null }) => {
    /* OBTENCION DE INFORMACON DE LINKS EXTERNOS */
    const { isLoading: loading_links_externos, data: links } = useQuery({
        queryKey: ["links_externos"],
        queryFn: getLinksInstExtAll,
    });
    if (institucion && !loading_links_externos) {
        const { institucion_nombre } = institucion;

        /* filtración de links de la carrera */
        const links_filter = links.filter((e) => e.ei_tipo === TIPOS.KARDEX);

        return (
            <>
                <div className="row">
                    {links_filter.map((link, index) => (
                        <div
                            className="col-lg-4 m-15px-tb"
                            key={index}
                            data-aos="fade-right"
                            data-aos-duration="1200"
                            data-aos-delay={"300"}
                        >
                            <div className="feature-box-02 d-flex align-items-center">
                                <div className="icon">
                                    <a
                                        href={link.ei_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={`${process.env.REACT_APP_ROOT_API}/InstitucionUpea/LinksExternos/${link.ei_imagen}`}
                                            alt="link"
                                        />
                                    </a>
                                </div>
                                <div className="media-body">
                                    <a
                                        href={link.ei_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <h6>{link.ei_nombre}</h6>
                                    </a>
                                    <a
                                        href={link.ei_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <p>{institucion_nombre}</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        // End .col
                    ))}
                </div>
                {/* End .row */}
            </>
        );
    }
    return null;
};

export default Awards;

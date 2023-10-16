import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const FooterAnimation = ({ institucion = null }) => {
    if (institucion) {
        /* DATOS DE LA INSTITUCION */
        const {
            institucion_nombre,
            institucion_facebook,
            institucion_youtube,
            institucion_twitter,
        } = institucion;

        const SocialShare = [
            { Social: <FaFacebookF />, link: institucion_facebook },
            { Social: <FaTwitter />, link: institucion_twitter },
            { Social: <FaYoutube />, link: institucion_youtube },
        ];

        return (
            <>
                <div className="row align-items-center">
                    <div className="col-md-6 my-2">
                        <div className="nav justify-content-center justify-content-md-start">
                            <span style={{ paddingRight: "20px" }}>
                                {institucion_nombre}
                            </span>
                            {SocialShare.map((val, i) => (
                                <a
                                    key={i}
                                    href={`${val.link}`}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    {val.Social}
                                </a>
                            ))}
                        </div>
                        {/* End .nav */}
                    </div>
                    {/* End .col */}

                    <div className="col-md-6 my-2 text-center text-md-end">
                        <p>
                            <span className="copyrights-text">
                                © Universidad Pública de El Alto{" "}
                                {new Date().getFullYear()} - Todos los derechos
                                reservados.
                                <br />
                                web developer{" "}
                                <a
                                    href="https://www.linkedin.com/in/cristhian-vm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#00B4DB" }}
                                >
                                    by CristhianVM
                                </a>{" "}
                                |{" "}
                                <a
                                    href="https://sie.upea.bo/l"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#F9BF26" }}
                                >
                                    SIE{" "}
                                </a>{" "}
                            </span>
                        </p>
                    </div>
                    {/* End .col */}
                </div>
                {/* End .row */}
            </>
        );
    }
    return null;
};

export default FooterAnimation;

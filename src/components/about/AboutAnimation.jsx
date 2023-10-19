import React from "react";
import Social from "../Social";
import Services from "../service/ServiceAnimation";
import Awards from "../award/AwardsAnimation";

const About = ({ institucion = null }) => {
    if (institucion) {
        const {
            institucion_mision,
            institucion_vision,
            institucion_objetivos,
            institucion_historia,
            institucion_nombre,
            institucion_iniciales,
            institucion_logo,
            institucion_direccion,
            institucion_celular1,
            institucion_celular2,
            institucion_correo1,
            institucion_correo2,
            institucion_telefono1,
            institucion_telefono2,
        } = institucion;
        return (
            <>
                <section id="about" className="section theme-light dark-bg">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div
                                className="col-md-6 col-lg-4"
                                data-aos="fade-up"
                                data-aos-duration="1200"
                            >
                                <div className="about-me">
                                    <div className="img">
                                        <div
                                            className="img-in"
                                            style={{
                                                boxShadow:
                                                    "0px 0px 15px rgba(0,0,0,.5)",
                                            }}
                                        >
                                            <img
                                                src={`${process.env.REACT_APP_ROOT_API}/InstitucionUpea/${institucion_logo}`}
                                                alt="about"
                                            />
                                        </div>

                                        <Social />

                                        {/* End social icon */}
                                    </div>
                                    {/* End img */}
                                    <div className="info">
                                        <p style={{ fontSize: "1.5em" }}>
                                            - {institucion_iniciales} -
                                        </p>
                                        <h3
                                            style={{
                                                textShadow:
                                                    "0px 0px 15px rgba(0,0,0,.5)",
                                                fontSize: "3em",
                                            }}
                                        >
                                            {institucion_nombre}
                                        </h3>
                                    </div>
                                    {/* End info */}
                                </div>
                                {/* End about-me */}
                            </div>
                            {/* End col */}

                            <div
                                className="col-lg-7 ml-auto"
                                data-aos="fade-up"
                                data-aos-duration="1200"
                                data-aos-delay="200"
                            >
                                <div className="about-info">
                                    <div className="title">
                                        <h3>
                                            Historia de {institucion_nombre}
                                        </h3>
                                    </div>

                                    <div
                                        className="about-text"
                                        style={{
                                            background: "rgba(0,0,0,.5)",
                                            padding: "20px",
                                            borderRadius: "20px",
                                            boxShadow:
                                                "-5px 5px 10px var(--color-secundario)",
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: institucion_historia,
                                        }}
                                    ></div>
                                    <div className="info-list">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <ul>
                                                    <li>
                                                        <label>
                                                            Dirección:{" "}
                                                        </label>
                                                        <span>
                                                            {
                                                                institucion_direccion
                                                            }
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            Teléfono 1:{" "}
                                                        </label>
                                                        <span>
                                                            <a
                                                                href={`tel:+${institucion_telefono1}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    color: "#ffff",
                                                                }}
                                                            >
                                                                {
                                                                    institucion_telefono1
                                                                }
                                                            </a>
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            Teléfono 2:{" "}
                                                        </label>
                                                        <span>
                                                            <a
                                                                href={`tel:+${institucion_telefono2}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    color: "#ffff",
                                                                }}
                                                            >
                                                                {
                                                                    institucion_telefono2
                                                                }
                                                            </a>
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-sm-6">
                                                <ul>
                                                    <li>
                                                        <label>
                                                            Celular 1:{" "}
                                                        </label>
                                                        <span>
                                                            <a
                                                                href={`tel:+591${institucion_celular1}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    color: "#ffff",
                                                                }}
                                                            >
                                                                (+591){" "}
                                                                {
                                                                    institucion_celular1
                                                                }
                                                            </a>
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            Celular 2:{" "}
                                                        </label>
                                                        <span>
                                                            <a
                                                                href={`tel:+591${institucion_celular2}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    color: "#ffff",
                                                                }}
                                                            >
                                                                (+591){" "}
                                                                {
                                                                    institucion_celular2
                                                                }
                                                            </a>
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            Correo 1:{" "}
                                                        </label>
                                                        <span>
                                                            <a
                                                                href={`mailto:${institucion_correo1}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    color: "#ffff",
                                                                }}
                                                            >
                                                                {
                                                                    institucion_correo1
                                                                }
                                                            </a>
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            Correo 2:{" "}
                                                        </label>
                                                        <span>
                                                            <a
                                                                href={`mailto:${institucion_correo2}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    color: "#ffff",
                                                                }}
                                                            >
                                                                {
                                                                    institucion_correo2
                                                                }
                                                            </a>
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End col */}
                        </div>

                        {/* separated */}

                        <div
                            className="separated"
                            style={{
                                backgroundImage: `url(${"img/border-dark.png"})`,
                            }}
                        ></div>

                        {/* End separated */}
                        <div className="title">
                            <h3>Misión y Visión</h3>
                        </div>

                        <Services
                            mision={institucion_mision}
                            vision={institucion_vision}
                            objetivos={institucion_objetivos}
                        />

                        {/* End .row */}

                        {/* separated */}
                        <div
                            className="separated"
                            style={{
                                backgroundImage: `url(${"img/border-dark.png"})`,
                            }}
                        ></div>
                        {/* End separated */}

                        <div className="title">
                            <h3>Enlaces Virtuales</h3>
                        </div>

                        <Awards institucion={institucion} />
                        {/* End Awards */}
                    </div>
                </section>
            </>
        );
    }
    return null;
};

export default About;

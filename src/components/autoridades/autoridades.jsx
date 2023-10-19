import React from "react";
import Social from "../Social";
import SinRegistros from "../SinRegistros";

const Autoridades = ({ institucion = null }) => {
    if (institucion != null) {
        const { autoridad } = institucion;
        return (
            <>
                <section id="about" className="section">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            {autoridad.map((item, index) => (
                                <div
                                    className="col-md-6 col-lg-4"
                                    key={index}
                                    style={{
                                        border: "3px solid transparent",
                                        borderImage:
                                            "linear-gradient(45deg,var(--color-primario),transparent)",
                                        borderImageSlice: 1,
                                        paddingTop: "40px",
                                    }}
                                >
                                    <div className="about-me">
                                        <div className="img">
                                            <div className="img-in">
                                                <img
                                                    src={`${process.env.REACT_APP_ROOT_API}/InstitucionUpea/Autoridad/${item.foto_autoridad}`}
                                                    alt="about"
                                                />
                                            </div>
                                            <Social
                                                facebook={
                                                    item.facebook_autoridad
                                                }
                                                twitter={item.twiter_autoridad}
                                                celular={item.celular_autoridad}
                                            />
                                            {/* End social icon */}
                                        </div>
                                        {/* End img */}
                                        <div className="info">
                                            <p>{item.cargo_autoridad}</p>
                                            <h3>{item.nombre_autoridad}</h3>
                                        </div>
                                        {/* End info */}
                                    </div>
                                    {/* End about-me */}
                                </div>
                            ))}
                            {autoridad.length === 0 && (
                                <SinRegistros title={"autoridades"} />
                            )}
                            {/* End col */}
                        </div>
                    </div>
                </section>
            </>
        );
    }
    return null;
};

export default Autoridades;

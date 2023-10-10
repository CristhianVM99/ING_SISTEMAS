import React from "react";
import Social from "../Social";
import Testimonials from "../testimonial/Testimonial";
import Services from "../service/Service";
import Awards from "../award/AwardsAnimation";

const Autoridades = ({ institucion = null }) => {
    if (institucion != null) {
        const { autoridad, institucion_nombre } = institucion;
        return (
            <>
                <section id="about" className="section">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            {autoridad.map((item, index) => (
                                <div className="col-md-6 col-lg-4" key={index}>
                                    <div className="about-me">
                                        <div className="img">
                                            <div className="img-in">
                                                <img
                                                    src={`${process.env.REACT_APP_ROOT_API}/InstitucionUpea/Autoridad/${item.foto_autoridad}`}
                                                    alt="about"
                                                />
                                            </div>
                                            <Social />
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

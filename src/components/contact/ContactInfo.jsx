import React from "react";

const ContactInfo = ({ institucion = null }) => {
    if (institucion) {
        const {
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
                <div className="contact-info">
                    <h4>¿Quiere contactarse con nosotros?</h4>
                    <p>
                        Puedes comunicarse con a través de la siguiente
                        información
                    </p>

                    <ul>
                        <li className="media">
                            <i className="icon icon-map"></i>
                            <span className="media-body">
                                {institucion_direccion}
                            </span>
                        </li>
                        {/* End li */}

                        <li className="media">
                            <i className="icon icon-phone"></i>
                            <span className="media-body">
                                Tel : {institucion_telefono1}
                            </span>
                        </li>
                        {/* End li */}

                        <li className="media">
                            <i className="icon icon-phone"></i>
                            <span className="media-body">
                                Tel : {institucion_telefono2}
                            </span>
                        </li>
                        {/* End li */}

                        <li className="media">
                            <i className="icon icon-envelope"></i>
                            <span className="media-body">
                                Correo 1 : {institucion_correo1}
                            </span>
                        </li>
                        {/* End li */}

                        <li className="media">
                            <i className="icon icon-envelope"></i>
                            <span className="media-body">
                                Correo 2 : {institucion_correo2}
                            </span>
                        </li>
                        {/* End li */}

                        <li className="media">
                            <i className="icon icon-phone"></i>
                            <span className="media-body">
                                Cel : +591 {institucion_celular1}
                            </span>
                        </li>
                        {/* End li */}

                        <li className="media">
                            <i className="icon icon-phone"></i>
                            <span className="media-body">
                                Cel : +591 {institucion_celular2}
                            </span>
                        </li>
                        {/* End li */}
                    </ul>
                </div>
                {/* End .contact-info */}
            </>
        );
    }
    return null;
};

export default ContactInfo;

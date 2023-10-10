import React, { useState } from "react";
import Scrollspy from "react-scrollspy";
import { Link, NavLink } from "react-router-dom";
import {
    FiUser,
    FiBriefcase,
    FiFileText,
    FiPhoneOutgoing,
} from "react-icons/fi";
import { FaHome, FaBlog } from "react-icons/fa";

const HeaderTwo = ({ institucion = null }) => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    if (institucion != null) {
        const { institucion_logo } = institucion;
        return (
            <>
                {/* Header */}
                <div className="mob-header">
                    <button className="toggler-menu" onClick={handleClick}>
                        <div className={click ? "active" : ""}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
                {/* End Header */}

                {/* nav bar */}
                <header
                    className={
                        click
                            ? "header-left header-menu-style-two menu-open"
                            : "header-left header-menu-style-two"
                    }
                >
                    <div className="scroll-bar">
                        <div className="hl-top">
                            <div className="hl-logo">
                                <NavLink to={`/`}>
                                    <img
                                        width={70}
                                        src={`${process.env.REACT_APP_ROOT_API}/InstitucionUpea/${institucion_logo}`}
                                        alt="Inteshape"
                                        style={{
                                            paddingTop: "5px",
                                            paddingLeft: "5px",
                                        }}
                                    />
                                </NavLink>
                            </div>
                        </div>
                        {/* End htl-top */}

                        <Scrollspy
                            className="nav nav-menu"
                            items={[
                                "home",
                                "about",
                                "resume",
                                "work",
                                "blog",
                                "contactus",
                            ]}
                            currentClassName="active"
                            offset={-30}
                        >
                            <li>
                                <NavLink
                                    className="nav-link "
                                    to={`/`}
                                    onClick={handleClick}
                                >
                                    <FaHome />
                                    <span className="item">Principal</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="nav-link"
                                    to={`/SobreNosotros`}
                                    onClick={handleClick}
                                >
                                    <FiUser />
                                    <span className="item">Sobre Nosotros</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="nav-link"
                                    to={`/Academia`}
                                    onClick={handleClick}
                                >
                                    <FiFileText />
                                    <span className="item">Academia</span>
                                    <div className="sub-menu">
                                        <span className="item">
                                            Calendario Académico
                                        </span>
                                        {/* <span className="item">
                                            Horario Académico
                                        </span>
                                        <span className="item">
                                            Plan De Estudio
                                        </span>
                                        <span className="item">
                                            Reglamento y Modo de Graduación
                                        </span> */}
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="nav-link"
                                    to={`/Instituto`}
                                    onClick={handleClick}
                                >
                                    <FiBriefcase />
                                    <span className="item">Institucion</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="nav-link"
                                    to={`/Recurso/convocatorias`}
                                    onClick={handleClick}
                                >
                                    <FaBlog />
                                    <span
                                        className="item"
                                        style={{ fontSize: "10px" }}
                                    >
                                        Convocatorias <br />y Cursos
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="nav-link"
                                    to={`/Recurso`}
                                    onClick={handleClick}
                                >
                                    <FaBlog />
                                    <span className="item">Mas</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="nav-link"
                                    to={`/Contacto`}
                                    onClick={handleClick}
                                >
                                    <FiPhoneOutgoing />
                                    <span className="item">Contacto</span>
                                </NavLink>
                            </li>
                        </Scrollspy>
                    </div>
                </header>
                {/* End Header */}
            </>
        );
    }
    return null;
};

export default HeaderTwo;

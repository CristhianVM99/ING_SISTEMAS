import React, { useState } from "react";
import Scrollspy from "react-scrollspy";
import { Link, NavLink } from "react-router-dom";
import {
    FiUser,
    FiBriefcase,
    FiFileText,
    FiPhoneOutgoing,
} from "react-icons/fi";
import {
    FaHome,
    FaBlog,
    FaInfoCircle,
    FaQuestionCircle,
    FaGraduationCap,
    FaUniversity,
    FaBell,
    FaFileAlt,
    FaEnvelope,
    FaPlus,
    FaDesktop,
    FaLink,
    FaExternalLinkAlt,
    FaCog,
    FaBook,
    FaPaperPlane,
    FaNewspaper,
    FaCalendar,
    FaPlayCircle,
    FaTools,
    FaBriefcase,
    FaHandshake,
    FaFlask,
    FaUserTie,
    FaBullhorn,
    FaEnvelopeOpenText,
    FaExclamationCircle,
    FaChalkboardTeacher,
    FaBookOpen,
} from "react-icons/fa";
import { TIPOS } from "../../types/types";
import { getLinksInstExtAll } from "../../api/institucionAPI";
import { useQuery } from "@tanstack/react-query";

const HeaderTwo = ({ institucion = null }) => {
    /* OBTENCION DE INFORMACION DEL STORE LINKS  */
    const { isLoading: loading_links_externos, data: links } = useQuery({
        queryKey: ["links_externos"],
        queryFn: getLinksInstExtAll,
    });

    const [click, setClick] = useState(false);
    const [menuAcademia, setMenuAcademia] = useState(false);
    const [menuInstitucion, setMenuInstitucion] = useState(false);
    const [menuConvocatorias, setMenuConvocatorias] = useState(false);
    const [menuEnlaces, setMenuEnlaces] = useState(false);
    const [menuMas, setMenuMas] = useState(false);
    const handleClick = () => setClick(!click);
    const toogleSubMenuAcademia = () => {
        setMenuAcademia(!menuAcademia);
        setMenuInstitucion(false);
        setMenuConvocatorias(false);
        setMenuEnlaces(false);
        setMenuMas(false);
    };
    const toogleSubMenuInstitucion = () => {
        setMenuInstitucion(!menuInstitucion);
        setMenuConvocatorias(false);
        setMenuEnlaces(false);
        setMenuMas(false);
        setMenuAcademia(false);
    };
    const toogleSubMenuConvocatorias = () => {
        setMenuConvocatorias(!menuConvocatorias);
        setMenuInstitucion(false);
        setMenuEnlaces(false);
        setMenuMas(false);
        setMenuAcademia(false);
    };
    const toogleSubMenuMas = () => {
        setMenuMas(!menuMas);
        setMenuInstitucion(false);
        setMenuConvocatorias(false);
        setMenuEnlaces(false);
        setMenuAcademia(false);
    };
    const toogleSubMenuEnlaces = () => {
        setMenuEnlaces(!menuEnlaces);
        setMenuInstitucion(false);
        setMenuConvocatorias(false);
        setMenuMas(false);
        setMenuAcademia(false);
    };
    const resetNav = () => {
        setMenuAcademia(false);
        setMenuEnlaces(false);
        setMenuInstitucion(false);
        setMenuConvocatorias(false);
        setMenuMas(false);
        setMenuAcademia(false);
    };

    if (institucion && !loading_links_externos) {
        /* TIPADO PARA LA FILTRACION PARA LOS LINKS QUE PERTENCEN AL NAV CON EL NOMBRE DE KARDEX */
        const TIPO_LINK = {
            KARDEX: "KARDEX",
            BIBLIOTECA: "BIBLIOTECA",
        };

        /* FILTRADO DE LINKS QUE TENGAN EL TIPO 'KARDEX' y 'BIBLIOTECA' */
        const links_filter = links.filter(
            (e) => e.ei_tipo === TIPO_LINK.KARDEX
        );
        const links_biblioteca = links.filter(
            (e) => e.ei_tipo === TIPO_LINK.BIBLIOTECA
        );

        const virtual = [...links_filter, ...links_biblioteca];

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
                                <NavLink to={`/`} onClick={resetNav}>
                                    <img
                                        width={70}
                                        src={`${process.env.REACT_APP_ROOT_API}/InstitucionUpea/${institucion_logo}`}
                                        alt="Inteshape"
                                        style={{
                                            paddingTop: "0px",
                                            paddingLeft: "0px",
                                        }}
                                    />
                                </NavLink>
                            </div>
                        </div>
                        {/* End htl-top */}

                        <nav className="nav nav-menu">
                            <li>
                                <NavLink
                                    className="nav-link "
                                    to={`/`}
                                    onClick={resetNav}
                                >
                                    <FaHome />
                                    <span className="item">Principal</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="nav-link"
                                    to={`/SobreNosotros`}
                                    onClick={resetNav}
                                >
                                    <FaQuestionCircle />
                                    <span
                                        className="item"
                                        style={{ fontSize: "10px" }}
                                    >
                                        Sobre Nosotros
                                    </span>
                                </NavLink>
                            </li>
                            <li>
                                <span
                                    className="nav-link"
                                    style={{ cursor: "pointer" }}
                                    onClick={toogleSubMenuAcademia}
                                >
                                    <FaGraduationCap />
                                    <span className="item">Academia</span>
                                    {menuAcademia && (
                                        <div className="sub-menu">
                                            <NavLink
                                                className="nav-link"
                                                to={`/Academia/${TIPOS.CALENDARIO}`}
                                            >
                                                <FiFileText />
                                                <span className="item">
                                                    Calendario Académico
                                                </span>
                                            </NavLink>
                                            <NavLink
                                                className="nav-link"
                                                to={`/Academia/${TIPOS.HORARIO}`}
                                            >
                                                <FiFileText />
                                                <span className="item">
                                                    Horario Académico
                                                </span>
                                            </NavLink>
                                            <NavLink
                                                className="nav-link"
                                                to={`/Academia/${TIPOS.PLANESTUDIO}`}
                                            >
                                                <FiFileText />
                                                <span className="item">
                                                    Plan de Estudio
                                                </span>
                                            </NavLink>
                                            <NavLink
                                                className="nav-link"
                                                to={`/Academia/${TIPOS.REGLAMENTO}`}
                                            >
                                                <FiFileText />
                                                <span className="item">
                                                    Reglamento y Mod. de
                                                    Graduacion
                                                </span>
                                            </NavLink>
                                        </div>
                                    )}
                                </span>
                            </li>
                            <li>
                                <span
                                    className="nav-link"
                                    onClick={toogleSubMenuInstitucion}
                                    style={{ cursor: "pointer" }}
                                >
                                    <FaUniversity />
                                    <span className="item">Institucion</span>
                                    {menuInstitucion && (
                                        <div className="sub-menu">
                                            <NavLink
                                                className="nav-link"
                                                to={`/Instituto/${TIPOS.PASANTIAS}`}
                                            >
                                                <FaUserTie />
                                                <span className="item">
                                                    Pasantías
                                                </span>
                                            </NavLink>
                                            <NavLink
                                                className="nav-link"
                                                to={`/Instituto/${TIPOS.CONVENIOS}`}
                                            >
                                                <FaHandshake />
                                                <span className="item">
                                                    Convenios
                                                </span>
                                            </NavLink>
                                            <NavLink
                                                className="nav-link"
                                                to={`/Instituto/${TIPOS.TRABAJOS}`}
                                            >
                                                <FaBriefcase />
                                                <span className="item">
                                                    Trabajos Dirigidos
                                                </span>
                                            </NavLink>
                                            <NavLink
                                                className="nav-link"
                                                to={`/Instituto/${TIPOS.INSTITUTO}`}
                                            >
                                                <FaFlask />
                                                <span className="item">
                                                    Instituto de Investigación
                                                </span>
                                            </NavLink>
                                        </div>
                                    )}
                                </span>
                            </li>
                            <li>
                                <span
                                    className="nav-link"
                                    onClick={toogleSubMenuConvocatorias}
                                    style={{ cursor: "pointer" }}
                                >
                                    <FaFileAlt />
                                    <span
                                        className="item"
                                        style={{ fontSize: "10px" }}
                                    >
                                        Convocatorias, Comunicados y Avisos
                                    </span>
                                    {menuConvocatorias && (
                                        <div className="sub-menu">
                                            <NavLink
                                                className="nav-link"
                                                to={`/Recurso/${TIPOS.CONVOCATORIAS}`}
                                            >
                                                <FaBullhorn />
                                                <span className="item">
                                                    Convocatorias
                                                </span>
                                            </NavLink>
                                            <NavLink
                                                className="nav-link"
                                                to={`/Recurso/${TIPOS.COMUNICADOS}`}
                                            >
                                                <FaEnvelopeOpenText />
                                                <span className="item">
                                                    Comunicados
                                                </span>
                                            </NavLink>
                                            <NavLink
                                                className="nav-link"
                                                to={`/Recurso/${TIPOS.AVISOS}`}
                                            >
                                                <FaExclamationCircle />
                                                <span className="item">
                                                    Avisos
                                                </span>
                                            </NavLink>
                                            <NavLink
                                                className="nav-link"
                                                to={`/Recurso/${TIPOS.CURSOS}`}
                                            >
                                                <FaGraduationCap />
                                                <span className="item">
                                                    Cursos
                                                </span>
                                            </NavLink>
                                            <NavLink
                                                className="nav-link"
                                                to={`/Recurso/${TIPOS.SEMINARIOS}`}
                                            >
                                                <FaChalkboardTeacher />
                                                <span className="item">
                                                    Seminarios
                                                </span>
                                            </NavLink>
                                        </div>
                                    )}
                                </span>
                            </li>
                            <li>
                                <span
                                    className="nav-link"
                                    onClick={toogleSubMenuMas}
                                    style={{ cursor: "pointer" }}
                                >
                                    <FaPlus />
                                    <span
                                        className="item"
                                        style={{ fontSize: "10px" }}
                                    >
                                        Mas
                                    </span>
                                    {menuMas && (
                                        <div
                                            className="sub-menu"
                                            style={{ top: "-50%" }}
                                        >
                                            <NavLink
                                                className="nav-link"
                                                to={`/Recurso/${TIPOS.SERVICIOS}`}
                                            >
                                                <FaTools />
                                                <span className="item">
                                                    Servicios
                                                </span>
                                            </NavLink>
                                            <NavLink
                                                className="nav-link"
                                                to={`/Recurso/${TIPOS.OFERTAS_ACADEMICAS}`}
                                            >
                                                <FaBook />
                                                <span className="item">
                                                    Ofertas Académicas
                                                </span>
                                            </NavLink>
                                            <NavLink
                                                className="nav-link"
                                                to={`/Recurso/${TIPOS.PUBLICACIONES}`}
                                            >
                                                <FaPaperPlane />
                                                <span className="item">
                                                    Publicaciones
                                                </span>
                                            </NavLink>
                                            <NavLink
                                                className="nav-link"
                                                to={`/Recurso/${TIPOS.GACETAS}`}
                                            >
                                                <FaNewspaper />
                                                <span className="item">
                                                    Gacetas
                                                </span>
                                            </NavLink>
                                            <NavLink
                                                className="nav-link"
                                                to={`/Recurso/${TIPOS.EVENTOS}`}
                                            >
                                                <FaCalendar />
                                                <span className="item">
                                                    Eventos
                                                </span>
                                            </NavLink>
                                            <NavLink
                                                className="nav-link"
                                                to={`/Recurso/${TIPOS.VIDEOS}`}
                                            >
                                                <FaPlayCircle />
                                                <span className="item">
                                                    Videos
                                                </span>
                                            </NavLink>
                                        </div>
                                    )}
                                </span>
                            </li>
                            <li>
                                <span
                                    className="nav-link"
                                    onClick={toogleSubMenuEnlaces}
                                    style={{ cursor: "pointer" }}
                                >
                                    <FaDesktop />
                                    <span
                                        className="item"
                                        style={{ fontSize: "10px" }}
                                    >
                                        Virtual
                                    </span>
                                    {menuEnlaces && (
                                        <div
                                            className="sub-menu"
                                            style={{ top: "-150%" }}
                                        >
                                            {virtual.length > 0 ? (
                                                virtual.map((item, index) => (
                                                    <a
                                                        className="nav-link"
                                                        href={item.ei_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        key={index}
                                                    >
                                                        {item.ei_nombre
                                                            .toLowerCase()
                                                            .includes(
                                                                "biblioteca"
                                                            ) ? (
                                                            <FaBookOpen />
                                                        ) : (
                                                            <FaLink />
                                                        )}
                                                        <span className="item">
                                                            {item.ei_nombre}
                                                        </span>
                                                    </a>
                                                ))
                                            ) : (
                                                <NavLink
                                                    className="nav-link"
                                                    to="#"
                                                >
                                                    <FaExternalLinkAlt />
                                                    <span className="item">
                                                        Sin Enlaces
                                                    </span>
                                                </NavLink>
                                            )}
                                        </div>
                                    )}
                                </span>
                            </li>
                            <li>
                                <NavLink
                                    className="nav-link"
                                    to={`/Contacto`}
                                    onClick={resetNav}
                                >
                                    <FaEnvelope />
                                    <span className="item">Contacto</span>
                                </NavLink>
                            </li>
                        </nav>
                    </div>
                </header>
                {/* End Header */}
            </>
        );
    }
    return null;
};

export default HeaderTwo;

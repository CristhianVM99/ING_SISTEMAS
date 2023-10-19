import React, { useState } from "react";
import Modal from "react-modal";
import { TIPOS } from "../../types/types";
import { getConvocatorias, getCursos } from "../../api/institucionAPI";
import { useQuery } from "@tanstack/react-query";
import BlogNav from "./BlogNav";
import SinRegistros from "../SinRegistros";

Modal.setAppElement("#root");

const Blog = ({ categoria, institucion = null }) => {
    /* OBTENCION DE INFORMACION DEL STORE CONVOCATORIAS */
    const { isLoading: loading_convocatorias, data: convocatorias } = useQuery({
        queryKey: ["convocatorias"],
        queryFn: getConvocatorias,
    });

    /* OBTENCION DE INFORMACION DEL STORE CURSO */
    const { isLoading: loading_cursos, data: cursos } = useQuery({
        queryKey: ["cursos"],
        queryFn: getCursos,
    });

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);

    function toggleModalOne() {
        setIsOpen(!isOpen);
    }
    function toggleModalTwo() {
        setIsOpen2(!isOpen2);
    }
    function toggleModalThree() {
        setIsOpen3(!isOpen3);
    }

    function formatearFecha(fechaString) {
        const fecha = new Date(fechaString);

        const meses = [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre",
        ];

        const día = fecha.getDate();
        const mes = meses[fecha.getMonth()];
        const año = fecha.getFullYear();

        return `${día} de ${mes} de ${año}`;
    }

    function convertirHora(hora24) {
        const [hora, minutos] = hora24.split(":");
        const horaNum = parseInt(hora, 10);
        const periodo = horaNum >= 12 ? "PM" : "AM";
        const hora12 =
            horaNum > 12 ? horaNum - 12 : horaNum === 0 ? 12 : horaNum;
        const horaFormateada = `${hora12}:${minutos} ${periodo}`;
        return horaFormateada;
    }

    function getLastConvocatoriasItemByTipo(convocatorias, tipo) {
        const filteredData = convocatorias.filter(
            (e) => e.tipo_conv_comun.tipo_conv_comun_titulo === tipo
        );
        return filteredData.length > 0
            ? filteredData[filteredData.length - 1]
            : null;
    }

    function getLastCursosItemByTipo(cursos, tipo) {
        const filteredData = cursos.filter(
            (e) => e.tipo_curso_otro.tipo_conv_curso_nombre === tipo
        );
        return filteredData.length > 0
            ? filteredData[filteredData.length - 1]
            : null;
    }

    if (
        institucion &&
        categoria === TIPOS.ALL_CONVOCATORIAS &&
        !loading_convocatorias
    ) {
        const { institucion_nombre, institucion_logo } = institucion;

        const lastComunicado = getLastConvocatoriasItemByTipo(
            convocatorias,
            TIPOS.COMUNICADOS
        );
        const lastConvocatoria = getLastConvocatoriasItemByTipo(
            convocatorias,
            TIPOS.CONVOCATORIAS
        );
        const lastAviso = getLastConvocatoriasItemByTipo(
            convocatorias,
            TIPOS.AVISOS
        );

        return (
            <>
                <div className="row">
                    <div
                        className="col-md-4 m-15px-tb"
                        style={{
                            border: "3px solid transparent",
                            borderRight: "1px solid transparent",
                            borderImage:
                                "linear-gradient(to top,var(--color-primario),transparent)",
                            borderImageSlice: 1,
                            paddingTop: "40px",
                        }}
                    >
                        <div className="blog-grid" onClick={toggleModalOne}>
                            <div className="blog-img">
                                <a>
                                    <img
                                        src={`${process.env.REACT_APP_ROOT_API}/Convocatorias/${lastConvocatoria.con_foto_portada}`}
                                        alt="blog post"
                                        style={{
                                            height: "477px",
                                            width: "100%",
                                            objectFit: "cover",
                                        }}
                                    ></img>
                                </a>
                            </div>
                            <div className="blog-info">
                                <div className="meta">
                                    Fecha :{" "}
                                    {formatearFecha(
                                        lastConvocatoria.con_fecha_inicio
                                    )}{" "}
                                    -{" "}
                                    {
                                        lastConvocatoria.tipo_conv_comun
                                            .tipo_conv_comun_titulo
                                    }
                                </div>
                                <h6>
                                    <a>{lastConvocatoria.con_titulo}</a>
                                </h6>
                            </div>
                        </div>
                    </div>
                    {/* End .col for blog-1 */}

                    <div
                        className="col-md-4 m-15px-tb"
                        style={{
                            border: "3px solid transparent",
                            borderRight: "1px solid transparent",
                            borderLeft: "1px solid transparent",
                            borderImage:
                                "linear-gradient(to top,var(--color-primario),transparent)",
                            borderImageSlice: 1,
                            paddingTop: "40px",
                        }}
                    >
                        <div className="blog-grid" onClick={toggleModalTwo}>
                            <div className="blog-img">
                                <a>
                                    <img
                                        src={`${process.env.REACT_APP_ROOT_API}/Convocatorias/${lastComunicado.con_foto_portada}`}
                                        alt="blog post"
                                        style={{
                                            height: "477px",
                                            width: "100%",
                                            objectFit: "cover",
                                        }}
                                    ></img>
                                </a>
                            </div>
                            <div className="blog-info">
                                <div className="meta">
                                    Fecha :{" "}
                                    {formatearFecha(
                                        lastComunicado.con_fecha_inicio
                                    )}{" "}
                                    -{" "}
                                    {
                                        lastComunicado.tipo_conv_comun
                                            .tipo_conv_comun_titulo
                                    }
                                </div>
                                <h6>
                                    <a>{lastComunicado.con_titulo}</a>
                                </h6>
                            </div>
                        </div>
                    </div>
                    {/* End .col for blog-2 */}

                    <div
                        className="col-md-4 m-15px-tb"
                        style={{
                            border: "3px solid transparent",
                            borderLeft: "1px solid transparent",
                            borderImage:
                                "linear-gradient(to top,var(--color-primario),transparent)",
                            borderImageSlice: 1,
                            paddingTop: "40px",
                        }}
                    >
                        <div className="blog-grid" onClick={toggleModalThree}>
                            <div className="blog-img">
                                <a>
                                    <img
                                        src={`${process.env.REACT_APP_ROOT_API}/Convocatorias/${lastAviso.con_foto_portada}`}
                                        alt="blog post"
                                        style={{
                                            height: "477px",
                                            width: "100%",
                                            objectFit: "cover",
                                        }}
                                    ></img>
                                </a>
                            </div>

                            <div className="blog-info">
                                <div className="meta">
                                    Fecha :{" "}
                                    {formatearFecha(lastAviso.con_fecha_inicio)}{" "}
                                    -{" "}
                                    {
                                        lastAviso.tipo_conv_comun
                                            .tipo_conv_comun_titulo
                                    }
                                </div>
                                <h6>
                                    <a>{lastAviso.con_titulo}</a>
                                </h6>
                            </div>
                        </div>
                    </div>
                    {/* End .col for blog-3 */}
                </div>
                {/* End .row */}

                {/* Start Modal for Blog-1 */}
                <Modal
                    isOpen={isOpen}
                    onRequestClose={toggleModalOne}
                    contentLabel="My dialog"
                    className="custom-modal"
                    overlayClassName="custom-overlay"
                    closeTimeoutMS={500}
                >
                    <div>
                        <button
                            className="close-modal"
                            onClick={toggleModalOne}
                        >
                            <img src="/img/cancel.svg" alt="close icon" />
                        </button>
                        {/* End close icon */}

                        <div className="box_inner">
                            <div className="scrollable">
                                <div className="blog-grid">
                                    <div className="blog-img">
                                        <img
                                            src={`${process.env.REACT_APP_ROOT_API}/Convocatorias/${lastConvocatoria.con_foto_portada}`}
                                            style={{ width: "100%" }}
                                            alt="blog post"
                                        ></img>
                                    </div>
                                    {/* End blog-img */}
                                    <article className="article">
                                        <div className="article-title">
                                            <h2>
                                                {lastConvocatoria.con_titulo}
                                            </h2>
                                            <div className="media">
                                                <div className="avatar">
                                                    <img
                                                        src={`${process.env.REACT_APP_ROOT_API}/InstitucionUpea/${institucion_logo}`}
                                                        alt="thumbnail"
                                                    />
                                                </div>
                                                <div className="media-body">
                                                    <label>
                                                        {institucion_nombre}
                                                    </label>
                                                    <span>
                                                        {formatearFecha(
                                                            lastConvocatoria.con_fecha_inicio
                                                        )}
                                                    </span>
                                                    <hr />
                                                    <h5>DESCRIPCIÓN</h5>
                                                    <hr />
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: lastConvocatoria.con_descripcion,
                                                        }}
                                                    ></div>
                                                    <hr />
                                                    <h5>DATOS E INFORMACIÓN</h5>
                                                    <hr />
                                                    <p>
                                                        Fecha de inicio :{" "}
                                                        <span>
                                                            {formatearFecha(
                                                                lastConvocatoria.con_fecha_inicio
                                                            )}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Fecha de Fin :{" "}
                                                        <span>
                                                            {formatearFecha(
                                                                lastConvocatoria.con_fecha_fin
                                                            )}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End .article-title */}
                                        {/* End article content */}
                                        <BlogNav setIsOpen={setIsOpen} />
                                        {/* End tag */}
                                    </article>
                                    {/* End Article */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End modal box news */}
                </Modal>
                {/* End  Modal for Blog-1 */}

                {/* Start Modal for Blog-2 */}
                <Modal
                    isOpen={isOpen2}
                    onRequestClose={toggleModalTwo}
                    contentLabel="My dialog"
                    className="custom-modal"
                    overlayClassName="custom-overlay"
                    closeTimeoutMS={500}
                >
                    <div>
                        <button
                            className="close-modal"
                            onClick={toggleModalTwo}
                        >
                            <img src="/img/cancel.svg" alt="close icon" />
                        </button>
                        {/* End close icon */}

                        <div className="box_inner">
                            <div className="scrollable">
                                <div className="blog-grid">
                                    <div className="blog-img">
                                        <img
                                            src={`${process.env.REACT_APP_ROOT_API}/Convocatorias/${lastComunicado.con_foto_portada}`}
                                            style={{ width: "100%" }}
                                            alt="blog post"
                                        ></img>
                                    </div>
                                    {/* End blog-img */}
                                    <article className="article">
                                        <div className="article-title">
                                            <h2>{lastComunicado.con_titulo}</h2>
                                            <div className="media">
                                                <div className="avatar">
                                                    <img
                                                        src={`${process.env.REACT_APP_ROOT_API}/InstitucionUpea/${institucion_logo}`}
                                                        alt="thumbnail"
                                                    />
                                                </div>
                                                <div className="media-body">
                                                    <label>
                                                        {institucion_nombre}
                                                    </label>
                                                    <span>
                                                        {formatearFecha(
                                                            lastComunicado.con_fecha_inicio
                                                        )}
                                                    </span>
                                                    <hr />
                                                    <h5>DESCRIPCIÓN</h5>
                                                    <hr />
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: lastComunicado.con_descripcion,
                                                        }}
                                                    ></div>
                                                    <hr />
                                                    <h5>DATOS E INFORMACIÓN</h5>
                                                    <hr />
                                                    <p>
                                                        Fecha de inicio :{" "}
                                                        <span>
                                                            {formatearFecha(
                                                                lastComunicado.con_fecha_inicio
                                                            )}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Fecha de Fin :{" "}
                                                        <span>
                                                            {formatearFecha(
                                                                lastComunicado.con_fecha_fin
                                                            )}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End .article-title */}
                                        {/* End article content */}
                                        <BlogNav setIsOpen={setIsOpen} />
                                        {/* End tag */}
                                    </article>
                                    {/* End Article */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End modal box news */}
                </Modal>
                {/* End  Modal for Blog-2 */}

                {/* Start Modal for Blog-3 */}
                <Modal
                    isOpen={isOpen3}
                    onRequestClose={toggleModalThree}
                    contentLabel="My dialog"
                    className="custom-modal"
                    overlayClassName="custom-overlay"
                    closeTimeoutMS={500}
                >
                    <div>
                        <button
                            className="close-modal"
                            onClick={toggleModalThree}
                        >
                            <img src="/img/cancel.svg" alt="close icon" />
                        </button>
                        {/* End close icon */}

                        <div className="box_inner">
                            <div className="scrollable">
                                <div className="blog-grid">
                                    <div className="blog-img">
                                        <img
                                            src={`${process.env.REACT_APP_ROOT_API}/Convocatorias/${lastAviso.con_foto_portada}`}
                                            style={{ width: "100%" }}
                                            alt="blog post"
                                        ></img>
                                    </div>
                                    {/* End blog-img */}
                                    <article className="article">
                                        <div className="article-title">
                                            <h2>{lastAviso.con_titulo}</h2>
                                            <div className="media">
                                                <div className="avatar">
                                                    <img
                                                        src={`${process.env.REACT_APP_ROOT_API}/InstitucionUpea/${institucion_logo}`}
                                                        alt="thumbnail"
                                                    />
                                                </div>
                                                <div className="media-body">
                                                    <label>
                                                        {institucion_nombre}
                                                    </label>
                                                    <span>
                                                        {formatearFecha(
                                                            lastAviso.con_fecha_inicio
                                                        )}
                                                    </span>
                                                    <hr />
                                                    <h5>DESCRIPCIÓN</h5>
                                                    <hr />
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: lastAviso.con_descripcion,
                                                        }}
                                                    ></div>
                                                    <hr />
                                                    <h5>DATOS E INFORMACIÓN</h5>
                                                    <hr />
                                                    <p>
                                                        Fecha de inicio :{" "}
                                                        <span>
                                                            {formatearFecha(
                                                                lastAviso.con_fecha_inicio
                                                            )}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Fecha de Fin :{" "}
                                                        <span>
                                                            {formatearFecha(
                                                                lastAviso.con_fecha_fin
                                                            )}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End .article-title */}
                                        {/* End article content */}
                                        <BlogNav setIsOpen={setIsOpen} />
                                        {/* End tag */}
                                    </article>
                                    {/* End Article */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End modal box news */}
                </Modal>
                {/* End  Modal for Blog-3 */}
            </>
        );
    }
    if (institucion && categoria === TIPOS.ALL_CURSOS && !loading_cursos) {
        const { institucion_nombre, institucion_logo } = institucion;

        const lastCurso = getLastCursosItemByTipo(cursos, TIPOS.CURSOS);
        const lastSeminario = getLastCursosItemByTipo(cursos, TIPOS.SEMINARIOS);
        return (
            <>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div
                        className="col-md-4 m-15px-tb"
                        style={{
                            border: "3px solid transparent",
                            borderRight: "1px solid transparent",
                            borderImage:
                                "linear-gradient(to top,var(--color-primario),transparent)",
                            borderImageSlice: 1,
                            paddingTop: "40px",
                        }}
                    >
                        <div className="blog-grid" onClick={toggleModalOne}>
                            <div className="blog-img">
                                <a>
                                    <img
                                        src={`${process.env.REACT_APP_ROOT_API}/Cursos/${lastCurso.det_img_portada}`}
                                        alt="blog post"
                                        style={{
                                            height: "477px",
                                            width: "100%",
                                            objectFit: "cover",
                                        }}
                                    ></img>
                                </a>
                            </div>
                            <div className="blog-info">
                                <div className="meta">
                                    Fecha :{" "}
                                    {formatearFecha(lastCurso.det_fecha_ini)} -{" "}
                                    {
                                        lastCurso.tipo_curso_otro
                                            .tipo_conv_curso_nombre
                                    }
                                </div>
                                <h6>
                                    <a>{lastCurso.det_titulo}</a>
                                </h6>
                            </div>
                        </div>
                    </div>
                    {/* End .col for blog-1 */}

                    <div
                        className="col-md-4 m-15px-tb"
                        style={{
                            border: "3px solid transparent",
                            borderLeft: "1px solid transparent",
                            borderImage:
                                "linear-gradient(to top,var(--color-primario),transparent)",
                            borderImageSlice: 1,
                            paddingTop: "40px",
                        }}
                    >
                        <div className="blog-grid" onClick={toggleModalTwo}>
                            <div className="blog-img">
                                <a>
                                    <img
                                        src={`${process.env.REACT_APP_ROOT_API}/Cursos/${lastSeminario.det_img_portada}`}
                                        alt="blog post"
                                        style={{
                                            height: "477px",
                                            width: "100%",
                                            objectFit: "cover",
                                        }}
                                    ></img>
                                </a>
                            </div>
                            <div className="blog-info">
                                <div className="meta">
                                    Fecha :{" "}
                                    {formatearFecha(
                                        lastSeminario.det_fecha_ini
                                    )}{" "}
                                    -{" "}
                                    {
                                        lastSeminario.tipo_curso_otro
                                            .tipo_conv_curso_nombre
                                    }
                                </div>
                                <h6>
                                    <a>{lastSeminario.det_titulo}</a>
                                </h6>
                            </div>
                        </div>
                    </div>
                    {/* End .col for blog-2 */}
                </div>
                {/* End .row */}

                {/* Start Modal for Blog-1 */}
                <Modal
                    isOpen={isOpen}
                    onRequestClose={toggleModalOne}
                    contentLabel="My dialog"
                    className="custom-modal"
                    overlayClassName="custom-overlay"
                    closeTimeoutMS={500}
                >
                    <div>
                        <button
                            className="close-modal"
                            onClick={toggleModalOne}
                        >
                            <img src="/img/cancel.svg" alt="close icon" />
                        </button>
                        {/* End close icon */}

                        <div className="box_inner">
                            <div className="scrollable">
                                <div className="blog-grid">
                                    <div className="blog-img">
                                        <img
                                            src={`${process.env.REACT_APP_ROOT_API}/Cursos/${lastCurso.det_img_portada}`}
                                            style={{ width: "100%" }}
                                            alt="blog post"
                                        ></img>
                                    </div>
                                    {/* End blog-img */}
                                    <article className="article">
                                        <div className="article-title">
                                            <h2>{lastCurso.det_titulo}</h2>
                                            <div className="media">
                                                <div className="avatar">
                                                    <img
                                                        src={`${process.env.REACT_APP_ROOT_API}/InstitucionUpea/${institucion_logo}`}
                                                        alt="thumbnail"
                                                    />
                                                </div>
                                                <div className="media-body">
                                                    <label>
                                                        {institucion_nombre}
                                                    </label>
                                                    <span>
                                                        {formatearFecha(
                                                            lastCurso.det_fecha_ini
                                                        )}
                                                    </span>
                                                    <h5>DESCRIPCION</h5>
                                                    <hr />
                                                    <div
                                                        className="article-content"
                                                        dangerouslySetInnerHTML={{
                                                            __html: lastCurso.det_descripcion,
                                                        }}
                                                    ></div>
                                                    <hr />
                                                    <h5>DATOS E INFORMACIÓN</h5>
                                                    <hr />
                                                    <p>
                                                        Costo para estudiantes :{" "}
                                                        <span>
                                                            {
                                                                lastCurso.det_costo
                                                            }
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Costo para Extranjeros :{" "}
                                                        <span>
                                                            {
                                                                lastCurso.det_costo_ext
                                                            }
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Costo para Profesionales
                                                        :{" "}
                                                        <span>
                                                            {
                                                                lastCurso.det_costo_profe
                                                            }
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Cupos disponibles :{" "}
                                                        <span>
                                                            {
                                                                lastCurso.det_cupo_max
                                                            }
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Carga Horaria :{" "}
                                                        <span>
                                                            {
                                                                lastCurso.det_carga_horaria
                                                            }
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Lugar de Capacitacion :{" "}
                                                        <span>
                                                            {
                                                                lastCurso.det_lugar_curso
                                                            }
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Modalidad :{" "}
                                                        <span>
                                                            {
                                                                lastCurso.det_modalidad
                                                            }
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Fecha de Inicio :{" "}
                                                        <span>
                                                            {formatearFecha(
                                                                lastCurso.det_fecha_ini
                                                            )}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Fecha de Fin :{" "}
                                                        <span>
                                                            {formatearFecha(
                                                                lastCurso.det_fecha_fin
                                                            )}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Hora de Inicio :{" "}
                                                        <span>
                                                            {convertirHora(
                                                                lastCurso.det_hora_ini
                                                            )}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Enlace de WhatsApp :{" "}
                                                        <span>
                                                            <a
                                                                style={{
                                                                    color: "var(--color-primario)",
                                                                }}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                href={
                                                                    lastCurso.det_grupo_whatssap
                                                                }
                                                            >
                                                                Link de Curso...
                                                            </a>
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Version del Curso :{" "}
                                                        <span>
                                                            {
                                                                lastCurso.det_version
                                                            }
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End .article-title */}

                                        {/* End article content */}
                                        <BlogNav setIsOpen={setIsOpen} />
                                        {/* End tag */}
                                    </article>
                                    {/* End Article */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End modal box news */}
                </Modal>
                {/* End  Modal for Blog-1 */}

                {/* Start Modal for Blog-2 */}
                <Modal
                    isOpen={isOpen2}
                    onRequestClose={toggleModalTwo}
                    contentLabel="My dialog"
                    className="custom-modal"
                    overlayClassName="custom-overlay"
                    closeTimeoutMS={500}
                >
                    <div>
                        <button
                            className="close-modal"
                            onClick={toggleModalTwo}
                        >
                            <img src="/img/cancel.svg" alt="close icon" />
                        </button>
                        {/* End close icon */}

                        <div className="box_inner">
                            <div className="scrollable">
                                <div className="blog-grid">
                                    <div className="blog-img">
                                        <img
                                            src={`${process.env.REACT_APP_ROOT_API}/Cursos/${lastSeminario.det_img_portada}`}
                                            style={{ width: "100%" }}
                                            alt="blog post"
                                        ></img>
                                    </div>
                                    {/* End blog-img */}
                                    <article className="article">
                                        <div className="article-title">
                                            <h2>{lastSeminario.det_titulo}</h2>
                                            <div className="media">
                                                <div className="avatar">
                                                    <img
                                                        src={`${process.env.REACT_APP_ROOT_API}/InstitucionUpea/${institucion_logo}`}
                                                        alt="thumbnail"
                                                    />
                                                </div>
                                                <div className="media-body">
                                                    <label>
                                                        {institucion_nombre}
                                                    </label>
                                                    <span>
                                                        {formatearFecha(
                                                            lastSeminario.det_fecha_ini
                                                        )}
                                                    </span>
                                                    <h5>DESCRIPCION</h5>
                                                    <hr />
                                                    <div
                                                        className="article-content"
                                                        dangerouslySetInnerHTML={{
                                                            __html: lastSeminario.det_descripcion,
                                                        }}
                                                    ></div>
                                                    <hr />
                                                    <h5>DATOS E INFORMACIÓN</h5>
                                                    <hr />
                                                    <p>
                                                        Costo para estudiantes :{" "}
                                                        <span>
                                                            {
                                                                lastSeminario.det_costo
                                                            }
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Costo para Extranjeros :{" "}
                                                        <span>
                                                            {
                                                                lastSeminario.det_costo_ext
                                                            }
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Costo para Profesionales
                                                        :{" "}
                                                        <span>
                                                            {
                                                                lastSeminario.det_costo_profe
                                                            }
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Cupos disponibles :{" "}
                                                        <span>
                                                            {
                                                                lastSeminario.det_cupo_max
                                                            }
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Carga Horaria :{" "}
                                                        <span>
                                                            {
                                                                lastSeminario.det_carga_horaria
                                                            }
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Lugar de Capacitacion :{" "}
                                                        <span>
                                                            {
                                                                lastSeminario.det_lugar_curso
                                                            }
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Modalidad :{" "}
                                                        <span>
                                                            {
                                                                lastSeminario.det_modalidad
                                                            }
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Fecha de Inicio :{" "}
                                                        <span>
                                                            {formatearFecha(
                                                                lastSeminario.det_fecha_ini
                                                            )}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Fecha de Fin :{" "}
                                                        <span>
                                                            {formatearFecha(
                                                                lastSeminario.det_fecha_fin
                                                            )}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Hora de Inicio :{" "}
                                                        <span>
                                                            {convertirHora(
                                                                lastSeminario.det_hora_ini
                                                            )}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Enlace de WhatsApp :{" "}
                                                        <span>
                                                            <a
                                                                style={{
                                                                    color: "var(--color-primario)",
                                                                }}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                href={
                                                                    lastSeminario.det_grupo_whatssap
                                                                }
                                                            >
                                                                Link de Curso...
                                                            </a>
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Version del Curso :{" "}
                                                        <span>
                                                            {
                                                                lastSeminario.det_version
                                                            }
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* End .article-title */}

                                        {/* End article content */}
                                        <BlogNav setIsOpen={setIsOpen} />
                                        {/* End tag */}
                                    </article>
                                    {/* End Article */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End modal box news */}
                </Modal>
                {/* End  Modal for Blog-2 */}
            </>
        );
    }
};

export default Blog;

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { TIPOS } from "../../types/types";
import ReactPlayer from "react-player/youtube";
import {
    getConvocatorias,
    getCursos,
    getEventos,
    getGacetas,
    getOfertasAcademicas,
    getPublicaciones,
    getServicios,
    getVideos,
} from "../../api/institucionAPI";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import BlogNav from "./BlogNav";
import { Document, Page, pdfjs } from "react-pdf";
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

    /* OBTENCION DE INFORMACION DEL STORE API SERVICIOS*/
    const { isLoading: loading_servicios, data: servicios } = useQuery({
        queryKey: ["servicios"],
        queryFn: getServicios,
    });

    /* OBTENCION DE INFORMACION DEL STORE API OFERTAS ACADEMICAS*/
    const { isLoading: loading_ofertas, data: ofertas } = useQuery({
        queryKey: ["ofertas"],
        queryFn: getOfertasAcademicas,
    });

    /* OBTENCION DE INFORMACION DEL STORE API PUBLICACIONES*/
    const { isLoading: loading_publicaciones, data: publicaciones } = useQuery({
        queryKey: ["publicaciones"],
        queryFn: getPublicaciones,
    });

    /* OBTENCION DE INFORMACION DEL STORE API GACETAS*/
    const { isLoading: loading_gacetas, data: gacetas } = useQuery({
        queryKey: ["gacetas"],
        queryFn: getGacetas,
    });

    /* OBTENCION DE INFORMACION DEL STORE API EVENTOS*/
    const { isLoading: loading_eventos, data: eventos } = useQuery({
        queryKey: ["eventos"],
        queryFn: getEventos,
    });

    /* OBTENCION DE INFORMACION DEL STORE API VIDEOS*/
    const { isLoading: loading_videos, data: videos } = useQuery({
        queryKey: ["videos"],
        queryFn: getVideos,
    });

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    });

    const [isOpen, setIsOpen] = useState(false);
    const [selectedConvocatoria, setSelectedConvocatoria] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState("");

    function toggleModal(item) {
        setSelectedConvocatoria(item);
        setIsOpen(!isOpen);
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

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 6);
    };
    const onSearchChange = ({ target }) => {
        setCurrentPage(0);
        setSearch(target.value);
    };

    // convocatorias, comunicados y avisos
    if (
        institucion &&
        categoria === TIPOS.CONVOCATORIAS &&
        !loading_convocatorias
    ) {
        const { institucion_nombre, institucion_logo } = institucion;

        const filter_convocatorias = () => {
            if (search.length === 0) {
                return convocatorias
                    .filter(
                        (e) =>
                            e.tipo_conv_comun.tipo_conv_comun_titulo ===
                            TIPOS.CONVOCATORIAS
                    )
                    .slice(currentPage, currentPage + 6);
            }
            return convocatorias
                .filter(
                    (e) =>
                        e.tipo_conv_comun.tipo_conv_comun_titulo ===
                            TIPOS.CONVOCATORIAS &&
                        e.con_titulo
                            .toLowerCase()
                            .includes(search.toLowerCase())
                )
                .slice(currentPage, currentPage + 6);
        };

        const nextPage = () => {
            if (
                convocatorias.filter(
                    (e) =>
                        e.tipo_conv_comun.tipo_conv_comun_titulo ===
                            TIPOS.CONVOCATORIAS &&
                        e.con_titulo
                            .toLowerCase()
                            .includes(search.toLowerCase())
                ).length >
                currentPage + 5
            )
                setCurrentPage(currentPage + 6);
        };

        return (
            <>
                <div className="d-flex justify-content-between content-search-btn">
                    <div className="d-flex align-items-center mb-2 content-search">
                        <label
                            htmlFor="search"
                            className="text-white"
                            style={{
                                fontSize: "2em",
                                marginRight: "0.5em",
                                marginBottom: "0.5em",
                            }}
                        >
                            <FaSearch />
                        </label>
                        <input
                            type="text"
                            placeholder="Buscar"
                            name="search"
                            className="mb-3 form-control flex-1"
                            value={search}
                            onChange={onSearchChange}
                            style={{ marginRight: "1em" }}
                        />
                    </div>
                    <div className="content-btn">
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            onClick={prevPage}
                        >
                            Anterior
                        </button>
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            style={{ marginLeft: "10px" }}
                            onClick={nextPage}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
                <div className="row">
                    {filter_convocatorias().map((item, index) => (
                        <div className="col-md-4 m-15px-tb" key={index}>
                            <div
                                className="blog-grid"
                                onClick={() => toggleModal(item)}
                            >
                                <div className="blog-img">
                                    <a>
                                        <img
                                            src={`${process.env.REACT_APP_ROOT_API}/Convocatorias/${item.con_foto_portada}`}
                                            alt="blog post"
                                        ></img>
                                    </a>
                                </div>
                                <div className="blog-info">
                                    <div className="meta">
                                        Fecha :{" "}
                                        {formatearFecha(item.con_fecha_inicio)}{" "}
                                        -{" "}
                                        {
                                            item.tipo_conv_comun
                                                .tipo_conv_comun_titulo
                                        }
                                    </div>
                                    <h6>
                                        <a>{item.con_titulo}</a>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filter_convocatorias().length === 0 && (
                        <SinRegistros title={categoria} />
                    )}
                </div>
                {/* End .row */}

                {selectedConvocatoria && (
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        contentLabel="My dialog"
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                        closeTimeoutMS={500}
                    >
                        <div>
                            <button
                                className="close-modal"
                                onClick={() => setIsOpen(false)}
                            >
                                <img src="/img/cancel.svg" alt="close icon" />
                            </button>
                            {/* End close icon */}

                            <div className="box_inner">
                                <div className="scrollable">
                                    <div className="blog-grid">
                                        <div className="blog-img">
                                            <img
                                                src={`${process.env.REACT_APP_ROOT_API}/Convocatorias/${selectedConvocatoria.con_foto_portada}`}
                                                style={{ width: "100%" }}
                                                alt="blog post"
                                            ></img>
                                        </div>
                                        {/* End blog-img */}
                                        <article className="article">
                                            <div className="article-title">
                                                <h2>
                                                    {
                                                        selectedConvocatoria.con_titulo
                                                    }
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
                                                                selectedConvocatoria.con_fecha_inicio
                                                            )}
                                                        </span>
                                                        <hr />
                                                        <h5>DESCRIPCIÓN</h5>
                                                        <hr />
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: selectedConvocatoria.con_descripcion,
                                                            }}
                                                        ></div>
                                                        <hr />
                                                        <h5>
                                                            DATOS E INFORMACIÓN
                                                        </h5>
                                                        <hr />
                                                        <p>
                                                            Fecha de inicio :{" "}
                                                            <span>
                                                                {formatearFecha(
                                                                    selectedConvocatoria.con_fecha_inicio
                                                                )}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Fecha de Fin :{" "}
                                                            <span>
                                                                {formatearFecha(
                                                                    selectedConvocatoria.con_fecha_fin
                                                                )}
                                                            </span>
                                                        </p>
                                                        {/* End article content */}
                                                        <BlogNav
                                                            setIsOpen={
                                                                setIsOpen
                                                            }
                                                        />
                                                        {/* End tag */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End .article-title */}
                                        </article>
                                        {/* End Article */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End modal box news */}
                    </Modal>
                )}
            </>
        );
    }
    if (
        institucion &&
        categoria === TIPOS.COMUNICADOS &&
        !loading_convocatorias
    ) {
        const { institucion_nombre, institucion_logo } = institucion;

        const filter_comunicados = () => {
            if (search.length === 0) {
                return convocatorias
                    .filter(
                        (e) =>
                            e.tipo_conv_comun.tipo_conv_comun_titulo ===
                            TIPOS.COMUNICADOS
                    )
                    .slice(currentPage, currentPage + 6);
            }
            return convocatorias
                .filter(
                    (e) =>
                        e.tipo_conv_comun.tipo_conv_comun_titulo ===
                            TIPOS.COMUNICADOS &&
                        e.con_titulo
                            .toLowerCase()
                            .includes(search.toLowerCase())
                )
                .slice(currentPage, currentPage + 6);
        };

        const nextPage = () => {
            if (
                convocatorias.filter(
                    (e) =>
                        e.tipo_conv_comun.tipo_conv_comun_titulo ===
                            TIPOS.COMUNICADOS &&
                        e.con_titulo
                            .toLowerCase()
                            .includes(search.toLowerCase())
                ).length >
                currentPage + 5
            )
                setCurrentPage(currentPage + 6);
        };

        return (
            <>
                <div className="d-flex justify-content-between content-search-btn">
                    <div className="d-flex align-items-center mb-2 content-search">
                        <label
                            htmlFor="search"
                            className="text-white"
                            style={{
                                fontSize: "2em",
                                marginRight: "0.5em",
                                marginBottom: "0.5em",
                            }}
                        >
                            <FaSearch />
                        </label>
                        <input
                            type="text"
                            placeholder="Buscar"
                            name="search"
                            className="mb-3 form-control flex-1"
                            value={search}
                            onChange={onSearchChange}
                            style={{ marginRight: "1em" }}
                        />
                    </div>
                    <div className="content-btn">
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            onClick={prevPage}
                        >
                            Anterior
                        </button>
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            style={{ marginLeft: "10px" }}
                            onClick={nextPage}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
                <div className="row">
                    {filter_comunicados().map((item, index) => (
                        <div className="col-md-4 m-15px-tb" key={index}>
                            <div
                                className="blog-grid"
                                onClick={() => toggleModal(item)}
                            >
                                <div className="blog-img">
                                    <a>
                                        <img
                                            src={`${process.env.REACT_APP_ROOT_API}/Convocatorias/${item.con_foto_portada}`}
                                            alt="blog post"
                                        ></img>
                                    </a>
                                </div>
                                <div className="blog-info">
                                    <div className="meta">
                                        Fecha :{" "}
                                        {formatearFecha(item.con_fecha_inicio)}{" "}
                                        -{" "}
                                        {
                                            item.tipo_conv_comun
                                                .tipo_conv_comun_titulo
                                        }
                                    </div>
                                    <h6>
                                        <a>{item.con_titulo}</a>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filter_comunicados().length === 0 && (
                        <SinRegistros title={categoria} />
                    )}
                </div>
                {/* End .row */}

                {selectedConvocatoria && (
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        contentLabel="My dialog"
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                        closeTimeoutMS={500}
                    >
                        <div>
                            <button
                                className="close-modal"
                                onClick={() => setIsOpen(false)}
                            >
                                <img src="/img/cancel.svg" alt="close icon" />
                            </button>
                            {/* End close icon */}

                            <div className="box_inner">
                                <div className="scrollable">
                                    <div className="blog-grid">
                                        <div className="blog-img">
                                            <img
                                                src={`${process.env.REACT_APP_ROOT_API}/Convocatorias/${selectedConvocatoria.con_foto_portada}`}
                                                style={{ width: "100%" }}
                                                alt="blog post"
                                            ></img>
                                        </div>
                                        {/* End blog-img */}
                                        <article className="article">
                                            <div className="article-title">
                                                <h2>
                                                    {
                                                        selectedConvocatoria.con_titulo
                                                    }
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
                                                                selectedConvocatoria.con_fecha_inicio
                                                            )}
                                                        </span>
                                                        <hr />
                                                        <h5>DESCRIPCIÓN</h5>
                                                        <hr />
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: selectedConvocatoria.con_descripcion,
                                                            }}
                                                        ></div>
                                                        <hr />
                                                        <h5>
                                                            DATOS E INFORMACIÓN
                                                        </h5>
                                                        <hr />
                                                        <p>
                                                            Fecha de inicio :{" "}
                                                            <span>
                                                                {formatearFecha(
                                                                    selectedConvocatoria.con_fecha_inicio
                                                                )}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Fecha de Fin :{" "}
                                                            <span>
                                                                {formatearFecha(
                                                                    selectedConvocatoria.con_fecha_fin
                                                                )}
                                                            </span>
                                                        </p>
                                                        {/* End article content */}
                                                        <BlogNav
                                                            setIsOpen={
                                                                setIsOpen
                                                            }
                                                        />
                                                        {/* End tag */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End .article-title */}
                                        </article>
                                        {/* End Article */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End modal box news */}
                    </Modal>
                )}
            </>
        );
    }
    if (institucion && categoria === TIPOS.AVISOS && !loading_convocatorias) {
        const { institucion_nombre, institucion_logo } = institucion;

        const filter_avisos = () => {
            if (search.length === 0) {
                return convocatorias
                    .filter(
                        (e) =>
                            e.tipo_conv_comun.tipo_conv_comun_titulo ===
                            TIPOS.AVISOS
                    )
                    .slice(currentPage, currentPage + 6);
            }
            return convocatorias
                .filter(
                    (e) =>
                        e.tipo_conv_comun.tipo_conv_comun_titulo ===
                            TIPOS.AVISOS &&
                        e.con_titulo
                            .toLowerCase()
                            .includes(search.toLowerCase())
                )
                .slice(currentPage, currentPage + 6);
        };

        const nextPage = () => {
            if (
                convocatorias.filter(
                    (e) =>
                        e.tipo_conv_comun.tipo_conv_comun_titulo ===
                            TIPOS.AVISOS &&
                        e.con_titulo
                            .toLowerCase()
                            .includes(search.toLowerCase())
                ).length >
                currentPage + 5
            )
                setCurrentPage(currentPage + 6);
        };

        return (
            <>
                <div className="d-flex justify-content-between content-search-btn">
                    <div className="d-flex align-items-center mb-2 content-search">
                        <label
                            htmlFor="search"
                            className="text-white"
                            style={{
                                fontSize: "2em",
                                marginRight: "0.5em",
                                marginBottom: "0.5em",
                            }}
                        >
                            <FaSearch />
                        </label>
                        <input
                            type="text"
                            placeholder="Buscar"
                            name="search"
                            className="mb-3 form-control flex-1"
                            value={search}
                            onChange={onSearchChange}
                            style={{ marginRight: "1em" }}
                        />
                    </div>
                    <div className="content-btn">
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            onClick={prevPage}
                        >
                            Anterior
                        </button>
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            style={{ marginLeft: "10px" }}
                            onClick={nextPage}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
                <div className="row">
                    {filter_avisos().map((item, index) => (
                        <div className="col-md-4 m-15px-tb" key={index}>
                            <div
                                className="blog-grid"
                                onClick={() => toggleModal(item)}
                            >
                                <div className="blog-img">
                                    <a>
                                        <img
                                            src={`${process.env.REACT_APP_ROOT_API}/Convocatorias/${item.con_foto_portada}`}
                                            alt="blog post"
                                        ></img>
                                    </a>
                                </div>
                                <div className="blog-info">
                                    <div className="meta">
                                        Fecha :{" "}
                                        {formatearFecha(item.con_fecha_inicio)}{" "}
                                        -{" "}
                                        {
                                            item.tipo_conv_comun
                                                .tipo_conv_comun_titulo
                                        }
                                    </div>
                                    <h6>
                                        <a>{item.con_titulo}</a>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filter_avisos().length === 0 && (
                        <SinRegistros title={categoria} />
                    )}
                </div>
                {/* End .row */}

                {selectedConvocatoria && (
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        contentLabel="My dialog"
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                        closeTimeoutMS={500}
                    >
                        <div>
                            <button
                                className="close-modal"
                                onClick={() => setIsOpen(false)}
                            >
                                <img src="/img/cancel.svg" alt="close icon" />
                            </button>
                            {/* End close icon */}

                            <div className="box_inner">
                                <div className="scrollable">
                                    <div className="blog-grid">
                                        <div className="blog-img">
                                            <img
                                                src={`${process.env.REACT_APP_ROOT_API}/Convocatorias/${selectedConvocatoria.con_foto_portada}`}
                                                style={{ width: "100%" }}
                                                alt="blog post"
                                            ></img>
                                        </div>
                                        {/* End blog-img */}
                                        <article className="article">
                                            <div className="article-title">
                                                <h2>
                                                    {
                                                        selectedConvocatoria.con_titulo
                                                    }
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
                                                                selectedConvocatoria.con_fecha_inicio
                                                            )}
                                                        </span>
                                                        <hr />
                                                        <h5>DESCRIPCIÓN</h5>
                                                        <hr />
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: selectedConvocatoria.con_descripcion,
                                                            }}
                                                        ></div>
                                                        <hr />
                                                        <h5>
                                                            DATOS E INFORMACIÓN
                                                        </h5>
                                                        <hr />
                                                        <p>
                                                            Fecha de inicio :{" "}
                                                            <span>
                                                                {formatearFecha(
                                                                    selectedConvocatoria.con_fecha_inicio
                                                                )}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Fecha de Fin :{" "}
                                                            <span>
                                                                {formatearFecha(
                                                                    selectedConvocatoria.con_fecha_fin
                                                                )}
                                                            </span>
                                                        </p>
                                                        {/* End article content */}
                                                        <BlogNav
                                                            setIsOpen={
                                                                setIsOpen
                                                            }
                                                        />
                                                        {/* End tag */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End .article-title */}
                                        </article>
                                        {/* End Article */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End modal box news */}
                    </Modal>
                )}
            </>
        );
    }
    // cursos y seminarios
    if (institucion && categoria === TIPOS.CURSOS && !loading_cursos) {
        const { institucion_nombre, institucion_logo } = institucion;

        const filter_convocatorias = () => {
            if (search.length === 0) {
                return cursos
                    .filter(
                        (e) =>
                            e.tipo_curso_otro.tipo_conv_curso_nombre ===
                            TIPOS.CURSOS
                    )
                    .slice(currentPage, currentPage + 6);
            }
            return cursos
                .filter(
                    (e) =>
                        e.tipo_curso_otro.tipo_conv_curso_nombre ===
                            TIPOS.CURSOS &&
                        e.det_titulo
                            .toLowerCase()
                            .includes(search.toLowerCase())
                )
                .slice(currentPage, currentPage + 6);
        };

        const nextPage = () => {
            if (
                cursos.filter(
                    (e) =>
                        e.tipo_curso_otro.tipo_conv_curso_nombre ===
                            TIPOS.CURSOS &&
                        e.det_titulo
                            .toLowerCase()
                            .includes(search.toLowerCase())
                ).length >
                currentPage + 5
            )
                setCurrentPage(currentPage + 6);
        };

        return (
            <>
                <div className="d-flex justify-content-between content-search-btn">
                    <div className="d-flex align-items-center mb-2 content-search">
                        <label
                            htmlFor="search"
                            className="text-white"
                            style={{
                                fontSize: "2em",
                                marginRight: "0.5em",
                                marginBottom: "0.5em",
                            }}
                        >
                            <FaSearch />
                        </label>
                        <input
                            type="text"
                            placeholder="Buscar"
                            name="search"
                            className="mb-3 form-control flex-1"
                            value={search}
                            onChange={onSearchChange}
                            style={{ marginRight: "1em" }}
                        />
                    </div>
                    <div className="content-btn">
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            onClick={prevPage}
                        >
                            Anterior
                        </button>
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            style={{ marginLeft: "10px" }}
                            onClick={nextPage}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
                <div className="row">
                    {filter_convocatorias().map((item, index) => (
                        <div className="col-md-4 m-15px-tb" key={index}>
                            <div
                                className="blog-grid"
                                onClick={() => toggleModal(item)}
                            >
                                <div className="blog-img">
                                    <a>
                                        <img
                                            src={`${process.env.REACT_APP_ROOT_API}/Cursos/${item.det_img_portada}`}
                                            alt="blog post"
                                        ></img>
                                    </a>
                                </div>
                                <div className="blog-info">
                                    <div className="meta">
                                        Fecha :{" "}
                                        {formatearFecha(item.det_fecha_ini)} -{" "}
                                        {
                                            item.tipo_curso_otro
                                                .tipo_conv_curso_nombre
                                        }
                                    </div>
                                    <h6>
                                        <a>{item.det_titulo}</a>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filter_convocatorias().length === 0 && (
                        <SinRegistros title={categoria} />
                    )}
                </div>
                {/* End .row */}

                {selectedConvocatoria && (
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        contentLabel="My dialog"
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                        closeTimeoutMS={500}
                    >
                        <div>
                            <button
                                className="close-modal"
                                onClick={() => setIsOpen(false)}
                            >
                                <img src="/img/cancel.svg" alt="close icon" />
                            </button>
                            {/* End close icon */}

                            <div className="box_inner">
                                <div className="scrollable">
                                    <div className="blog-grid">
                                        <div className="blog-img">
                                            <img
                                                src={`${process.env.REACT_APP_ROOT_API}/Cursos/${selectedConvocatoria.det_img_portada}`}
                                                style={{ width: "100%" }}
                                                alt="blog post"
                                            ></img>
                                        </div>
                                        {/* End blog-img */}
                                        <article className="article">
                                            <div className="article-title">
                                                <h2>
                                                    {
                                                        selectedConvocatoria.det_titulo
                                                    }
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
                                                                selectedConvocatoria.det_fecha_ini
                                                            )}
                                                        </span>
                                                        <hr />
                                                        <h5>DESCRIPCION</h5>
                                                        <hr />
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: selectedConvocatoria.det_descripcion,
                                                            }}
                                                        ></div>
                                                        <hr />
                                                        <h5>
                                                            DATOS E INFORMACIÓN
                                                        </h5>
                                                        <hr />
                                                        <p>
                                                            Costo para
                                                            estudiantes :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_costo
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Costo para
                                                            Extranjeros :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_costo_ext
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Costo para
                                                            Profesionales :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_costo_profe
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Cupos disponibles :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_cupo_max
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Carga Horaria :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_carga_horaria
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Lugar de
                                                            Capacitacion :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_lugar_curso
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Modalidad :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_modalidad
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Fecha de Inicio :{" "}
                                                            <span>
                                                                {formatearFecha(
                                                                    selectedConvocatoria.det_fecha_ini
                                                                )}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Fecha de Fin :{" "}
                                                            <span>
                                                                {formatearFecha(
                                                                    selectedConvocatoria.det_fecha_fin
                                                                )}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Hora de Inicio :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_hora_ini
                                                                }
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
                                                                        selectedConvocatoria.det_grupo_whatssap
                                                                    }
                                                                >
                                                                    Link de
                                                                    Curso...
                                                                </a>
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Version del Curso :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_version
                                                                }
                                                            </span>
                                                        </p>
                                                        {/* End article content */}
                                                        <BlogNav
                                                            setIsOpen={
                                                                setIsOpen
                                                            }
                                                        />
                                                        {/* End tag */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End .article-title */}
                                        </article>
                                        {/* End Article */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End modal box news */}
                    </Modal>
                )}
            </>
        );
    }
    if (institucion && categoria === TIPOS.SEMINARIOS && !loading_cursos) {
        const { institucion_nombre, institucion_logo } = institucion;

        const filter_convocatorias = () => {
            if (search.length === 0) {
                return cursos
                    .filter(
                        (e) =>
                            e.tipo_curso_otro.tipo_conv_curso_nombre ===
                            TIPOS.SEMINARIOS
                    )
                    .slice(currentPage, currentPage + 6);
            }
            return cursos
                .filter(
                    (e) =>
                        e.tipo_curso_otro.tipo_conv_curso_nombre ===
                            TIPOS.SEMINARIOS &&
                        e.det_titulo
                            .toLowerCase()
                            .includes(search.toLowerCase())
                )
                .slice(currentPage, currentPage + 6);
        };

        const nextPage = () => {
            if (
                cursos.filter(
                    (e) =>
                        e.tipo_curso_otro.tipo_conv_curso_nombre ===
                            TIPOS.SEMINARIOS &&
                        e.det_titulo
                            .toLowerCase()
                            .includes(search.toLowerCase())
                ).length >
                currentPage + 5
            )
                setCurrentPage(currentPage + 6);
        };

        return (
            <>
                <div className="d-flex justify-content-between content-search-btn">
                    <div className="d-flex align-items-center mb-2 content-search">
                        <label
                            htmlFor="search"
                            className="text-white"
                            style={{
                                fontSize: "2em",
                                marginRight: "0.5em",
                                marginBottom: "0.5em",
                            }}
                        >
                            <FaSearch />
                        </label>
                        <input
                            type="text"
                            placeholder="Buscar"
                            name="search"
                            className="mb-3 form-control flex-1"
                            value={search}
                            onChange={onSearchChange}
                            style={{ marginRight: "1em" }}
                        />
                    </div>
                    <div className="content-btn">
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            onClick={prevPage}
                        >
                            Anterior
                        </button>
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            style={{ marginLeft: "10px" }}
                            onClick={nextPage}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
                <div className="row">
                    {filter_convocatorias().map((item, index) => (
                        <div className="col-md-4 m-15px-tb" key={index}>
                            <div
                                className="blog-grid"
                                onClick={() => toggleModal(item)}
                            >
                                <div className="blog-img">
                                    <a>
                                        <img
                                            src={`${process.env.REACT_APP_ROOT_API}/Cursos/${item.det_img_portada}`}
                                            alt="blog post"
                                        ></img>
                                    </a>
                                </div>
                                <div className="blog-info">
                                    <div className="meta">
                                        Fecha :{" "}
                                        {formatearFecha(item.det_fecha_ini)} -{" "}
                                        {
                                            item.tipo_curso_otro
                                                .tipo_conv_curso_nombre
                                        }
                                    </div>
                                    <h6>
                                        <a>{item.det_titulo}</a>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filter_convocatorias().length === 0 && (
                        <SinRegistros title={categoria} />
                    )}
                </div>
                {/* End .row */}

                {selectedConvocatoria && (
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        contentLabel="My dialog"
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                        closeTimeoutMS={500}
                    >
                        <div>
                            <button
                                className="close-modal"
                                onClick={() => setIsOpen(false)}
                            >
                                <img src="/img/cancel.svg" alt="close icon" />
                            </button>
                            {/* End close icon */}

                            <div className="box_inner">
                                <div className="scrollable">
                                    <div className="blog-grid">
                                        <div className="blog-img">
                                            <img
                                                src={`${process.env.REACT_APP_ROOT_API}/Cursos/${selectedConvocatoria.det_img_portada}`}
                                                style={{ width: "100%" }}
                                                alt="blog post"
                                            ></img>
                                        </div>
                                        {/* End blog-img */}
                                        <article className="article">
                                            <div className="article-title">
                                                <h2>
                                                    {
                                                        selectedConvocatoria.det_titulo
                                                    }
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
                                                                selectedConvocatoria.det_fecha_ini
                                                            )}
                                                        </span>
                                                        <hr />
                                                        <h5>DESCRIPCION</h5>
                                                        <hr />
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: selectedConvocatoria.det_descripcion,
                                                            }}
                                                        ></div>
                                                        <hr />
                                                        <h5>
                                                            DATOS E INFORMACIÓN
                                                        </h5>
                                                        <hr />
                                                        <p>
                                                            Costo para
                                                            estudiantes :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_costo
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Costo para
                                                            Extranjeros :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_costo_ext
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Costo para
                                                            Profesionales :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_costo_profe
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Cupos disponibles :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_cupo_max
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Carga Horaria :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_carga_horaria
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Lugar de
                                                            Capacitacion :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_lugar_curso
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Modalidad :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_modalidad
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Fecha de Inicio :{" "}
                                                            <span>
                                                                {formatearFecha(
                                                                    selectedConvocatoria.det_fecha_ini
                                                                )}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Fecha de Fin :{" "}
                                                            <span>
                                                                {formatearFecha(
                                                                    selectedConvocatoria.det_fecha_fin
                                                                )}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Hora de Inicio :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_hora_ini
                                                                }
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
                                                                        selectedConvocatoria.det_grupo_whatssap
                                                                    }
                                                                >
                                                                    Link de
                                                                    Curso...
                                                                </a>
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Version del Curso :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.det_version
                                                                }
                                                            </span>
                                                        </p>
                                                        {/* End article content */}
                                                        <BlogNav
                                                            setIsOpen={
                                                                setIsOpen
                                                            }
                                                        />
                                                        {/* End tag */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End .article-title */}
                                        </article>
                                        {/* End Article */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End modal box news */}
                    </Modal>
                )}
            </>
        );
    }
    if (institucion && categoria === TIPOS.SERVICIOS && !loading_servicios) {
        const { institucion_nombre, institucion_logo } = institucion;

        const filter_convocatorias = () => {
            if (search.length === 0) {
                return servicios.slice(currentPage, currentPage + 6);
            }
            return servicios
                .filter((e) =>
                    e.serv_nombre.toLowerCase().includes(search.toLowerCase())
                )
                .slice(currentPage, currentPage + 6);
        };

        const nextPage = () => {
            if (
                servicios.filter((e) =>
                    e.serv_nombre.toLowerCase().includes(search.toLowerCase())
                ).length >
                currentPage + 5
            )
                setCurrentPage(currentPage + 6);
        };

        return (
            <>
                <div className="d-flex justify-content-between content-search-btn">
                    <div className="d-flex align-items-center mb-2 content-search">
                        <label
                            htmlFor="search"
                            className="text-white"
                            style={{
                                fontSize: "2em",
                                marginRight: "0.5em",
                                marginBottom: "0.5em",
                            }}
                        >
                            <FaSearch />
                        </label>
                        <input
                            type="text"
                            placeholder="Buscar"
                            name="search"
                            className="mb-3 form-control flex-1"
                            value={search}
                            onChange={onSearchChange}
                            style={{ marginRight: "1em" }}
                        />
                    </div>
                    <div className="content-btn">
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            onClick={prevPage}
                        >
                            Anterior
                        </button>
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            style={{ marginLeft: "10px" }}
                            onClick={nextPage}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
                <div className="row">
                    {filter_convocatorias().map((item, index) => (
                        <div className="col-md-4 m-15px-tb" key={index}>
                            <div
                                className="blog-grid"
                                onClick={() => toggleModal(item)}
                            >
                                <div className="blog-img">
                                    <a>
                                        <img
                                            src={`${process.env.REACT_APP_ROOT_API}/Carrera/Servicios/${item.serv_imagen}`}
                                            alt="blog post"
                                        ></img>
                                    </a>
                                </div>
                                <div className="blog-info">
                                    <div className="meta">
                                        Fecha :{" "}
                                        {formatearFecha(item.serv_registro)} -{" "}
                                        {TIPOS.SERVICIOS}
                                    </div>
                                    <h6>
                                        <a>{item.serv_nombre}</a>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filter_convocatorias().length === 0 && (
                        <SinRegistros title={categoria} />
                    )}
                </div>
                {/* End .row */}

                {selectedConvocatoria && (
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        contentLabel="My dialog"
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                        closeTimeoutMS={500}
                    >
                        <div>
                            <button
                                className="close-modal"
                                onClick={() => setIsOpen(false)}
                            >
                                <img src="/img/cancel.svg" alt="close icon" />
                            </button>
                            {/* End close icon */}

                            <div className="box_inner">
                                <div className="scrollable">
                                    <div className="blog-grid">
                                        <div className="blog-img">
                                            <img
                                                src={`${process.env.REACT_APP_ROOT_API}/Carrera/Servicios/${selectedConvocatoria.serv_imagen}`}
                                                style={{ width: "100%" }}
                                                alt="blog post"
                                            ></img>
                                        </div>
                                        {/* End blog-img */}
                                        <article className="article">
                                            <div className="article-title">
                                                <h2>
                                                    {
                                                        selectedConvocatoria.serv_nombre
                                                    }
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
                                                                selectedConvocatoria.serv_registro
                                                            )}
                                                        </span>
                                                        <hr />
                                                        <h5>DESCRIPCION</h5>
                                                        <hr />
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: selectedConvocatoria.serv_descripcion,
                                                            }}
                                                        ></div>
                                                        <hr />
                                                        <h5>
                                                            DATOS DEL SERVICIO
                                                        </h5>
                                                        <hr />
                                                        <p>
                                                            celular :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.serv_nro_celular
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            inicio del servicio
                                                            :{" "}
                                                            <span>
                                                                {formatearFecha(
                                                                    selectedConvocatoria.serv_registro
                                                                )}
                                                            </span>
                                                        </p>
                                                        {/* End article content */}
                                                        <BlogNav
                                                            setIsOpen={
                                                                setIsOpen
                                                            }
                                                        />
                                                        {/* End tag */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End .article-title */}
                                        </article>
                                        {/* End Article */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End modal box news */}
                    </Modal>
                )}
            </>
        );
    }
    if (
        institucion &&
        categoria === TIPOS.OFERTAS_ACADEMICAS &&
        !loading_ofertas
    ) {
        const { institucion_nombre, institucion_logo } = institucion;

        const filter_convocatorias = () => {
            if (search.length === 0) {
                return ofertas.slice(currentPage, currentPage + 6);
            }
            return ofertas
                .filter((e) =>
                    e.ofertas_titulo
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )
                .slice(currentPage, currentPage + 6);
        };

        const nextPage = () => {
            if (
                ofertas.filter((e) =>
                    e.ofertas_titulo
                        .toLowerCase()
                        .includes(search.toLowerCase())
                ).length >
                currentPage + 5
            )
                setCurrentPage(currentPage + 6);
        };

        return (
            <>
                <div className="d-flex justify-content-between content-search-btn">
                    <div className="d-flex align-items-center mb-2 content-search">
                        <label
                            htmlFor="search"
                            className="text-white"
                            style={{
                                fontSize: "2em",
                                marginRight: "0.5em",
                                marginBottom: "0.5em",
                            }}
                        >
                            <FaSearch />
                        </label>
                        <input
                            type="text"
                            placeholder="Buscar"
                            name="search"
                            className="mb-3 form-control flex-1"
                            value={search}
                            onChange={onSearchChange}
                            style={{ marginRight: "1em" }}
                        />
                    </div>
                    <div className="content-btn">
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            onClick={prevPage}
                        >
                            Anterior
                        </button>
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            style={{ marginLeft: "10px" }}
                            onClick={nextPage}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
                <div className="row">
                    {filter_convocatorias().map((item, index) => (
                        <div className="col-md-4 m-15px-tb" key={index}>
                            <div
                                className="blog-grid"
                                onClick={() => toggleModal(item)}
                            >
                                <div className="blog-img">
                                    <a>
                                        <img
                                            src={`${process.env.REACT_APP_ROOT_API}/Carrera/OfertasAcademicas/${item.ofertas_imagen}`}
                                            alt="blog post"
                                        ></img>
                                    </a>
                                </div>
                                <div className="blog-info">
                                    <div className="meta">
                                        Fecha :{" "}
                                        {formatearFecha(
                                            item.ofertas_fecha_creacion
                                        )}{" "}
                                        - {TIPOS.OFERTAS_ACADEMICAS}
                                    </div>
                                    <h6>
                                        <a>{item.ofertas_titulo}</a>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filter_convocatorias().length === 0 && (
                        <SinRegistros title={categoria} />
                    )}
                </div>
                {/* End .row */}

                {selectedConvocatoria && (
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        contentLabel="My dialog"
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                        closeTimeoutMS={500}
                    >
                        <div>
                            <button
                                className="close-modal"
                                onClick={() => setIsOpen(false)}
                            >
                                <img src="/img/cancel.svg" alt="close icon" />
                            </button>
                            {/* End close icon */}

                            <div className="box_inner">
                                <div className="scrollable">
                                    <div className="blog-grid">
                                        <div className="blog-img">
                                            <img
                                                src={`${process.env.REACT_APP_ROOT_API}/Carrera/OfertasAcademicas/${selectedConvocatoria.ofertas_imagen}`}
                                                style={{ width: "100%" }}
                                                alt="blog post"
                                            ></img>
                                        </div>
                                        {/* End blog-img */}
                                        <article className="article">
                                            <div className="article-title">
                                                <h2>
                                                    {
                                                        selectedConvocatoria.ofertas_titulo
                                                    }
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
                                                                selectedConvocatoria.ofertas_fecha_creacion
                                                            )}
                                                        </span>
                                                        <hr />
                                                        <h5>DESCRIPCION</h5>
                                                        <hr />
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: selectedConvocatoria.ofertas_descripcion,
                                                            }}
                                                        ></div>
                                                        <hr />
                                                        <h5>
                                                            DATOS DEL SERVICIO
                                                        </h5>
                                                        <hr />
                                                        <p>
                                                            Inicio de la Oferta
                                                            :{" "}
                                                            <span>
                                                                {formatearFecha(
                                                                    selectedConvocatoria.ofertas_inscripciones_ini
                                                                )}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Fin de la Oferta :{" "}
                                                            <span>
                                                                {formatearFecha(
                                                                    selectedConvocatoria.ofertas_inscripciones_fin
                                                                )}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Fecha de Examen :{" "}
                                                            <span>
                                                                {formatearFecha(
                                                                    selectedConvocatoria.ofertas_fecha_examen
                                                                )}
                                                            </span>{" "}
                                                        </p>
                                                        <p>
                                                            Referencia de la
                                                            Oferta :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.ofertas_referencia
                                                                }
                                                            </span>
                                                        </p>
                                                        {/* End article content */}
                                                        <BlogNav
                                                            setIsOpen={
                                                                setIsOpen
                                                            }
                                                        />
                                                        {/* End tag */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End .article-title */}
                                        </article>
                                        {/* End Article */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End modal box news */}
                    </Modal>
                )}
            </>
        );
    }
    if (
        institucion &&
        categoria === TIPOS.PUBLICACIONES &&
        !loading_publicaciones
    ) {
        const { institucion_nombre, institucion_logo } = institucion;

        const filter_convocatorias = () => {
            if (search.length === 0) {
                return publicaciones.slice(currentPage, currentPage + 6);
            }
            return publicaciones
                .filter((e) =>
                    e.publicaciones_titulo
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )
                .slice(currentPage, currentPage + 6);
        };

        const nextPage = () => {
            if (
                publicaciones.filter((e) =>
                    e.publicaciones_titulo
                        .toLowerCase()
                        .includes(search.toLowerCase())
                ).length >
                currentPage + 5
            )
                setCurrentPage(currentPage + 6);
        };

        return (
            <>
                <div className="d-flex justify-content-between content-search-btn">
                    <div className="d-flex align-items-center mb-2 content-search">
                        <label
                            htmlFor="search"
                            className="text-white"
                            style={{
                                fontSize: "2em",
                                marginRight: "0.5em",
                                marginBottom: "0.5em",
                            }}
                        >
                            <FaSearch />
                        </label>
                        <input
                            type="text"
                            placeholder="Buscar"
                            name="search"
                            className="mb-3 form-control flex-1"
                            value={search}
                            onChange={onSearchChange}
                            style={{ marginRight: "1em" }}
                        />
                    </div>
                    <div className="content-btn">
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            onClick={prevPage}
                        >
                            Anterior
                        </button>
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            style={{ marginLeft: "10px" }}
                            onClick={nextPage}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
                <div className="row">
                    {filter_convocatorias().map((item, index) => (
                        <div className="col-md-4 m-15px-tb" key={index}>
                            <div
                                className="blog-grid"
                                onClick={() => toggleModal(item)}
                            >
                                <div className="blog-img">
                                    <a>
                                        <img
                                            src={`${process.env.REACT_APP_ROOT_API}/Publicaciones/${item.publicaciones_imagen}`}
                                            alt="blog post"
                                        ></img>
                                    </a>
                                </div>
                                <div className="blog-info">
                                    <div className="meta">
                                        Fecha :{" "}
                                        {formatearFecha(
                                            item.publicaciones_fecha
                                        )}{" "}
                                        - {TIPOS.PUBLICACIONES}
                                    </div>
                                    <h6>
                                        <a>{item.publicaciones_titulo}</a>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filter_convocatorias().length === 0 && (
                        <SinRegistros title={categoria} />
                    )}
                </div>
                {/* End .row */}

                {selectedConvocatoria && (
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        contentLabel="My dialog"
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                        closeTimeoutMS={500}
                    >
                        <div>
                            <button
                                className="close-modal"
                                onClick={() => setIsOpen(false)}
                            >
                                <img src="/img/cancel.svg" alt="close icon" />
                            </button>
                            {/* End close icon */}

                            <div className="box_inner">
                                <div className="scrollable">
                                    <div className="blog-grid">
                                        <div className="blog-img">
                                            <img
                                                src={`${process.env.REACT_APP_ROOT_API}/Publicaciones/${selectedConvocatoria.publicaciones_imagen}`}
                                                style={{ width: "100%" }}
                                                alt="blog post"
                                            ></img>
                                        </div>
                                        {/* End blog-img */}
                                        <article className="article">
                                            <div className="article-title">
                                                <h2>
                                                    {
                                                        selectedConvocatoria.publicaciones_titulo
                                                    }
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
                                                                selectedConvocatoria.publicaciones_fecha
                                                            )}
                                                        </span>
                                                        <hr />
                                                        <h5>DESCRIPCION</h5>
                                                        <hr />
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: selectedConvocatoria.publicaciones_descripcion,
                                                            }}
                                                        ></div>
                                                        <hr />
                                                        <h5>
                                                            DATOS DE LA
                                                            PUBLICACIÓN
                                                        </h5>
                                                        <hr />
                                                        <p>
                                                            Fecha de Publicacion
                                                            :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.publicaciones_fecha
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Autor :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.publicaciones_autor
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Documento :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.publicaciones_documento
                                                                }
                                                            </span>
                                                        </p>
                                                        {/* End article content */}
                                                        <BlogNav
                                                            setIsOpen={
                                                                setIsOpen
                                                            }
                                                        />
                                                        {/* End tag */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End .article-title */}
                                        </article>
                                        {/* End Article */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End modal box news */}
                    </Modal>
                )}
            </>
        );
    }
    if (institucion && categoria === TIPOS.GACETAS && !loading_gacetas) {
        const { institucion_nombre, institucion_logo } = institucion;

        const filter_convocatorias = () => {
            if (search.length === 0) {
                return gacetas.slice(currentPage, currentPage + 6);
            }
            return gacetas
                .filter((e) =>
                    e.gaceta_titulo.toLowerCase().includes(search.toLowerCase())
                )
                .slice(currentPage, currentPage + 6);
        };

        const nextPage = () => {
            if (
                gacetas.filter((e) =>
                    e.gaceta_titulo.toLowerCase().includes(search.toLowerCase())
                ).length >
                currentPage + 5
            )
                setCurrentPage(currentPage + 6);
        };

        return (
            <>
                <div className="d-flex justify-content-between content-search-btn">
                    <div className="d-flex align-items-center mb-2 content-search">
                        <label
                            htmlFor="search"
                            className="text-white"
                            style={{
                                fontSize: "2em",
                                marginRight: "0.5em",
                                marginBottom: "0.5em",
                            }}
                        >
                            <FaSearch />
                        </label>
                        <input
                            type="text"
                            placeholder="Buscar"
                            name="search"
                            className="mb-3 form-control flex-1"
                            value={search}
                            onChange={onSearchChange}
                            style={{ marginRight: "1em" }}
                        />
                    </div>
                    <div className="content-btn">
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            onClick={prevPage}
                        >
                            Anterior
                        </button>
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            style={{ marginLeft: "10px" }}
                            onClick={nextPage}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
                <div className="row">
                    {filter_convocatorias().map((item, index) => (
                        <div className="col-md-4 m-15px-tb" key={index}>
                            <div
                                className="blog-grid"
                                onClick={() => toggleModal(item)}
                            >
                                <div
                                    className="blog-img"
                                    style={{ height: "480px" }}
                                >
                                    <Document
                                        file={`${process.env.REACT_APP_ROOT_API}/Gaceta/${item.gaceta_documento}`}
                                    >
                                        <Page pageNumber={1} width="360" />
                                    </Document>
                                </div>
                                <div className="blog-info">
                                    <div className="meta">
                                        Fecha :{" "}
                                        {formatearFecha(item.gaceta_fecha)} -{" "}
                                        {TIPOS.GACETAS}
                                    </div>
                                    <h6>
                                        <a>{item.gaceta_titulo}</a>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filter_convocatorias().length === 0 && (
                        <SinRegistros title={categoria} />
                    )}
                </div>
                {/* End .row */}

                {selectedConvocatoria && (
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        contentLabel="My dialog"
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                        closeTimeoutMS={500}
                    >
                        <div>
                            <button
                                className="close-modal"
                                onClick={() => setIsOpen(false)}
                            >
                                <img src="/img/cancel.svg" alt="close icon" />
                            </button>
                            {/* End close icon */}

                            <div className="box_inner">
                                <div className="scrollable">
                                    <div className="blog-grid">
                                        <div className="blog-img">
                                            <Document
                                                file={`${process.env.REACT_APP_ROOT_API}/Gaceta/${selectedConvocatoria.gaceta_documento}`}
                                            >
                                                <Page
                                                    pageNumber={1}
                                                    width="940"
                                                />
                                            </Document>
                                        </div>
                                        {/* End blog-img */}
                                        <article className="article">
                                            <div className="article-title">
                                                <h2>
                                                    {
                                                        selectedConvocatoria.gaceta_titulo
                                                    }
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
                                                                selectedConvocatoria.gaceta_fecha
                                                            )}
                                                        </span>
                                                        <hr />
                                                        <h5>
                                                            DATOS DE LA GACETA
                                                        </h5>
                                                        <hr />
                                                        <p>
                                                            Fecha de Publicacion
                                                            de la gaceta :{" "}
                                                            <span>
                                                                {formatearFecha(
                                                                    selectedConvocatoria.gaceta_fecha
                                                                )}
                                                            </span>
                                                        </p>
                                                        <a
                                                            href={`${process.env.REACT_APP_ROOT_API}/Gaceta/${selectedConvocatoria.gaceta_documento}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <button className="px-btn px-btn-white content-btn-btn">
                                                                Descargar PDF
                                                            </button>
                                                        </a>
                                                        {/* End article content */}
                                                        <BlogNav
                                                            setIsOpen={
                                                                setIsOpen
                                                            }
                                                        />
                                                        {/* End tag */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End .article-title */}
                                        </article>
                                        {/* End Article */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End modal box news */}
                    </Modal>
                )}
            </>
        );
    }
    if (institucion && categoria === TIPOS.EVENTOS && !loading_eventos) {
        const { institucion_nombre, institucion_logo } = institucion;

        const filter_convocatorias = () => {
            if (search.length === 0) {
                return eventos.slice(currentPage, currentPage + 6);
            }
            return eventos
                .filter((e) =>
                    e.evento_titulo.toLowerCase().includes(search.toLowerCase())
                )
                .slice(currentPage, currentPage + 6);
        };

        const nextPage = () => {
            if (
                eventos.filter((e) =>
                    e.evento_titulo.toLowerCase().includes(search.toLowerCase())
                ).length >
                currentPage + 5
            )
                setCurrentPage(currentPage + 6);
        };

        return (
            <>
                <div className="d-flex justify-content-between content-search-btn">
                    <div className="d-flex align-items-center mb-2 content-search">
                        <label
                            htmlFor="search"
                            className="text-white"
                            style={{
                                fontSize: "2em",
                                marginRight: "0.5em",
                                marginBottom: "0.5em",
                            }}
                        >
                            <FaSearch />
                        </label>
                        <input
                            type="text"
                            placeholder="Buscar"
                            name="search"
                            className="mb-3 form-control flex-1"
                            value={search}
                            onChange={onSearchChange}
                            style={{ marginRight: "1em" }}
                        />
                    </div>
                    <div className="content-btn">
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            onClick={prevPage}
                        >
                            Anterior
                        </button>
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            style={{ marginLeft: "10px" }}
                            onClick={nextPage}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
                <div className="row">
                    {filter_convocatorias().map((item, index) => (
                        <div className="col-md-4 m-15px-tb" key={index}>
                            <div
                                className="blog-grid"
                                onClick={() => toggleModal(item)}
                            >
                                <div className="blog-img">
                                    <a>
                                        <img
                                            src={`${process.env.REACT_APP_ROOT_API}/Eventos/${item.evento_imagen}`}
                                            alt="blog post"
                                        ></img>
                                    </a>
                                </div>
                                <div className="blog-info">
                                    <div className="meta">
                                        Fecha :{" "}
                                        {formatearFecha(item.evento_fecha)} -{" "}
                                        {TIPOS.EVENTOS}
                                    </div>
                                    <h6>
                                        <a>{item.evento_titulo}</a>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filter_convocatorias().length === 0 && (
                        <SinRegistros title={categoria} />
                    )}
                </div>
                {/* End .row */}

                {selectedConvocatoria && (
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        contentLabel="My dialog"
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                        closeTimeoutMS={500}
                    >
                        <div>
                            <button
                                className="close-modal"
                                onClick={() => setIsOpen(false)}
                            >
                                <img src="/img/cancel.svg" alt="close icon" />
                            </button>
                            {/* End close icon */}

                            <div className="box_inner">
                                <div className="scrollable">
                                    <div className="blog-grid">
                                        <div className="blog-img">
                                            <img
                                                src={`${process.env.REACT_APP_ROOT_API}/Eventos/${selectedConvocatoria.evento_imagen}`}
                                                style={{ width: "100%" }}
                                                alt="blog post"
                                            ></img>
                                        </div>
                                        {/* End blog-img */}
                                        <article className="article">
                                            <div className="article-title">
                                                <h2>
                                                    {
                                                        selectedConvocatoria.evento_titulo
                                                    }
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
                                                                selectedConvocatoria.evento_fecha
                                                            )}
                                                        </span>
                                                        <hr />
                                                        <h5>DESCRIPCION</h5>
                                                        <hr />
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: selectedConvocatoria.publicaciones_descripcion,
                                                            }}
                                                        ></div>{" "}
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: selectedConvocatoria.evento_descripcion,
                                                            }}
                                                        ></div>
                                                        <hr />
                                                        <h5>
                                                            DATOS DEL EVENTO
                                                        </h5>
                                                        <hr />
                                                        <p>
                                                            Fecha del Evento :{" "}
                                                            <span>
                                                                {formatearFecha(
                                                                    selectedConvocatoria.evento_fecha
                                                                )}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Hora del Evento :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.evento_hora
                                                                }
                                                            </span>
                                                        </p>
                                                        <p>
                                                            Lugar del Evento :{" "}
                                                            <span>
                                                                {
                                                                    selectedConvocatoria.evento_lugar
                                                                }
                                                            </span>
                                                        </p>
                                                        {/* End article content */}
                                                        <BlogNav
                                                            setIsOpen={
                                                                setIsOpen
                                                            }
                                                        />
                                                        {/* End tag */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End .article-title */}
                                        </article>
                                        {/* End Article */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End modal box news */}
                    </Modal>
                )}
            </>
        );
    }
    if (institucion && categoria === TIPOS.VIDEOS && !loading_videos) {
        const { institucion_nombre, institucion_logo } = institucion;

        const filter_convocatorias = () => {
            if (search.length === 0) {
                return videos.slice(currentPage, currentPage + 6);
            }
            return videos
                .filter((e) =>
                    e.video_titulo.toLowerCase().includes(search.toLowerCase())
                )
                .slice(currentPage, currentPage + 6);
        };

        const nextPage = () => {
            if (
                videos.filter((e) =>
                    e.video_titulo.toLowerCase().includes(search.toLowerCase())
                ).length >
                currentPage + 5
            )
                setCurrentPage(currentPage + 6);
        };

        return (
            <>
                <div className="d-flex justify-content-between content-search-btn">
                    <div className="d-flex align-items-center mb-2 content-search">
                        <label
                            htmlFor="search"
                            className="text-white"
                            style={{
                                fontSize: "2em",
                                marginRight: "0.5em",
                                marginBottom: "0.5em",
                            }}
                        >
                            <FaSearch />
                        </label>
                        <input
                            type="text"
                            placeholder="Buscar"
                            name="search"
                            className="mb-3 form-control flex-1"
                            value={search}
                            onChange={onSearchChange}
                            style={{ marginRight: "1em" }}
                        />
                    </div>
                    <div className="content-btn">
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            onClick={prevPage}
                        >
                            Anterior
                        </button>
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            style={{ marginLeft: "10px" }}
                            onClick={nextPage}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
                <div className="row">
                    {filter_convocatorias().map((item, index) => (
                        <div className="col-md-4 m-15px-tb" key={index}>
                            <div
                                className="blog-grid"
                                onClick={() => toggleModal(item)}
                            >
                                <div className="blog-img">
                                    <a>
                                        <ReactPlayer
                                            url={item.video_enlace}
                                            className="react-player"
                                            width="100%"
                                        />
                                    </a>
                                </div>
                                <div className="blog-info">
                                    <div className="meta">{TIPOS.VIDEOS}</div>
                                    <h6>
                                        <a>{item.video_titulo}</a>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filter_convocatorias().length === 0 && (
                        <SinRegistros title={categoria} />
                    )}
                </div>
                {/* End .row */}

                {selectedConvocatoria && (
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        contentLabel="My dialog"
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                        closeTimeoutMS={500}
                    >
                        <div>
                            <button
                                className="close-modal"
                                onClick={() => setIsOpen(false)}
                            >
                                <img src="/img/cancel.svg" alt="close icon" />
                            </button>
                            {/* End close icon */}

                            <div className="box_inner">
                                <div className="scrollable">
                                    <div className="blog-grid">
                                        <div className="blog-img">
                                            <ReactPlayer
                                                url={
                                                    selectedConvocatoria.video_enlace
                                                }
                                                className="react-player"
                                                width="100%"
                                            />
                                        </div>
                                        {/* End blog-img */}
                                        <article className="article">
                                            <div className="article-title">
                                                <h2>
                                                    {
                                                        selectedConvocatoria.video_titulo
                                                    }
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
                                                        <hr />
                                                        <h5>DESCRIPCION</h5>
                                                        <hr />
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: selectedConvocatoria.video_breve_descripcion,
                                                            }}
                                                        ></div>
                                                        {/* End article content */}
                                                        <BlogNav
                                                            setIsOpen={
                                                                setIsOpen
                                                            }
                                                        />
                                                        {/* End tag */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End .article-title */}
                                        </article>
                                        {/* End Article */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End modal box news */}
                    </Modal>
                )}
            </>
        );
    }
    if (institucion && categoria === TIPOS.INSTITUTO && !loading_gacetas) {
        const { institucion_nombre, institucion_logo } = institucion;

        var filter_gacetas = gacetas.filter((e) =>
            e.gaceta_titulo.toLowerCase().includes("instituto")
        );
        const filter_convocatorias = () => {
            if (search.length === 0) {
                return filter_gacetas.slice(currentPage, currentPage + 6);
            }
            return filter_gacetas
                .filter((e) =>
                    e.gaceta_titulo.toLowerCase().includes(search.toLowerCase())
                )
                .slice(currentPage, currentPage + 6);
        };

        const nextPage = () => {
            if (
                filter_gacetas.filter((e) =>
                    e.gaceta_titulo.toLowerCase().includes(search.toLowerCase())
                ).length >
                currentPage + 5
            )
                setCurrentPage(currentPage + 6);
        };

        return (
            <>
                <div className="d-flex justify-content-between content-search-btn">
                    <div className="d-flex align-items-center mb-2 content-search">
                        <label
                            htmlFor="search"
                            className="text-white"
                            style={{
                                fontSize: "2em",
                                marginRight: "0.5em",
                                marginBottom: "0.5em",
                            }}
                        >
                            <FaSearch />
                        </label>
                        <input
                            type="text"
                            placeholder="Buscar"
                            name="search"
                            className="mb-3 form-control flex-1"
                            value={search}
                            onChange={onSearchChange}
                            style={{ marginRight: "1em" }}
                        />
                    </div>
                    <div className="content-btn">
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            onClick={prevPage}
                        >
                            Anterior
                        </button>
                        <button
                            className="px-btn px-btn-white content-btn-btn"
                            style={{ marginLeft: "10px" }}
                            onClick={nextPage}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
                <div className="row">
                    {filter_convocatorias().map((item, index) => (
                        <div className="col-md-4 m-15px-tb" key={index}>
                            <div
                                className="blog-grid"
                                onClick={() => toggleModal(item)}
                            >
                                <div
                                    className="blog-img"
                                    style={{ height: "480px" }}
                                >
                                    <Document
                                        file={`${process.env.REACT_APP_ROOT_API}/Gaceta/${item.gaceta_documento}`}
                                    >
                                        <Page pageNumber={1} width="360" />
                                    </Document>
                                </div>
                                <div className="blog-info">
                                    <div className="meta">
                                        Fecha :{" "}
                                        {formatearFecha(item.gaceta_fecha)} -{" "}
                                        {TIPOS.GACETAS}
                                    </div>
                                    <h6>
                                        <a>{item.gaceta_titulo}</a>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filter_convocatorias().length === 0 && (
                        <SinRegistros title={categoria} />
                    )}
                </div>
                {/* End .row */}

                {selectedConvocatoria && (
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        contentLabel="My dialog"
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                        closeTimeoutMS={500}
                    >
                        <div>
                            <button
                                className="close-modal"
                                onClick={() => setIsOpen(false)}
                            >
                                <img src="/img/cancel.svg" alt="close icon" />
                            </button>
                            {/* End close icon */}

                            <div className="box_inner">
                                <div className="scrollable">
                                    <div className="blog-grid">
                                        <div className="blog-img">
                                            <Document
                                                file={`${process.env.REACT_APP_ROOT_API}/Gaceta/${selectedConvocatoria.gaceta_documento}`}
                                            >
                                                <Page
                                                    pageNumber={1}
                                                    width="940"
                                                />
                                            </Document>
                                        </div>
                                        {/* End blog-img */}
                                        <article className="article">
                                            <div className="article-title">
                                                <h2>
                                                    {
                                                        selectedConvocatoria.gaceta_titulo
                                                    }
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
                                                                selectedConvocatoria.gaceta_fecha
                                                            )}
                                                        </span>
                                                        <hr />
                                                        <h5>
                                                            DATOS DE LA GACETA
                                                        </h5>
                                                        <hr />
                                                        <p>
                                                            Fecha de Publicacion
                                                            de la gaceta :{" "}
                                                            <span>
                                                                {formatearFecha(
                                                                    selectedConvocatoria.gaceta_fecha
                                                                )}
                                                            </span>
                                                        </p>
                                                        <a
                                                            href={`${process.env.REACT_APP_ROOT_API}/Gaceta/${selectedConvocatoria.gaceta_documento}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <button className="px-btn px-btn-white content-btn-btn">
                                                                Descargar PDF
                                                            </button>
                                                        </a>
                                                        {/* End article content */}
                                                        <BlogNav
                                                            setIsOpen={
                                                                setIsOpen
                                                            }
                                                        />
                                                        {/* End tag */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End .article-title */}
                                        </article>
                                        {/* End Article */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End modal box news */}
                    </Modal>
                )}
            </>
        );
    }

    return null;
};

export default Blog;

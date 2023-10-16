import { NavLink } from "react-router-dom";
import { TIPOS } from "../../types/types";

function BlogNav({ setIsOpen }) {
    return (
        <ul className="nav tag-cloud">
            <li>
                <NavLink
                    className={"nav_link"}
                    to={`/Recurso/${TIPOS.CONVOCATORIAS}`}
                    onClick={() => setIsOpen(false)}
                >
                    Convocatorias
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={"nav_link"}
                    to={`/Recurso/${TIPOS.COMUNICADOS}`}
                    onClick={() => setIsOpen(false)}
                >
                    Comunicados
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={"nav_link"}
                    to={`/Recurso/${TIPOS.AVISOS}`}
                    onClick={() => setIsOpen(false)}
                >
                    Avisos
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={"nav_link"}
                    to={`/Recurso/${TIPOS.CURSOS}`}
                    onClick={() => setIsOpen(false)}
                >
                    Cursos
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={"nav_link"}
                    to={`/Recurso/${TIPOS.SEMINARIOS}`}
                    onClick={() => setIsOpen(false)}
                >
                    Seminarios
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={"nav_link"}
                    to={`/Recurso/${TIPOS.OFERTAS_ACADEMICAS}`}
                    onClick={() => setIsOpen(false)}
                >
                    Ofertas Académicas
                </NavLink>
            </li>
            <li href="#">
                <NavLink
                    className={"nav_link"}
                    to={`/Recurso/${TIPOS.PUBLICACIONES}`}
                    onClick={() => setIsOpen(false)}
                >
                    Publicaciones
                </NavLink>
            </li>
            <li href="#">
                <NavLink
                    className={"nav_link"}
                    to={`/Recurso/${TIPOS.GACETAS}`}
                    onClick={() => setIsOpen(false)}
                >
                    Gacetas
                </NavLink>
            </li>
            <li href="#">
                <NavLink
                    className={"nav_link"}
                    to={`/Recurso/${TIPOS.EVENTOS}`}
                    onClick={() => setIsOpen(false)}
                >
                    Eventos
                </NavLink>
            </li>
            <li href="#">
                <NavLink
                    className={"nav_link"}
                    to={`/Recurso/${TIPOS.VIDEOS}`}
                    onClick={() => setIsOpen(false)}
                >
                    Videos
                </NavLink>
            </li>
        </ul>
    );
}

export default BlogNav;

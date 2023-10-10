export default function ConfigColorIcon(institucion, title) {
    // Supongamos que aquí estableces los estilos en función de la información de la institución
    document.documentElement.style.setProperty(
        "--color-primario",
        institucion.colorinstitucion[0].color_primario
    );
    document.documentElement.style.setProperty(
        "--color-secundario",
        institucion.colorinstitucion[0].color_secundario
    );
    document.documentElement.style.setProperty(
        "--color-terciario",
        institucion.colorinstitucion[0].color_terciario
    );

    // Establece el ícono en el encabezado
    const link =
        document.querySelector("link[rel~='icon']") ||
        document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "icon";
    console.log("link", link);
    link.href = `${process.env.REACT_APP_ROOT_API}/InstitucionUpea/${institucion.institucion_logo}`;
    document.getElementsByTagName("head")[0].appendChild(link);
    document.title = `${title} | ${institucion.institucion_nombre}`;
}

import { FaBan } from "react-icons/fa";

const SinRegistros = ({ title }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h2>
                Sin Registros de{" "}
                <span style={{ color: "var(--color-primario)" }}>
                    {title.toUpperCase()}
                </span>{" "}
                <FaBan />
            </h2>
        </div>
    );
};

export default SinRegistros;

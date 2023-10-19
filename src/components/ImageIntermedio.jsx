function ImageIntermedio({ img }) {
    return (
        <div
            alt="intermedio"
            className="img-intermedio"
            style={{
                width: "100%",
                height: "350px",
                objectFit: "cover",
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundRepeat: "noRepeat",
                backgroundAttachment: "fixed",
            }}
        ></div>
    );
}

export default ImageIntermedio;

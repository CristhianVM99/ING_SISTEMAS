function RedesAnimation({ t, r, b, l }) {
    return (
        <div
            className="container_animation"
            style={{ top: t, right: r, bottom: b, left: l }}
        >
            <div style={{ color: "#fff" }} className="container_red">
                <div className="square">
                    <span style={{ "--i": 0 }}></span>
                    <span style={{ "--i": 1 }}></span>
                    <span style={{ "--i": 2 }}></span>
                    <span style={{ "--i": 3 }}></span>
                </div>
                <div className="square">
                    <span style={{ "--i": 0 }}></span>
                    <span style={{ "--i": 1 }}></span>
                    <span style={{ "--i": 2 }}></span>
                    <span style={{ "--i": 3 }}></span>
                </div>
                <div className="square">
                    <span style={{ "--i": 0 }}></span>
                    <span style={{ "--i": 1 }}></span>
                    <span style={{ "--i": 2 }}></span>
                    <span style={{ "--i": 3 }}></span>
                </div>
                <div className="square">
                    <span style={{ "--i": 0 }}></span>
                    <span style={{ "--i": 1 }}></span>
                    <span style={{ "--i": 2 }}></span>
                    <span style={{ "--i": 3 }}></span>
                </div>
                <div className="square">
                    <span style={{ "--i": 0 }}></span>
                    <span style={{ "--i": 1 }}></span>
                    <span style={{ "--i": 2 }}></span>
                    <span style={{ "--i": 3 }}></span>
                </div>
            </div>
        </div>
    );
}

export default RedesAnimation;

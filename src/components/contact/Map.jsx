import React from "react";

const Map = ({ institucion = null }) => {
    if (institucion) {
        const { institucion_api_google_map } = institucion;
        return (
            <>
                <div className="google-map">
                    <div className="embed-responsive embed-responsive-21by9">
                        <iframe
                            className="embed-responsive-item"
                            title="location title"
                            src={institucion_api_google_map}
                        ></iframe>
                    </div>
                </div>
                {/* End google-map */}
            </>
        );
    }
    return null;
};

export default Map;

export default function Service({
    mision = null,
    vision = null,
    objetivos = null,
}) {
    if (mision && vision && objetivos) {
        const EnlacesContent = [
            {
                icon: "icon-flag",
                title: "Misión",
                descriptions: mision,
                delayAnimation: "",
            },
            {
                icon: "icon-telescope",
                title: "Visión",
                descriptions: vision,
                delayAnimation: "200",
            },
            {
                icon: "icon-target",
                title: "Objetivos",
                descriptions: objetivos,
                delayAnimation: "400",
            },
        ];

        return (
            <>
                <div className="row">
                    {EnlacesContent.map((val, i) => (
                        <div
                            className="col-md-6 col-lg-4 my-3"
                            key={i}
                            data-aos="fade-right"
                            data-aos-duration="1200"
                            data-aos-delay={val.delayAnimation}
                        >
                            <div className="feature-box-01">
                                <div className="icon">
                                    <i className={`icon ${val.icon}`}></i>
                                </div>
                                <div className="feature-content">
                                    <h5>{val.title}</h5>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: val.descriptions,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            {/* End .feature-box-01 */}
                        </div>
                    ))}
                </div>
            </>
        );
    }
    return null;
}

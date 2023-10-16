import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPinterestP,
    FaPhoneAlt,
} from "react-icons/fa";

const Social = ({ facebook = null, twitter = null, celular = null }) => {
    if (facebook && twitter && celular) {
        const SocialShare = [
            { Social: <FaFacebookF />, link: facebook },
            { Social: <FaTwitter />, link: twitter },
            { Social: <FaPhoneAlt />, link: celular },
        ];

        return (
            <div className="nav social-icons justify-content-center">
                {SocialShare.map((val, i) => (
                    <a
                        key={i}
                        href={i === 2 ? `tel:${val.link}` : `${val.link}`}
                        rel="noreferrer"
                        target="_blank"
                    >
                        {val.Social}
                    </a>
                ))}
            </div>
        );
    }
    return null;
};

export default Social;

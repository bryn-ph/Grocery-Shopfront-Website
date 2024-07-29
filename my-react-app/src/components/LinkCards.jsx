import "./styles/LinkCards.css";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// INSPIRATION FROM https://codepen.io/choogoor/pen/RwBKZey
function LinkCards({ title, message, bgImageLink, navLink }) {
    return (
        <div className="linkCards">
            <a href={navLink}>
                <div className="card-hover">
                    <div className="card-hoverContent">
                        <h3 className="card-hoverTitle">
                            {title}
                        </h3>
                        <p className="card-hoverText">
                            {message}
                        </p>
                        <Link to={navLink} className="card-hoverLink">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>

                    <img src={bgImageLink} alt={title}>
                    </img>
                </div>
            </a>
        </div>
    );
}

LinkCards.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    bgImageLink: PropTypes.string.isRequired,
    navLink: PropTypes.string.isRequired
};

export default LinkCards;

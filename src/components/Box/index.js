import PropTypes from "prop-types";
import './box.scss';

const Box = ({ title, children }) => {
    return (
        <div className="box">
            <span className="box__title">{title}</span>
            <div className="box__content">
                {children}
            </div>
        </div>
    )
}

Box.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
}

export default Box;

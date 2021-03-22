import useStyles from "./style";
import PropTypes from "prop-types";

const Button = ({ label, icon, className, ...props }) => {
  const classes = useStyles(props);

  return (
    <button className={`${classes.button} ${className}`}>
      {icon}
      {label}
    </button>
  );
};

Button.propTypes = {
  width: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  radius: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  border: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
};

Button.defaultProps = {
  width: "10%",
  height: "5%",
  backgroundColor: "#588ac5",
  color: "#fff",
  radius: 5,
  border: 0,
};

export default Button;

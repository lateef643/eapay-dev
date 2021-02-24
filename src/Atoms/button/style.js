import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  button: (props) => ({
    display: "inline-block",
    padding: "11px 63px",
    backgroundColor: props.backgroundColor,
    borderRadius: props.radius,
    border: props.border,
    color: props.color,
    fontFamily: "'Roboto', sans-serif",
    fontSize: 16,
    fontWeight: 500,
    boxShadow: props.shadow,
    textTransform: "uppercase",

    
    "&:focus": {
      border: 0,
      outline: 0,
    },
  }),
});

export default styles;

import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  floatingLabelWrap: {
    display: "flex",
    flexDirection: "column",
    // minWidth: 350,
    position: "relative",
    transformOrigin: "top left",
    transition: "all 0.5s ease-out",
    "&:focus-within label": {
      transform: "translate(0, 7px) scale(0.75)",
    },
   
  },
  input: {
    width: "100%",
    height: 60,
    padding: "14px 15px 0 20px",
    outline: 0,
    borderRadius: 10,
    background: 'rgba(196, 196, 196, 0.18)',
    fontSize: 20,
    fontWeight: 300,
    fontFamily: "'Roboto', sans-serif",
    border: 0,
    color: '#818181',
    'input[type="date"]': {
      paddingRight: 12
    }
  },
  label: {
    fontSize: 14,
    padding: "0 12px",
    fontWeight: 500,
    fontFamily:  "'Roboto', sans-serif",
    color: "rgba(129, 129, 129, 0.6)",
    pointerEvents: "none",
    position: "absolute",
    transform: "translate(0, 19px) scale(1)",
  },
  active: {
    transform: "translate(0, 7px) scale(0.75)",
  },
});


export default styles;
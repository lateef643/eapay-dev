import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    floatingLabelWrap: {
        position: 'relative',
        width: 500,
        lineHeight: 40
    },
    input: {
        width: '100%',
        padding: '0.7em 0',
        borderBottom: '3px solid #acb3b8',
        boxShadow: 'none',
        color: 'blue',
        backgroundColor: 'transparent',
        letterSpacing: 1,
        fontSize: '1em',
        border: 0,
        '&:focus': {
            border: 0,
            outline: 0,
            borderBottom: '3px solid #acb3b8',
        },
        '&:focus + label': {
            color: 'green'
        }
    },
    label: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        color: '#999',
        transition: '0.25s all ease-in-out',
        cursor: 'text',
        textTransform: 'capitalize',
        fontSize: '2em',
        userSelect: 'none',
        letterSpacing: 1
    }
});

const FloatingInput = ({ type, placeholder, label, name, input }) => {
    const classes = useStyles();
  return (
    <div className={classes.floatingLabelWrap}>
      <input
        {...input}
        type={type}
        name={name}
        className={classes.input}
        id={name}
        placeholder={placeholder}
      />
      <label for={name} className={classes.label}>
        {label}
      </label>
    </div>
  );
};


export default FloatingInput;
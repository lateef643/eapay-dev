import useStyles from "./style";

const FloatingInput = ({
  type,
  placeholder,
  label,
  name,
  input,
  className,
  inputClassName,
  inputContainerClassName,
  meta,
}) => {
  const classes = useStyles();
  return (
    <div className={inputContainerClassName}>
      <div className={`${classes.floatingLabelWrap}  ${className}`}>
        <input
          {...input}
          type={type}
          name={name}
          className={`${classes.input}  ${inputClassName}`}
          id={name}
          placeholder={placeholder}
        />
        <label
          htmlFor={name}
          className={`${classes.label} ${meta.visited && input.value ? classes.active : ""}`}
        >
          {label}
        </label>
      </div>
      {meta?.touched && meta?.error}
    </div>
  );
};

export default FloatingInput;

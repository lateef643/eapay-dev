import { useState } from 'react';
import useStyles from './style';


const FloatingInput = ({ type, placeholder, label, name, onChange, input }) => {
  const classes = useStyles();
  const [isActive, setIsActive] = useState(false);

  const handleTextChange = (e) => {
    // onChange(e)
    if (e.target.value !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  return (
    <div className={classes.floatingLabelWrap}>
      <input
        {...input}
        type={type}
        name={name}
        className={classes.input}
        onChange={handleTextChange}
        id={name}
        placeholder={placeholder}
      />
      <label htmlFor={name} className={`${classes.label} ${isActive ? classes.active : ''}`}>
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;

import { createUseStyles, useTheme } from "react-jss";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";
import { reduxForm, Field } from "redux-form";

import Input from "../../../../Atoms/Input";
import { REGISTER_PAGE } from '../../../../Utils/constant';
import Button from "../../../../Atoms/button";

const useStyles = createUseStyles((theme) => ({
  container: {
    textAlign: "center",
  },
  headerText: {
    fontSize: 18,
    color: theme.textColor,
    fontFamily: theme.fontText,
    fontWeight: 400,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    marginTop: 40,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.25)",
    width: 280,
  },
  forgotPassword: {
    display: "block",
    color: theme.primaryColor,
    fontSize: 16,
  },
  createLink: {
    color: theme.primaryColor,
    fontSize: 16,
  },
  p: {
    color: theme.textColor,
  },
  "@media (min-width: 1024px)": {
    button: {
      width: 200,
    },
  },
}));

const LoginView = ({ page, onAuth, handleSubmit, ...props }) => {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });
  return (
    <Container className={classes.container}>
      <p className={classes.headerText}>
        Welcome back, login with your email address or the phone number under
        your bvn
      </p>
      <form onSubmit={handleSubmit}>
        <Field
          label="Email or Phone"
          type="text"
          name="email"
          component={Input}
          inputContainerClassName={classes.inputContainer}
        />

        <Field
          label="Password"
          type="password"
          name="password"
          component={Input}
          inputContainerClassName={classes.inputContainer}
        />

        <Button label="login" type="submit" className={classes.button} />
      </form>
      <Link to="/" className={classes.forgotPassword}>
        {" "}
        Forgot Password{" "}
      </Link>
      <p className={classes.p}>
        New User?{" "}
        <a onClick={() => onAuth(REGISTER_PAGE)} href="#javascript" className={classes.createLink}>
          Create account
        </a>{" "}
      </p>
    </Container>
  );
};

export default reduxForm({ form: "login" })(LoginView);

import { createUseStyles, useTheme } from "react-jss";
import { reduxForm, Field } from "redux-form";
import { Container } from "@material-ui/core";

import Input from "../../../../Atoms/Input";
import { LOGIN_PAGE } from '../../../../utils/constant';
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
    marginTop: 15,
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
    marginBottom: 30
  },
  "@media (min-width: 1024px)": {
    button: {
      width: 200,
    },
  },
}));

const RegisterView = ({ page, handleSubmit, onAuth, ...props }) => {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });
  return (
    <Container className={classes.container}>
      <p className={classes.headerText}>
        Your BVN is not stored on our system, we only use it tp verify your
        identity.
      </p>
      <form onSubmit={handleSubmit}>
        <Field
          label="Email or Phone"
          type="email"
          required
          name="email"
          component={Input}
          inputContainerClassName={classes.inputContainer}
        />

        <Field
          label="Bvn"
          type="number"
          required
          name="bvn"
          component={Input}
          inputContainerClassName={classes.inputContainer}
        />

        <Field
          label="Date of Birth"
          type="date"
          required
          name="dob"
          component={Input}
          inputContainerClassName={classes.inputContainer}
        />

        <Field
          label="Password"
          type="password"
          name="password"
          required
          component={Input}
          inputContainerClassName={classes.inputContainer}
        />

        <Button label="register" type="submit" className={classes.button} />
      </form>
      <p className={classes.p}>
        Already a member?{" "}
        <a href="#javascript" onClick={() => onAuth(LOGIN_PAGE)} className={classes.createLink}>
          Login
        </a>{" "}
      </p>
    </Container>
  );
};

export default reduxForm({ form: 'register' })(RegisterView);

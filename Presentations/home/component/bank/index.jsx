import { createUseStyles, useTheme } from "react-jss";
import { Container } from "@material-ui/core";
import { reduxForm, Field } from "redux-form";
import Input from "../../../../Atoms/Input";
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
  },
  "@media (min-width: 1024px)": {
    button: {
      width: 200,
    },
  },
}));

const BankView = ({ page, handleSubmit, ...props }) => {
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
          label="Bank"
          type="text"
          name="bank"
          component={Input}
          inputContainerClassName={classes.inputContainer}
        />

        <Field
          label="Account number"
          type="number"
          name="acc_num"
          component={Input}
          inputContainerClassName={classes.inputContainer}
        />

        <Button label="register" type="submit" className={classes.button} />
      </form>
    </Container>
  );
};

export default reduxForm({ form: "bank" })(BankView);

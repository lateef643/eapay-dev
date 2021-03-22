import { createUseStyles, useTheme } from "react-jss";
import { reduxForm, Field } from "redux-form";
import { Container } from "@material-ui/core";

import Input from "../../../../Atoms/Input";
import Button from "../../../../Atoms/button";

const useStyles = createUseStyles((theme) => ({
  container: {
    textAlign: "center",
  },
  headerText: {
    fontSize: 16,
    color: theme.textColor,
    fontFamily: theme.fontText,
    fontWeight: 400,
  },
  inputContainer: {
    marginTop: 40,
  },
  input: {
    marginTop: 15,
  },
  button: {
    marginTop: 40,
    marginBottom: 60,
    boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.25)",
    width: 280,
  },
  "@media (min-width: 1024px)": {
    button: {
      width: 200,
    },
  },
}));

const VerificationView = ({ page, handleSubmit, ...props }) => {
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
          label="Verification"
          type="number"
          name="verification"
          component={Input}
          inputContainerClassName={classes.inputContainer}
        />

        <Button label="verify" type="submit" className={classes.button} />
      </form>
    </Container>
  );
};

export default reduxForm({ form: "verification" })(VerificationView);

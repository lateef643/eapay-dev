import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    first: {
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: "#2C4563",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
    },
    second: {
        display: "flex",
        justifyContent: "space-between",
        color: "white",
    },
    title: {
        margin: "0 10px",
        color: "white",
    },
    two: {
        color: "white"
    },
    media: {
        height: 200,
    },
    root: {
        boxShadow: "0px 1px 13px rgba(0, 0, 0, 0.32)",
        borderRadius: "7px"
    }

})


const Header = ({ title, iconRight, iconLeft }) => {
    const classes = useStyles();
    return (
        <div className={classes.first}>
            <div className={classes.second}>
                {iconLeft}
                <p className={classes.title}>{title}</p>
            </div>

            <div className={classes.two}>
                {iconRight}
            </div>

        </div>
    )
}

export default Header;
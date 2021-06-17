import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { useState } from 'react'


const useStyles = createUseStyles({
  nav: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: 60,
    boxShadow: '0px 4px 7px rgba(0, 0, 0, 0.25)',
    borderRadius: 4,
    backgroundColor: '#2C4563',
    display: 'flex',
    overflowX: 'auto',
  },
  link: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    color: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 50,
    overflow: 'hidden',
    fontFamily:"'Roboto', sans-serif",
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    fontSize: 14,
    transition: 'background-color 0.1s ease-in-out',

    "&:hover":{
      color: '#588ac5'
    }
  },
  active: {
    color: '#588ac5'
  }
})


const BottomNavigation = ({ data }) => {
  const classes = useStyles();
  const [isActive, setActive] = useState(false)
  return (
    <nav className={classes.nav}>
      {
        data.map(item => (
          <Link to={item.to} className={classes.link}>
            {item.icon}
            <span className={classes.span}> {item.name} </span>
          </Link>
        ))
      }
    </nav>
  )
}

BottomNavigation.defaultProps = {
  data: []
}

export default BottomNavigation;
import { SwipeableDrawer } from "@material-ui/core";

const Drawer = ({ children, onOpen, onClose, open }) => {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
    >
      {children}
    </SwipeableDrawer>
  );
};

export default Drawer;

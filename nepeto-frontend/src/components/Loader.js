import Backdrop from "@mui/material/Backdrop";
import PropTypes from "prop-types";
import loaderGif from "../assets/loader.gif";

const Loader = (props) => {
  const { isOpen } = props;

  return (
    <Backdrop
      open={isOpen}
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
    >
      <img src={loaderGif} alt="Loading..." />
    </Backdrop>
  );
};

export default Loader;

Loader.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

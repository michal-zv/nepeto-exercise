import loaderGif from "../assets/loader.gif";

const Loader = () => {
  return (
    <div style={styles.container}>
      <img src={loaderGif} alt="Loading..." style={styles.image} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Loader;

import loaderGif from "../assets/loader.gif";

export default function Loader() {
  return (
    <div style={styles.container}>
      <img src={loaderGif} alt="Loading..." style={styles.image} />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

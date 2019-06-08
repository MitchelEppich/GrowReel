/***************************/
/*Sponsored content adbar
/***************************/
const adBar = props => {
  let styleBackground = {
    height: "300px",
    margin: "20px 0px",
    overflow: "hidden",
    background: "url(" + props.url + ")",
    backgroundAttachment: "fixed",
    backgroundColor: "black",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  };

  let parallaxAdSection = <div style={styleBackground} />;

  return parallaxAdSection;
};

export default adBar;

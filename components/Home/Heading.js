/***************************/
/*Heading for video carousel
section on homepage
/***************************/

const heading = props => {
  return (
    <div className="w-full pt-2">
      <h2 className="w-full text-center text-3xl capitalize">{props.title}</h2>
      <hr className="hr w-5/6" />
    </div>
  );
};

export default heading;

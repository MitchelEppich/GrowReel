const filterSearchFor = props => {
  let searchFor = ["Username", "Title", "Tag"];
  searchFor = searchFor.map((label, index) => {
    let labelLowerCase = label.toLowerCase();
    return (
      <div
        key={index}
        className={` w-full text-white font-bold p-1 text-sm cursor-pointer ${
          props.target == labelLowerCase
            ? "hover:text-black bg-teal"
            : "hover:text-teal"
        }`}
        onClick={() => {
          props.setFilter({ target: labelLowerCase });
        }}
      >
        {label}
      </div>
    );
  });
  return <React.Fragment>{searchFor}</React.Fragment>;
};

export default filterSearchFor;

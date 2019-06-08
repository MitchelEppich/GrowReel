

const filterLengths = props => {
  let lengths = [
    {
      label: ["Short ( ", { icon: "angle-left" }, " 2 min ) "],
      length: "short"
    },
    { label: ["Long ( ", { icon: "angle-right" }, " 4 min ) "], length: "long" }
  ];
  lengths = lengths.map((lengthObj, index) => {
    let commonClasses =
      props.length == lengthObj.length
        ? "hover:text-black bg-teal"
        : "hover:text-teal";
    let responsiveClass =
      props.misc.currentMediaSize < 767
        ? "w-full text-white font-bold p-1 text-sm cursor-pointer sm:hidden" +
          commonClasses
        : "w-full md:hidden lg:hidden xl:hidden xxl:hidden xxxl:hidden text-white font-bold p-1 text-sm cursor-pointer " +
          commonClasses;
    let label = lengthObj.label.map((labelPart, index) => {
      if (labelPart.icon) {
        return <FontAwesomeIcon key={index} icon={labelPart.icon} />;
      }
      return labelPart;
    });
    return (
      <div
        key={index}
        className={responsiveClass}
        onClick={() => {
          props.setFilter({
            length: props.length == lengthObj.length ? "" : lengthObj.length
          });
        }}
      >
        {label}
      </div>
    );
  });
  return (
<React.Fragment>{lengths}</React.Fragment>
  )
}

export default filterLengths
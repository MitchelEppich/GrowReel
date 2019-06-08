/***************************/
/*bars in the top left corner
of screen.
/***************************/

const bars = props => {
  let firstBarClass = props.showSideMenu ? "bars--showFirstBar" : "";
  let secondBarClass = props.showSideMenu ? "bars--showSecondBar" : "bars--secondBar";

  return (
    <div className="h-12 cursor-pointer">
      <div
        className="h-12 w-16 pt-2 pl-4"
        onClick={() => {
          props.close();
          props.toggleSideMenuHandler(!props.showSideMenu);
        }}
        onMouseEnter={() => {
          props.close();
          props.toggleSideMenuHandler(!props.showSideMenu);
        }}
      >
        <div className={"bars " + firstBarClass} />
        <div className={"bars " + secondBarClass} />
      </div>
    </div>
  );
};

export default bars;

const filterDates = props => {
  let uploadDates = [
    { label: "Today", postedOn: 1 },
    { label: "This Week", postedOn: 7 },
    { label: "This Month", postedOn: 30 },
    { label: "This Year", postedOn: 365 }
  ];
  uploadDates = uploadDates.map((date, index) => {
    return (
      <div
        key={index}
        className={` w-full text-white font-bold p-1 text-sm cursor-pointer ${
          props.postedOn == date.postedOn
            ? "hover:text-black bg-teal"
            : "hover:text-teal"
        }`}
        onClick={() => {
          props.setFilter({
            postedOn: props.postedOn == date.postedOn ? 0 : date.postedOn
          });
        }}
      >
        {date.label}
      </div>
    );
  });
  return <React.Fragment>{uploadDates}</React.Fragment>;
};

export default filterDates;

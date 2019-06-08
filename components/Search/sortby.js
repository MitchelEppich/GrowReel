const sortBy = props => {
  let sortOptions = [
    { label: "Date Posted", value: "createdOn" },
    { label: "Views", value: "views" },
    { label: "Likes", value: "likes" },
    { label: "Length", value: "duration" },
    { label: "Activity", value: "comments" },
    { label: "Trending", value: "tags" }
  ];
  sortOptions = sortOptions.map((option, index) => {
    return (
      <option key={index} value={option.value} className="p-2">
        {option.label}
      </option>
    );
  });
  return (
    <div className="w-1/2 sm:w-2/3 md:w-2/3 pr-3 sm:pr-0 pin-r pt-3 pb-2 text-white inline-flex justify-end">
      <p className="px-2 font-bold">Sort by: </p>
      <select
        onChange={e => {
          let sort = e.target.value;
          props.setFilter({
            sort: sort
          });
          props.fetchSearch(props.searchKey, 12, {
            sort: sort,
            length: props.length,
            target: props.target,
            postedOn: props.postedOn
          });
        }}
        defaultValue="createdOn"
        className="px-1 text-sm"
      >
        {sortOptions}
      </select>
    </div>
  );
};
export default sortBy;

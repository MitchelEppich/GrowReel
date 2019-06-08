import Tag from "./tag";

let tagEditor = props => {
  let _video = props.video.currentVideo;
  let _tags = _video.tags;

  let showTags = () => {
    if (_tags == null) return null;
    return _tags.map(tag => {
      if (tag == "" || tag == null) return;
      return <Tag key={tag} value={tag} {...props} />;
    });
  };

  return (
    <div className="w-full">
      <hr className="hr mt-4 mb-8" />
      <span className="text-lg">Tags (Use 'Space' or 'Enter' to confirm):</span>

      <div>
        {showTags()}
        <input
          maxLength="12"
          onKeyDown={e => {
            if (e.which == 13 || e.which == 32 || e.which == 188) {
              e.preventDefault();
              let input = e.target.value.trim().toLowerCase();

              if (
                input.length != 0 ||
                input != "" ||
                !props.values.includes(input)
              ) {
                // Submit tag to video
                props.setTags([..._tags, input]);
              }
              e.target.value = "";
            }
          }}
          type="text"
          className="w-full bg-transparent border-semi-transparent cursor-pointer text-left text-almost-white mb-8 mt-3 border border-transparent p-2 hover:border-green-dark"
        />
      </div>
    </div>
  );
};

export default tagEditor;

let descriptionEditor = props => {
  let _video = props.video.currentVideo;

  let _description = _video.description;

  // let class = isEditing ? "w-full bg-transparent border-semi-transparent cursor-pointer text-left text-almost-white mb-8 border border-transparent p-2 hover:border-green-dark" :

  return (
    <textarea
      defaultValue={_description}
      name="description"
      className="w-full bg-transparent border-semi-transparent cursor-pointer text-left text-almost-white mb-8 border border-transparent p-2 hover:border-green-dark"
    />
  );
};

export default descriptionEditor;

const commentBody = props => {
  return (
    <p
      className="leading-normal text-justify px-4 text-sm py-1"
      itemProp="commentText"
    >
      {props.body}
    </p>
  );
};

export default commentBody;

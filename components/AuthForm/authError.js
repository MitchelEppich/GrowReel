const authError = props => {
  return (
    <div className="mb-px">
      <p className="text-black font-bold text-center p-2 bg-authBar">
        Please make sure you're logged in
      </p>
      <div className="mx-auto arrow-down" />
    </div>
  );
};

export default authError;

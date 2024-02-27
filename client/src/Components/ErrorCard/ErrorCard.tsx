import logo from "/images/sequra-logo.png";

const ErrorCard = () => {
  return (
    <div className="card card-compact w-96 bg-green-100 mt-10 shadow-sm">
      <figure>
        <img alt="sequra-logo" className="my-2 w-[80px]" src={logo} />
      </figure>
      <div className="card-body bg-white">
        <h4 className="align-center text-center text-md mb-2 text-red-600">
          It seems something went wrong, please try again later
        </h4>
      </div>
    </div>
  );
};

export default ErrorCard;

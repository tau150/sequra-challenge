import logo from "/images/sequra-logo.png";

const ErrorCard = () => {
  return (
    <div className="w-96 placeholder:mt-4 mt-10 shadow-sm p-2">
      <div className="bg-green-100 p-2 flex justify-center">
        <figure>
          <img alt="sequra-logo" className="my-2 w-[80px]" src={logo} />
        </figure>
      </div>
      <div className="m-4">
        <h4 className="align-center text-center text-md mb-2 text-red-600">
          It seems something went wrong, please try again later
        </h4>
      </div>
    </div>
  );
};

export default ErrorCard;

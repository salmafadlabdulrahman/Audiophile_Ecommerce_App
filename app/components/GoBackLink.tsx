'use client'
const GoBackLink = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="text-lightBlack tracking-wide font-semibold text-[1.1em]"
    >
      Go Back
    </button>
  );
};

export default GoBackLink;

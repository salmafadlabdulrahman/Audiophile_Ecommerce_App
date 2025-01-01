const ProductAmount = () => {
  return (
    <div className="bg-gray flex items-center justify-between w-[110px] h-[40px]">
      <button className="hover:text-orange w-[50px] h-full hover:bg-[#a7a7a7]">
        -
      </button>
      <p className="font-bold">1</p>
      <button className="hover:text-orange w-[50px] h-full hover:bg-[#a7a7a7]">
        +
      </button>
    </div>
  );
};

export default ProductAmount;

interface HeaderProps {
  category: string;
}

const Header = ({ category }: HeaderProps) => {
  return (
    <div className="bg-black py-[5.5em]">
      <h3 className="uppercase text-white text-[2.2em] text-center font-bold tracking-wider">
        {category}
      </h3>
    </div>
  );
};

export default Header;

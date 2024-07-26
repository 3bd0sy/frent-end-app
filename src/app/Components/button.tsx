interface ButtonType {
  text: string;
}

const Button = ({ text }: ButtonType) => {
  return (
    <button className=" w-[86px] h-[50px] bg-[#4D7C0F] rounded-[5px] p-[13px_25px] gap-[10px] text-white">
      {text}
    </button>
  );
};

export default Button;

function CustomButton({ backgroundColor, textColor, buttonText }) {
  const buttonInlineStyle ={
    backgroundColor,
    color:textColor
  }
  return (
    <>
      <button className="w-full rounded-md py-2.5 cursor-pointer text-base" style={buttonInlineStyle}>
        {buttonText}
      </button>
    </>
  );
}

export default CustomButton;

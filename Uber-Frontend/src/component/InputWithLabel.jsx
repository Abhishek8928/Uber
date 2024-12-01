

function InputWithLabel({ label, placeholder, onChangeHandler }) {
    return (
      <div className="input-wrapper mb-4">
        <label className="font-semibold text-base block mb-2">{label}</label>
  
        <input
          type="text"
          placeholder={placeholder}
          className=" bg-[#F3F3F3] placeholder:text-base placeholder:text-[#5E5E5E] focus:outline-none   py-3 text-sm px-4  w-full  rounded-lg "
        />
      </div>
    );
  }

  export default InputWithLabel;
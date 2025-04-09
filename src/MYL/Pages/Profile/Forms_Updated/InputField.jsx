const InputField = ({ label, value, onChange, placeholder, type = "text", errorInput }) => (
  <div className="mb-4 flex justify-between font-jakarta space-x-2">
    {/* <label className="block text-xs md:text-base font-medium text-gray-700 mb-1 w-[50%]">{label}</label> */}
    <div className="w-full">
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full border ${errorInput ? "border-red-500" : "border-gray-300"
        } rounded-lg px-2 py-2 md:py-4 focus:outline-none focus:ring-2 ${errorInput ? "focus:ring-red-500" : "focus:ring-gray-500"
        } text-xs md:text-base`}
    />
    {errorInput && (
      <span className="text-xs text-red-500 mt-1">{errorInput}</span>
    )}
    </div>
  </div>
);
export default InputField;
import React, { useId } from "react";

const InputVideo = React.forwardRef(function Input2(
  { label, type = "text", placeholder, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full border p-2 bg-transparent outline-none focus:bg-[#e7e1e1] ${className}`}
        {...props}
        ref={ref}
        id={id}
      />
    </div>
  );
});

export default InputVideo;

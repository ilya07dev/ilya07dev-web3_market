import cn from "classnames";

interface IInputProps {
  title: string;
  value: string;
  placeholder?: string;
  className?: string;
  type: "input" | "textarea";
  inputType: string;
  setValue: (el: string) => void;
}

export function FormInput({
  value,
  placeholder,
  title,
  className,
  setValue,
  type,
  inputType,
}: IInputProps) {
  return (
    <div className={cn("flex-1 w-full flex flex-col", className)}>
      {title && (
        <span className="font-epilogue font-medium text-sm text-[#808191] mb-2">
          {title}
        </span>
      )}
      {type === "input" ? (
        <input
          className={cn(
            "sm:min-w-[300px] py-4 sm:px-6 px-4 font-epilogue text-white text-sm",
            "border-[#3a3a43] bg-transparent rounded-xl outline-none border"
          )}
          required
          placeholder={placeholder}
          value={value}
          onChange={(el) => setValue(el.target.value)}
          type={inputType}
          step="0.1"
        />
      ) : (
        <textarea
          className={cn(
            "sm:min-w-[300px] py-4 sm:px-6 px-4 font-epilogue text-white text-sm",
            "border-[#3a3a43] bg-transparent rounded-xl outline-none border"
          )}
          required
          rows={10}
          placeholder={placeholder}
          value={value}
          onChange={(el) => setValue(el.target.value)}
        ></textarea>
      )}
    </div>
  );
}

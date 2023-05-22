import cn from "classnames";

interface IIconProps {
  className?: string;
  imgUrl: string;
  name?: string;
  isActive?: string;
  disabled?: boolean;
  handleCLick?: any;
}

export function Icon({
  className,
  imgUrl,
  name,
  isActive,
  disabled,
  handleCLick,
}: IIconProps) {
  return (
    <div
      onClick={handleCLick}
      className={cn(
        "w-12 h-12 rounded-xl",
        "flex justify-center items-center",
        className,
        isActive && isActive === name && "bg-[#2c2c32]",
        !disabled && "cursor-pointer",
        name === "logout" && "cursor-pointer"
      )}
    >
      {isActive ? (
        <img
          className={cn("w-1/2 h-1/2", isActive !== name && "grayscale")}
          src={imgUrl}
          alt=""
        />
      ) : (
        <img className="w-1/2 h-1/2" src={imgUrl} alt="" />
      )}
    </div>
  );
}

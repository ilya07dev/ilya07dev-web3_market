import cn from "classnames";

interface IProps {
  title: string;
  value: string | number;
}
export function CountBox({ title, value }: IProps) {
  return (
    <article className="w-[150px] flex flex-col items-center">
      <h4
        className={cn(
          "w-full p-3 bg-[#1c1c24] rounded-t-xl",
          "font-bold text-[30px] text-center text-white"
        )}
      >
        {value}
      </h4>
      <p
        className={cn(
          "w-full px-3 py-2",
          "text-[#808191] bg-[#28282e] rounded-b-xl text-center"
        )}
      >
        {title}
      </p>
    </article>
  );
}

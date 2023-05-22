import { useMetamask } from "@thirdweb-dev/react";

export function Button({
  children,
  className,
  onClick,
}: {
  children: string;
  className?: string;
  onClick: () => void;
}) {
  const connectMeta = useMetamask();
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

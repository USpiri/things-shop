import Image from "next/image";

interface Props extends React.HTMLAttributes<HTMLElement> {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  width: number;
  height: number;
}
export const ProductImage = ({
  className,
  width,
  height,
  alt,
  src,
  ...rest
}: Props) => {
  console.log(src);

  const localSrc = src
    ? src.startsWith("http")
      ? src
      : `/images/products/${src}`
    : `/images/placeholder.jpg`;

  return (
    <Image
      src={localSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...rest}
    />
  );
};

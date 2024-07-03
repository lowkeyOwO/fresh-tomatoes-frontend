interface LinkSrc {
  src: string;
}

export const imageLoader = ({ src }: LinkSrc) => {
  return `${process.env.NEXT_PUBLIC_IMAGEURL}${src}`;
};

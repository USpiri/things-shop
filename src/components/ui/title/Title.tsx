export const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="capitalize text-center font-mono font-light tracking-[0.5em] text-3xl mt-14 mb-24">
      {children}
    </h1>
  );
};

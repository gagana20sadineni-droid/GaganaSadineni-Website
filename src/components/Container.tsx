export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[860px] px-7 ${className}`}>
      {children}
    </div>
  );
}

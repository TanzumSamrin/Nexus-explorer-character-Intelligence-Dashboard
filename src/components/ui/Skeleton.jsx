function Skeleton({
  width = "100%",
  height = "16px",
  borderRadius = "8px",
  className = "",
}) {
  return (
    <div
      className={`ui-skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
      aria-hidden="true"
    />
  );
}

export default Skeleton;
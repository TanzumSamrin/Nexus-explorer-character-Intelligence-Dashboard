function Chip({
  children,
  active = false,
  onClick,
  disabled = false,
  className = "",
}) {
  const classes = [
    "ui-chip",
    active ? "ui-chip--active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Chip;
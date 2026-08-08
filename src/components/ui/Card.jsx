function Card({
  children,
  title,
  subtitle,
  action,
  className = "",
  hoverable = false,
}) {
  const classes = [
    "ui-card",
    hoverable ? "ui-card--hoverable" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes}>
      {(title || subtitle || action) && (
        <header className="ui-card__header">
          <div>
            {title && (
              <h3 className="ui-card__title">
                {title}
              </h3>
            )}

            {subtitle && (
              <p className="ui-card__subtitle">
                {subtitle}
              </p>
            )}
          </div>

          {action && (
            <div className="ui-card__action">
              {action}
            </div>
          )}
        </header>
      )}

      <div className="ui-card__body">
        {children}
      </div>
    </section>
  );
}

export default Card;
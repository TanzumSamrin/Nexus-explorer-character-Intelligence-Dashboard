function StatCard({
  label,
  value,
  description,
  icon,
}) {
  return (
    <article className="stat-card">
      <div className="stat-card__top">
        <span className="stat-card__label">
          {label}
        </span>

        {icon && (
          <div className="stat-card__icon">
            {icon}
          </div>
        )}
      </div>

      <strong className="stat-card__value">
        {value}
      </strong>

      {description && (
        <p className="stat-card__description">
          {description}
        </p>
      )}
    </article>
  );
}

export default StatCard;
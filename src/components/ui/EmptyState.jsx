function EmptyState({
  title = "No results",
  message = "There is nothing to show here.",
  action = null,
}) {
  return (
    <div className="ui-state ui-empty-state">
      <div className="ui-state__icon">∅</div>

      <h3>{title}</h3>

      <p>{message}</p>

      {action && (
        <div className="ui-state__action">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
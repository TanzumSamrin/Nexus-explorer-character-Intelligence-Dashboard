
import Button from "./Button";

function ErrorState({
  title = "Something went wrong",
  message = "We could not load this information.",
  onRetry,
}) {
  return (
    <div className="ui-state ui-error-state">
      <div className="ui-state__icon">!</div>

      <h3>{title}</h3>

      <p>{message}</p>

      {onRetry && (
        <div className="ui-state__action">
          <Button
            variant="danger"
            onClick={onRetry}
          >
            Retry
          </Button>
        </div>
      )}
    </div>
  );
}

export default ErrorState;
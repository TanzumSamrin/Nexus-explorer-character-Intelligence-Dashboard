function FallbackUI({
  error,
  resetErrorBoundary,
}) {
  return (
    <section className="error-boundary-page">
      <div className="error-boundary-card">
        <span className="error-boundary-icon">
          ⚠️
        </span>

        <h1>
          Something went wrong
        </h1>

        <p>
          We couldn't display this
          part of the application.
          Please try again.
        </p>

        {error && (
          <details>
            <summary>
              Technical details
            </summary>

            <pre>
              {error.stack ||
                error.message ||
                String(error)}
            </pre>
          </details>
        )}

        <button
          type="button"
          onClick={
            resetErrorBoundary
          }
        >
          Try again
        </button>
      </div>
    </section>
  );
}

export default FallbackUI;
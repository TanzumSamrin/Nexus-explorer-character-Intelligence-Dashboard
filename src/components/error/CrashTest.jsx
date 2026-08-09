function CrashTest() {
  function handleCrash() {
    throw new Error(
      "Crash Test: intentional error for Error Boundary verification."
    );
  }

  return (
    <button
      type="button"
      onClick={handleCrash}
    >
      Crash Test
    </button>
  );
}

export default CrashTest;
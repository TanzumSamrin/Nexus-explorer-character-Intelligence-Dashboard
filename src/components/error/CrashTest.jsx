import { useState } from "react";

function CrashTest() {
  const [shouldCrash, setShouldCrash] =
    useState(false);

  if (shouldCrash) {
    throw new Error(
      "Crash Test: intentional error for Error Boundary verification."
    );
  }

  function handleCrash() {
    setShouldCrash(true);
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
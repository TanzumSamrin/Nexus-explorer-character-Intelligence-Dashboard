export async function getJson(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    const error = new Error(
      errorData?.error || `Request failed with status ${response.status}`
    );

    error.status = response.status;
    error.data = errorData;

    throw error;
  }

  return response.json();
}
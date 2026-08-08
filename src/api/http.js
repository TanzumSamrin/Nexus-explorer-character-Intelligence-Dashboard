export async function getJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(
      `Request failed with status ${response.status}`
    );

    error.status = response.status;

    try {
      error.data = await response.json();
    } catch {
      error.data = null;
    }

    throw error;
  }

  return response.json();
}
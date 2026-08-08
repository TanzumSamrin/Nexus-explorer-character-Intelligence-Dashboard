import { BASE_URL, characterUrl } from "./api/endpoints";

function App() {
  return (
    <div>
      <h1>Nexus Explorer</h1>

      <p>Character Intelligence Dashboard</p>

      <p>API: {BASE_URL}</p>

      <p>Character 1: {characterUrl(1)}</p>
    </div>
  );
}

export default App;






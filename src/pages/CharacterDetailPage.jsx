import { useParams } from "react-router-dom";

function CharacterDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Character Details</h1>
      <p>Character ID: {id}</p>
      <p>Character detail will be implemented in STEP 09.</p>
    </div>
  );
}

export default CharacterDetailPage;
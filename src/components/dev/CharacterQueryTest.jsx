import useCharacters from "../../hooks/useCharacters";

function CharacterQueryTest() {
  const {
    data,
    isPending,
    isError,
    error,
    isFetching,
  } = useCharacters({
    page: 1,
  });

  if (isPending) {
    return <p>Loading characters...</p>;
  }

  if (isError) {
    return (
      <p>
        Error:{" "}
        {error?.message || "Unknown error"}
      </p>
    );
  }

  return (
    <div>
      <h2>
        API Test
      </h2>

      <p>
        Total: {data?.info?.count}
      </p>

      <p>
        Pages: {data?.info?.pages}
      </p>

      <p>
        Current results:{" "}
        {data?.results?.length}
      </p>

      {isFetching && (
        <p>Refetching...</p>
      )}

      <ul>
        {data?.results
          ?.slice(0, 5)
          .map((character) => (
            <li key={character.id}>
              {character.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CharacterQueryTest;
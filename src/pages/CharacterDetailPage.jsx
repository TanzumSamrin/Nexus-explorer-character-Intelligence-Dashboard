import {
  useState
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import useCharacter from "../hooks/useCharacters";
import useEpisodes from "../hooks/useEpisodes";

function CharacterDetailPage() {
  const {
    id,
  } = useParams();

  const navigate =
    useNavigate();

  const [
    copied,
    setCopied,
  ] = useState(false);

  const {
    data: character,
    isPending,
    isError,
    error,
    refetch,
  } = useCharacter(id);

  const episodeUrls =
    character?.episode || [];

  const {
    data: episodes = [],
    isPending:
      episodesLoading,
    isError:
      episodesError,
  } = useEpisodes(
    episodeUrls
  );

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  }

  function handleBack() {
    navigate(-1);
  }

  if (isPending) {
    return (
      <section className="page">
        <button
          type="button"
          className="back-button"
          onClick={handleBack}
        >
          ← Back
        </button>

        <CharacterDetailSkeleton />
      </section>
    );
  }

  if (isError) {
    const isNotFound =
      error?.status === 404;

    return (
      <section className="page">
        <button
          type="button"
          className="back-button"
          onClick={handleBack}
        >
          ← Back
        </button>

        <div className="error-state">
          <h1>
            {isNotFound
              ? "Character not found"
              : "Unable to load character"}
          </h1>

          <p>
            {isNotFound
              ? "The character you are looking for does not exist."
              : "Something went wrong while loading this character."}
          </p>

          {!isNotFound && (
            <button
              type="button"
              onClick={() =>
                refetch()
              }
            >
              Retry
            </button>
          )}

          <Link
            to="/characters"
            className="character-details-link"
          >
            Back to Characters
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="detail-toolbar">
        <button
          type="button"
          className="back-button"
          onClick={handleBack}
        >
          ← Back
        </button>

        <button
          type="button"
          className="copy-link-button"
          onClick={handleCopyLink}
        >
          {copied
            ? "Copied!"
            : "Copy link"}
        </button>
      </div>

      <article className="character-detail">
        <div className="character-detail-image">
          <img
            src={character.image}
            alt={character.name}
          />
        </div>

        <div className="character-detail-content">
          <div className="character-detail-title">
            <div>
              <h1>
                {character.name}
              </h1>

              <p className="character-detail-subtitle">
                {character.species}
              </p>
            </div>

            <StatusBadge
              status={
                character.status
              }
            />
          </div>

          <div className="character-detail-info">
            <DetailItem
              label="Species"
              value={
                character.species
              }
            />

            <DetailItem
              label="Gender"
              value={
                character.gender
              }
            />

            <DetailItem
              label="Origin"
              value={
                character.origin?.name
              }
            />

            <DetailItem
              label="Location"
              value={
                character.location?.name
              }
            />
</div>

          <div className="character-detail-links">
            {character.origin
              ?.url && (
              <a
                href={
                  character.origin
                    .url
                }
                target="_blank"
                rel="noreferrer"
              >
                View origin
              </a>
            )}
            {character.location
              ?.url && (
              <a
                href={
                  character.location
                    .url
                }
                target="_blank"
                rel="noreferrer"
              >
                View location
              </a>
            )}
          </div>

          <p className="character-detail-meta">
            Created{" "}
            {new Date(
              character.created
            ).toLocaleDateString()}
          </p>
        </div>
      </article>

      <section className="episodes-section">
        <div className="section-heading">
          <div>
            <h2>
              Episodes
            </h2>

            <p>
              Appeared in{" "}
              {episodeUrls.length}{" "}
              episodes
            </p>
          </div>
        </div>

        {episodesLoading && (
          <EpisodeSkeleton />
        )}

        {episodesError && (
          <div className="error-state">
            <h3>
              Episodes could not
              be loaded
            </h3>

            <p>
              Character information
              is available, but the
              episode list could not
              be loaded.
            </p>
          </div>
        )}

        {!episodesLoading &&
          !episodesError &&
          episodes.length === 0 && (
            <div className="empty-state">
              <h3>
                No episodes found
              </h3>
            </div>
          )}

        {!episodesLoading &&
          !episodesError &&
          episodes.length > 0 && (
            <div className="episode-list">
              {episodes.map(
                (episode) => (
                  <article
                    className="episode-card"
                    key={episode.id}
                  >
                    <div>
                      <span className="episode-code">
                        {episode.episode}
                      </span>

                      <h3>
                        {episode.name}
                      </h3>

                      <p>
                        Air date:{" "}
                        {episode.air_date}
                      </p>
                    </div>

                    <span className="episode-number">
                      #{episode.id}
                    </span>
                  </article>
                )
              )}
            </div>
          )}
      </section>
    </section>
  );
}

function DetailItem({
  label,
  value,
}) {
  return (
    <div className="detail-item">
      <span>
        {label}
      </span>

      <strong>
        {value || "Unknown"}
      </strong>
    </div>
  );
}

function StatusBadge({
  status,
}) {
  const normalizedStatus =
    status.toLowerCase();

  let className =
    "status-badge status-unknown";

  if (
    normalizedStatus ===
    "alive"
  ) {
    className =
      "status-badge status-alive";
  }

  if (
    normalizedStatus ===
    "dead"
  ) {
    className =
      "status-badge status-dead";
  }

  return (
    <span className={className}>
      {status}
    </span>
  );
}

function CharacterDetailSkeleton() {
  return (
    <div className="character-detail">
      <div className="detail-skeleton-image" />

      <div className="detail-skeleton-content">
        <div className="skeleton-line large" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
      </div>
    </div>
  );
}

function EpisodeSkeleton() {
  return (
    <div className="episode-list">
      {Array.from({
        length: 6,
      }).map((_, index) => (
        <div
          className="episode-card"
          key={index}
        >
          <div className="skeleton-line large" />
          <div className="skeleton-line" />
        </div>
      ))}
    </div>
  );
}

export default CharacterDetailPage;
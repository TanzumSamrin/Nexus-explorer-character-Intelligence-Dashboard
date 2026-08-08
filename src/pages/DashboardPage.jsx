import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Chip from "../components/ui/Chip";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import Pagination from "../components/ui/Pagination";
import Skeleton from "../components/ui/Skeleton";
import StatCard from "../components/ui/StatCard";
import StatGrid from "../components/ui/StatGrid";

function DashboardPage() {
  return (
    <div>
      <h1 className="page-title">
        UI Component Demo
      </h1>

      <p className="page-subtitle">
        Nexus Explorer design system
      </p>

      <section style={{ marginTop: "24px" }}>
        <StatGrid>
          <StatCard
            label="Total Characters"
            value="—"
            description="API data will be connected later"
            icon="C"
          />

          <StatCard
            label="Alive"
            value="—"
            description="API data will be connected later"
            icon="A"
          />

          <StatCard
            label="Dead"
            value="—"
            description="API data will be connected later"
            icon="D"
          />

          <StatCard
            label="Watchlist"
            value="—"
            description="Context data will be connected later"
            icon="★"
          />
        </StatGrid>
      </section>

      <section
        style={{
          marginTop: "24px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <Button>
          Primary
        </Button>

        <Button variant="secondary">
          Secondary
        </Button>

        <Button variant="danger">
          Danger
        </Button>

        <Button variant="ghost">
          Ghost
        </Button>

        <Button disabled>
          Disabled
        </Button>
      </section>

      <section
        style={{
          marginTop: "24px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <Badge variant="alive">
          Alive
        </Badge>

        <Badge variant="dead">
          Dead
        </Badge>

        <Badge variant="unknown">
          Unknown
        </Badge>

        <Badge variant="stale">
          Refetching...
        </Badge>
      </section>

      <section
        style={{
          marginTop: "24px",
          display: "flex",
          gap: "8px",
          overflowX: "auto",
        }}
      >
        <Chip active>
          All
        </Chip>

        <Chip>
          Alive
        </Chip>

        <Chip>
          Dead
        </Chip>

        <Chip>
          Unknown
        </Chip>
      </section>

      <section style={{ marginTop: "24px" }}>
        <Card
          title="Card Component"
          subtitle="Reusable surface"
          action={
            <Button size="small">
              Action
            </Button>
          }
        >
          <p>
            This card will be reused throughout
            the application.
          </p>
        </Card>
      </section>

      <section
        style={{
          marginTop: "24px",
          display: "grid",
          gap: "12px",
        }}
      >
        <Skeleton height="20px" />
        <Skeleton height="20px" width="70%" />
        <Skeleton height="120px" />
      </section>

      <section style={{ marginTop: "24px" }}>
        <EmptyState
          title="No results"
          message="Try changing your filters."
        />
      </section>

      <section style={{ marginTop: "24px" }}>
        <ErrorState
          title="Unable to load"
          message="The request could not be completed."
        />
      </section>

      <Pagination
        page={1}
        totalPages={10}
        previousDisabled
        onPrevious={() => {}}
        onNext={() => {}}
      />
    </div>
  );
}

export default DashboardPage;
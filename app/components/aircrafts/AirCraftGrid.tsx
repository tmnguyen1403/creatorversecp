import AirCraftCard from "./AirCraftCard";
import type { AirCraft } from "../../models/AirCraft";

type AirCraftListProps = {
  aircrafts: AirCraft[];
};

export default function AirCraftList({ aircrafts }: AirCraftListProps) {
  // Empty State Layout View (Pico Style)
  if (!aircrafts || aircrafts.length === 0) {
    return (
      <article
        style={{ textAlign: "center", maxWidth: "450px", margin: "3rem auto" }}
      >
        <span
          style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}
          role="img"
          aria-label="empty box"
        >
          📭
        </span>
        <h3 style={{ marginBottom: "0.5rem" }}>No AirCrafts Found</h3>
        <p style={{ color: "var(--pico-muted-color)", fontSize: "0.95rem" }}>
          Your directory is currently empty. Try adding a new content aircraft
          to get started.
        </p>
      </article>
    );
  }

  // Active Grid Layout View (Pico Style)
  //aircrafts = [aircrafts[0]];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "1.5rem",
        padding: "1rem 0",
      }}
    >
      {aircrafts.map((aircraft) => (
        <div key={String(aircraft.id)}>
          <AirCraftCard aircraft={aircraft} />
        </div>
      ))}
    </div>
  );
}

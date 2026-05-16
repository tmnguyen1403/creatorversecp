import { Link } from "react-router"; // Updated import to match your standard router setup
import type { Creator } from "../../models/Creator"; 

type CreatorCardProps = { creator: Creator; }; 

export default function CreatorCard({ creator }: CreatorCardProps) { 
  const creatorId = creator.id ? String(creator.id) : "";

  return ( 
    <Link 
      to={`/creators/${creatorId}`} 
      style={{ textDecoration: "none", color: "inherit" }} // Prevents browser link underline/blue text overrides
    > 
      <article 
        style={{ 
          padding: 0, 
          overflow: "hidden",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          cursor: "pointer",
          // Adds a subtle card shadow structure native to Pico's system layout
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
        }}
        // Clean inline hover effects using modern browser triggers
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.15)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
        }}
      > 
        {/* Card Header Media Window */}
        {creator.imageURL && (
          <div style={{ aspectRatio: "1/1", overflow: "hidden", width: "100%" }}> 
            <img 
              src={creator.imageURL} 
              alt={creator.name} 
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                margin: 0,
                borderRadius: 0
              }} 
            /> 
          </div> 
        )}

        {/* Card Body Text Section */}
        <div style={{ padding: "1.25rem" }}> 
          <h3 style={{ margin: "0 0 0.25rem 0", fontSize: "1.2rem" }}>
            {creator.name}
          </h3> 
          
          <small style={{ color: "var(--pico-muted-color)", display: "block", marginBottom: "0.75rem" }}>
            @{creator.name.toLowerCase().replace(/\s+/g, "")}
          </small> 

          {creator.description && ( 
            <p 
              style={{ 
                margin: 0, 
                fontSize: "0.9rem",
                color: "var(--pico-color)",
                // Standard multi-line truncation to stop description overflow text boxes
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              }}
            > 
              {creator.description} 
            </p> 
          )} 
        </div> 
      </article> 
    </Link> 
  ); 
}

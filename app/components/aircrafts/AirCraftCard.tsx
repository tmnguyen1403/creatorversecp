import { Link } from "react-router"; 
import type { AirCraft } from "../../models/AirCraft"; 

type AirCrafCardProps = { aircraft: AirCraft; }; 

export default function AirCrafCard({ aircraft }: AirCrafCardProps) { 
  const aircraftId = aircraft.id ? String(aircraft.id) : ""; 

  return ( 
    <Link to={`/aircrafts/${aircraftId}`}
    > 
      <article 
        style={{ 
          padding: 0, 
          overflow: "hidden", 
          transition: "transform 0.2s ease, box-shadow 0.2s ease", 
          // REMOVED: cursor: "pointer" (Link handles this natively)
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)" 
        }} 
        onMouseOver={(e) => { 
          // 3. TARGET the card border styles precisely
          e.currentTarget.style.transform = "translateY(-4px)"; 
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.15)"; 
        }} 
        onMouseOut={(e) => { 
          e.currentTarget.style.transform = "translateY(0)"; 
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)"; 
        }} 
      > 
        {/* Card Header Media Window */}
        {aircraft.imageURL && ( 
          <div style={{ aspectRatio: "1/1", overflow: "hidden", width: "100%" }}> 
            <img 
              src={aircraft.imageURL} 
              alt={aircraft.name} 
              style={{ width: "100%", height: "100%", objectFit: "cover", margin: 0, borderRadius: 0 }} 
            /> 
          </div> 
        )} 

        {/* Card Body Text Section */}
        <div style={{ padding: "1.25rem" }}> 
          <h3 style={{ margin: "0 0 0.25rem 0", fontSize: "1.2rem" }}> 
            {aircraft.name} 
          </h3> 
          <small style={{ color: "var(--pico-muted-color)", display: "block", marginBottom: "0.75rem" }}> 
            @{aircraft.name.toLowerCase().replace(/\s+/g, "")} 
          </small> 
        </div> 
      </article> 
    </Link> 
  ); 
}

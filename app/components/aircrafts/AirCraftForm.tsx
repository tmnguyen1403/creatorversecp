import { Form, Link } from "react-router"; // 👈 FIX: Added Link import
import type { AirCraft } from "../../models/AirCraft"; 

export default function AirCraftForm() { 
  return ( 
    <main className="container" style={{ maxWidth: "600px", margin: "0 auto" }}> 
      <article> 
        <header style={{ textAlign: "center" }}> 
          <h1>Add Aircraft</h1> 
          <p style={{ color: "var(--pico-muted-color)", marginBottom: 0 }}>
            Submit your favorite aircraft
          </p> 
        </header> 

        <Form method="post"> 
          {/* Bold labels using Pico CSS standard layout syntax */}
          <label htmlFor="name" style={{ fontWeight: "bold" }}> 
            Name 
            <input 
              id="name" 
              name="name" 
              type="text" 
              placeholder="Aircraft name" 
              style={{ fontWeight: "normal" }} // Keeps typed user text clean and crisp
              required 
            /> 
          </label> 

          <label htmlFor="url" style={{ fontWeight: "bold" }}> 
            Aircraft URL 
            <input 
              id="url" 
              name="url" 
              type="url" 
              placeholder="https://..." 
              style={{ fontWeight: "normal" }}
              required 
            /> 
          </label> 

          <label htmlFor="imageURL" style={{ fontWeight: "bold" }}> 
            Image URL 
            <input 
              id="imageURL" 
              name="imageURL" 
              type="url" 
              placeholder="https://..." 
              style={{ fontWeight: "normal" }}
            /> 
          </label> 

          <label htmlFor="description" style={{ fontWeight: "bold" }}> 
            Description 
            <textarea 
              id="description" 
              name="description" 
              placeholder="Tell us about this aircraft..." 
              rows={4} 
              style={{ fontWeight: "normal" }}
              required 
            /> 
          </label> 

          {/* Action Buttons Panel side-by-side using Pico's native grid row */}
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1.5rem" }}>
            
            {/* Cancel Link Button (Muted Crimson Outline) */}
            <Link 
              to="/" 
              role="button" 
              className="outline" 
              style={{ 
                width: "100%", 
                marginBottom: "0", 
                "--pico-color": "#dc2626", 
                "--pico-border-color": "#dc2626", 
                "--pico-background-color": "transparent" 
              }} 
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#fef2f2"} 
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            > 
              ❌ Cancel 
            </Link> 

            {/* Submit Form Button (Sleek Indigo) */}
            <button 
              type="submit"
              style={{
                width: "100%",
                marginBottom: "0",
                "--pico-background-color": "#4f46e5", 
                "--pico-border-color": "#4f46e5",
                "--pico-color": "#ffffff"
              }}
            >
              🚀 Add Aircraft
            </button> 
          </div>

        </Form> 
      </article> 
    </main> 
  ); 
}

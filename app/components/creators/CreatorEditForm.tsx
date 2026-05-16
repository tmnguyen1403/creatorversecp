import { Form, Link } from "react-router"; 
import type { Creator } from "../../models/Creator"; 

type CreatorEditFormProps = { creator: Creator }; 

export default function CreatorEditForm({ creator }: CreatorEditFormProps) { 
  // Safe fallback if your ID mapping requires string extraction
  const creatorId = creator.id ? String(creator.id) : "";

  return ( 
    <main className="container" style={{ maxWidth: "600px", margin: "0 auto" }}> 
      <article> 
        <header style={{ textAlign: "center" }}> 
          <h1 style={{ marginBottom: "0" }}>Update Creator</h1> 
        </header> 

        <Form method="post"> 
          <input type="hidden" name="id" value={creatorId} />
          {/* 1. Name Input */}
          <label htmlFor="name" style={{ fontWeight: "bold" }}> 
            Name 
            <input 
              id="name" 
              name="name" 
              type="text" 
              placeholder="Creator name" 
              defaultValue={creator.name} 
              style={{ fontWeight: "normal" }} 
              required 
            /> 
          </label> 

          {/* 2. Creator URL Input */}
          <label htmlFor="url" style={{ fontWeight: "bold" }}> 
            Creator URL 
            <input 
              id="url" 
              name="url" 
              type="url" 
              placeholder="https://youtube.com..." 
              defaultValue={creator.url} 
              style={{ fontWeight: "normal" }}
              required 
            /> 
          </label> 

          {/* 3. Image URL Input */}
          <label htmlFor="imageURL" style={{ fontWeight: "bold" }}> 
            Image URL 
            <input 
              id="imageURL" 
              name="imageURL" 
              type="url" 
              placeholder="https://..." 
              defaultValue={creator.imageURL} 
              style={{ fontWeight: "normal" }}
            /> 
          </label> 

          {/* 4. Description Input */}
          <label htmlFor="description" style={{ fontWeight: "bold" }}> 
            Description 
            <textarea 
              id="description" 
              name="description" 
              placeholder="Tell us about this creator..." 
              defaultValue={creator.description} 
              rows={4} 
              style={{ fontWeight: "normal" }}
              required 
            /> 
          </label> 

          {/* Action Buttons Panel */}
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1.5rem" }}>
            
            {/* Cancel Button (Muted Crimson Outline) */}
            <Link 
              to={`/creators/${creatorId}`} 
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

            {/* Save Changes Button (Sleek Indigo) */}
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
              💾 Save Changes
            </button> 
          </div>

        </Form> 
      </article> 
    </main> 
  ); 
}

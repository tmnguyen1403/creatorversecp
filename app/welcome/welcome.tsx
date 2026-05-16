import logo from "../images/fighterjetlogo.jpg"; 
import logoLight from "./logo-light.svg"; 
import AirCraftList from "../components/aircrafts/AirCraftGrid"; 
import type { AirCraft } from "../models/AirCraft"; 
import { Link } from "react-router-dom"; 

type WelcomeProps = { aircrafts: AirCraft[] }; 

export function Welcome({ aircrafts }: WelcomeProps) { 
  //console.log("AirCraft data: ", aircrafts); 

  return ( 
    <>
      {/* 1. Header Navigation Bar (Pico Style) */}
      <nav 
        style={{ 
          position: "sticky", 
          top: 0, 
          zIndex: 50, 
          backgroundColor: "var(--pico-background-color)", 
          borderBottom: "1px solid var(--pico-muted-border-color)",
          padding: "0.75rem 1.5rem"
        }}
      >
        <ul>
          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {/* Native Pico dark/light theme visibility approach */}
            <img src={logo} alt="Logo" style={{ height: "1.75rem", margin: 0 }} className="light-only" />
            <strong>AirCraft Hub</strong>
          </li>
        </ul>
        <ul>
          <li>
            <Link 
              to="/aircrafts/new" 
              role="button" 
              style={{ 
                padding: "0.5rem 1rem", 
                fontSize: "0.9rem",
                margin: 0,
                "--pico-background-color": "#4f46e5", 
                "--pico-border-color": "#4f46e5",
                "--pico-color": "#ffffff"
              }}
            >
              ➕ Add Model
            </Link>
          </li>
        </ul>
      </nav>

      {/* 2. Main Content Wrapper */}
      <main className="container" style={{ paddingTop: "2rem" }}> 
        
        {/* Hero Typography Section */}
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h3 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            Discover Aircraft <span style={{ color: "#4f46e5" }}>Models</span>
          </h3>
        </header>

        {/* 3. The Grid Layout Module Container */}
        <AirCraftList aircrafts={aircrafts} /> 

      </main> 
    </>
  ); 
}

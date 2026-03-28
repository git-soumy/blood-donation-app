import { useState } from "react";
import useIsMobile from "../useIsMobile";

function Hospitals() {
  const isMobile = useIsMobile();

  const [searchText, setSearchText] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const getAddressText = (tags = {}) => {
    const parts = [
      tags["addr:housename"],
      tags["addr:housenumber"],
      tags["addr:street"],
      tags["addr:suburb"],
      tags["addr:city"] || tags["addr:town"] || tags["addr:village"],
      tags["addr:state"],
      tags["addr:postcode"],
    ].filter(Boolean);

    return parts.length > 0 ? parts.join(", ") : "Address not available";
  };

  const getPhoneText = (tags = {}) => {
    return (
      tags.phone ||
      tags["contact:phone"] ||
      tags["contact:mobile"] ||
      ""
    );
  };

  const searchHospitals = async () => {
    if (!city.trim() || !state.trim()) {
      setError("Please enter both city and state.");
      setHospitals([]);
      setSearched(true);
      return;
    }

    setLoading(true);
    setError("");
    setSearched(false);

    try {
      const locationQuery = searchText.trim()
        ? `${searchText}, ${city}, ${state}, India`
        : `${city}, ${state}, India`;

      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
          locationQuery
        )}&limit=5&addressdetails=1`
      );

      const geoData = await geoRes.json();

      if (!geoData || geoData.length === 0) {
        setError("Location not found. Please check locality, city, and state.");
        setHospitals([]);
        setSearched(true);
        setLoading(false);
        return;
      }

      let selectedPlace = geoData[0];

      if (searchText.trim()) {
        const exactMatch = geoData.find((place) =>
          place.display_name.toLowerCase().includes(searchText.toLowerCase())
        );

        if (exactMatch) {
          selectedPlace = exactMatch;
        }
      }

      const lat = parseFloat(selectedPlace.lat);
      const lon = parseFloat(selectedPlace.lon);

      const radius = searchText.trim() ? 3000 : 8000;

      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:${radius},${lat},${lon});
          way["amenity"="hospital"](around:${radius},${lat},${lon});
          relation["amenity"="hospital"](around:${radius},${lat},${lon});
        );
        out center tags;
      `;

      const overpassRes = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
        },
        body: overpassQuery,
      });

      const overpassData = await overpassRes.json();

      const mappedHospitals = (overpassData.elements || []).map((item) => {
        const tags = item.tags || {};

        return {
          id: `${item.type}-${item.id}`,
          name: tags.name || "Unnamed Hospital",
          address: getAddressText(tags),
          phone: getPhoneText(tags),
          emergency: tags.emergency || "Not specified",
          lat: item.lat || item.center?.lat || null,
          lon: item.lon || item.center?.lon || null,
        };
      });

      setHospitals(mappedHospitals);
      setSearched(true);
    } catch (err) {
      setError("Something went wrong while fetching hospitals.");
      setHospitals([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page(isMobile)}>
      <div style={styles.container}>
        <div style={styles.heroCard(isMobile)}>
          <h1 style={styles.heading(isMobile)}>🏥 Nearby Hospital Search</h1>
          <p style={styles.subtext}>
            Enter locality, city, and state to find hospitals near that exact area.
          </p>
        </div>

        <div style={styles.searchPanel(isMobile)}>
          <div style={styles.searchTopRow(isMobile)}>
            <input
              type="text"
              placeholder="Search locality / area (Example: Kalyanpur)"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={styles.input}
            />

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={styles.input}
            />

            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              style={styles.input}
            />

            <button onClick={searchHospitals} style={styles.searchButton}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          <p style={styles.helperText}>
            Example: Locality = Kalyanpur, City = Kanpur, State = Uttar Pradesh
          </p>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        {searched && !loading && hospitals.length === 0 && !error && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🏥</div>
            <h3 style={styles.emptyTitle}>No Hospitals Found</h3>
            <p style={styles.emptyText}>
              Try another locality, city, or state.
            </p>
          </div>
        )}

        <div style={styles.grid(isMobile)}>
          {hospitals.map((hospital) => (
            <div key={hospital.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.iconCircle}>🏥</div>
                <div>
                  <h3 style={styles.cardTitle}>{hospital.name}</h3>
                  <p style={styles.cardSubtitle}>Nearby hospital result</p>
                </div>
              </div>

              <div style={styles.infoBox}>
                <p style={styles.info}>
                  <strong>Address:</strong> {hospital.address}
                </p>

                <p style={styles.info}>
                  <strong>Phone:</strong>{" "}
                  {hospital.phone ? hospital.phone : "Not available"}
                </p>

                <p style={styles.info}>
                  <strong>Emergency:</strong> {hospital.emergency}
                </p>
              </div>

              <div style={styles.buttonRow(isMobile)}>
                {hospital.phone && (
                  <a
                    href={`tel:${hospital.phone}`}
                    style={{ ...styles.actionButton, ...styles.callButton }}
                  >
                    Call Now
                  </a>
                )}

                {hospital.lat && hospital.lon && (
                  <a
                    href={`https://www.google.com/maps?q=${hospital.lat},${hospital.lon}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ ...styles.actionButton, ...styles.mapButton }}
                  >
                    Open Map
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: (isMobile) => ({
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #111827 100%)",
    padding: isMobile ? "20px 12px 40px" : "30px 20px 50px",
  }),

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  heroCard: (isMobile) => ({
    background: "linear-gradient(135deg, #1e3a8a, #dc2626)",
    borderRadius: "28px",
    padding: isMobile ? "24px 18px" : "36px 30px",
    color: "white",
    boxShadow: "0 20px 45px rgba(0,0,0,0.25)",
    marginBottom: "24px",
  }),

  heading: (isMobile) => ({
    margin: "0 0 10px 0",
    fontSize: isMobile ? "28px" : "36px",
    fontWeight: "800",
  }),

  subtext: {
    margin: 0,
    color: "#e2e8f0",
    lineHeight: "1.7",
  },

  searchPanel: (isMobile) => ({
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "24px",
    padding: isMobile ? "18px" : "22px",
    boxShadow: "0 16px 35px rgba(0,0,0,0.18)",
    marginBottom: "24px",
  }),

  searchTopRow: (isMobile) => ({
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr auto",
    gap: "14px",
  }),

  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
    background: "white",
  },

  searchButton: {
    padding: "14px 22px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(90deg, #2563eb, #dc2626)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    minWidth: "120px",
  },

  helperText: {
    margin: "12px 4px 0 4px",
    color: "#cbd5e1",
    fontSize: "13px",
  },

  errorBox: {
    background: "rgba(239, 68, 68, 0.15)",
    border: "1px solid rgba(239, 68, 68, 0.35)",
    color: "#fecaca",
    borderRadius: "18px",
    padding: "14px 16px",
    marginBottom: "20px",
  },

  emptyState: {
    textAlign: "center",
    padding: "40px 20px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "24px",
    border: "1px dashed rgba(255,255,255,0.18)",
    marginBottom: "24px",
  },

  emptyIcon: {
    fontSize: "42px",
    marginBottom: "10px",
  },

  emptyTitle: {
    margin: "0 0 8px 0",
    color: "white",
    fontSize: "24px",
  },

  emptyText: {
    margin: 0,
    color: "#cbd5e1",
    lineHeight: "1.7",
  },

  grid: (isMobile) => ({
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "22px",
  }),

  card: {
    background: "white",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 18px 35px rgba(0,0,0,0.18)",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "18px",
  },

  iconCircle: {
    width: "54px",
    height: "54px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #2563eb, #dc2626)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "24px",
    flexShrink: 0,
  },

  cardTitle: {
    margin: "0 0 4px 0",
    color: "#0f172a",
    fontSize: "22px",
  },

  cardSubtitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "13px",
  },

  infoBox: {
    background: "#f8fafc",
    borderRadius: "18px",
    padding: "14px",
    border: "1px solid #e2e8f0",
  },

  info: {
    color: "#475569",
    lineHeight: "1.7",
    margin: "0 0 10px 0",
    wordBreak: "break-word",
  },

  buttonRow: (isMobile) => ({
    marginTop: "16px",
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: "12px",
  }),

  actionButton: {
    textDecoration: "none",
    textAlign: "center",
    padding: "12px 14px",
    borderRadius: "14px",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
  },

  callButton: {
    background: "linear-gradient(90deg, #16a34a, #22c55e)",
    color: "white",
  },

  mapButton: {
    background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
    color: "white",
  },
};

export default Hospitals;
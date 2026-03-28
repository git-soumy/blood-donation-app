import useIsMobile from "../useIsMobile";

function Hospitals() {
  const isMobile = useIsMobile();

  const hospitals = [
    {
      name: "City Hospital",
      address: "Civil Lines, Kanpur",
      blood: "A+, B+, O+",
      contact: "+91 9876543210",
    },
    {
      name: "LifeCare Hospital",
      address: "Swaroop Nagar, Kanpur",
      blood: "AB+, O-, A-",
      contact: "+91 9123456780",
    },
    {
      name: "Red Cross Center",
      address: "Mall Road, Kanpur",
      blood: "B-, O+, AB-",
      contact: "+91 9988776655",
    },
  ];

  return (
    <div style={styles.page(isMobile)}>
      <div style={styles.container}>
        <div style={styles.heroCard(isMobile)}>
          <h1 style={styles.heading(isMobile)}>🏥 Nearby Hospitals</h1>
          <p style={styles.subtext}>
            Explore hospitals and blood support centers with the same BloodCare premium visual style.
          </p>
        </div>

        <div style={styles.grid(isMobile)}>
          {hospitals.map((hospital, index) => (
            <div key={index} style={styles.card}>
              <h3 style={styles.cardTitle}>{hospital.name}</h3>
              <p style={styles.info}><strong>Address:</strong> {hospital.address}</p>
              <p style={styles.info}><strong>Available Blood:</strong> {hospital.blood}</p>
              <p style={styles.info}><strong>Contact:</strong> {hospital.contact}</p>
              <button style={styles.button}>View Details</button>
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

  grid: (isMobile) => ({
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "22px",
  }),

  card: {
    background: "white",
    borderRadius: "24px",
    padding: "28px",
    boxShadow: "0 18px 35px rgba(0,0,0,0.18)",
  },

  cardTitle: {
    marginTop: 0,
    marginBottom: "16px",
    color: "#0f172a",
    fontSize: "24px",
  },

  info: {
    color: "#475569",
    lineHeight: "1.7",
    marginBottom: "10px",
  },

  button: {
    marginTop: "14px",
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(90deg, #2563eb, #dc2626)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default Hospitals;
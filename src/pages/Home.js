import { useNavigate } from "react-router-dom";
import useIsMobile from "../useIsMobile";

function Home() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div style={styles.page(isMobile)}>
      <div style={styles.container}>
        <section style={styles.hero(isMobile)}>
          <div style={styles.heroLeft(isMobile)}>
            <div style={styles.badge}>❤️ Save Lives with One Donation</div>

            <h1 style={styles.heading(isMobile)}>
              Donate Blood, Support Hospitals, and Build a Better Community
            </h1>

            <p style={styles.description(isMobile)}>
              BloodCare helps donors and hospitals connect on one smart platform.
              Manage donors, find hospitals, and make emergency response faster
              with a beautiful and simple system.
            </p>

            <div style={styles.buttonRow(isMobile)}>
              <button style={styles.primaryBtn(isMobile)} onClick={() => navigate("/signup")}>
                Get Started
              </button>

              <button style={styles.secondaryBtn(isMobile)} onClick={() => navigate("/dashboard")}>
                Explore Dashboard
              </button>
            </div>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.heroCard(isMobile)}>
              <h3 style={styles.cardTitle}>Why BloodCare?</h3>
              <div style={styles.featureItem}>🩸 Easy donor management</div>
              <div style={styles.featureItem}>🏥 Nearby hospital access</div>
              <div style={styles.featureItem}>⚡ Fast emergency support</div>
              <div style={styles.featureItem}>🔐 Secure authentication</div>
            </div>
          </div>
        </section>

        <section style={styles.statsSection(isMobile)}>
          <div style={styles.statCard(isMobile)}>
            <h2 style={styles.statNumber}>500+</h2>
            <p style={styles.statLabel}>Registered Donors</p>
          </div>

          <div style={styles.statCard(isMobile)}>
            <h2 style={styles.statNumber}>120+</h2>
            <p style={styles.statLabel}>Connected Hospitals</p>
          </div>

          <div style={styles.statCard(isMobile)}>
            <h2 style={styles.statNumber}>1000+</h2>
            <p style={styles.statLabel}>Lives Supported</p>
          </div>
        </section>

        <section style={styles.featuresSection}>
          <h2 style={styles.sectionTitle(isMobile)}>Platform Highlights</h2>

          <div style={styles.featureGrid}>
            <div style={styles.bigCard}>
              <h3 style={styles.bigCardTitle}>Donor Dashboard</h3>
              <p style={styles.bigCardText}>
                Add and manage donor records with a clean and organized layout.
              </p>
            </div>

            <div style={styles.bigCard}>
              <h3 style={styles.bigCardTitle}>Hospital Directory</h3>
              <p style={styles.bigCardText}>
                Browse hospitals and connect with healthcare centers quickly.
              </p>
            </div>

            <div style={styles.bigCard}>
              <h3 style={styles.bigCardTitle}>Modern User Experience</h3>
              <p style={styles.bigCardText}>
                Enjoy the same premium theme and attractive layout across all
                pages of the website.
              </p>
            </div>
          </div>
        </section>
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

  hero: (isMobile) => ({
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "24px",
    alignItems: "stretch",
    marginTop: "18px",
  }),

  heroLeft: (isMobile) => ({
    flex: "1 1 650px",
    background: "linear-gradient(135deg, #1e3a8a, #dc2626)",
    borderRadius: "28px",
    padding: isMobile ? "30px 22px" : "50px 40px",
    color: "white",
    boxShadow: "0 20px 45px rgba(0,0,0,0.28)",
  }),

  heroRight: {
    flex: "1 1 320px",
    display: "flex",
  },

  heroCard: (isMobile) => ({
    width: "100%",
    borderRadius: "28px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(10px)",
    color: "white",
    padding: isMobile ? "26px 20px" : "36px 28px",
    boxShadow: "0 20px 45px rgba(0,0,0,0.22)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }),

  badge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.16)",
    padding: "10px 16px",
    borderRadius: "999px",
    fontWeight: "600",
    marginBottom: "20px",
    border: "1px solid rgba(255,255,255,0.18)",
    fontSize: "14px",
  },

  heading: (isMobile) => ({
    fontSize: isMobile ? "30px" : "48px",
    lineHeight: "1.2",
    marginBottom: "18px",
    fontWeight: "800",
  }),

  description: (isMobile) => ({
    fontSize: isMobile ? "15px" : "17px",
    lineHeight: "1.8",
    color: "#e2e8f0",
    maxWidth: "700px",
    marginBottom: "28px",
  }),

  buttonRow: (isMobile) => ({
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "16px",
  }),

  primaryBtn: (isMobile) => ({
    padding: "14px 24px",
    border: "none",
    borderRadius: "14px",
    background: "white",
    color: "#0f172a",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "15px",
    width: isMobile ? "100%" : "auto",
  }),

  secondaryBtn: (isMobile) => ({
    padding: "14px 24px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.12)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.18)",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "15px",
    width: isMobile ? "100%" : "auto",
  }),

  cardTitle: {
    fontSize: "24px",
    marginBottom: "22px",
  },

  featureItem: {
    padding: "14px 16px",
    marginBottom: "12px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.10)",
  },

  statsSection: (isMobile) => ({
    marginTop: "28px",
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  }),

  statCard: () => ({
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "24px",
    padding: "28px",
    textAlign: "center",
    color: "white",
    boxShadow: "0 14px 30px rgba(0,0,0,0.18)",
  }),

  statNumber: {
    margin: "0 0 8px 0",
    fontSize: "34px",
    fontWeight: "800",
  },

  statLabel: {
    margin: 0,
    color: "#cbd5e1",
  },

  featuresSection: {
    marginTop: "34px",
  },

  sectionTitle: (isMobile) => ({
    color: "white",
    fontSize: isMobile ? "26px" : "32px",
    marginBottom: "20px",
    textAlign: "center",
  }),

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },

  bigCard: {
    background: "white",
    borderRadius: "24px",
    padding: "28px",
    boxShadow: "0 18px 35px rgba(0,0,0,0.18)",
  },

  bigCardTitle: {
    marginTop: 0,
    color: "#0f172a",
    fontSize: "22px",
  },

  bigCardText: {
    color: "#475569",
    lineHeight: "1.7",
    marginBottom: 0,
  },
};

export default Home;
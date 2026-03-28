import { useState } from "react";
import { useLocation } from "react-router-dom";
import DonorForm from "../DonorForm";
import DonorList from "../DonorList";
import useIsMobile from "../useIsMobile";

function Dashboard() {
  const location = useLocation();
  const role = location.state?.role || "donor";
  const email = location.state?.email || "";
  const isMobile = useIsMobile();

  const [refresh, setRefresh] = useState(0);
  const [search, setSearch] = useState("");

  const refreshDonors = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div style={styles.page(isMobile)}>
      <div style={styles.container}>
        <div style={styles.headerCard(isMobile)}>
          <div>
            <h1 style={styles.heading(isMobile)}>
              {role === "hospital" ? "🏥 Hospital Dashboard" : "🩸 Donor Dashboard"}
            </h1>
            <p style={styles.subtext}>Logged in as: <strong>{email}</strong></p>
            <p style={styles.subtext}>Role: <strong>{role}</strong></p>
          </div>

          <div style={styles.headerStats(isMobile)}>
            <div style={styles.miniStat(isMobile)}>
              <span style={styles.miniStatNumber}>
                {role === "hospital" ? "Access" : "Profile"}
              </span>
              <span style={styles.miniStatText}>
                {role === "hospital" ? "Donor Search" : "Personal Donor Form"}
              </span>
            </div>
          </div>
        </div>

        {role === "hospital" && (
          <>
            <div style={styles.searchCard}>
              <input
                type="text"
                placeholder="Search by blood group..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.search}
              />
            </div>

            <div style={styles.fullWidth}>
              <DonorList refreshTrigger={refresh} search={search} />
            </div>
          </>
        )}

        {role === "donor" && (
          <div style={styles.donorOnlyWrapper(isMobile)}>
            <DonorForm refreshDonors={refreshDonors} />
          </div>
        )}
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

  headerCard: (isMobile) => ({
    background: "linear-gradient(135deg, #1e3a8a, #dc2626)",
    borderRadius: "28px",
    padding: isMobile ? "24px 18px" : "34px 30px",
    color: "white",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    gap: "20px",
    alignItems: isMobile ? "flex-start" : "center",
    boxShadow: "0 20px 45px rgba(0,0,0,0.25)",
  }),

  heading: (isMobile) => ({
    margin: "0 0 10px 0",
    fontSize: isMobile ? "28px" : "36px",
    fontWeight: "800",
  }),

  subtext: {
    margin: "4px 0",
    color: "#e2e8f0",
    lineHeight: "1.7",
    wordBreak: "break-word",
  },

  headerStats: (isMobile) => ({
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    width: isMobile ? "100%" : "auto",
  }),

  miniStat: (isMobile) => ({
    minWidth: isMobile ? "100%" : "160px",
    padding: "16px 18px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.16)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),

  miniStatNumber: {
    fontSize: "22px",
    fontWeight: "800",
  },

  miniStatText: {
    fontSize: "13px",
    color: "#dbeafe",
    textAlign: "center",
    marginTop: "4px",
  },

  searchCard: {
    marginTop: "22px",
    padding: "18px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "0 16px 35px rgba(0,0,0,0.18)",
  },

  search: {
    width: "100%",
    padding: "15px 18px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  fullWidth: {
    marginTop: "24px",
  },

  donorOnlyWrapper: (isMobile) => ({
    marginTop: "24px",
    maxWidth: isMobile ? "100%" : "520px",
  }),
};

export default Dashboard;
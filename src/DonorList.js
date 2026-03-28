import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import useIsMobile from "./useIsMobile";

function DonorList({ refreshTrigger, search }) {
  const isMobile = useIsMobile();
  const [donors, setDonors] = useState([]);

  const fetchDonors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "donors"));
      const list = [];

      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });

      setDonors(list);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [refreshTrigger]);

  const filteredDonors = donors.filter((d) =>
    d.blood.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.card(isMobile)}>
      <div style={styles.header(isMobile)}>
        <div>
          <h2 style={styles.title(isMobile)}>Donor Records</h2>
          <p style={styles.subtitle(isMobile)}>
            Search and view registered blood donors in one place.
          </p>
        </div>

        <div style={styles.countBox(isMobile)}>
          <span style={styles.countNumber}>{filteredDonors.length}</span>
          <span style={styles.countLabel}>Results</span>
        </div>
      </div>

      {filteredDonors.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🩸</div>
          <h3 style={styles.emptyTitle}>No Donors Found</h3>
          <p style={styles.emptyText}>
            Try another blood group search or add a new donor from the form.
          </p>
        </div>
      ) : (
        <div style={styles.listWrapper}>
          {filteredDonors.map((d) => (
            <div key={d.id} style={styles.itemCard}>
              <div style={styles.itemTop(isMobile)}>
                <div style={styles.avatar}>{d.name?.charAt(0)?.toUpperCase()}</div>
                <div>
                  <h3 style={styles.name}>{d.name}</h3>
                  <p style={styles.city}>📍 {d.city}</p>
                </div>
              </div>

              <div style={styles.infoGrid(isMobile)}>
                <div style={styles.infoBox}>
                  <span style={styles.infoLabel}>Blood Group</span>
                  <span style={styles.bloodBadge}>{d.blood}</span>
                </div>

                <div style={styles.infoBox}>
                  <span style={styles.infoLabel}>Phone</span>
                  <span style={styles.infoValue}>{d.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: (isMobile) => ({
    width: "100%",
    background: "white",
    borderRadius: "24px",
    padding: isMobile ? "22px 18px" : "28px",
    boxShadow: "0 18px 35px rgba(0,0,0,0.18)",
    boxSizing: "border-box",
  }),

  header: (isMobile) => ({
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: isMobile ? "flex-start" : "center",
    gap: "16px",
    marginBottom: "24px",
  }),

  title: (isMobile) => ({
    margin: "0 0 6px 0",
    color: "#0f172a",
    fontSize: isMobile ? "24px" : "28px",
    fontWeight: "800",
  }),

  subtitle: (isMobile) => ({
    margin: 0,
    color: "#64748b",
    fontSize: isMobile ? "13px" : "14px",
    lineHeight: "1.6",
  }),

  countBox: (isMobile) => ({
    minWidth: isMobile ? "100%" : "90px",
    padding: "14px 16px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #2563eb, #dc2626)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 25px rgba(37, 99, 235, 0.22)",
  }),

  countNumber: {
    fontSize: "24px",
    fontWeight: "800",
    lineHeight: 1,
  },

  countLabel: {
    fontSize: "12px",
    marginTop: "4px",
    color: "#e2e8f0",
  },

  emptyState: {
    textAlign: "center",
    padding: "40px 20px",
    background: "#f8fafc",
    borderRadius: "20px",
    border: "1px dashed #cbd5e1",
  },

  emptyIcon: {
    fontSize: "42px",
    marginBottom: "10px",
  },

  emptyTitle: {
    margin: "0 0 8px 0",
    color: "#0f172a",
    fontSize: "24px",
  },

  emptyText: {
    margin: 0,
    color: "#64748b",
    lineHeight: "1.7",
  },

  listWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  itemCard: {
    background: "#f8fafc",
    borderRadius: "20px",
    padding: "18px",
    border: "1px solid #e2e8f0",
  },

  itemTop: (isMobile) => ({
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "16px",
    flexWrap: isMobile ? "wrap" : "nowrap",
  }),

  avatar: {
    width: "52px",
    height: "52px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #2563eb, #dc2626)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "800",
    fontSize: "20px",
    flexShrink: 0,
  },

  name: {
    margin: "0 0 4px 0",
    color: "#0f172a",
    fontSize: "20px",
  },

  city: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },

  infoGrid: (isMobile) => ({
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
  }),

  infoBox: {
    background: "white",
    borderRadius: "16px",
    padding: "14px",
    border: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  infoLabel: {
    fontSize: "12px",
    color: "#64748b",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
  },

  bloodBadge: {
    display: "inline-block",
    width: "fit-content",
    padding: "8px 12px",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #dc2626, #ef4444)",
    color: "white",
    fontWeight: "800",
    fontSize: "14px",
  },

  infoValue: {
    color: "#0f172a",
    fontWeight: "700",
    fontSize: "15px",
    wordBreak: "break-word",
  },
};

export default DonorList;
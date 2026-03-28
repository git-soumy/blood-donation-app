import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import useIsMobile from "./useIsMobile";

function DonorForm({ refreshDonors }) {
  const isMobile = useIsMobile();

  const [name, setName] = useState("");
  const [blood, setBlood] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const addDonor = async () => {
    if (!name || !blood || !city || !phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "donors"), {
        name,
        blood,
        city,
        phone,
      });

      alert("Donor Added Successfully ✅");

      setName("");
      setBlood("");
      setCity("");
      setPhone("");

      refreshDonors();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.card(isMobile)}>
      <div style={styles.topRow(isMobile)}>
        <div style={styles.iconBox}>➕</div>
        <div>
          <h2 style={styles.title(isMobile)}>Add New Donor</h2>
          <p style={styles.subtitle(isMobile)}>
            Enter donor details to add them into the BloodCare system.
          </p>
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Full Name</label>
        <input
          type="text"
          placeholder="Enter donor name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Blood Group</label>
        <input
          type="text"
          placeholder="Example: A+, O-, AB+"
          value={blood}
          onChange={(e) => setBlood(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>City</label>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Phone Number</label>
        <input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />
      </div>

      <button onClick={addDonor} style={styles.button}>
        Add Donor
      </button>
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

  topRow: (isMobile) => ({
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "center",
    gap: "16px",
    marginBottom: "24px",
  }),

  iconBox: {
    width: "58px",
    height: "58px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #2563eb, #dc2626)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    boxShadow: "0 10px 25px rgba(37, 99, 235, 0.22)",
  },

  title: (isMobile) => ({
    margin: "0 0 6px 0",
    color: "#0f172a",
    fontSize: isMobile ? "22px" : "26px",
    fontWeight: "800",
  }),

  subtitle: (isMobile) => ({
    margin: 0,
    color: "#64748b",
    lineHeight: "1.6",
    fontSize: isMobile ? "13px" : "14px",
  }),

  formGroup: {
    marginBottom: "16px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    color: "#334155",
    fontWeight: "700",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
    background: "#f8fafc",
  },

  button: {
    width: "100%",
    marginTop: "10px",
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(90deg, #2563eb, #dc2626)",
    color: "white",
    fontWeight: "800",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 12px 24px rgba(37, 99, 235, 0.24)",
  },
};

export default DonorForm;
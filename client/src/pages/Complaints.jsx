import React from "react";
import ComplaintBox from "../components/ComplaintBox";

export default function Complaints() {
  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Complaints
      </h2>

      <ComplaintBox />
    </div>
  );
}

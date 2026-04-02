import { useEffect, useState } from "react";
import "../styles/Notice.css";

export default function Notice() {

  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/notices");
      const data = await res.json();

      if (Array.isArray(data)) {
        setNotices(data);
      } else if (Array.isArray(data.data)) {
        setNotices(data.data);
      } else {
        setNotices([]);
      }

    } catch (error) {
      console.log("Error fetching notices:", error);
    }
  };

  return (
    <div className="container mt-5 text-center">

      <h2>Notice Board</h2>

      <div className="row mt-4">

        {notices.map((notice) => (

          <div className="col-md-4 mb-4" key={notice._id}>

            <div
              className="card p-3 shadow notice-card"
              style={{
                backgroundColor: "#f7f1e3",
                borderRadius: "12px",
              }}
            >

              <h6>📢 {notice.title || "Notice"}</h6>

              <p>{notice.message}</p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
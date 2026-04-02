import { useEffect, useState } from "react";

export default function AdminNotices() {
  const [notices, setNotices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

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
      setNotices([]);
    }
  };

  // ✅ DELETE FUNCTION
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notices/${id}`, {
        method: "DELETE",
      });

      // remove from UI instantly
      setNotices(notices.filter((n) => n._id !== id));
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message }),
      });

      setTitle("");
      setMessage("");
      setShowForm(false);

      fetchNotices();
    } catch (error) {
      console.log("Error posting notice:", error);
    }
  };

  const thStyle = {
    padding: "14px",
    border: "1px solid #dcdcdc",
    backgroundColor: "#e6d5b8",
    color: "#4e342e",
    fontWeight: "600",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "14px",
    border: "1px solid #e0e0e0",
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "1100px",
          backgroundColor: "#ffffff",
          padding: "30px",
          border: "1px solid #e0e0e0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        {!showForm ? (
          <>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "30px",
                color: "#4e342e",
                fontWeight: "600",
              }}
            >
              Notices List
            </h2>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed",
              }}
            >
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: "40%" }}>Title</th>
                  <th style={{ ...thStyle, width: "40%" }}>Message</th>
                  <th style={{ ...thStyle, width: "20%" }}>Action</th> {/* ✅ NEW */}
                </tr>
              </thead>

              <tbody>
                {notices.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      No notices found
                    </td>
                  </tr>
                ) : (
                  notices.map((notice) => (
                    <tr key={notice._id}>
                      <td style={tdStyle}>{notice.title}</td>
                      <td style={tdStyle}>{notice.message}</td>

                      {/* ✅ DELETE BUTTON */}
                      <td style={tdStyle}>
                        <button
                          onClick={() => handleDelete(notice._id)}
                          style={{
                            backgroundColor: "#e74c3c",
                            border: "none",
                            padding: "6px 14px",
                            borderRadius: "6px",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  backgroundColor: "#c8a97e",
                  border: "none",
                  padding: "10px 30px",
                  borderRadius: "6px",
                  color: "white",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Add Notice
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: "15px" }}>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "30px",
                  border: "1px solid #c8a97e",
                  backgroundColor: "#e6d5b8",
                  color: "#4e342e",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                ← Back to Notices
              </button>
            </div>

            <h2
              style={{
                textAlign: "center",
                marginBottom: "30px",
                color: "#4e342e",
                fontWeight: "600",
              }}
            >
              Manage Notices
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <input
                  type="text"
                  placeholder="Notice Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "30px",
                    border: "1px solid #c8b6a6",
                  }}
                />
              </div>

              <div style={{ marginBottom: "25px" }}>
                <textarea
                  rows="4"
                  placeholder="Notice Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #c8b6a6",
                  }}
                />
              </div>

              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#c8a97e",
                    border: "none",
                    padding: "10px 30px",
                    borderRadius: "8px",
                    color: "white",
                    fontWeight: "600",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    cursor: "pointer",
                  }}
                >
                  Post Notice
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
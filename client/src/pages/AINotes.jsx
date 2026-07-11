export default function AINotes() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>📝 AI Notes Generator</h1>

      <p>Type any topic below.</p>

      <textarea
        rows="8"
        placeholder="Example: Photosynthesis"
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "15px",
          fontSize: "16px",
        }}
      />

      <br /><br />

      <button>Generate Notes</button>
    </div>
  );
}
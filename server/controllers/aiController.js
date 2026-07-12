export async function generateNotes(req, res) {
  console.log("✅ Request received!");
  console.log(req.body);

  res.json({
    success: true,
    notes: "HELLO FROM EXPRESS 🚀"
  });
}
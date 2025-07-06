export default async function handler(req, res) {
  const url = "https://script.google.com/macros/s/AKfycbwI_W5uMTHFXHQXmKPDnAap9yjAlkrKMalDm8PL8yRwx89mCeATzX3ivPERi5vvp9u-/exec";

  const setCORS = () => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  };

  setCORS();

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === "GET") {
      const params = new URLSearchParams(req.query).toString();
      const response = await fetch(`${url}?${params}`);
      const contentType = response.headers.get("content-type") || "";
      const text = await response.text();

      setCORS();
      if (contentType.includes("application/json")) {
        res.setHeader("Content-Type", "application/json");
      }
      res.status(200).send(text);

    } else if (req.method === "POST") {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body)
      });

      const text = await response.text();
      setCORS();
      res.status(response.status).send(text);

    } else {
      setCORS();
      res.status(405).send("Method Not Allowed");
    }
  } catch (error) {
    setCORS();
    res.status(500).send("Internal Server Error: " + error.message);
  }
}

export default async function handler(req, res) {
  const url = "https://script.google.com/macros/s/AKfycbzaVBF8t9Q1HmAlsc7EK6DkTG4i8SX1BdYhHZjkESpEaAh6e9T6DvkH-ZyF5JLOMAKu/exec";

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === "GET") {
      const params = new URLSearchParams(req.query).toString();
      const response = await fetch(`${url}?${params}`);

      const contentType = response.headers.get("content-type") || "";

      if (!response.ok) {
        const errorText = await response.text();
        res.status(response.status).send(errorText || "Google Script Error");
        return;
      }

      if (contentType.includes("application/json")) {
        const data = await response.json();
        res.status(200).json(data);
      } else {
        const text = await response.text();
        res.status(200).send(text);
      }

    } else if (req.method === "POST") {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      const text = await response.text();
      res.status(response.status).send(text);

    } else {
      res.status(405).send("Method Not Allowed");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
}

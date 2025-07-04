export default async function handler(req, res) {
  const url = 'https://script.google.com/macros/s/AKfycbz7GAFvWTME1R1AThpAEHPfN79pq2kReyHpsYfy88RoHEE-7n3bXJd5Z1IKvkiZmpI/exec';

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const params = new URLSearchParams(req.query).toString();
    const response = await fetch(`${url}?${params}`);
    const data = await response.json();
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const data = await response.text();
    res.status(200).send(data);
  } else {
    res.status(405).send('Method Not Allowed');
  }
}

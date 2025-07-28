// pages/api/views/[slug].js

let views = {}; // In-memory storage (temporary!)

export default function handler(req, res) {
  const { slug } = req.query;

  if (req.method === 'POST') {
    views[slug] = (views[slug] || 0) + 1;
    return res.status(200).json({ views: views[slug] });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ views: views[slug] || 0 });
  }

  res.status(405).end(); // Method Not Allowed
}

const HYGRAPH_API_URL = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const query = `
      query {
        analytics(where: { id: "SOME_STATIC_ID" }) {
          totalVisits
        }
      }
    `;

    const fetchCurrent = await fetch(HYGRAPH_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    const result = await fetchCurrent.json();
    const current = result.data?.analytics?.totalVisits || 0;

    const mutation = `
      mutation {
        updateAnalytics(
          where: { id: "SOME_STATIC_ID" }
          data: { totalVisits: ${current + 1} }
        ) {
          totalVisits
        }
        publishAnalytics(where: { id: "SOME_STATIC_ID" }) {
          id
        }
      }
    `;

    await fetch(HYGRAPH_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query: mutation }),
    });

    return res.status(200).json({ visits: current + 1 });
  }

  res.status(405).end();
}

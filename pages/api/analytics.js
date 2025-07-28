const HYGRAPH_API_URL = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN;

export default async function handler(req, res) {
  const { slug } = req.query;

  if (req.method === "POST") {
    const query = `
      query {
        totalVisit(where: { id: "cmdnqotgk6ss07ugpo3kkko2" }) {
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
    const current = result.data?.totalVisit?.totalVisits || 0;

    const mutation = `
      mutation {
        updateTotalVisit(
          where: { id: "cmdnqotgk6ss07ugpo3kkko2" }
          data: { totalVisits: ${current + 1} }
        ) {
          totalVisits
        }
        publishTotalVisit(where: { id: "cmdnqotgk6ss07ugpo3kkko2" }) {
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

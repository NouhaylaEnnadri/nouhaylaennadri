import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and  *
 * will be treated as an API endpoint instead of a page.         *
 *************************************************************** */

// export a default function for API route to work
export default async function asynchandler(req, res) {
  // Initialize the GraphQL client
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  // Define the mutation
  const mutation = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    // Ensure to use variables in the request
    const result = await graphQLClient.request(mutation, req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error("GraphQL request failed:", error);
    return res.status(500).json({ error: error.message });
  }
}

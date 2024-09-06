  import { GraphQLClient, gql } from "graphql-request";

  const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

  /** *************************************************************
   * Any file inside the folder pages/api is mapped to /api/* and  *
   * will be treated as an API endpoint instead of a page.         *
   *************************************************************** */

  // Export a default function for API route to work
  export default async function asynchandler(req, res) {
    // Initialize the GraphQL client
    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
      },
    });

    // Define the mutation to create a comment
    const createCommentMutation = gql`
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

    // Define the mutation to publish the comment
    const publishCommentMutation = gql`
      mutation PublishComment($id: ID!) {
        publishComment(where: { id: $id }, to: PUBLISHED) {
          id
          stage
        }
      }
    `;

    try {
      // Create a comment
      const createResult = await graphQLClient.request(createCommentMutation, req.body);

      // Get the created comment ID
      const commentId = createResult.createComment.id;

      // Publish the comment
      const publishResult = await graphQLClient.request(publishCommentMutation, { id: commentId });

      return res.status(200).json(publishResult);
    } catch (error) {
      console.error("GraphQL request failed:", error);
      return res.status(500).json({ error: error.message });
    }
  }

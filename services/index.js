import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            createdAt
            excerpt
            id
            slug
            stage
            title
            category {
              id
              name
              slug
            }
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            featuredImage {
              url
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetRecentPosts {
      postsConnection(orderBy: createdAt_DESC, first: 3) {
        edges {
          node {
            title
            slug
            createdAt
            featuredImage {
              url
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};
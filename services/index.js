import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection(orderBy: createdAt_DESC) {
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
            category {
              name
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
            category {
              name
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};

export const getRelatedPosts = async (categories, slug) => {
  const query = gql`
  query GetSimilarPosts($slug: String!, $categories: [String!]) {
  posts(
    where: {
      slug: { neq: $slug },  // 'neq' for not equal
      categories: { in: $categories }  // 'in' for inclusion
    }
    first: 3
  ) {
    title
    featuredImage {
      url
    }
    createdAt
    slug
  }
}
`;

  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};

export const getCategory = async () => {
  const query = gql`
    query GetCategory {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.categories;
};

export const getPostsDetails = async (slug) => {
  const query = gql`
    query GetPostsDetails($slug: String!) {
      post(where: { slug: $slug }) {
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
        content {
          raw
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.post;
};

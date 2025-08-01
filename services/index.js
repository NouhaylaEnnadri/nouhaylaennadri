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
            excerpt
            shortDescription
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
          slug_not: $slug
          AND: { category_some: { slug_in: $categories } }
        }
        first: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
        shortDescription
        category {
          id
          name
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });
  return result.posts;
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
        content
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.post;
};

export const submitComment = async (obj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetPublishedComments($slug: String!) {
      comments(where: { post: { slug: $slug } }, stage: PUBLISHED) {
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};


export const getAllNotes = async () => {
  const query = gql`
    query MyQuery {
      note {
        title
        slug
        excerpt
        content {
          text
        }
        notecategory {
          ... on NoteCategory {
            id
            name
            slug
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.note;
};
export const getNoteCategories = async () => {
  const query = gql`
    query GetNoteCategories {
      noteCategories {
        name
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.noteCategories;
};

// Inside services.js
export const getCategoryByPost = async (categorySlug) => {
  const query = gql`
    query MyQuery($slug: String!) {
      postsConnection(where: { category_some: { slug: $slug } }) {
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

  // Execute the query with the provided categorySlug
  const result = await request(graphqlAPI, query, { slug: categorySlug });

  console.log("GraphQL Response:", result); // Log the response for debugging

  return result.postsConnection.edges;
};

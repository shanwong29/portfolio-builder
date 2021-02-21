const functions = require("firebase-functions");
const { GraphQLClient, gql } = require("graphql-request");

exports.getContribution = functions.https.onCall(async (data, context) => {
  const endpoint = "https://api.github.com/graphql";

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `token ${functions.config().github.token}`
    }
  });

  const query = gql`
    {
      user(login: "${data.loginName}") {
        repositoriesContributedTo(last: 10) {
          nodes {
            languages(first: 1) {
              nodes {
                color
                name
              }
            }
            description
            nameWithOwner
            url
          }
        }
      }
    }
  `;

  try {
    const data = await graphQLClient.request(query);
    return data;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
});

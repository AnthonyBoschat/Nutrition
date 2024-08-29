import { ApolloClient, InMemoryCache } from '@apollo/client';

// Créez une instance de cache personnalisé
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allIngredient: {
          read(existing) {
            return existing ? existing.map(({ __typename, ...rest }) => rest) : [];
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql/', // Remplace l'URL par celle de ton endpoint GraphQL
    cache: new InMemoryCache(cache),
});

export default client;
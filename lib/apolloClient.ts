import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(process.env.CMS_URL!);

export default client;

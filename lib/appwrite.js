import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

export const account = new Account(client);
export const databases = new Databases(client);

export { ID, Query } from "appwrite";

export const isAuthenticated = async () => {
  try {
    const user = await account.get();
    return user ? true : false;
  } catch (error) {
    return false;
  }
};

import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

export const account = new Account(client);

export { ID } from "appwrite";

export const isAuthenticated = async () => {
  try {
    const user = await account.get();
    console.log(user)
    return user ? true : false; // Returns true if user is authenticated //!!user
  } catch (error) {
    return false; // User is not authenticated
  }
};

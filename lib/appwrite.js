import { Client, Account } from "appwrite";

const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('audiophile');

export const account = new Account(client);

export {ID} from 'appwrite'
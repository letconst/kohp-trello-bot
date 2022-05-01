import { TrelloClient as TClient } from "trello.js";

const { TRELLO_API_KEY, TRELLO_API_TOKEN } = process.env;

export default class TrelloClient {
    private static _instance: TrelloClient;

    private readonly _client: TClient;

    private constructor() {
        this._client = new TClient({
            key: TRELLO_API_KEY as string,
            token: TRELLO_API_TOKEN as string
        });
    }

    public static get instance(): TrelloClient {
        if (!this._instance) {
            this._instance = new TrelloClient();
        }

        return this._instance;
    }

    public get client(): TClient {
        return this._client;
    }
}

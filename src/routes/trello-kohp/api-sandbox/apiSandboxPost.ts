import express           from 'express'
import { RequestConfig } from 'trello.js'
import TrelloClient      from '../../../trello/TrelloClient'

const apiSandboxPost = async (req: express.Request, res: express.Response) => {
    console.log(req.body);
    const url: string    = req.body.url;
    let params: string   = req.body.params;
    const method: string = req.body.method;

    if (params) {
        params = JSON.parse(`{${params}}`);
    }

    const config = {
        url,
        method,
        params: params
    }

    const tRes = await TrelloClient.instance.client.sendRequest(config as RequestConfig);
    console.log(tRes);

    res.sendStatus(200);
}

export default apiSandboxPost;

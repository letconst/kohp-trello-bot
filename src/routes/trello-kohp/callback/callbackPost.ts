import express              from 'express'
import TrelloWebhookHandler from '../../../trello/trelloWebhookHandler'
import TrelloWebhook        from '../../../types/trelloWebhook'

export const callbackPost = (req: express.Request, res: express.Response) => {
    const data: TrelloWebhook = req.body;
    const isValid: boolean    = TrelloWebhookHandler.instance.isValidData(data);

    if (!isValid) {
        res.sendStatus(200);

        return;
    }

    TrelloWebhookHandler.instance.responseQueue.enqueue(data);

    console.log(req.body);
    res.sendStatus(200);
}

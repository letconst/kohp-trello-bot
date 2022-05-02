import express from 'express'

export const callbackGet = (req: express.Request, res: express.Response) => {
    res.sendStatus(200);
}

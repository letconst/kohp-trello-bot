import express from 'express'

export const get = (req: express.Request, res: express.Response) => {
    res.sendStatus(200);
}

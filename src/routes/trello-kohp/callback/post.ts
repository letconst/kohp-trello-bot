import express from 'express'

export const post = (req: express.Request, res: express.Response) => {
    console.log(req.body);
    res.sendStatus(200);
}

import express                                     from 'express'
import { ALLOWED_TYPES, ALLOWED_TRANSLATION_KEYS } from '../../../constants/allowedTrelloAction';

const { TRELLO_ID_MEMBER_BOT } = process.env;

const isValidData = (data: any): boolean => {
    if (!data) return false;

    const action = data.action;

    // ボットアカウントは弾く
    if (action.memberCreator.id === TRELLO_ID_MEMBER_BOT)
        return false;

    // 特定のtypeのみ
    if (!ALLOWED_TYPES.includes(action.type))
        return false;

    // typeがupdateCardの場合、特定のtranslationKeyのみ許可
    if (!(action.type === 'updateCard' &&
        ALLOWED_TRANSLATION_KEYS.includes(action.display.translationKey))) {
        return false;
    }

    return true;
}

export const callbackPost = (req: express.Request, res: express.Response) => {
    const data: TrelloWebhook = req.body;
    const isValid = isValidData(data);

    if (!isValid) return;

    console.log(req.body);
    res.sendStatus(200);
}

import Queue                                       from 'yocto-queue';
import TrelloWebhook                               from '../types/trelloWebhook'
import { ALLOWED_TRANSLATION_KEYS, ALLOWED_TYPES } from '../constants/allowedTrelloAction'

const { TRELLO_ID_MEMBER_BOT } = process.env;

export default class TrelloWebhookHandler {
    private static _instance: TrelloWebhookHandler;

    private _actionQueue = new Queue<TrelloWebhook>();

    private constructor() {
    }

    public static get instance(): TrelloWebhookHandler {
        if (!this._instance) {
            this._instance = new TrelloWebhookHandler();
        }

        return this._instance;
    }

    public get actionQueue(): Queue<TrelloWebhook> {
        return this._actionQueue;
    }

    /**
     * Trelloからのウェブフックレスポンスデータが処理対象のものかを確認する
     * @param data ウェブフックレスポンスデータ
     */
    public isValidData(data: TrelloWebhook): boolean {
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
}

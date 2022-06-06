import Queue            from '../utilities/Queue';
import TrelloWebhook    from '../types/trelloWebhook'
import webhookFunctions from './webhook';

import { ALLOWED_TRANSLATION_KEYS, ALLOWED_TYPES } from '../constants/allowedTrelloAction'

const { TRELLO_ID_MEMBER_BOT } = process.env;

export default class TrelloWebhookHandler {
    private static _instance: TrelloWebhookHandler;

    private readonly _responseQueue = new Queue<TrelloWebhook>();
    private _intervalObj!: NodeJS.Timer;

    private constructor() {
        this.startCheckQueueInterval();
    }

    public static get instance(): TrelloWebhookHandler {
        if (!this._instance) {
            this._instance = new TrelloWebhookHandler();
        }

        return this._instance;
    }

    public get responseQueue(): Queue<TrelloWebhook> {
        return this._responseQueue;
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
        if (action.type === 'updateCard' &&
            !ALLOWED_TRANSLATION_KEYS.includes(action.display.translationKey)) {
            return false;
        }

        return true;
    }

    private startCheckQueueInterval() {
        this._intervalObj = setInterval(() => {
            if (this._responseQueue.size === 0) return;

            this.execQueuedResponse();
            clearInterval(this._intervalObj);
        }, 5000);
    }

    private async execQueuedResponse() {
        while (this._responseQueue.size > 0) {
            const data = this._responseQueue.dequeue();

            if (!data) continue;

            await webhookFunctions(data);
        }

        this.startCheckQueueInterval();
    }
}

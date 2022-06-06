import TrelloWebhook from '../../types/trelloWebhook'

export type ActionFunction = (data: TrelloWebhook) => void;

const actionFunctions: { [actionName: string]: ActionFunction } = {};

/**
 * 指定のレスポンスデータに対応する処理を行う
 * @param data ウェブフックレスポンスデータ
 */
const webhookFunctions = async (data: TrelloWebhook) => {
    const actionType = data.action.type;

    // actionTypeに対応する関数が読み込まれていなければimport
    if (!(actionType in actionFunctions)) {
        try {
            actionFunctions[actionType] = (await import(`./functions/${actionType}`)).default;
        } catch (e) {
            if (e instanceof Error) {
                console.log(e);
            }
        }
    }

    if (actionType in actionFunctions) {
        actionFunctions[actionType](data);
    }
}

export default webhookFunctions;

type TrelloWebhook = {
    model: {
        id: string;
        name: string;
        desc: string;
        descData: any;
        closed: boolean;
        idOrganization: string;
        idEnterprise: string | null;
        pinned: boolean;
        url: string;
        shortUrl: string;
        prefs: {
            permissionLevel: string;
            hideVotes: boolean;
            voting: string;
            comments: string;
            invitations: string;
            selfJoin: boolean;
            cardCovers: boolean;
            isTemplate: boolean;
            cardAging: string;
            calendarFeedEnabled: boolean;
            hiddenPluginBoardButtons: [];
            background: string;
            backgroundColor: string | null;
            backgroundImage: string;
            backgroundImageScaled: [];
            backgroundTile: boolean;
            backgroundBrightness: string;
            backgroundBottomColor: string;
            backgroundTopColor: string;
            canBePublic: boolean;
            canBeEnterprise: boolean;
            canBeOrg: boolean;
            canBePrivate: boolean;
            canInvite: boolean;
        };
        labelNames: {
            green: string;
            yellow: string;
            orange: string;
            red: string;
            purple: string;
            blue: string;
            sky: string;
            lime: string;
            pink: string;
            black: string;
        };
    };
    action: {
        id: string;
        idMemberCreator: string;
        data: {
            card?: {
                id: string;
                name: string;
                idShort: number;
                shortLink: string;
            };
            old?: any;
            board?: {
                id: string;
                name: string;
                shortLink: string;
            };
            list?: {
                id: string;
                name: string;
            }
        };
        appCreator: any | null;
        type: string;
        date: string;
        limits: any | null;
        display: {
            translationKey: string;
            entities: any;
        };
        memberCreator: {
            id: string;
            activityBlocked: boolean;
            avatarHash: string;
            avatarUrl: string;
            fullName: string;
            idMemberReferrer: string;
            initials: string;
            nonPublic: {};
            nonPublicAvailable: boolean;
            username: string;
        };
    };
};

export default TrelloWebhook;

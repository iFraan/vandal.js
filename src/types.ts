export type BaseOptions = {
    raw?: boolean;
};


type TrackerPlatformInfo = {
    platformSlug: string;
    platformUserId: string;
    platformUserHandle: string;
    platformUserIdentifier: string;
    avatarUrl: string;
    additionalParameters: unknown | null;
};

type TrackerUserInfo = {
    userId: unknown;
    isPremium: boolean;
    isVerified: boolean;
    isInfluencer: boolean;
    isPartner: boolean;
    countryCode: string | null;
    customAvatarUrl: string | null;
    customHeroUrl: string | null;
    customAvatarFrame: unknown;
    customAvatarFrameInfo: unknown;
    premiumDuration: unknown;
    socialAccounts: unknown[];
    pageviews: number;
    xpTier: unknown;
    isSuspicious: boolean | null;
};

type TrackerMetadata = {
    activeShard: string;
    schema: string;
    privacy: string;
    defaultPlaylist: string;
    defaultSeason: string;
    premierRosterId: string | null;
    premierCrests: unknown | null;
    accountLevel: number;
};

export type TrackerResponse = {
    data: {
        platformInfo: TrackerPlatformInfo;
        userInfo: TrackerUserInfo;
        metadata: TrackerMetadata;
        segments: any[];
        availableSegments: any[];
    };
};

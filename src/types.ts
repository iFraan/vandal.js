export type BaseOptions = {
    raw?: boolean;
};


type PlatformInfo = {
    platformSlug: string;
    platformUserId: string;
    platformUserHandle: string;
    platformUserIdentifier: string;
    avatarUrl: string;
    additionalParameters: unknown | null;
};

type UserInfo = {
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

export type TrackerResponse = {
    data: {
        platformInfo: PlatformInfo;
        userInfo: UserInfo;
        metadata: any;
        segments: any[];
        availableSegments: any[];
    };
};

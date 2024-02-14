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

type SegmentStat = {
    rank: unknown | null;
    percentile: unknown | null;
    displayName: string;
    displayCategory: string;
    category: string;
    description: unknown | null;
    metadata: {};
    value: number | string;
    displayValue: string;
    displayType: string;
};

type Segments = {
    type: 'season' | 'agent' | 'agent-role';
    attributes: {
        playlist: string;
        seasonId: string;
        key?: string | null;
    };
    metadata: {
        name: string;
        shortName: string;
        playlistName: string;
        startTime: string;
        endTime: string;
        schemav2: string;
    };
    stats: {};
    expiryDate: string;
};

export type TrackerResponse = {
    data: {
        platformInfo: TrackerPlatformInfo;
        userInfo: TrackerUserInfo;
        metadata: TrackerMetadata;
        segments: Segments[];
        availableSegments: any[];
        expiryDate: string;
    };
};

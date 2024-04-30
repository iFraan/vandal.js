import { BaseOptions, SegmentSeasonStats, TrackerResponse } from './types/tracker';
import { AgentStats, GamemodesStats, SeasonStats, UserInfo } from './types/internal';

const BASE_URL = `https://api.tracker.gg/api/v2/valorant/standard/profile/riot/{USERNAME}%23{TAG}`;

const fetchData = (url: string) =>
    new Promise((resolve, reject) => {
        fetch(url).then(res => res.json()).then(resolve).catch(reject);
    });

class API {
    username: string;
    tag: string;
    _raw: TrackerResponse;

    constructor(username: string, tag: string) {
        this.username = username;
        this.tag = tag;
    }

    static async fetchUser(username: string, tag: string) {
        const api = new API(username, tag);
        api._raw = (await fetchData(BASE_URL.replace('{TAG}', tag).replace('{USERNAME}', username))) as TrackerResponse;
        if (api._raw.errors) throw new Error(api._raw.errors[0].message);
        return api;
    }

    ranked(options: BaseOptions = {}) {
        const result = {} as SeasonStats;
        const raw = options.raw ?? false;
        const data = this._raw.data.segments.find((x) => x.attributes?.playlist == 'competitive');
        if (raw) {
            result._raw = data;
        }
        if (data?.stats) {
            for (const key in data.stats) {
                result[key] = data.stats[key].value;
            }
        }
        return result;
    }

    unrated(options: BaseOptions = {}) {
        const result = {} as SeasonStats;
        const raw = options.raw ?? false;
        const data = this._raw.data.segments.find((x) => x.attributes?.playlist == 'unrated');
        if (raw) {
            result._raw = data;
        }
        if (data?.stats) {
            for (const key in data.stats) {
                result[key] = data.stats[key].value;
            }
        }
        return result;
    }

    gamemodes() {
        const result = {} as GamemodesStats;
        const playlists = this._raw.data.segments.filter((x) => x.type === 'season');

        for (const playlist of playlists) {
            const playlistName = playlist.metadata.playlistName;
            result[playlistName] = {} as SeasonStats;
            if (playlist) {
                for (const key in playlist.stats) {
                    result[playlistName][key] = playlist.stats[key].value;
                }
            }
        }

        return result;
    }

    agents() {
        const result = {} as AgentStats;
        const agents = this._raw.data.segments.filter((x) => x.type === 'agent');

        for (const playlist of agents) {
            result[playlist.metadata.name] = {};
            if (playlist) {
                for (const key in playlist.stats) {
                    result[playlist.metadata.name][key] = playlist.stats[key].value;
                }
            }
        }

        return result;
    }

    info() {
        const platform = this._raw.data.platformInfo;
        const info = this._raw.data.userInfo;
        const data = this._raw.data.segments.find((x) => x.attributes?.playlist == 'competitive');
        const stats = data.stats as SegmentSeasonStats;

        const result: UserInfo = {
            platform: platform.platformSlug,
            uuid: platform.platformUserId,
            name: platform.platformUserHandle,
            userid: platform.platformUserIdentifier,
            avatar: platform.avatarUrl,
            pageViews: info.pageviews,
            rank: stats?.rank.metadata.tierName,
            peakRank: stats?.peakRank.metadata.tierName,
        };

        return result;
    }

    raw() {
        return this._raw;
    }
}

export {
    API as VAPI, // compability
    API,
};
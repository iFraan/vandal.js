import { exec } from 'child_process';
import { Segments, SegmentSeasonStats, TrackerResponse } from './types/tracker';
import { AgentStats, GamemodesStats, SeasonStats, UserInfo, BaseOptions, FetchOptions } from './types/internal';

const BASE_URL = `https://api.tracker.gg/api/v2/valorant/standard/profile/riot/{USERNAME}%23{TAG}`;
const SEGMENT_URL = `https://api.tracker.gg/api/v2/valorant/standard/profile/riot/{USERNAME}%23{TAG}/segments/season?playlist={PLAYLIST}&seasonId={SEASON_ID}&source=web`;

const fetchData = (url: string) =>
    new Promise((resolve, reject) => {
        exec(`curl --max-time 5 --user-agent 'Chrome/121' --url ${url}`, (err, result) => {
            if (!result) {
                reject(err);
            }
            resolve(JSON.parse(result));
        });
    });

class API {
    username: string;
    tag: string;
    _raw: TrackerResponse;

    constructor(username: string, tag: string) {
        this.username = username;
        this.tag = tag;
    }

    static async fetchUser(username: string, tag: string, options: FetchOptions = {}) {
        const api = new API(username, tag);
        api._raw = (await fetchData(BASE_URL.replace('{TAG}', tag).replace('{USERNAME}', username))) as TrackerResponse;

        if (options.fetchGamemodes) {
            const seasonId = api._raw.data.metadata.seasons[0].id ?? api._raw.data.metadata.defaultSeason;
            const playlists = api._raw.data.metadata.playlists;
            for (const playlist of playlists) {
                const segment = (await fetchData(SEGMENT_URL
                    .replace('{TAG}', tag).replace('{USERNAME}', username)
                    .replace('{PLAYLIST}', playlist.id)
                    .replace('{SEASON_ID}', seasonId)
                )) as { data?: Segments[], errors: unknown[] };
                segment.data && api._raw.data.segments.push(...segment.data);
            }
        }

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
import { exec } from 'child_process';
import { BaseOptions } from './types';

const BASE_URL = `https://api.tracker.gg/api/v2/valorant/standard/profile/riot/{USERNAME}%23{TAG}`;

const fetchData = (url) =>
    new Promise((resolve, reject) => {
        exec(`curl --max-time 5 --user-agent 'Chrome/121' --url ${url}`, (err, result, stderr) => {
            if (!result) {
                reject(err);
            }
            resolve(JSON.parse(result));
        });
    });

class API {
    username: string;
    tag: string;
    _raw: any;

    constructor(username: string, tag: string) {
        this.username = username;
        this.tag = tag;
    }

    static async fetchUser(username: string, tag: string) {
        const api = new API(username, tag);
        api._raw = await fetchData(BASE_URL.replace('{TAG}', tag).replace('{USERNAME}', username));
        if (api._raw.errors) throw new Error(api._raw.errors[0].message);
        return api;
    }

    ranked(options: BaseOptions = {}) {
        const result = {};
        const raw = options.raw || false;
        const data = this._raw.data.segments.find((x) => x.attributes?.playlist == 'competitive');
        if (raw) {
            result._raw = data;
        }
        if (data?.stats) {
            for (const key of Object.keys(data.stats)) {
                result[key] = data.stats[key].value;
            }
        }
        return result;
    }

    unrated(options: BaseOptions = {}) {
        const result = {};
        const raw = options.raw || false;
        const data = this._raw.data.segments.find((x) => x.attributes?.playlist == 'unrated');
        if (raw) {
            result._raw = data;
        }
        if (data?.stats) {
            for (const key of Object.keys(data.stats)) {
                result[key] = data.stats[key].value;
            }
        }
        return result;
    }

    gamemodes() {
        const result = {};
        const playlists = this._raw.data.segments.filter((x) => x.type === 'season');

        for (const playlist of playlists) {
            result[playlist.metadata.playlistName] = {};
            if (playlist) {
                for (const key of Object.keys(playlist.stats)) {
                    result[playlist.metadata.playlistName][key] = playlist.stats[key].value;
                }
            }
        }

        return result;
    }

    agents() {
        const result = {};
        const agents = this._raw.data.segments.filter((x) => x.type === 'agent');

        for (const playlist of agents) {
            result[playlist.metadata.name] = {};
            if (playlist) {
                for (const key of Object.keys(playlist.stats)) {
                    result[playlist.metadata.name][key] = playlist.stats[key].value;
                }
            }
        }

        return result;
    }

    info() {
        const result = {};
        const platform = this._raw.data.platformInfo;
        const info = this._raw.data.userInfo;
        const data = this._raw.data.segments.find((x) => x.attributes?.playlist == 'competitive');

        result['platform'] = platform.platformSlug;
        result['uuid'] = platform.platformUserId;
        result['name'] = platform.platformUserHandle;
        result['userid'] = platform.platformUserIdentifier;
        result['avatar'] = platform.avatarUrl;
        result['pageViews'] = info.pageviews;
        result['rank'] = data?.stats?.rank.metadata.tierName;
        result['peakRank'] = data?.stats?.peakRank.metadata.tierName;

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
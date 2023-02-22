const { exec } = require('child_process');

const baseUrl = `https://api.tracker.gg/api/v2/valorant/standard/profile/riot/{USERNAME}%23{TAG}`

const fetch = (url) => new Promise((resolve, reject) => {
    exec(`curl --max-time 5 --user-agent 'Chrome/105' --url ${url}`, (err, result, stderr) => {
        if (!result) {
            reject(err)
        }
        resolve(JSON.parse(result))
    })

})

class API {
    /**
     * Use VAP.fetchUser instead.
     * @param {string} username 
     * @param {string} tag 
     * @private // idk if it does something outside of typescript, but there it is
     */
    constructor(username, tag) {
        this.username = username;
        this.tag = tag;
    }


    /**
     * Initialize the wrapper
     * @param {string} username 
     * @param {string} tag 
     * @returns API instance
     */
    static async fetchUser(username, tag) {
        const api = new API(username, tag)
        api._raw = await fetch(baseUrl.replace('{TAG}', tag).replace('{USERNAME}', username))
        if (api._raw.errors) throw new Error(api._raw.errors[0].message)
        return api;
    }


    /**
     * Ranked
     * @param {boolean?} options.raw raw data
     * @returns Ranked stats of the player
     */
    ranked(options = {}) {
        const result = {}
        const raw = options.raw || false;
        const data = this._raw.data.segments.find(x => x.attributes?.playlist == 'competitive');
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
    /**
     * Un-rated
     * @param {boolean?} options.raw raw data
     * @returns Un-rated stats of the player
     */
    unrated(options = {}) {
        const result = {}
        const raw = options.raw || false;
        const data = this._raw.data.segments.find(x => x.attributes?.playlist == 'unrated');
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


    /**
     * Get stats for all gamemodes
     * @returns Formated json of all available playlists stats
     */
    gamemodes() {
        const result = {};
        const playlists = this._raw.data.segments.filter(x => x.type === 'season');

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

    /**
     * Get stats for played agents
     * @returns Formated json of all available agents stats
     */
    agents() {
        const result = {};
        const agents = this._raw.data.segments.filter(x => x.type === 'agent');

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


    /**
     * Get userinfo from the platform
     * @returns userinfo
     */
    info() {
        const result = {};
        const platform = this._raw.data.platformInfo;
        const info = this._raw.data.userInfo;
        const data = this._raw.data.segments.find(x => x.attributes?.playlist == 'competitive');

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

    get raw() { return this._raw; }
}

module.exports = {
    VAPI: API, // compability
    API,
}
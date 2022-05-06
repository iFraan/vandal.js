const { exec } = require('child_process');

const baseUrl = `https://api.tracker.gg/api/v2/valorant/standard/profile/riot/{USERNAME}%23{TAG}`

const fetch = (url) => new Promise((resolve, reject) => {
    exec(`curl --max-time 5 --user-agent 'Chrome/79' --url ${url}`, (err, result, stderr) => {
        if (!result) {
            reject(err)
        }
        resolve(JSON.parse(result))
    })

})


class VAPI {
    /**
     * Use VAP.fetchUser instead.
     * @param {string} username 
     * @param {string} tag 
     * @private // idk if it does something outside of typescript, but there it is
     */
    constructor (username, tag){
        this.username = username;
        this.tag = tag;
    }


    /**
     * Initialize the wrapper
     * @param {string} username 
     * @param {string} tag 
     * @returns VAPI instance
     */
    static async fetchUser(username, tag){
        const API = new VAPI(username, tag)
        API._raw = await fetch(baseUrl.replace('{TAG}', tag).replace('{USERNAME}', username))
        if (API._raw.errors) throw new Error(API._raw.errors[0].message)
        return API;
    }


    /**
     * Ranked
     * @param {boolean?} options.raw raw data
     * @returns Ranked stats of the player
     */
    ranked(options = {}){
        const result = {}
        const raw   = options.raw || false;
        const data  = this._raw.data.segments.find(x => x.attributes?.key == 'competitive' && x.type == 'playlist');
        if (raw)    result._raw = data;
        const keys = Object.keys(data.stats)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            result[key] = data.stats[key].value;
        }
        return result;
    }
    /**
     * Un-rated
     * @param {boolean?} options.raw raw data
     * @returns Un-rated stats of the player
     */
    unrated(options = {}){
        const result = {}
        const raw   = options.raw || false;
        const data  = this._raw.data.segments.find(x => x.attributes?.key == 'unrated' && x.type == 'playlist');
        if (raw)    result._raw = data;
        const keys = Object.keys(data.stats)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            result[key] = data.stats[key].value;
        }
        return result;
    }


    /**
     * Get stats for all gamemodes
     * @returns Formated json of all available playlists stats
     */
    gamemodes() { 
        const result = {};
        const playlists = this._raw.data.segments.filter(x => x.type === 'playlist');
        for (let i = 0 ; i < playlists.length ; i++) {
            const p = playlists[i]
            if (p) {
                const keys = Object.keys(p.stats)
                result[p.attributes.key] = {}
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    result[p.attributes.key][key] = p.stats[key].value;
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
        for (let i = 0 ; i < agents.length ; i++) {
            const p = agents[i]
            if (p) {
                const keys = Object.keys(p.stats)
                result[p.metadata.name] = {}
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    result[p.metadata.name][key] = p.stats[key].value;
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
        const data     = this._raw.data.segments.find(x => x.attributes?.key == 'competitive' && x.type == 'playlist');

        result['platform']  = platform.platformSlug; 
        result['uuid']      = platform.platformUserId; 
        result['name']      = platform.platformUserHandle;
        result['userid']    = platform.platformUserIdentifier;
        result['avatar']    = platform.avatarUrl;
        result['rank']      = data.stats.rank.displayValue;
        result['peakRank']  = data.stats.peakRank.displayValue;

        return result;
    }

    get raw() { return this._raw; }
}

module.exports = {
    VAPI
}
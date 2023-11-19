const { VAPI } = require('./index')

m = async () => {

    try {
        const user = await VAPI.fetchUser('iFraan_', 'G4G')
        console.log('User:', user.info())
        console.log('Ranked:', user.ranked())
        console.log('Unrated: ', user.unrated())
        console.log('Agents: ', user.agents())
        console.log('ALL GAMEMODES (including deathmatch, spike-rush, etc) ', user.gamemodes())
        console.log('Raw: ', user.raw());
    } catch (e) {
        console.log(e)
    }

}

m()
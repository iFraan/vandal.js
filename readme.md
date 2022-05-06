# Vandal.js
## This a wrapper/scrapper of the TRNetwork site with **Valorant** stats.

There are no dependencies nor API key required.

To install use:
```shell
npm i vandal.js
```
You must call **VAPI.fetchUser** before using any other method.
| Methods | Description |
| - | - |
| info | user and mmr info |
| ranked | ranked stats |
| unrated | unrated stats |
| gamemodes | stats for all queues |
| agents | stats for all played agents |

Example code: _(Feel free to use my riot username for testing)_
```js
const { VAPI } = require('vandal.js')

try {

	const user = await VAPI.fetchUser('iFraan_', 'G4G')
	
	console.log('User:', user.info())
	/*
	User: {
		platform: 'riot',
		uuid: 'bc4b1936-febc-4c4d-96e6-84b4ceae1197',
		name: 'iFraan#G4G',
		userid: 'iFraan#G4G',
		avatar: 'https://titles.trackercdn.com/valorant-api/playercards/d29e6e34-44bd-21c8-f7bb-b0a73f267e50/displayicon.png',
		rank: 'Silver 1',
		peakRank: 'Platinum 3'
	}
	*/

	console.log('Ranked:', user.ranked())
	/*
	Ranked: {
		timePlayed: 162654267,
		matchesPlayed: 80,
		matchesWon: 32,
		matchesLost: 48,
		matchesWinPct: 40,
		matchesDuration: 2033178,
		roundsPlayed: 1639,
		roundsWon: 760,
		roundsLost: 890,
		roundsWinPct: 46.37,
		roundsDuration: 99240,
		econRating: 4593,
		econRatingPerMatch: 57.41,
		econRatingPerRound: 2.8,
		score: 369782,
		scorePerMatch: 4622.28,
		scorePerRound: 225.61,
		kills: 1260,
		killsPerRound: 0.77,
		killsPerMatch: 15.75,
		killsPerMinute: 0,
		headshots: 664,
		headshotsPerRound: 0.41,
		headshotsPerMatch: 8.3,
		headshotsPerMinute: 0,
		headshotsPercentage: 17.62340853249944,
		deaths: 1237,
		deathsPerRound: 0.75,
		deathsPerMatch: 15.46,
		deathsPerMinute: 0,
		assists: 362,
		assistsPerMatch: 4.53,
		assistsPerRound: 0.22,
		assistsPerMinute: 0,
		kDRatio: 1.02,
		kDARatio: 1.1649151172190784,
		kADRatio: 1.3112368633791431,
		damage: 234328,
		damagePerMatch: 2929.1,
		damagePerRound: 142.97,
		damagePerMinute: 86,
		damageReceived: 226421,
		plants: 64,
		plantsPerMatch: 0.8,
		plantsPerRound: 0.04,
		defuses: 44,
		defusesPerMatch: 0.55,
		defusesPerRound: 0.03,
		firstBloods: 181,
		firstBloodsPerMatch: 2.26,
		grenadeCasts: 509,
		ability1Casts: 645,
		ability2Casts: 1171,
		ultimateCasts: 137,
		dealtHeadshots: 789,
		dealtBodyshots: 3241,
		dealtLegshots: 447,
		receivedHeadshots: 702,
		receivedBodyshots: 3581,
		receivedLegshots: 451,
		deathsFirst: 177,
		deathsLast: 190,
		mostKillsInMatch: 33,
		mostKillsInRound: 5,
		flawless: 64,
		clutches: 97,
		thrifty: 0,
		aces: 1,
		teamAces: 2,
		attackKDRatio: 0.96,
		attackKills: 600,
		attackDeaths: 624,
		attackAssists: 165,
		attackRoundsPlayed: 815,
		attackRoundsWon: 458,
		attackRoundsLost: 357,
		attackRoundsWinPct: 56.2,
		defenseKDRatio: 1.14,
		defenseKills: 664,
		defenseDeaths: 584,
		defenseAssists: 193,
		defenseRoundsPlayed: 835,
		defenseRoundsWon: 432,
		defenseRoundsLost: 403,
		defenseRoundsWinPct: 51.74,
		rank: null,
		peakRank: null
	}
	*/

	console.log('Unrated: ', user.unrated())
	/*
	Unrated:  {
		timePlayed: 110172811,
		matchesPlayed: 58,
		matchesWon: 27,
		matchesLost: 31,
		matchesWinPct: 46.55,
		matchesDuration: 1899531,
		roundsPlayed: 1109,
		roundsWon: 574,
		roundsLost: 584,
		roundsWinPct: 51.76,
		roundsDuration: 99344,
		econRating: 4573,
		econRatingPerMatch: 78.84,
		econRatingPerRound: 4.12,
		score: 324754,
		scorePerMatch: 5599.21,
		scorePerRound: 292.83,
		kills: 1116,
		killsPerRound: 1.01,
		killsPerMatch: 19.24,
		killsPerMinute: 0,
		headshots: 638,
		headshotsPerRound: 0.58,
		headshotsPerMatch: 11,
		headshotsPerMinute: 0,
		headshotsPercentage: 18.826597131681876,
		deaths: 793,
		deathsPerRound: 0.72,
		deathsPerMatch: 13.67,
		deathsPerMinute: 0,
		assists: 218,
		assistsPerMatch: 3.76,
		assistsPerRound: 0.2,
		assistsPerMinute: 0,
		kDRatio: 1.41,
		kDARatio: 1.544766708701135,
		kADRatio: 1.6822194199243379,
		damage: 207504,
		damagePerMatch: 3577.66,
		damagePerRound: 187.11,
		damagePerMinute: 113,
		damageReceived: 156356,
		plants: 30,
		plantsPerMatch: 0.52,
		plantsPerRound: 0.03,
		defuses: 30,
		defusesPerMatch: 0.52,
		defusesPerRound: 0.03,
		firstBloods: 179,
		firstBloodsPerMatch: 3.09,
		grenadeCasts: 340,
		ability1Casts: 413,
		ability2Casts: 757,
		ultimateCasts: 96,
		dealtHeadshots: 722,
		dealtBodyshots: 2705,
		dealtLegshots: 408,
		receivedHeadshots: 451,
		receivedBodyshots: 2534,
		receivedLegshots: 420,
		deathsFirst: 107,
		deathsLast: 142,
		mostKillsInMatch: 39,
		mostKillsInRound: 5,
		flawless: 92,
		clutches: 68,
		thrifty: 0,
		aces: 3,
		teamAces: 0,
		attackKDRatio: 1.49,
		attackKills: 598,
		attackDeaths: 401,
		attackAssists: 99,
		attackRoundsPlayed: 576,
		attackRoundsWon: 297,
		attackRoundsLost: 279,
		attackRoundsWinPct: 51.56,
		defenseKDRatio: 1.39,
		defenseKills: 518,
		defenseDeaths: 372,
		defenseAssists: 117,
		defenseRoundsPlayed: 582,
		defenseRoundsWon: 287,
		defenseRoundsLost: 295,
		defenseRoundsWinPct: 49.31
	}
	*/
	console.log('ALL GAMEMODES (including deathmatch, spike-rush, etc) ', user.gamemodes())
	/* 
	ALL GAMEMODES (including deathmatch, spike-rush, etc)  {
		competitive: {
			timePlayed: 162654267,
			matchesPlayed: 80,
			matchesWon: 32,
			...	
		},
		deathmatch: {
			timePlayed: 13160672,
			matchesPlayed: 30,
			matchesWon: 4,
			...	
		},
		escalation: {
			timePlayed: 943011,
			matchesPlayed: 2,
			matchesWon: 0,
			...
		},
		spikerush: {
			timePlayed: 3577956,
			matchesPlayed: 7,
			matchesWon: 6,
			...
		},
		unrated: {
			timePlayed: 110172811,
			matchesPlayed: 58,
			matchesWon: 27,
			...
    	}
	}
	*/

	console.log('Agents: ', user.agents())
	/*
	Agents:  {
		Killjoy: {
			timePlayed: 1904406,
			matchesPlayed: 1,
			matchesWon: 0,
			matchesLost: 1,
			matchesWinPct: 0,
			matchesDuration: 1904406,
			roundsPlayed: 19,
			roundsWon: 6,
			roundsLost: 13,
			roundsWinPct: 31.57894736842105,
			roundsDuration: 100231,
			econRating: 45,
			econRatingPerMatch: 45,
			econRatingPerRound: 2.3684210526315788,
			score: 3456,
			scorePerMatch: 3456,
			scorePerRound: 181.89473684210526,
			kills: 12,
			killsPerRound: 0.631578947368421,
			killsPerMatch: 12,
			killsPerMinute: 0.3870967741935484,
			headshots: 4,
			headshotsPerRound: 0.21052631578947367,
			headshotsPerMatch: 4,
			headshotsPerMinute: 0.12903225806451613,
			headshotsPercentage: 5.555555555555555,
			deaths: 16,
			deathsPerRound: 0.8421052631578947,
			deathsPerMatch: 16,
			deathsPerMinute: 0.5161290322580645,
			assists: 3,
			assistsPerMatch: 3,
			assistsPerRound: 0.15789473684210525,
			assistsPerMinute: 0.0967741935483871,
			kDRatio: 0.75,
			kDARatio: 0.8125,
			kADRatio: 0.9375,
			damage: 2071,
			damagePerMatch: 2071,
			damagePerRound: 109,
			damagePerMinute: 66.80645161290323,
			damageReceived: 2622,
			plants: 1,
			plantsPerMatch: 1,
			plantsPerRound: 0.05263157894736842,
			defuses: 0,
			defusesPerMatch: 0,
			defusesPerRound: 0,
			firstBloods: 1,
			firstBloodsPerMatch: 1,
			grenadeCasts: 16,
			grenadeCastsPerMatch: 16,
			grenadeCastsPerRound: 0,
			ability1Casts: 6,
			ability1CastsPerMatch: 6,
			ability1CastsPerRound: 0,
			ability2Casts: 12,
			ability2CastsPerMatch: 12,
			ability2CastsPerRound: 0,
			ultimateCasts: 3,
			ultimateCastsPerMatch: 3,
			ultimateCastsPerRound: 0,
			grenadeKills: 6,
			ability1Kills: 0,
			ability2Kills: 5,
			ultimateKills: 1,
			dealtHeadshots: 4,
			dealtBodyshots: 64,
			dealtLegshots: 4,
			receivedHeadshots: 9,
			receivedBodyshots: 42,
			receivedLegshots: 10,
			deathsFirst: 1,
			deathsLast: 6,
			mostKillsInMatch: 12,
			mostKillsInRound: 2,
			flawless: 1,
			clutches: 1,
			thrifty: 0,
			aces: 0,
			teamAces: 0,
			attackKDRatio: 0.625,
			attackKills: 5,
			attackDeaths: 8,
			attackAssists: 1,
			attackRoundsPlayed: 7,
			attackRoundsWon: 7,
			attackRoundsLost: 0,
			attackRoundsWinPct: 100,
			defenseKDRatio: 0.875,
			defenseKills: 7,
			defenseDeaths: 8,
			defenseAssists: 2,
			defenseRoundsPlayed: 12,
			defenseRoundsWon: 6,
			defenseRoundsLost: 6,
			defenseRoundsWinPct: 50,
			ability1KillsPerMatch: 0,
			ability2KillsPerMatch: 5,
			grenadeKillsPerMatch: 6,
			ultimateKillsPerMatch: 1
		},
		Sage: {
		  ...
		},
		Omen: {
		  ...
		},
		Jett: {
		  ...
		},
		Phoenix: {
		  ...
		},
		Raze: {
		  ...
		}
	}
	*/
} catch (e) {
	console.log(e)
	/* Error: We could not find the player [player]. */
}
```
<div align="center">
    <h1>vandal.js</h1>
    <a href="https://www.codefactor.io/repository/github/ifraan/vandal.js"><img src="https://www.codefactor.io/repository/github/ifraan/vandal.js/badge"    alt="CodeFactor" /></a>
    <a href="https://www.npmjs.com/package/vandal.js"><img src="https://badgen.net/npm/v/vandal.js?color=blue" alt="NPM-Version"/></a>
    <a href="https://www.npmjs.com/package/vandal.js"><img src="https://badgen.net/npm/dt/vandal.js?color=blue" alt="NPM-Downloads"/></a>
    <a href="https://github.com/iFraan/vandal.js"><img src="https://badgen.net/github/stars/iFraan/vandal.js?color=yellow" alt="Github Stars"/></a>
    <a href="https://github.com/iFraan/vandal.js/issues"><img src="https://badgen.net/github/open-issues/iFraan/vandal.js?color=green" alt="Issues"/></a>
    <h2>This a wrapper/scrapper of the TRNetwork site with <b>Valorant</b> stats.</h2>
    <h3>There are no dependencies nor API key required.</h3>
</div>

## Requirements

* This requires Node v16+ to work.

## Instalation

### To install use:
```shell
npm i vandal.js
```

## Usage

There is only one static function that takes the username and the tag, both required.

```js
/* returns an API class instance with the data already fetched */
await API.fetchUser(user, tag) // user#tag
```

> You must call **API.fetchUser** before using any other method.

| Methods   | Description                 |
| --------- | --------------------------- |
| info      | user and mmr info           |
| ranked    | ranked stats                |
| unrated   | unrated stats               |
| agents    | stats for all played agents |
| gamemodes | stats for all queues        |
| raw       | return raw response         |


## Example code
_Feel free to use my riot username for testing_
```js
const { API } = require('vandal.js')

try {

    const user = await API.fetchUser('iFraan_', 'G4G')

    console.log('User:', user.info())
    /*
    User: {
        platform: 'riot',
        uuid: 'bc4b1936-febc-4c4d-96e6-84b4ceae1197',
        name: 'iFraan#G4G',
        userid: 'iFraan#G4G',
        avatar: 'https://titles.trackercdn.com/valorant-api/playercards/d29e6e34-44bd-21c8-f7bb-b0a73f267e50/displayicon.png',
        pageViews: 99,
        rank: 'Gold 2',
        peakRank: 'Diamond 1'
    }
    */

    console.log('Ranked:', user.ranked())
    /*
    Ranked: {
        matchesPlayed: 22,
        matchesWon: 11,
        matchesLost: 11,
        matchesTied: 0,
        matchesWinPct: 50,
        matchesDuration: 2077.090909090909,
        timePlayed: 45696,
        roundsPlayed: 468,
        roundsWon: 220,
        roundsLost: 248,
        roundsWinPct: 47.008547008547005,
        roundsDuration: 97.64102564102564,
        score: 113621,
        scorePerMatch: 5164.590909090909,
        scorePerRound: 242.77991452991452,
        kills: 390,
        killsPerRound: 0.8333333333333334,
        killsPerMatch: 17.727272727272727,
        deaths: 368,
        deathsPerRound: 0.7863247863247863,
        deathsPerMatch: 16.727272727272727,
        assists: 146,
        assistsPerRound: 0.31196581196581197,
        assistsPerMatch: 6.636363636363637,
        kDRatio: 1.059782608695652,
        kDARatio: 1.4565217391304348,
        kADRatio: 1.4565217391304348,
        damage: 74307,
        damageDelta: 7144,
        damageDeltaPerRound: 15.264957264957266,
        damagePerRound: 158.77564102564102,
        damagePerMatch: 3377.590909090909,
        damagePerMinute: 97.64388961892247,
        damageReceived: 67163,
        headshots: 266,
        headshotsPerRound: 0.5683760683760684,
        headshotsPercentage: 26.347826086956523,
        grenadeCasts: 146,
        grenadeCastsPerRound: 0.31196581196581197,
        grenadeCastsPerMatch: 6.636363636363637,
        ability1Casts: 294,
        ability1CastsPerRound: 0.6282051282051282,
        ability1CastsPerMatch: 13.363636363636363,
        ability2Casts: 345,
        ability2CastsPerRound: 0.7371794871794872,
        ability2CastsPerMatch: 15.681818181818182,
        ultimateCasts: 38,
        ultimateCastsPerRound: 0.0811965811965812,
        ultimateCastsPerMatch: 1.7272727272727273,
        dealtHeadshots: 303,
        dealtBodyshots: 774,
        dealtLegshots: 73,
        receivedHeadshots: 235,
        receivedBodyshots: 1014,
        receivedLegshots: 80,
        econRating: 1351,
        econRatingPerMatch: 61.40909090909091,
        econRatingPerRound: 2.8867521367521367,
        suicides: 0,
        firstBloods: 70,
        firstBloodsPerRound: 0.14957264957264957,
        firstBloodsPerMatch: 3.1818181818181817,
        firstDeaths: 51,
        firstDeathsPerRound: 0.10897435897435898,
        lastDeaths: 57,
        survived: 105,
        traded: 67,
        kAST: 70.09,
        mostKillsInMatch: 40,
        flawless: 17,
        thrifty: 0,
        aces: 2,
        teamAces: 1,
        clutches: 10,
        clutchesPercentage: 2.1367521367521367,
        clutchesLost: 53,
        clutches1v1: 5,
        clutches1v2: 4,
        clutches1v3: 1,
        clutches1v4: 0,
        clutches1v5: 0,
        clutchesLost1v1: 6,
        clutchesLost1v2: 10,
        clutchesLost1v3: 17,
        clutchesLost1v4: 13,
        clutchesLost1v5: 7,
        kills1K: 142,
        kills2K: 64,
        kills3K: 26,
        kills4K: 8,
        kills5K: 2,
        kills6K: 0,
        plants: 35,
        plantsPerMatch: 1.5909090909090908,
        plantsPerRound: 0.14285714285714285,
        attackKills: 209,
        attackKillsPerRound: 0.8530612244897959,
        attackDeaths: 193,
        attackKDRatio: 1.0829015544041452,
        attackAssists: 71,
        attackAssistsPerRound: 0.2897959183673469,
        attackRoundsWon: 119,
        attackRoundsLost: 126,
        attackRoundsPlayed: 245,
        attackRoundsWinPct: 48.57142857142857,
        attackScore: 61658,
        attackScorePerRound: 251.66530612244898,
        attackDamage: 41068,
        attackDamagePerRound: 167.62448979591838,
        attackHeadshots: 148,
        attackTraded: 35,
        attackSurvived: 56,
        attackFirstBloods: 34,
        attackFirstBloodsPerRound: 0.13877551020408163,
        attackFirstDeaths: 22,
        attackFirstDeathsPerRound: 0.08979591836734693,
        attackKAST: 68.16,
        defuses: 8,
        defusesPerMatch: 0.36363636363636365,
        defusesPerRound: 0.03587443946188341,
        defenseKills: 181,
        defenseKillsPerRound: 0.8116591928251121,
        defenseDeaths: 175,
        defenseKDRatio: 1.0342857142857143,
        defenseAssists: 74,
        defenseAssistsPerRound: 0.33183856502242154,
        defenseRoundsWon: 101,
        defenseRoundsLost: 122,
        defenseRoundsPlayed: 223,
        defenseRoundsWinPct: 45.2914798206278,
        defenseScore: 51963,
        defenseScorePerRound: 233.01793721973095,
        defenseDamage: 33239,
        defenseDamagePerRound: 149.05381165919283,
        defenseHeadshots: 118,
        defenseTraded: 32,
        defenseSurvived: 49,
        defenseFirstBloods: 36,
        defenseFirstBloodsPerRound: 0.16143497757847533,
        defenseFirstDeaths: 29,
        defenseFirstDeathsPerRound: 0.13004484304932734,
        defenseKAST: 70.4,
        rank: null,
        trnPerformanceScore: 631,
        peakRank: null
    }
    */

    console.log('Unrated: ', user.unrated())
    /*
    Unrated:  {
        matchesPlayed: 6,
        matchesWon: 3,
        matchesLost: 3,
        matchesTied: 0,
        matchesWinPct: 50,
        matchesDuration: 2354.8333333333335,
        timePlayed: 14129,
        roundsPlayed: 139,
        roundsWon: 72,
        roundsLost: 67,
        roundsWinPct: 51.798561151079134,
        roundsDuration: 101.64748201438849,
        score: 32810,
        scorePerMatch: 5468.333333333333,
        scorePerRound: 236.0431654676259,
        kills: 107,
        killsPerRound: 0.7697841726618705,
        killsPerMatch: 17.833333333333332,
        deaths: 102,
        deathsPerRound: 0.7338129496402878,
        deathsPerMatch: 17,
        assists: 41,
        assistsPerRound: 0.2949640287769784,
        assistsPerMatch: 6.833333333333333,
        kDRatio: 1.0490196078431373,
        kDARatio: 1.4509803921568627,
        kADRatio: 1.4509803921568627,
        damage: 21922,
        damageDelta: 1702,
        damageDeltaPerRound: 12.244604316546763,
        damagePerRound: 157.71223021582733,
        damagePerMatch: 3653.6666666666665,
        damagePerMinute: 93.28510638297873,
        damageReceived: 20220,
        headshots: 67,
        headshotsPerRound: 0.48201438848920863,
        headshotsPercentage: 18.660287081339714,
        grenadeCasts: 43,
        grenadeCastsPerRound: 0.30935251798561153,
        grenadeCastsPerMatch: 7.166666666666667,
        ability1Casts: 95,
        ability1CastsPerRound: 0.6834532374100719,
        ability1CastsPerMatch: 15.833333333333334,
        ability2Casts: 105,
        ability2CastsPerRound: 0.7553956834532374,
        ability2CastsPerMatch: 17.5,
        ultimateCasts: 9,
        ultimateCastsPerRound: 0.06474820143884892,
        ultimateCastsPerMatch: 1.5,
        dealtHeadshots: 78,
        dealtBodyshots: 318,
        dealtLegshots: 22,
        receivedHeadshots: 69,
        receivedBodyshots: 252,
        receivedLegshots: 28,
        econRating: 368,
        econRatingPerMatch: 61.333333333333336,
        econRatingPerRound: 2.647482014388489,
        suicides: 0,
        firstBloods: 12,
        firstBloodsPerRound: 0.08633093525179857,
        firstBloodsPerMatch: 2,
        firstDeaths: 23,
        firstDeathsPerRound: 0.16546762589928057,
        lastDeaths: 16,
        survived: 38,
        traded: 13,
        kAST: 69.06,
        mostKillsInMatch: 23,
        flawless: 9,
        thrifty: 0,
        aces: 0,
        teamAces: 0,
        clutches: 3,
        clutchesPercentage: 2.158273381294964,
        clutchesLost: 16,
        clutches1v1: 2,
        clutches1v2: 1,
        clutches1v3: 0,
        clutches1v4: 0,
        clutches1v5: 0,
        clutchesLost1v1: 0,
        clutchesLost1v2: 3,
        clutchesLost1v3: 6,
        clutchesLost1v4: 3,
        clutchesLost1v5: 4,
        kills1K: 32,
        kills2K: 24,
        kills3K: 9,
        kills4K: 0,
        kills5K: 0,
        kills6K: 0,
        plants: 9,
        plantsPerMatch: 1.5,
        plantsPerRound: 0.13043478260869565,
        attackKills: 64,
        attackKillsPerRound: 0.927536231884058,
        attackDeaths: 47,
        attackKDRatio: 1.3617021276595744,
        attackAssists: 15,
        attackAssistsPerRound: 0.21739130434782608,
        attackRoundsWon: 40,
        attackRoundsLost: 29,
        attackRoundsPlayed: 69,
        attackRoundsWinPct: 57.971014492753625,
        attackScore: 18135,
        attackScorePerRound: 262.82608695652175,
        attackDamage: 11559,
        attackDamagePerRound: 167.52173913043478,
        attackHeadshots: 34,
        attackTraded: 8,
        attackSurvived: 23,
        attackFirstBloods: 7,
        attackFirstBloodsPerRound: 0.10144927536231885,
        attackFirstDeaths: 10,
        attackFirstDeathsPerRound: 0.14492753623188406,
        attackKAST: 71.01,
        defuses: 3,
        defusesPerMatch: 0.5,
        defusesPerRound: 0.04285714285714286,
        defenseKills: 43,
        defenseKillsPerRound: 0.6142857142857143,
        defenseDeaths: 55,
        defenseKDRatio: 0.7818181818181819,
        defenseAssists: 26,
        defenseAssistsPerRound: 0.37142857142857144,
        defenseRoundsWon: 32,
        defenseRoundsLost: 38,
        defenseRoundsPlayed: 70,
        defenseRoundsWinPct: 45.714285714285715,
        defenseScore: 14675,
        defenseScorePerRound: 209.64285714285714,
        defenseDamage: 10363,
        defenseDamagePerRound: 148.04285714285714,
        defenseHeadshots: 33,
        defenseTraded: 5,
        defenseSurvived: 15,
        defenseFirstBloods: 5,
        defenseFirstBloodsPerRound: 0.07142857142857142,
        defenseFirstDeaths: 13,
        defenseFirstDeathsPerRound: 0.18571428571428572,
        defenseKAST: 62.86,
        peakRank: null
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


# Disclaimer
This project is fully for educational purposes and if you want to use the valorant api in a production/commertial enviroment you should ask for one at [Riot Developers](https://developer.riotgames.com/) or email the guys at [TRNetwork](https://tracker.gg/).
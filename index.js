const fetch = require("node-fetch")
async function apiFetch(apikey, path) {
    return fetch(`https://api.hypixel.net/${path}?key=${apikey}`, {
        method: "GET"
    })
        .then(response => response.json())
}
async function fetchMore(apikey, path, parameters) {
    let para = parameters.replace(/\s/g, "+")
    return fetch(`https://api.hypixel.net/${path}?key=${apikey}${para}`, {
        method: "GET"
    }).then(response => response.json())
}
function ensureParameters(parameter) {
    if (!parameter) throw "Please include a parameter!"
}
module.exports = class Hype {
    constructor(apikey) {
        this.apikey = apikey
    }
    //playerCount
    async getPlayerCount() {
        let playerCount = await apiFetch(this.apikey, "playerCount")
        return playerCount
    }
    //guild
    async getGuildIDByName(name) {
        ensureParameters(name)
        let guildID = await fetchMore(this.apikey, "findGuild", `&byName=${name}`)
        return guildID
    }
    async getGuildIDByUUID(UUID) {
        ensureParameters(UUID)
        let guildID = await fetchMore(this.apikey, "findGuild", `&byUuid=${UUID}`)
        return guildID
    }
    async getGuild(options) {
        ensureParameters(options)
        if (typeof options !== "object") throw "Parameter must be an object."
        let template = {
            name: "",
            id: "",
            player: ""
        }
        let templateMap = Object.keys(template)
        let optionsMap = Object.keys(options)
        if (optionsMap.length > 1) throw "Specify a singular parameter."
        if (templateMap.some(val => optionsMap.includes(val))) {
            let option = optionsMap.toString()
            let guild = await fetchMore(this.apikey, "guild", `&${option}=${options[option]}`)
            return guild
        } else throw "Parameter does not include a valid value."
    }
    //getstatus
    async getStatus(UUID) {
        ensureParameters(UUID)
        let status = await fetchMore(this.apikey, "status", `&uuid=${UUID}`)
        return status
    }
    //watchdog
    async getWatchDog() {
        let watchDog = await apiFetch(this.apikey, "watchdogstats")
        return watchDog
    }
    //player
    async getPlayer(username) {
        ensureParameters(username)
        return fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`, {
            method: "GET"
        }).then(response => response.json())
    }
    //leaderboard
    async getLeaderboard(game) {
        let leaderboards = await apiFetch(this.apikey, "leaderboards")
        if (!game) {
            return leaderboards
        } else {
            return leaderboards["leaderboards"][game]
        }
    }
    //games
    async getRecentGames(UUID) {
        let games = await fetchMore(this.apikey, "recentGames", `&uuid=${UUID}`)
        return games
    }
    async getGameCounts(game) {
        let counts = await apiFetch(this.apikey, "gameCounts")
        if (!game) {
            return counts
        } else {
            if (!counts.success) return counts
            let gamePlayers = counts["games"][game]
            return gamePlayers
        }
    }
    //boosters
    async getBoosters() {
        let boosters = await apiFetch(this.apikey, "boosters")
        return boosters
    }
    //friends
    async getFriends(UUID) {
        let friends = await fetchMore(this.apikey, "friends", `&uuid=${UUID}`)
        return friends
    }
    //resources
    async getResources(resource) {
        ensureParameters(resource)
        return fetch(`https://api.hypixel.net/resources/${resource}`, {
            method: 'GET'
        }).then(response => response.json())
    }
    //skyblock
    async getSkyblockProfiles(UUID) {
        ensureParameters(UUID)
        let profiles = await fetchMore(this.apikey, "skyblock/profiles", `&uuid=${UUID}`)
        return profiles
    }
    async getSkyblockBazaar() {
        let products = await apiFetch(this.apikey, "skyblock/bazaar")
        return products
    }
    async getProduct(productID) {
        ensureParameters(productID)
        let product = await fetchMore(this.apikey, "skyblock/bazaar/product", `&productId=${productID}`)
        return product
    }
    async getSkyblockAuction(obj) {
        ensureParameters(obj)
        if (typeof options !== "object") throw "Parameter must be an object."
        let template = {
            player: "",
            profile: "",
            uuid: ""
        }
        let templateMap = Object.keys(template)
        let optionsMap = Object.keys(options)
        if (optionsMap.length > 1) throw "Specify a singular parameter."
        if (templateMap.some(val => optionsMap.includes(val))) {
            let option = optionsMap.toString()
            let guild = await fetchMore(this.apikey, "skyblock/auction", `&${option}=${options[option]}`)
            return guild
        } else throw "Parameter does not include a valid value."
    }
    async getCurrentAuctions(page) {
        ensureParameters(page)
        let obj = await fetchMore(this.apikey, "skyblock/auctions", `&page=${page}`)
        return obj
    }
    async getTopMargins() { // does not calculate demand
        let products = await apiFetch(this.apikey, "skyblock/bazaar")
        let array = Object.keys(products["products"]).map(i => products["products"][i]["quick_status"])
        let list = array.sort(function (a, b) {
            let aMargin = a.buyPrice * 1.01 - a.sellPrice
            let bMargin = b.buyPrice * 1.01 - b.sellPrice
            return bMargin - aMargin
        })
        let top5 = list.splice(0, 5)
        return top5
    }
    async getArmor(object) {
        ensureParameters(object)
        if (typeof object !== "object") throw "Parameter must be an object."
        let template = {
            uuid: "",
            profileName: ""
        }
        if (!Object.keys(object).some(val => Object.keys(template).includes(val))) throw "Invalid object parameters."
        let nbt = require("prismarine-nbt")
        let profiles = await fetchMore(this.apikey, "skyblock/profiles", `&uuid=${object.uuid}`)
        let direction = profiles.profiles.find(val => val.cute_name === object.profileName).members[object.uuid].inv_armor.data
        let decoded = Buffer.from(direction, "base64")
        let finalOutput = await new Promise(resolve => {
            nbt.parse(decoded, (error, json) => {
                if (error) {
                    throw error
                }

                let helper = {
                    boots: {
                        number: 0,
                        value: json.value.i.value.value[0]
                    },
                    leggs: {
                        number: 1,
                        value: json.value.i.value.value[1],
                    },
                    chest: {
                        number: 2,
                        value: json.value.i.value.value[2]
                    },
                    helm: {
                        number: 3,
                        value: json.value.i.value.value[3]
                    }
                }
                Object.keys(helper).forEach(val => {
                    if (Object.keys(helper[val].value).length !== 0) {
                        helper[val].value = json.value.i.value.value[helper[val].number].tag.value.ExtraAttributes.value
                    } else if (Object.keys(helper[val].value).length === 0) {
                        helper[val].value = {}
                    }
                })
                let armorObj = {
                    boots: helper["boots"]["value"],
                    leggs: helper["leggs"]["value"],
                    chest: helper["chest"]["value"],
                    helm: helper["helm"]["value"],
                }
                return resolve(armorObj)
            });

        })
        return finalOutput

    }
}
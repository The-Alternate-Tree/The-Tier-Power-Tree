addLayer("one", {
    name: "tier 1 power", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        time: new Decimal(0),
    }},
    color: "#dc1313",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "tier 1 power", // Name of prestige currency
    baseResource: "tier 0 power", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('one', 13)) mult = mult.times(upgradeEffect('one', 13))


        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)


        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    displayRow: 1,
    hotkeys: [
        {key: "1", description: "1: Reset for tier 1 power", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
      tabFormat: {
            "upgrades": {
             
                content:
                    ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"], // Height
                  
                   "upgrades"],

            },
            "buyables": {
             
                content:
                    ["main-display",
                    ["blank", "5px"], // Height
                  
                   "buyables"],

            },
        },
        
        upgrades: {

            11: {
                title: "One Upgrade",
                description: "Add 1 to base tier 0 power gain.",
                cost: new Decimal(1),
                unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
                
            },
             12: {
                title: "One Boost Zero",
                description: "Tier 1 power boosts tier 0 power.",
                cost: new Decimal(2),
                unlocked() { return hasUpgrade('one', 11) }, // The upgrade is only visible when this is true
                effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player.one.points.add(1).pow(0.4)
                    if (hasUpgrade('one', 15)) ret = player.one.points.add(1).pow(0.48).ceil()
                    if (ret.gte("1e30")) ret = ret.sqrt().times("1e15")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
            13: {
                title: "Reversed Boost",
                description: "Tier 0 power boosts tier 1 power.",
                cost: new Decimal(5),
                unlocked() { return hasUpgrade('one', 12) }, // The upgrade is only visible when this is true
                effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player.points.add(1).pow(0.17)
                    if (ret.gte("1e18")) ret = ret.sqrt().times("1e9")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
            14: {
                title: "Double Zeros",
                description: "Double your tier 0 power gain.",
                cost: new Decimal(12),
                unlocked() { return hasUpgrade('one', 13) }, // The upgrade is only visible when this is true
                
            },
            15: {
                title: "Better Formula",
                description: "Tier 1 power upgrade 2 is better and ceiling'ed.",
                cost: new Decimal(25),
                unlocked() { return hasUpgrade('one', 14) }, // The upgrade is only visible when this is true
                
            },
            21: {
                title: "More Than 1",
                description: "Unlock 2 buyables.",
                cost: new Decimal(60),
                unlocked() { return hasUpgrade('one', 15) }, // The upgrade is only visible when this is true
                
            },
        },
        buyables: {
    11: {
        title: "More Tier 0 Power Base",
        unlocked() {
            return hasUpgrade('one', 21)
        },
        cost(x) {  
            let cost = new Decimal(25).times(new Decimal.pow(1.42, x.pow(1.42)))

            return cost
         },
         effect(x) {
            let eff = new Decimal(x)

            return eff
         },
         display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Cost: " + format(data.cost) + " tier 1 power\n\
                    Amount: " + player[this.layer].buyables[this.id] + "/100\n\
                    Increase base tier 0 power gain by " + format(data.effect) + "."
                },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
                                purchaseLimit: new Decimal(100),

    },
    12: {
        title: "More Tier 0 Power Multiplier",
        unlocked() {
            return hasUpgrade('one', 21)
        },
        cost(x) {  
            let cost = new Decimal(40).times(new Decimal.pow(1.55, x.pow(1.45)))

            return cost
         },
         effect(x) {
            let eff = new Decimal.pow(1.5, x)

            return eff
         },
         display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Cost: " + format(data.cost) + " tier 1 power\n\
                    Amount: " + player[this.layer].buyables[this.id] + "/100\n\
                    Multiply tier 0 power gain by x" + format(data.effect) + "."
                },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
                        purchaseLimit: new Decimal(100),

        
    },
},
})

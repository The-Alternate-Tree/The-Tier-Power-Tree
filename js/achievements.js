addLayer("ach", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
       
    }},
    color: "#fffb00",
  
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    resource: "achievements", // Name of prestige currency

    row: 'side', // Row the layer is in on the tree (0 is the first row)
    
    layerShown(){return true},
      tabFormat: {
            "achievements": {
             
                content:
                    ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"], // Height
                  
                   "achievements"],

            },
        },
         achievements: {
        11: {
            name: "Level 1-1",
            done() {return player.one.points.gte(1)}, // This one is a freebie
            tooltip: "Get 1 tier 1 power.",
            onComplete() {player.ach.points = player.ach.points.plus(1)}

        },
        12: {
            name: "This Doesn't Seem Very Original",
            done() {return hasUpgrade('one', 13)}, // This one is a freebie
            tooltip: "Buy 3 tier 1 power upgrades.",
            onComplete() {player.ach.points = player.ach.points.plus(1)}

        },
    },
})

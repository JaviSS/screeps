const goToDie = require("./utils").goToDie;
const MOVE_OPTS = {
    reusePath: 3,
    visualizePathStyle: {
        fill: 'transparent',
        stroke: '#fff',
        lineStyle: 'dotted',
        strokeWidth: .15,
        opacity: .2
    }
};

module.exports = {

    run: (creep, spawn) => {

        if (goToDie(creep)) return true;

        // balanceTradeResources(creep,spawn);
        if (creep.memory.working === true && _.sum(creep.carry) === 0) {
            creep.memory.working = false;
        } else {
            if (creep.memory.working === false && _.sum(creep.carry) > 0) {
                creep.memory.working = true;
            }
        }

        if (creep.memory.working === true) {
            let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType === STRUCTURE_TERMINAL)
            });

            if (structure) {
                if (creep.transfer(structure, _.findKey(creep.carry)) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, MOVE_OPTS);
                }
            }
        } else {
            let source = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_STORAGE
            });
            const withdraw = _.findKey(_.omit(creep.room.storage.store, [RESOURCE_ENERGY]));
            if (!withdraw) return false;
            const status = creep.withdraw(source, _.findKey(_.omit(creep.room.storage.store, [RESOURCE_ENERGY])));
            if (status === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, MOVE_OPTS);
            }
        }
        return true;
    }
};
/*function balanceTradeResources(creep,spawn) {

    for (let storeKey in spawn.room.storage.store) {
        if(spawn.room.storage.store[storeKey] > 5000){
            if(spawn.room.terminal && spawn.room.terminal.store[storeKey] < 10000){

            console.log('more than 5000' + storeKey);
            }
        }
    }
    /!*if (creep.withdraw(source, withdraw) === ERR_NOT_IN_RANGE)
        creep.moveTo(source, PATH_STYLE);*!/
}*/

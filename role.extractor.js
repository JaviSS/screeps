const goToDie = require("./utils").goToDie;
const MOVE_OPTS = {
    reusePath: 3,
    visualizePathStyle: {
        fill: 'transparent',
        stroke: '#CC8800',
        lineStyle: 'dotted',
        strokeWidth: .15,
        opacity: .2
    }
};

module.exports = {

    run: (creep, spawn) => {
        if (goToDie(creep)) return true;


        if (creep.memory.working === true && _.sum(creep.carry) !== creep.carryCapacity) {
            creep.memory.working = false;
        } else {
            if (creep.memory.working === false && _.sum(creep.carry) === creep.carryCapacity) {
                creep.memory.working = true;
            }
        }

        if (creep.memory.working === true) {

            let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_TERMINAL || s.structureType === STRUCTURE_STORAGE
        });

            if (structure) {
                if (creep.transfer(structure, _.findKey(creep.carry)) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, MOVE_OPTS);
                }
            }
        } else {
            let structure = creep.room.find(FIND_MINERALS)[0];
            if (structure && creep.harvest(structure) === ERR_NOT_IN_RANGE) {
                creep.moveTo(structure, MOVE_OPTS);
            }
        }
    }
};
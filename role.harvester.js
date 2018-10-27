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

        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
        } else {
            if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
                creep.memory.working = true;
            }
        }

        if (creep.memory.working === true) {
            let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType === STRUCTURE_TOWER) && (s.energy < s.energyCapacity)
            });
            if (!structure) {
                structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) =>
                        (s.structureType === STRUCTURE_SPAWN
                            || s.structureType === STRUCTURE_EXTENSION)
                        && s.energy < s.energyCapacity
                });
            }
            if (!structure) {
                structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => s.structureType === STRUCTURE_STORAGE
                });
            }

            if (structure) {
                if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, MOVE_OPTS);
                }
            } else {
                creep.moveTo(spawn, MOVE_OPTS);
            }
        } else {
            let source = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => (s.structureType === STRUCTURE_CONTAINER) && (s.store[RESOURCE_ENERGY] > 0)
            })[0];

            if (source) {
                if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, MOVE_OPTS);
                }
            } else {
                source = creep.pos.findClosestByPath(FIND_SOURCES, {
                    filter: (s) => s.energy > 0
                });
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, MOVE_OPTS);
                }
            }
        }
    }
};
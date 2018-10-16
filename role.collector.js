const goToDie = require("./utils").goToDie;
const PATH_STYLE = {
    reusePath: 3,
    visualizePathStyle: {
        stroke: '#33ff99',
        strokeWidth: .15,
        opacity: .3,
        lineStyle: 'solid',
    }
};

module.exports = {
    run: (creep, spawn) => {

        if (goToDie(creep)) return true;

        const creepContents = _.sum(creep.carry, (c) => {
            return c;
        });

        if (creep.memory.working === true && creepContents === 0) {
            creep.memory.working = false;
        } else {
            if (creep.memory.working === false && creepContents === creep.carryCapacity) {
                creep.memory.working = true;
            }
        }

        if (creep.room.name !== creep.memory.home) {
            let posInAnotherRoom = new RoomPosition(20, 10, creep.memory.home);
            creep.moveTo(posInAnotherRoom, PATH_STYLE);
        }

        if (creep.memory.working === true) {
            let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_STORAGE
            });

            if (!structure) {
                structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) =>
                        (s.structureType === STRUCTURE_SPAWN
                            || s.structureType === STRUCTURE_EXTENSION
                            || s.structureType === STRUCTURE_TOWER)
                        && s.energy < s.energyCapacity
                });

            }

            if (structure) {

                if (creep.transfer(structure, _.findKey(creep.carry)) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, PATH_STYLE);
                }
            } else {
                creep.moveTo(spawn, PATH_STYLE);
            }
        } else {
            let source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);

            if (source) {
                if (creep.pickup(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, PATH_STYLE);
                }
            } else {
                source = creep.pos.findClosestByPath(FIND_TOMBSTONES);
                if (source) {
                    const withdraw = _.findKey(source.store);
                    if (source[withdraw] && creep.withdraw(source, withdraw)) {
                        creep.moveTo(source, PATH_STYLE);
                    }
                } else {
                    return false;
                }
            }
        }
        return true;
    }
};
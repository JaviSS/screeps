const goToDie = require("./utils").goToDie;
const PATH_STYLE = {
    reusePath: 3,
    visualizePathStyle: {
        stroke: 'pink',
        lineStyle: 'solid',
        strokeWidth: .1,
        opacity: .4
    }
};

module.exports = {

    run: (creep) => {

        if (goToDie(creep)) return true;

        if (creep.hits < creep.hitsMax) {
            creep.memory.working = true;
        } else {
            if (creep.memory.working === true && creep.carry.energy === 0) {
                creep.memory.working = false;
                creep.memory.iterations++;
            } else {
                if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
                    creep.memory.working = true;
                }
            }
        }

        // creep move to unload
        if (creep.memory.working) {
            // creep is in home room
            let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_CONTAINER
            });
            if (structure) {
                if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, PATH_STYLE);
                }

                // creep not in home room
            } else {
                let exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit), PATH_STYLE);
            }
        } else {

            // creep in destiny room
            if (creep.room.name === creep.memory.target) {
                let source = creep.pos.findClosestByPath(FIND_SOURCES, {
                    filter: (s) => s.energy > 0
                });
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, PATH_STYLE);
                }

                // creep not it destiny room
            } else {
                let posInAnotherRoom = new RoomPosition(20, 10, creep.memory.target);
                creep.moveTo(posInAnotherRoom, PATH_STYLE);
            }
        }
    }
};
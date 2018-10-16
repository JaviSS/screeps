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
        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
            creep.memory.iterations++;
        } else {
            if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
                creep.memory.working = true;
            }
        }

        // creep move to unload
        if (creep.memory.working === true) {
            // creep is in home room
            let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_STORAGE
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

                let source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);

                if (source) {
                    if (creep.pickup(source) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, PATH_STYLE);
                    }
                } else {
                    source = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
                    if (!source) {
                        creep.memory.working = true;
                    }
                    if (creep.dismantle(source) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, PATH_STYLE);
                    }
                }
                // creep not it destiny room
            } else {
                let posInAnotherRoom = new RoomPosition(20, 10, creep.memory.target);
                creep.moveTo(posInAnotherRoom, PATH_STYLE);
            }
        }
    }
};
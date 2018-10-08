const PATH_STYLE = {
    visualizePathStyle: {
        stroke: 'green',
        strokeWidth: .15,
        opacity: .2
    }
};

module.exports = {
    run: (creep, spawn) => {

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
                if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
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
                    let withdraw;
                    if (source.store[RESOURCE_ENERGY] === 0) {
                        for (let key in Object.keys(source.store)) {
                            if (!(key === RESOURCE_ENERGY)) {
                                withdraw = key;
                                break;
                            }
                        }
                    }
                    if (creep.withdraw(source, withdraw) === ERR_NOT_IN_RANGE) {
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
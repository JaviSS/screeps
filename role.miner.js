module.exports = {

    run: (creep, spawn) => {

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
                    creep.moveTo(structure, {
                        reusePath: 0,
                        visualizePathStyle: {
                            fill: 'transparent',
                            stroke: '#fff',
                            lineStyle: 'dotted',
                            strokeWidth: .15,
                            opacity: .2
                        }
                    });
                }
            } else {
                creep.moveTo(spawn, {
                    reusePath: 0,
                    visualizePathStyle: {
                        fill: 'transparent',
                        stroke: '#fff',
                        lineStyle: 'dotted',
                        strokeWidth: .15,
                        opacity: .2
                    }
                });
            }
        } else {
            let source = creep.pos.findClosestByPath(FIND_SOURCES, {
                filter: (s) => s.energy > 0
            });
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {


                creep.moveTo(source,
                    {
                        reusePath: 0,
                        visualizePathStyle: {
                            fill: 'transparent',
                            stroke: '#fff',
                            lineStyle: 'dotted',
                            strokeWidth: .15,
                            opacity: .2
                        }
                    }
                );
            }
        }
    }
};
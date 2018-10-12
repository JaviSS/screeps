const PATH_STYLE = {
    visualizePathStyle: {
        fill: 'transparent',
        stroke: 'cyan',
        lineStyle: 'solid',
        strokeWidth: .1,
        opacity: .2
    }
};

module.exports = {

    run: (creep) => {
        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
        } else {
            if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
                creep.memory.working = true;
            }
        }

        if (creep.memory.working === true) {
            let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < (s.hitsMax*0.9) && s.structureType !== STRUCTURE_WALL
            });

            if (structure) {
                let repairStatus = creep.repair(structure);
                if (repairStatus === ERR_NOT_IN_RANGE || repairStatus === ERR_TIRED) {
                    creep.moveTo(structure, PATH_STYLE);
                }
            } else {
                return false;
            }
        } else {
            let source = creep.pos.findClosestByPath(FIND_SOURCES, {
                filter: (s) => s.energy > 0
            });
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, PATH_STYLE);
            } else {

                // try to harvest from energy deposit
                let source = creep.pos.findClosestByPath(FIND_SOURCES, {
                    filter: (s) => s.energy > 0
                });

                let status = creep.harvest(source);
                if (status === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, PATH_STYLE)
                    // try to transfer from storage
                } else if (status < 0) {
                    source = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => s.structureType === STRUCTURE_STORAGE
                    });

                    status = creep.withdraw(source, RESOURCE_ENERGY);
                    if (status === ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, PATH_STYLE)
                    }
                }
            }
        }
        return true;
    }
};
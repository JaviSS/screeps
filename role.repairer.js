const goToDie = require("./utils").goToDie;
const PATH_STYLE = {
    reusePath: 3,
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

        if (goToDie(creep)) return true;

        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
            delete creep.memory['repairing'];
        } else {
            if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
                creep.memory.working = true;
            }
        }

        if (creep.memory.working === true) {

            let structure = Game.getObjectById(creep.memory['repairing']);

            if (!structure) {
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.hits < (s.hitsMax * 0.85) && s.structureType !== STRUCTURE_WALL
                });
            }

            if (structure) {
                creep.memory['repairing'] = structure.id;
                if(structure.hits === structure.hitsMax) delete creep.memory['repairing'];
                let repairStatus = creep.repair(structure);
                if (repairStatus === ERR_NOT_IN_RANGE || repairStatus === ERR_TIRED) {
                    creep.moveTo(structure, PATH_STYLE);
                }
            } else {
                return false;
            }
        } else {
            let source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType === STRUCTURE_STORAGE || s.structureType === STRUCTURE_CONTAINER) && (s.store[RESOURCE_ENERGY] > 0)
            });

            status = creep.withdraw(source, RESOURCE_ENERGY);
            if (status === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, PATH_STYLE)
            }
        }
        return true;
    }
};
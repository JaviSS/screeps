const Builder = require('./role.builder');
const goToDie = require("./utils").goToDie;

const MOVE_OPTS = {
    visualizePathStyle: {
        fill: 'transparent',
        stroke: 'yellow',
        lineStyle: 'solid',
        strokeWidth: .1,
        opacity: .4
    }
};

module.exports = {

    run: (creep) => {

        if (goToDie(creep)) return true;

        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
        } else {
            if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
                creep.memory.working = true;
            }
        }

        if (creep.memory.working === true) {

            let walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_WALL && s.hits < s.hitsMax * 0.0001});

            let target = walls.sort(function (a, b) {
                return (Math.floor(a.hits / 10000) > Math.floor(b.hits / 10000)) ? 1 : ((Math.floor(b.hits / 10000) > Math.floor(a.hits / 10000)) ? -1 : 0);
            })[0];


            if (target) {
                if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, MOVE_OPTS);
                }
            } else {
                Builder.run(creep);
            }
        } else {
            let source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType === STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 10000) || (s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 300)
            });

            status = creep.withdraw(source, RESOURCE_ENERGY);
            if (status === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, MOVE_OPTS)
            }
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, MOVE_OPTS);
            }
        }
    }
};
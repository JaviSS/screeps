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
                delete creep.memory.destination;
                creep.memory.working = true;
            }
        }

        if (creep.memory.working === true) {
            let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType === STRUCTURE_TOWER) && (s.energy < (s.energyCapacity * 0.9))
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
            if (!creep.memory.destination) {

                let sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType === STRUCTURE_CONTAINER) && (s.store[RESOURCE_ENERGY] > 450)
                });


                if (sources.length > 0) creep.memory.destination = sources[Math.floor(Math.random() * (sources.length))].id;
            }

            const status = creep.withdraw(Game.getObjectById(creep.memory.destination), RESOURCE_ENERGY);
            if (status === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.destination), MOVE_OPTS);
            } else if (status === ERR_NOT_ENOUGH_RESOURCES) {
                delete creep.memory.destination;

            }
        }
    }
};

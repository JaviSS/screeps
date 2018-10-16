const goToDie = require("./utils").goToDie;
module.exports = {

    run: (creep) => {

        if (goToDie(creep)) return true;


        let source = Game.getObjectById(creep.memory.sourceId);
        let container = source.pos.findInRange(FIND_STRUCTURES, 1, {filter: s => s.structureType === STRUCTURE_CONTAINER})[0];

        if(creep.pos.isEqualTo(container.pos)){
            creep.harvest(source);
            if(container.store[RESOURCE_ENERGY] > 2000) creep.say('⧗');
        } else {
            creep.moveTo(container);
        }
    }
};
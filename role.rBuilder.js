const PATH_STYLE = {
    reusePath: 3,
    visualizePathStyle: {
        fill: 'transparent',
        stroke: 'magenta',
        lineStyle: 'solid',
        strokeWidth: .1,
        opacity: .2
    }
};

module.exports = {

    run: (creep) => {
        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
        } else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working === true) {
            if (creep.room.name === creep.memory.target) {

                let constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if (constructionSite) {
                    let buildStatus = creep.build(constructionSite);
                    if (buildStatus === ERR_NOT_IN_RANGE || buildStatus === ERR_TIRED) {
                        creep.moveTo(constructionSite, PATH_STYLE);
                    }
                } else {
                    return false;
                }
            } else {
      let posInAnotherRoom = new RoomPosition(20, 10, creep.memory.target);
                creep.moveTo(posInAnotherRoom, PATH_STYLE);
            }
        } else {

            // try to harvest from energy deposit
            let source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType === STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 10000) || (s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 300)
            });

            status = creep.withdraw(source, RESOURCE_ENERGY);
            if (status === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, PATH_STYLE)
            } else if (status < 0) {
                source = creep.pos.findClosestByPath(FIND_SOURCES, {
                    filter: (s) => s.energy > 0
                });
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, PATH_STYLE);
                } else {
                    let status = creep.harvest(source);
                }
            }
        }
        return true;
    }
};
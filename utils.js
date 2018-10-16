const DIE_OPTS = {
    reusePath: 3,
    visualizePathStyle: {
        fill: 'transparent',
        stroke: 'magenta',
        lineStyle: 'solid',
        strokeWidth: .1,
        opacity: .8
    }
};

module.exports = {

    goToDie(creep) {
        if (creep.ticksToLive < 20) {
            creep.say('⌀');
            creep.moveTo(creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType === STRUCTURE_STORAGE})[0], DIE_OPTS);
            return true;
        }
        return false;
    }
};

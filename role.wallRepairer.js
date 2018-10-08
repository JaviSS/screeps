const Builder = require('./role.builder');

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

      let walls = creep.room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_WALL
      });

      let target = walls.sort(function(a,b) {return (Math.floor(a.hits/10000) > Math.floor(b.hits/10000)) ? 1 : ((Math.floor(b.hits/10000) > Math.floor(a.hits/10000)) ? -1 : 0);} )[0];


      if (target) {
        if (creep.repair(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target,
            {
              visualizePathStyle: {
                fill: 'transparent',
                stroke: 'yellow',
                lineStyle: 'solid',
                strokeWidth: .1,
                opacity: .2
              }
            }
          );
        }
      } else {
        Builder.run(creep);
      }
    } else {
      let source = creep.pos.findClosestByPath(FIND_SOURCES, {
        filter: (s) => s.energy > 0
      });
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source,
          {
            visualizePathStyle: {
              fill: 'transparent',
              stroke: 'yellow',
              lineStyle: 'solid',
              strokeWidth: .1,
              opacity: .2
            }
          }
        );
      }
    }
  }
};
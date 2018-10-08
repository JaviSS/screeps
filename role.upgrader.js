const PATH_STYLE = {
  visualizePathStyle: {
    fill: 'transparent',
    stroke: '#fff',
    lineStyle: 'solid',
    strokeWidth: .15,
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
      if (creep.upgradeController(creep.room.controller, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, PATH_STYLE);
      }
    } else {
      // try to harvest from energy deposit
      let source = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (s) => (s.structureType === STRUCTURE_STORAGE) && (s.store[RESOURCE_ENERGY] > 0)
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
  }
};
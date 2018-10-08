const PATH_STYLE = {
  visualizePathStyle: {
    stroke: 'pink',
    lineStyle: 'solid',
    strokeWidth: .1,
    opacity: .4
  }
};

module.exports = {

  run: (creep) => {
    if (creep.memory.working === true && creep.carry.energy === 0) {
      creep.memory.working = false;
      creep.memory.iterations++;
    } else {
      if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
        creep.memory.working = true;
      }
    }

    // creep move to unload
    if (creep.memory.working === true) {
      // creep is in home room
      if (true) {

        let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
          filter: (s) =>
            (s.structureType === STRUCTURE_SPAWN
              || s.structureType === STRUCTURE_EXTENSION
              || s.structureType === STRUCTURE_TOWER)
            && s.energy < s.energyCapacity
        });

        if(!structure){
          structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_STORAGE
          });
        }

        if (structure) {
          if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(structure, PATH_STYLE);
          }

          // creep not in home room
        } else {
          let exit = creep.room.findExitTo(creep.memory.home);
          creep.moveTo(creep.pos.findClosestByRange(exit),PATH_STYLE);
        }

        // creep move to source
      } else {
        Game.notify(`Never`);
        creep.moveTo(Game.rooms[creep.memory.home].controller, PATH_STYLE);
      }
    } else {

      // creep in destiny room
      if (creep.room.name === creep.memory.target) {
        let source = creep.pos.findClosestByPath(FIND_SOURCES, {
          filter: (s) => s.energy > 0
        });
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.moveTo(source, PATH_STYLE);
        }

        // creep not it destiny room
      } else{
          let posInAnotherRoom = new RoomPosition(20, 10, creep.memory.target);
          creep.moveTo(posInAnotherRoom,PATH_STYLE);
      }
    }
  }
};
const PATH_STYLE = {
  visualizePathStyle: {
    stroke: 'yellow',
    lineStyle: 'solid',
    strokeWidth: .1,
    opacity: .3
  }
};

const PATH_STYLE_ATACK = {
  visualizePathStyle: {
    stroke: 'red',
    lineStyle: 'solid',
    strokeWidth: .2,
    opacity: .5
  }
};

module.exports = {

  run: (creep) => {
    if (!findAndAttack(creep)) {
      // creep in destiny room
      if (creep.room.name === creep.memory.target) {
        creep.pos.findClosestByPath(FIND_MY_CREEPS, {
            filter: (c) => c.memory.role !== 'soldier' && c.room === creep.room
          }
        );
        // if(source) creep.moveTo(source.pos, PATH_STYLE);
        // creep not it destiny room
      } else {
        let exit = creep.room.findExitTo(creep.memory.target);
        creep.moveTo(creep.pos.findClosestByPath(exit), PATH_STYLE);
      }
    }
  }
};

function findAndAttack(creep) {
  let hostiles = Game.rooms[creep.room.name].find(FIND_HOSTILE_CREEPS);
  if (hostiles.length > 0) {
    let username = hostiles[0].owner.username;
    Game.notify(`Soldier spotted an enemy creep (${username})`);
    let status = creep.rangedAttack(hostiles[0]);
    if (!(status < 0)) status = creep.attack(hostiles[0]);
    if (status === ERR_NOT_IN_RANGE) {
      creep.moveTo(hostiles[0], PATH_STYLE_ATACK);
    }
    return true;
  }
  return false;
}

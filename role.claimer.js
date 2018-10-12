const PATH_STYLE = {
  visualizePathStyle: {
    stroke: 'red',
    lineStyle: 'solid',
    strokeWidth: .1,
    opacity: .4
  }
};

module.exports = {

  run: (creep) => {
    // creep in destiny room
    if (creep.room.name === creep.memory.target) {
        // let status = creep.claimController(creep.room.controller);
        let status = creep.reserveController(creep.room.controller);

        // console.log(status)
      if (status < 0) {
        creep.moveTo(creep.room.controller, PATH_STYLE);
      }
      // creep not it destiny room
    } else {
      creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.target)), PATH_STYLE);
    }
  }
};
require('./prototype.spawn')();
const Harvester = require('./role.harvester');
const remoteHarvester = require('./role.remoteHarvester');
const Ugrader = require('./role.upgrader');
const Builder = require('./role.builder');
const Repairer = require('./role.repairer');
const WallRepairer = require('./role.wallRepairer');
const Claimer = require('./role.claimer');
const Collector = require('./role.collector');
const Soldier = require('./role.soldier');
const RemoteBuilder = require('./role.remoteBuilder');
const RemoteDismantler = require('./role.remoteDismantler');


module.exports.loop = () => {

    /* Memory.stats['cpu.rooms.W52S45.harvesting'] = 0;
     Memory.stats['cpu.rooms.W52S45.remoteHarvesting'] = 0;
     Memory.stats['cpu.rooms.W52S45.upgrading'] = 0;
     Memory.stats['cpu.rooms.W52S45.building'] = 0;
     Memory.stats['cpu.rooms.W52S45.repairing'] = 0;
     Memory.stats['cpu.rooms.W52S45.wallRepairing'] = 0;
     Memory.stats['cpu.rooms.W52S45.claiming'] = 0;
     Memory.stats['cpu.rooms.W52S45.collecting'] = 0;
     Memory.stats['cpu.rooms.W52S45.patroling'] = 0;
     Memory.stats['cpu.rooms.W52S45.remoteBuilding'] = 0;*/

    Game.spawns.Spawn1.memory.MIN_HARVESTERS = 2;
    Game.spawns.Spawn1.memory.MIN_REMOTE_HARVESTERS = 2;
    Game.spawns.Spawn1.memory.MIN_UPGRADERS = 1;
    Game.spawns.Spawn1.memory.MIN_BUILDERS = 0;
    Game.spawns.Spawn1.memory.MIN_REPAIRERS = 1;
    Game.spawns.Spawn1.memory.MIN_WALL_REPAIRERS = 0;
    Game.spawns.Spawn1.memory.MIN_COLLECTORS = 1;
    Game.spawns.Spawn1.memory.MIN_SOLDIERS = 0;
    Game.spawns.Spawn1.memory.MIN_REMOTE_BUILDERS = 0;
    Game.spawns.Spawn1.memory.MIN_REMOTE_DISMANTLERS = 0;

    Game.spawns.Spawn1.memory.SOLDIER_DEPLOY_LOCATION = 'W53S46';
    Game.spawns.Spawn1.memory.REMOTE_HARVESTER_TARGET = 'W53S46';
    Game.spawns.Spawn1.memory.REMOTE_DISMANTLER_TARGET = 'W53S46';

    Game.spawns.Spawn2.memory.MIN_HARVESTERS = 3;
    Game.spawns.Spawn2.memory.MIN_REMOTE_HARVESTERS = 0;
    Game.spawns.Spawn2.memory.MIN_REPAIRERS = 1;
    Game.spawns.Spawn2.memory.MIN_UPGRADERS = 2;
    Game.spawns.Spawn2.memory.MIN_BUILDERS = 0;
    Game.spawns.Spawn2.memory.MIN_WALL_REPAIRERS = 0;
    Game.spawns.Spawn2.memory.MIN_COLLECTORS = 1;
    Game.spawns.Spawn2.memory.MIN_SOLDIERS = 0;
    Game.spawns.Spawn2.memory.MIN_REMOTE_BUILDERS = 0;
    Game.spawns.Spawn2.memory.MIN_REMOTE_DISMANTLERS = 0;


    // console.log(Game.spawns.Spawn1.createCreep(spawn.room.name, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,CARRY], undefined, {role: 'builder', working: false}));
    // console.log(Game.spawns.Spawn1.createCreep([CLAIM,MOVE], undefined, {role: 'claimer', home:'W53S45',target:'W53S46', working: false}));
    Memory.temp = {cpu: {rooms: {}}};


    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    for (let spawnName in Game.spawns) {

        const cpuTime = Game.cpu.getUsed();

        let spawn = Game.spawns[spawnName];
        let creepsSpawnedHere = _.filter(Game.creeps, (c) => c.memory.home === spawn.room.name);

        Memory.stats['cpu.rooms.' + spawn.room.name + '.defending'] = defendRoom(spawn.room.name);

        Memory.stats['cpu.rooms.' + spawn.room.name + '.spawning'] = spawnCreeps(creepsSpawnedHere, spawn);

        dispatchRoles(creepsSpawnedHere, spawn);

        if (spawn.room.controller && spawn.room.controller.my) {
            Memory.stats['rooms.' + spawn.room.name + '.rcl.level'] = spawn.room.controller.level;
            Memory.stats['rooms.' + spawn.room.name + '.rcl.progress'] = spawn.room.controller.progress;
            Memory.stats['rooms.' + spawn.room.name + '.rcl.progressTotal'] = spawn.room.controller.progressTotal;

            Memory.stats['rooms.' + spawn.room.name + '.spawn.energy'] = spawn.room.energyAvailable;
            Memory.stats['rooms.' + spawn.room.name + '.spawn.energyTotal'] = spawn.room.energyCapacityAvailable;

            if (spawn.room.storage) {
                Memory.stats['rooms.' + spawn.room.name + '.storage.energy'] = spawn.room.storage.store.energy
            }
        }
        Memory.stats['cpu.rooms.' + spawn.room.name + '.cpu'] = Game.cpu.getUsed() - cpuTime;
    }

    saveStats();
};

function spawnCreeps(creepsSpawnedHere, spawn) {

    const cpuTime = Game.cpu.getUsed();

    let totalHarvesters = _.sum(creepsSpawnedHere, (c) => {
        return c.memory.role === 'harvester'
    });

    let totalLongDistanceHarversters = _.sum(creepsSpawnedHere, (c) => {
        return c.memory.role === 'remoteHarvester'
    });

    let totalUpgraders = _.sum(creepsSpawnedHere, (c) => {
        return c.memory.role === 'upgrader'
    });

    let totalBuilders = _.sum(creepsSpawnedHere, (c) => {
        return c.memory.role === 'builder'
    });

    let totalRepairers = _.sum(creepsSpawnedHere, (c) => {
        return c.memory.role === 'repairer'
    });

    let totalWallRepairers = _.sum(creepsSpawnedHere, (c) => {
        return c.memory.role === 'wallRepairer'
    });

    let totalCollectors = _.sum(creepsSpawnedHere, (c) => {
        return c.memory.role === 'collector'
    });

    let totalSoldiers = _.sum(creepsSpawnedHere, (c) => {
        return c.memory.role === 'soldier'
    });

    let totalRemoteBuilders = _.sum(creepsSpawnedHere, (c) => {
        return c.memory.role === 'remoteBuilder'
    });

    let totalRemoteDismantlers = _.sum(creepsSpawnedHere, (c) => {
        return c.memory.role === 'remoteDismantler'
    });

    Memory.stats['rooms.' + spawn.room.name + '.creeps.total'] = creepsSpawnedHere;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.harvesters'] = totalHarvesters;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.remoteHarvesters'] = totalLongDistanceHarversters;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.upgraders'] = totalUpgraders;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.builders'] = totalBuilders;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.repairers'] = totalRepairers;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.wallRepairers'] = totalWallRepairers;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.collectors'] = totalCollectors;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.soldiers'] = totalSoldiers;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.remoteBuilders'] = totalRemoteBuilders;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.remoteDismantlers'] = totalRemoteDismantlers;
    

    if (totalHarvesters < spawn.memory.MIN_HARVESTERS) {

        let name = spawn.createBalancedCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 'harvester');
        if (!(name < 0)) console.log(`new harvester(${totalHarvesters + 1}) -> ${name}`);
        if ((name === ERR_NOT_ENOUGH_ENERGY && !spawn.memory.MIN_HARVESTERS) || spawn.room.find(FIND_MY_CREEPS).length < 1) {
            name = spawn.createBalancedCreep(spawn.room.name, spawn.room.energyAvailable, 'harvester');
            if (!(name < 0)) console.log(`new basicHarvester(${totalHarvesters + 1}) -> ${name}`);
        }
        // Claim room
    } else if (spawn.memory.claimRoom !== undefined) {
        let name = spawn.createClaimer(spawn.room.name, spawn.memory.claimRoom);
        if (!(name < 0)) {
            delete spawn.memory.claimRoom;
            console.log(`new claimer -> ${name}`);
        }

    } else if (totalSoldiers < spawn.memory.MIN_SOLDIERS) {

        let name = spawn.createSoldier(spawn.room.name, spawn.room.energyAvailable, spawn.memory.SOLDIER_DEPLOY_LOCATION);
        if (!(name < 0)) console.log(`new soldier(${totalSoldiers + 1}) -> ${name}`);

    } else if (totalRemoteDismantlers < spawn.memory.MIN_REMOTE_DISMANTLERS) {

        let name = spawn.createRemoteDismantlerCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 4, spawn.memory.REMOTE_DISMANTLER_TARGET);
        if (!(name < 0)) console.log(`new remote dismantler(${ + 1}) -> ${name}`);

    } else if (totalLongDistanceHarversters < spawn.memory.MIN_REMOTE_HARVESTERS) {

        let name = spawn.createremoteHarvesterCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 4, spawn.memory.REMOTE_HARVESTER_TARGET);
        if (!(name < 0)) console.log(`new longDistance(${totalLongDistanceHarversters + 1}) -> ${name}`);

    } else if (totalUpgraders < spawn.memory.MIN_UPGRADERS) {

        let name = spawn.createBalancedCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 'upgrader');
        if (!(name < 0)) console.log(`new upgrader(${totalUpgraders + 1}) -> ${name}`);

    } else if (totalRepairers < spawn.memory.MIN_REPAIRERS) {

        let name = spawn.createBalancedCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 'repairer');
        if (!(name < 0)) console.log(`new repairer(${totalRepairers + 1}) -> ${name}`);

    } else if (totalBuilders < spawn.memory.MIN_BUILDERS) {

        let name = spawn.createBalancedCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 'builder');
        if (!(name < 0)) console.log(`new builder(${totalBuilders + 1}) -> ${name}`);

    } else if (totalWallRepairers < spawn.memory.MIN_WALL_REPAIRERS) {

        let name = spawn.createBalancedCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 'wallRepairer');
        if (!(name < 0)) console.log(`new wall repairer(${totalWallRepairers + 1}) -> ${name}`);

    } else if (totalCollectors < spawn.memory.MIN_COLLECTORS) {

        let name = spawn.createBalancedCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 'collector');
        if (!(name < 0)) console.log(`new collector(${totalCollectors + 1}) -> ${name}`);

    } else if (totalRemoteBuilders < spawn.memory.MIN_REMOTE_BUILDERS) {
        let name = spawn.createRemoteBuilderCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 7, 'W52S45');
        if (!(name < 0)) console.log(`new remote builder(${totalRemoteBuilders + 1}) -> ${name}`);
    }

    return Game.cpu.getUsed() - cpuTime;
}

function dispatchRoles(creepsSpawnedHere, spawn) {

    Memory.temp.cpu.rooms[spawn.room.name + '.harvesting'] = 0;
    // Memory.temp.cpu.rooms[spawn.room.name + '.remoteHarvesting'] = 0;
    Memory.temp.cpu.rooms[spawn.room.name + '.upgrading'] = 0;
    Memory.temp.cpu.rooms[spawn.room.name + '.building'] = 0;
    Memory.temp.cpu.rooms[spawn.room.name + '.repairing'] = 0;
    Memory.temp.cpu.rooms[spawn.room.name + '.wallRepairing'] = 0;
    Memory.temp.cpu.rooms[spawn.room.name + '.claiming'] = 0;
    Memory.temp.cpu.rooms[spawn.room.name + '.collecting'] = 0;
    Memory.temp.cpu.rooms[spawn.room.name + '.patroling'] = 0;
    // Memory.temp.cpu.rooms[spawn.room.name + '.remoteBuilding'] = 0;

    creepsSpawnedHere.forEach((creep) => {
        // noinspection JSUnfilteredForInLoop

        const cpuTime = Game.cpu.getUsed();
        switch (creep.memory.role) {
            case 'harvester': {
                Harvester.run(creep, spawn);
                Memory.temp.cpu.rooms[spawn.room.name + '.harvesting'] = (Game.cpu.getUsed() - cpuTime);
                break;
            }
            case 'remoteHarvester': {
                remoteHarvester.run(creep);
                Memory.temp.cpu.rooms[spawn.room.name + '.harvesting'] = (Game.cpu.getUsed() - cpuTime);
                break;
            }
            case 'remoteDismantler': {
                RemoteDismantler.run(creep);
               // Memory.temp.cpu.rooms[spawn.room.name + '.harvesting'] = (Game.cpu.getUsed() - cpuTime);
                break;
            }
            case 'upgrader': {
                Ugrader.run(creep);
                Memory.temp.cpu.rooms[spawn.room.name + '.upgrading'] = (Game.cpu.getUsed() - cpuTime);
                break;
            }
            case 'builder': {
                if (Builder.run(creep)) {
                    Memory.temp.cpu.rooms[spawn.room.name + '.building'] = (Game.cpu.getUsed() - cpuTime);
                } else {
                    Ugrader.run(creep);
                    Memory.temp.cpu.rooms[spawn.room.name + '.upgrading'] = (Game.cpu.getUsed() - cpuTime);
                }
                break;
            }
            case 'repairer': {
                if (Repairer.run(creep)) {
                    Memory.temp.cpu.rooms[spawn.room.name + '.repairing'] = (Game.cpu.getUsed() - cpuTime);
                } else {
                    Ugrader.run(creep);
                    Memory.temp.cpu.rooms[spawn.room.name + '.upgrading'] = (Game.cpu.getUsed() - cpuTime);

                }
                break;
            }
            case 'wallRepairer': {
                WallRepairer.run(creep);
                Memory.temp.cpu.rooms[spawn.room.name + '.wallRepairing'] = (Game.cpu.getUsed() - cpuTime);
                break;
            }
            case 'claimer': {
                Claimer.run(creep);
                Memory.temp.cpu.rooms[spawn.room.name + '.claiming'] = (Game.cpu.getUsed() - cpuTime);
                break;
            }
            case 'collector': {
                if (Collector.run(creep, spawn)) {
                    Memory.temp.cpu.rooms[spawn.room.name + '.collecting'] = (Game.cpu.getUsed() - cpuTime);
                } else {
                    Harvester.run(creep, spawn);
                    Memory.temp.cpu.rooms[spawn.room.name + '.harvesting'] = (Game.cpu.getUsed() - cpuTime);
                }
                break;
            }
            case 'soldier': {
                Soldier.run(creep, spawn);
                Memory.temp.cpu.rooms[spawn.room.name + '.patroling'] = Game.cpu.getUsed() - cpuTime;
                break;
            }
            case 'remoteBuilder': {
                if (RemoteBuilder.run(creep, spawn)) {
                    Memory.temp.cpu.rooms[spawn.room.name + '.building'] = Game.cpu.getUsed() - cpuTime;
                } else {
                    Ugrader.run(creep);
                    Memory.temp.cpu.rooms[spawn.room.name + '.upgrading'] = Game.cpu.getUsed() - cpuTime;
                }
                break;
            }
            default:
                break;
        }
    });
}

function saveStats() {
    Memory.stats['cpu.limit'] = Game.cpu.limit;
    Memory.stats['gcl.progress'] = Game.gcl.progress;
    Memory.stats['gcl.progressTotal'] = Game.gcl.progressTotal;
    Memory.stats['gcl.level'] = Game.gcl.level;
    Memory.stats['cpu.getUsed'] = Game.cpu.getUsed();
    Memory.stats['cpu.bucket'] = Game.cpu.bucket;
    Memory.stats['cpu'] = Memory.temp.cpu;
}

function defendRoom(roomName) {
    const cpuTme = Game.cpu.getUsed();

    let hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    if (hostiles.length > 0) {
        let username = hostiles[0].owner.username;
        Game.notify(`Enemy (${username}) spotted in room ${roomName}`);
        let towers = Game.rooms[roomName].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(_.sortBy(hostiles, [(h) => h.hits])[0]));
    }
    return Game.cpu.getUsed() - cpuTme;
}
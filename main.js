require('./prototype.spawn')();
const Miner = require('./role.miner');
const Carrier = require('./role.carrier');
const Harvester = require('./role.harvester');
const rHarvester = require('./role.rHarvester');
const Ugrader = require('./role.upgrader');
const Builder = require('./role.builder');
const Repairer = require('./role.repairer');
const WallRepairer = require('./role.wallRepairer');
const Claimer = require('./role.claimer');
const Collector = require('./role.collector');
const Soldier = require('./role.soldier');
const rBuilder = require('./role.rBuilder');
const rDismantler = require('./role.rDismantler');


module.exports.loop = () => {

    if (Game.spawns.Spawn1) {
        Game.spawns.Spawn1.memory.MIN_MINERS = 2;
        Game.spawns.Spawn1.memory.MIN_CARRIERS = 2;
        Game.spawns.Spawn1.memory.MIN_COLLECTORS = 1;

        Game.spawns.Spawn1.memory.MIN_HARVESTERS = 0;
        Game.spawns.Spawn1.memory.MIN_REMOTE_HARVESTERS = 1;

        Game.spawns.Spawn1.memory.MIN_UPGRADERS = 2;
        Game.spawns.Spawn1.memory.MIN_BUILDERS = 0;
        Game.spawns.Spawn1.memory.MIN_REPAIRERS = 1;

        Game.spawns.Spawn1.memory.MIN_WALL_REPAIRERS = 0;
        Game.spawns.Spawn1.memory.MIN_SOLDIERS = 0;
        Game.spawns.Spawn1.memory.MIN_REMOTE_BUILDERS = 0;
        Game.spawns.Spawn1.memory.MIN_REMOTE_DISMANTLERS = 0;

        Game.spawns.Spawn1.memory.SOLDIER_DEPLOY_LOCATION = 'W16N21';
        Game.spawns.Spawn1.memory.REMOTE_HARVESTER_TARGET = 'W18N21';
        Game.spawns.Spawn1.memory.REMOTE_DISMANTLER_TARGET = 'W53S46';
        Game.spawns.Spawn1.memory.REMOTE_BUILDER_TARGET = 'W16N21';
    }

    if (Game.spawns.Spawn2) {
        Game.spawns.Spawn2.memory.MIN_MINERS = 2;
        Game.spawns.Spawn2.memory.MIN_CARRIERS = 2;
        Game.spawns.Spawn2.memory.MIN_COLLECTORS = 1;

        Game.spawns.Spawn2.memory.MIN_HARVESTERS = 0;
        Game.spawns.Spawn2.memory.MIN_REMOTE_HARVESTERS = 2;
        Game.spawns.Spawn2.memory.MIN_UPGRADERS =  0;

        Game.spawns.Spawn2.memory.MIN_BUILDERS = 2;
        Game.spawns.Spawn2.memory.MIN_REPAIRERS = 1;
        Game.spawns.Spawn2.memory.MIN_WALL_REPAIRERS = 0;

        Game.spawns.Spawn2.memory.MIN_SOLDIERS = 0;
        Game.spawns.Spawn2.memory.MIN_REMOTE_BUILDERS = 0;
        Game.spawns.Spawn2.memory.MIN_REMOTE_DISMANTLERS = 0;

        Game.spawns.Spawn2.memory.SOLDIER_DEPLOY_LOCATION = 'W16N21';
        Game.spawns.Spawn2.memory.REMOTE_HARVESTER_TARGET = 'W16N22';
        Game.spawns.Spawn2.memory.REMOTE_DISMANTLER_TARGET = 'W53S46';
        Game.spawns.Spawn2.memory.REMOTE_BUILDER_TARGET = 'W16N21';
    }


    // console.log(Game.spawns.Spawn1.createCreep(spawn.room.name, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,CARRY], undefined, {role: 'builder', working: false}));
    //console.log(Game.spawns.Spawn1.createCreep([CLAIM,MOVE], undefined, {role: 'claimer', home:'W17N21',target:'W16N21', working: false}));
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

    let totalMiners = _.filter(creepsSpawnedHere, (c) => {
        return c.memory.role === 'miner'
    }).length;
    
    let totalCarriers = _.filter(creepsSpawnedHere, (c) => {
        return c.memory.role === 'carrier'
    }).length;

    let totalHarvesters = _.filter(_.filter(creepsSpawnedHere, (c) => {
        return c.memory.role === 'harvester'
    })).length;

    let totalrHarversters = _.filter(creepsSpawnedHere, (c) => {
        return c.memory.role === 'rHarvester'
    }).length;

    let totalUpgraders = _.filter(creepsSpawnedHere, (c) => {
        return c.memory.role === 'upgrader'
    }).length;

    let totalBuilders = _.filter(creepsSpawnedHere, (c) => {
        return c.memory.role === 'builder'
    }).length;

    let totalRepairers = _.filter(creepsSpawnedHere, (c) => {
        return c.memory.role === 'repairer'
    }).length;

    let totalWallRepairers = _.filter(creepsSpawnedHere, (c) => {
        return c.memory.role === 'wallRepairer'
    }).length;

    let totalCollectors = _.filter(creepsSpawnedHere, (c) => {
        return c.memory.role === 'collector'
    }).length;

    let totalSoldiers = _.filter(creepsSpawnedHere, (c) => {
        return c.memory.role === 'soldier'
    }).length;

    let totalrBuilders = _.filter(creepsSpawnedHere, (c) => {
        return c.memory.role === 'rBuilder'
    }).length;

    let totalrDismantlers = _.filter(creepsSpawnedHere, (c) => {
        return c.memory.role === 'rDismantler'
    }).length;

    // Memory.stats['rooms.' + spawn.room.name + '.storage.energy'] = spawn.room.storage.store[RESOURCE_ENERGY];

    Memory.stats['rooms.' + spawn.room.name + '.creeps.total'] = creepsSpawnedHere;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.miners'] = totalMiners;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.carriers'] = totalCarriers;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.harvesters'] = totalHarvesters;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.rHarvesters'] = totalrHarversters;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.upgraders'] = totalUpgraders;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.builders'] = totalBuilders;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.repairers'] = totalRepairers;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.wallRepairers'] = totalWallRepairers;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.collectors'] = totalCollectors;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.soldiers'] = totalSoldiers;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.rBuilders'] = totalrBuilders;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.rDismantlers'] = totalrDismantlers;


    if ((!totalMiners || !totalCarriers) && totalHarvesters < 2) {

        let name = spawn.createBalancedCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 'harvester');
        if (!(name < 0)) console.log(`new harvester(${totalHarvesters + 1}) -> ${name}`);
        if ((name === ERR_NOT_ENOUGH_ENERGY && !spawn.memory.MIN_HARVESTERS) || spawn.room.find(FIND_MY_CREEPS).length < 1) {
            name = spawn.createBalancedCreep(spawn.room.name, spawn.room.energyAvailable, 'harvester');
            if (!(name < 0)) console.log(`new basicHarvester(${totalHarvesters + 1}) -> ${name}`);
        }
        // Claim room
    } else if ((totalMiners < spawn.memory.MIN_MINERS) && (totalMiners <= totalCarriers)) {
        let sources = spawn.room.find(FIND_SOURCES);
        for (let source of sources) {
            if (!_.some(creepsSpawnedHere, (c => (c.memory.role === 'miner') && (c.memory.sourceId === source.id)))) {
                if (source.pos.findInRange(FIND_STRUCTURES, 1, {filter: (s) => s.structureType === STRUCTURE_CONTAINER}).length > 0) {
                    let name = spawn.createMiner(spawn.room.name, spawn.room.energyCapacityAvailable, source.id);
                    if (!(name < 0)) console.log(`new miner(${totalMiners + 1}) -> ${name}`);
                    break;
                }
            }
        }
        // Claim room
    } else if (totalCarriers < spawn.memory.MIN_CARRIERS) {
        let name = spawn.createCarrier(spawn.room.name, 1100, 'carrier');
        if (!(name < 0)) console.log(`new carrier(${totalCarriers + 1}) -> ${name}`);
        if ((name === ERR_NOT_ENOUGH_ENERGY && (totalCarriers < 1)) || spawn.room.energyCapacityAvailable < 1100) {
            name = spawn.createCarrier(spawn.room.name, 550, 'carrier');
            if (!(name < 0)) console.log(`new basic carrier(${totalCarriers + 1}) -> ${name}`);
        }
        // Claim room
    } else if (spawn.memory.claimRoom !== undefined) {
        let name = spawn.createClaimer(spawn.room.name, spawn.memory.claimRoom);
        if (!(name < 0)) {
            delete spawn.memory.claimRoom;
            console.log(`new claimer -> ${name}`);
        }

    } else if (totalSoldiers < spawn.memory.MIN_SOLDIERS) {

        let name = spawn.createSoldier(spawn.room.name, 300, spawn.memory.SOLDIER_DEPLOY_LOCATION);
        if (!(name < 0)) console.log(`new soldier(${totalSoldiers + 1}) -> ${name}`);

    } else if (totalrDismantlers < spawn.memory.MIN_REMOTE_DISMANTLERS) {

        let name = spawn.createrDismantlerCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 4, spawn.memory.REMOTE_DISMANTLER_TARGET);
        if (!(name < 0)) console.log(`new remote dismantler(${ +1}) -> ${name}`);

    } else if (totalrHarversters < spawn.memory.MIN_REMOTE_HARVESTERS) {

        let name = spawn.createrHarvesterCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 3, spawn.memory.REMOTE_HARVESTER_TARGET);
        if (!(name < 0)) console.log(`new remote(${totalrHarversters + 1}) -> ${name}`);

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

        let name = spawn.createCarrier(spawn.room.name, 1100, 'collector');
        if (!(name < 0)) console.log(`new collector(${totalCollectors + 1}) -> ${name}`);

    } else if (totalrBuilders < spawn.memory.MIN_REMOTE_BUILDERS) {
        let name = spawn.createrBuilderCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 3, spawn.memory.REMOTE_BUILDER_TARGET);
        if (!(name < 0)) console.log(`new remote builder(${totalrBuilders + 1}) -> ${name}`);
    }

    return Game.cpu.getUsed() - cpuTime;
}

function dispatchRoles(creepsSpawnedHere, spawn) {

    Memory.temp.cpu.rooms[spawn.room.name + '.mining'] = 0;
    Memory.temp.cpu.rooms[spawn.room.name + '.carring'] = 0;
    Memory.temp.cpu.rooms[spawn.room.name + '.harvesting'] = 0;
    // Memory.temp.cpu.rooms[spawn.room.name + '.rHarvesting'] = 0;
    Memory.temp.cpu.rooms[spawn.room.name + '.upgrading'] = 0;
    Memory.temp.cpu.rooms[spawn.room.name + '.building'] = 0;
    Memory.temp.cpu.rooms[spawn.room.name + '.repairing'] = 0;
    Memory.temp.cpu.rooms[spawn.room.name + '.wallRepairing'] = 0;
    Memory.temp.cpu.rooms[spawn.room.name + '.claiming'] = 0;
    Memory.temp.cpu.rooms[spawn.room.name + '.collecting'] = 0;
    Memory.temp.cpu.rooms[spawn.room.name + '.patroling'] = 0;
    // Memory.temp.cpu.rooms[spawn.room.name + '.rBuilding'] = 0;

    creepsSpawnedHere.forEach((creep) => {
        // noinspection JSUnfilteredForInLoop

        if(creep.ticksToLive < 30) creep.say('⌀');


        const cpuTime = Game.cpu.getUsed();
        switch (creep.memory.role) {
            case 'miner': {
                Miner.run(creep, spawn);
                Memory.temp.cpu.rooms[spawn.room.name + '.mining'] = (Game.cpu.getUsed() - cpuTime);
                break;
            }
            case 'carrier': {
                Carrier.run(creep, spawn);
                Memory.temp.cpu.rooms[spawn.room.name + '.carring'] = (Game.cpu.getUsed() - cpuTime);
                break;
            }
            case 'harvester': {
                Harvester.run(creep, spawn);
                Memory.temp.cpu.rooms[spawn.room.name + '.harvesting'] = (Game.cpu.getUsed() - cpuTime);
                break;
            }
            case 'rHarvester': {
                rHarvester.run(creep);
                Memory.temp.cpu.rooms[spawn.room.name + '.harvesting'] = (Game.cpu.getUsed() - cpuTime);
                break;
            }
            case 'rDismantler': {
                rDismantler.run(creep);
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
                } else if (Repairer.run(creep)) {
                    Memory.temp.cpu.rooms[spawn.room.name + '.repairing'] = (Game.cpu.getUsed() - cpuTime);
                } else {
                    Ugrader.run(creep);
                    Memory.temp.cpu.rooms[spawn.room.name + '.upgrading'] = (Game.cpu.getUsed() - cpuTime);
                }
                break;
            }
            case 'repairer': {
                if (Builder.run(creep)) {
                    Memory.temp.cpu.rooms[spawn.room.name + '.building'] = (Game.cpu.getUsed() - cpuTime);
                } else if (Repairer.run(creep)) {
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
                    Carrier.run(creep);
                    Memory.temp.cpu.rooms[spawn.room.name + '.carring'] = (Game.cpu.getUsed() - cpuTime);
                }
                break;
            }
            case 'soldier': {
                Soldier.run(creep, spawn);
                Memory.temp.cpu.rooms[spawn.room.name + '.patroling'] = Game.cpu.getUsed() - cpuTime;
                break;
            }
            case 'rBuilder': {
                if (rBuilder.run(creep, spawn)) {
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
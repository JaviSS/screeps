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
const eCarrier = require('./role.eCarrier');
const rCarrier = require('./role.resourceCarrier');
const Extractor = require('./role.extractor');


module.exports.loop = () => {

    if (!(Game.time % 8)) {


        if (Game.spawns.Spawn1) {
            Game.spawns.Spawn1.memory.MIN_MINERS = 2;
            Game.spawns.Spawn1.memory.MIN_CARRIERS = 1;
            Game.spawns.Spawn1.memory.MIN_COLLECTORS = 1;

            Game.spawns.Spawn1.memory.MIN_HARVESTERS = 0;
            Game.spawns.Spawn1.memory.MIN_REMOTE_HARVESTERS = 2;

            Game.spawns.Spawn1.memory.MIN_UPGRADERS = 3;
            Game.spawns.Spawn1.memory.MIN_REPAIRERS = 0;
            Game.spawns.Spawn1.memory.MIN_BUILDERS = 0;

            Game.spawns.Spawn1.memory.MIN_WALL_REPAIRERS = 0;
            Game.spawns.Spawn1.memory.MIN_SOLDIERS = 0;
            Game.spawns.Spawn1.memory.MIN_REMOTE_BUILDERS = 0;
            Game.spawns.Spawn1.memory.MIN_REMOTE_DISMANTLERS = 0;
            Game.spawns.Spawn1.memory.MIN_EXTRACTORS = 1;

            Game.spawns.Spawn1.memory.MIN_ECARRIERS = 1;
            Game.spawns.Spawn1.memory.MIN_RESOURCE_CARRIER = 0;

            Game.spawns.Spawn1.memory.SOLDIER_DEPLOY_LOCATION = 'W16N21';
            Game.spawns.Spawn1.memory.REMOTE_HARVESTER_TARGETS = ['W18N21', 'W17N22'];
            Game.spawns.Spawn1.memory.REMOTE_DISMANTLER_TARGET = 'W53S46';
            Game.spawns.Spawn1.memory.REMOTE_BUILDER_TARGET = 'W18N22';
            Game.spawns.Spawn1.memory.CLAIMER_TARGET = 'W18N22';

            Game.spawns.Spawn1.memory['market.sell'] = [
                {resource: RESOURCE_LEMERGIUM, minPrice: 0.96, amount: 500}
            ];
        }

        if (Game.spawns.Spawn2) {
            Game.spawns.Spawn2.memory.MIN_MINERS = 2;
            Game.spawns.Spawn2.memory.MIN_CARRIERS = 1;
            Game.spawns.Spawn2.memory.MIN_COLLECTORS = 1;

            Game.spawns.Spawn2.memory.MIN_HARVESTERS = 0;
            Game.spawns.Spawn2.memory.MIN_REMOTE_HARVESTERS = 1;
            Game.spawns.Spawn2.memory.MIN_UPGRADERS = 3;

            Game.spawns.Spawn2.memory.MIN_REPAIRERS = 0;
            Game.spawns.Spawn2.memory.MIN_BUILDERS = 0;
            Game.spawns.Spawn2.memory.MIN_WALL_REPAIRERS = 0;

            Game.spawns.Spawn2.memory.MIN_SOLDIERS = 0;
            Game.spawns.Spawn2.memory.MIN_REMOTE_BUILDERS = 0;
            Game.spawns.Spawn2.memory.MIN_REMOTE_DISMANTLERS = 0;
            Game.spawns.Spawn2.memory.MIN_EXTRACTORS = 0;

            Game.spawns.Spawn2.memory.MIN_ECARRIERS = 1;
            Game.spawns.Spawn2.memory.MIN_RESOURCE_CARRIER = 0;

            Game.spawns.Spawn2.memory.SOLDIER_DEPLOY_LOCATION = 'W16N22';
            Game.spawns.Spawn2.memory.REMOTE_HARVESTER_TARGETS = ['W16N22'];
            Game.spawns.Spawn2.memory.REMOTE_DISMANTLER_TARGET = 'W53S46';
            Game.spawns.Spawn2.memory.REMOTE_BUILDER_TARGET = 'W17N21';
                        Game.spawns.Spawn2.memory.CLAIMER_TARGET = 'W18N22';

            Game.spawns.Spawn2.memory['market.sell'] = [
                {resource: RESOURCE_HYDROGEN, minPrice: .99, amount: 1000}
            ];
        }

        if (Game.spawns.Spawn3) {
            Game.spawns.Spawn3.memory.MIN_MINERS = 2;
            Game.spawns.Spawn3.memory.MIN_CARRIERS = 1;
            Game.spawns.Spawn3.memory.MIN_COLLECTORS = 1;

            Game.spawns.Spawn3.memory.MIN_HARVESTERS = 2;
            Game.spawns.Spawn3.memory.MIN_REMOTE_HARVESTERS = 1;
            Game.spawns.Spawn3.memory.MIN_UPGRADERS = 2;

            Game.spawns.Spawn3.memory.MIN_REPAIRERS = 0;
            Game.spawns.Spawn3.memory.MIN_BUILDERS = 0;
            Game.spawns.Spawn3.memory.MIN_WALL_REPAIRERS = 0;

            Game.spawns.Spawn3.memory.MIN_SOLDIERS = 0;
            Game.spawns.Spawn3.memory.MIN_REMOTE_BUILDERS = 0;
            Game.spawns.Spawn3.memory.MIN_REMOTE_DISMANTLERS = 0;
            Game.spawns.Spawn3.memory.MIN_EXTRACTORS = 1;

            Game.spawns.Spawn3.memory.MIN_ECARRIERS = 1;
            Game.spawns.Spawn3.memory.MIN_RESOURCE_CARRIER = 0;

            Game.spawns.Spawn3.memory.SOLDIER_DEPLOY_LOCATION = 'W16N21';
            Game.spawns.Spawn3.memory.REMOTE_HARVESTER_TARGETS = ['W15N23'];
            Game.spawns.Spawn3.memory.REMOTE_DISMANTLER_TARGET = 'W53S46';
            Game.spawns.Spawn3.memory.REMOTE_BUILDER_TARGET = 'W16N23';
                        Game.spawns.Spawn3.memory.CLAIMER_TARGET = 'W18N22';

            Game.spawns.Spawn3.memory['market.sell'] = [
                {resource: RESOURCE_LEMERGIUM, minPrice: 0.96, amount: 500}
            ];
        }

    }
    // console.log(Game.spawns.Spawn1.createCreep(spawn.room.name, [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,CARRY], undefined, {role: 'builder', working: false}));
    // console.log(Game.spawns.Spawn2.createCreep([CLAIM,MOVE], undefined, {role: 'claimer', home:'W16N21',target:'W14N22', working: false}));
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

        Memory.stats['cpu.rooms.' + spawn.room.name + '.healing'] = healRoom(spawn.room.name);

        if (!(Game.time % 2)) Memory.stats['cpu.rooms.' + spawn.room.name + '.tRepairing'] = repairRoom(spawn.room.name);

        Memory.stats['cpu.rooms.' + spawn.room.name + '.spawning'] = spawnCreeps(creepsSpawnedHere, spawn);

        dispatchRoles(creepsSpawnedHere, spawn);

        Memory.stats['cpu.rooms.' + spawn.room.name + '.trading'] = trade(spawn);


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

    let totaleCarriers = _.filter(creepsSpawnedHere, (c) => {
        return c.memory.role === 'eCarrier'
    }).length;


    let totalExtractors = _.filter(creepsSpawnedHere, (c) => {
        return c.memory.role === 'extractor'
    }).length;

    let totalResourceCarriers = _.filter(creepsSpawnedHere, (c) => {
        return c.memory.role === 'rCarrier'
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
    Memory.stats['rooms.' + spawn.room.name + '.creeps.extractors'] = totalExtractors;
    Memory.stats['rooms.' + spawn.room.name + '.creeps.rCarriers'] = totalExtractors;


    /*if ((!totalMiners || (!totalCarriers && !totalCollectors)) && totalHarvesters < 2) {

        let name = spawn.createBalancedCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 'harvester');
        if (!(name < 0)) console.log(`(${spawn.name}) harvester(${totalHarvesters + 1}) -> ${name}`);
        if ((name === ERR_NOT_ENOUGH_ENERGY && spawn.memory.MIN_HARVESTERS) || spawn.room.find(FIND_MY_CREEPS).length < 1) {
            name = spawn.createBalancedCreep(spawn.room.name, spawn.room.energyAvailable, 'harvester');
            if (!(name < 0)) console.log(`(${spawn.name}) basicHarvester(${totalHarvesters + 1}) -> ${name}`);
        }
        // Claim room
    } else*/

    if (spawn.spawning) {
        spawn.room.visual.text(`${spawn.spawning.name} (${spawn.spawning.remainingTime - 1})`, spawn.pos.x + 1, spawn.pos.y, {align: 'left'});
        return Game.cpu.getUsed() - cpuTime;
    }

    if ((totaleCarriers < 1 && (!totalMiners || (!totalCarriers && !totalCollectors))) || totaleCarriers < spawn.memory.MIN_ECARRIERS) {
        spawn.room.visual.text('eCarrier', spawn.pos.x + 1, spawn.pos.y, {align: 'left'});
        let name = spawn.createEmergencyCarrier(spawn.room.name, 300, 'eCarrier');
        if (!(name < 0)) console.log(`(${spawn.name}) emergency carrier(${totaleCarriers + 1}) -> ${name}`);

    } else if (totalBuilders < spawn.memory.MIN_BUILDERS) {

        spawn.room.visual.text('builder', spawn.pos.x + 1, spawn.pos.y, {align: 'left'});
        let name = spawn.createBalancedCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 'builder');
        if (!(name < 0)) console.log(`(${spawn.name}) builder(${totalBuilders + 1}) -> ${name}`);

    } else if (totalCarriers < spawn.memory.MIN_CARRIERS) {

        spawn.room.visual.text('carrier', spawn.pos.x + 1, spawn.pos.y, {align: 'left'});
        let name = spawn.createCarrier(spawn.room.name, spawn.room.energyCapacityAvailable, 'carrier');
        if (!(name < 0)) console.log(`(${spawn.name}) carrier(${totalCarriers + 1}) -> ${name}`);
        // Claim room
    } else if (totalMiners < spawn.memory.MIN_MINERS) {
        spawn.room.visual.text('miner', spawn.pos.x + 1, spawn.pos.y, {align: 'left'});
        let sources = spawn.room.find(FIND_SOURCES);
        for (let source of sources) {
            if (!_.some(creepsSpawnedHere, (c => (c.memory.role === 'miner') && (c.memory.sourceId === source.id)))) {
                if (source.pos.findInRange(FIND_STRUCTURES, 1, {filter: (s) => s.structureType === STRUCTURE_CONTAINER}).length > 0) {
                    let name = spawn.createMiner(spawn.room.name, spawn.room.energyCapacityAvailable, source.id);
                    if (!(name < 0)) console.log(`(${spawn.name}) miner(${totalMiners + 1}) -> ${name}`);
                    break;
                }
            }
        }
    } else if (totalRepairers < spawn.memory.MIN_REPAIRERS) {

        spawn.room.visual.text('repairer', spawn.pos.x + 1, spawn.pos.y, {align: 'left'});
        let name = spawn.createBalancedCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 'repairer');
        if (!(name < 0)) console.log(`(${spawn.name}) repairer(${totalRepairers + 1}) -> ${name}`);

    } else if (spawn.memory.claimRoom !== undefined) {

        spawn.room.visual.text('claimer', spawn.pos.x + 1, spawn.pos.y, {align: 'left'});
        let name = spawn.createClaimer(spawn.room.name, spawn.memory.CLAIMER_TARGET);
        if (!(name < 0)) {
            delete spawn.memory.claimRoom;
            console.log(`(${spawn.name}) claimer -> ${name}`);
        }

    } else if (totalSoldiers < spawn.memory.MIN_SOLDIERS) {

        spawn.room.visual.text('soldier', spawn.pos.x + 1, spawn.pos.y, {align: 'left'});
        let name = spawn.createSoldier(spawn.room.name, 300, spawn.memory.SOLDIER_DEPLOY_LOCATION);
        if (!(name < 0)) console.log(`(${spawn.name}) soldier(${totalSoldiers + 1}) -> ${name}`);

    } else if (totalCollectors < spawn.memory.MIN_COLLECTORS) {

        spawn.room.visual.text('collector', spawn.pos.x + 1, spawn.pos.y, {align: 'left'});
        let name = spawn.createCarrier(spawn.room.name, spawn.room.energyCapacityAvailable, 'collector');
        if (!(name < 0)) console.log(`(${spawn.name}) collector(${totalCollectors + 1}) -> ${name}`);

    } else if (totalrDismantlers < spawn.memory.MIN_REMOTE_DISMANTLERS) {

        spawn.room.visual.text('dismantler', spawn.pos.x + 1, spawn.pos.y, {align: 'left'});
        let name = spawn.createrDismantlerCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 4, spawn.memory.REMOTE_DISMANTLER_TARGET);
        if (!(name < 0)) console.log(`(${spawn.name}) remote dismantler(${+1}) -> ${name}`);

    } else if (totalrHarversters < spawn.memory.MIN_REMOTE_HARVESTERS) {

        spawn.room.visual.text('rHarvester', spawn.pos.x + 1, spawn.pos.y, {align: 'left'});
        for (let target of spawn.memory.REMOTE_HARVESTER_TARGETS) {
            if (!_.some(creepsSpawnedHere, (c => (c.memory.role === 'rHarvester') && (c.memory.target === target)))) {
                let name = spawn.createrHarvesterCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 3, target);
                if (!(name < 0)) console.log(`(${spawn.name}) rHarvester(${totalrHarversters + 1}) -> ${name}`);
                break;
            }
        }

    } else if (totalUpgraders < spawn.memory.MIN_UPGRADERS) {

        spawn.room.visual.text('upgrader', spawn.pos.x + 1, spawn.pos.y, {align: 'left'});
        let name = spawn.createUpgrader(spawn.room.name, spawn.room.energyCapacityAvailable >= 2200 ? 2200 : spawn.room.energyCapacityAvailable, 'upgrader');
        if (!(name < 0)) console.log(`(${spawn.name}) upgrader(${totalUpgraders + 1}) -> ${name}`);

    } else if (totalWallRepairers < spawn.memory.MIN_WALL_REPAIRERS) {

        spawn.room.visual.text('wRepairer', spawn.pos.x + 1, spawn.pos.y, {align: 'left'});
        let name = spawn.createBalancedCreep(spawn.room.name, 1100, 'wallRepairer');
        if (!(name < 0)) console.log(`(${spawn.name}) wall repairer(${totalWallRepairers + 1}) -> ${name}`);

    } else if (totalrBuilders < spawn.memory.MIN_REMOTE_BUILDERS) {

        spawn.room.visual.text('rBuilder', spawn.pos.x + 1, spawn.pos.y, {align: 'left'});
        let name = spawn.createrBuilderCreep(spawn.room.name, spawn.room.energyCapacityAvailable, 5, spawn.memory.REMOTE_BUILDER_TARGET);
        if (!(name < 0)) console.log(`(${spawn.name}) remote builder(${totalrBuilders + 1}) -> ${name}`);

    } else if (totalExtractors < spawn.memory.MIN_EXTRACTORS) {

        spawn.room.visual.text('extractor', spawn.pos.x + 1, spawn.pos.y, {align: 'left'});
        let name = spawn.createBalancedCreep(spawn.room.name, 1100, 'extractor');
        if (!(name < 0)) console.log(`(${spawn.name}) extractor(${totalExtractors + 1}) -> ${name}`);

    } else if (totalResourceCarriers < spawn.memory.MIN_RESOURCE_CARRIER) {

        spawn.room.visual.text('rCarrier', spawn.pos.x + 1, spawn.pos.y, {align: 'left'});
        let name = spawn.createEmergencyCarrier(spawn.room.name, 300, 'rCarrier');
        if (!(name < 0)) console.log(`(${spawn.name}) resource carrier(${totalResourceCarriers + 1}) -> ${name}`);

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
    Memory.temp.cpu.rooms[spawn.room.name + '.extracting'] = 0;
    // Memory.temp.cpu.rooms[spawn.room.name + '.rBuilding'] = 0;

    creepsSpawnedHere.forEach((creep) => {
        // noinspection JSUnfilteredForInLoop

        if (creep.ticksToLive < 30) creep.say('⌀');


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
            case 'extractor': {
                Extractor.run(creep, spawn);
                Memory.temp.cpu.rooms[spawn.room.name + '.extracting'] = Game.cpu.getUsed() - cpuTime;
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
            case 'eCarrier': {
                eCarrier.run(creep, spawn);
                break;
            }
            case 'rCarrier': {
                rCarrier.run(creep, spawn);
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
        Memory.rooms[roomName + '.defcon'] = 1;
        let username = hostiles[0].owner.username;
        Game.notify(`Enemy (${username}) spotted in room ${roomName}`);
        let towers = Game.rooms[roomName].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(_.sortBy(hostiles, [(h) => h.hits])[0]));
    } else {
        Memory.rooms[roomName + '.defcon'] = 0;
    }
    return Game.cpu.getUsed() - cpuTme;
}

function healRoom(roomName) {
    const cpuTme = Game.cpu.getUsed();

    let creeps = Game.rooms[roomName].find(FIND_MY_CREEPS);
    if (creeps.length > 0) {
        let towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.heal(Game.rooms[roomName].find(FIND_MY_CREEPS, {filter: (c) => c.hits < c.hitsMax})[0]));
    }
    return Game.cpu.getUsed() - cpuTme;
}

function repairRoom(roomName) {
    const cpuTme = Game.cpu.getUsed();
    if (Memory.rooms[roomName + '.defcon'] === 1) return Game.cpu.getUsed() - cpuTme;

    let structure = Game.getObjectById(Game.rooms[roomName].memory['repairing']);

    if (structure
        && (!(structure.structureType !== STRUCTURE_WALL && structure.structureType !== STRUCTURE_RAMPART && (structure.hits < (structure.hitsMax * 0.9)))
            || (structure.structureType === STRUCTURE_WALL && structure.hits < 100000)
            || (structure.structureType === STRUCTURE_RAMPART && structure.hits < 100000))) structure = undefined;

    if (!structure) {
        structure = Game.rooms[roomName].find(FIND_STRUCTURES, {
            filter: (s) =>
                ((s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART && (s.hits < (s.hitsMax * 0.9)))
                    || (s.structureType === STRUCTURE_WALL && s.hits < 100000)
                    || (s.structureType === STRUCTURE_RAMPART && s.hits < 100000))
        })[0];
    }

    if (structure) {
        Game.rooms[roomName].memory['repairing'] = structure.id;
        let towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.repair(structure));
        if (structure.hits === structure.hitsMax) delete Game.rooms[roomName].memory['repairing'];
    }

    return Game.cpu.getUsed() - cpuTme;
}

function trade(spawn) {

    const cpuTme = Game.cpu.getUsed();

    if (!spawn.room.terminal || (Game.time % 10)) return Game.cpu.getUsed() - cpuTme;
    spawn.memory['market.sell'].forEach((selling) => {

        if (!selling) return Game.cpu.getUsed() - cpuTme;

        if (spawn.room.terminal.store[RESOURCE_ENERGY] >= selling.amount && spawn.room.terminal.store[selling.resource] >= selling.amount) {

            let orders = Game.market.getAllOrders(o =>
                o.resourceType === selling.resource
                && o.type === ORDER_BUY
                && Game.market.calcTransactionCost(selling.amount, spawn.room.name, o.roomName) < selling.amount * 1.5
            );

            orders.sort((a, b) => b.price - a.price);
            for (let i = 0; i < orders.length; i++) {
                if (orders[i].price >= selling.minPrice) {
                    if (!(Game.market.deal(orders[i].id, selling.amount, spawn.room.name) < 0)) {
                        Memory.stats['credits'] = Game.market.credits;
                        console.log(`sold (${selling.amount}) ${selling.resource} for -> ${Math.round(orders[i].price * selling.amount)}cr (unit price ${orders[i].price}) (spent ${Game.market.calcTransactionCost(selling.amount, spawn.room.name, orders[i].roomName)} energy)`);
                        break;
                    }
                }
            }
        }
    });
    return Game.cpu.getUsed() - cpuTme;
}
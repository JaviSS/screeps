module.exports = () => {

    const names = ["Samira", "Kishan", "Malaikah", "Ravi", "Alice", "Laylah", "Maya", "Kinsley", "Sumaiyah", "Ellesha", "Shane", "Dayna", "Sara", "Mohsin", "Avni", "Ayyan", "Sorcha", "Tamzin", "Elouise", "Joan", "Gail", "Danish", "Shea", "Haydon", "Olaf", "Dawson", "Zena", "Sierra", "Sahra", "Khloe", "Laurence", "Luc", "Suman", "Terry", "Cassius", "Jenny", "Marek", "Haiden", "Mae", "Rojin", "Nigel", "Nazia", "Mohammed", "Jermaine", "Declan", "Shae", "Haleema", "Keegan"];

    StructureSpawn.prototype.createBalancedCreep = function (home, energy, role) {

        let numberOfParts = Math.floor((energy < 1200 ? energy : 1200) / 200);
        let body = [];

        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK);
        }

        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY);
        }

        for (let i = 0; i < Math.round(numberOfParts / 2); i++) {
            body.push(MOVE);
        }

        let name = names[Math.floor(Math.random() * names.length)] + ` (${role.substr(0, 2)})`;
        let status = this.spawnCreep(body, name, {
            memory: {
                role,
                working: false,
                home
            }
        });

        while (status === ERR_NAME_EXISTS) {
            name = names[Math.floor(Math.random() * names.length)] + ` (${role.substr(0, 2)})`;
            status = this.spawnCreep(body, name, {
                memory: {
                    role,
                    working: false,
                    home
                }
            });
        }
        return status < 0 ? status : name;
    };

    StructureSpawn.prototype.createUpgrader = function (home, energy, role) {

        let numberOfParts = Math.floor(energy / 450);
        let body = [];

        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK);
            body.push(WORK);
            body.push(CARRY);
            body.push(CARRY);
            body.push(CARRY);
            body.push(CARRY);
            body.push(MOVE);
        }

        let name = names[Math.floor(Math.random() * names.length)] + ` (${role.substr(0, 2)})`;
        let status = this.spawnCreep(body, name, {
            memory: {
                role,
                working: false,
                home
            }
        });

        while (status === ERR_NAME_EXISTS) {
            name = names[Math.floor(Math.random() * names.length)] + ` (${role.substr(0, 2)})`;
            status = this.spawnCreep(body, name, {
                memory: {
                    role,
                    working: false,
                    home
                }
            });
        }
        return status < 0 ? status : name;
    };

    StructureSpawn.prototype.createrHarvesterCreep = function (home, energy, numberOfWorkParts, target) {

        let body = [];
        // let numberOfParts = Math.floor((energy < 1500 ? energy : 1500) / 200);

        for (let i = 0; i < 4; i++) {
            body.push(WORK);
        }

        for (let i = 0; i < 6; i++) {
            body.push(CARRY);
        }

        for (let i = 0; i < 10; i++) {
            body.push(MOVE);
        }

        let name = names[Math.floor(Math.random() * names.length)] + ` (${'rHarvester'.substr(0, 2)})`;
        let status = this.spawnCreep(body, name, {
            memory: {
                role: 'rHarvester',
                working: false,
                iterations: 0,
                home,
                target
            }
        });

        while (status === ERR_NAME_EXISTS) {
            name = names[Math.floor(Math.random() * names.length)] + ` (${'rHarvester'.substr(0, 2)})`;
            status = this.spawnCreep(body, name, {
                memory: {
                    role: 'rHarvester',
                    working: false,
                    iterations: 0,
                    home,
                    target
                }
            });
        }
        return status < 0 ? status : name;
    };

    StructureSpawn.prototype.createrDismantlerCreep = function (home, energy, numberOfWorkParts, target) {

        let body = [];

        for (let i = 0; i < numberOfWorkParts; i++) {
            body.push(WORK);
            energy -= 150;
        }

        let numberOfParts = Math.floor(energy / 100);

        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY);
        }

        for (let i = 0; i < numberOfParts + numberOfWorkParts; i++) {
            body.push(MOVE);
        }

        let name = names[Math.floor(Math.random() * names.length)] + ` (${'rDismantler'.substr(0, 2)})`;
        let status = this.spawnCreep(body, name, {
            memory: {
                role: 'rDismantler',
                working: false,
                iterations: 0,
                home,
                target
            }
        });

        while (status === ERR_NAME_EXISTS) {
            name = names[Math.floor(Math.random() * names.length)] + ` (${'rDismantler'.substr(0, 2)})`;
            status = this.spawnCreep(body, name, {
                memory: {
                    role: 'rDismantler',
                    working: false,
                    iterations: 0,
                    home,
                    target
                }
            });
        }
        return status < 0 ? status : name;
    };

    StructureSpawn.prototype.createrBuilderCreep = function (home, energy, target) {

        let numberOfParts = Math.floor((energy < 1200 ? energy : 1200) / 200);

        let body = [];

        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK);
            energy -= 100;
        }

        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY);
        }

        for (let i = 0; i < numberOfParts - 2; i++) {
            body.push(MOVE);
        }

        let name = names[Math.floor(Math.random() * names.length)] + ` (${'rBuilder'.substr(0, 2)})`;
        let status = this.spawnCreep(body, name, {
            memory: {
                role: 'rBuilder',
                working: false,
                iterations: 0,
                home,
                target
            }
        });

        while (status === ERR_NAME_EXISTS) {
            name = names[Math.floor(Math.random() * names.length)] + ` (${'rBuilder'.substr(0, 2)})`;
            status = this.spawnCreep(body, name, {
                memory: {
                    role: 'rBuilder',
                    working: false,
                    iterations: 0,
                    home,
                    target
                }
            });
        }
        return status < 0 ? status : name;

    };

    StructureSpawn.prototype.createClaimer = function (home, target) {
        let name = this.createCreep([CLAIM, MOVE], undefined, {role: 'claimer', home, target});
        if (!(name < 0)) Memory.creeps[name].name = `${name} (claimer)`;
        return name;
    };

    /*StructureSpawn.prototype.createSoldier = function (home, energy, target) {

        let numberOfParts = Math.floor(energy / 900);
        let body = [];

        for (let i = 0; i < 10; i++) {
            body.push(MOVE);
        }

        for (let i = 0; i < 40; i++) {
            body.push(TOUGH);
        }

        let name = this.createCreep(body, undefined, {role: 'soldier', working: false, home, target});
        if (!(name < 0)) Memory.creeps[name].name = `${name} (soldier)`;
        return name;

    };
*/
    StructureSpawn.prototype.createSoldier = function (home, energy, target) {

        let body = [];

        for (let i = 0; i < 2; i++) {
            body.push(MOVE);
        }

        for (let i = 0; i < 4; i++) {
            body.push(ATTACK);
        }


        let name = names[Math.floor(Math.random() * names.length)] + ` (${'soldier'.substr(0, 2)})`;
        let status = this.spawnCreep(body, name, {
            memory: {role: 'soldier', working: false, home, target}
        });

        while (status === ERR_NAME_EXISTS) {
            name = names[Math.floor(Math.random() * names.length)] + ` (${'soldier'.substr(0, 2)})`;
            status = this.spawnCreep(body, name, {
                memory: {role: 'soldier', working: false, home, target}
            });
        }
        return status < 0 ? status : name;

    };

    StructureSpawn.prototype.createMiner = function (home, energy, sourceId) {

        let body = [];

        body.push(MOVE);

        for (let i = 0; i < 6; i++) {
            body.push(WORK);
        }

        let name = names[Math.floor(Math.random() * names.length)] + ` (${'miner'.substr(0, 2)})`;
        let status = this.spawnCreep(body, name, {
            memory: {role: 'miner', working: false, home, sourceId}
        });

        while (status === ERR_NAME_EXISTS) {
            name = names[Math.floor(Math.random() * names.length)] + ` (${'miner'.substr(0, 2)})`;
            status = this.spawnCreep(body, name, {
                memory: {role: 'miner', working: false, home, sourceId}
            });
        }
        return status < 0 ? status : name;

    };

    StructureSpawn.prototype.createCarrier = function (home, energy, role) {

        let numberOfParts = Math.floor(((energy < 1100 ? energy : 1100) / 100));
        let body = [];


        for (let i = 0; i < Math.round(numberOfParts / 2); i++) {
            body.push(MOVE);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY);
        }

        let name = names[Math.floor(Math.random() * names.length)] + ` (${role.substr(0, 2)})`;

        let status = this.spawnCreep(body, name, {
            memory: {
                role,
                working: false,
                home
            }
        });
        while (status === ERR_NAME_EXISTS) {
            name = names[Math.floor(Math.random() * names.length)] + ` (${role.substr(0, 2)})`;
            status = this.spawnCreep(body, name, {
                memory: {
                    role,
                    working: false,
                    home
                }
            });
        }
        return status < 0 ? status : name;

    };

    StructureSpawn.prototype.createEmergencyCarrier = function (home, energy, role) {

        let numberOfParts = Math.floor((energy / 50) / 2);
        let body = [];


        for (let i = 0; i < numberOfParts - 1; i++) {
            body.push(MOVE);
        }
        for (let i = 0; i < numberOfParts + 1; i++) {
            body.push(CARRY);
        }

        let name = names[Math.floor(Math.random() * names.length)] + ` (${role.substr(0, 2)})`;

        let status = this.spawnCreep(body, name, {
            memory: {
                role,
                working: false,
                home
            }
        });
        while (status === ERR_NAME_EXISTS) {
            name = names[Math.floor(Math.random() * names.length)] + ` (${role.substr(0, 2)})`;
            status = this.spawnCreep(body, name, {
                memory: {
                    role,
                    working: false,
                    home
                }
            });
        }
        return status < 0 ? status : name;

    };
};

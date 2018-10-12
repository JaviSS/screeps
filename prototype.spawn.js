module.exports = () => {
    StructureSpawn.prototype.createBalancedCreep = function (home, energy, roleName) {

        let numberOfParts = Math.floor(energy / 200);
        let body = [];
        let unbalanceNumberOfParts = energy > 800 ? 2 : 0;

        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK);
        }

        for (let i = 0; i < numberOfParts + unbalanceNumberOfParts; i++) {
            body.push(CARRY);
        }

        for (let i = 0; i < numberOfParts - unbalanceNumberOfParts; i++) {
            body.push(MOVE);
        }

        let name = this.createCreep(body, undefined, {role: roleName, working: false, home});
        if (!(name < 0)) Memory.creeps[name].name = `${name} (${roleName})`;
        return name;
    };

    StructureSpawn.prototype.createremoteHarvesterCreep = function (home, energy, numberOfWorkParts, target) {

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

        let name = this.createCreep(body, undefined, {
            role: 'remoteHarvester',
            working: false,
            iterations: 0,
            home,
            target
        });

        if (!(name < 0)) Memory.creeps[name].name = `${name} (remoteHarvester)`;
        return name;
    };

    StructureSpawn.prototype.createRemoteDismantlerCreep = function (home, energy, numberOfWorkParts, target) {

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

        let name = this.createCreep(body, undefined, {
            role: 'remoteDismantler',
            working: false,
            iterations: 0,
            home,
            target
        });

        if (!(name < 0)) Memory.creeps[name].name = `${name} (remoteDismantler)`;
        return name;
    };

    StructureSpawn.prototype.createRemoteBuilderCreep = function (home, energy, numberOfWorkParts, target) {

        let body = [];

        for (let i = 0; i < numberOfWorkParts; i++) {
            body.push(WORK);
            energy -= 150;
        }

        let numberOfParts = Math.floor(energy / 100);

        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY);
        }

        for (let i = 0; i < numberOfParts; i++) {
            body.push(MOVE);
        }

        let name = this.createCreep(body, undefined, {
            role: 'remoteBuilder',
            working: false,
            iterations: 0,
            home,
            target
        });

        if (!(name < 0)) Memory.creeps[name].name = `${name} (remoteBuilder)`;
        return name;
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

         let numberOfParts = Math.floor(energy / 980);
         let body = [];

         for (let i = 0; i < 2; i++) {
             body.push(MOVE);
         }

         for (let i = 0; i < 11; i++) {
             body.push(ATTACK);
         }

         let name = this.createCreep(body, undefined, {role: 'soldier', working: false, home, target});
         if (!(name < 0)) Memory.creeps[name].name = `${name} (soldier)`;
         return name;

     };
};

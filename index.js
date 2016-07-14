var Service, Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  
  homebridge.registerAccessory("homebridge-fake", "Fakestuff", FakeAccessory);
}

function FakeAccessory(log, config) {
  this.log = log;
  this.name = "FakeLock";
  this.service = new Service.LockMechanism(this.name);
  
  this.service
    .getCharacteristic(Characteristic.LockCurrentState)
    .on('get', this.getState.bind(this));
  
  this.service
    .getCharacteristic(Characteristic.LockTargetState)
    .on('get', this.getState.bind(this))
    .on('set', this.setState.bind(this));

  this.service
    .setCharacteristic(Characteristic.LockCurrentState, Characteristic.LockTargetState.SECURED);
}

FakeAccessory.prototype.getState = function(callback) {
  this.log("Getting current state...");
  callback(null, this.service.getCharacteristic(Characteristic.LockCurrentState) == Characteristic.LockTargetState.SECURED);
}
  
FakeAccessory.prototype.setState = function(state, callback) {
  this.service.setCharacteristic(Characteristic.LockCurrentState, state);
  //var lockitronState = (state == Characteristic.LockTargetState.SECURED) ? "lock" : "unlock";

  this.log("Set state to %s", state);
}

FakeAccessory.prototype.getServices = function() {
  return [this.service];
}
const Seismometer = require('./seismometer');
const communicator = require('./communicator');

function main() {
  const communicator = new Communicator();

  const seismometer = new Seismometer();
  seismometer.watch();

  communicator.connect().then(() => {
    console.log('Connected to', communicator.port.path);

    seismometer.on('quake', info => {
      console.log(`Quake! At ${info.date} with a magnitude of ${info.magnitude}`);
      communicator.send(info);
    });
  });
}

main();

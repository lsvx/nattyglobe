(function (io) {
    // as soon as this file is loaded, connect automatically,
    var socket = io.connect();
    console.log('Connecting to Sails.js...');

    socket.on('connect', function socketConnected() {

        // By default, sails publishes messages on the 'message' channel.
        // Model-specific messages are published on channels with the same name as
        // that model.
        // Listen for Comet messages from Sails
        socket.on('location', function messageReceived(message) {
            ///////////////////////////////////////////////////////////
            // Replace the following with your own custom logic
            // to run when a new message arrives from the Sails.js
            // server.
            ///////////////////////////////////////////////////////////
            globe.parsePoints([message]);
            //////////////////////////////////////////////////////

        });

        // The globe just connected to sails. Let's get the data!
        socket.get('/ready', function(res) {
            globe.parsePoints(res);
            globe.autoUpdate();
        });
    });

    // Expose connected `socket` instance globally so that it's easy
    // to experiment with from the browser console while prototyping.
    window.socket = socket;
})(
    window.io
);

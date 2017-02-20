/**
 * Created by igor on 19.02.17.
 */
'use strict';
require("babel-register");
const server = require('./src/server').default;
const PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
    console.log('Server listening on', PORT);
});
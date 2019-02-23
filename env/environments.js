let path = require("path");

process.argv.forEach( (val, index, argsArray) => {
    
    if(!argsArray[2]){
        console.log("pass env=dev, env=prod or env=devlocal parameter");
        return false;;
    }
    var arg = argsArray[2].split("=");

    if (arg.length > 0) {
        if (arg[0] === 'env') {
            let modulePath = path.resolve( __dirname + "/"+ arg[1] + '.props');
            let env = require(modulePath);
            module.exports = env;
        }
    }
});

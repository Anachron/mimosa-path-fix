var path    = require ( 'path' ),
    config  = require ( 'config.js' );

var _fixPaths = function( mimosaConfig, options, next ) {
  // Check if there are any input files
  var files = options.files;
  var hasFiles = files && files.length > 0;

  // Check if there are any fixes available
  var fixes = mimosaConfig.pathFix.files;
  var hasFixes = fixes !== undefined;

  // If not having input or fix, return
  if (!hasFiles || !hasFixes) {
    return next();
  }

  // Check all files
  files.forEach( function(file, i) {
    var filePath = path.normalize( file.inputFileName );
    var data = file.outputFileText;

    // If there is a fix for the file
    if ( fixes[filePath] !== undefined ) {
      mimosaConfig.log.info( 'Fixing asset [[ ' + filePath + ' ]]' );

      // ... iterate through all fixes
      for ( var fileFix in fixes[filePath] ) {
        // ... and replace the paths
        data = data.replace (
          _fixRegExp( fileFix ),
          fixes[filePath][fileFix]
        );
      }
      // ... and replace the file data
      files[i].outputFileText = data;
    }

    // if at the end, invoke the next workflow step
    if (i === files.length - 1) {
      return next();
    }
  });
};

var _fixRegExp = function( string ) {
  return new RegExp( string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1" ), 'g' );
};

var registration = function( mimosaConfig, register ) {
  // If enabled, register into workflow
  if ( mimosaConfig.pathFix.enabled ) {
    register( ['add', 'update', 'buildExtension', 'buildFile'], 'beforeWrite', _fixPaths, mimosaConfig.pathFix.extensions );
  }
};

module.exports = {
  registration: registration,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate
};

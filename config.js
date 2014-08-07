"use strict";

exports.defaults = function() {
  return {
    pathFix: {
      enabled: true,
      extensions: ['css'],
      files: {}
    }
  };
};

exports.placeholder = function() {
  return
    "\t\n\n" +
    "  pathFix:\n" +
    "    enabled: true                # whether to enable plugin or not\n" +
    "    extensions: ['css']          # array of extensions to parse\n" +
    "    files: {}                    # Json-Object of files to fix\n" +
    "                                 # Use $cssVendor$, $jsVendor$ & $sourceDir$ as magic variables\n" +
};

exports.validate = function(config, validators) {
  var errors = [];

  if ( validators.ifExistsIsObject( errors, "pathFix", config.pathFix ) ) {
    validators.ifExistsIsBoolean( errors, "pathFix.enabled", config.pathFix.enabled );
    validators.ifExistsIsArrayOfStrings( errors, "pathFix.extensions", config.pathFix.extensions );
    validators.ifExistsIsObject( errors, "pathFix.files", config.pathFix.files );
  }

  // Overwrite all variables in path with their correct paths
  for ( var file in config.pathFix.files ) {
    var value = config.pathFix.files[file];
    delete config.pathFix.files[file];
    config.pathFix.files[ path.normalize(file
      .replace( '$sourceDir$', config.watch.sourceDir )
      .replace( '$cssVendor$', config.vendor.stylesheets )
      .replace( '$jsVendor$', config.vendor.javascripts )
    ) ] = value;
  }

  return errors;
};

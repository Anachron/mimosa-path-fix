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
    validators.ifExistsIsArray( errors, "pathFix.extensions", config.pathFix.extensions );
    validators.ifExistsIsObject( errors, "pathFix.files", config.pathFix.files );
  }

  return errors;
};

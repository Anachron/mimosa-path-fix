mimosa-path-fix
===========

## Overview

This module will modify asset paths, making it easy to pull new stuff with bower and external libraries that will still work in your own project structure.

### Why?

Nowadays we have a lot of things to handle,- our own assets, like javascripts, stylesheets, fonts and more. Tools like bower/ender greatly help to minimize dependency management, but cause another problem: Paths inside stylesheets and scripts are based on the vendor opinions, not on the project. This tool allows you to update your dependencies without needing to fix the paths everytime a new version has been pulled.

### Why not just update the assets?

If you are using Bower to manage project dependencies, then updating those dependencies is a bad idea because they will just get overwritten. So this module does its work after Bower has pulled in dependencies.

For more information regarding Mimosa, see http://mimosa.io

## Usage

Add `'path-fix'` to your list of modules. That's all! Mimosa will install the module for you when you start `mimosa watch` or `mimosa build`.

## Functionality

This module will get invoked everytime a file is getting changed and checks this file with the list of fixes that you provide. When a file that should be fixed is processed, it will swap the paths and pass it correctly back to the mimosa workflow, allowing for further manipulation, like minification or cleaning.

## Default Config

```javascript
pathFix: {
  enabled: true,
  extensions: ['css'],
  files: {}
}
```

* `enabled`: Boolean whether to enable this plugin or not
* `extensions`: Array of extensions to parse for this plugin
* `files`: JSON-Object of files to parse. Use paths for keys, and an JSON-Object as value. This value-JSON will include the current path as key and the correct path as value. Can use magic variables like `$cssVendor$`, `$jsVendor$` and `$sourceDir$`.
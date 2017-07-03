# jQueryModulDummy

This is a first step module template for jquery plugins. It contains some methods to activate / deactivate the plugin on the fly, some options and callbacks. All of my plugin starts with this code.

Happy coding!

## HowTo

```
(function($){$(function(){

 /* Whole body */
 $.pluginName( object Options );
 
 /* With Container */
 $('.container').pluginName( object Options );
 
});})(jQuery);
```

## Options

You find the default values at the top of the script. Search for the variable *standardOptions*;

- debug: true, (Print some debug info in console)
- enabled: true, (Enables the plugin)
- loadImagesFirst: true, (wait for load images)
- container: window, (container for width and hight)
- after: function(){}, (callback for the beginning of intern method loaded)
- before: function(){}, (callback for the end of intern method loaded)

## Simple Test

Just replace pluginName with your plugin name

```
$.pluginName({
  before: function(){console.log('Load before');},
  after: function(){console.log('Load after');}
});

$('.container').pluginName({
  before: function(){console.log('Load before');},
  after: function(){console.log('Load after');}
});
```

## Run Methods directly

```
$.pluginName('enable', object Options);
$('.container').pluginName('enable', object Options);

$.pluginName('disable', object Options);
$('.container').pluginName('disable', object Options);
```

## Default options

You can config your plugin with global default options now. Every instance will use'em.

```
// Plugin name = 'specialSlider'
$.specialSliderDefault.delay = 2000;
$.specialSliderDefault.slideEffect = 'fade';

$.specialSlider(); // delay will be 2000; slideEffect will be fade
// ... 
$.specialSlider(); // delay will be 2000; slideEffect will be fade
```

## Changelog

### 3.0

- Better Image preload
- Global default options

### 2.0

- Feature: Keep standardOption in head to work with origin standard values in methods after initialization
- Feature: Return method data insteat of the jQuery object if return data is set
- New: Callme(); Run this method $("selector").pluginName('callme', {some:'data'}); it will return a string.

### 1.0

- Creating template
- New Enable/Disable method
- New: Some Callbacks

- [ ] Filter
	- [ ] Multiselect-Formfield
	- [ ] Definiert die Angaben im Chart, Legende und Skalierung
- Tabelle
	- [x] Siehe Charts/Tabellen

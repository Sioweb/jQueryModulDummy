# jQueryModulDummy

This is a first step module template for jquery plugins. It contains some methods to activate / deactivate the plugin on the fly, some options and callbacks. All of my plugin starts with this code.

Happy coding!

##HowTo

```
(function($){$(function(){

 /* Whole body */
 $.pluginName( object Options );
 
 /* With Container */
 $('.container').pluginName( object Options );
 
});})(jQuery);
```

##Options

- debug: true, (Print some debug info in console)
- enabled: true, (Enables the plugin)
- loadImagesFirst: true, (wait for load images)
- container: window, (container for width and hight)
- after: function(){}, (callback for the beginning of intern method loaded)
- before: function(){}, (callback for the end of intern method loaded)

##Simple Test

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
##Run Methods directly

```
$.pluginName('enable', object Options);
$('.container').pluginName('enable', object Options);

$.pluginName('disable', object Options);
$('.container').pluginName('disable', object Options);
```

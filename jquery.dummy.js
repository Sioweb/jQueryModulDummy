(function($){

  "use strict";

  var pluginName = 'specialSlider',
      /* Enter PluginOptions */
      standardOptions = {
	      debug: true,
	      enabled: true,
	      loadImagesFirst: true,
	      container: window,
	      after: function(){},
	      before: function(){},
	    },

  PluginClass = function() {

    var selfObj = this,
        img = null;
    this.item = false;

    this.initOptions = new Object(standardOptions);
    
    this.init = function(elem) {
      selfObj = this;

      if(!this.container)
        this.container = window;
      this.elem = elem;
      this.item = $(this.elem);
      this.container = $(this.container);

      if(!selfObj.enabled)
        return;
      
      if(this.loadImagesFirst && (this.item.prop("tagName").toLowerCase() === 'img' || this.item.find('img').length > 0)) {
        img = $('.image img');
        if(img.length > 0) {
          img.bind('load',function() {
            img.loaded = true;
            selfObj.loaded(1);
          }).each(function(){ if(this.complete) $(this).trigger('load');});
        }
      } else { this.loaded(); }

      if(this.debug) console.log('Plugin "'+pluginName+'" initialized');
    };

    this.disable = function() {
      clearTimeout(selfObj.scrollTimeOut);
      selfObj.enabled = false;
    };

    this.enable = function() {
      selfObj.enabled = true;
    };

    this.loaded = function() {
      if(!selfObj.enabled)
        return;

      selfObj.internBefore();
      if(selfObj.debug) console.log('Plugin loaded',(arguments[0]?'with images':'without images'));
      selfObj.internAfter();
    };

    this.internBefore = function() {
      if(!selfObj.enabled)
        return;
      selfObj.before();
    };

    this.internAfter = function() {
      if(!selfObj.enabled)
        return;
      selfObj.after();
    };

    this.callme = function(newData) {
    	console.log("Called this method with data:",data);
    	return "Success!";
    };
  };

  $[pluginName] = $.fn[pluginName] = function(settings) {
    var element = typeof this === 'function'?$('html'):this,
        newData = arguments[1]||{},
        returnElement = [];
        
    returnElement[0] = element.each(function(k,i) {
      var pluginClass = $.data(this, pluginName),
          args = Array.prototype.slice.call(arguments);

      if(!settings || typeof settings === 'object' || settings === 'init') {

        if(!pluginClass) {
          if(settings === 'init')
            settings = args[1] || {};
          pluginClass = new PluginClass();

          var newOptions = new Object(pluginClass.initOptions);

          /* Space to reset some standart options */

          /***/

          if(settings)
            newOptions = $.extend(true,{},newOptions,settings);
          pluginClass = $.extend(newOptions,pluginClass);
          /** Initialisieren. */
          pluginClass.init(this);
          $.data(this, pluginName, pluginClass);
        } else {
          return;
        }
      } else if(!pluginClass) {
        return;
      } else if(pluginClass[settings]) {
        var method = settings;
        returnElement[1] = pluginClass[method](newData);
      } else {
        return;
      }
    });

    if(returnElement[1] !== undefined) return returnElement[1];
    return returnElement[0];

  };
  
})(jQuery);

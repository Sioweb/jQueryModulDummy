(function($){

  "use strict";

  var pluginName = 'specialSlider',
      /* Enter PluginOptions */
      standardOptions = {
	      debug: true,
	      enabled: true,
	      container: window,
	      isHtml: false,
	      images: null,
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
      this.isHTML = selfObj.elem.tagName.toLowerCase() === 'html';
      
      if(this.images !== null) {
        var img = this.item.find(this.images),
            loaded = 0;

        if(img.length) {
          img.bind('load',function() {
            if(loaded == img.length)
              selfObj.loaded();
          }).each(function(){ if(this.complete) {loaded++;$(this).trigger('load');}});
        } else this.loaded();
      } else this.loaded();
    };

    this.disable = function() {
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
      var pluginClass = $.data(this, pluginName);

      if(!settings || typeof settings === 'object' || settings === 'init') {

        if(!pluginClass) {
          if(settings === 'init')
            settings = arguments[1] || {};
          pluginClass = new PluginClass();

          var newOptions = new Object(pluginClass.initOptions);

          /* Space to reset some standart options */

          /***/

          if(settings)
            newOptions = $.extend(true,{},newOptions,settings);
          pluginClass = $.extend(newOptions,pluginClass);
          /** Initialisieren. */
          this[pluginName] = pluginClass;
          pluginClass.init(this);
          if(element.prop('tagName').toLowerCase() !== 'html')
          	$.data(this, pluginName, pluginClass);
        } else {
	  pluginClass.init(this,1);
	  if(element.prop('tagName').toLowerCase() !== 'html')
	    $.data(this, pluginName, pluginClass);
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

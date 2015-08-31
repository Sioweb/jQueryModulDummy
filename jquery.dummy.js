(function($){

  "use strict";

  var pluginName = 'specialSlider',
      /* Enter PluginOptions */

  PluginClass = function() {

    var selfObj = this,
        img = null;
    this.item = false;
    
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
  };

  $[pluginName] = $.fn[pluginName] = function(settings) {
    var element = typeof this === 'function'?$('html'):this;
    return element.each(function(k,i) {
      var pluginClass = $.data(this, pluginName),
          standardOptions = {
            debug: true,
            enabled: true,
            loadImagesFirst: true,
            container: window,
            after: function(){},
            before: function(){},
          },
          args = Array.prototype.slice.call(arguments);

      if(!settings || typeof settings === 'object' || settings === 'init') {

        if(!pluginClass) {
          if(settings === 'init')
            settings = args[1] || {};

          pluginClass = new PluginClass();
          if(settings)
            standardOptions = $.extend(standardOptions,settings);
          pluginClass = $.extend(standardOptions,pluginClass);
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
        pluginClass[method]();
      } else {
        return;
      }
    });

  };
  
})(jQuery);

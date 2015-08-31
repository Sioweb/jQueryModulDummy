(function($){

  "use strict";

  var pluginName = 'pluginName',
      /* Enter PluginOptions */
      standardOptions = {
        enabled: settings.enabled||true,
        container: settings.container||window,
      },

  PluginClass = function() {

    var selfObj = this;
    this.item = false;
    
    this.init = function(elem) {
      selfObj = this;

      if(!this.container)
        this.container = window;
      this.elem = elem;
      this.item = $(this.elem);
      this.container = $(this.container);
    };

    this.disable = function() {
      clearTimeout(selfObj.scrollTimeOut);
      selfObj.enabled = false;
    };

    this.enable = function() {
      selfObj.enabled = true;
    };
  };

  $.fn[pluginName] = function(settings) {

    return this.each(function(k,i) {
      var PluginClass = $.data(this, pluginName),
          args = Array.prototype.slice.call(arguments);
      

      if(typeof settings === 'object' || settings === 'init' || !settings) {

        if(!PluginClass) {
          if(settings === 'init')
            settings = args[1] || {};

          PluginClass = new PluginClass();

          PluginClass = $.extend(settings,PluginClass);
          
          PluginClass = $.extend(standardOptions,PluginClass);
          
          /** Initialisieren. */
          PluginClass.init(this);
          $.data(this, pluginName, PluginClass);
        } else {
          // $.error('Plugin is already initialized for this object.');
          return;
        }
      } else if(!PluginClass) {
        // $.error('Plugin is not initialized for this object yet.');
        return;
      } else if(PluginClass[settings]) {
        var method = settings;
        PluginClass[method]();
      } else {
        // $.error('Method ' +  settings + ' does not exist on jQuery.pluginName.');
        return;
      }
    });

  };
  
})(jQuery);

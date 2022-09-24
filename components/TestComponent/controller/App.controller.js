sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "../model/formatter",
    "sap/ui/model/json/JSONModel",
], function(
    Controller,
    formatter,
    JSONModel
  ) {
    "use strict";
  
    return Controller.extend(
      "com.sample.app.ui5.demo.components.TestComponent.controller.App",
      {
        formatter: formatter,
  
        onInit: function() {
        }
      }
    );
  });
  
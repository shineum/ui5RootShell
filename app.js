sap.ui.require([
    "sap/m/Shell",
    "sap/ui/core/ComponentContainer",
], function(
    Shell, 
    ComponentContainer, 
) {
    "use strict";
    
    //Set root component at content div
    new Shell({
        appWidthLimited:false,
        app: new ComponentContainer({
            async: true,
            name: "com.sample.app.ui5.demo.rootShellComponent",
            height: "100%"
        })
    }).placeAt("content");
});
  
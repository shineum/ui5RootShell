sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "../model/formatter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/HashChanger",
    "sap/ui/core/Fragment",
], function(
    Controller,
    formatter,
    JSONModel,
    HashChanger,
    Fragment,
  ) {
    "use strict";     
  
    return Controller.extend(
      "com.sample.app.ui5.demo.rootShellComponent.controller.App",
      {
        formatter: formatter,
  
        onInit: function() {
          this.oModel = new JSONModel({
            shellBar: {
              logo: {
                imgUrl: sap.ui.require.toUrl("com/sample/app/ui5/demo/rootShellComponent/imgs/phenix_red.svg")
              }
              , menuButton: {
                show: false
              }
              , copilot: {
                show: false
              }
              , avatar: {
                initials: "IU"
              }
              , notification: {
                show: false
                , number: 0
              }
              , productSwitcher: {
                show: false
              }
            }
            , iconTabBar: {
              selectedKey: "", items: [], idxMap: {}
            }
            , input: {
              user: "", password: "", imgUrl: sap.ui.require.toUrl("com/sample/app/ui5/demo/rootShellComponent/imgs/phenix_red.svg")
            }
          });
          this.getView().setModel(this.oModel);

          // check login
          this._setPageLogin();
        }

        , _setPage: function(pFragment) {
          var tRootPage = this.byId("rootPage");
          tRootPage.destroyContent();          
          tRootPage.addContent(pFragment);
        }

        , _setPageLogin: function() {
          // var tFragment = sap.ui.xmlfragment("com.sample.app.ui5.demo.rootShellComponent.fragments.Login", this);
          // // tFragment.setModel(this.oModel);
          // this._setPage(tFragment);
          Fragment.load({
            id: "rootFragmentLogin",
            name: "com.sample.app.ui5.demo.rootShellComponent.fragments.Login",
            controller: this,
          }).then((pFragment) => {
            this._setPage(pFragment);
          });
        }

        , _setPageHome: function() {
          // var tFragment = sap.ui.xmlfragment("com.sample.app.ui5.demo.rootShellComponent.fragments.Home", this);
          // // tFragment.setModel(this.oModel);
          // this._setPage(tFragment);        
          Fragment.load({
            id: "rootFragmentHome",
            name: "com.sample.app.ui5.demo.rootShellComponent.fragments.Home",
            controller: this,
          }).then((pFragment) => {
            this._setPage(pFragment);
          });

          // set home menu
          this._setPageHomeMenuItems();
        }

        , _setPageHomeMenuItems: function() {
          if (!this.isHomeMenuItemsLoaded) {
            this.isHomeMenuItemsLoaded = true;

            var toModel = new JSONModel();
            toModel.loadData(sap.ui.require.toUrl("com/sample/app/ui5/demo/components/componentList.json"), null, false);

            var tObj = toModel.getData();
            var tCfgPaths = {};      
            var toData = [];
            var tSemanticObjIdxMap = {};
            tObj.results.forEach((pItem, pIdx) => {
              var tText = pItem.text || "";
              var tKey = pItem.semanticObj || "";
              var tNameSpace = pItem.nameSpace || "";
              var tComponentName = [tNameSpace, (pItem.componentName || "")].join(".");
              var tIcon = pItem.icon || "";
              tCfgPaths[tNameSpace.split(".").join("/")] = "./components";
              toData.push({text: tText, key: tKey, name: tComponentName, icon: tIcon});
              tSemanticObjIdxMap[tKey] = pIdx;
            });
            sap.ui.loader.config({paths: tCfgPaths});
            this.oModel.setProperty("/iconTabBar/items", toData);
            this.oModel.setProperty("/iconTabBar/idxMap", tSemanticObjIdxMap);

            var tSelectedKey = null;
            if (!HashChanger.getInstance().getHash()) {
              tSelectedKey = (this.oModel.getProperty("/iconTabBar/items")[0] || {}).key;
              HashChanger.getInstance().setHash(tSelectedKey);
            } else {
              tSelectedKey = HashChanger.getInstance().getHash().split("/")[0];
            }
            this.oModel.setProperty("/iconTabBar/selectedKey", tSelectedKey);
          }
        }

        , onPressLogin: function() {
          this._setPageHome();
        }

        , onSelectIconTabBar: function(pEvt) {
          var tSemanticObj = pEvt.getSource().getSelectedKey();
          HashChanger.getInstance().setHash(tSemanticObj);
        }

        , onMenuButtonPress: function(pEvt) {
          console.log("Menu Button");
        }
      }
    );
  });
  
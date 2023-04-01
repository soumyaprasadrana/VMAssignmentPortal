var app = angular.module("app.viewRouter", []);
app.service("routingService", function($rootScope) {
  var views = {};
  var history = [];

  this.registerView = function(name, config) {
    views[name] = config;
  };

  this.getView = function(name) {
    return views[name];
  };

  this.goToPrevPage = function(index) {
    const view = history[index].name;
    history = history.splice(0, index - 1);
    this.goToPage(view);
  };

  this.goToPage = function(name, data) {
    var view = views[name];
    if (view) {
      if (typeof name != "undefined")
        history.push({ name: this.currentView, data: this.currentData });
      this.currentView = name;
      this.currentData = data;
      $rootScope.$broadcast("routingService:update", history);
    }
  };

  this.getHistory = function() {
    return history;
  };

  this.goBack = function() {
    var previous = history.pop();
    if (previous) {
      this.currentView = previous.name;
      this.currentData = previous.data;
    }
  };
});
app.directive("view", function(routingService, $controller, $compile) {
  return {
    restrict: "E",
    terminal: true,
    priority: 1000,
    compile: function(element, attrs) {
      var name = attrs.name;
      var config = {
        template: attrs.templateUrl,
        controller: attrs.controller,
        controllerAs: attrs.controllerAs,
        title: attrs.title,
      };
      routingService.registerView(name, config);
      element.remove();
      return function(scope, element) {};
    },
  };
});

app.directive("pageView", function(routingService, $controller, $compile) {
  return {
    restrict: "A",
    terminal: true,
    priority: 1000,
    compile: function(element, attrs) {
      return function(scope, element) {
        scope.$watch(
          function() {
            return routingService.currentView;
          },
          function(view) {
            if (typeof view == "undefined") return;
            var viewConfig = routingService.getView(view);
            var template = viewConfig.template;
            var controller = viewConfig.controller;
            var controllerAs = viewConfig.controllerAs;
            var data = routingService.currentData;
            var ctrl = null;
            if (data) {
              scope["data"] = data;
            }
            if (template) {
              if (controller) {
                ctrl = $controller(controller, { $scope: scope });
                if (controllerAs) {
                  scope[controllerAs] = ctrl;
                }
              }
              var compiled = $compile(`<div ng-include="'${template}'"></div>`)(
                scope
              );
              element.empty().append(compiled);
            }
          }
        );
      };
    },
  };
});

app.directive("viewRouterBreadcrumb", function(routingService) {
  return {
    restrict: "E",
    template:
      '<nav ng-if="crumbs.length!=0" aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item" ng-repeat="crumb in crumbs"><a style="cursor: pointer;" ng-if="crumb.name !== currentView" ng-click="goTo(crumb.index)">{{ crumb.label }}</a><span ng-if="crumb.name === currentView">{{ crumb.label }}</span></li></ol></nav>',
    link: function(scope, element, attrs) {
      scope.crumbs = [];
      scope.currentView = routingService.currentView;

      function updateCrumbs() {
        var history = routingService.getHistory();
        scope.crumbs = [];

        for (var i = 0; i < history.length; i++) {
          var view = routingService.getView(history[i].name);
          if (view) {
            scope.crumbs.push({
              name: history[i].view,
              label: view.title,
              index: i,
            });
          }
        }
        if (routingService.currentView) {
          scope.crumbs.push({
            name: routingService.currentView,
            label: routingService.getView(routingService.currentView).title,
          });
        }
      }

      updateCrumbs();

      scope.goTo = function(index) {
        routingService.goToPrevPage(index);
      };

      scope.$on("routingService:update", function() {
        scope.currentView = routingService.currentView;
        updateCrumbs();
      });
    },
  };
});

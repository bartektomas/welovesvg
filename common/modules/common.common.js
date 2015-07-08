!function(e){"use strict";var n=e.module("common.common",["ngSanitize","ngTouch","ngAnimate","ui.router","common.extensions","common.config","common.locale","digestLogger"]);n.run(["config","locale","debug","$injector",function(e,n,o,t){o.enabled=o.enabled&&e.debug.enabled,o.ns("config")(e),o.ns("locale")(n),t.get("page")}]),e.module("common.common").config(["configProvider",function(e){e.defaults({debug:{enabled:!1},page:{baseUrl:"",title:""}})}]),e.module("common.common").config(["localeProvider",function(e){e.locale("en"),e.dictionary({Hello:"Hello","%s cat":{one:"%s cat",other:"%s %n cats"}})}]),n.config(["configProvider",function(e){e({debug:{enabled:!1,ns:{}},router:{html5Mode:!0},sce:{enabled:!0}})}]),n.config(["$locationProvider","$sceProvider","configProvider",function(e,n,o){var t;t=o.get(),e.html5Mode(t.router.html5Mode),n.enabled(t.sce.enabled)}]),n.service("page",[function(){}]),n.factory("copyObject",[function(){return e.copy}]),n.service("debug",["config",function(e){var n,o,t={};n=function(e){var n;return n=function(){for(var e,o=[],t=0;t<arguments.length;t++)o[t]=arguments[t];return(e=n).log.apply(e,$traceurRuntime.spread(o))},Object.defineProperty(n,"enabled",{get:function(){return this._enabled&&o._enabled},set:function(e){this._enabled=e},enumerable:!0,configurable:!0}),n.enabled=!1,n.log=function(){for(var n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];this.enabled&&(e&&n.unshift(e),console.log.apply(console,n))},n},o=new n,o.ns=function(e){return e?t.hasOwnProperty(e)?t[e]:t[e]=new n(e):this};var r=e.debug||{},c=r.ns||{};return o.enabled=r.enabled||!1,Object.keys(c).forEach(function(e){var n=c[e]||{};o.ns(e).enabled=n.enabled||!1}),o}]),n.factory("mergeObjects",[function(){function e(e){function n(e,o){return!e||!o||"object"!=typeof e||"object"!=typeof o||Array.isArray(e)||Array.isArray(o)||e instanceof Date||o instanceof Date?o:(Object.keys(o).forEach(function(t){e[t]=e.hasOwnProperty(t)?n(e[t],o[t]):o[t]}),e)}for(var o=[],t=1;t<arguments.length;t++)o[t-1]=arguments[t];return o.reduce(function(e,o){return n(e,o)},e)}return e}]),n.service("path",[function(){this.join=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return e.length?e.map(function(e){return String(e||"").trim()}).reduce(function(e,n){var o,t;for(t=e.length-1,o=0;t>=0&&"/"==e[t];t--)o++;for(;o>0&&n.length>0&&"/"==n[0];o--)n=n.slice(1);return e&&n&&"/"!=e[e.length-1]&&"/"!=n[0]&&(e+="/"),e+n}):""}}])}(angular);
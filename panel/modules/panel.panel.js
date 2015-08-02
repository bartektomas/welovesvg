!function(e){"use strict";var n=e.module("panel.panel",["common.common","panel.extensions","common.popover","webicon","hljs"]);e.module("panel.panel").config(["configProvider",function(e){e.defaults({debug:{enabled:!1},page:{baseUrl:"",title:"We Love SVG"}})}]),e.module("panel.panel").config(["localeProvider",function(e){e.locale("en"),e.dictionary({Hello:"Hello","%s cat":{one:"%s cat",other:"%s %n cats"}})}]),n.config(["configProvider",function(e){e({collections:{names:["fa","win10","color-icons","foundation","material","glyphicons","icomoon","ion","webhostinghub","entypo","elusive","wpf","mfglabs","raphael","simple-line","weather","lsf","linecons","meteocons","metrize","octicons","iconic","maki","openwebicons","stroke7","typicons","zocial","brandico","fontelico","stateface"]}})}]),n.directive("collectionIcons",["jQuery",function(e){return{restrict:"E",scope:{collection:"=",search:"="},templateUrl:"components/collectionIcons.html",link:function(n,t){var i;n.popover=i={opened:!1,handler:null,icon:null,color:"#32c24d"},Object.defineProperty(i,"element",{get:function(){return e(t).find("[popover]:eq(0)")}}),n.showIconPopover=function(n,t){var c;c=e(t.target),i.handler=c.hasClass("icon")?c:c.parent(".icon"),i.icon=n},n.$watch("popover.opened",function(n){var t,c,o;n&&(t=i.element,c=i.handler.offset(),o=e(t).offset(),t.css({left:c.left-o.left,top:c.top-o.top}))}),n.$watch("collection",function(){i.opened=!1})}}}]),n.directive("collectionSelect",[function(){return{restrict:"E",templateUrl:"components/collectionSelect.html",scope:{collections:"="}}}]),n.directive("page",[function(){return{restrict:"E",templateUrl:"components/page.html"}}]),n.directive("searchIconsPanel",["ViewIconCollections","config",function(e,n){return{restrict:"E",templateUrl:"components/searchIconsPanel.html",link:function(t){t.search="",t.collections=new e(n.collections.names),t.$watch("search",function(){t.collections.search(t.search)})}}}]),n.directive("searchInput",[function(){return{restrict:"E",scope:{search:"="},templateUrl:"components/searchInput.html"}}]),n.factory("Icon",["humanize",function(e){var n=function(){function n(e){this.id=e,this.init()}return $traceurRuntime.createClass(n,{init:function(){this.label=e(this.id)}},{})}();return n}]),n.factory("IconCollection",["EventEmitterFactory","humanize","lunr",function(e,n,t){var i=function(e){function i(e){$traceurRuntime.superConstructor(i).call(this),this.id=e,this.icons=[],this.idIndex=new Map,this.init()}return $traceurRuntime.createClass(i,{init:function(){this.label=n(this.id),this.initSearchIndex()},initSearchIndex:function(){this.searchIndex=t(function(){this.field("label"),this.ref("id"),this.pipeline.remove(t.stopWordFilter)})},clear:function(){this.icons.length=0},addIcons:function(){var e,n=void 0!==arguments[0]?arguments[0]:[],t=this;(e=this.icons).push.apply(e,$traceurRuntime.spread(n)),n.forEach(function(e){t.searchIndex.add(e),t.idIndex.set(e.id,e)}),this.emit("update")},search:function(e){var n=this;return e||0===e?this.searchIndex.search(e).map(function(e){return n.idIndex.get(e.ref)}):this.icons.slice()}},{},e)}(e);return i}]),n.factory("IconCollectionRemote",["IconCollection","Icon","$webicon","$q",function(e,n,t,i){var c=function(e){function c(e){$traceurRuntime.superConstructor(c).call(this,e)}return $traceurRuntime.createClass(c,{init:function(){$traceurRuntime.superGet(this,c.prototype,"init").call(this),this.promise=i.when(),this.initialized=!1,this.pending=!1},loadCollection:function(){var e,c=this;return this.promise.cancel&&this.promise.cancel(),this.pending=!0,e=this.promise=i.when(t.preload(this.id).iconSets[this.id]).then(function(t){var i,o;return e&&e.cancelled?c:(c.pending=!1,i=t&&t.hasOwnProperty("collection")?t.collection:t||[],o=Array.from(i.filter(function(e){return e&&e._resource&&e._resource.icons}).map(function(e){return Object.keys(e._resource.icons)}).reduce(function(e,n){return(n||[]).forEach(function(n){return e.add(n)}),e},new Set)).map(function(e){return new n(e)}),c.clear(),c.addIcons(o),c.initialized=!0,c)}),e.cancel=function(){return e.cancelled=!0},e}},{},e)}(e);return c}]),n.factory("ViewIcon",[function(){var e=function(){function e(e){this.icon=e,this.init()}return $traceurRuntime.createClass(e,{init:function(){this.visible=!0}},{})}();return e}]),n.factory("ViewIconCollection",["ViewIcon","IconCollection","IconCollectionRemote",function(e,n,t){var i=function(){function i(e){this.init(),this.setCollection(e)}return $traceurRuntime.createClass(i,{setCollection:function(e){var i=this;e instanceof n||(e=new t(e)),this.collection=e,this.clearViews(),this.addIcons(e.icons),this.collection.on("update",function(){i.clearViews(),i.addIcons(i.collection.icons)})},clearViews:function(){this.views.length=0},addIcons:function(n){this.addViews(n.map(function(n){return new e(n)}))},addViews:function(e){var n;(n=this.views).push.apply(n,$traceurRuntime.spread(e))},init:function(){this.collection=null,this.views=[],this.visible=!0},search:function(e){var n,t;return n=this.collection.search(e),t=new Set(n.map(function(e){return e.id})),this.views.forEach(function(e){e.visible=t.has(e.icon.id)}),this}},{})}();return i}]),n.factory("ViewIconCollections",["ViewIconCollection","IconCollectionRemote",function(e,n){var t=function(){function t(e){this.init(),this.setCollections(e)}return $traceurRuntime.createClass(t,{init:function(){this.views=[],this.current=null,this.searchText=null},clear:function(){this.views.length=0,this.current=null},setCollections:function(e){var n=this;this.clear(),(e||[]).forEach(function(e){return n.addCollection(e)})},addCollection:function(n){var t;t=new e(n),this.views.push(t),this.current||this.setCurrent(t)},isCurrent:function(e){return this.current===e},setCurrent:function(e){var t=this;this.current=e,e.collection instanceof n&&!e.collection.initialized?e.collection.loadCollection().then(function(){t.searchText&&e.search(t.searchText)}):this.searchText&&this.current.search(this.searchText)},search:function(e){this.searchText=e,this.current&&this.current.search(e)}},{})}();return t}]),n.config(["$provide",function(e){e.decorator("page",["$delegate",function(e){var n=e;return n}])}]),n.factory("lunr",function(){return lunr}),e.module("panel.panel").run(["$templateCache",function(e){e.put("components/collectionIcons.html",'<div ng-if="collection.collection.pending"><center><spinner></spinner></center></div><div ng-if="!collection.collection.pending" shift="collection" popover-manager="popover.opened"><div ng-repeat="icon in ::collection.views track by icon.icon.id" ng-show="icon.visible" popover-open="" ng-click="showIconPopover(icon, $event)" class="icon"><webicon icon="{{::collection.collection.id}}:{{::icon.icon.id}}"></webicon><div style="font-size: .7em" highlight-text="{{::icon.icon.label}}" highlight-text-needle="{{$parent.search}}" highlight-text-from-word-start="true" class="icon-label"></div></div><div popover="" class="icon-popover"><div class="icon-popover-icon-box"><webicon icon="{{collection.collection.id}}:{{::popover.icon.icon.id}}" ng-style="{color: popover.color}"></webicon></div><div hljs="" language="html" source="\'%3Cwebicon%20icon%3D%22{{collection.collection.id}}:{{::popover.icon.icon.id}}&quot;/&gt;\' | unescape" class="icon-popover-code"></div></div></div>'),e.put("components/collectionSelect.html",'<button ng-repeat="item in collections.views track by item.collection.id" ng-class="{\'btn-primary\': collections.isCurrent(item), \'btn-default\': !collections.isCurrent(item)}" ng-click="collections.setCurrent(item)">{{::item.collection.label}}</button>'),e.put("components/page.html",'<search-icons-panel></search-icons-panel><center><span>by</span> <a href="https://icons8.com">Icons8</a><br/></center>'),e.put("components/searchIconsPanel.html",'<div class="header"><h1>We Love SVG<sup>β</sup></h1><div class="row"><div class="col-md-10 col-md-offset-1"><collection-select collections="collections"></collection-select></div><div class="col-md-6 col-md-offset-3"><search-input search="search"></search-input></div></div></div><div class="body"><div class="col-md-10 col-md-offset-1"><collection-icons search="search" collection="collections.current"></collection-icons></div></div>'),e.put("components/searchInput.html",'<input type="text" ng-model="search" placeholder="Search"/>')}])}(angular);
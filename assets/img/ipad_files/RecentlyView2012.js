NEG.Module("Biz.Common.RecentlyView2012", function (require) {var $ = require("NEG.ThirdParty.JQuery");var storage = require('Biz.Storage');var resourceMananger = require("Biz.UI.ResourceManager");var viewport = require("NEG.Widget.Viewport");function recentlyView(moduleType, hasBloomReach, enableLazyLoad) {var getParameters = function () {var result = "";var viewItems = storage.getItem("ItemViewed");if (viewItems) {var recentlyitems = "";for (var i = 0; i < viewItems.length; i++) {recentlyitems = recentlyitems + viewItems[i].split("|")[0] + "#";}result = "v=" + escape(recentlyitems);if (Web.Config.RecentlyViewPrimaryItem) {result += "&item=" + Web.Config.RecentlyViewPrimaryItem;}}var innerKeywords = storage.getItem("ItemInnerSearchKeywords");if (innerKeywords) {var keyValue = innerKeywords.split("|");if (keyValue.length >= 2) {result += (result === "" ? "k=" : "&k=") + escape(keyValue[1]);}}return result;};var getDataNow = function () {var script = document.getElementById("recentlyView2012AjaxJS");if (script && script != null) {document.getElementsByTagName('head')[0].removeChild(script);}script = document.createElement("script");script.type = "text/javascript";script.id = 'recentlyView2012AjaxJS';script.src = resourceMananger.Url.www("Common/Ajax/RecentlyView2012.aspx") + "?" + getParameters() + "&type=" + moduleType;document.getElementsByTagName('head')[0].appendChild(script);};var api = {getData: function () {if (enableLazyLoad) {var views = [$("#recentlyViewed2013")[0]];var lazyloadViewport = viewport(views);lazyloadViewport.on("FIRSTIN", function () {getDataNow();});} else {getDataNow();}},renderData: function (pData) {if (pData.length > 0) {if (moduleType == 0) {document.getElementById("boxViewed").innerHTML = pData;} else {var content = $(pData);var recentlyViewed = content.length > 0 ? $(content[0]) : null;var recentlySearch = content.length > 1 ? $(content[1]) : null;if (recentlyViewed) {$("#recentlyViewed2013").attr("class", recentlyViewed.attr("class")).html(recentlyViewed.html()).css("display", "");}if (recentlySearch) {$("#recentlySearch2013").attr("class", recentlySearch.attr("class")).html(recentlySearch.html()).css("display", "");}if (!recentlyViewed && !hasBloomReach) {$("#boxViewedContent").css("display", "none");}}};var loader = document.getElementById("loader_recentlyView");if (loader) {loader.style.display = "none";}}};return api;}return recentlyView;});
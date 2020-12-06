﻿var RuntimeVersion = "1.0.070307";
///////////////////////////////////////////
/////////// Debug Functions ///////////////
///////////////////////////////////////////
//*****************************************
//warning do not change these comment lines
//++[debug function begin]++
//*****************************************
var debug = {
    initialize: function () {
        debug.isEnabled = Sys.Web.Cookies.Helper.get(debug.CookieName).toString() == debug.CookieValue;
    },
    CookieName: "GgewenDebug",
    CookieValue: "Y",
    enabled: function () {
        var hc = new Sys.Web.Cookies.HttpCookie(debug.CookieName, debug.CookieValue);
        var dt = new Date();
        dt.setYear(dt.getFullYear() + 1);
        hc.expires = dt;
        Sys.Web.Cookies.Helper.save(hc);
        debug.isEnabled = true;
        alert("Ggewen Framework Debug Enabled!");
    },
    disabled: function () {
        var hc = new Sys.Web.Cookies.HttpCookie(debug.CookieName);
        var dt = new Date();
        dt.setYear(dt.getFullYear() - 1);
        hc.expires = dt;
        Sys.Web.Cookies.Helper.save(hc);
        debug.isEnabled = false;
        alert("Ggewen Framework Debug Disabled!");
    },
    isEnabled: false,
    cache: [],
    assert: function (c, t, d) {
        if (!c) {
            t = String.parse(t);
            if (String.isNullOrEmpty(t)) {
                t = "Assert....";
            };
            d = String.parse(d);
            if (!String.isNullOrEmpty(d)) {
                d += "\n\n";
            };
            debug.output(t, d);
            d += "Press any key to continue...";
            debug.alert(t + "\n\n" + d);
        };
    },
    alert: function (d) {
        if (debug.isEnabled == null) { debug.initialize(); };
        if (debug.isEnabled) {
            alert(d);
        };
    },
    output: function (t, v, s) {
        if (null == (o = $("debugGgewenFrameworkOutput")) && (!window.readyState || window.readyState != "complete")) {
            window.attachEvent("onload", (function () {
                debug._output(t, v, s);
            }));
            return;
        };
        debug._output(t, v, s);
    },
    _output: function (t, v, s) {
        if (debug.isEnabled == null) { debug.initialize(); };
        if (debug.isEnabled) {
            var o;
            if (null == (o = $("debugGgewenFrameworkOutput"))) {
                //main
                o = Web.UI.Control.create("div", { "id": "debugGgewenFramework" });
                Web.UI.Control.appendChild(document.body, o);
                o.style.position = "absolute";
                o.style.right = "0px";
                o.style.top = "0px";
                o.style.backgroundColor = "transparent";
                o.style.width = "300px";
                o.style.height = "250px";
                o.style.fontSize = "10px";
                o.style.textAlign = "left";
                o.style.display = "none";
                o.style.zIndex = "9999";
                var op = [];
                op.add("<div id='debugGgewenFrameworkOperation'>");
                op.add("<input id='debugGgewenFrameworkOperationClear' type='button' value='Clear' style='font-size:10px;'>");
                op.add("&nbsp;&nbsp;<input id='debugGgewenFrameworkOperationCopy' type='button' value='Copy' style='font-size:10px;' disabled>");
                op.add("&nbsp;&nbsp;<input id='debugGgewenFrameworkOperationClose' type='button' value='Close' style='font-size:10px;color:red;'>");
                op.add("</div><div id='debugGgewenFrameworkOutput'></div>");
                o.innerHTML = op.join("");
                op = [];

                //operation
                o = $("debugGgewenFrameworkOperation");
                o.style.position = "absolute";
                o.style.right = "5px";
                o.style.top = "2px";
                o.style.width = "300px";
                o.style.textAlign = "center";
                o.style.fontSize = "10px";
                o.style.border = "1px solid gray";
                o.style.backgroundColor = "#f0f0f0";

                //output
                o = $("debugGgewenFrameworkOutput");
                o.style.position = "absolute";
                o.style.right = "5px";
                o.style.top = "28px";
                o.style.width = "290px";
                o.style.height = "220px";
                o.style.overflow = "auto";
                o.style.backgroundColor = "#f0f0f0";
                o.style.border = "1px solid gray";
                o.style.padding = "5px";

                $("debugGgewenFrameworkOperationClear").attachEvent("onclick", (function () { $("debugGgewenFrameworkOutput").innerHTML = ""; debug.cache = []; }));
                $("debugGgewenFrameworkOperationCopy").attachEvent("onclick", (function () { }));
                $("debugGgewenFrameworkOperationClose").attachEvent("onclick", (function () { $("debugGgewenFrameworkOutput").innerHTML = ""; debug.cache = []; $("debugGgewenFramework").style.display = "none"; }));
            };
            var op = [];
            op.add("<div><font color=blue>[ " + (new Date()).toGMTString() + " ]</font></div>");
            if (!String.isNullOrEmpty(t)) { op.add("<div><strong>[ " + String.parse(t).encodeHtml() + " ]</strong></div>"); };
            op.add("<div><ul style='font-size:10px;margin:0;padding:0;'>");
            if (Object.getTypeName(v) != "Array") {
                v = [v];
            };
            for (var i = 0; i < v.length; ++i) {
                if (!Object.isNull(v[i])) {
                    op.add("<li>" + String.parse(v[i]).encodeHtml() + "</li>");
                } else {
                    op.add("<li>" + v[i] + "</li>");
                };
            };
            op.add("</ul></div>");
            if (!String.isNullOrEmpty(t)) {
                op.add("<hr style='margin:10px 0 5px 0;'>");
            };
            debug.cache.addRange(op);
            Web.UI.Control.replaceInnerHTML(o, debug.cache.join("\n"));
            op = [];
            o.scrollTop = o.scrollHeight;
            $("debugGgewenFramework").style.display = "block";
            if (s) { debug.alert("Press any key to continue..."); };
        };
    }
};
//*****************************************
//warning do not change these comment lines
//++[debug function end]++
//*****************************************

//Static methods or attributes of Function.
Function.__classes = {};
Function._typeName = "Function";

//Empties the function.
Function.emptyFunction = function () { };

//Parses the specified function name.
Function.parse = function (n) {
    if (String.isNullOrEmpty(n)) {
        return null;
    };
    var fn = Function.__classes[n];
    if (!fn) {
        var nsp = n.split(".");
        var ro = window;
        for (var i = 0; i < nsp.length; i++) {
            ro = fn = ro[nsp[i]];
            if (!fn) {
                break;
            };
        };
        if (typeof (fn) !== "function") {
            fn = null;
        } else {
            Function.__classes[n] = fn;
        };
    };
    return fn;
};

//Static methods or attributes of Object.
Object._typeName = "Object";

//Gets the instance type.
Object.getType = function (instance) {
    if (!Object.isNull(instance)) {
        var ctor = instance.constructor;
    };
    if (!ctor || (typeof (ctor) !== "function") || !ctor._typeName) {
        return Object;
    };
    return instance.constructor;
};

//Gets the name of the type.
Object.getTypeName = function (instance) {
    return Object.getType(instance)._typeName;
};

//Determines whether the specified type is null.
Object.isNull = function (o) {
    return (null == o || undefined == o);
};

//Initialize Object from JSON format.
Object.fromJSON = function (text) {
    try {
        return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\tnew Date\([0-9]\)]/.test(text.replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + text + ')');
    } catch (e) {
        return false;
    };
};

//add these serialization functions for JSON2
Object.parseJSON = function (text, filter) {
    try {
        return JSON.parse(text, filter);
    } catch (e) { }
    return false;
};

Object.stringifyJSON = function (object) {
    try {
        return JSON.stringify(object);
    } catch (e) { }
    return false;
};

Object.clone = function (s) {
    var tp = Object.getTypeName(s);
    var o = s;
    switch (tp) {
        case Array._typeName:
            o = [];
            for (var i = 0; i < s.length; ++i) {
                o.add(Object.clone(s[i]));
            };
            break;
        case Object._typeName:
            o = {};
            for (var n in s) {
                o[n] = Object.clone(s[n]);
            };
            break;
            defalt:
                break;
    };
    return o;
};


//Static methods or attributes of Boolean.
Boolean._typeName = "Boolean";

//Parses bool type.
Boolean.parse = function (v) {
    if (typeof (v) === "string") {
        return (v.trim().toLowerCase() === "true");
    };
    return v ? true : false;
};

//Static methods of Number.
Number._typeName = "Number";

//Determines whether the specified value is numeric.
Number.isNumeric = function (v) {
    return ((v - 0).toString() !== "NaN");
};

//Parses the specified value.
Number.parse = function (v) {
    if (!v || (v.length == 0)) {
        return 0;
    };
    return parseFloat(v);
};

//Static methods or attributes of String.
String._typeName = "String";

//Determines whether [is null or empty] [the specified value].
String.isNullOrEmpty = function (v) {
    return !(typeof (v) === "string" && v.length != 0);
};

//Parses the specified value.
String.parse = function (v) {
    return String.tryParse(v, "");
};

String.tryParse = function (v, d) {
    if (Object.isNull(v) || !(v["toString"])) {
        return d;
    };
    return v.toString();
};

String.format = function () {
    if (arguments.length == 0)
        return "";
    if (arguments.length == 1)
        return arguments[0];
    var reg = /{(\d+)?}/g;
    var args = arguments;
    var result = arguments[0].replace(reg, function ($0, $1) { return args[parseInt($1) + 1]; });
    return result;
};

//Static methods or attributes of Array.
Array._typeName = "Array";

//Static methods or attributes of Date.
Date._typeName = "Date";

//Tries the parse.
Date.tryParse = function (v, d) {
    if (Object.isNull(v)) {
        return d;
    };
    if (!(v instanceof Date)) {
        v = new Date(v.toString());
    };
    return v != "NaN" ? v : d;
};

//Static methods or attributes of Error.
Error._typeName = "Error";

//Get an instance of Function to define methods or attributes.
var __fp = Function.prototype;

//Gets the type of the base.
__fp.getBaseType = function () {
    return this._baseType;
};

//Gets the type name.
__fp.getName = function () {
    return this._typeName;
};

//Initializes the class.
__fp.initializeClass = function (instance, args, base) {
    var baseType, o, f;
    if (this._baseType) {
        if (null !== (baseType = Function.parse(this._baseType))) {
            if (args) {
                baseType.apply(instance, args);
            } else {
                baseType.apply(instance);
            };
            baseType = null;
            if (base) {
                for (o in base) {
                    if (typeof (f = instance[o]) === "function") {
                        base[o] = f;
                    };
                };
            };
        };
    };
    if (this._interfaces) {
        var interfaces = this._interfaces;
        for (var i = 0; i < interfaces.length; ++i) {
            if (null !== (baseType = Function.parse(interfaces[i]))) {
                baseType.call(instance);
                baseType = null;
            };
        };
    };
};

//Registers the class.
__fp.registerClass = function (typeName, baseType, interfaceType) {
    if (!String.isNullOrEmpty(typeName) && !Function.__classes[typeName]) {
        this._typeName = typeName;
        if (baseType) {
            if (baseType instanceof Array) {
                throw new Error("Multiple Inheritance is not supported.");
            };
            this._baseType = baseType;
        };
        if (interfaceType) {
            this._interfaces = [];
            for (var i = 2; i < arguments.length; ++i) {
                this._interfaces.add(arguments[i]);
            };
        };
        Function.__classes[typeName] = this;
    };
    return this;
};

//Registers the static class.
__fp.registerStaticClass = function (typeName, baseType, interfaceType) {
    var _ = this.registerClass(typeName, baseType, interfaceType);
    this._static = true; return new _();
};

//Registers the abstract class.
__fp.registerAbstractClass = function (typeName, baseType) {
    this.registerClass(typeName, baseType);
    this._abstract = true;
    return this;
};

//Registers the sealed class.
__fp.registerSealedClass = function (typeName, baseType) {
    this.registerClass(typeName, baseType);
    this._sealed = true;
    return this;
};

//Registers the interface.
__fp.registerInterface = function (typeName) {
    this._typeName = typeName;
    this._interface = this._abstract = this._sealed = true;
    return this;
};

//Get an instance of String to define methods or attributes.
var __sp = String.prototype;

//Encodes the URI.
__sp.encodeURI = function () {
    // fix escape not support utf-8
    return encodeURIComponent(this).replace(/\*/g, "%2A").replace(/-/g, "%2D").replace(/_/g, "%5F").replace(/\./g, "%2E").replace(/!/g, '%21').replace(/~/g, '%7E').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29');
    //return escape(this).replace(/\*/g,"%2A").replace(/\+/g,"%2B").replace(/-/g,"%2D").replace(/\./g,"%2E").replace(/\//g,"%2F").replace(/@/g,"%40").replace(/_/g,"%5F");
};

//Encodes the Cookie URI.
__sp.encodeCookieURI = function () {
    // fix escape not support utf-8
    return encodeURIComponent(this).replace(/_/g, "%5F").replace(/~/g, '%7E').replace(/%20/g, "+");
    //return escape(this).replace(/%21/g,"!").replace(/%27/g,"\'").replace(/%28/g,"(").replace(/%29/g,")").replace(/@/g,"%40").replace(/_/g,"%5F").replace(/\+/g,"%2B").replace(/\//g,"%2F").replace(/%20/g,"+");
};

//Decodes the URI.
__sp.decodeURI = function () {
    return unescape(this);
};

//Decodes special unicode characters
__sp.decodeSpecialUnicodeCharacters = function () {
    return this.replace(/%u00ae/g, "®").replace(/%u00a9/g, "©").replace(/%u20ac/g, "€").replace(/%u00a3/g, "£").replace(/%u00a5/g, "¥").replace(/%u00a4/g, "¤").replace(/%u2122/g, "™").replace(/%u00b1/g, "±").replace(/%u2260/g, "≠").replace(/%u2248/g, "≈").replace(/%u2264/g, "≤").replace(/%u2265/g, "≥").replace(/%u00f7/g, "÷").replace(/%u00d7/g, "×").replace(/%u221e/g, "∞").replace(/%u00bd/g, "½").replace(/%u00bc/g, "¼").replace(/%u00be/g, "¾").replace(/%u00b2/g, "²").replace(/%u00b3/g, "³").replace(/%u2030/g, "‰").replace(/%u00b6/g, "¶").replace(/%u00a7/g, "§").replace(/%u2211/g, "∑").replace(/%u2220/g, "∠").replace(/%u00ab/g, "«").replace(/%u00bb/g, "»").replace(/%u00b7/g, "·").replace(/%u2022/g, "•").replace(/%u2020/g, "†").replace(/%u2021/g, "‡").replace(/%u00a2/g, "¢").replace(/%u00a1/g, "¡").replace(/%u00a6/g, "¦").replace(/%u00a8/g, "¨");
};

//Decodes the CookieURI.
__sp.decodeCookieURI = function () {
    return decodeURIComponent(this.decodeSpecialUnicodeCharacters());
};

//Encodes the HTML.
__sp.encodeHtml = function () {
    return this.replace(/\&/g, "&amp;").replace(/\>/g, "&gt;").replace(/\</g, "&lt;").replace(/\'/g, "&#039;").replace(/\"/g, "&quot;");
};

//Decodes the HTML.
__sp.decodeHtml = function () {
    return this.replace(/(&quot;)/g, "\"").replace(/(&#039;)/ig, "'").replace(/(&lt;)/ig, "<").replace(/(&gt;)/ig, ">").replace(/(&amp;)/ig, "&");
};

//Ls the trim.
__sp.lTrim = function (c) {
    if (String.isNullOrEmpty(c)) {
        c = "\\s";
    };
    var re = new RegExp("^" + c + "*", "ig");
    return this.replace(re, "");
};

//Rs the trim.
__sp.rTrim = function (c) {
    if (String.isNullOrEmpty(c)) {
        c = "\\s";
    };
    var re = new RegExp(c + "*$", "ig");
    return this.replace(re, "");
};

//Trims this instance.
__sp.trim = function (c) {
    return this.lTrim(c).rTrim(c);
};

//Get an instance of Array to define methods or attributes.
var __ap = Array.prototype;

//Pushes the specified item.
if (!__ap.push || ![0].push(true)) {
    __ap.push = function () {
        for (i = 0; i < arguments.length; i++) {
            this[this.length] = arguments[i];
        };
        return this.length;
    };
};

//Adds the specified item.
__ap.add = __ap.queue = function (item) {
    this.push(item);
};

//Adds the range.
__ap.addRange = function (items) {
    if (items && items.length > 0) {
        this.push.apply(this, items);
    };
    return this;
};

//Remove the specified item.
__ap.remove = function (item) {
    var index = this.indexOf(item);
    if (index != -1) {
        this.splice(index, 1);
    };
    return (index != -1);
};

//Replace the specified item with a new one.
__ap.replace = function (item, nItem) {
    var index = this.indexOf(item);
    if (index != -1) {
        this.splice(index, 1, nItem);
    } else {
        this.add(nItem);
    };
};

//Clears this instance.
__ap.clear = function () {
    if (this.length > 0) {
        this.splice(0, this.length);
    };
};

//Clones this instance.
__ap.clone = function () {
    return [].addRange(this);
};

//Determines whether has the specified item.
__ap.contains = __ap.exists = __ap.hasItem = function (item) {
    var index = this.indexOf(item);
    return (index >= 0);
};

//Dequeues this instance.
__ap.dequeue = Array.prototype.shift;

//Indexes the index of specified item.
if (!__ap.indexOf) {
    __ap.indexOf = function (item, startIndex) {
        var length = this.length;
        if (length != 0) {
            startIndex = startIndex || 0;
            if (startIndex < 0) {
                startIndex = Math.max(0, length + startIndex);
            };
            for (var i = startIndex; i < length; i++) {
                if (this[i] === item) {
                    return i;
                };
            };
        };
        return -1;
    };
};

//Namespace
window.usingNamespace = Function.usingNamespace = function (a) {
    var ro = window;
    if (String.isNullOrEmpty(a)) {
        return ro;
    };
    var co = ro;
    var nsp = a.split(".");
    for (var i = 0; i < nsp.length; i++) {
        var cp = nsp[i];
        if (!ro[cp]) {
            ro[cp] = {};
        };
        co = ro = ro[cp];
    };
    return co;
};

var $ = function (id, win) {
    var w = window;
    if (win && win.document) {
        w = win;
    };
    return w.document.getElementById(id) || null;
};

//XML HTTP Request
if (!window.XMLHttpRequest) {
    window.XMLHttpRequest = function () {
        if (window.ActiveXObject) {
            var progIDs = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
            for (var i = 0; i < progIDs.length; i++) {
                try {
                    var xmlHttp = new ActiveXObject(progIDs[i]);
                    return xmlHttp;
                } catch (ex) {
                    debug.output("XMLHttpRequest", ex.toString());
                };
            };
        };
        return null;
    };
};

//DOM Parser
if (!window.DOMParser) {
    window.DOMParser = function () {
        return new function () {
            this.parseFromString = function (xml, mimetype) {
                var xmlDocument = null;
                try {
                    xmlDocument = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDocument.async = false;
                    xmlDocument.loadXML(xml);
                } catch (ex) {
                };
                return xmlDocument;
            };
        }();
    };
};

//Create the namespace "Sys.Enum"
usingNamespace("Sys")["Enum"] = (function () {
    //Creates the specified enum object.
    this.create = function () {
        var _enum = {};
        for (var i = 0; i < arguments.length; ++i) {
            _enum[arguments[i]] = arguments[i];
        };
        return _enum;
    };
    this.parse = function (type, value) {
        var tv, fv;
        fv = String.parse(value).toLowerCase();
        for (var o in type) {
            tv = String.parse(type[o]).toLowerCase();
            if (tv == fv) {
                return type[o];
            };
        };
        return type["Unknown"] || "Undefined";
    };
}).registerStaticClass("Sys.Enum");


//Create the namespace "Sys.StringBuilder"
usingNamespace("Sys.Text")["StringBuilder"] = (function (s) {
    //Initialization
    var _l = [];
    var instance = this;
    //Appends the specified value.
    this.append = function (s) {
        _l.add(String.parse(s));
    };
    //Appends the line.
    this.appendLine = function (s) {
        _l.add(String.parse(s));
        _l.add("\r\n");
    };
    //Clears this instance.
    this.clear = function () {
        _l.clear();
    };
    //Determines whether this instance is empty.
    this.isEmpty = function () {
        return (_l.length == 0);
    };
    //Gets the length.
    this.length = function () {
        return _l.length;
    };
    this.toString = function (d) {
        return _l.join(d || "");
    };
    if (!String.isNullOrEmpty(s)) {
        instance.append(s);
    };
}).registerClass("Sys.Text.StringBuilder");

//Create the namespace "Sys.Collections.NameObjectCollection"
usingNamespace("Sys.Collections")["NameObjectCollection"] = (function () {
    var names = [];
    var items = [];
    var itemsMap = [];
    var instance = this;
    var contains = function (n) {
        n = String.parse(n);
        return (itemsMap.indexOf(n.toLowerCase()) != -1);
    };
    var getIndex = function (n) {
        switch (Object.getTypeName(n)) {
            case "Number":
                return n;

            case "String":
                return itemsMap.indexOf(n.toLowerCase());

            default:
                return -1;
        };
    };
    this.set = this.add = function (n, o) {
        n = String.parse(n);
        var idx = getIndex(n);
        if (idx >= 0 && idx < items.length) {
            items[idx] = o;
        } else {
            names.add(n);
            items.add(o);
            itemsMap.add(n.toLowerCase());
        };
    };
    this.get = function (n) {
        return items[getIndex(n)] || null;
    };
    this.remove = function (n) {
        var idx = getIndex(n);
        if (idx >= 0 && idx < items.length) {
            names.splice(idx, 1);
            items.splice(idx, 1);
            itemsMap.splice(idx, 1);
        };
    };
    this.clear = this.removeAll = function () {
        names.clear();
        items.clear();
        itemsMap.clear();
    };
    this.contains = this.exists = function (n) {
        return contains(n);
    };
    this.getNames = function () {
        return names;
    };
    this.getValues = function () {
        return items;
    };
    this.length = {
        toString: function () {
            return items.length;
        }
    };
}).registerClass("Sys.Collections.NameObjectCollection");


usingNamespace("Sys.Web")["HttpNameValueCollection"] = (function (s) {
    var base = { add: null, set: null, get: null, remove: null, contains: null, exists: null };
    var instance = this;
    var getValidName = function (n) {
        if (Object.isNull(n)) {
            throw new Error("Invalid {" + Object.getTypeName(instance) + "} item name.");
        };
        return n.toString().decodeCookieURI();
    };
    Sys.Web.HttpNameValueCollection.initializeClass(instance, arguments, base);
    this.set = this.add = function (n, v) {
        try {
            n = getValidName(n);
            v = String.parse(v).toString().decodeCookieURI();
            base.add(n, v);
        }
        catch (ex) {

        }
    };
    this.get = function (n) {
        n = getValidName(n);
        return base.get(n);
    };
    this.remove = function (n) {
        n = getValidName(n);
        base.remove(n);
    };
    this.contains = this.exists = function (n) {
        n = getValidName(n);
        return base.contains(n);
    };
    this.create = function (v) {
        v = String.parse(v).toString();
        var l = v.split("&");
        for (var i = 0; i < l.length; ++i) {
            if (!String.isNullOrEmpty(l[i])) {
                var kn = l[i];
                var kv = "";
                var b = l[i].indexOf("=");
                if (-1 != b) {
                    kn = l[i].substring(0, b);
                    kv = l[i].substring(b + 1);
                };
                if (kn == "pi") {
                    continue;
                }
                instance.add(kn.replace(/\+/g, "%20"), kv.replace(/\+/g, "%20"));
            };
        };
    };
    this.toHttpNameValueString = function (removeEmptyValue) {
        var sb = new Sys.Text.StringBuilder();
        var names = instance.getNames();
        var items = instance.getValues();
        for (var i = 0; i < names.length; ++i) {
            if (!String.isNullOrEmpty(items[i]) || !removeEmptyValue) {
                sb.append(names[i].encodeURI());
                sb.append("=");
                sb.append(items[i].encodeURI());
                sb.append("&");
            };
        };
        return sb.toString().rTrim("&");
    };
    this.toString = function () {
        return instance.toHttpNameValueString();
    };
    instance.create(s);
}).registerClass("Sys.Web.HttpNameValueCollection", "Sys.Collections.NameObjectCollection");


usingNamespace("Sys.Web")["Cookies"] = {
    HttpCookieKeys: (function (s) {
        var instance = this;
        Sys.Web.Cookies.HttpCookieKeys.initializeClass(instance, arguments);
    }).registerClass("Sys.Web.Cookies.HttpCookieKeys", "Sys.Web.HttpNameValueCollection"),
    HttpCookie: (function (n, v, d, e, p, s) {
        var instance = this;
        var items = new Sys.Web.Cookies.HttpCookieKeys();
        this.name = String.parse(n).decodeURI();
        this.value = String.parse(v).decodeURI();
        this.domain = String.parse(d);
        this.expires = Date.tryParse(e, null);
        this.subexpires = Date.tryParse(e, null);
        this.path = String.parse(p);
        this.secure = Boolean.parse(s);
        this.keys = items;
        this.set = function (v) {
            if (Sys.Web.Cookies.Helper.isKeys(v)) {
                items.create(v);
                instance.value = "";
            } else {
                instance.value = v.decodeURI();
            };
        };
        this.setKey = function (n, v) {
            items.set(n, v);
            instance.value = "";
        };
        this.getKeyValue = function (n) {
            return items.get(n) || "";
        };
        this.clear = function () {
            items.clear();
            instance.value = "";
        };
        this.removeKey = items.remove;
        this.toString = function () {
            if (String.isNullOrEmpty(instance.value)) {
                return items.toString();
            } else {
                return instance.value.decodeURI();
            };
        };
        this.toCookieURIString = function () {
            if (String.isNullOrEmpty(instance.value)) {
                return items.toString();
            } else {
                try {
                    return instance.value.decodeCookieURI();
                } catch (ex) {
                    // (fixbug) to support special currency, like poland currency : zl
                    return unescape(instance.value);
                }
            };
        };
        this.toHttpCookieString = function () {
            return Sys.Web.Cookies.Helper.getHttpCookieString(instance);
        };
    }).registerClass("Sys.Web.Cookies.HttpCookie"),
    HttpCookieCollection: (function () {
        var instance = this;
        Sys.Web.Cookies.HttpCookieCollection.initializeClass(instance, arguments);
    }).registerClass("Sys.Web.Cookies.HttpCookieCollection", "Sys.Collections.NameObjectCollection"),
    Helper: (function () {
        this.get = function (n) {
            n = String.parse(n).decodeURI();
            var rt = usingNamespace("Runtime");
            if (!rt.Cookies) {
                usingNamespace("Runtime")["Cookies"] = new Sys.Web.Cookies.RawCookie.Helper().getAllCookies();
            };
            if (String.isNullOrEmpty(n)) {
                return Runtime.Cookies;
            } else {
                if (!Runtime.Cookies.contains(n)) {
                    Runtime.Cookies.add(n, new Sys.Web.Cookies.HttpCookie(n));
                }
                return Runtime.Cookies.get(n);
            };
        };
        this.isKeys = function (v) {
            return (!String.isNullOrEmpty(v) && v.indexOf("=") >= 0);
        };
        this.getHttpCookieString = function (hc, dcn) {
            var n = String.parse(hc.name);
            if (String.isNullOrEmpty(n)) {
                return "";
            };
            n = n.decodeURI();
            if (!dcn) {
                n = n.encodeCookieURI();
            };
            var v = String.parse(hc.value);

            v = new Sys.Web.Cookies.RawCookie.Helper().getValueString(hc);

            var d = String.parse(hc.domain);
            var e = Date.tryParse(hc.expires, null);
            var p = String.isNullOrEmpty(p) ? "/" : p;
            var s = Boolean.parse(hc.secure);
            var sb = new Sys.Text.StringBuilder();
            sb.append(n + "=" + v);
            if (d.length > 0) {
                sb.append("; domain=" + d);
            };
            if (Object.getTypeName(e) == "Date") {
                sb.append("; expires=" + e.toGMTString());
            };
            sb.append("; path=" + p);
            if (s) {
                sb.append("; secure");
            };
            return sb.toString();
        };
        this.save = function (hc) {
            switch (Object.getTypeName(hc)) {
                case "Sys.Web.Cookies.HttpCookieCollection":
                    items = hc.getValues();
                    for (var i = 0; i < items.length; ++i) {
                        Sys.Web.Cookies.Helper.save(items[i]);
                    };
                    break;
                case "Sys.Web.Cookies.HttpCookie":
                    if (String.isNullOrEmpty(hc.name)) {
                        return;
                    };
                    var ohc = Sys.Web.Cookies.Helper.get(hc.name);
                    //decode cookie name;
                    hc.name = hc.name.decodeURI();
                    //if cookie value is empty, combine all subcookie values
                    if (String.isNullOrEmpty(hc.value)) {
                        var ohcs = ohc.toString();
                        if (Sys.Web.Cookies.Helper.isKeys(ohcs)) {
                            var names = ohc.keys.getNames();
                            var items = ohc.keys.getValues();
                            for (var i = 0; i < names.length; ++i) {
                                if (!hc.keys.contains(names[i])) {
                                    debug.output("Update Cookie:", [names[i], items[i]]);
                                    hc.setKey(names[i], items[i]);
                                }
                                ;
                            };
                            debug.output("Combined Cookies:", hc.toString());
                        };
                    };
                    Sys.Web.Cookies.Helper.clear(new Sys.Web.Cookies.HttpCookie(hc.name, "", hc.domain, hc.expires, hc.path, hc.secure), true);

                    if (hc && hc.keys) {
                        for (var i = 0; i < hc.keys.getNames().length; i++) {
                            var names = hc.keys.getNames();
                            var items = hc.keys.getValues();

                            if (String.isNullOrEmpty(items[i])) {
                                hc.removeKey(names[i]);
                            }
                        }
                    }

                    window.document.cookie = hc.toHttpCookieString();
                    Runtime.Cookies.set(hc.name, hc);
                    break;
                default:
            };
        };
        this.clear = function (hc, ca) {
            switch (Object.getTypeName(hc)) {
                case "Sys.Web.Cookies.HttpCookieCollection":
                    items = hc.getValues();
                    for (var i = 0; i < items.length; ++i) {
                        Sys.Web.Cookies.Helper.clear(items[i]);
                    };
                    break;

                case "Sys.Web.Cookies.HttpCookie":
                    var d = new Date();
                    d.setTime(d.getTime() - 3600000 * 24 * 365);
                    hc.clear();
                    if (ca) {
                        hc.expires = d;
                        window.document.cookie = Sys.Web.Cookies.Helper.getHttpCookieString(hc, true);
                    } else {
                        hc.subexpires = d;
                    };
                    window.document.cookie = hc.toHttpCookieString();
                    if (Runtime.Cookies) { Runtime.Cookies.set(hc.name, hc); }
                    break;

                default:
            };
        };
    }).registerStaticClass("Sys.Web.Cookies.Helper"),
    RawCookie: {
        Codec: {
            encode: function (s) {
                //this encoder will produce #4 Cookie strings
                if (!s) return "";
                return s.encodeCookieURI();
            },
            decode: function (s, v) {
                if (!s || !v) return null;
                switch (v) {
                    case "#1":
                        return Sys.Web.Cookies.RawCookie.Codec.InternalDecoders.decode1(s);
                    case "#2":
                        return Sys.Web.Cookies.RawCookie.Codec.InternalDecoders.decode2(s);
                    case "#3":
                        return Sys.Web.Cookies.RawCookie.Codec.InternalDecoders.decode3(s);
                    case "#4":
                        return Sys.Web.Cookies.RawCookie.Codec.InternalDecoders.decode4(s);
                    case "#5":
                        return Sys.Web.Cookies.RawCookie.Codec.InternalDecoders.decode4(s);
                    default:
                        return null;
                };
            },
            InternalDecoders: {
                decode1: function (s) {
                    return s.replace(/"Expired":/g, "\"Exp\":");
                },
                decode2: function (s) {
                    return s.replace(/%7B/ig, "{").replace(/%7D/ig, "}").replace(/%22/ig, "\"").replace(/%2C/ig, ",").replace(/%3A/ig, ":").replace(/%2F/ig, "/").replace(/%20/ig, " ");
                },
                decode3: function (s) {
                    return s.replace(/\?7B\?/ig, "{").replace(/\?7D\?/ig, "}").replace(/\?22\?/ig, "\"").replace(/\?2C\?/ig, ",").replace(/\?3A\?/ig, ":").replace(/\?2F\?/ig, "/").replace(/\?20\?/ig, " ");
                },
                decode4: function (s) {
                    return s.decodeURI().replace(/\+/ig, "%20");
                }
            }
        },
        Helper: (function () {
            var instance = this;
            var regx = /^#\d+/i;
            var nvp = "NV_";
            var cver;

            this.isReformatted = function (s) {
                return regx.test(s);
            };
            this.getCookieVersion = function (s) {
                var v = regx.exec(s);
                return (v && v[0]) ? v[0] : "";
            };
            this.trimCookieString = function (s) {
                var v = regx.exec(s);
                cver = (v && v[0]) ? v[0] : "";
                return s.replace(regx, "");
            };
            this.buildCookieString = function (s, v) {
                if (!s) { s = "{}"; };
                return v + Sys.Web.Cookies.RawCookie.Codec.encode(s)
            };
            this.isNeweggCookie = function (n) {
                return !Object.isNull(Web.Config.CookieMapping[n]);
            };
            this.getCookieObject = function (s) {
                var rv;
                rv = instance.trimCookieString(s);
                return Object.parseJSON(Sys.Web.Cookies.RawCookie.Codec.decode(rv, cver));
            };
            this.getExpiryDate = function (c, d) {
                var e = c["Exp"];
                if (d) {
                    return new Date(1000 * Number.parse(e));
                }
                else {
                    return Date.getLocalTimeByUTC(e)
                };
            };
            this.setExpiryDate = function (c, d, e) {
                if (e) {
                    c["Exp"] = "" + parseInt(d.getTime() / 1000);
                }
                else {
                    c["Exp"] = d.toUTCDisplayString();
                };
            };
            this.getAllCookies = function () {
                var c = window.document.cookie;
                var hcc = new Sys.Web.Cookies.HttpCookieCollection();
                if (!String.isNullOrEmpty(c)) {
                    var cc = c.split("; ");
                    var wcs = Web.Config.SiteCookieInfo;
                    for (var i = 0; i < cc.length; ++i) {
                        var cn = cc[i];
                        var cv = "";
                        var b = cn.indexOf("=");
                        var hc = new Sys.Web.Cookies.HttpCookie();
                        hc.version = (Web.Config.Environment.Cookies.EnableCookieNameMapping) ? "#5" : "#4";
                        hc.compressed = (Web.Config.Environment.Cookies.EnableCookieNameMapping);
                        if (-1 != b) {
                            cn = cc[i].substring(0, b).replace(/\+/ig, "%20").decodeURI();
                            cv = cc[i].substring(b + 1).replace(/\+/ig, "%20");
                        };
                        hc.name = cn;

                        //default: read native cookie value
                        var ncv = cv;

                        //Value is reformatted cookie.
                        //Convert cookie values from JSON to name value pairs.
                        if (instance.isReformatted(cv)) {
                            if (wcs.enableReformattedCookie) {
                                var isCompressed = (instance.getCookieVersion(cv) == "#5");
                                //read reformatted cookie
                                //Deserialize JSON
                                var rc = ncv = instance.getCookieObject(cv);
                                //1. get cookie for current site
                                //2. expiration check
                                //3. fill name value pairs
                                if (ncv && ncv.Sites) {
                                    if (!ncv.Sites[wcs.bizUnit] ||
										!ncv.Sites[wcs.bizUnit].Exp ||
										instance.getExpiryDate(ncv.Sites[wcs.bizUnit], isCompressed) <= new Date()) {
                                        //clear expired cookie value
                                        ncv.Sites[wcs.bizUnit] = {};
                                    };
                                    //store complete site cookies in runtime memory
                                    if (!usingNamespace("Runtime.RawCookies")[cn])
                                        usingNamespace("Runtime.RawCookies")[cn] = usingNamespace("Runtime.RawCookies")[cn.encodeURI()] = rc;

                                    if (ncv.Sites[wcs.bizUnit].Values) {
                                        //read multi-dimention cookie
                                        var hnv = new Sys.Web.HttpNameValueCollection();
                                        var cv;
                                        for (var c in ncv.Sites[wcs.bizUnit].Values) {

                                            debug.output("subcookiename", c);
                                            cv = c;
                                            if (hc.compressed != isCompressed) {
                                                cv = cv.decodeURI();
                                                cv = isCompressed ? Web.StateManager.Cookies.reflectSubCookie(cv) : Web.StateManager.Cookies.mapSubCookie(cv);
                                                cv = cv.encodeURI();
                                            };
                                            hnv.add(cv, ncv.Sites[wcs.bizUnit].Values[c]);
                                        };
                                        ncv = hnv.toHttpNameValueString();
                                    } else {
                                        //read single-dimention cookie
                                        ncv = ncv.Sites[wcs.bizUnit].Value || "";
                                    };
                                } else {
                                    //clear reformatted cookie because reformatted cookie value string is invalid
                                    Sys.Web.Cookies.Helper.clear(hc, true);
                                    continue;
                                };
                            } else {
                                //clear reformatted cookie because read & write reformatted cookie switch is off
                                Sys.Web.Cookies.Helper.clear(hc, true);
                                continue;
                            };
                        };

                        hc.set(ncv);

                        //convert native cookie value to reformatted cookie value
                        //Just for Newegg defined cookie (start with "NV_")
                        //if(instance.isNeweggCookie(cn)&&
                        //	!instance.isReformatted(cv)&&
                        //	wcs.enableReformattedCookie&&
                        //	wcs.writeReformattedCookie){
                        //	var c;
                        //	if(null!=(c=Web.Config.CookieMapping[hc.name])){
                        //		hc.domain=c[0];
                        //		var ad=Number.parse(c[1]);
                        //		if(ad>0){
                        //			var d=new Date();
                        //			d.setTime(d.getTime()+ad*1000);
                        //			hc.expires=d;
                        //		};
                        //		hc.path=c[2];
                        //		hc.secure=c[3];
                        //	};
                        //	window.document.cookie=hc.toHttpCookieString();
                        //};

                        hcc.add(cn, hc);
                    };
                };
                return hcc;
            };
            this.getValueString = function (hc) {
                var rc = usingNamespace("Runtime.RawCookies")[hc.name];
                var wcs = Web.Config.SiteCookieInfo;
                if (!rc) { rc = { Sites: {} }; };
                if (!rc.Sites[wcs.bizUnit]) { rc.Sites[wcs.bizUnit] = {}; };

                var v = hc.value;
                if (String.isNullOrEmpty(v)) {
                    //generate multi-dimention cookie value string
                    //write native cookie value
                    if (!wcs.writeReformattedCookie ||
						!wcs.enableReformattedCookie) { return hc.keys.toString(); };

                    //update reformatted values
                    var vs = {};
                    var names = hc.keys.getNames();
                    var items = hc.keys.getValues();
                    for (var i = 0; i < names.length; ++i) {
                        vs[names[i].encodeCookieURI()] = items[i].encodeCookieURI();
                    };
                    rc.Sites[wcs.bizUnit].Values = vs;
                } else {
                    //generate single-dimention cookie value string
                    //write native cookie value
                    if (!wcs.writeReformattedCookie ||
						!wcs.enableReformattedCookie) { return v.decodeURI().encodeCookieURI(); }

                    //update reformatted values
                    rc.Sites[wcs.bizUnit]["Value"] = v.decodeURI().encodeCookieURI();
                };

                //update expires
                var c;
                var ad = 0;
                if (null != (c = Web.Config.CookieMapping[hc.name])) { ad = Number.parse(c[1]); }
                if (!hc.expires && c) {
                    var d = new Date();
                    if (ad > 0) {
                        var d = new Date();
                        d.setTime(d.getTime() + ad * 1000);
                        hc.expires = d;
                    };
                };

                //update subexpires (for current site)
                if (hc.subexpires && (hc.subexpires <= new Date())) {
                    rc.Sites[wcs.bizUnit] = {};
                } else {
                    if (!hc.subexpires) {
                        var sd = new Date();
                        //set fake expires for session cookie (1 day)
                        if (ad <= 0) { ad = 24 * 60 * 60; };
                        sd.setTime(sd.getTime() + ad * 1000);
                        hc.subexpires = sd;
                    };
                    instance.setExpiryDate(rc.Sites[wcs.bizUnit], hc.subexpires, hc.compressed);
                };

                //Serialize JSON
                return instance.buildCookieString(Object.stringifyJSON(rc), hc.version);
            };
        }).registerClass("Sys.Web.Cookies.RawCookie.Helper")
    }
};

//Web objects
usingNamespace("Web")["QueryStringBuilder"] = (function () {
    var instance = this;
    Web.QueryStringBuilder.initializeClass(instance, arguments);
    this.toString = function () {
        return instance.toHttpNameValueString(true);
    };
}).registerClass("Web.QueryStringBuilder", "Sys.Web.HttpNameValueCollection");


//Web Enum objects
usingNamespace("Web")["Enum"] = {
    Protocol: Sys.Enum.create("http", "https"),
    OS: Sys.Enum.create("Unknown",
		"Win", "Mac", "Linux", "FreeBSD"),
    Browser: Sys.Enum.create("Unknown",
		"Netscape_6", "Netscape_7", "Netscape_8",
		"Firefox_1", "Firefox_1_5", "Firefox_2",
		"Opera_7", "Opera_8_5", "Opera_9", "Opera_9_8",
		"IE_Mac_5", "IE_5", "IE_5_5", "IE_6", "IE_7", "IE_8", "IE_9", "IE_10", "IE_11",
		"Safari"),
    Device: Sys.Enum.create("Unknown",
		"iPhone", "iPad", "iPod"),
    Network: {
        Request: {
            Output: Sys.Enum.create("XML", "JSON"),
            Type: Sys.Enum.create("Unknown", "Image", "CSS", "Script", "XML"),
            Method: Sys.Enum.create("Unknown", "Get", "Post"),
            ReadyState: Sys.Enum.create("Unknown", "Aborted", "Unprocessed", "Processing", "Uninitialized", "Open", "Sent", "Receiving", "Loaded", "Completed")
        }
    },
    UI: {
        ProductCell: {
            Type: Sys.Enum.create("Unknown", "Normal", "DVD")
        }
    }
};

//Web Utility
usingNamespace("Web")["Utility"] = {
    URI: (function () {
        this.getHost = function (uri, withProtocol) {
            var reURI = new RegExp("((http|https|ftp)://([^\\/]*))\.*", "ig");
            var match = reURI.exec(uri);
            if (match) {
                if (withProtocol) {
                    return match[1];
                } else {
                    return match[3];
                };
            };
            return "";
        }
    }).registerStaticClass("Web.Utility.URI"),
    getRequestReadyState: function (code) {
        var wnrrs = Web.Enum.Network.Request.ReadyState;
        var readyState = wnrrs.Unknown;
        switch (code) {
            case 0:
                readyState = wnrrs.Uninitialized;
                break;
            case 1:
                readyState = wnrrs.Open;
                break;
            case 2:
                readyState = wnrrs.Sent;
                break;
            case 3:
                readyState = wnrrs.Receiving;
                break;
            case 4:
                readyState = wnrrs.Loaded;
                break;
            default:
        };
        return readyState;
    },
    isRequestSucceeded: function (el) {
        debug.output("Request Status", [el, el.status, el.statusText]);
        if (el && el.status && el.status == 200) {
            return true;
        };
        return false;
    }
};

//Web Environment objects
usingNamespace("Web")["Environment"] = {
    Protocol: function () {
        return window.location.protocol.rTrim(":")
    },
    OS: (function () {
        var eos = Web.Enum.OS;
        var ua = navigator.userAgent;
        var isWin = ua.indexOf("Win") >= 0;
        var isMac = ua.indexOf("Mac") >= 0;
        var isLinux = ua.indexOf("Linux") >= 0;
        var isFreeBSD = ua.indexOf("FreeBSD") >= 0;
        var currentVersion = (isWin ? eos.Win :
			(isMac ? eos.Mac :
				(isLinux ? eos.Linux :
					(isFreeBSD ? eos.FreeBSD : eos.Unknown)
				)
			)
		);
        this.isWin = function () {
            return isWin;
        };
        this.isMac = function () {
            return isMac;
        };
        this.isLinux = function () {
            return isLinux;
        };
        this.isFreeBSD = function () {
            return isFreeBSD;
        };
        this.currentVersion = function () {
            return currentVersion;
        };
    }).registerStaticClass("Web.Environment.OS"),
    Browser: (function () {
        var ebs = Web.Enum.Browser;
        var ua = navigator.userAgent;
        var tridentReg = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        var tridentMatch = tridentReg.exec(ua);
        var isTrident = (function () {
            return typeof (Web) !== "undefined" && Web && Web.Config && Web.Config.Environment && Web.Config.Environment.IE11VersionUpgrade && tridentMatch != null;
        })();
        var isOpera = ua.indexOf("Opera") >= 0;
        var isIE = (ua.indexOf("MSIE") >= 0 || isTrident) && !isOpera;
        var isMozilla = ua.indexOf("Mozilla") >= 0 && !isIE && !isOpera;
        var isFirefox = ua.indexOf("Firefox") >= 0;
        var isNetscape = ua.indexOf("Netscape") >= 0;
        var isAol = ua.indexOf("AOL") >= 0;
        var isSafari = ua.indexOf("Safari") >= 0;
        var isChrome = ua.indexOf("Chrome") >= 0;
        var currentVersion = ebs.Unknown;
        var isAjaxable = function () {
            var xml = new window.XMLHttpRequest();
            var ajax = false;
            try {
                if (!isIE) {
                    ajax = xml.open != null;
                } else {
                    ajax = xml != null;
                };
            } catch (ex) { };
            return ajax;
        }();
        if (isIE) {
            if (isTrident) {
                if (tridentMatch[1] < 12.0) {
                    currentVersion = ebs.IE_11;
                }
            } else {
                var appNameBegin = ua.indexOf("MSIE");
                var appNameEnd = ua.indexOf(";", appNameBegin);
                var appVer = parseFloat(ua.substring(appNameBegin + 5, appNameEnd));
                if (appVer < 5.4) {
                    if (Web.Environment.OS.isMac()) {
                        currentVersion = ebs.IE_Mac_5;
                    } else {
                        currentVersion = ebs.IE_5;
                    };
                } else if (appVer < 6.0) {
                    currentVersion = ebs.IE_5_5;
                } else if (appVer < 7.0) {
                    currentVersion = ebs.IE_6;
                } else if (appVer < 8.0) {
                    currentVersion = ebs.IE_7;
                } else if (appVer < 9.0) {
                    currentVersion = ebs.IE_8;
                } else if (appVer < 10.0) {
                    currentVersion = ebs.IE_9;
                } else {
                    currentVersion = ebs.IE_10;
                }
            }
        } else if (isFirefox) {
            var appVer = parseFloat(ua.substring(ua.indexOf("Firefox") + 8));
            if (appVer < 1.5) {
                currentVersion = ebs.Firefox_1;
            } else if (appVer < 2.0) {
                currentVersion = ebs.Firefox_1_5;
            } else {
                currentVersion = ebs.Firefox_2;
            };
        } else if (isNetscape) {
            var appVer = parseFloat(ua.substring(ua.indexOf("Netscape") + 9));
            if (appVer < 7.0) {
                currentVersion = ebs.Netscape_6;
            } else if (appVer < 8.0) {
                currentVersion = ebs.Netscape_7;
            } else {
                currentVersion = ebs.Netscape_8;
            };
        } else if (isOpera) {
            var appNameBegin = ua.indexOf("Opera");
            var appNameEnd = ua.indexOf(" ", appNameBegin + 6);
            appNameEnd = (appNameEnd == -1) ? ua.length : appNameEnd;
            var appVer = parseFloat(ua.substring(appNameBegin + 6, appNameEnd));
            if (appVer < 8.0) {
                currentVersion = ebs.Opera_7;
            } else if (appVer < 9.0) {
                currentVersion = ebs.Opera_8_5;
            } else if (appVer < 9.8) {
                currentVersion = ebs.Opera_9;
            }
            else {
                currentVersion = ebs.Opera_9_8;
            };
        } else if (isSafari) {
            currentVersion = ebs.Safari;
        };
        this.isIE = function () {
            return isIE;
        };
        // IE11 is similar with mozilla. Microsoft changed ie11 userAgent different of IE10 and below.
        this.isTrident = function() {
            return isTrident;
        };
        this.isMozilla = function () {
            return isMozilla;
        };
        this.isOpera = function () {
            return isOpera;
        };
        this.isFirefox = function () {
            return isFirefox;
        };
        this.isNetscape = function () {
            return isNetscape;
        };
        this.isAol = function () {
            return isAol;
        };
        this.isSafari = function () {
            return isSafari;
        };
        this.isChrome = function () {
            return isChrome;
        };
        this.currentVersion = function () {
            return currentVersion;
        };
        this.isAjaxable = function () {
            return isAjaxable;
        };
    }).registerStaticClass("Web.Environment.Browser"),
    Device: (function () {
        var eds = Web.Enum.Device;
        var ua = navigator.userAgent;
        var isIPhone = ua.indexOf("iPhone") > 0;
        var isIPad = ua.indexOf("iPad") > 0;
        var isIPod = ua.indexOf("iPod") > 0;
        var currentVersion = (isIPhone ? eds.iPhone :
			(isIPad ? eds.iPad :
				(isIPod ? eds.iPod : eds.Unknown)
			)
		);
        this.isIPhone = function () {
            return isIPhone;
        };
        this.isIPad = function () {
            return isIPad;
        };
        this.isIPod = function () {
            return isIPod;
        };
        this.currentVersion = function () {
            return currentVersion;
        };
    }).registerStaticClass("Web.Environment.Device")
};

usingNamespace("Web.Environment.Browser")["Compatibility"] = {
    attach: function () {
        if (Web.Environment.Browser.isMozilla() || Web.Environment.Browser.isTrident()) {
            var w = window;
            function mapMozillaEvent(e) {
                var se = e["srcElement"];
                if (null == se || e.currentTarget != se || e.target != se) {
                    if (e.target && e.target.contains && e.target.contains(e.currentTarget)) {
                        e["srcElement"] = e.currentTarget;
                    } else {
                        e["srcElement"] = e.target;
                    };
                };
                if (null == e["keyCode"]) {
                    e["keyCode"] = e.which;
                };
                if (null == e["x"]) {
                    e["x"] = e.pageX;
                };
                if (null == e["y"]) {
                    e["y"] = e.pageY;
                };
                window.event = e;
            };
            function map(el, eventType, callback) {
                var shortEventType = eventType.slice(2);
                if (shortEventType == "mousewheel") {
                    shortEventType = "DOMMouseScroll";
                };
                el.addEventListener(shortEventType, mapMozillaEvent, true);
                el.addEventListener(shortEventType, callback, false);
            };
            function removeMap(el, eventType, callback) {
                var shortEventType = eventType.slice(2);
                if (shortEventType == "mousewheel") {
                    shortEventType = "DOMMouseScroll";
                };
                el.removeEventListener(shortEventType, callback, false);
            };

            w.attachEvent = function (type, callback) {
                map(this, type, callback);
                return true;
            };

            w.detachEvent = function (type, callback) {
                removeMap(this, type, callback);
                return true;
            };
            w.contains = function (el) {
                while (el != null && el != this) {
                    //modify parentElement to parentNode:parentElemnt is only used in IE.
                    el = el.parentNode;
                };
                return (el != null);
            };
            //fix mac/KHTML; HTMLDocument/HTMLElement issue
            //==========================================									
            if (!w.HTMLElement) {
                (function (tags) {
                    for (var n in tags) {
                        w["HTML" + n + "Element"] = w.document.createElement(tags[n]).__proto__;
                        w["HTML" + n + "Element"].attachEvent = w.attachEvent;
                        w["HTML" + n + "Element"].detachEvent = w.detachEvent;
                        w["HTML" + n + "Element"].contains = w.contains;
                    };
                })({ Html: "html", Head: "head", Link: "link", Title: "title", Meta: "meta", Base: "base", IsIndex: "isindex", Style: "style", Body: "body", Form: "form", Select: "select", OptGroup: "optgroup", Option: "option", Input: "input", TextArea: "textarea", Button: "button", Label: "label", FieldSet: "fieldset", Legend: "legend", UList: "ul", OList: "ol", DList: "dl", Directory: "dir", Menu: "menu", LI: "li", Div: "div", Paragraph: "p", Heading: "h1", Quote: "q", Pre: "pre", BR: "br", BaseFont: "basefont", Font: "font", HR: "hr", Mod: "ins", Anchor: "a", Image: "img", Object: "object", Param: "param", Applet: "applet", Map: "map", Area: "area", Script: "script", Table: "table", TableCaption: "caption", TableCol: "col", TableSection: "tbody", TableRow: "tr", TableCell: "td", FrameSet: "frameset", Frame: "frame", IFrame: "iframe" });
                w.HTMLElement = w.HTMLDocument = {};
                w.document.attachEvent = w.attachEvent;
                w.document.detachEvent = w.detachEvent;
                w.document.contains = w.contains;
            } else {
                w.HTMLDocument.prototype.attachEvent = w.HTMLElement.prototype.attachEvent = w.attachEvent;
                w.HTMLDocument.prototype.detachEvent = w.HTMLElement.prototype.detachEvent = w.detachEvent;
                w.HTMLDocument.prototype.contains = w.HTMLElement.prototype.contains = w.contains;
            };
            //==========================================
        };

        var we = Web.Environment;
        var bVer = we.Browser.currentVersion();
        var cn = document.documentElement.className.split(" ");
        cn.add(we.OS.currentVersion().toLowerCase());
        if (we.Browser.isIE()) {
            cn.add("ie");
        } else if (we.Browser.isMozilla()) {
            cn.add("mozilla");
        } else if (we.Browser.isOpera()) {
            cn.add("opera");
        };
        if (we.Device.isIPhone() || we.Device.isIPad() || we.Device.isIPod()) {
            cn.add("iosdevice");
        };
        cn.add(bVer.toLowerCase());
        debug.output("Html tag class", [cn.join(" ")]);
        document.documentElement.className = cn.join(" ");
    }()
};

usingNamespace("Web")["Network"] = (function () {
    var instance = networking = this;
    var domains = new Sys.Collections.NameObjectCollection();
    var baseDomain = Web.Utility.URI.getHost(document.location);
    var baseDomainRegistered = false;
    var defaultTimeout = 300000;

    //Processor for each domain
    var Processor = function (domain) {
        var MAX_CONN = 2;
        var conn = 0;
        var requests = new Sys.Collections.NameObjectCollection();
        var running = [];
        var runtime = this;
        var proxyGenerated = false;
        var currentDomain = domain;
        var _isIE = Web.Environment.Browser.isIE();
        var _isMozilla = Web.Environment.Browser.isMozilla();

        //fetch xml http request
        var fetchXml = function (o) {
            var xml = new XMLHttpRequest();
            var rqt = o.method.toUpperCase();
            var doTimeout = doAbort = function () {
                if (o.timer) { clearTimeout(o.timer); };
                if (o) {
                    try {
                        xml.onreadystatechange = Function.emptyFunction;
                        xml.abort();
                    } catch (ex) { };
                    done(null, o);
                };
                xml = o = null;
            };
            var doCallback = function () {
                if (xml) {
                    o.readyState = Web.Utility.getRequestReadyState(xml.readyState);
                    if (o.abort) {
                        debug.output("", ["readyState Abort:" + o.id, "readyState: " + o.readyState]);
                        doAbort();
                    } else {
                        if (o.timer) {
                            debug.output("", "readyState: " + o.readyState);
                            clearTimeout(o.timer);
                            o.timer = setTimeout(doTimeout, o.timeout);
                        };
                        if (4 == xml.readyState) {
                            xml.onreadystatechange = Function.emptyFunction;
                            if (o.timer) { clearTimeout(o.timer); };
                            done(xml, o);
                            xml = o = null;
                        };
                    };
                };
            };
            try {
                xml.open(rqt, o.url, true);
                if (_isIE) {
                    xml.setRequestHeader("Accept-Encoding", "gzip, deflate");
                };
                if (o.headers) {
                    for (var h in o.headers) {
                        xml.setRequestHeader(h, o.headers[h]);
                        debug.output("", h + ":" + o.headers[h]);
                    };
                };
                xml.onreadystatechange = doCallback;
                if (o.timeout) {
                    o.timer = setTimeout(doTimeout, o.timeout);
                };

                if (o.postString || _isMozilla) {
                    xml.send(o.postString);
                } else {
                    xml.send();
                };
            } catch (ex) {
                debug.output("Exception", ex.toString());
                doAbort();
            };
            return xml;
        };

        //processing
        var processing = function () {
            var o, id;
            if (conn < MAX_CONN && running.length > 0) {
                id = running.dequeue();
                o = requests.get(id);
                if (o) {
                    requests.get(o.id).readyState = Web.Enum.Network.Request.ReadyState.Processing;
                    ++conn;
                    var wnt = Web.Enum.Network.Request.Type;
                    switch (o.type) {
                        case wnt.XML:
                            o.executing = fetchXml(o);
                            break;
                        case wnt.Image:
                        case wnt.Script:
                        case wnt.CSS:
                            break;
                        default:
                            --conn;
                    };
                    debug.output("", "Running Connection: [" + conn + "/ " + running.length + " / " + requests.length + " : " + id);
                };
            };
        };

        var done = function (el, o) {
            if (o) {
                if (!o.abort) {
                    if (o.callback) {
                        o.callback(el, o.context);
                    };
                    o.readyState = Web.Enum.Network.Request.ReadyState.Completed;
                    o.executing = el = null;
                    requests.remove(o.id);
                } else {
                    o.readyState = Web.Enum.Network.Request.ReadyState.Aborted;
                    runtime.abort(o);
                };
            };
            --conn;
            processing();
        };

        var removeRequests = function (ids) {
            if (Object.getTypeName(ids) != "Array") {
                ids = [ids];
            };
            for (var i = 0; i < ids.length; ++i) {
                requests.remove(ids[i]);
            };
        };

        runtime.add = function (o) {
            if (!requests.contains(o.id)) {
                running.queue(o.id);
                requests.add(o.id, o);
                processing();
            };
        };

        runtime.abort = function (o, abortArray) {
            if (o) {
                var id = o.id;
                o.abort = true;
                o.callback = null;
                if (o.executing) {
                    var wnt = Web.Enum.Network.Request.Type;
                    switch (o.type) {
                        case wnt.XML:
                            o.executing.onreadystatechange = Function.emptyFunction;
                            o.executing.abort();
                            break;
                        case wnt.Image:
                        case wnt.Script:
                        case wnt.CSS:
                            break;
                        default:
                    };
                    --conn;
                    debug.output("", "Aborting Executed: " + id);
                };
                running.remove(id);
                debug.output("", "[" + requests.length + "] Aborting: " + o.id);
                o = o.context = o.executing = null;
            };
            if (!abortArray) {
                requests.remove(id);
                processing();
            };
        };

        runtime.abortGroup = function (tag) {
            var items = requests.getValues();
            var ids = [];
            for (var i = 0; i < items.length; ++i) {
                var item = items[i];
                if (item.tag == tag) {
                    ids.add(item.id);
                    runtime.abort(item, true);
                };
            };
            removeRequests(ids);
        };

        runtime.abortAll = function () {
            running.clear();
            var items = requests.getValues();
            var ids = [];
            for (var i = 0; i < items.length; ++i) {
                var item = items[i];
                ids.add(item.id);
                runtime.abort(item, true);
            };
            removeRequests(ids);
        };

        runtime.generateProxy = function () {
        };
    };

    //request object
    var Request = function (
		type,
		url,
		context,
		callback,
		method,
		postString,
		headers,
		timeout,
		tag,
		proxy,
		auth) {
        this.type = type;
        this.url = url;
        this.context = context;
        this.callback = callback;
        this.method = method;
        this.postString = postString;
        this.headers = headers;
        this.timeout = timeout;
        this.tag = tag;
        this.proxy = proxy,
		this.auth = auth;
        this.domain = Web.Utility.URI.getHost(this.url);
        this.executing = null;
        this.readyState = Web.Enum.Network.Request.ReadyState.Unprocessed;
        if (Number.parse(this.timeout) <= 0) {
            this.timeout = defaultTimeout;
        };
        if (this.domain == "") {
            this.domain = "local";
        };
        var headerList = "";
        for (var h in headers) {
            headerList += h + ":" + headers[h];
        };
        this.id = this.url + "!" + (this.postString || "").encodeURI() + "!" + headerList.encodeURI();
        //*****************************************
        //warning do not change these comment lines
        //++[debug function begin]++
        //*****************************************
        debug.output("Single Request", [
			"id: " + this.id,
			"type: " + this.type,
			"url: " + this.url,
			"context: " + this.context,
			"callback: " + this.callback,
			"method: " + this.method,
			"postString: " + this.postString,
			"timeout: " + this.timeout,
			"tag: " + this.tag,
			"proxy: " + this.proxy,
			"domain: " + this.domain,
			"readyState: " + this.readyState
        ]);
        //*****************************************
        //warning do not change these comment lines
        //++[debug function end]++
        //*****************************************
        if (!domains.contains(this.domain)) {
            domains.add(this.domain, new Processor(this.domain));
        };
        debug.output("Domains", domains.getNames());
    };

    //register base domain
    networking.registerBaseDomain = function () {
        if (registered) { return; };
        var domainName = currentDomain.split(":")[0];
        var sidx = domainName.lastIndexOf(".", domainName.length - idx);
        if (idx > 0) {
            document.domain = domainName;
            try {
                var sidx = domainName.lastIndexOf(".", idx);
                if (sidx != -1) {
                    idx = sidx + 1;
                } else {
                    idx = 0;
                };
                domainName = domainName.substring(idx);
                document.domain = domainName;
            } catch (ex) {
                debug.output("registerBaseDomain", ex.toString());
            };
        };
        domainRegistered = true;
    };

    networking.abortAll = function () {
        var items = domains.getValues();
        for (var i = 0; i < items.length; ++i) {
            items[i].abortAll();
        };
    };

    networking.abortGroup = function (tag) {
        var items = domains.getValues();
        for (var i = 0; i < items.length; ++i) {
            items[i].abortGroup(tag);
        };
    };

    networking.createRequest = function (
		type,
		url,
		context,
		callback,
		method,
		postString,
		headers,
		timeout,
		tag,
		proxy,
		auth) {
        var request = {};
        var req = new Request(
			type,
			url,
			context,
			callback,
			method,
			postString,
			headers,
			timeout,
			tag,
			proxy,
			auth);
        var executing = false;
        request.execute = function () {
            if (!executing) {
                if (!auth) {
                    domains.get(req.domain).add(req);
                    executing = true;
                };
            };
        };
        request.isExecuting = function () {
            return executing;
        };
        request.abort = function () {
            domains.get(req.domain).abort(req);
        };
        return request;
    };

    networking.createBatchRequests = function (context, tag) {
        var instance = batcher = this;
        var batchRequests = [];
        var batchCallback = null;
        var batchContext = context;
        var batchTag = tag;
        var executing = false;
        var initializing = false;
        var itemReceived = 0;

        var done = function () {
            if (!initializing && batchRequests.length == itemReceived) {
                if (batchCallback) {
                    batchCallback(batchRequests, batchContext);
                };
                itemReceived = 0;
                executing = false;
            };
        };

        var doItemReceived = function (el, context) {
            batchRequests[context._idx].resource = el;
            ++itemReceived;
            done();
        };

        batcher.add = function (
			type,
			url,
			context,
			method,
			postString,
			headers,
			timeout,
			proxy,
			auth) {
            var count = batchRequests.length;
            if (!context) {
                context = {};
            } else {
                if (!(context instanceof Object)) {
                    context = new context.constructor(context);
                };
            };
            context._idx = count;

            batchRequests.add(
				networking.createRequest(
					type,
					url,
					context,
					doItemReceived,
					method,
					postString,
					headers,
					timeout,
					batchTag,
					proxy,
					auth
				)
			);
            batchRequests[count].type = type;
            batchRequests[count].context = context;
        };

        batcher.execute = function (callback) {
            batchCallback = callback;
            if (!executing) {
                executing = initializing = true;
                for (var i = 0; i < batchRequests.length; ++i) {
                    batchRequests[i].execute();
                };
                initializing = false;
                done();
            };
        };

        batcher.abort = function () {
            batchCallback = null;
            for (var i = 0; i < batchRequests.length; ++i) {
                batchRequests[i].abort();
            };
            executing = false;
        };

        return batcher;
    };

}).registerStaticClass("Web.Network");

usingNamespace("Web.Exception")["EventHandler"] = (function (a, b, c) {
    var qsb = new Web.QueryStringBuilder();
    qsb.add("u", navigator.userAgent);
    qsb.add("e", a);
    qsb.add("s", b);
    qsb.add("l", c);
    //alert([navigator.userAgent,a,b,c]);
    debug.output("Exception", [navigator.userAgent, a, b, c]);
    return true
}).registerClass("Web.Exception.EventHandler");

Date.Weeks = {
    Single: ["S", "M", "T", "W", "T", "F", "S"],
    Short: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."],
    Long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};

Date.Months = {
    Short: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
    Long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};

Date.prototype.toDisplayString = function (pattern) {
    if (String.isNullOrEmpty(pattern)) {
        pattern = "MM/dd/yyyy hh:mm:ss tt www";
    };
    var sWeek = Date.Weeks.Short;
    var lWeek = Date.Weeks.Long;
    var dtt = {
        sM: !/MM/.test(pattern),
        sD: !/dd/.test(pattern),
        sY: !/yyyy/.test(pattern),
        sW: !/www/.test(pattern)
    };
    var tmt = {
        sH: !/hh/.test(pattern),
        sM: !/mm/.test(pattern),
        sS: !/ss/.test(pattern),
        aP: /tt/.test(pattern)
    };
    var raw = {
        M: this.getMonth(),
        d: this.getDate(),
        y: this.getFullYear(),
        w: this.getDay(),
        h: this.getHours(),
        m: this.getMinutes(),
        s: this.getSeconds()
    };
    var dtd = {
        m: ((raw.M + 1 + 100) + "").substr(1),
        d: ((raw.d + 100) + "").substr(1),
        y: raw.y + "",
        w: raw.w
    };
    var tmd = {
        h: (((tmt.aP) ? ((raw.h > 12) ? raw.h - 12 : raw.h) : raw.h) + 100 + "").substr(1),
        m: ((raw.m + 100) + "").substr(1),
        s: ((raw.s + 100) + "").substr(1),
        t: (tmt.aP) ? ((raw.h > 12) ? "PM" : "AM") : ""
    };
    dtd.m = dtt.sM ? Math.floor(dtd.m) + "" : dtd.m;
    dtd.d = dtt.sD ? Math.floor(dtd.d) + "" : dtd.d;
    dtd.y = dtt.sY ? dtd.y.substring(dtd.y.length - 2, dtd.y.length) : dtd.y;
    dtd.w = (dtt.sW) ? sWeek[dtd.w] : lWeek[dtd.w];

    tmd.h = tmt.sH ? Math.floor(tmd.h) + "" : tmd.h;
    tmd.m = tmt.sM ? Math.floor(tmd.m) + "" : tmd.m;
    tmd.s = tmt.sS ? Math.floor(tmd.s) + "" : tmd.s;

    pattern = pattern.replace(/M+/g, dtd.m);
    pattern = pattern.replace(/d+/g, dtd.d);
    pattern = pattern.replace(/y+/g, dtd.y);

    pattern = pattern.replace(/h+/g, tmd.h);
    pattern = pattern.replace(/m+/g, tmd.m);
    pattern = pattern.replace(/s+/g, tmd.s);
    pattern = pattern.replace(/t+/g, tmd.t);

    pattern = pattern.replace(/w+/g, dtd.w);
    return pattern;
};

Date.getLocalTimeByUTC = function (s) {
    var ut = Date.tryParse(s, new Date());
    var lt = new Date();
    var utc = {
        M: ut.getMonth(),
        d: ut.getDate(),
        y: ut.getFullYear(),
        h: ut.getHours(),
        m: ut.getMinutes(),
        s: ut.getSeconds()
    };
    lt.setUTCMonth(utc.M);
    lt.setUTCDate(utc.d);
    lt.setUTCFullYear(utc.y);
    lt.setUTCHours(utc.h);
    lt.setUTCMinutes(utc.m);
    lt.setUTCSeconds(utc.s);

    return lt;
};

Date.prototype.toUTCDisplayString = function (pattern) {
    var utc = {
        M: this.getUTCMonth(),
        d: this.getUTCDate(),
        y: this.getUTCFullYear(),
        h: this.getUTCHours(),
        m: this.getUTCMinutes(),
        s: this.getUTCSeconds()
    };
    var ult = new Date();
    ult.setMonth(utc.M);
    ult.setDate(utc.d);
    ult.setFullYear(utc.y);
    ult.setHours(utc.h);
    ult.setMinutes(utc.m);
    ult.setSeconds(utc.s);

    return ult.toDisplayString("MM/dd/yyyy hh:mm:ss");
};

if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function (key) {
        function f(n) {
            return n < 10 ? '0' + n : n;
        }
        return this.getUTCFullYear() + '-' +
            f(this.getUTCMonth() + 1) + '-' +
            f(this.getUTCDate()) + 'T' +
            f(this.getUTCHours()) + ':' +
            f(this.getUTCMinutes()) + ':' +
            f(this.getUTCSeconds()) + '.' +
            f(this.getUTCMilliseconds()) + 'Z';
    };
}
﻿//mark ===================================
//do not copy this object from asp version
usingNamespace("Web")["StateManager"]={
	Cookies:{
		Name:{
			COUNTRY:"NV_COUNTRY",
			CFG:"NV_CONFIGURATION",
			LOGIN:"NV_OTHERINFO",
			CART:"NV_CARTINFO",
			CPCOMBO:"CELL_PHONE_COMBO",
			CPPACKAGE:"CELL_PHONE_PACKAGE",
			PRDLIST:"NV_PRDLIST",
			CUSTOMER_REVIEW:"NV_CUSTOMERREVIEWCOOKIE",
			DEVICEINFO:"NV_DVINFO",
			GOOGLEANALYTICS:"NV_GOOGLE_ANALYTICS",
			ANTIPRICE:"NV_Anti",
			UTMA:"__utma",
			NVTC: "NVTC",
			SPT: "NV_SPT",
			NEGC: "NV_NEWEGGCOOKIE"
		},		
		//you can attain subcookie name like Web.StateManager.Cookies.SubCookies.SearchPanelTab 
		SubCookies:{		
//			DEPA:"wd",
//			SearchPanelTab:"we",
//			FV:"wo",
//			CellPhoneZipCode:"wy",
//			EnableAction:"w7",
//			VideoID:"w17",
//			VideoItem:"w18",
//			LOGINID6:"sd",
//			CONTACTWITH:"si",
//			ID:"sn",
//			IsHttps:"s77",
//			Switching:"s78",
//			PCID:"w19",
//			ItemViewed:"wf",
//			EnableAction:"w7",
			AID:"ww",
			AutoSplit:"s0",
			bCILead:"w13",
			BestMatch:"wn",
			CardNumber:"s68",
			CartID:"s60",
			CartNo:"s59",
			CCatalogStyle:"ws",
			CELL_PHONE_ITEM:"wz",
			CELL_PHONE_PLAN:"w0",
			CellPhoneZipCode:"wy",
			CMP:"wt",
			CMP_Survey:"w9",
			CONTACTWITH:"si",
			CusReviewPageSize:"w15",
			CusReviewSortBy:"w16",
			CustomerNumber:"s61",
			CustPagesize:"wm",
			DEFAULTSHOPPINGURL:"sv",
			DEPA:"wd",
			EnableAction:"w7",
			FinalTotalMoney:"s6",
			FV:"wo",
			ID:"sn",
			ISB2BINTERNALLOGIN:"w29",
			IsFromGoogle:"w14",
			IsHttps:"s77",
			IsInputMaxQty:"s8",
			ISREMEMBER:"sj",
			ItemViewed:"wf",
			jftid:"w23",
			JUMPEDLOCATION:"sr",
			JUMPEDSERVER:"sq",
			JumpFlag:"s55",
			LANGUAGE:"w30",
			Line1:"w2",
			Line2:"w3",
			Line3:"w4",
			Line4:"w5",
			Line5:"w6",
			LoginFlag:"s54",
			LOGINID4:"sc",
			LOGINID5:"sb",
			LOGINID6:"sd",
			LoginName:"s62",
			Lpage:"w20",
			M1:"s27",
			M10:"s36",
			M11:"s37",
			M12:"s38",
			M13:"s39",
			M14:"s40",
			M2:"s28",
			M3:"s29",
			M4:"s30",
			M5:"s31",
			M6:"s32",
			M7:"s33",
			M8:"s34",
			M9:"s35",
			MsclkID:"w25",
			multipollid:"s75",
			MyNewegg_State:"w27",
			NV_B2BCUSTOMER:"sm",
			NV_CONTACTUS_COOKIE:"s74",
			NV_SHOPPINGCARTID:"s9",
			NVS_ACADEMICSFSIGN:"su",
			NVS_AGREENEWSLETTER_PCODE:"s10",
			NVS_APOSIGN:"s5",
			NVS_BML_PROMPT_FLAG:"s73",
			NVS_COMPLETEORDER_PCMAG:"s2",
			NVS_COMPLETEORDER_RUSHORDERFEE:"s1",
			NVS_CORELSFSIGN:"st",
			NVS_CURPAGE:"s4",
			NVS_CUSTOMER_COUNTY:"sf",
			NVS_CUSTOMER_PAYPALEMAILADDRESS:"s7",
			NVS_CUSTOMER_PROMOTION_CODE:"sx",
			NVS_CUSTOMER_SHIPPING_METHOD:"s12",
			NVS_CUSTOMER_SHIPPING_METHOD1:"s13",
			NVS_CUSTOMER_SHIPPING_METHOD10:"s22",
			NVS_CUSTOMER_SHIPPING_METHOD11:"s23",
			NVS_CUSTOMER_SHIPPING_METHOD12:"s24",
			NVS_CUSTOMER_SHIPPING_METHOD13:"s25",
			NVS_CUSTOMER_SHIPPING_METHOD14:"s26",
			NVS_CUSTOMER_SHIPPING_METHOD2:"s14",
			NVS_CUSTOMER_SHIPPING_METHOD3:"s15",
			NVS_CUSTOMER_SHIPPING_METHOD4:"s16",
			NVS_CUSTOMER_SHIPPING_METHOD5:"s17",
			NVS_CUSTOMER_SHIPPING_METHOD6:"s18",
			NVS_CUSTOMER_SHIPPING_METHOD7:"s19",
			NVS_CUSTOMER_SHIPPING_METHOD8:"s20",
			NVS_CUSTOMER_SHIPPING_METHOD9:"s21",
			NVS_CUSTOMER_SHIPPINGSTATE:"sg",
			NVS_CUSTOMER_ZIP_CODE:"se",
			NVS_FIRSTTIMETOTHISPAGE:"s3",
			NVS_MFACADEMICSFSIGN:"sw",
			NVS_NEWEGGGIFTCODES:"sy",
			NVS_NEWEGGGIFTPWDS:"sz",
			NVS_NPA_PROMPT_FLAG:"s72",
			NVS_SAMEDAYELIGIBLESTATE:"s11",
			NVS_TRUCK_SHIPPING_METHOD:"s53",
			NVS_VENDER_AITSHIPPING_METHOD:"s51",
			NVS_VENDER_SHIPPING_METHOD:"s50",
			ORDERCOMMON_SHIPPING_SETTINGFLAGM10:"s43",
			ORDERCOMMON_SHIPPING_SETTINGFLAGM11:"s44",
			ORDERCOMMON_SHIPPING_SETTINGFLAGM12:"s45",
			ORDERCOMMON_SHIPPING_SETTINGFLAGM13:"s46",
			ORDERCOMMON_SHIPPING_SETTINGFLAGM14:"s47",
			ORDERCOMMON_SHIPPING_SETTINGFLAGM8:"s41",
			ORDERCOMMON_SHIPPING_SETTINGFLAGM9:"s42",
			P:"w28",
			PageStyle:"wa",
			PayoutRate:"w26",
			PCID:"w19",
			PID:"wv",
			Plan:"w1",
			Ppage:"w21",
			PrdDisplayStyle:"wh",
			PrdFieldSettings:"wi",
			PrdPageSize:"wg",
			PrdSumOrderby:"wk",
			PrdSumSortby:"wj",
			PreSONumbers:"s57",
			PromotionID:"w8",
			PronunciationNumber:"so",
			QuerySQL:"s70",
			RebateOrderBy:"wq",
			RebateSortBy:"wp",
			REFERENCEURL:"wu",
			ReviewSortType:"wc",
			ROI_mpuid:"sp",
			sCICPNCode:"w12",
			sCIITEM:"w10",
			sCISRCCode:"w11",
			SearchPanelTab:"we",
			ShoppingCartActionType:"s48",
			ShoppingCartZipCode:"s49",
			SHSIGN:"sk",
			SID:"wx",
			SoAmounts:"s63",
			SONumbers:"s56",
			SortBy:"wl",
			SSSC:"s79",
			Switching:"s78",
			TEST_STATUS:"w24",
			Theme:"wb",
			TRACKING_PIXEL:"w22",
			TransactionID:"s67",
			TRANSACTIONSERVERID:"ss",
			TransNo:"sl",
			UploadID:"sa",
			VENDER_AUTOSPLIT:"s52",
			VideoID:"w17",
			VideoItem:"w18",
			VoucherNumber:"s58",
			WishListSubmitRestrict:"s76",
			Layout:"w32",
			Compare:"w31",
			Token:"w33",
			CaptchaGuid:"w34",
			SurveyFlag:"w35",
            SurveyVisit:"w36",
            Tid:"w39",
            ItemNo:"s92",
            BlackOut:"w40",
            SmartSort:"w42",
            ShellshockerTransNO:"w44",
            ShellshockerItemType:"w45",
			HomePage2011:"w46",
			ItemOrdered:"w47",
			ItemSearchKeyWords:"w48",
			EnhanceCrossSell:"w49",
			InvodoVideoFlag: "w50",
		    TransferToCAN: "w53",
		    ItemInnerSearchKeyWords:"w54",
		    SearchScope: "w55",
		    NVS_CUSTOMERINFO_ACTIVE_POINTS: "s111",
		    NVS_CUSTOMERINFO_POINT_EXPIRE_DATE: "s112",
		    NVS_CUSTOMERINFO_ISPREMIER: "s115",
		    RegionCode: "w57",
		    CurrencyCode: "w58",
		    IsPopupSelectorInHomePage: "w59"
		},
		mapSubCookie:function(s){
			var v=Web.StateManager.Cookies.SubCookies[s];	
			var to=!String.isNullOrEmpty(v)?v:s;
			debug.output("map:",s+">>"+ to);
			return to;
		},
		reflectSubCookie:function(s){
			if(String.isNullOrEmpty(Web.StateManager.Cookies.SubCookies2)){
				var tg={};
				var sr=Web.StateManager.Cookies.SubCookies;
				for(var k in sr){
					tg[sr[k]]=k;
				};
				Web.StateManager.Cookies.SubCookies2=tg;
			};
			var v=Web.StateManager.Cookies.SubCookies2[s];			
			var to=!String.isNullOrEmpty(v)?v:s;
			debug.output("reflect",s+">>"+to);
			return to;
		},
		get:function(n,k,exd){			
			if(String.isNullOrEmpty(n)){
				return "";
			};
			var hc=Sys.Web.Cookies.Helper.get(n);
			if (String.isNullOrEmpty(k)) {
			    if (exd === true) {
			        debug.output("Get decode Cookie", [n + "=" + hc.toCookieURIString()]);
			        return hc.toCookieURIString();
			    } else {
			        debug.output("Get Cookie", [n + "=" + hc.toString().decodeURI()]);
			        return hc.toString().decodeURI();
			    }
			};
			
			if(hc.compressed){
				return hc.getKeyValue(Web.StateManager.Cookies.mapSubCookie(k));
			}
			else{
				debug.output("Get SubCookie",[n+"="+hc.getKeyValue(k)]);
				return hc.getKeyValue(k);
			};
		},
		save:function(n,v,exd){
			var hc=new Sys.Web.Cookies.HttpCookie(n);
			hc.version=(Web.Config.Environment.Cookies.EnableCookieNameMapping)?"#5":"#4";
			hc.compressed=(Web.Config.Environment.Cookies.EnableCookieNameMapping);		
			try{
				var c;
				if(null!=(c=Web.Config.CookieMapping[n])){
					hc.domain=c[0];
					var seconds;
					var ad_c=Object.isNull(exd)?0:Number.parse(exd);
					var ad=Number.parse(c[1]);
                    if(ad_c>0){
                        seconds=ad_c;
                    }else if(ad>0){
                        seconds=ad;
                    };
				    if(seconds>0){
					    var d=new Date();
					    d.setTime(d.getTime()+seconds*1000);
					    hc.expires=d;
				    };
					hc.path=c[2];
					hc.secure=c[3];
				}
			}catch(ex){};

			switch(Object.getTypeName(v)){
				case "String":
					hc.value=v;
					break;
				case "Object":
				    for (var k in v) {
				        //inorder to fix big cookie issue, don't save cookie when value in the prototype
				        if (v.hasOwnProperty(k)) {
				            var k2 = hc.compressed ? Web.StateManager.Cookies.mapSubCookie(k) : k;
				            hc.setKey(k2, v[k]);
				        }
				    }
					break;
				default:
					return;
			};
			debug.output("Save Cookies",hc.toHttpCookieString());
			debug.assert(hc.toString().length>0,"Save Empty Cookies",hc.toHttpCookieString());
			Sys.Web.Cookies.Helper.save(hc);
		},
		clear:function(n){
			var hc=new Sys.Web.Cookies.HttpCookie(n);			
			hc.version=(Web.Config.Environment.Cookies.EnableCookieNameMapping)?"#5":"#4";
			hc.compressed=(Web.Config.Environment.Cookies.EnableCookieNameMapping);			
			try{
				var c;
				if(null!=(c=Web.Config.CookieMapping[n])){
					hc.domain=c[0];
					hc.path=c[2];
					hc.secure=c[3];
				};
			}catch(ex){};
			Sys.Web.Cookies.Helper.clear(hc);
		}
	}
};
//mark ===================================

usingNamespace("Web.UI")["ResourceManager"]={
	Image:{
		build:function(n){
			if(String.isNullOrEmpty(n)){return;};
			var p=Web.Config.Environment.Path.Images+n;
			switch(Web.Environment.Protocol()){
				case Web.Enum.Protocol.http:
					return Web.Config.Environment.Url.HttpCache+p;
				case Web.Enum.Protocol.https:
					return Web.Config.Environment.Url.HttpsCache+p;
				default:
					return p;
			};
		}
	},
	Scripts:{build:function(){}},
	Css:{build:function(){}},
	Url:{
		build:function(p){
			if(String.isNullOrEmpty(p)){return;};
			switch(Web.Environment.Protocol()){
				case Web.Enum.Protocol.http:
					return Web.UI.ResourceManager.Url.www(p);
				case Web.Enum.Protocol.https:
					return Web.UI.ResourceManager.Url.secure(p);
				default:
					return p;
			};
		},
		combine:function(url,qs){
			return url+((qs.length>0)?"?"+qs:qs);
		},
		www:function(p){
			return Web.Config.Environment.Url.WWW+String.parse(p);
		},
		shopper:function(p){
			return Web.Config.Environment.Url.Shopper+String.parse(p);
		},
		secure:function(p){
			return Web.Config.Environment.Url.Secure+String.parse(p);
		}
	}
};

usingNamespace("Web.UI")["Control"]={
	create:function(n,a){
		var o=document.createElement(n);
		Web.UI.Control.setAttribute(o,a);
		return o;
	},
	appendChild:function(p,c){
		if(null!=p&&null!=c&&null!=p["appendChild"]){
			p.appendChild(c);
		};
	},
	removeChild:function(p,c){
		if(null!=p&&null!=c&&null!=p["removeChild"]){
			if(Web.Environment.Browser.isIE()){
				Web.UI.Control.purge(c);
			};
			p.removeChild(c);
		};
	},
	appendInnerHTML:function(p,h){
		if(null!=p&&null!=p["innerHTML"]){
			p.innerHTML+=h;
		};
	},
	replaceInnerHTML:function(p,h){
		if(null!=p&&null!=p["innerHTML"]){
			if(Web.Environment.Browser.isIE()){
				Web.UI.Control.purge(p,true);
			};
			p.innerHTML=h;
		};
	},
	setAttribute:function(o,a){
		if(Object.isNull(o)||Object.isNull(a)){return;};
		for(var n in a){
			var co=o;
			var p=n.split(".");
			for(var i=0;i<p.length-1;++i){if(!co[p[i]]){co={};}else{co=co[p[i]]};};
			co[p[p.length-1]]=a[n];
		};
	},
	purge:function(d,onlyChildren){
		if(null==d){return;};
		if(!onlyChildren){			
			var a=d.attributes,i,l,n;
			if(a){
				l=a.length;
				for(i=0;i<l;++i){
					n= [i].name;
					if(typeof(d[n])==='function'){
						d[n]=null;
					};
				};
			};
		};
		if(["select","tr"].contains(d.nodeName.toLowerCase())){return;};
		a=d.childNodes;
		if(a){
			l=a.length;
			for(i=0;i<l;++i){
				Web.UI.Control.purge(d.childNodes[i]);
			};
		};
	},
	openWindow:function(url,target,w,h,t,l,a){	
		if (!Number.isNumeric(w)||!Number.isNumeric(h)){throw new Error("Invalid window width or height.");};
		var we=Web.Environment;
		t=",top="+ (Number.isNumeric(t)?t:0);
		l=",left="+ (Number.isNumeric(l)?l:0);
		a=",directories=0"+ (a?(","+a.toString()):"");

		if(we.OS.isWin()&&we.Browser.isAol()){w+=20;h+=20;};
		if(a.search(/scrollbars=(1|true)/ig)>=0){
			if(we.OS.isMac()&&we.Browser.isNetscape()){w+=17};
			if(we.OS.isWin()){w+=16;}
		}
		w="width="+w;
		h=",height="+h;
		window.open(url,target,w+h+t+l+a);
	},
	addCss:function(o,a){
		if(Object.isNull(o)){return;};
		var cl=o.className.split(" ");
		switch(Object.getTypeName(a)){
			case "String":
				if(!cl.contains(a)){cl.add(a);};
				break;
			case "Array":
				for(var i=0;i<a.length;++i){
					if(!cl.contains(a[i])){cl.add(a[i]);};
				};
				break;
			default:
		};
		Web.UI.Control.setAttribute(o,{"className":cl.join(" ")});
	},
	removeCss:function(o,a){
		if(Object.isNull(o)){return;};
		var cl=o.className.split(" ");
		switch(Object.getTypeName(a)){
			case "String":
				cl.remove(a);
				break;
			case "Array":
				for(var i=0;i<a.length;++i){
					cl.remove(a[i]);
				};
				break;
			default:
		};
		Web.UI.Control.setAttribute(o,{"className":cl.join(" ")});
	},
	replaceCss:function(o,a,r){
		if(Object.isNull(o)){return;};
		var cl=o.className.split(" ");
		switch(Object.getTypeName(a)){
			case "String":
				cl.remove(a);
				break;
			case "Array":
				for(var i=0;i<a.length;++i){
					cl.remove(a[i]);
				};
				break;
			default:
		};
		switch(Object.getTypeName(r)){
			case "String":
				cl.add(r);
				break;
			case "Array":
				cl.addRange(r);
				break;
			default:
		};
		Web.UI.Control.setAttribute(o,{"className":cl.join(" ")});
	},
	clearCss:function(o){
		Web.UI.Control.setAttribute(o,{"className":""});
    },
    getElementsByClassName: function (className, node, tag) {
        if (String.isNullOrEmpty(className)) {
            return null;
        };
        if (node == null) { node = document; };
        //FF,Chorme
        if (node.getElementsByClassName) {
            return node.getElementsByClassName(className);
        }
        else {
            //IE
            var classElements = new Array();
            if (tag == null) {
                tag = '*';
            }
            var els = node.getElementsByTagName(tag);
            var elsLen = els.length;
            var pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");
            for (i = 0, j = 0; i < elsLen; i++) {
                if (pattern.test(els[i].className)) {
                    classElements[j] = els[i];
                    j++;
                }
            }
            return classElements;
        }
	}
};

usingNamespace("Web.UI")["Form"]={
	reset:function(n){
		var f;if(null!=(f=Web.UI.Form.get(n))){f.reset();};
	},
	submit:function(n){
		var f;if(null!=(f=Web.UI.Form.get(n))){f.submit();};
	},
	get:function(n){
		return document.forms[n]||null;
	},
	getElement:function(n,eln){
		return Web.UI.Form.getElements(n,eln);
	},
	getElements:function(n,eln){
		var f;
		if(null!=(f=Web.UI.Form.get(n))){
			if(!String.isNullOrEmpty(eln)){
				return f[eln];
			}else{
				return f.elements;
			};
		};
		return null;
	},
	getValuesBase:function(items){
		if(!items){return [];}
		if (!String.isNullOrEmpty(items.type)){items=[items];}
		var values=[];
		for(var i=0;i<items.length;++i){
			switch(items[i].type){
				case "radio":
					if(items[i].checked && !String.isNullOrEmpty(items[i].value)){
						values.add(items[i].value);
					};
					break;
				case "checkbox":
					if(items[i].checked && !String.isNullOrEmpty(items[i].value)){
						values.add(items[i].value);
					};
					break;
				case "select-multipe":
					var options=items[i].options;
					for(var j=0;j<options.length;++j){
						if(options[j].selected && !String.isNullOrEmpty(options[j].value)){
							values.add(options[j].value);
						};
					};
					break;
				case "select-one":
				default:
					if(!String.isNullOrEmpty(items[i].value)){values.add(items[i].value);};
			};
		};
		return values;
	},
	setValue:function(n,eln,v){
		var el=Web.UI.Form.getElement(n,eln);
		if(el){el["value"]=v;};
	},
	getValue:function(n,eln){
		var wuf=Web.UI.Form;
		var el=wuf.getElement(n,eln);
		return wuf.getValuesBase(el)[0]||"";
	},
	getValues:function(n,eln){
		var wuf=Web.UI.Form;
		var values=[];
		switch(Object.getTypeName(eln)){
			case "String":
				var el=wuf.getElement(n,eln);
				values.addRange(wuf.getValuesBase(el));
				break;
			case "Array":
				for(var i=0;i<eln.length;++i){
					var el=wuf.getElement(n,eln[i]);
					values.addRange(wuf.getValuesBase(el));
				};
				break;
			default:
				var els=wuf.getElements(n);
				values.addRange(wuf.getValuesBase(els));
		};
		return values;
	},
	selectedOptions:function(n,eln,v){
		var wuf=Web.UI.Form;
		if(Object.isNull(v)){return;};
		if(Object.getTypeName(v)!="Array"){
			v=[v.toString()];
		};
		
		var el=wuf.getElement(n,eln);
		if(el.options){
			for(var i=0;i<el.options.length;++i){				
				if(v.contains(el.options[i].value)){
					el.options[i].selected=true;
				};
			};
		};
	}
};

usingNamespace("Web.UI.Form")["Radio"]={
	allowCancelForm:function(){
		for(var i=0;i<arguments.length;++i){
			var f=null;
			if(null!=(f=document.forms[arguments[i]])){
				for(var j=0;j<f.elements.length;++j){
					if(f.elements[j].type=="radio"){
						Web.UI.Form.Radio.allowCancel(f.elements[j]);
					};
				};
			};
		};
	},
	allowCancelElement:function(n,eln){
		var items=Web.UI.Form.getElement(n,eln);
		if (!items){return;};
		if (!items.length){items=[items];};
		for(var j=0;j<items.length;++j){
			if(items[j].type=="radio"){
				Web.UI.Form.Radio.allowCancel(f.elements[j]);
			};
		};
	},
	allowCancel:function(o){
		if(o){
			var oName=o.name;
			var oId=o["id"]||null;
			var fName=(o.form)?o.form.name:"Undefined";
			o["__checked"]=usingNamespace("Runtime.Control.Forms."+ fName +".Radio."+ oName);

			if(!oId){
				if(!o["__checked"]["__createId"]){o["__checked"]["__createId"]=oName+"_"+0;};
				var tId=o["__checked"]["__createId"].split("_");
				tId[1]=(tId[1]-0)+1;
				o.id=tId.join("_");
				o["__checked"]["__createId"]=o.id;
			};
			var cId="";
			if(o.defaultChekced||o.checked){
				cId=o.id;
			};
			o["__checked"]["__id"]=cId;
			o.attachEvent("onclick", Web.UI.Form.Radio.cancel);
		};
	},
	cancel:function(){
		var io=window.event.srcElement;
		var nId="";
		if(io["__checked"]["__id"]==io.id){
			io.checked=false;
		}else{
			nId=io.id;
		};
		io["__checked"]["__id"]=nId;
	}
};

usingNamespace("Web.UI.Image")["Rotation"]={
	index:0,
	pointer:null,
	rimage:null,
	imgList:[],
	hrefList:[],
	time:4000,
	type:{"LEFT":"L","RIGHT":"R"},
	addImage:function(n,h){
		Rotation.imgList.push(n);
		Rotation.hrefList.push(h);
	},
	_slide:function(idx){
		var r=Rotation;
		var ro=r.rimage;
		var co=(ro.childNodes!=null&&ro.childNodes.length>0)?ro.childNodes[0]:null;
		ro.style.backgroundImage="url('"+r.imgList[idx]+"')";
		if(co!=null && co.href){
			co.href=r.hrefList[idx];
		};
	},
	slide:function(rtype){
		var r=Rotation;
		var sf=false;
		switch(rtype){
			case r.type.LEFT:
				r.index--;
				sf=true;
				break;
			case r.type.RIGHT:
				r.index++;
				sf=true;
				break;
			default:
				r.index++;
				break;
		};
		if(r.index==r.imgList.length){
			r.index=0;
		}else if(r.index<0){
			r.index=r.imgList.length-1;
		};
		if(sf){r.stop(r.pointer);};
		r._slide(r.index);
		if(sf){r.start();};
	},
	left:function(){
		Rotation.slide(Rotation.type.LEFT);
	},
	right:function(){
		Rotation.slide(Rotation.type.RIGHT);
	},
	start:function(){
		var r=Rotation;
		if(r.imgList.length>1){
			r.pointer=setInterval((function(){r.slide();}),r.time);
		};
	},
	stop:function(p){
		clearInterval(p);
	}
};

usingNamespace("Web.Plugin")["Flash"]={
	installedSign:0,
	version:0,
	check:function(){
		var wpf=Web.Plugin.Flash;
		if(navigator.plugins&&navigator.plugins.length){
			var x=navigator.plugins["Shockwave Flash"];
			if(x){
				wpf.installedSign=2;
				if(x.description){
					var y=x.description;
					wpf.version=y.charAt(y.indexOf('.')-1);
				};
			}else{
				wpf.installedSign=1;
			};
			if(navigator.plugins["Shockwave Flash 2.0"]){
				wpf.installedSign=2;
				wpf.version=2;
			};
		}else if(navigator.mimeTypes&&navigator.mimeTypes.length){
			var x=navigator.mimeTypes['application/x-shockwave-flash'];
			wpf.installedSign=(x&&x.enabledPlugin)?2:1;
		}else{
			//just for IE detection.
			for(var i=8;i>=0;i--){
				var obj="ShockwaveFlash.ShockwaveFlash."+i;
				try{
					var flash = new ActiveXObject(obj);
					wpf.installedSign=2;
					wpf.version=i;
					break;
				}catch(e){};
			};
		};
	},
	isInstalled:function(){
		var wpf=Web.Plugin.Flash;
		wpf.check();
		return (wpf.installedSign==2&&wpf.version)?true:false;
	}
};

usingNamespace("Web")["Caching"]={
	SyncCookie:function(syncdata){
	    var changeCookies=JSON.parse(syncdata,null);
	    for(var i=0;i<changeCookies.length;i++)
	    {
	        var changeCookie=changeCookies[i];
	        for(var j=0;j<changeCookie.changeCookieValues.length;j++){
	            var changeCookieValue=changeCookie.changeCookieValues[j];
	            if(String.isNullOrEmpty(changeCookieValue.value)){
		            continue;
	            };
				if(changeCookieValue.key=="ItemViewed"&&changeCookie.name=="NV_PRDLIST"){
					var arrItemNumber,currentItemNumber="";
					var viewItems=Web.StateManager.Cookies.get(Web.StateManager.Cookies.Name.PRDLIST,"ItemViewed");
					arrItemNumber=changeCookieValue.value.split("#");
					if(arrItemNumber!=null&&arrItemNumber.length>0){
					   currentItemNumber=arrItemNumber[0]; 
						if(!String.isNullOrEmpty(viewItems)&&!String.isNullOrEmpty(currentItemNumber)){
							var arrViewItems=viewItems.split("#");
							var arrNewItems=[];
							for(var m=0;m<arrViewItems.length;m++)
							{
								if(currentItemNumber!=arrViewItems[m])
								{
									arrNewItems.add(arrViewItems[m]);
								}
							}
							for(var n=0;n<arrNewItems.length;n++)
							{
								currentItemNumber+="#"+arrNewItems[n];
								if(n==4)
								{
									break;
								}
							}
						}               
					} 
					changeCookieValue.value=currentItemNumber;   
				}
                var strTemp='{"'+changeCookieValue.key+'":"'+changeCookieValue.value+'"}';
                var cookieobj=Object.fromJSON(strTemp);
                
                if(String.isNullOrEmpty(changeCookie.name) || String.isNullOrEmpty(changeCookieValue.key)){
	                return;
                };
                Web.StateManager.Cookies.save(changeCookie.name,cookieobj,changeCookie.expire);
	        }
	    }
    }
};

usingNamespace("Web.UI")["IFrame"]={
    getIFrameBody:function(iFrameEl) {
        var doc = null;
        if (iFrameEl.contentDocument) { 
        // For NS6
        doc = iFrameEl.contentDocument; 
        } else if (iFrameEl.contentWindow) { 
        // For IE5.5 and IE6
        doc = iFrameEl.contentWindow.document;
        } else if (iFrameEl.document) { 
        // For IE5
        doc = iFrameEl.document;
        } else {
        //alert("Error: could not find sumiFrame document");
        return null;
        }
        return doc.body;
    }
};


usingNamespace("Web.UI")["Items"] = {
    isStandardItem: function (item) {
        if (item) {
            return (/^\d{2}\-\d{3}\-\d{3}[r|c]?$/gi).test(item);
        }
        return false;
    },
    isNeweggItem: function (item) {
        if (item) {
            return (item.toUpperCase().indexOf('N82E168') > -1);
        }
        return false;
    },
    isParentItem: function (item) {
        if (item) {
            return (/^[^-]{3}-[^-]{4}-[^-]{5,6}$/gi).test(item);
        }
        return false;
    },
    isSFItem: function (item) {
        if (item) {
            return (/^\d+sf/gi).test(item);
        }
        return false;
    },
    isDVDorBooksItem: function (item) {
        if (item) {
            return (/^\d{12,13}[r|c]?$/gi).test(item);
        }
        return false;
    },
    isSNETItem: function (item) {
        if (item) {
            return (/^snet-\d{6}$/gi).test(item);
        }
        return false;
    },
    isINItem: function (item) {
        if (item) {
            return (/^[^-]{2}-[^-]{4}-in$/gi).test(item);
        }
        return false;
    },
    isTSItem:function(item){
        if(item){
            return (/^\d+ts/gi).test(item);;
        }
        return false;
    },
    isCVFItem: function (item) {
        if (item) {
            return (/^\d{2}\-\d{3}\-\d{3}cvf$/gi).test(item);
        }
        return false;
    },
    isAutoPartsItem: function (item) {
        if (item) {
            return (/^9at[^-]{4}[^-]{7,8}/gi).test(item);
        }
        return false;
    },
    isSellerItem:function(item){
        if(item){
            return (/^9si[^-]{4}[^-]{7,8}/gi).test(item);
        }
        return false;
    },
    isGCItem:function(item){
        if(item){
            return (/^gc-[^-]{3}-[^-]{3}$/gi).test(item);
        }
        return false;
    }
};

(function(){var l=this,aa=function(a,b,c){return a.call.apply(a.bind,arguments)},ba=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},m=function(a,b,c){m=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return m.apply(null,arguments)};var q=(new Date).getTime();var t=function(a){a=parseFloat(a);return isNaN(a)||1<a||0>a?0:a},ca=function(a,b){var c=parseInt(a,10);return isNaN(c)?b:c},da=/^([\w-]+\.)*([\w-]{2,})(\:[0-9]+)?$/,ea=function(a,b){if(!a)return b;var c=a.match(da);return c?c[0]:b};var fa=t("0.0"),ga=ca("101",-1),ha=ca("0",0),ia=t("0.1"),ja=t("0.001"),ka=t("0.001"),la=t("0.20"),ma=t("0.01"),na=t("0.01"),oa=t("");var v=function(){return"r20160505"},y=/^true$/.test("false")?!0:!1,pa=/^true$/.test("true")?!0:!1,qa=/^true$/.test("false")?!0:!1,ra=qa||!pa;var z=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},sa=/&/g,ta=/</g,ua=/>/g,va=/"/g,wa=/'/g,xa=/\x00/g,A={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\","<":"<"},B={"'":"\\'"},E=function(a,b){return a<b?-1:a>b?1:0};var ya=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e="string"==typeof a?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};var F;a:{var za=l.navigator;if(za){var Aa=za.userAgent;if(Aa){F=Aa;break a}}F=""}var G=function(a){return-1!=F.indexOf(a)};var H=function(a){H[" "](a);return a};H[" "]=function(){};var Ba=G("Opera"),I=G("Trident")||G("MSIE"),Ca=G("Edge"),J=G("Gecko")&&!(-1!=F.toLowerCase().indexOf("webkit")&&!G("Edge"))&&!(G("Trident")||G("MSIE"))&&!G("Edge"),Da=-1!=F.toLowerCase().indexOf("webkit")&&!G("Edge"),Ea=function(){var a=l.document;return a?a.documentMode:void 0},Fa;
a:{var Ga="",Ha=function(){var a=F;if(J)return/rv\:([^\);]+)(\)|;)/.exec(a);if(Ca)return/Edge\/([\d\.]+)/.exec(a);if(I)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Da)return/WebKit\/(\S+)/.exec(a);if(Ba)return/(?:Version)[ \/]?(\S+)/.exec(a)}();Ha&&(Ga=Ha?Ha[1]:"");if(I){var Ia=Ea();if(null!=Ia&&Ia>parseFloat(Ga)){Fa=String(Ia);break a}}Fa=Ga}
var Ja=Fa,Ka={},La=function(a){if(!Ka[a]){for(var b=0,c=z(String(Ja)).split("."),d=z(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"",k=RegExp("(\\d*)(\\D*)","g"),n=RegExp("(\\d*)(\\D*)","g");do{var p=k.exec(g)||["","",""],r=n.exec(h)||["","",""];if(0==p[0].length&&0==r[0].length)break;b=E(0==p[1].length?0:parseInt(p[1],10),0==r[1].length?0:parseInt(r[1],10))||E(0==p[2].length,0==r[2].length)||E(p[2],r[2])}while(0==b)}Ka[a]=0<=b}},Ma=l.document,Na=Ma&&
I?Ea()||("CSS1Compat"==Ma.compatMode?parseInt(Ja,10):5):void 0;var Oa;if(!(Oa=!J&&!I)){var Pa;if(Pa=I)Pa=9<=Number(Na);Oa=Pa}Oa||J&&La("1.9.1");I&&La("9");var Qa=function(a){try{var b;if(b=!!a&&null!=a.location.href)a:{try{H(a.foo);b=!0;break a}catch(c){}b=!1}return b}catch(c){return!1}},K=function(a,b){if(!(1E-4>Math.random())){var c=Math.random();if(c<b)return c=Ra(window),a[Math.floor(c*a.length)]}return null},Ra=function(a){try{var b=new Uint32Array(1);a.crypto.getRandomValues(b);return b[0]/65536/65536}catch(c){return Math.random()}},Sa=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.call(void 0,a[c],c,a)},Ta=function(a){var b=
a.length;if(0==b)return 0;for(var c=305419896,d=0;d<b;d++)c^=(c<<5)+(c>>2)+a.charCodeAt(d)&4294967295;return 0<c?c:4294967296+c};var Ua=function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c)};var Xa=function(a,b,c,d,e,f){try{if((d?a.X:Math.random())<(e||a.N)){var g=a.M+b+("&"+Va(c,1)),g=g.substring(0,2E3);"undefined"===typeof f?Wa(g):Wa(g,f)}}catch(h){}},Va=function(a,b){var c=[];Sa(a,function(a,e){var f=null,g=typeof a;if(("object"==g&&null!=a||"function"==g)&&2>b)f=Va(a,b+1);else if(0===a||a)f=String(a);f&&c.push(e+"="+encodeURIComponent(f))});return c.join("&")},Wa=function(a,b){l.google_image_requests||(l.google_image_requests=[]);var c=l.document.createElement("img");if(b){var d=
function(a){b(a);a=d;c.removeEventListener?c.removeEventListener("load",a,!1):c.detachEvent&&c.detachEvent("onload",a);a=d;c.removeEventListener?c.removeEventListener("error",a,!1):c.detachEvent&&c.detachEvent("onerror",a)};Ua(c,"load",d);Ua(c,"error",d)}c.src=a;l.google_image_requests.push(c)};var Ya=document,L=window,Za=null,M=Ya.getElementsByTagName("script");M&&M.length&&(Za=M[M.length-1]);var $a=Za;var ab=Object.prototype.hasOwnProperty,bb=function(a,b){for(var c in a)ab.call(a,c)&&b.call(void 0,a[c],c,a)},N=function(a){return!(!a||!a.call)&&"function"===typeof a},cb=function(a,b){for(var c=1,d=arguments.length;c<d;++c)a.push(arguments[c])},O=function(a,b){if(a.indexOf){var c=a.indexOf(b);return 0<c||0===c}for(c=0;c<a.length;c++)if(a[c]===b)return!0;return!1},db=function(a){"google_onload_fired"in a||(a.google_onload_fired=!1,Ua(a,"load",function(){a.google_onload_fired=!0}))},eb=function(a){a=
a.google_unique_id;return"number"===typeof a?a:0},fb=!!window.google_async_iframe_id;var gb=function(a){return(a=a.google_ad_modifications)?a.eids||[]:[]},hb=function(a){return(a=a.google_ad_modifications)?a.loeids||[]:[]},ib=function(a,b,c){if(!a)return null;for(var d=0;d<a.length;++d)if((a[d].ad_slot||b)==b&&(a[d].ad_tag_origin||c)==c)return a[d];return null};var jb=function(a,b,c){this.U=a;this.P=b;this.A=c;this.w=null;this.O=this.s;this.ca=!1},kb=function(a,b,c){this.message=a;this.fileName=b||"";this.lineNumber=c||-1},mb=function(a,b,c,d){var e;try{e=c()}catch(h){var f=a.A;try{var g=lb(h),f=(d||a.O).call(a,b,g,void 0,void 0)}catch(k){a.s("pAR",k)}if(!f)throw h;}finally{}return e},nb=function(a,b){var c=P;return function(){for(var d=[],e=0;e<arguments.length;++e)d[e]=arguments[e];return mb(c,a,function(){return b.apply(void 0,d)})}};
jb.prototype.s=function(a,b,c,d,e){try{var f={};f.context=a;b instanceof kb||(b=lb(b));f.msg=b.message.substring(0,512);b.fileName&&(f.file=b.fileName);0<b.lineNumber&&(f.line=b.lineNumber.toString());var g=l.document;f.url=g.URL.substring(0,512);f.ref=(g.referrer||"").substring(0,512);if(this.w)try{this.w(f)}catch(h){}if(d)try{d(f)}catch(h){}Xa(this.U,e||this.P,f,this.ca,c)}catch(h){}return this.A};
var lb=function(a){var b=a.toString();a.name&&-1==b.indexOf(a.name)&&(b+=": "+a.name);a.message&&-1==b.indexOf(a.message)&&(b+=": "+a.message);if(a.stack){var c=a.stack,d=b;try{-1==c.indexOf(d)&&(c=d+"\n"+c);for(var e;c!=e;)e=c,c=c.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/,"$1");b=c.replace(/\n */g,"\n")}catch(f){b=d}}return new kb(b,a.fileName,a.lineNumber)};var ob,P;ob=new function(){this.M="http"+("http:"===L.location.protocol?"":"s")+"://pagead2.googlesyndication.com/pagead/gen_204?id=";this.N=.01;this.X=Math.random()};P=new jb(ob,"jserror",!0);var qb=function(a,b){mb(P,a,b,pb)},pb=P.s,rb=function(a,b){return nb(a,b)};var sb={client:"google_ad_client",format:"google_ad_format",slotname:"google_ad_slot",output:"google_ad_output",ad_type:"google_ad_type",async_oa:"google_async_for_oa_experiment",pse:"google_pstate_expt"};P.A=!y;var Q=function(a,b){this.start=a<b?a:b;this.end=a<b?b:a};Q.prototype.clone=function(){return new Q(this.start,this.end)};var tb=function(a,b){this.F=b>=a?new Q(a,b):null},vb=function(a,b,c,d,e){var f=new Q(d,d+e-1);(e=0>=e||e%c.length)||(a=a.F,e=!(a.start<=f.start&&a.end>=f.end));if(e)return null;b=ub(b);return null!==b&&f.start<=b&&f.end>=b?c[(b-d)%c.length]:null},ub=function(a){var b;try{b=parseInt(a.localStorage.getItem("google_experiment_mod"),10)}catch(c){return null}if(0<=b&&1E3>b)return b;b=Math.floor(1E3*Ra(a));try{return a.localStorage.setItem("google_experiment_mod",""+b),b}catch(c){return null}};var wb=null,xb=function(){if(!wb){for(var a=window,b=a,c=0;a&&a!=a.parent;)if(a=a.parent,c++,Qa(a))b=a;else break;wb=b}return wb};var yb={l:"10573511",j:"10573512"},zb={l:"10573695",j:"10573696"},R={ia:{},xa:{l:"453848100",j:"453848101"},qa:{l:"24819308",j:"24819309",fa:"24819320",ka:"24819321"},pa:{l:"24819330",j:"24819331"},ma:{l:"86724438",j:"86724439"},ta:{l:"10573505",j:"10573506"},K:{l:"10573595",j:"10573596"},L:{l:"10573581",j:"10573582"},sa:{l:"10573605",j:"10573606"},ja:{l:"26835105",j:"26835106"},la:{l:"35923720",j:"35923721"},B:{l:"35923760",j:"35923761"},J:{l:"20040000",j:"20040001"},ga:{l:"20040016",j:"20040017"},
ra:{l:"19188000",j:"19188001"},ha:{ea:"314159230",oa:"314159231"},na:{ua:"27285692",wa:"27285712",va:"27285713"}};var Ab=new tb(100,199),Bb=new tb(400,499);var S=function(a,b,c,d){return a.location&&a.location.hash=="#google_plle_"+d?d:K([c,d],b)};var Cb=function(a,b,c){qb("files::getSrc",function(){if("https:"==L.location.protocol&&"http"==c)throw c="https",Error("Requested url "+a+b);});return[c,"://",a,b].join("")},Db=function(a,b,c){c||(c=ra?"https":"http");return Cb(a,b,c)};var Eb=function(){},Gb=function(a,b,c){switch(typeof b){case "string":Fb(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(b instanceof Array||void 0!=b.length&&b.splice){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),Gb(a,b[f],c),e=",";c.push("]");break}c.push("{");d="";for(e in b)b.hasOwnProperty(e)&&(f=b[e],"function"!=typeof f&&
(c.push(d),Fb(e,c),c.push(":"),Gb(a,f,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}},Hb={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ib=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,Fb=function(a,b){b.push('"');b.push(a.replace(Ib,function(a){if(a in Hb)return Hb[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return Hb[a]=
e+b.toString(16)}));b.push('"')};var Jb=G("Safari")&&!((G("Chrome")||G("CriOS"))&&!G("Edge")||G("Coast")||G("Opera")||G("Edge")||G("Silk")||G("Android"))&&!(G("iPhone")&&!G("iPod")&&!G("iPad")||G("iPad")||G("iPod"));var T=null,Kb=J||Da&&!Jb||Ba||"function"==typeof l.btoa,Lb=function(a){var b;if(Kb)b=l.btoa(a);else{b=[];for(var c=0,d=0;d<a.length;d++){for(var e=a.charCodeAt(d);255<e;)b[c++]=e&255,e>>=8;b[c++]=e}if(!T)for(T={},a=0;65>a;a++)T[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a);a=T;c=[];for(d=0;d<b.length;d+=3){var f=b[d],g=(e=d+1<b.length)?b[d+1]:0,h=d+2<b.length,k=h?b[d+2]:0,n=f>>2,f=(f&3)<<4|g>>4,g=(g&15)<<2|k>>6,k=k&63;h||(k=64,e||(g=64));c.push(a[n],a[f],a[g],a[k])}b=
c.join("")}return b};var U="google_ad_block google_ad_channel google_ad_client google_ad_format google_ad_height google_ad_host google_ad_host_channel google_ad_host_tier_id google_ad_modifications google_ad_output google_ad_region google_ad_section google_ad_slot google_ad_type google_ad_unit_key google_ad_dom_fingerprint google_ad_width google_adtest google_allow_expandable_ads google_alternate_ad_url google_alternate_color google_ama google_analytics_domain_name google_analytics_uacct google_analytics_url_parameters google_auto_format google_available_width google_captcha_token google_city google_color_bg google_color_border google_color_line google_color_link google_color_text google_color_url google_container_id google_content_recommendation_ui_type google_contents google_core_dbp google_country google_cpm google_ctr_threshold google_cust_age google_cust_ch google_cust_criteria google_cust_gender google_cust_id google_cust_interests google_cust_job google_cust_l google_cust_lh google_cust_u_url google_disable_video_autoplay google_delay_requests_count google_delay_requests_delay google_ed google_eids google_enable_content_recommendations google_enable_ose google_encoding google_floating_ad_position google_font_face google_font_size google_frame_id google_gl google_hints google_is_split_slot google_image_size google_kw google_kw_type google_lact google_language google_loeid google_max_num_ads google_max_radlink_len google_mtl google_nofo google_num_radlinks google_num_radlinks_per_unit google_only_ads_with_video google_only_pyv_ads google_only_userchoice_ads google_override_format google_page_url google_pgb_reactive google_previous_watch google_previous_searches google_pubvars_recovery_regexp_experiment google_referrer_url google_region google_responsive_formats google_reuse_colors google_rl_dest_url google_rl_filtering google_rl_mode google_rt google_safe google_scs google_source_type google_sui google_skip google_tag_for_child_directed_treatment google_tag_info google_tag_origin google_targeting google_tdsma google_tfs google_tl google_ui_features google_video_doc_id google_video_product_type google_video_url_to_fetch google_webgl_support google_with_pyv_ads google_yt_pt google_yt_up".split(" "),
Mb={google_ad_modifications:!0,google_analytics_domain_name:!0,google_analytics_uacct:!0},Nb=function(a){return(a=a.innerText||a.innerHTML)&&(a=a.replace(/^\s+/,"").split(/\r?\n/,1)[0].match(/^\x3c!--+(.*?)(?:--+>)?\s*$/))&&/google_ad_client/.test(a[1])?a[1]:null},Ob=function(a){if(a=a.innerText||a.innerHTML)if(a=a.replace(/^\s+|\s+$/g,"").replace(/\s*(\r?\n)+\s*/g,";"),(a=a.match(/^\x3c!--+(.*?)(?:--+>)?$/)||a.match(/^\/*\s*<!\[CDATA\[(.*?)(?:\/*\s*\]\]>)?$/i))&&/google_ad_client/.test(a[1]))return a[1];
return null},Rb=function(a){var b;try{a:{var c=a.document.getElementsByTagName("script"),d=Nb;switch(a.google_pubvars_recovery_regexp_experiment){case "NE":var e=a.navigator&&a.navigator.userAgent||"",f;if(!(f=/appbankapppuzdradb|daumapps|fban|fbios|fbav|fb_iab|gsa\/|messengerforios|naver|niftyappmobile|nonavigation|pinterest|twitter|ucbrowser|yjnewsapp|youtube/i.test(e))){var g;if(g=/i(phone|pad|pod)/i.test(e)){var h;if(h=/applewebkit/i.test(e)&&!/version|safari/i.test(e)){var k;try{k=!(!L.navigator.W&&
!(y&&L.google_top_window||L.top).navigator.W)}catch(w){k=!1}h=!k}g=h}f=g}d=f?Nb:Ob}for(var n=c.length-1;0<=n;n--){var p=c[n];if(!p.google_parsed_script){p.google_parsed_script=!0;var r=d(p);if(r){b=r;break a}}}b=null}}catch(w){return!1}if(!b)return!1;try{for(var c=/(google_\w+) *= *(['"]?[\w.-]+['"]?) *(?:;|$)/gm,d={},u;u=c.exec(b);)d[u[1]]=Pb(u[2]);Qb(d,a)}catch(w){return!1}return!!a.google_ad_client},Sb=function(a){try{if(window.JSON&&window.JSON.stringify&&window.encodeURIComponent){var b,c,d=
function(){return this};null!=Object.prototype.toJSON&&(b=Object.prototype.toJSON,Object.prototype.toJSON=d);null!=Array.prototype.toJSON&&(c=Array.prototype.toJSON,Array.prototype.toJSON=d);var e=Lb(encodeURIComponent(window.JSON.stringify(a)));b&&(Object.prototype.toJSON=b);c&&(Array.prototype.toJSON=c);return e}Xa(ob,"sblob",{json:window.JSON?1:0,eURI:window.encodeURIComponent?1:0},!0,void 0,void 0)}catch(f){P.s("sblob",f,void 0,void 0)}return""},Tb=function(a){a.google_page_url&&(a.google_page_url=
String(a.google_page_url));var b=[];bb(a,function(a,d){if(null!=a){var e;try{var f=[];Gb(new Eb,a,f);e=f.join("")}catch(g){}e&&(e=e.replace(/\//g,"\\$&"),cb(b,d,"=",e,";"))}});return b.join("")},Ub=function(a){for(var b=0,c=U.length;b<c;b++){var d=U[b];Mb[d]||(a[d]=null)}},Pb=function(a){switch(a){case "true":return!0;case "false":return!1;case "null":return null;case "undefined":break;default:try{var b=a.match(/^(?:'(.*)'|"(.*)")$/);if(b)return b[1]||b[2]||"";if(/^[-+]?\d*(\.\d+)?$/.test(a)){var c=
parseFloat(a);return c===c?c:void 0}}catch(d){}}},Qb=function(a,b){for(var c=0;c<U.length;c++){var d=U[c];null==b[d]&&null!=a[d]&&(b[d]=a[d])}};var V=function(a){this.o=a;a.google_iframe_oncopy||(a.google_iframe_oncopy={handlers:{},upd:m(this.ba,this)});this.Z=a.google_iframe_oncopy},Vb;var W="var i=this.id,s=window.google_iframe_oncopy,H=s&&s.handlers,h=H&&H[i],w=this.contentWindow,d;try{d=w.document}catch(e){}if(h&&d&&(!d.body||!d.body.firstChild)){if(h.call){setTimeout(h,0)}else if(h.match){try{h=s.upd(h,i)}catch(e){}w.location.replace(h)}}";
/[\x00&<>"']/.test(W)&&(-1!=W.indexOf("&")&&(W=W.replace(sa,"&amp;")),-1!=W.indexOf("<")&&(W=W.replace(ta,"&lt;")),-1!=W.indexOf(">")&&(W=W.replace(ua,"&gt;")),-1!=W.indexOf('"')&&(W=W.replace(va,"&quot;")),-1!=W.indexOf("'")&&(W=W.replace(wa,"&#39;")),-1!=W.indexOf("\x00")&&(W=W.replace(xa,"&#0;")));Vb=W;V.prototype.set=function(a,b){this.Z.handlers[a]=b;this.o.addEventListener&&this.o.addEventListener("load",m(this.R,this,a),!1)};
V.prototype.R=function(a){a=this.o.document.getElementById(a);try{var b=a.contentWindow.document;if(a.onload&&b&&(!b.body||!b.body.firstChild))a.onload()}catch(c){}};V.prototype.ba=function(a,b){var c=Wb("rx",a),d;a:{if(a&&(d=a.match("dt=([^&]+)"))&&2==d.length){d=d[1];break a}d=""}d=(new Date).getTime()-d;c=c.replace(/&dtd=(\d+|-?M)/,"&dtd="+(1E5<=d?"M":0<=d?d:"-M"));this.set(b,c);return c};
var Wb=function(a,b){var c=new RegExp("\\b"+a+"=(\\d+)"),d=c.exec(b);d&&(b=b.replace(c,a+"="+(+d[1]+1||1)));return b};J||Da||I&&La(11);var Xb=/MSIE [2-7]|PlayStation|Gecko\/20090226|Android 2\.|Opera/i,Yb=/Android/,Zb=!1;var $b=function(a){if(!a)return"";(a=a.toLowerCase())&&"ca-"!=a.substring(0,3)&&(a="ca-"+a);return a};var X=null;var ac={"120x90":!0,"160x90":!0,"180x90":!0,"200x90":!0,"468x15":!0,"728x15":!0};var Y,Z=function(a){this.v=[];this.o=a||window;this.m=0;this.u=null;this.I=0},bc=function(a,b){this.S=a;this.da=b};Z.prototype.enqueue=function(a,b){0!=this.m||0!=this.v.length||b&&b!=window?this.D(a,b):(this.m=2,this.H(new bc(a,window)))};Z.prototype.D=function(a,b){this.v.push(new bc(a,b||this.o));cc(this)};Z.prototype.T=function(a){this.m=1;if(a){var b=rb("sjr::timeout",m(this.G,this,!0));this.u=this.o.setTimeout(b,a)}};
Z.prototype.G=function(a){a&&++this.I;1==this.m&&(null!=this.u&&(this.o.clearTimeout(this.u),this.u=null),this.m=0);cc(this)};Z.prototype.Y=function(){return!(!window||!Array)};Z.prototype.$=function(){return this.I};Z.prototype.nq=Z.prototype.enqueue;Z.prototype.nqa=Z.prototype.D;Z.prototype.al=Z.prototype.T;Z.prototype.rl=Z.prototype.G;Z.prototype.sz=Z.prototype.Y;Z.prototype.tc=Z.prototype.$;var cc=function(a){var b=rb("sjr::tryrun",m(a.aa,a));a.o.setTimeout(b,0)};
Z.prototype.aa=function(){if(0==this.m&&this.v.length){var a=this.v.shift();this.m=2;var b=rb("sjr::run",m(this.H,this,a));a.da.setTimeout(b,0);cc(this)}};Z.prototype.H=function(a){this.m=0;a.S()};
var dc=function(a){try{return a.sz()}catch(b){return!1}},ec=function(a){return!!a&&("object"===typeof a||"function"===typeof a)&&dc(a)&&N(a.nq)&&N(a.nqa)&&N(a.al)&&N(a.rl)},fc=function(){if(Y&&dc(Y))return Y;var a=xb(),b=a.google_jobrunner;return ec(b)?Y=b:a.google_jobrunner=Y=new Z(a)},gc=function(a,b){fc().nq(a,b)},hc=function(a,b){fc().nqa(a,b)};var ic=fb?1==eb(L):!eb(L),jc=function(){var a=qa?"https":"http",b=H("script"),c;a:{if(y)try{var d=L.google_cafe_host||L.top.google_cafe_host;if(d){c=d;break a}}catch(e){}c=ea("","pagead2.googlesyndication.com")}return["<",b,' src="',Db(c,["/pagead/js/",v(),"/r20151006/show_ads_impl.js"].join(""),a),'"></',b,">"].join("")},kc=function(a,b,c,
d){return function(){var e=!1;d&&fc().al(3E4);try{var f=a.document.getElementById(b).contentWindow;if(Qa(f)){var g=a.document.getElementById(b).contentWindow,h=g.document;h.body&&h.body.firstChild||(/Firefox/.test(navigator.userAgent)?h.open("text/html","replace"):h.open(),g.google_async_iframe_close=!0,h.write(c))}else{for(var k=a.document.getElementById(b).contentWindow,f=c,f=String(f),g=['"'],h=0;h<f.length;h++){var n=f.charAt(h),p=n.charCodeAt(0),r=h+1,u;if(!(u=A[n])){var w;if(31<p&&127>p)w=n;
else{var x=n;if(x in B)w=B[x];else if(x in A)w=B[x]=A[x];else{var C=x,D=x.charCodeAt(0);if(31<D&&127>D)C=x;else{if(256>D){if(C="\\x",16>D||256<D)C+="0"}else C="\\u",4096>D&&(C+="0");C+=D.toString(16).toUpperCase()}w=B[x]=C}}u=w}g[r]=u}g.push('"');k.location.replace("javascript:"+g.join(""))}e=!0}catch(oc){k=xb().google_jobrunner,ec(k)&&k.rl()}e&&(e=Wb("google_async_rrc",c),(new V(a)).set(b,kc(a,b,e,!1)))}},lc=function(a){var b=["<iframe"];bb(a,function(a,d){null!=a&&b.push(" "+d+'="'+a+'"')});b.push("></iframe>");
return b.join("")},mc=function(a){if(!X)a:{for(var b=[l.top],c=[],d=0,e;e=b[d++];){c.push(e);try{if(e.frames)for(var f=e.frames.length,g=0;g<f&&1024>b.length;++g)b.push(e.frames[g])}catch(k){}}for(b=0;b<c.length;b++)try{var h=c[b].frames.google_esf;if(h){X=h;break a}}catch(k){}X=null}if(!X){c={style:"display:none"};if(/[^a-z0-9-]/.test(a))return"";c["data-ad-client"]=$b(a);c.id="google_esf";c.name="google_esf";a=Db(ea("","googleads.g.doubleclick.net"),["/pagead/html/",v(),
"/r20151006/zrt_lookup.html"].join(""));c.src=a;return lc(c)}return""},nc=function(a,b){var c=b.google_ad_output,d=b.google_ad_format;d||"html"!=c&&null!=c||(d=b.google_ad_width+"x"+b.google_ad_height);c=!b.google_ad_slot||b.google_override_format||!ac[b.google_ad_width+"x"+b.google_ad_height]&&"aa"==b.google_loader_used;d=d&&c?d.toLowerCase():"";b.google_ad_format=d;for(var d=[b.google_ad_slot,b.google_ad_format,b.google_ad_type,b.google_ad_width,
b.google_ad_height],c=[],e=0,f=$a.parentElement;f&&25>e;f=f.parentNode,++e)c.push(9!==f.nodeType&&f.id||"");(c=c.join())&&d.push(c);b.google_ad_unit_key=Ta(d.join(":")).toString();d=a.google_adk2_experiment=a.google_adk2_experiment||K(["C","E"],ka)||"N";if("E"==d){d=$a;c=[];for(e=0;d&&25>e;++e){var f="",f=(f=9!==d.nodeType&&d.id)?"/"+f:"",g;a:{if(d&&d.nodeName&&d.parentElement){g=d.nodeName.toString().toLowerCase();for(var h=d.parentElement.childNodes,k=0,n=0;n<h.length;++n){var p=h[n];if(p.nodeName&&
p.nodeName.toString().toLowerCase()===g){if(d===p){g="."+k;break a}++k}}}g=""}c.push((d.nodeName&&d.nodeName.toString().toLowerCase())+f+g);d=d.parentElement}d=c.join()+":";c=a;e=[];if(c)try{for(var r=c.parent,f=0;r&&r!==c&&25>f;++f){var u=r.frames;for(g=0;g<u.length;++g)if(c===u[g]){e.push(g);break}c=r;r=c.parent}}catch(w){}b.google_ad_dom_fingerprint=Ta(d+e.join()).toString()}else"C"==d&&(b.google_ad_dom_fingerprint="ctrl")};(function(a){P.w=function(b){ya(a,function(a){a(b)})}})([function(a){a.shv=v()},function(a){Sa(sb,function(b,c){try{null!=l[b]&&(a[c]=l[b])}catch(d){}})}]);
qb("sa::main",function(){var a=window,b=a.google_ad_modifications=a.google_ad_modifications||{};if(!b.plle){b.plle=!0;var c=b.eids=b.eids||[],b=b.loeids=b.loeids||[],d,e;d=R.K;e=d.j;(d=a.location&&a.location.hash=="#google_plle_"+e?e:vb(Ab,a,[d.l,e],ga,ha))&&b.push(d);d=zb;(d=S(a,ia,d.l,d.j))&&c.push(d);d=R.L;(e=S(a,ja,d.l,d.j))&&b.push(e);(d=e==d.l?yb.l:e==d.j?yb.j:"")&&c.push(d);d=R.B;(c=S(a,na,d.l,d.j))&&b.push(c);Ya.body||(d=R.J,(c=S(a,oa,d.l,d.j))&&b.push(c))}d=a.google_ad_slot;b=a.google_ad_modifications;
!b||ib(b.ad_whitelist,d,void 0)?b=null:(c=b.space_collapsing||"none",b=(d=ib(b.ad_blacklist,d))?{C:!0,V:d.space_collapsing||c}:b.remove_ads_by_default?{C:!0,V:c}:null);if(b&&b.C)Ub(a);else if(db(a),(b=!1===window.google_enable_async)||(b=navigator.userAgent,Xb.test(b)?b=!1:(void 0!==window.google_async_for_oa_experiment||!Yb.test(navigator.userAgent)||Xb.test(navigator.userAgent)||(window.google_async_for_oa_experiment=vb(Bb,window,["C","E"],Bb.F.start,Math.round(1E3*fa))),b=Yb.test(b)?"E"!==window.google_async_for_oa_experiment:
!0),b=!b||window.google_container_id||window.google_ad_output&&"html"!=window.google_ad_output),b)a.google_loader_used="sb",a.google_start_time=q,nc(a,a),document.write(mc(a.google_ad_client)+jc());else{ic&&(c=a.google_ad_client,b=navigator,a&&c&&b&&(b=a.document,c=$b(c),/[^a-z0-9-]/.test(c)||((d=z("r20160212"))&&(d+="/"),d=Db("pagead2.googlesyndication.com","/pub-config/"+d+c+".js"),c=b.createElement("script"),c.src=d,(b=b.getElementsByTagName("script")[0])&&b.parentNode&&b.parentNode.insertBefore(c,
b))));a.google_unique_id?++a.google_unique_id:a.google_unique_id=1;c={};"undefined"!=typeof a.google_pubvars_recovery_regexp_experiment?b=a.google_pubvars_recovery_regexp_experiment:(b=K(["NC","NE"],la))?a.google_pubvars_recovery_regexp_experiment=b:b=null;null!=b&&(c.google_pubvars_recovery_regexp_experiment=b);null==a.google_ad_client&&Rb(a)&&(c.google_loader_features_used=2048);Qb(a,c);c.google_loader_used="sa";Ub(a);b=H("script");d={};e=c.google_ad_height;d.width='"'+c.google_ad_width+'"';d.height=
'"'+e+'"';d.frameborder='"0"';d.marginwidth='"0"';d.marginheight='"0"';d.vspace='"0"';d.hspace='"0"';d.allowtransparency='"true"';d.scrolling='"no"';d.allowfullscreen='"true"';d.onload='"'+Vb+'"';var f;e=a.document;for(var g=d.id,h=0;!g||e.getElementById(g);)g="aswift_"+h++;d.id=g;d.name=g;var g=c.google_ad_width,h=c.google_ad_height,k=R.B,n=k.l,p=k.j,r=c.google_active_plles=c.google_active_plles||[];O(hb(a),n)||O(gb(a),n)?r.push(n):(O(hb(a),p)||O(gb(a),p))&&r.push(p);Zb=O(hb(a),k.j);k=["<iframe"];
for(f in d)d.hasOwnProperty(f)&&cb(k,f+"="+d[f]);f="left:0;position:absolute;top:0;";Zb&&(f=f+"width:"+g+"px;height:"+h+"px;");k.push('style="'+f+'"');k.push("></iframe>");f=d.id;g="border:none;height:"+h+"px;margin:0;padding:0;position:relative;visibility:visible;width:"+g+"px;background-color:transparent";e.write(['<ins id="',f+"_expand",'" style="display:inline-table;',g,'"><ins id="',f+"_anchor",'" style="display:block;',g,'">',k.join(" "),"</ins></ins>"].join(""));f=d.id;nc(a,c);d=Tb(c);e=null;
g=K(["C","E"],ma);"E"==g?(e=Sb(c))||(e="{X}"):"C"==g&&(e="{C}");c=mc(c.google_ad_client);h=(new Date).getTime();if(k=a.google_async_for_oa_experiment)a.google_async_for_oa_experiment=void 0;b=["<!doctype html><html><body>",c,"<",b,">",d,"google_show_ads_impl=true;google_unique_id=",eb(a),';google_async_iframe_id="',f,'";google_start_time=',q,";",g?'google_pub_vars = "'+e+'";':"",k?'google_async_for_oa_experiment="'+k+'";':"","google_bpp=",h>q?h-q:1,";google_async_rrc=0;google_iframe_start_time=new Date().getTime();</",
b,">",jc(),"</body></html>"].join("");(a.document.getElementById(f)?gc:hc)(kc(a,f,b,!0))}});}).call(this);

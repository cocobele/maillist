(function(){var c={id:"af6b16a6ab4ee5374e22a5131a895873",dm:["jiaju.com"],etrk:[],js:"tongji.baidu.com/hm-web/js/",icon:'',br:false,ctrk:false,align:-1,nv:-1,vdur:1800000,age:31536000000,se:[[1,'baidu.com','word|wd',1,'news,tieba,zhidao,mp3,image,video,hi,baike,wenku,jingyan'],[2,'google.com','q',0,'tbm=isch,tbm=vid,tbm=nws|source=newssearch,tbm=blg'],[3,'google.cn','q',0,''],[4,'sogou.com','query',1,'news,mp3,pic,v,zhishi,blogsearch'],[5,'zhongsou.com','w',1,'p,z,gouwu,bbs,mp3'],[6,'search.yahoo.com','p',1,'news,images,video'],[7,'yahoo.cn','q',1,'news,image,music'],[8,'soso.com','w',1,'image,video,music,sobar,wenwen,news,baike,blog'],[9,'search.114so.cn','kw',0,''],[10,'search.live.com','q',0,''],[11,'youdao.com','q',1,'image,news,fanxian,mp3,video,blog,reader'],[12,'gougou.com','search',1,'movie,mp3,book,soft,game'],[13,'bing.com','q',2,'images,videos,news'],[14,'360.cn','q|kw',1,'v']]};var g=true,h=null,i=false;function j(a,b){var d=a.match(RegExp("(^|&|\\?|#)("+b+")=([^&#]*)(&|$|#)",""));return d?d[3]:h}function k(a){var b;return(b=(a=a.match(/^(https?:\/\/)?([^\/\?#]*)/))?a[2].replace(/.*@/,""):h,a=b)?a.replace(/:\d+$/,""):a};function l(a,b){if(window.sessionStorage)try{window.sessionStorage.setItem(a,b)}catch(d){}}function n(a){return window.sessionStorage?window.sessionStorage.getItem(a):h};function o(a,b,d){var e;d.h&&(e=new Date,e.setTime(e.getTime()+d.h));document.cookie=a+"="+b+(d.domain?"; domain="+d.domain:"")+(d.path?"; path="+d.path:"")+(e?"; expires="+e.toGMTString():"")+(d.N?"; secure":"")};function p(a,b){var d=new Image,e="mini_tangram_log_"+Math.floor(Math.random()*2147483648).toString(36);window[e]=d;d.onload=d.onerror=d.onabort=function(){d.onload=d.onerror=d.onabort=h;d=window[e]=h;b&&b(a)};d.src=a};var q;function r(){if(!q)try{q=document.createElement("input"),q.type="hidden",q.style.display="none",q.addBehavior("#default#userData"),document.getElementsByTagName("head")[0].appendChild(q)}catch(a){return i}return g};function s(a,b,d){a.attachEvent?a.attachEvent("on"+b,function(b){d.call(a,b)}):a.addEventListener&&a.addEventListener(b,d,i)};(function(){function a(){if(!a.c){a.c=g;for(var b=0,d=e.length;b<d;b++)e[b]()}}function b(){try{document.documentElement.doScroll("left")}catch(d){setTimeout(b,1);return}a()}var d=i,e=[],f;document.addEventListener?f=function(){document.removeEventListener("DOMContentLoaded",f,i);a()}:document.attachEvent&&(f=function(){document.readyState==="complete"&&(document.detachEvent("onreadystatechange",f),a())});(function(){if(!d)if(d=g,document.readyState==="complete")a.c=g;else if(document.addEventListener)document.addEventListener("DOMContentLoaded",
f,i),window.addEventListener("load",a,i);else if(document.attachEvent){document.attachEvent("onreadystatechange",f);window.attachEvent("onload",a);var e=i;try{e=window.frameElement==h}catch(u){}document.documentElement.doScroll&&e&&b()}})();return function(b){a.c?b():e.push(b)}})().c=i;var t=navigator.cookieEnabled,v=navigator.javaEnabled(),w=navigator.language||navigator.browserLanguage||navigator.systemLanguage||navigator.userLanguage||"",x=window.screen.width+"x"+window.screen.height,y=window.screen.colorDepth;var z=["cpro.baidu.com"],A=0,B=(new Date).getTime(),C=window.location.protocol=="https:"?"https:":"http:",D="cc,cf,ci,ck,cl,cm,cp,cw,ds,ep,et,fl,ja,ln,lo,lt,nv,rnd,sb,se,si,st,su,sw,sse,v,cv,lv,u,api".split(",");function E(){if(typeof window["_bdhm_loaded_"+c.id]=="undefined")window["_bdhm_loaded_"+c.id]=g,this.a={},this.L=[],this.i={},this.e=0,this.D()}
E.prototype={B:function(){var a="";try{external.twGetVersion(external.twGetSecurityID(window))&&external.twGetRunPath.toLowerCase().indexOf("360se")>-1&&(a=17)}catch(b){}return a},j:function(a,b){var a=a.replace(/:\d+/,""),b=b.replace(/:\d+/,""),d=a.indexOf(b);return d>-1&&d+b.length==a.length},n:function(a,b){a=a.replace(/^https?:\/\//,"");return a.indexOf(b)==0},b:function(a){for(var b=0;b<c.dm.length;b++)if(c.dm[b].indexOf("/")>-1){if(this.n(a,c.dm[b]))return g}else{var d=k(a);if(d&&this.j(d,c.dm[b]))return g}return i},
l:function(){for(var a=window.location.hostname,b=0,d=c.dm.length;b<d;b++)if(this.j(a,c.dm[b]))return c.dm[b].replace(/(:\d+)?[\/\?#].*/,"");return a},m:function(){for(var a=0,b=c.dm.length;a<b;a++){var d=c.dm[a];if(d.indexOf("/")>-1&&this.n(window.location.href,d))return d.replace(/^[^\/]+(\/.*)/,"$2")+"/"}return"/"},C:function(){if(document.referrer)for(var a=function(a){for(var b=0,d=a[3]==2?a[1]+"/":"",e=a[3]==1?"."+a[1]:"",a=a[4].split(","),f=0,G=a.length;f<G;f++)if(a[f]!==""&&RegExp(d+a[f]+
e).test(document.referrer)){b=f+1;break}return b},b=function(a){if(/google.(com|cn)/.test(document.referrer)&&/(%25[0-9a-fA-F]{2}){2}/.test(a))try{a=decodeURIComponent(a)}catch(b){}if(/sogou.com/.test(document.referrer)&&/%u[0-9a-fA-F]{4}/.test(a))try{a=unescape(a)}catch(d){}for(var e=0,f=z.length;e<f;e++)document.referrer.indexOf(z[e])>-1&&(a="");return a},d=0,e=c.se.length;d<e;d++){if(RegExp(c.se[d][1]).test(document.referrer)){var f=j(document.referrer,c.se[d][2]);if(f)return this.a.se=c.se[d][0],
this.a.sse=a(c.se[d]),this.a.sw=b(f),2}}else return B-A>c.vdur?1:4;a=i;return(a=this.b(document.referrer)&&this.b(window.location.href)?g:this.j(k(document.referrer)||"",window.location.hostname))?B-A>c.vdur?1:4:3},getData:function(a){try{var b,d=RegExp("(^| )"+a+"=([^;]*)(;|$)").exec(document.cookie);if(!(b=d?d[2]:h)){var e;if(!(e=n(a)))a:{if(window.localStorage){var f=window.localStorage.getItem(a);if(f){var m=f.indexOf("|"),u=f.substring(0,m)-0;if(u&&u>(new Date).getTime()){e=f.substring(m+1);
break a}}}else if(r())try{q.load(window.location.hostname);e=q.getAttribute(a);break a}catch(I){}e=h}b=e}return b}catch(J){}},setData:function(a,b,d){try{if(o(a,b,{domain:this.l(),path:this.m(),h:d}),d){var e=new Date;e.setTime(e.getTime()+d||31536E6);try{if(window.localStorage)b=e.getTime()+"|"+b,window.localStorage.setItem(a,b);else if(r())q.expires=e.toUTCString(),q.load(window.location.hostname),q.setAttribute(a,b),q.save(window.location.hostname)}catch(f){}}else l(a,b)}catch(m){}},F:function(a){try{if(o(a,
"",{domain:this.l(),path:this.m(),h:-1}),window.sessionStorage&&window.sessionStorage.removeItem(a),window.localStorage)window.localStorage.removeItem(a);else if(r())try{q.load(window.location.hostname),q.removeAttribute(a),q.save(window.location.hostname)}catch(b){}}catch(d){}},J:function(){var a,b,d,e,f;A=this.getData("Hm_lpvt_"+c.id)||0;b=this.C();a=b!=4?1:0;if(d=this.getData("Hm_lvt_"+c.id)){for(e=d.split(",");B-e[0]>2592E6;)e.shift();f=e.length<4?2:3;for(a===1&&e.push(B);e.length>4;)e.shift();
d=e.join(",");e=Math.round((e[e.length-1]-0)/1E3)}else d=B,e="",f=1;this.setData("Hm_lvt_"+c.id,d,c.age);this.setData("Hm_lpvt_"+c.id,B);d=B==this.getData("Hm_lpvt_"+c.id)?"1":"0";if(c.nv==0&&this.b(window.location.href)&&(document.referrer==""||this.b(document.referrer)))a=0,b=4;this.a.nv=a;this.a.st=b;this.a.cc=d;this.a.lt=e;this.a.lv=f},I:function(){for(var a=[],b=0,d=D.length;b<d;b++){var e=D[b],f=this.a[e];typeof f!="undefined"&&f!==""&&a.push(e+"="+encodeURIComponent(f))}return a.join("&")},
K:function(){this.J();this.a.si=c.id;this.a.su=document.referrer;this.a.ds=x;this.a.cl=y+"-bit";this.a.ln=w;this.a.ja=v?1:0;this.a.ck=t?1:0;this.a.lo=typeof _bdhm_top=="number"?1:0;var a=this.a,b="";if(navigator.plugins&&navigator.mimeTypes.length){var d=navigator.plugins["Shockwave Flash"];d&&d.description&&(b=d.description.replace(/^.*\s+(\S+)\s+\S+$/,"$1"))}else if(window.ActiveXObject)try{if(d=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))(b=d.GetVariable("$version"))&&(b=b.replace(/^.*\s+(\d+),(\d+).*$/,
"$1.$2"))}catch(e){}a.fl=b;this.a.sb=this.B();this.a.v="1.0.32";this.a.cv=decodeURIComponent(this.getData("Hm_cv_"+c.id)||"");this.a.api=0;a=window.location.href;this.a.cm=j(a,"hmmd")||"";this.a.cp=j(a,"hmpl")||"";this.a.cw=j(a,"hmkw")||"";this.a.ci=j(a,"hmci")||"";this.a.cf=j(a,"hmsr")||""},D:function(){var a=this;try{a.K();a.a.nv==0?a.H():a.k(".*");a.t();a.z();a.s&&a.s();a.r&&a.r();a.g=new F;s(window,"beforeunload",a.G());if(a.A()){var b=window._hmt;if(b&&b.length)for(var d=0;d<b.length;d++)a.i[d]=
b[d];a.i.push=function(){a.q.apply(a,arguments)};window._hmt=a.i}if(typeof window._bdhm_autoPageview==="undefined"||window._bdhm_autoPageview===g)a.a.et=0,a.a.ep="",a.d()}catch(e){b=[],b.push("si="+c.id),b.push("n="+encodeURIComponent(e.name)),b.push("m="+encodeURIComponent(e.message)),b.push("r="+encodeURIComponent(document.referrer)),p(C+"//hm.baidu.com/hm.gif?"+b.join("&"))}},G:function(){var a=this;return function(){a.a.et=3;a.a.ep=(new Date).getTime()-a.g.o+","+((new Date).getTime()-a.g.f+a.g.p);
a.d()}},d:function(){var a=this;a.a.rnd=Math.round(Math.random()*2147483647);a.a.api=a.a.api||a.e?a.a.api+"_"+a.e:"";var b=C+"//hm.baidu.com/hm.gif?"+a.I();a.a.api=0;a.e=0;a.w(b);p(b,function(b){a.k(b)})},t:function(){if(c.icon!=""){var a,b=c.icon.split("|"),d="http://tongji.baidu.com/hm-web/welcome/ico?s="+c.id;a=(C=="http:"?"http://eiv":"https://bs")+".baidu.com"+b[0]+"."+b[1];switch(b[1]){case "swf":var e=b[2],b=b[3],d="s="+d,f="HolmesIcon"+B;a='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="'+
f+'" width="'+e+'" height="'+b+'"><param name="movie" value="'+a+'" /><param name="flashvars" value="'+d+'" /><param name="allowscriptaccess" value="always" /><embed type="application/x-shockwave-flash" name="'+f+'" width="'+e+'" height="'+b+'" src="'+a+'" flashvars="'+d+'" allowscriptaccess="always" /></object>';break;case "gif":a='<a href="'+d+'" target="_blank"><img border="0" src="'+a+'" width="'+b[2]+'" height="'+b[3]+'"></a>';break;default:a='<a href="'+d+'" target="_blank">'+b[0]+"</a>"}document.write(a)}},
z:function(){var a=window.location.hash.substring(1),b=RegExp(c.id),d=document.referrer.indexOf("baidu.com")>-1?g:i;a&&b.test(a)&&d&&(b=document.createElement("script"),b.setAttribute("type","text/javascript"),b.setAttribute("charset","utf-8"),b.setAttribute("src",C+"//"+c.js+j(a,"jn")+"."+j(a,"sx")+"?"+this.a.rnd),a=document.getElementsByTagName("script")[0],a.parentNode.insertBefore(b,a))},q:function(a){if(function(a){if(Object.prototype.toString.call(a)!=="[object Array]")return i;for(var b=a.length-
1;b>=0;b--){var d=a[b];if(!("[object Number]"==Object.prototype.toString.call(d)&&isFinite(d))&&"[object String]"!=Object.prototype.toString.call(d)&&d!==g&&d!==i)return i}return g}(a)&&!(typeof window._bdhm_account!=="undefined"&&window._bdhm_account!==c.id)){var b=function(a){return a.replace?a.replace(/'/g,"'0").replace(/\*/g,"'1").replace(/!/g,"'2"):a};switch(a[0]){case "_trackPageview":if(a.length>1&&a[1].charAt&&a[1].charAt(0)=="/"){this.a.api|=4;this.a.et=0;this.a.ep="";var b=this.a.u,d=this.a.su;
this.a.u=C+"//"+window.location.host+a[1];this.a.su=window.location.href;this.d();this.a.u=b;this.a.su=d}break;case "_trackEvent":if(a.length>2)this.a.api|=8,this.a.et="4",this.a.ep=b(a[1])+"*"+b(a[2])+(a[3]?"*"+b(a[3]):"")+(a[4]?"*"+b(a[4]):""),this.d();break;case "_setCustomVar":if(a.length<4)break;var d=a[1],e=a[4]||3;if(d>0&&d<6&&e>0&&e<4){this.e++;for(var f=(this.a.cv||"*").split("!"),m=f.length;m<d-1;m++)f.push("*");f[d-1]=e+"*"+b(a[2])+"*"+b(a[3]);this.a.cv=f.join("!");a=this.a.cv.replace(/[^1](\*[^!]*){2}/g,
"*").replace(/((^|!)\*)+$/g,"");a!==""?this.setData("Hm_cv_"+c.id,encodeURIComponent(a),c.age):this.F("Hm_cv_"+c.id)}}}},A:function(){var a=g,b=window._hmt;if(b&&b.length){for(var d=0;d<b.length;d++){var e=b[d];switch(e[0]){case "_setAccount":if(e.length>1&&/^[0-9a-z]{32}$/.test(e[1]))this.a.api|=1,window._bdhm_account=e[1],e[1]!==c.id&&(a=i);break;case "_setAutoPageview":if(e.length>1&&(e=e[1],i===e||g===e))this.a.api|=2,window._bdhm_autoPageview=e}}if(a)for(d=0;d<b.length;d++)this.q(b[d])}return a},
w:function(a){var b=n("Hm_unsent_"+c.id)||"",d=this.a.u?"":"&u="+encodeURIComponent(window.location.href),b=encodeURIComponent(a.replace(/^https?:\/\//,"")+d)+(b?","+b:"");l("Hm_unsent_"+c.id,b)},k:function(a){var b=n("Hm_unsent_"+c.id)||"";b&&((b=b.replace(RegExp(encodeURIComponent(a.replace(/^https?:\/\//,"")).replace(/([\*\(\)])/g,"\\$1")+"(%26u%3D[^,]*)?,?","g"),"").replace(/,$/,""))?l("Hm_unsent_"+c.id,b):window.sessionStorage&&window.sessionStorage.removeItem("Hm_unsent_"+c.id))},H:function(){var a=
this,b=n("Hm_unsent_"+c.id);if(b)for(var b=b.split(","),d=0,e=b.length;d<e;d++)p(C+"//"+decodeURIComponent(b[d]).replace(/^https?:\/\//,""),function(b){a.k(b)})}};function F(){this.f=this.o=(new Date).getTime();this.p=0;typeof document.M=="object"?(s(document,"focusin",H(this)),s(document,"focusout",H(this))):(s(window,"focus",H(this)),s(window,"blur",H(this)))}
function H(a){return function(b){if(!(b.target&&b.target!=window)){if(b.type=="blur"||b.type=="focusout")a.p+=(new Date).getTime()-a.f;a.f=(new Date).getTime()}}}new E;})();
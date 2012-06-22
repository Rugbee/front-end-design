
var server="http://liss.slideshare.com";var static_content_server="http://liss.slideshare.com";var upload_server="http://liss.slideshare.com";var is_production=true;var add_app_url="http://www.linkedin.com/opensocialInstallation/preview?_ch_panel_id=1&_applicationId=1200";try
{var pageTracker=_gat._getTracker("UA-2330466-6");pageTracker._trackPageview();}
catch(e)
{};var timer=(new Date()).getTime();(function(){window.ensure=function(data,callback,scope)
{if(typeof jQuery=="undefined"&&typeof Sys=="undefined"&&typeof Prototype=="undefined")
return alert("jQuery, Microsoft ASP.NET AJAX or Prototype library not found. One must be present for ensure to work");if(typeof data.test!="undefined")
{var test=function(){return data.test};if(typeof data.test=="string")
{test=function()
{return!(eval("typeof "+data.test)=="undefined"&&document.getElementById(data.test)==null);}}
else if(typeof data.test=="function")
{test=data.test;}
if(test()===false||typeof test()=="undefined"||test()==null)
new ensureExecutor(data,callback,scope);else
callback();}
else
{new ensureExecutor(data,callback,scope);}}
window.ensureExecutor=function(data,callback,scope)
{this.data=this.clone(data);this.callback=(typeof scope=="undefined"||null==scope?callback:this.delegate(callback,scope));this.loadStack=[];if(data.js&&data.js.constructor!=Array)this.data.js=[data.js];if(data.html&&data.html.constructor!=Array)this.data.html=[data.html];if(data.css&&data.css.constructor!=Array)this.data.css=[data.css];if(typeof data.js=="undefined")this.data.js=[];if(typeof data.html=="undefined")this.data.html=[];if(typeof data.css=="undefined")this.data.css=[];this.init();this.load();}
window.ensureExecutor.prototype={init:function()
{if(typeof jQuery!="undefined")
{this.getJS=HttpLibrary.loadJavascript_jQuery;this.httpGet=HttpLibrary.httpGet_jQuery;}
else if(typeof Prototype!="undefined")
{this.getJS=HttpLibrary.loadJavascript_Prototype;this.httpGet=HttpLibrary.httpGet_Prototype;}
else if(typeof Sys!="undefined")
{this.getJS=HttpLibrary.loadJavascript_MSAJAX;this.httpGet=HttpLibrary.httpGet_MSAJAX;}
else
{throw"jQuery, Prototype or MS AJAX framework not found";}},getJS:function(data)
{},httpGet:function(url,callback)
{},load:function()
{this.loadJavascripts(this.delegate(function(){this.loadCSS(this.delegate(function(){this.loadHtml(this.delegate(function(){this.callback()}))}))}));},loadJavascripts:function(complete)
{var scriptsToLoad=this.data.js.length;if(0===scriptsToLoad)return complete();this.forEach(this.data.js,function(href)
{if(HttpLibrary.isUrlLoaded(href)||this.isTagLoaded('script','src',href))
{scriptsToLoad--;}
else
{this.getJS({url:href,success:this.delegate(function(content)
{scriptsToLoad--;HttpLibrary.registerUrl(href);}),error:this.delegate(function(msg)
{scriptsToLoad--;if(typeof this.data.error=="function")this.data.error(href,msg);})});}});this.until({test:function(){return scriptsToLoad===0;},delay:50,callback:this.delegate(function()
{complete();})});},loadCSS:function(complete)
{if(0===this.data.css.length)return complete();var head=HttpLibrary.getHead();this.forEach(this.data.css,function(href)
{if(HttpLibrary.isUrlLoaded(href)||this.isTagLoaded('link','href',href))
{}
else
{var self=this;try
{(function(href,head)
{var link=document.createElement('link');link.setAttribute("href",href);link.setAttribute("rel","Stylesheet");link.setAttribute("type","text/css");head.appendChild(link);HttpLibrary.registerUrl(href);}).apply(window,[href,head]);}
catch(e)
{if(typeof self.data.error=="function")self.data.error(href,e.message);}}});complete();},loadHtml:function(complete)
{var htmlToDownload=this.data.html.length;if(0===htmlToDownload)return complete();this.forEach(this.data.html,function(href)
{if(HttpLibrary.isUrlLoaded(href))
{htmlToDownload--;}
else
{this.httpGet({url:href,success:this.delegate(function(content)
{htmlToDownload--;HttpLibrary.registerUrl(href);var parent=(this.data.parent||document.body.appendChild(document.createElement("div")));if(typeof parent=="string")parent=document.getElementById(parent);parent.innerHTML=content;}),error:this.delegate(function(msg)
{htmlToDownload--;if(typeof this.data.error=="function")this.data.error(href,msg);})});}});this.until({test:function(){return htmlToDownload===0;},delay:50,callback:this.delegate(function()
{complete();})});},clone:function(obj)
{var cloned={};for(var p in obj)
{var x=obj[p];if(typeof x=="object")
{if(x.constructor==Array)
{var a=[];for(var i=0;i<x.length;i++)a.push(x[i]);cloned[p]=a;}
else
{cloned[p]=this.clone(x);}}
else
cloned[p]=x;}
return cloned;},forEach:function(arr,callback)
{var self=this;for(var i=0;i<arr.length;i++)
callback.apply(self,[arr[i]]);},delegate:function(func,obj)
{var context=obj||this;return function(){func.apply(context,arguments);}},until:function(o)
{if(o.test()===true)o.callback();else window.setTimeout(this.delegate(function(){this.until(o);}),o.delay||50);},isTagLoaded:function(tagName,attName,value)
{var tag=document.createElement(tagName);tag[attName]=value;var tagFound=false;var tags=document.getElementsByTagName(tagName);this.forEach(tags,function(t)
{if(tag[attName]===t[attName]){tagFound=true;return false}});return tagFound;}}
var userAgent=navigator.userAgent.toLowerCase();var HttpLibrary={browser:{version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)},loadedUrls:{},isUrlLoaded:function(url)
{return HttpLibrary.loadedUrls[url]===true;},unregisterUrl:function(url)
{HttpLibrary.loadedUrls[url]=false;},registerUrl:function(url)
{HttpLibrary.loadedUrls[url]=true;},createScriptTag:function(url,success,error)
{var scriptTag=document.createElement("script");scriptTag.setAttribute("type","text/javascript");scriptTag.setAttribute("src",url);scriptTag.onload=scriptTag.onreadystatechange=function()
{if((!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){success();}};scriptTag.onerror=function()
{error(data.url+" failed to load");};var head=HttpLibrary.getHead();head.appendChild(scriptTag);},getHead:function()
{return document.getElementsByTagName("head")[0]||document.documentElement},globalEval:function(data)
{var script=document.createElement("script");script.type="text/javascript";if(HttpLibrary.browser.msie)
script.text=data;else
script.appendChild(document.createTextNode(data));var head=HttpLibrary.getHead();head.appendChild(script);},loadJavascript_jQuery:function(data)
{if(HttpLibrary.browser.safari)
{return jQuery.ajax({type:"GET",url:data.url,data:null,success:function(content)
{HttpLibrary.globalEval(content);data.success();},error:function(xml,status,e)
{if(xml&&xml.responseText)
data.error(xml.responseText);else
data.error(url+'\n'+e.message);},dataType:"html"});}
else
{HttpLibrary.createScriptTag(data.url,data.success,data.error);}},loadJavascript_MSAJAX:function(data)
{if(HttpLibrary.browser.safari)
{var params={url:data.url,success:function(content)
{HttpLibrary.globalEval(content);data.success(content);},error:data.error};HttpLibrary.httpGet_MSAJAX(params);}
else
{HttpLibrary.createScriptTag(data.url,data.success,data.error);}},loadJavascript_Prototype:function(data)
{if(HttpLibrary.browser.safari)
{var params={url:data.url,success:function(content)
{HttpLibrary.globalEval(content);data.success(content);},error:data.error};HttpLibrary.httpGet_Prototype(params);}
else
{HttpLibrary.createScriptTag(data.url,data.success,data.error);}},httpGet_jQuery:function(data)
{return jQuery.ajax({type:"GET",url:data.url,data:null,success:data.success,error:function(xml,status,e)
{if(xml&&xml.responseText)
data.error(xml.responseText);else
data.error("Error occured while loading: "+url+'\n'+e.message);},dataType:data.type||"html"});},httpGet_MSAJAX:function(data)
{var _wRequest=new Sys.Net.WebRequest();_wRequest.set_url(data.url);_wRequest.set_httpVerb("GET");_wRequest.add_completed(function(result)
{var errorMsg="Failed to load:"+data.url;if(result.get_timedOut()){errorMsg="Timed out";}
if(result.get_aborted()){errorMsg="Aborted";}
if(result.get_responseAvailable())data.success(result.get_responseData());else data.error(errorMsg);});var executor=new Sys.Net.XMLHttpExecutor();_wRequest.set_executor(executor);executor.executeRequest();},httpGet_Prototype:function(data)
{new Ajax.Request(data.url,{method:'get',evalJS:false,onSuccess:function(transport,json)
{data.success(transport.responseText||"");},onFailure:data.error});}};})();function generateCanvasUrl(incomingParams)
{firebug_log("generateCanvasUrl called");var view=new gadgets.views.View("canvas");var urlTemplate=view.getUrlTemplate();var myParams={'params':incomingParams};var myCanvasUrl=view.bind(myParams);return myCanvasUrl;}
function is_empty(obj)
{if(obj==undefined||obj==null||obj==""||!obj)
{return true;}
else
{return false;}}
function sanitize_number(page_num,def){if(is_empty(page_num))return def;page_num=parseInt(page_num);if(isNaN(page_num))return def;else return page_num;}
function create_params_object(post_data)
{post_data=gadgets.io.encodeValues(post_data);var params={};params[gadgets.io.RequestParameters.AUTHORIZATION]=gadgets.io.AuthorizationType.SIGNED;params[gadgets.io.RequestParameters.CONTENT_TYPE]=gadgets.io.ContentType.TEXT;params[gadgets.io.RequestParameters.METHOD]=gadgets.io.MethodType.POST;params[gadgets.io.RequestParameters.POST_DATA]=post_data;timer2=(new Date()).getTime();timer2_correctly_set=true;return params;}
function afterCallback(page_name)
{firebug_log("afterCallback called");if(typeof(page_name)=='undefined')
page_name="other";if(timer2_correctly_set)
{try
{pageTracker._trackEvent("pageload_times",page_name,"",(new Date()).getTime()-timer2);}
catch(e)
{}}
timer2_correctly_set=false;}
function adjust_height(height)
{firebug_log("adjust_height called");if(is_empty(height))
{gadgets.window.adjustHeight();}
else
{gadgets.window.adjustHeight(height);}}
function bind_to(bind_obj)
{firebug_log("bind_to called");if(bind_obj['confirm'])
{if(!confirm(bind_obj['confirm_message']))return false;}
if(!bind_obj['ajaxy'])
{show_loading_indicator();}
if(bind_obj['from']&&bind_obj['page'])
{firebug_log("from found in bind_obj. tracking this click");record_click(bind_obj['from'],bind_obj['page']);}
var window_url=generateCanvasUrl(bind_obj);firebug_log("window_url="+window_url);parent.location.href=window_url;}
function navigate_to(navigate_obj)
{firebug_log("navigate_to called");if(navigate_obj['confirm'])
{if(!confirm(navigate_obj['confirm_message']))return false;}
if(!navigate_obj['ajaxy'])
{show_loading_indicator();}
if(passed_params['OwnerId'])
{firebug_log("OwnerId found in passed_params. attaching value to navigate_obj");navigate_obj['OwnerId']=passed_params['OwnerId'];}
passed_params={};var supported_views=gadgets.views.getSupportedViews();var to_view=navigate_obj['view'];if(navigate_obj['from']&&navigate_obj['page'])
{firebug_log("from found in navigate_obj. tracking this click");record_click(navigate_obj['from'],navigate_obj['page']);}
if(to_view!=view)
{gadgets.views.requestNavigateTo(supported_views[to_view],navigate_obj);}
else
{passed_params=navigate_obj;show_page(navigate_obj['page'],to_view);}}
function replace_inner_html(div,html,do_adjust_height)
{firebug_log("replace_inner_html called");if(do_adjust_height==null)
do_adjust_height=true;$(div).update(html);if(do_adjust_height)
adjust_height();}
function handle_response_error(error_object,message_div)
{firebug_log("entered handle_response_error");if(error_object['error_code'])
{record_hit(error_object['error_code']);}
if(error_object['error_code']&&error_object['error_message'])
{firebug_log("error code="+error_object['error_code']);firebug_log("error message="+error_object['error_message']);show_response_error(error_object['error_message'],message_div);}
else
{if(error_object['error_message'])
{show_response_error(error_object['error_message'],message_div);}
else
{show_response_error("An unknown error has occured. Please refresh the page",message_div);}}}
function response_had_error(error_object)
{firebug_log("entered response_had_error");if(!is_empty(error_object['had_error'])&&error_object['had_error']==1)
{firebug_log("response_had_error returning true");return true;}
else
{firebug_log("response_had_error returning false");return false;}}
function callback_had_error(obj)
{firebug_log("callback_had_error called");if(!is_empty(obj.errors)||is_empty(obj.text))
{firebug_log("callback_had_error returning true");return true;}
else
{firebug_log("callback_had_error returning false");return false;}}
function handle_callback_error(obj)
{var error_msg;if(obj.errors=="Error 403")
{firebug_log("Error 403 caught");error_msg="Your security token has expired. Please hit F5 and reload the application.";}
else if(obj.errors=="Error 504")
{firebug_log("Error 504 caught");error_msg="The server did not respond. Please try again!";}
else if(obj.errors=="Error 500")
{firebug_log("Error 500 caught");error_msg="The server did not respond. Please try again!";}
else if(is_empty(obj.text))
{firebug_log("Blank response caught");error_msg="The server did not respond. Please try again!";}
else
{firebug_log("Error code could not be determined");error_msg="The server did not respond. Please try again!";}
if($("app_message"))
{Element.update("app_message",error_msg);$("app_message").removeClassName("notice");$("app_message").removeClassName("success");$("app_message").addClassName("error");$("loading").hide();$("app_message").show();}
else
{$('ss-main').innerHTML="<div class='error'>"+error_msg+"</div>";}}
function firebug_log(msg)
{if(!is_production)
{try
{if(window.console.firebug)
{console.log(msg);}}
catch(e)
{}}}
function show_response_error(error_msg,message_div)
{firebug_log("show_response_error called");if(message_div!=undefined&&$(message_div))
{Element.update(message_div,error_msg);$(message_div).show();}
else if($("app_message"))
{Element.update("app_message",error_msg);$("app_message").removeClassName("notice");$("app_message").removeClassName("success");$("app_message").addClassName("error");$("loading").hide();$("app_message").show();}
else
{$('ss-main').innerHTML="<div class='error'>"+error_msg+"</div>";}}
function show_loading_indicator()
{firebug_log("show_loading_indicator called");if(!is_empty($("loading")))$("loading").show();}
function record_error(obj,page_name)
{if(typeof(page_name)=='undefined')
page_name="other";if(obj.errors=="Error 403")
{firebug_log("Error 403 caught");error_code="403";}
else if(obj.errors=="Error 504")
{firebug_log("Error 504 caught");error_code="504";}
else if(obj.errors=="Error 500")
{firebug_log("Error 500 caught");error_code="500";}
else
{error_code=obj.errors;firebug_log("error_code ="+error_code);}
record_hit("null_server_response_"+error_code);pageTracker._trackEvent("null_server_response",String(error_code),page_name);}
function record_hit(page_name)
{firebug_log("record_hit called");try
{if(is_empty(page_name))
{firebug_log("page_name is empty");}
else
{firebug_log("page_name is="+page_name);pageTracker._trackPageview("/liss-"+page_name);}}
catch(e)
{firebug_log("record_hit exception caught");}}
function record_click(category,action)
{firebug_log("record_click called");try
{if(is_empty(category)||is_empty(action))
{firebug_log("category or action is empty");}
else
{firebug_log("category is="+category+" and action="+action);pageTracker._trackEvent(category,action);}}
catch(e)
{firebug_log("record_click exception caught");}}
var view=gadgets.views.getCurrentView().getName().toString();var passed_params=gadgets.views.getParams();function initialize_app_home()
{firebug_log("initialize_app_home");initialize_app();}
function initialize_app()
{if(is_production)
{firebug_log("Step 1: initialize_app (production)");}
else
{firebug_log("Step 1: initialize_app (development)");}
if(is_production)
{gadgets.window.setTitle("SlideShare");}
else
{gadgets.window.setTitle("SlideShare Development");}
initialize_view();}
function initialize_view()
{request_home_view_html();}
function request_home_view_html()
{firebug_log("request_home_view_html called");var url=server+"/slideshows/home_view";var post_data={};var params=create_params_object(post_data);gadgets.io.makeRequest(url,on_load_home_view_html,params);}
function on_load_home_view_html(obj)
{firebug_log("on_load_home_view_html called");afterCallback("home_view");if(callback_had_error(obj))
{record_error(obj,"home_view");handle_callback_error(obj);return false;}
var response=gadgets.json.parse(obj.text);if(response_had_error(response))
{handle_response_error(response);return false;}
var response_html=obj.text;if(response_html.indexOf('nocontent')!=-1)
{try
{pageTracker._trackEvent("home_view_details","no_content");}
catch(e){}}
else
{try
{pageTracker._trackEvent("home_view_details","content");}
catch(e){}}
replace_inner_html("ss-main",response_html);record_hit("home_view");}
var home_mouse_over_check=true;Event.observe(window,'mouseover',function(){if(home_mouse_over_check)
{home_mouse_over_check=false;try
{pageTracker._trackEvent("home_view_details","mouseovers");}
catch(e){}}})
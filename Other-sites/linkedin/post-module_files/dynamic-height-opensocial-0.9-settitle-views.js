var gadgets=gadgets||{};
gadgets.config=function(){var A=[];
return{register:function(D,C,B){var E=A[D];
if(!E){E=[];
A[D]=E
}E.push({validators:C||{},callback:B})
},get:function(B){if(B){return configuration[B]||{}
}return configuration
},init:function(D,K){configuration=D;
for(var B in A){if(A.hasOwnProperty(B)){var C=A[B],H=D[B];
for(var G=0,F=C.length;
G<F;
++G){var I=C[G];
if(H&&!K){var E=I.validators;
for(var J in E){if(E.hasOwnProperty(J)){if(!E[J](H[J])){throw new Error('Invalid config value "'+H[J]+'" for parameter "'+J+'" in component "'+B+'"')
}}}}if(I.callback){I.callback(D)
}}}}},EnumValidator:function(E){var D=[];
if(arguments.length>1){for(var C=0,B;
(B=arguments[C]);
++C){D.push(B)
}}else{D=E
}return function(G){for(var F=0,H;
(H=D[F]);
++F){if(G===D[F]){return true
}}}
},RegExValidator:function(B){return function(C){return B.test(C)
}
},ExistsValidator:function(B){return typeof B!=="undefined"
},NonEmptyStringValidator:function(B){return typeof B==="string"&&B.length>0
},BooleanValidator:function(B){return typeof B==="boolean"
},LikeValidator:function(B){return function(D){for(var E in B){if(B.hasOwnProperty(E)){var C=B[E];
if(!C(D[E])){return false
}}}return true
}
}}
}();;
var gadgets=gadgets||{};
gadgets.util=function(){function G(L){var M;
var K=L;
var I=K.indexOf("?");
var J=K.indexOf("#");
if(J===-1){M=K.substr(I+1)
}else{M=[K.substr(I+1,J-I-1),"&",K.substr(J+1)].join("")
}return M.split("&")
}var E=null;
var D={};
var C={};
var F=[];
var A={0:false,10:true,13:true,34:true,39:true,60:true,62:true,92:true,8232:true,8233:true};
function B(I,J){return String.fromCharCode(J)
}function H(I){D=I["core.util"]||{}
}if(gadgets.config){gadgets.config.register("core.util",null,H)
}return{getUrlParameters:function(Q){if(E!==null&&typeof Q==="undefined"){return E
}var M={};
E={};
var J=G(Q||document.location.href);
var O=window.decodeURIComponent?decodeURIComponent:unescape;
for(var L=0,K=J.length;
L<K;
++L){var N=J[L].indexOf("=");
if(N===-1){continue
}var I=J[L].substring(0,N);
var P=J[L].substring(N+1);
P=P.replace(/\+/g," ");
M[I]=O(P)
}if(typeof Q==="undefined"){E=M
}return M
},makeClosure:function(L,N,M){var K=[];
for(var J=2,I=arguments.length;
J<I;
++J){K.push(arguments[J])
}return function(){var O=K.slice();
for(var Q=0,P=arguments.length;
Q<P;
++Q){O.push(arguments[Q])
}return N.apply(L,O)
}
},makeEnum:function(J){var L={};
for(var K=0,I;
(I=J[K]);
++K){L[I]=I
}return L
},getFeatureParameters:function(I){return typeof D[I]==="undefined"?null:D[I]
},hasFeature:function(I){return typeof D[I]!=="undefined"
},getServices:function(){return C
},registerOnLoadHandler:function(I){F.push(I)
},runOnLoadHandlers:function(){for(var J=0,I=F.length;
J<I;
++J){F[J]()
}},escape:function(I,M){if(!I){return I
}else{if(typeof I==="string"){return gadgets.util.escapeString(I)
}else{if(typeof I==="array"){for(var L=0,J=I.length;
L<J;
++L){I[L]=gadgets.util.escape(I[L])
}}else{if(typeof I==="object"&&M){var K={};
for(var N in I){if(I.hasOwnProperty(N)){K[gadgets.util.escapeString(N)]=gadgets.util.escape(I[N],true)
}}return K
}}}}return I
},escapeString:function(M){var J=[],L,N;
for(var K=0,I=M.length;
K<I;
++K){L=M.charCodeAt(K);
N=A[L];
if(N===true){J.push("&#",L,";")
}else{if(N!==false){J.push(M.charAt(K))
}}}return J.join("")
},unescapeString:function(I){return I.replace(/&#([0-9]+);/g,B)
}}
}();
gadgets.util.getUrlParameters();;
var tamings___=tamings___||[];
tamings___.push(function(A){caja___.whitelistFuncs([[gadgets.util,"escapeString"],[gadgets.util,"getFeatureParameters"],[gadgets.util,"hasFeature"],[gadgets.util,"registerOnLoadHandler"],[gadgets.util,"unescapeString"]])
});;
var gadgets=gadgets||{};
if(window.JSON&&window.JSON.parse&&window.JSON.stringify){gadgets.json={parse:function(B){try{return window.JSON.parse(B)
}catch(A){return false
}},stringify:function(B){try{return window.JSON.stringify(B)
}catch(A){return null
}}}
}else{gadgets.json=function(){function f(n){return n<10?"0"+n:n
}Date.prototype.toJSON=function(){return[this.getUTCFullYear(),"-",f(this.getUTCMonth()+1),"-",f(this.getUTCDate()),"T",f(this.getUTCHours()),":",f(this.getUTCMinutes()),":",f(this.getUTCSeconds()),"Z"].join("")
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function stringify(value){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;
switch(typeof value){case"string":return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];
if(c){return c
}c=a.charCodeAt();
return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)
})+'"':'"'+value+'"';
case"number":return isFinite(value)?String(value):"null";
case"boolean":case"null":return String(value);
case"object":if(!value){return"null"
}a=[];
if(typeof value.length==="number"&&!value.propertyIsEnumerable("length")){l=value.length;
for(i=0;
i<l;
i+=1){a.push(stringify(value[i])||"null")
}return"["+a.join(",")+"]"
}for(k in value){if(k.match("___$")){continue
}if(value.hasOwnProperty(k)){if(typeof k==="string"){v=stringify(value[k]);
if(v){a.push(stringify(k)+":"+v)
}}}}return"{"+a.join(",")+"}"
}}return{stringify:stringify,parse:function(text){if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){return eval("("+text+")")
}return false
}}
}()
};;
var tamings___=tamings___||[];
tamings___.push(function(A){caja___.whitelistFuncs([[gadgets.json,"parse"],[gadgets.json,"stringify"]])
});;
var opensocial=opensocial||{};
opensocial.requestSendMessage=function(A,D,B,C){return opensocial.Container.get().requestSendMessage(A,D,B,C)
};
opensocial.requestShareApp=function(A,D,B,C){opensocial.Container.get().requestShareApp(A,D,B,C)
};
opensocial.requestCreateActivity=function(C,B,A){if(!C||(!C.getField(opensocial.Activity.Field.TITLE)&&!C.getField(opensocial.Activity.Field.TITLE_ID))){if(A){window.setTimeout(function(){A(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.BAD_REQUEST,"You must pass in an activity with a title or title id."))
},0)
}return 
}opensocial.Container.get().requestCreateActivity(C,B,A)
};
opensocial.CreateActivityPriority={HIGH:"HIGH",LOW:"LOW"};
opensocial.hasPermission=function(A){return opensocial.Container.get().hasPermission(A)
};
opensocial.requestPermission=function(B,C,A){opensocial.Container.get().requestPermission(B,C,A)
};
opensocial.Permission={VIEWER:"viewer"};
opensocial.getEnvironment=function(){return opensocial.Container.get().getEnvironment()
};
opensocial.newDataRequest=function(){return opensocial.Container.get().newDataRequest()
};
opensocial.newActivity=function(A){return opensocial.Container.get().newActivity(A)
};
opensocial.newMediaItem=function(C,A,B){return opensocial.Container.get().newMediaItem(C,A,B)
};
opensocial.newMessage=function(A,B){return opensocial.Container.get().newMessage(A,B)
};
opensocial.EscapeType={HTML_ESCAPE:"htmlEscape",NONE:"none"};
opensocial.newIdSpec=function(A){return opensocial.Container.get().newIdSpec(A)
};
opensocial.newNavigationParameters=function(A){return opensocial.Container.get().newNavigationParameters(A)
};
opensocial.invalidateCache=function(){opensocial.Container.get().invalidateCache()
};
Function.prototype.inherits=function(A){function B(){}B.prototype=A.prototype;
this.superClass_=A.prototype;
this.prototype=new B();
this.prototype.constructor=this
};;
opensocial.Activity=function(A){this.fields_=A
};
opensocial.Activity.Field={TITLE_ID:"titleId",TITLE:"title",TEMPLATE_PARAMS:"templateParams",URL:"url",MEDIA_ITEMS:"mediaItems",BODY_ID:"bodyId",BODY:"body",EXTERNAL_ID:"externalId",STREAM_TITLE:"streamTitle",STREAM_URL:"streamUrl",STREAM_SOURCE_URL:"streamSourceUrl",STREAM_FAVICON_URL:"streamFaviconUrl",PRIORITY:"priority",ID:"id",USER_ID:"userId",APP_ID:"appId",POSTED_TIME:"postedTime"};
opensocial.Activity.prototype.getId=function(){return this.getField(opensocial.Activity.Field.ID)
};
opensocial.Activity.prototype.getField=function(A,B){return opensocial.Container.getField(this.fields_,A,B)
};
opensocial.Activity.prototype.setField=function(A,B){return(this.fields_[A]=B)
};;
opensocial.Address=function(A){this.fields_=A||{}
};
opensocial.Address.Field={TYPE:"type",UNSTRUCTURED_ADDRESS:"unstructuredAddress",PO_BOX:"poBox",STREET_ADDRESS:"streetAddress",EXTENDED_ADDRESS:"extendedAddress",REGION:"region",LOCALITY:"locality",POSTAL_CODE:"postalCode",COUNTRY:"country",LATITUDE:"latitude",LONGITUDE:"longitude"};
opensocial.Address.prototype.getField=function(A,B){return opensocial.Container.getField(this.fields_,A,B)
};;
opensocial.BodyType=function(A){this.fields_=A||{}
};
opensocial.BodyType.Field={BUILD:"build",HEIGHT:"height",WEIGHT:"weight",EYE_COLOR:"eyeColor",HAIR_COLOR:"hairColor"};
opensocial.BodyType.prototype.getField=function(A,B){return opensocial.Container.getField(this.fields_,A,B)
};;
opensocial.Collection=function(C,B,A){this.array_=C||[];
this.offset_=B||0;
this.totalSize_=A||this.array_.length
};
opensocial.Collection.prototype.getById=function(C){for(var A=0;
A<this.size();
A++){var B=this.array_[A];
if(B.getId()===C){return B
}}return null
};
opensocial.Collection.prototype.size=function(){return this.array_.length
};
opensocial.Collection.prototype.each=function(B){for(var A=0;
A<this.size();
A++){B(this.array_[A])
}};
opensocial.Collection.prototype.asArray=function(){return this.array_
};
opensocial.Collection.prototype.getTotalSize=function(){return this.totalSize_
};
opensocial.Collection.prototype.getOffset=function(){return this.offset_
};;
opensocial.Container=function(){};
opensocial.Container.container_=null;
opensocial.Container.setContainer=function(A){opensocial.Container.container_=A
};
opensocial.Container.get=function(){return opensocial.Container.container_
};
opensocial.Container.prototype.getEnvironment=function(){};
opensocial.Container.prototype.requestSendMessage=function(A,D,B,C){gadgets.rpc.call(null,"requestSendMessage",B,A,D,B,C)
};
opensocial.Container.prototype.requestShareApp=function(A,D,B,C){if(B){window.setTimeout(function(){B(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.NOT_IMPLEMENTED,null))
},0)
}};
opensocial.Container.prototype.requestCreateActivity=function(C,B,A){if(A){window.setTimeout(function(){A(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.NOT_IMPLEMENTED,null))
},0)
}};
opensocial.Container.prototype.hasPermission=function(A){return false
};
opensocial.Container.prototype.requestPermission=function(B,C,A){if(A){window.setTimeout(function(){A(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.NOT_IMPLEMENTED,null))
},0)
}};
opensocial.Container.prototype.requestData=function(A,B){};
opensocial.Container.prototype.newFetchPersonRequest=function(B,A){};
opensocial.Container.prototype.newFetchPeopleRequest=function(A,B){};
opensocial.Container.prototype.newFetchPersonAppDataRequest=function(A,C,B){};
opensocial.Container.prototype.newUpdatePersonAppDataRequest=function(A,B){};
opensocial.Container.prototype.newRemovePersonAppDataRequest=function(A){};
opensocial.Container.prototype.newFetchActivitiesRequest=function(A,B){};
opensocial.Container.prototype.newFetchMessageCollectionsRequest=function(A,B){};
opensocial.Container.prototype.newFetchMessagesRequest=function(A,C,B){};
opensocial.Container.prototype.newCollection=function(C,B,A){return new opensocial.Collection(C,B,A)
};
opensocial.Container.prototype.newPerson=function(A,B,C){return new opensocial.Person(A,B,C)
};
opensocial.Container.prototype.newActivity=function(A){return new opensocial.Activity(A)
};
opensocial.Container.prototype.newMediaItem=function(C,A,B){return new opensocial.MediaItem(C,A,B)
};
opensocial.Container.prototype.newMessage=function(A,B){return new opensocial.Message(A,B)
};
opensocial.Container.prototype.newIdSpec=function(A){return new opensocial.IdSpec(A)
};
opensocial.Container.prototype.newNavigationParameters=function(A){return new opensocial.NavigationParameters(A)
};
opensocial.Container.prototype.newResponseItem=function(A,C,B,D){return new opensocial.ResponseItem(A,C,B,D)
};
opensocial.Container.prototype.newDataResponse=function(A,B){return new opensocial.DataResponse(A,B)
};
opensocial.Container.prototype.newDataRequest=function(){return new opensocial.DataRequest()
};
opensocial.Container.prototype.newEnvironment=function(B,A){return new opensocial.Environment(B,A)
};
opensocial.Container.prototype.invalidateCache=function(){};
opensocial.Container.isArray=function(A){return A instanceof Array
};
opensocial.Container.getField=function(A,B,C){var D=A[B];
return opensocial.Container.escape(D,C,false)
};
opensocial.Container.escape=function(C,B,A){if(B&&B[opensocial.DataRequest.DataRequestFields.ESCAPE_TYPE]==opensocial.EscapeType.NONE){return C
}else{return gadgets.util.escape(C,A)
}};;
opensocial.DataRequest=function(){this.requestObjects_=[]
};
opensocial.DataRequest.prototype.requestObjects_=null;
opensocial.DataRequest.prototype.getRequestObjects=function(){return this.requestObjects_
};
opensocial.DataRequest.prototype.add=function(B,A){return this.requestObjects_.push({key:A,request:B})
};
opensocial.DataRequest.prototype.send=function(A){var B=A||function(){};
opensocial.Container.get().requestData(this,B)
};
opensocial.DataRequest.SortOrder={TOP_FRIENDS:"topFriends",NAME:"name"};
opensocial.DataRequest.FilterType={ALL:"all",HAS_APP:"hasApp",TOP_FRIENDS:"topFriends",IS_FRIENDS_WITH:"isFriendsWith"};
opensocial.DataRequest.PeopleRequestFields={PROFILE_DETAILS:"profileDetail",SORT_ORDER:"sortOrder",FILTER:"filter",FILTER_OPTIONS:"filterOptions",FIRST:"first",MAX:"max",APP_DATA:"appData",ESCAPE_TYPE:"escapeType"};
opensocial.DataRequest.prototype.addDefaultParam=function(C,B,A){C[B]=C[B]||A
};
opensocial.DataRequest.prototype.addDefaultProfileFields=function(B){var A=opensocial.DataRequest.PeopleRequestFields;
var C=B[A.PROFILE_DETAILS]||[];
B[A.PROFILE_DETAILS]=C.concat([opensocial.Person.Field.ID,opensocial.Person.Field.NAME,opensocial.Person.Field.THUMBNAIL_URL])
};
opensocial.DataRequest.prototype.asArray=function(A){if(opensocial.Container.isArray(A)){return A
}else{return[A]
}};
opensocial.DataRequest.prototype.newFetchPersonRequest=function(B,A){A=A||{};
this.addDefaultProfileFields(A);
return opensocial.Container.get().newFetchPersonRequest(B,A)
};
opensocial.DataRequest.prototype.newFetchPeopleRequest=function(B,C){C=C||{};
var A=opensocial.DataRequest.PeopleRequestFields;
this.addDefaultProfileFields(C);
this.addDefaultParam(C,A.SORT_ORDER,opensocial.DataRequest.SortOrder.TOP_FRIENDS);
this.addDefaultParam(C,A.FILTER,opensocial.DataRequest.FilterType.ALL);
this.addDefaultParam(C,A.FIRST,0);
this.addDefaultParam(C,A.MAX,20);
return opensocial.Container.get().newFetchPeopleRequest(B,C)
};
opensocial.DataRequest.DataRequestFields={ESCAPE_TYPE:"escapeType"};
opensocial.DataRequest.prototype.newFetchPersonAppDataRequest=function(A,C,B){return opensocial.Container.get().newFetchPersonAppDataRequest(A,this.asArray(C),B)
};
opensocial.DataRequest.prototype.newUpdatePersonAppDataRequest=function(A,B){return opensocial.Container.get().newUpdatePersonAppDataRequest(A,B)
};
opensocial.DataRequest.prototype.newRemovePersonAppDataRequest=function(A){return opensocial.Container.get().newRemovePersonAppDataRequest(A)
};
opensocial.DataRequest.ActivityRequestFields={APP_ID:"appId",FIRST:"first",MAX:"max"};
opensocial.DataRequest.prototype.newFetchActivitiesRequest=function(B,C){C=C||{};
var A=opensocial.DataRequest.ActivityRequestFields;
this.addDefaultParam(C,A.FIRST,0);
this.addDefaultParam(C,A.MAX,20);
return opensocial.Container.get().newFetchActivitiesRequest(B,C)
};
opensocial.DataRequest.prototype.newFetchMessageCollectionsRequest=function(A,B){B=B||{};
return opensocial.Container.get().newFetchMessageCollectionsRequest(A,B)
};
opensocial.DataRequest.prototype.newFetchMessagesRequest=function(A,C,B){B=B||{};
return opensocial.Container.get().newFetchMessagesRequest(A,C,B)
};;
opensocial.DataResponse=function(A,B,C){this.responseItems_=A;
this.globalError_=B;
this.errorMessage_=C
};
opensocial.DataResponse.prototype.hadError=function(){return !!this.globalError_
};
opensocial.DataResponse.prototype.getErrorMessage=function(){return this.errorMessage_
};
opensocial.DataResponse.prototype.get=function(A){return this.responseItems_[A]
};;
opensocial.Email=function(A){this.fields_=A||{}
};
opensocial.Email.Field={TYPE:"type",ADDRESS:"address"};
opensocial.Email.prototype.getField=function(A,B){return opensocial.Container.getField(this.fields_,A,B)
};;
opensocial.Enum=function(B,A){this.key=B;
this.displayValue=A
};
opensocial.Enum.prototype.getKey=function(){return gadgets.util.escape(this.key)
};
opensocial.Enum.prototype.getDisplayValue=function(){return gadgets.util.escape(this.displayValue)
};
opensocial.Enum.Smoker={NO:"NO",YES:"YES",SOCIALLY:"SOCIALLY",OCCASIONALLY:"OCCASIONALLY",REGULARLY:"REGULARLY",HEAVILY:"HEAVILY",QUITTING:"QUITTING",QUIT:"QUIT"};
opensocial.Enum.Drinker={NO:"NO",YES:"YES",SOCIALLY:"SOCIALLY",OCCASIONALLY:"OCCASIONALLY",REGULARLY:"REGULARLY",HEAVILY:"HEAVILY",QUITTING:"QUITTING",QUIT:"QUIT"};
opensocial.Enum.Gender={MALE:"MALE",FEMALE:"FEMALE"};
opensocial.Enum.LookingFor={DATING:"DATING",FRIENDS:"FRIENDS",RELATIONSHIP:"RELATIONSHIP",NETWORKING:"NETWORKING",ACTIVITY_PARTNERS:"ACTIVITY_PARTNERS",RANDOM:"RANDOM"};
opensocial.Enum.Presence={AWAY:"AWAY",CHAT:"CHAT",DND:"DND",OFFLINE:"OFFLINE",ONLINE:"ONLINE",XA:"XA"};;
opensocial.Environment=function(B,A){this.domain=B;
this.supportedFields=A
};
opensocial.Environment.prototype.getDomain=function(){return this.domain
};
opensocial.Environment.ObjectType={PERSON:"person",ADDRESS:"address",BODY_TYPE:"bodyType",EMAIL:"email",NAME:"name",ORGANIZATION:"organization",PHONE:"phone",URL:"url",ACTIVITY:"activity",MEDIA_ITEM:"mediaItem",MESSAGE:"message",MESSAGE_TYPE:"messageType",SORT_ORDER:"sortOrder",FILTER_TYPE:"filterType"};
opensocial.Environment.prototype.supportsField=function(A,C){var B=this.supportedFields[A]||[];
return !!B[C]
};;
opensocial.IdSpec=function(A){this.fields_=A||{}
};
opensocial.IdSpec.Field={USER_ID:"userId",GROUP_ID:"groupId",NETWORK_DISTANCE:"networkDistance"};
opensocial.IdSpec.PersonId={OWNER:"OWNER",VIEWER:"VIEWER"};
opensocial.IdSpec.GroupId={SELF:"SELF",FRIENDS:"FRIENDS",ALL:"ALL"};
opensocial.IdSpec.prototype.getField=function(A,B){return opensocial.Container.getField(this.fields_,A,B)
};
opensocial.IdSpec.prototype.setField=function(A,B){return(this.fields_[A]=B)
};;
opensocial.MediaItem=function(D,B,C){this.fields_={};
if(C){for(var A in C){if(C.hasOwnProperty(A)){this.fields_[A]=C[A]
}}}this.fields_[opensocial.MediaItem.Field.MIME_TYPE]=D;
this.fields_[opensocial.MediaItem.Field.URL]=B
};
opensocial.MediaItem.Type={IMAGE:"image",VIDEO:"video",AUDIO:"audio"};
opensocial.MediaItem.Field={TYPE:"type",MIME_TYPE:"mimeType",URL:"url"};
opensocial.MediaItem.prototype.getField=function(A,B){return opensocial.Container.getField(this.fields_,A,B)
};
opensocial.MediaItem.prototype.setField=function(A,B){return(this.fields_[A]=B)
};;
opensocial.MessageCollection=function(A){this.fields_=A||{}
};
opensocial.MessageCollection.Field={ID:"id",TITLE:"title",TOTAL:"total",UNREAD:"unread",UPDATED:"updated",URLS:"urls"};
opensocial.MessageCollection.prototype.getField=function(A,B){return opensocial.Container.getField(this.fields_,A,B)
};
opensocial.MessageCollection.prototype.setField=function(A,B){return this.fields_[A]=B
};;
opensocial.Message=function(A,B){if(typeof A=="string"){this.fields_=B||{};
this.fields_[opensocial.Message.Field.BODY]=A
}else{this.fields_=A||{}
}};
opensocial.Message.Field={APP_URL:"appUrl",BODY:"body",BODY_ID:"bodyId",COLLECTION_IDS:"collectionIds",ID:"id",PARENT_ID:"parentId",RECIPIENTS:"recipients",SENDER_ID:"senderId",STATUS:"status",TIME_SENT:"timeSent",TITLE:"title",TITLE_ID:"titleId",TYPE:"type",UPDATED:"updated",URLS:"urls"};
opensocial.Message.Type={EMAIL:"email",NOTIFICATION:"notification",PRIVATE_MESSAGE:"privateMessage",PUBLIC_MESSAGE:"publicMessage"};
opensocial.Message.Status={NEW:"new",DELETED:"deleted",FLAGGED:"flagged"};
opensocial.Message.prototype.getField=function(A,B){return opensocial.Container.getField(this.fields_,A,B)
};
opensocial.Message.prototype.setField=function(A,B){return(this.fields_[A]=B)
};;
opensocial.Name=function(A){this.fields_=A||{}
};
opensocial.Name.Field={FAMILY_NAME:"familyName",GIVEN_NAME:"givenName",ADDITIONAL_NAME:"additionalName",HONORIFIC_PREFIX:"honorificPrefix",HONORIFIC_SUFFIX:"honorificSuffix",UNSTRUCTURED:"unstructured"};
opensocial.Name.prototype.getField=function(A,B){return opensocial.Container.getField(this.fields_,A,B)
};;
opensocial.NavigationParameters=function(A){this.fields_=A||{}
};
opensocial.NavigationParameters.Field={VIEW:"view",OWNER:"owner",PARAMETERS:"parameters"};
opensocial.NavigationParameters.prototype.getField=function(A,B){return opensocial.Container.getField(this.fields_,A,B)
};
opensocial.NavigationParameters.prototype.setField=function(A,B){return(this.fields_[A]=B)
};
opensocial.NavigationParameters.DestinationType={VIEWER_DESTINATION:"viewerDestination",RECIPIENT_DESTINATION:"recipientDestination"};;
opensocial.Organization=function(A){this.fields_=A||{}
};
opensocial.Organization.Field={NAME:"name",TITLE:"title",DESCRIPTION:"description",FIELD:"field",SUB_FIELD:"subField",START_DATE:"startDate",END_DATE:"endDate",SALARY:"salary",ADDRESS:"address",WEBPAGE:"webpage"};
opensocial.Organization.prototype.getField=function(A,B){return opensocial.Container.getField(this.fields_,A,B)
};;
opensocial.Person=function(A,B,C){this.fields_=A||{};
this.isOwner_=B;
this.isViewer_=C
};
opensocial.Person.Field={ID:"id",NAME:"name",NICKNAME:"nickname",THUMBNAIL_URL:"thumbnailUrl",PROFILE_URL:"profileUrl",CURRENT_LOCATION:"currentLocation",ADDRESSES:"addresses",EMAILS:"emails",PHONE_NUMBERS:"phoneNumbers",ABOUT_ME:"aboutMe",STATUS:"status",PROFILE_SONG:"profileSong",PROFILE_VIDEO:"profileVideo",GENDER:"gender",SEXUAL_ORIENTATION:"sexualOrientation",RELATIONSHIP_STATUS:"relationshipStatus",AGE:"age",DATE_OF_BIRTH:"dateOfBirth",BODY_TYPE:"bodyType",ETHNICITY:"ethnicity",SMOKER:"smoker",DRINKER:"drinker",CHILDREN:"children",PETS:"pets",LIVING_ARRANGEMENT:"livingArrangement",TIME_ZONE:"timeZone",LANGUAGES_SPOKEN:"languagesSpoken",JOBS:"jobs",JOB_INTERESTS:"jobInterests",SCHOOLS:"schools",INTERESTS:"interests",URLS:"urls",MUSIC:"music",MOVIES:"movies",TV_SHOWS:"tvShows",BOOKS:"books",ACTIVITIES:"activities",SPORTS:"sports",HEROES:"heroes",QUOTES:"quotes",CARS:"cars",FOOD:"food",TURN_ONS:"turnOns",TURN_OFFS:"turnOffs",TAGS:"tags",ROMANCE:"romance",SCARED_OF:"scaredOf",HAPPIEST_WHEN:"happiestWhen",FASHION:"fashion",HUMOR:"humor",LOOKING_FOR:"lookingFor",RELIGION:"religion",POLITICAL_VIEWS:"politicalViews",HAS_APP:"hasApp",NETWORK_PRESENCE:"networkPresence"};
opensocial.Person.prototype.getId=function(){return this.getField(opensocial.Person.Field.ID)
};
var ORDERED_NAME_FIELDS_=[opensocial.Name.Field.HONORIFIC_PREFIX,opensocial.Name.Field.GIVEN_NAME,opensocial.Name.Field.FAMILY_NAME,opensocial.Name.Field.HONORIFIC_SUFFIX,opensocial.Name.Field.ADDITIONAL_NAME];
opensocial.Person.prototype.getDisplayName=function(){var B=this.getField(opensocial.Person.Field.NAME);
if(B){var E=B.getField(opensocial.Name.Field.UNSTRUCTURED);
if(E){return E
}var D="";
for(var C=0;
C<ORDERED_NAME_FIELDS_.length;
C++){var A=B.getField(ORDERED_NAME_FIELDS_[C]);
if(A){D+=A+" "
}}return D.replace(/^\s+|\s+$/g,"")
}return this.getField(opensocial.Person.Field.NICKNAME)
};
opensocial.Person.prototype.getField=function(A,B){return opensocial.Container.getField(this.fields_,A,B)
};
opensocial.Person.prototype.getAppData=function(A){};
opensocial.Person.prototype.isViewer=function(){return !!this.isViewer_
};
opensocial.Person.prototype.isOwner=function(){return !!this.isOwner_
};;
opensocial.Phone=function(A){this.fields_=A||{}
};
opensocial.Phone.Field={TYPE:"type",NUMBER:"number"};
opensocial.Phone.prototype.getField=function(A,B){return opensocial.Container.getField(this.fields_,A,B)
};;
opensocial.ResponseItem=function(A,C,B,D){this.originalDataRequest_=A;
this.data_=C;
this.errorCode_=B;
this.errorMessage_=D
};
opensocial.ResponseItem.prototype.hadError=function(){return !!this.errorCode_
};
opensocial.ResponseItem.Error={NOT_IMPLEMENTED:"notImplemented",UNAUTHORIZED:"unauthorized",FORBIDDEN:"forbidden",BAD_REQUEST:"badRequest",INTERNAL_ERROR:"internalError",LIMIT_EXCEEDED:"limitExceeded"};
opensocial.ResponseItem.prototype.getErrorCode=function(){return this.errorCode_
};
opensocial.ResponseItem.prototype.getErrorMessage=function(){return this.errorMessage_
};
opensocial.ResponseItem.prototype.getOriginalDataRequest=function(){return this.originalDataRequest_
};
opensocial.ResponseItem.prototype.getData=function(){return this.data_
};;
opensocial.Url=function(A){this.fields_=A||{}
};
opensocial.Url.Field={TYPE:"type",LINK_TEXT:"linkText",ADDRESS:"address"};
opensocial.Url.prototype.getField=function(A,B){return opensocial.Container.getField(this.fields_,A,B)
};;
var tamings___=tamings___||[];
tamings___.push(function(A){___.grantRead(opensocial.IdSpec,"PersonId");
___.grantRead(opensocial.DataRequest,"PeopleRequestFields");
___.grantRead(JsonRpcRequestItem,"rpc");
___.grantRead(JsonRpcRequestItem,"processData");
___.grantRead(JsonRpcRequestItem,"processResponse");
___.grantRead(JsonRpcRequestItem,"errors");
caja___.whitelistCtors([[window,"JsonRpcRequestItem",Object],[opensocial,"Activity",Object],[opensocial,"Address",Object],[opensocial,"BodyType",Object],[opensocial,"Container",Object],[opensocial,"Collection",Object],[opensocial,"DataRequest",Object],[opensocial,"DataResponse",Object],[opensocial,"Email",Object],[opensocial,"Enum",Object],[opensocial,"Environment",Object],[opensocial,"IdSpec",Object],[opensocial,"MediaItem",Object],[opensocial,"Message",Object],[opensocial,"Name",Object],[opensocial,"NavigationParameters",Object],[opensocial,"Organization",Object],[opensocial,"Person",Object],[opensocial,"Phone",Object],[opensocial,"ResponseItem",Object],[opensocial,"Url",Object]]);
caja___.whitelistMeths([[opensocial.Activity,"getField"],[opensocial.Activity,"getId"],[opensocial.Activity,"setField"],[opensocial.Address,"getField"],[opensocial.BodyType,"getField"],[opensocial.Container,"getEnvironment"],[opensocial.Container,"requestSendMessage"],[opensocial.Container,"requestShareApp"],[opensocial.Container,"requestCreateActivity"],[opensocial.Container,"hasPermission"],[opensocial.Container,"requestPermission"],[opensocial.Container,"requestData"],[opensocial.Container,"newFetchPersonRequest"],[opensocial.Container,"newFetchPeopleRequest"],[opensocial.Container,"newFetchPersonAppDataRequest"],[opensocial.Container,"newUpdatePersonAppDataRequest"],[opensocial.Container,"newRemovePersonAppDataRequest"],[opensocial.Container,"newFetchActivitiesRequest"],[opensocial.Container,"newFetchMessageCollectionsRequest"],[opensocial.Container,"newFetchMessagesRequest"],[opensocial.Container,"newCollection"],[opensocial.Container,"newPerson"],[opensocial.Container,"newActivity"],[opensocial.Container,"newMediaItem"],[opensocial.Container,"newMessage"],[opensocial.Container,"newIdSpec"],[opensocial.Container,"newNavigationParameters"],[opensocial.Container,"newResponseItem"],[opensocial.Container,"newDataResponse"],[opensocial.Container,"newDataRequest"],[opensocial.Container,"newEnvironment"],[opensocial.Container,"invalidateCache"],[opensocial.Collection,"asArray"],[opensocial.Collection,"each"],[opensocial.Collection,"getById"],[opensocial.Collection,"getOffset"],[opensocial.Collection,"getTotalSize"],[opensocial.Collection,"size"],[opensocial.DataRequest,"add"],[opensocial.DataRequest,"newFetchActivitiesRequest"],[opensocial.DataRequest,"newFetchPeopleRequest"],[opensocial.DataRequest,"newFetchPersonAppDataRequest"],[opensocial.DataRequest,"newFetchPersonRequest"],[opensocial.DataRequest,"newRemovePersonAppDataRequest"],[opensocial.DataRequest,"newUpdatePersonAppDataRequest"],[opensocial.DataRequest,"send"],[opensocial.DataResponse,"get"],[opensocial.DataResponse,"getErrorMessage"],[opensocial.DataResponse,"hadError"],[opensocial.Email,"getField"],[opensocial.Enum,"getDisplayValue"],[opensocial.Enum,"getKey"],[opensocial.Environment,"getDomain"],[opensocial.Environment,"supportsField"],[opensocial.IdSpec,"getField"],[opensocial.IdSpec,"setField"],[opensocial.MediaItem,"getField"],[opensocial.MediaItem,"setField"],[opensocial.Message,"getField"],[opensocial.Message,"setField"],[opensocial.Name,"getField"],[opensocial.NavigationParameters,"getField"],[opensocial.NavigationParameters,"setField"],[opensocial.Organization,"getField"],[opensocial.Person,"getDisplayName"],[opensocial.Person,"getField"],[opensocial.Person,"getId"],[opensocial.Person,"isOwner"],[opensocial.Person,"isViewer"],[opensocial.Phone,"getField"],[opensocial.ResponseItem,"getData"],[opensocial.ResponseItem,"getErrorCode"],[opensocial.ResponseItem,"getErrorMessage"],[opensocial.ResponseItem,"getOriginalDataRequest"],[opensocial.ResponseItem,"hadError"],[opensocial.Url,"getField"]]);
caja___.whitelistFuncs([[opensocial.Container,"setContainer"],[opensocial.Container,"get"],[opensocial.Container,"getField"],[opensocial,"getEnvironment"],[opensocial,"hasPermission"],[opensocial,"newActivity"],[opensocial,"newDataRequest"],[opensocial,"newIdSpec"],[opensocial,"newMediaItem"],[opensocial,"newMessage"],[opensocial,"newNavigationParameters"],[opensocial,"requestCreateActivity"],[opensocial,"requestPermission"],[opensocial,"requestSendMessage"],[opensocial,"requestShareApp"]])
});;
var gadgets=gadgets||{};
gadgets.log=function(A){gadgets.log.logAtLevel(gadgets.log.INFO,A)
};
gadgets.warn=function(A){gadgets.log.logAtLevel(gadgets.log.WARNING,A)
};
gadgets.error=function(A){gadgets.log.logAtLevel(gadgets.log.ERROR,A)
};
gadgets.setLogLevel=function(A){gadgets.log.logLevelThreshold_=A
};
gadgets.log.logAtLevel=function(D,C){if(D<gadgets.log.logLevelThreshold_||!gadgets.log._console){return 
}var B;
var A=gadgets.log._console;
if(D==gadgets.log.WARNING&&A.warn){A.warn(C)
}else{if(D==gadgets.log.ERROR&&A.error){A.error(C)
}else{if(A.log){A.log(C)
}}}};
gadgets.log.INFO=1;
gadgets.log.WARNING=2;
gadgets.log.NONE=4;
gadgets.log.logLevelThreshold_=gadgets.log.INFO;
gadgets.log._console=window.console?window.console:window.opera?window.opera.postError:undefined;;
var tamings___=tamings___||[];
tamings___.push(function(A){___.grantRead(gadgets.log,"INFO");
___.grantRead(gadgets.log,"WARNING");
___.grantRead(gadgets.log,"ERROR");
___.grantRead(gadgets.log,"NONE");
caja___.whitelistFuncs([[gadgets,"log"],[gadgets,"warn"],[gadgets,"error"],[gadgets,"setLogLevel"],[gadgets.log,"logAtLevel"],])
});;
var gadgets=gadgets||{};
(function(){var I=null;
var J={};
var F=gadgets.util.escapeString;
var D={};
var H={};
var E="en";
var B="US";
var A=0;
function C(){var L=gadgets.util.getUrlParameters();
for(var K in L){if(L.hasOwnProperty(K)){if(K.indexOf("up_")===0&&K.length>3){J[K.substr(3)]=String(L[K])
}else{if(K==="country"){B=L[K]
}else{if(K==="lang"){E=L[K]
}else{if(K==="mid"){A=L[K]
}}}}}}}function G(){for(var K in H){if(typeof J[K]==="undefined"){J[K]=H[K]
}}}gadgets.Prefs=function(){if(!I){C();
G();
I=this
}return I
};
gadgets.Prefs.setInternal_=function(M,O){var N=false;
if(typeof M==="string"){if(!J.hasOwnProperty(M)||J[M]!==O){N=true
}J[M]=O
}else{for(var L in M){if(M.hasOwnProperty(L)){var K=M[L];
if(!J.hasOwnProperty(L)||J[L]!==K){N=true
}J[L]=K
}}}return N
};
gadgets.Prefs.setMessages_=function(K){D=K
};
gadgets.Prefs.setDefaultPrefs_=function(K){H=K
};
gadgets.Prefs.prototype.getString=function(K){if(K===".lang"){K="lang"
}return J[K]?F(J[K]):""
};
gadgets.Prefs.prototype.setDontEscape_=function(){F=function(K){return K
}
};
gadgets.Prefs.prototype.getInt=function(K){var L=parseInt(J[K],10);
return isNaN(L)?0:L
};
gadgets.Prefs.prototype.getFloat=function(K){var L=parseFloat(J[K]);
return isNaN(L)?0:L
};
gadgets.Prefs.prototype.getBool=function(K){var L=J[K];
if(L){return L==="true"||L===true||!!parseInt(L,10)
}return false
};
gadgets.Prefs.prototype.set=function(K,L){throw new Error("setprefs feature required to make this call.")
};
gadgets.Prefs.prototype.getArray=function(N){var O=J[N];
if(O){var K=O.split("|");
for(var M=0,L=K.length;
M<L;
++M){K[M]=F(K[M].replace(/%7C/g,"|"))
}return K
}return[]
};
gadgets.Prefs.prototype.setArray=function(K,L){throw new Error("setprefs feature required to make this call.")
};
gadgets.Prefs.prototype.getMsg=function(K){return D[K]||""
};
gadgets.Prefs.prototype.getCountry=function(){return B
};
gadgets.Prefs.prototype.getLang=function(){return E
};
gadgets.Prefs.prototype.getModuleId=function(){return A
}
})();;
var tamings___=tamings___||[];
tamings___.push(function(A){caja___.whitelistCtors([[gadgets,"Prefs",Object]]);
caja___.whitelistMeths([[gadgets.Prefs,"getArray"],[gadgets.Prefs,"getBool"],[gadgets.Prefs,"getCountry"],[gadgets.Prefs,"getFloat"],[gadgets.Prefs,"getInt"],[gadgets.Prefs,"getLang"],[gadgets.Prefs,"getMsg"],[gadgets.Prefs,"getString"],[gadgets.Prefs,"set"],[gadgets.Prefs,"setArray"]])
});;
var gadgets=gadgets||{};
gadgets.io=function(){var config={};
var oauthState;
function makeXhr(){var x;
if(window.ActiveXObject){x=new ActiveXObject("Msxml2.XMLHTTP");
if(!x){x=new ActiveXObject("Microsoft.XMLHTTP")
}return x
}else{if(window.XMLHttpRequest){return new window.XMLHttpRequest()
}}}function hadError(xobj,callback){if(xobj.readyState!==4){return true
}try{if(xobj.status!==200){var error=(""+xobj.status);
if(xobj.responseText){error=error+" "+xobj.responseText
}callback({errors:[error],rc:xobj.status,text:xobj.responseText});
return true
}}catch(e){callback({errors:[e.number+" Error not specified"],rc:e.number,text:e.description});
return true
}return false
}function processNonProxiedResponse(url,callback,params,xobj){if(hadError(xobj,callback)){return 
}var data={body:xobj.responseText};
callback(transformResponseData(params,data))
}var UNPARSEABLE_CRUFT="throw 1; < don't be evil' >";
function processResponse(url,callback,params,xobj){if(hadError(xobj,callback)){return 
}var txt=xobj.responseText;
txt=txt.substr(UNPARSEABLE_CRUFT.length);
var data=eval("("+txt+")");
data=data[url];
if(data.oauthState){oauthState=data.oauthState
}if(data.st){shindig.auth.updateSecurityToken(data.st)
}callback(transformResponseData(params,data))
}function transformResponseData(params,data){var resp={text:data.body,rc:data.rc||200,headers:data.headers,oauthApprovalUrl:data.oauthApprovalUrl,oauthError:data.oauthError,oauthErrorText:data.oauthErrorText,errors:[]};
if(resp.rc<200||resp.rc>206){resp.errors=[resp.rc+" Error"]
}else{if(resp.text){switch(params.CONTENT_TYPE){case"JSON":case"FEED":resp.data=gadgets.json.parse(resp.text);
if(!resp.data){resp.errors.push("500 Failed to parse JSON");
resp.rc=500;
resp.data=null
}break;
case"DOM":var dom;
if(window.ActiveXObject){dom=new ActiveXObject("Microsoft.XMLDOM");
dom.async=false;
dom.validateOnParse=false;
dom.resolveExternals=false;
if(!dom.loadXML(resp.text)){resp.errors.push("500 Failed to parse XML");
resp.rc=500
}else{resp.data=dom
}}else{var parser=new DOMParser();
dom=parser.parseFromString(resp.text,"text/xml");
if("parsererror"===dom.documentElement.nodeName){resp.errors.push("500 Failed to parse XML");
resp.rc=500
}else{resp.data=dom
}}break;
default:resp.data=resp.text;
break
}}}return resp
}function makeXhrRequest(realUrl,proxyUrl,callback,paramData,method,params,processResponseFunction,opt_contentType){var xhr=makeXhr();
if(proxyUrl.indexOf("//")==0){proxyUrl=document.location.protocol+proxyUrl
}xhr.open(method,proxyUrl,true);
if(callback){xhr.onreadystatechange=gadgets.util.makeClosure(null,processResponseFunction,realUrl,callback,params,xhr)
}if(paramData!==null){xhr.setRequestHeader("Content-Type",opt_contentType||"application/x-www-form-urlencoded");
xhr.send(paramData)
}else{xhr.send(null)
}}function respondWithPreload(postData,params,callback){if(gadgets.io.preloaded_&&postData.httpMethod==="GET"){for(var i=0;
i<gadgets.io.preloaded_.length;
i++){var preload=gadgets.io.preloaded_[i];
if(preload&&(preload.id===postData.url)){delete gadgets.io.preloaded_[i];
if(preload.rc!==200){callback({rc:preload.rc,errors:[preload.rc+" Error"]})
}else{if(preload.oauthState){oauthState=preload.oauthState
}var resp={body:preload.body,rc:preload.rc,headers:preload.headers,oauthApprovalUrl:preload.oauthApprovalUrl,oauthError:preload.oauthError,oauthErrorText:preload.oauthErrorText,errors:[]};
callback(transformResponseData(params,resp))
}return true
}}}return false
}function init(configuration){config=configuration["core.io"]||{}
}var requiredConfig={proxyUrl:new gadgets.config.RegExValidator(/.*%(raw)?url%.*/),jsonProxyUrl:gadgets.config.NonEmptyStringValidator};
gadgets.config.register("core.io",requiredConfig,init);
return{makeRequest:function(url,callback,opt_params){var params=opt_params||{};
var httpMethod=params.METHOD||"GET";
var refreshInterval=params.REFRESH_INTERVAL;
var auth,st;
if(params.AUTHORIZATION&&params.AUTHORIZATION!=="NONE"){auth=params.AUTHORIZATION.toLowerCase();
st=shindig.auth.getSecurityToken()
}else{if(httpMethod==="GET"&&refreshInterval===undefined){refreshInterval=3600
}}var signOwner=true;
if(typeof params.OWNER_SIGNED!=="undefined"){signOwner=params.OWNER_SIGNED
}var signViewer=true;
if(typeof params.VIEWER_SIGNED!=="undefined"){signViewer=params.VIEWER_SIGNED
}var headers=params.HEADERS||{};
if(httpMethod==="POST"&&!headers["Content-Type"]){headers["Content-Type"]="application/x-www-form-urlencoded"
}var urlParams=gadgets.util.getUrlParameters();
var paramData={url:url,httpMethod:httpMethod,headers:gadgets.io.encodeValues(headers,false),postData:params.POST_DATA||"",authz:auth||"",st:st||"",contentType:params.CONTENT_TYPE||"TEXT",numEntries:params.NUM_ENTRIES||"3",getSummaries:!!params.GET_SUMMARIES,signOwner:signOwner,signViewer:signViewer,gadget:urlParams.url,container:urlParams.container||urlParams.synd||"default",bypassSpecCache:gadgets.util.getUrlParameters().nocache||""};
if(auth==="oauth"||auth==="signed"){if(gadgets.io.oauthReceivedCallbackUrl_){paramData.OAUTH_RECEIVED_CALLBACK=gadgets.io.oauthReceivedCallbackUrl_;
gadgets.io.oauthReceivedCallbackUrl_=null
}paramData.oauthState=oauthState||"";
for(opt in params){if(params.hasOwnProperty(opt)){if(opt.indexOf("OAUTH_")===0){paramData[opt]=params[opt]
}}}}var proxyUrl=config.jsonProxyUrl.replace("%host%",document.location.host);
if(!respondWithPreload(paramData,params,callback,processResponse)){if(httpMethod==="GET"&&refreshInterval>0){var extraparams="?refresh="+refreshInterval+"&"+gadgets.io.encodeValues(paramData);
makeXhrRequest(url,proxyUrl+extraparams,callback,null,"GET",params,processResponse)
}else{makeXhrRequest(url,proxyUrl,callback,gadgets.io.encodeValues(paramData),"POST",params,processResponse)
}}},makeNonProxiedRequest:function(relativeUrl,callback,opt_params,opt_contentType){var params=opt_params||{};
makeXhrRequest(relativeUrl,relativeUrl,callback,params.POST_DATA,params.METHOD,params,processNonProxiedResponse,opt_contentType)
},clearOAuthState:function(){oauthState=undefined
},encodeValues:function(fields,opt_noEscaping){var escape=!opt_noEscaping;
var buf=[];
var first=false;
for(var i in fields){if(fields.hasOwnProperty(i)){if(!first){first=true
}else{buf.push("&")
}buf.push(escape?encodeURIComponent(i):i);
buf.push("=");
buf.push(escape?encodeURIComponent(fields[i]):fields[i])
}}return buf.join("")
},getProxyUrl:function(url,opt_params){var params=opt_params||{};
var refresh=params.REFRESH_INTERVAL;
if(refresh===undefined){refresh="3600"
}var urlParams=gadgets.util.getUrlParameters();
var rewriteMimeParam=params.rewriteMime?"&rewriteMime="+encodeURIComponent(params.rewriteMime):"";
return config.proxyUrl.replace("%url%",encodeURIComponent(url)).replace("%host%",document.location.host).replace("%rawurl%",url).replace("%refresh%",encodeURIComponent(refresh)).replace("%gadget%",encodeURIComponent(urlParams.url)).replace("%container%",encodeURIComponent(urlParams.container||urlParams.synd)).replace("%rewriteMime%",rewriteMimeParam)
}}
}();
gadgets.io.RequestParameters=gadgets.util.makeEnum(["METHOD","CONTENT_TYPE","POST_DATA","HEADERS","AUTHORIZATION","NUM_ENTRIES","GET_SUMMARIES","REFRESH_INTERVAL","OAUTH_SERVICE_NAME","OAUTH_USE_TOKEN","OAUTH_TOKEN_NAME","OAUTH_REQUEST_TOKEN","OAUTH_REQUEST_TOKEN_SECRET","OAUTH_RECEIVED_CALLBACK"]);
gadgets.io.MethodType=gadgets.util.makeEnum(["GET","POST","PUT","DELETE","HEAD"]);
gadgets.io.ContentType=gadgets.util.makeEnum(["TEXT","DOM","JSON","FEED"]);
gadgets.io.AuthorizationType=gadgets.util.makeEnum(["NONE","SIGNED","OAUTH"]);;
var tamings___=tamings___||[];
tamings___.push(function(A){caja___.whitelistFuncs([[gadgets.io,"encodeValues"],[gadgets.io,"getProxyUrl"],[gadgets.io,"makeRequest"]])
});;
var FieldTranslations={};
FieldTranslations.translateServerPersonToJsPerson=function(H,B){if(H.emails){for(var E=0;
E<H.emails.length;
E++){H.emails[E].address=H.emails[E].value
}}if(H.phoneNumbers){for(var A=0;
A<H.phoneNumbers.length;
A++){H.phoneNumbers[A].number=H.phoneNumbers[A].value
}}if(H.birthday){H.dateOfBirth=H.birthday
}if(H.utcOffset){H.timeZone=H.utcOffset
}if(H.addresses){for(var D=0;
D<H.addresses.length;
D++){H.addresses[D].unstructuredAddress=H.addresses[D].formatted
}}if(H.gender){var F=H.gender=="male"?"MALE":(H.gender=="female")?"FEMALE":null;
H.gender={key:F,displayValue:H.gender}
}FieldTranslations.translateUrlJson(H.profileSong);
FieldTranslations.translateUrlJson(H.profileVideo);
if(H.urls){for(var G=0;
G<H.urls.length;
G++){FieldTranslations.translateUrlJson(H.urls[G])
}}FieldTranslations.translateEnumJson(H.drinker);
FieldTranslations.translateEnumJson(H.lookingFor);
FieldTranslations.translateEnumJson(H.networkPresence);
FieldTranslations.translateEnumJson(H.smoker);
if(H.organizations){H.jobs=[];
H.schools=[];
for(var C=0;
C<H.organizations.length;
C++){var I=H.organizations[C];
if(I.type=="job"){H.jobs.push(I)
}else{if(I.type=="school"){H.schools.push(I)
}}}}if(H.name){H.name.unstructured=H.name.formatted
}if(H.appData){H.appData=opensocial.Container.escape(H.appData,B,true)
}};
FieldTranslations.translateEnumJson=function(A){if(A){A.key=A.value
}};
FieldTranslations.translateUrlJson=function(A){if(A){A.address=A.value
}};
FieldTranslations.translateJsPersonFieldsToServerFields=function(A){for(var B=0;
B<A.length;
B++){if(A[B]=="dateOfBirth"){A[B]="birthday"
}else{if(A[B]=="timeZone"){A[B]="utcOffset"
}else{if(A[B]=="jobs"){A[B]="organizations"
}else{if(A[B]=="schools"){A[B]="organizations"
}}}}}A.push("id");
A.push("displayName")
};
FieldTranslations.translateIsoStringToDate=function(A){var C="([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
var E=A.match(new RegExp(C));
var D=0;
var B=new Date(E[1],0,1);
if(E[3]){B.setMonth(E[3]-1)
}if(E[5]){B.setDate(E[5])
}if(E[7]){B.setHours(E[7])
}if(E[8]){B.setMinutes(E[8])
}if(E[10]){B.setSeconds(E[10])
}if(E[12]){B.setMilliseconds(Number("0."+E[12])*1000)
}if(E[14]){D=(Number(E[16])*60)+Number(E[17]);
D*=((E[15]=="-")?1:-1)
}D-=B.getTimezoneOffset();
time=(Number(B)+(D*60*1000));
return new Date(Number(time))
};
FieldTranslations.addAppDataAsProfileFields=function(D){if(D){if(D.appData){var A=D.appData;
if(typeof A==="string"){A=[A]
}var C=D.profileDetail||[];
for(var B=0;
B<A.length;
B++){if(A[B]==="*"){C.push("appData")
}else{C.push("appData."+A[B])
}}D.appData=A
}}};
FieldTranslations.translateStandardArguments=function(B,A){if(B.first){A.startIndex=B.first
}if(B.max){A.count=B.max
}if(B.sortOrder){A.sortBy=B.sortOrder
}if(B.filter){A.filterBy=B.filter
}if(B.filterOp){A.filterOp=B.filterOp
}if(B.filterValue){A.filterValue=B.filterValue
}if(B.fields){A.fields=B.fields
}};
FieldTranslations.translateNetworkDistance=function(A,B){if(A.getField("networkDistance")){B.networkDistance=A.getField("networkDistance")
}};;
var JsonActivity=function(A,B){A=A||{};
if(!B){JsonActivity.constructArrayObject(A,"mediaItems",JsonMediaItem)
}opensocial.Activity.call(this,A)
};
JsonActivity.inherits(opensocial.Activity);
JsonActivity.prototype.toJsonObject=function(){var C=JsonActivity.copyFields(this.fields_);
var D=C.mediaItems||[];
var A=[];
for(var B=0;
B<D.length;
B++){A[B]=D[B].toJsonObject()
}C.mediaItems=A;
return C
};
var JsonMediaItem=function(A){opensocial.MediaItem.call(this,A.mimeType,A.url,A)
};
JsonMediaItem.inherits(opensocial.MediaItem);
JsonMediaItem.prototype.toJsonObject=function(){return JsonActivity.copyFields(this.fields_)
};
JsonActivity.constructArrayObject=function(D,E,B){var C=D[E];
if(C){for(var A=0;
A<C.length;
A++){C[A]=new B(C[A])
}}};
JsonActivity.copyFields=function(A){var B={};
for(var C in A){B[C]=A[C]
}return B
};;
var JsonPerson=function(A){A=A||{};
JsonPerson.constructObject(A,"bodyType",opensocial.BodyType);
JsonPerson.constructObject(A,"currentLocation",opensocial.Address);
JsonPerson.constructObject(A,"name",opensocial.Name);
JsonPerson.constructObject(A,"profileSong",opensocial.Url);
JsonPerson.constructObject(A,"profileVideo",opensocial.Url);
JsonPerson.constructDate(A,"dateOfBirth");
JsonPerson.constructArrayObject(A,"addresses",opensocial.Address);
JsonPerson.constructArrayObject(A,"emails",opensocial.Email);
JsonPerson.constructArrayObject(A,"jobs",opensocial.Organization);
JsonPerson.constructArrayObject(A,"phoneNumbers",opensocial.Phone);
JsonPerson.constructArrayObject(A,"schools",opensocial.Organization);
JsonPerson.constructArrayObject(A,"urls",opensocial.Url);
JsonPerson.constructEnum(A,"gender");
JsonPerson.constructEnum(A,"smoker");
JsonPerson.constructEnum(A,"drinker");
JsonPerson.constructEnum(A,"networkPresence");
JsonPerson.constructEnumArray(A,"lookingFor");
opensocial.Person.call(this,A,A.isOwner,A.isViewer)
};
JsonPerson.inherits(opensocial.Person);
JsonPerson.constructEnum=function(B,C){var A=B[C];
if(A){B[C]=new opensocial.Enum(A.key,A.displayValue)
}};
JsonPerson.constructEnumArray=function(C,D){var B=C[D];
if(B){for(var A=0;
A<B.length;
A++){B[A]=new opensocial.Enum(B[A].key,B[A].displayValue)
}}};
JsonPerson.constructObject=function(C,D,A){var B=C[D];
if(B){C[D]=new A(B)
}};
JsonPerson.constructDate=function(B,C){var A=B[C];
if(A){B[C]=FieldTranslations.translateIsoStringToDate(A)
}};
JsonPerson.constructArrayObject=function(D,E,B){var C=D[E];
if(C){for(var A=0;
A<C.length;
A++){C[A]=new B(C[A])
}}};
JsonPerson.prototype.getDisplayName=function(){return this.getField("displayName")
};
JsonPerson.prototype.getAppData=function(B){var A=this.getField("appData");
return A&&A[B]
};;
var JsonMessageCollection=function(A){A=A||{};
opensocial.MessageCollection.call(this,A)
};
JsonMessageCollection.inherits(opensocial.MessageCollection);
JsonMessageCollection.prototype.toJsonObject=function(){return JsonMessageCollection.copyFields(this.fields_)
};
JsonMessageCollection.copyFields=function(A){var B={};
for(var C in A){B[C]=A[C]
}return B
};;
var JsonMessage=function(A,B){B=B||{};
opensocial.Message.call(this,A,B)
};
JsonMessage.inherits(opensocial.Message);
JsonMessage.prototype.toJsonObject=function(){return JsonMessage.copyFields(this.fields_)
};
JsonMessage.copyFields=function(A){var B={};
for(var C in A){B[C]=A[C]
}return B
};;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

var gadgets = gadgets || {};
gadgets.rpctx = gadgets.rpctx || {};

/**
 * Transport for browsers that support native messaging (various implementations
 * of the HTML5 postMessage method). Officially defined at
 * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html.
 *
 * postMessage is a native implementation of XDC. A page registers that
 * it would like to receive messages by listening the the "message" event
 * on the window (document in DPM) object. In turn, another page can
 * raise that event by calling window.postMessage (document.postMessage
 * in DPM) with a string representing the message and a string
 * indicating on which domain the receiving page must be to receive
 * the message. The target page will then have its "message" event raised
 * if the domain matches and can, in turn, check the origin of the message
 * and process the data contained within.
 *
 *   wpm: postMessage on the window object.
 *      - Internet Explorer 8+
 *      - Safari 4+
 *      - Chrome 2+
 *      - Webkit nightlies
 *      - Firefox 3+
 *      - Opera 9+
 */
gadgets.rpctx.wpm = function() {
  var ready;

  return {
    getCode: function() {
      return 'wpm';
    },

    isParentVerifiable: function() {
      return true;
    },

    init: function(processFn, readyFn) {
      ready = readyFn;
      var onmessage = function(packet) {
        // TODO validate packet.domain for security reasons
        processFn(gadgets.json.parse(packet.data));
      };
 
      // Set up native postMessage handler.
      if (typeof window.addEventListener != 'undefined') { 
          window.addEventListener('message', onmessage, false); 
      } else if (typeof window.attachEvent != 'undefined') { 
          window.attachEvent('onmessage', onmessage); 
      }
      ready('..', true);  // Immediately ready to send to parent.
      return true;
    },

    setup: function(receiverId, token) {
      // If we're a gadget, send an ACK message to indicate to container
      // that we're ready to receive messages.
      if (receiverId === '..') {
        gadgets.rpc.call(receiverId, gadgets.rpc.ACK);
      }
      return true;
    },

    call: function(targetId, from, rpc) {
      var targetWin = targetId === '..' ? window.parent : window.frames[targetId];
      // targetOrigin = canonicalized relay URL
      var origin = gadgets.rpc.getOrigin(gadgets.rpc.getRelayUrl(targetId));
      if (origin) {
        targetWin.postMessage(gadgets.json.stringify(rpc), origin);
      } else {
        gadgets.error("No relay set (used as window.postMessage targetOrigin)" +
            ", cannot send cross-domain message");
      }
      return true;
    }
  };
}();
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

var gadgets = gadgets || {};
gadgets.rpctx = gadgets.rpctx || {};

/*
 * For Gecko-based browsers, the security model allows a child to call a
 * function on the frameElement of the iframe, even if the child is in
 * a different domain. This method is dubbed "frameElement" (fe).
 *
 * The ability to add and call such functions on the frameElement allows
 * a bidirectional channel to be setup via the adding of simple function
 * references on the frameElement object itself. In this implementation,
 * when the container sets up the authentication information for that gadget
 * (by calling setAuth(...)) it as well adds a special function on the
 * gadget's iframe. This function can then be used by the gadget to send
 * messages to the container. In turn, when the gadget tries to send a
 * message, it checks to see if this function has its own function stored
 * that can be used by the container to call the gadget. If not, the
 * function is created and subsequently used by the container.
 * Note that as a result, FE can only be used by a container to call a
 * particular gadget *after* that gadget has called the container at
 * least once via FE.
 *
 *   fe: Gecko-specific frameElement trick.
 *      - Firefox 1+
 */
gadgets.rpctx.frameElement = function() {
  // Consts for FrameElement.
  var FE_G2C_CHANNEL = '__g2c_rpc';
  var FE_C2G_CHANNEL = '__c2g_rpc';
  var process;
  var ready;

  function callFrameElement(targetId, from, rpc) {
    try {
      if (from !== '..') {
        // Call from gadget to the container.
        var fe = window.frameElement;

        if (typeof fe[FE_G2C_CHANNEL] === 'function') {
          // Complete the setup of the FE channel if need be.
          if (typeof fe[FE_G2C_CHANNEL][FE_C2G_CHANNEL] !== 'function') {
            fe[FE_G2C_CHANNEL][FE_C2G_CHANNEL] = function(args) {
              process(gadgets.json.parse(args));
            };
          }

          // Conduct the RPC call.
          fe[FE_G2C_CHANNEL](gadgets.json.stringify(rpc));
          return;
        }
      } else {
        // Call from container to gadget[targetId].
        var frame = document.getElementById(targetId);

        if (typeof frame[FE_G2C_CHANNEL] === 'function' &&
            typeof frame[FE_G2C_CHANNEL][FE_C2G_CHANNEL] === 'function') {

          // Conduct the RPC call.
          frame[FE_G2C_CHANNEL][FE_C2G_CHANNEL](gadgets.json.stringify(rpc));
          return;
        }
      }
    } catch (e) {
    }
    return true;
  }

  return {
    getCode: function() {
      return 'fe';
    },

    isParentVerifiable: function() {
      return false;
    },
  
    init: function(processFn, readyFn) {
      // No global setup.
      process = processFn;
      ready = readyFn;
      return true;
    },

    setup: function(receiverId, token) {
      // Indicate OK to call to container. This will be true
      // by the end of this method.
      if (receiverId !== '..') {
        try {
          var frame = document.getElementById(receiverId);
          frame[FE_G2C_CHANNEL] = function(args) {
            process(gadgets.json.parse(args));
          };
        } catch (e) {
          return false;
        }
      }
      if (receiverId === '..') {
        ready('..', true);
        var ackFn = function() {
          window.setTimeout(function() {
            gadgets.rpc.call(receiverId, gadgets.rpc.ACK)
          }, 500);
        }
        // Setup to container always happens before onload.
        // If it didn't, the correct fix would be in gadgets.util.
        gadgets.util.registerOnLoadHandler(ackFn);
      }
      return true;
    },

    call: function(targetId, from, rpc) {
      callFrameElement(targetId, from, rpc);
    } 

  };
}();
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

var gadgets = gadgets || {};
gadgets.rpctx = gadgets.rpctx || {};

/**
 * For Internet Explorer before version 8, the security model allows anyone
 * parent to set the value of the "opener" property on another window,
 * with only the receiving window able to read it.
 * This method is dubbed "Native IE XDC" (NIX).
 *
 * This method works by placing a handler object in the "opener" property
 * of a gadget when the container sets up the authentication information
 * for that gadget (by calling setAuthToken(...)). At that point, a NIX
 * wrapper is created and placed into the gadget by calling
 * theframe.contentWindow.opener = wrapper. Note that as a result, NIX can
 * only be used by a container to call a particular gadget *after* that
 * gadget has called the container at least once via NIX.
 *
 * The NIX wrappers in this RPC implementation are instances of a VBScript
 * class that is created when this implementation loads. The reason for
 * using a VBScript class stems from the fact that any object can be passed
 * into the opener property.
 * While this is a good thing, as it lets us pass functions and setup a true
 * bidirectional channel via callbacks, it opens a potential security hole
 * by which the other page can get ahold of the "window" or "document"
 * objects in the parent page and in turn wreak havok. This is due to the
 * fact that any JS object useful for establishing such a bidirectional
 * channel (such as a function) can be used to access a function
 * (eg. obj.toString, or a function itself) created in a specific context,
 * in particular the global context of the sender. Suppose container
 * domain C passes object obj to gadget on domain G. Then the gadget can
 * access C's global context using:
 * var parentWindow = (new obj.toString.constructor("return window;"))();
 * Nulling out all of obj's properties doesn't fix this, since IE helpfully
 * restores them to their original values if you do something like:
 * delete obj.toString; delete obj.toString;
 * Thus, we wrap the necessary functions and information inside a VBScript
 * object. VBScript objects in IE, like DOM objects, are in fact COM
 * wrappers when used in JavaScript, so we can safely pass them around
 * without worrying about a breach of context while at the same time
 * allowing them to act as a pass-through mechanism for information
 * and function calls. The implementation details of this VBScript wrapper
 * can be found in the setupChannel() method below.
 *
 *   nix: Internet Explorer-specific window.opener trick.
 *     - Internet Explorer 6
 *     - Internet Explorer 7
 */
gadgets.rpctx.nix = function() {
  // Consts for NIX. VBScript doesn't
  // allow items to start with _ for some reason,
  // so we need to make these names quite unique, as
  // they will go into the global namespace.
  var NIX_WRAPPER = 'GRPC____NIXVBS_wrapper';
  var NIX_GET_WRAPPER = 'GRPC____NIXVBS_get_wrapper';
  var NIX_HANDLE_MESSAGE = 'GRPC____NIXVBS_handle_message';
  var NIX_CREATE_CHANNEL = 'GRPC____NIXVBS_create_channel';
  var MAX_NIX_SEARCHES = 10;
  var NIX_SEARCH_PERIOD = 500;

  // JavaScript reference to the NIX VBScript wrappers.
  // Gadgets will have but a single channel under
  // nix_channels['..'] while containers will have a channel
  // per gadget stored under the gadget's ID.
  var nix_channels = {};

  // Store the ready signal method for use on handshake complete.
  var ready;
  var numHandlerSearches = 0;

  // Search for NIX handler to parent. Tries MAX_NIX_SEARCHES times every
  // NIX_SEARCH_PERIOD milliseconds.
  function conductHandlerSearch() {
    // Call from gadget to the container.
    var handler = nix_channels['..'];
    if (handler) {
      return;
    }

    if (++numHandlerSearches > MAX_NIX_SEARCHES) {
      // Handshake failed. Will fall back.
      gadgets.warn('Nix transport setup failed, falling back...');
      ready('..', false);
      return;
    }

    // If the gadget has yet to retrieve a reference to
    // the NIX handler, try to do so now. We don't do a
    // typeof(window.opener.GetAuthToken) check here
    // because it means accessing that field on the COM object, which,
    // being an internal function reference, is not allowed.
    // "in" works because it merely checks for the prescence of
    // the key, rather than actually accessing the object's property.
    // This is just a sanity check, not a validity check.
    if (!handler && window.opener && "GetAuthToken" in window.opener) {
      handler = window.opener;

      // Create the channel to the parent/container.
      // First verify that it knows our auth token to ensure it's not
      // an impostor.
      if (handler.GetAuthToken() == gadgets.rpc.getAuthToken('..')) {
        // Auth match - pass it back along with our wrapper to finish.
        // own wrapper and our authentication token for co-verification.
        var token = gadgets.rpc.getAuthToken('..');
        handler.CreateChannel(window[NIX_GET_WRAPPER]('..', token),
                              token);
        // Set channel handler
        nix_channels['..'] = handler;
        window.opener = null;

        // Signal success and readiness to send to parent.
        // Container-to-gadget bit flipped in CreateChannel.
        ready('..', true);
        return;
      }
    }

    // Try again.
    window.setTimeout(function() { conductHandlerSearch(); },
                      NIX_SEARCH_PERIOD);
  }

  return {
    getCode: function() {
      return 'nix';
    },

    isParentVerifiable: function() {
      return false;
    },

    init: function(processFn, readyFn) {
      ready = readyFn;

      // Ensure VBScript wrapper code is in the page and that the
      // global Javascript handlers have been set.
      // VBScript methods return a type of 'unknown' when
      // checked via the typeof operator in IE. Fortunately
      // for us, this only applies to COM objects, so we
      // won't see this for a real Javascript object.
      if (typeof window[NIX_GET_WRAPPER] !== 'unknown') {
        window[NIX_HANDLE_MESSAGE] = function(data) {
          window.setTimeout(
              function() { processFn(gadgets.json.parse(data)) }, 0);
        };

        window[NIX_CREATE_CHANNEL] = function(name, channel, token) {
          // Verify the authentication token of the gadget trying
          // to create a channel for us.
          if (gadgets.rpc.getAuthToken(name) === token) {
            nix_channels[name] = channel;
            ready(name, true);
          }
        };

        // Inject the VBScript code needed.
        var vbscript =
          // We create a class to act as a wrapper for
          // a Javascript call, to prevent a break in of
          // the context.
          'Class ' + NIX_WRAPPER + '\n '

          // An internal member for keeping track of the
          // name of the document (container or gadget)
          // for which this wrapper is intended. For
          // those wrappers created by gadgets, this is not
          // used (although it is set to "..")
          + 'Private m_Intended\n'

          // Stores the auth token used to communicate with
          // the gadget. The GetChannelCreator method returns
          // an object that returns this auth token. Upon matching
          // that with its own, the gadget uses the object
          // to actually establish the communication channel.
          + 'Private m_Auth\n'

          // Method for internally setting the value
          // of the m_Intended property.
          + 'Public Sub SetIntendedName(name)\n '
          + 'If isEmpty(m_Intended) Then\n'
          + 'm_Intended = name\n'
          + 'End If\n'
          + 'End Sub\n'

          // Method for internally setting the value of the m_Auth property.
          + 'Public Sub SetAuth(auth)\n '
          + 'If isEmpty(m_Auth) Then\n'
          + 'm_Auth = auth\n'
          + 'End If\n'
          + 'End Sub\n'

          // A wrapper method which actually causes a
          // message to be sent to the other context.
          + 'Public Sub SendMessage(data)\n '
          + NIX_HANDLE_MESSAGE + '(data)\n'
          + 'End Sub\n'

          // Returns the auth token to the gadget, so it can
          // confirm a match before initiating the connection
          + 'Public Function GetAuthToken()\n '
          + 'GetAuthToken = m_Auth\n'
          + 'End Function\n'

          // Method for setting up the container->gadget
          // channel. Not strictly needed in the gadget's
          // wrapper, but no reason to get rid of it. Note here
          // that we pass the intended name to the NIX_CREATE_CHANNEL
          // method so that it can save the channel in the proper place
          // *and* verify the channel via the authentication token passed
          // here.
          + 'Public Sub CreateChannel(channel, auth)\n '
          + 'Call ' + NIX_CREATE_CHANNEL + '(m_Intended, channel, auth)\n'
          + 'End Sub\n'
          + 'End Class\n'

          // Function to get a reference to the wrapper.
          + 'Function ' + NIX_GET_WRAPPER + '(name, auth)\n'
          + 'Dim wrap\n'
          + 'Set wrap = New ' + NIX_WRAPPER + '\n'
          + 'wrap.SetIntendedName name\n'
          + 'wrap.SetAuth auth\n'
          + 'Set ' + NIX_GET_WRAPPER + ' = wrap\n'
          + 'End Function';

        try {
          window.execScript(vbscript, 'vbscript');
        } catch (e) {
          return false;
        }
      }
      return true;
    },

    setup: function(receiverId, token) {
      if (receiverId === '..') {
        conductHandlerSearch();
        return true;
      }
      try {
        var frame = document.getElementById(receiverId);
        var wrapper = window[NIX_GET_WRAPPER](receiverId, token);
        frame.contentWindow.opener = wrapper;
      } catch (e) {
        return false;
      }
      return true;
    },

    call: function(targetId, from, rpc) {
      try {
        // If we have a handler, call it.
        if (nix_channels[targetId]) {
          nix_channels[targetId].SendMessage(gadgets.json.stringify(rpc));
        }
      } catch (e) {
        return false;
      }
      return true;
    }
  };
}();
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

var gadgets = gadgets || {};
gadgets.rpctx = gadgets.rpctx || {};

/*
 * For older WebKit-based browsers, the security model does not allow for any
 * known "native" hacks for conducting cross browser communication. However,
 * a variation of the IFPC (see below) can be used, entitled "RMR". RMR is
 * a technique that uses the resize event of the iframe to indicate that a
 * message was sent (instead of the much slower/performance heavy polling
 * technique used when a defined relay page is not avaliable). Simply put,
 * RMR uses the same "pass the message by the URL hash" trick that IFPC
 * uses to send a message, but instead of having an active relay page that
 * runs a piece of code when it is loaded, RMR merely changes the URL
 * of the relay page (which does not even have to exist on the domain)
 * and then notifies the other party by resizing the relay iframe. RMR
 * exploits the fact that iframes in the dom of page A can be resized
 * by page A while the onresize event will be fired in the DOM of page B,
 * thus providing a single bit channel indicating "message sent to you".
 * This method has the added benefit that the relay need not be active,
 * nor even exist: a 404 suffices just as well.
 *
 *   rmr: WebKit-specific resizing trick.
 *      - Safari 2+
 *      - Chrome 1
 */
gadgets.rpctx.rmr = function() {
  // Consts for RMR, including time in ms RMR uses to poll for
  // its relay frame to be created, and the max # of polls it does.
  var RMR_SEARCH_TIMEOUT = 500;
  var RMR_MAX_POLLS = 10;

  // JavaScript references to the channel objects used by RMR.
  // Gadgets will have but a single channel under
  // rmr_channels['..'] while containers will have a channel
  // per gadget stored under the gadget's ID.
  var rmr_channels = {};
  
  var process;
  var ready;

  /**
   * Append an RMR relay frame to the document. This allows the receiver
   * to start receiving messages.
   *
   * @param {object} channelFrame Relay frame to add to the DOM body.
   * @param {string} relayUri Base URI for the frame.
   * @param {string} Data to pass along to the frame.
   * @param {string} opt_frameId ID of frame for which relay is being appended.
   */
  function appendRmrFrame(channelFrame, relayUri, data, opt_frameId) {
    var appendFn = function() {
      // Append the iframe.
      document.body.appendChild(channelFrame);

      // Set the src of the iframe to 'about:blank' first and then set it
      // to the relay URI. This prevents the iframe from maintaining a src
      // to the 'old' relay URI if the page is returned to from another.
      // In other words, this fixes the bfcache issue that causes the iframe's
      // src property to not be updated despite us assigning it a new value here.
      channelFrame.src = 'about:blank';
      if (opt_frameId) {
        // Process the initial sent payload (typically sent by container to
        // child/gadget) only when the relay frame has finished loading. We
        // do this to ensure that, in processRmrData(...), the ACK sent due
        // to processing can actually be sent. Before this time, the frame's
        // contentWindow is null, making it impossible to do so.
        channelFrame.onload = function() {
          processRmrData(opt_frameId);
        }
      }
      channelFrame.src = relayUri + '#' + data;
    }

    if (document.body) {
      appendFn();
    } else {
      // Common gadget case: attaching header during in-gadget handshake,
      // when we may still be in script in head. Attach onload.
      gadgets.util.registerOnLoadHandler(function() { appendFn(); });
    }
  }

  /**
   * Sets up the RMR transport frame for the given frameId. For gadgets
   * calling containers, the frameId should be '..'.
   *
   * @param {string} frameId The ID of the frame.
   */
  function setupRmr(frameId) {
    if (typeof rmr_channels[frameId] === "object") {
      // Sanity check. Already done.
      return;
    }

    var channelFrame = document.createElement('iframe');
    var frameStyle = channelFrame.style;
    frameStyle.position = 'absolute';
    frameStyle.top = '0px';
    frameStyle.border = '0';
    frameStyle.opacity = '0';

    // The width here is important as RMR
    // makes use of the resize handler for the frame.
    // Do not modify unless you test thoroughly!
    frameStyle.width = '10px'
    frameStyle.height = '1px';
    channelFrame.id = 'rmrtransport-' + frameId;
    channelFrame.name = channelFrame.id;

    // Determine the relay uri by taking the existing one,
    // removing the path and appending robots.txt. It is
    // not important if robots.txt actually exists, since RMR
    // browsers treat 404s as legitimate for the purposes of
    // this communication.
    var relayUri =
        gadgets.rpc.getOrigin(gadgets.rpc.getRelayUrl(frameId)) + '/robots.txt';

    rmr_channels[frameId] = {
      frame: channelFrame,
      receiveWindow: null,
      relayUri: relayUri,
      searchCounter : 0,
      width: 10,

      // Waiting means "waiting for acknowledgement to be received."
      // Acknowledgement always comes as a special ACK
      // message having been received. This message is received
      // during handshake in different ways by the container and
      // gadget, and by normal RMR message passing once the handshake
      // is complete.
      waiting: true,
      queue: [],

      // Number of non-ACK messages that have been sent to the recipient
      // and have been acknowledged.
      sendId: 0,

      // Number of messages received and processed from the sender.
      // This is the number that accompanies every ACK to tell the
      // sender to clear its queue.
      recvId: 0
    };

    if (frameId !== '..') {
      // Container always appends a relay to the gadget, before
      // the gadget appends its own relay back to container. The
      // gadget, in the meantime, refuses to attach the container
      // relay until it finds this one. Thus, the container knows
      // for certain that gadget to container communication is set
      // up by the time it finds its own relay. In addition to
      // establishing a reliable handshake protocol, this also
      // makes it possible for the gadget to send an initial batch
      // of messages to the container ASAP.
      appendRmrFrame(channelFrame, relayUri, getRmrData(frameId));
    }
     
    // Start searching for our own frame on the other page.
    conductRmrSearch(frameId);
  }

  /**
   * Searches for a relay frame, created by the sender referenced by
   * frameId, with which this context receives messages. Once
   * found with proper permissions, attaches a resize handler which
   * signals messages to be sent.
   *
   * @param {string} frameId Frame ID of the prospective sender.
   */
  function conductRmrSearch(frameId) {
    var channelWindow = null;

    // Increment the search counter.
    rmr_channels[frameId].searchCounter++;

    try {
      if (frameId === '..') {
        // We are a gadget.
        channelWindow = window.parent.frames['rmrtransport-' + gadgets.rpc.RPC_ID];
      } else {
        // We are a container.
        channelWindow = window.frames[frameId].frames['rmrtransport-..'];
      }
    } catch (e) {
      // Just in case; may happen when relay is set to about:blank or unset.
      // Catching exceptions here ensures that the timeout to continue the
      // search below continues to work.
    }

    var status = false;

    if (channelWindow) {
      // We have a valid reference to "our" RMR transport frame.
      // Register the proper event handlers.
      status = registerRmrChannel(frameId, channelWindow);
    }

    if (!status) {
      // Not found yet. Continue searching, but only if the counter
      // has not reached the threshold.
      if (rmr_channels[frameId].searchCounter > RMR_MAX_POLLS) {
        // If we reach this point, then RMR has failed and we
        // fall back to IFPC.
        return;
      }

      window.setTimeout(function() {
        conductRmrSearch(frameId);
      }, RMR_SEARCH_TIMEOUT);
    }
  }

  /**
   * Attempts to conduct an RPC call to the specified
   * target with the specified data via the RMR
   * method. If this method fails, the system attempts again
   * using the known default of IFPC.
   *
   * @param {String} targetId Module Id of the RPC service provider.
   * @param {String} serviceName Name of the service to call.
   * @param {String} from Module Id of the calling provider.
   * @param {Object} rpc The RPC data for this call.
   */
  function callRmr(targetId, serviceName, from, rpc) {
    var handler = null;

    if (from !== '..') {
      // Call from gadget to the container.
      handler = rmr_channels['..'];
    } else {
      // Call from container to the gadget.
      handler = rmr_channels[targetId];
    }

    if (handler) {
      // Queue the current message if not ACK.
      // ACK is always sent through getRmrData(...).
      if (serviceName !== gadgets.rpc.ACK) {
        handler.queue.push(rpc);
      }

      if (handler.waiting ||
          (handler.queue.length === 0 &&
           !(serviceName === gadgets.rpc.ACK && rpc && rpc.ackAlone === true))) {
        // If we are awaiting a response from any previously-sent messages,
        // or if we don't have anything new to send, just return.
        // Note that we don't short-return if we're ACKing just-received
        // messages.
        return true;
      }

      if (handler.queue.length > 0) {
        handler.waiting = true;
      }

      var url = handler.relayUri + "#" + getRmrData(targetId);

      try {
        // Update the URL with the message.
        handler.frame.contentWindow.location = url;

        // Resize the frame.
        var newWidth = handler.width == 10 ? 20 : 10;
        handler.frame.style.width = newWidth + 'px';
        handler.width = newWidth;

        // Done!
      } catch (e) {
        // Something about location-setting or resizing failed.
        // This should never happen, but if it does, fall back to
        // the default transport.
        return false;
      }
    }

    return true;
  }

  /**
   * Returns as a string the data to be appended to an RMR relay frame,
   * constructed from the current request queue plus an ACK message indicating
   * the currently latest-processed message ID.
   *
   * @param {string} toFrameId Frame whose sendable queued data to retrieve.
   */
  function getRmrData(toFrameId) {
    var channel = rmr_channels[toFrameId];
    var rmrData = {id: channel.sendId};
    if (channel) {
      rmrData.d = Array.prototype.slice.call(channel.queue, 0);
      rmrData.d.push({s:gadgets.rpc.ACK, id:channel.recvId});
    }
    return gadgets.json.stringify(rmrData);
  }

  /**
   * Retrieve data from the channel keyed by the given frameId,
   * processing it as a batch. All processed data is assumed to have been
   * generated by getRmrData(...), pairing that method with this.
   *
   * @param {string} fromFrameId Frame from which data is being retrieved.
   */
  function processRmrData(fromFrameId) {
    var channel = rmr_channels[fromFrameId];
    var data = channel.receiveWindow.location.hash.substring(1);

    // Decode the RPC object array.
    var rpcObj = gadgets.json.parse(decodeURIComponent(data)) || {};
    var rpcArray = rpcObj.d || [];

    var nonAckReceived = false;
    var noLongerWaiting = false;

    var numBypassed = 0;
    var numToBypass = (channel.recvId - rpcObj.id);
    for (var i = 0; i < rpcArray.length; ++i) {
      var rpc = rpcArray[i];

      // If we receive an ACK message, then mark the current
      // handler as no longer waiting and send out the next
      // queued message.
      if (rpc.s === gadgets.rpc.ACK) {
        // ACK received - whether this came from a handshake or
        // an active call, in either case it indicates readiness to
        // send messages to the from frame.
        ready(fromFrameId, true);

        if (channel.waiting) {
          noLongerWaiting = true;
        }

        channel.waiting = false;
        var newlyAcked = Math.max(0, rpc.id - channel.sendId);
        channel.queue.splice(0, newlyAcked);
        channel.sendId = Math.max(channel.sendId, rpc.id || 0);
        continue;
      }

      // If we get here, we've received > 0 non-ACK messages to
      // process. Indicate this bit for later.
      nonAckReceived = true;

      // Bypass any messages already received.
      if (++numBypassed <= numToBypass) {
        continue;
      }

      ++channel.recvId;
      process(rpc);  // actually dispatch the message
    }

    // Send an ACK indicating that we got/processed the message(s).
    // Do so if we've received a message to process or if we were waiting
    // before but a received ACK has cleared our waiting bit, and we have
    // more messages to send. Performing this operation causes additional
    // messages to be sent.
    if (nonAckReceived ||
        (noLongerWaiting && channel.queue.length > 0)) {
      var from = (fromFrameId === '..') ? gadgets.rpc.RPC_ID : '..';
      callRmr(fromFrameId, gadgets.rpc.ACK, from, {ackAlone: nonAckReceived});
    }
  }

  /**
   * Registers the RMR channel handler for the given frameId and associated
   * channel window.
   *
   * @param {string} frameId The ID of the frame for which this channel is being
   *   registered.
   * @param {Object} channelWindow The window of the receive frame for this
   *   channel, if any.
   *
   * @return {boolean} True if the frame was setup successfully, false
   *   otherwise.
   */
  function registerRmrChannel(frameId, channelWindow) {
    var channel = rmr_channels[frameId];

    // Verify that the channel is ready for receiving.
    try {
      var canAccess = false;

      // Check to see if the document is in the window. For Chrome, this
      // will return 'false' if the channelWindow is inaccessible by this
      // piece of JavaScript code, meaning that the URL of the channelWindow's
      // parent iframe has not yet changed from 'about:blank'. We do this
      // check this way because any true *access* on the channelWindow object
      // will raise a security exception, which, despite the try-catch, still
      // gets reported to the debugger (it does not break execution, the try
      // handles that problem, but it is still reported, which is bad form).
      // This check always succeeds in Safari 3.1 regardless of the state of
      // the window.
      canAccess = 'document' in channelWindow;

      if (!canAccess) {
        return false;
      }

      // Check to see if the document is an object. For Safari 3.1, this will
      // return undefined if the page is still inaccessible. Unfortunately, this
      // *will* raise a security issue in the debugger.
      // TODO Find a way around this problem.
      canAccess = typeof channelWindow['document'] == 'object';

      if (!canAccess) {
        return false;
      }

      // Once we get here, we know we can access the document (and anything else)
      // on the window object. Therefore, we check to see if the location is
      // still about:blank (this takes care of the Safari 3.2 case).
      var loc = channelWindow.location.href;

      // Check if this is about:blank for Safari.
      if (loc === 'about:blank') {
        return false;
      }
    } catch (ex) {
      // For some reason, the iframe still points to about:blank. We try
      // again in a bit.
      return false;
    }

    // Save a reference to the receive window.
    channel.receiveWindow = channelWindow;

    // Register the onresize handler.
    function onresize() {
      processRmrData(frameId);
    };

    if (typeof channelWindow.attachEvent === "undefined") {
      channelWindow.onresize = onresize;
    } else {
      channelWindow.attachEvent("onresize", onresize);
    }

    if (frameId === '..') {
      // Gadget to container. Signal to the container that the gadget
      // is ready to receive messages by attaching the g -> c relay.
      // As a nice optimization, pass along any gadget to container
      // queued messages that have backed up since then. ACK is enqueued in
      // getRmrData to ensure that the container's waiting flag is set to false
      // (this happens in the below code run on the container side).
      appendRmrFrame(channel.frame, channel.relayUri, getRmrData(frameId), frameId);
    } else {
      // Process messages that the gadget sent in its initial relay payload.
      // We can do this immediately because the container has already appended
      // and loaded a relay frame that can be used to ACK the messages the gadget
      // sent. In the preceding if-block, however, the processRmrData(...) call
      // must wait. That's because appendRmrFrame may not actually append the
      // frame - in the context of a gadget, this code may be running in the
      // head element, so it cannot be appended to body. As a result, the
      // gadget cannot ACK the container for messages it received.
      processRmrData(frameId);
    }

    return true;
  }

  return {
    getCode: function() {
      return 'rmr';
    },

    isParentVerifiable: function() {
      return true;
    },

    init: function(processFn, readyFn) {
      // No global setup.
      process = processFn;
      ready = readyFn;
      return true;
    },

    setup: function(receiverId, token) {
      try {
        setupRmr(receiverId);
      } catch (e) {
        gadgets.warn('Caught exception setting up RMR: ' + e);
        return false;
      }
      return true;
    },

    call: function(targetId, from, rpc) {
      return callRmr(targetId, rpc.s, from, rpc);
    }
  };
}();
;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

var gadgets = gadgets || {};
gadgets.rpctx = gadgets.rpctx || {};

/*
 * For all others, we have a fallback mechanism known as "ifpc". IFPC
 * exploits the fact that while same-origin policy prohibits a frame from
 * accessing members on a window not in the same domain, that frame can,
 * however, navigate the window heirarchy (via parent). This is exploited by
 * having a page on domain A that wants to talk to domain B create an iframe
 * on domain B pointing to a special relay file and with a message encoded
 * after the hash (#). This relay, in turn, finds the page on domain B, and
 * can call a receipt function with the message given to it. The relay URL
 * used by each caller is set via the gadgets.rpc.setRelayUrl(..) and
 * *must* be called before the call method is used.
 *
 *   ifpc: Iframe-based method, utilizing a relay page, to send a message.
 *      - No known major browsers still use this method, but it remains
 *        useful as a catch-all fallback for the time being.
 */
gadgets.rpctx.ifpc = function() {
  var iframePool = [];
  var callId = 0;
  var ready;

  /**
   * Encodes arguments for the legacy IFPC wire format.
   *
   * @param {Object} args
   * @return {String} the encoded args
   */
  function encodeLegacyData(args) {
    var argsEscaped = [];
    for(var i = 0, j = args.length; i < j; ++i) {
      argsEscaped.push(encodeURIComponent(gadgets.json.stringify(args[i])));
    }
    return argsEscaped.join('&');
  }

  /**
   * Helper function to emit an invisible IFrame.
   * @param {String} src SRC attribute of the IFrame to emit.
   * @private
   */
  function emitInvisibleIframe(src) {
    var iframe;
    // Recycle IFrames
    for (var i = iframePool.length - 1; i >=0; --i) {
      var ifr = iframePool[i];
      try {
        if (ifr && (ifr.recyclable || ifr.readyState === 'complete')) {
          ifr.parentNode.removeChild(ifr);
          if (window.ActiveXObject) {
            // For MSIE, delete any iframes that are no longer being used. MSIE
            // cannot reuse the IFRAME because a navigational click sound will
            // be triggered when we set the SRC attribute.
            // Other browsers scan the pool for a free iframe to reuse.
            iframePool[i] = ifr = null;
            iframePool.splice(i, 1);
          } else {
            ifr.recyclable = false;
            iframe = ifr;
            break;
          }
        }
      } catch (e) {
        // Ignore; IE7 throws an exception when trying to read readyState and
        // readyState isn't set.
      }
    }
    // Create IFrame if necessary
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.style.border = iframe.style.width = iframe.style.height = '0px';
      iframe.style.visibility = 'hidden';
      iframe.style.position = 'absolute';
      iframe.onload = function() { this.recyclable = true; };
      iframePool.push(iframe);
    }
    iframe.src = src;
    window.setTimeout(function() { document.body.appendChild(iframe); }, 0);
  }

  return {
    getCode: function() {
      return 'ifpc';
    },

    isParentVerifiable: function() {
      return true;
    },

    init: function(processFn, readyFn) {
      // No global setup.
      ready = readyFn;
      ready('..', true);  // Ready immediately.
      return true;
    },

    setup: function(receiverId, token) {
      // Indicate readiness to send to receiver.
      ready(receiverId, true);
      return true;
    },

    call: function(targetId, from, rpc) {
      // Retrieve the relay file used by IFPC. Note that
      // this must be set before the call, and so we conduct
      // an extra check to ensure it is not blank.
      var relay = gadgets.rpc.getRelayUrl(targetId);
      ++callId;

      if (!relay) {
        gadgets.warn('No relay file assigned for IFPC');
        return;
      }

      // The RPC mechanism supports two formats for IFPC (legacy and current).
      var src = null;
      if (rpc.l) {
        // Use legacy protocol.
        // Format: #iframe_id&callId&num_packets&packet_num&block_of_data
        var callArgs = rpc.a;
        src = [relay, '#', encodeLegacyData([from, callId, 1, 0,
               encodeLegacyData([from, rpc.s, '', '', from].concat(
                 callArgs))])].join('');
      } else {
        // Format: #targetId & sourceId@callId & packetNum & packetId & packetData
        src = [relay, '#', targetId, '&', from, '@', callId,
               '&1&0&', encodeURIComponent(gadgets.json.stringify(rpc))].join('');
      }

      // Conduct the IFPC call by creating the Iframe with
      // the relay URL and appended message.
      emitInvisibleIframe(src);
      return true;
    }
  };
}();
;
var gadgets=gadgets||{};
gadgets.rpc=function(){var s="__cb";
var r="";
var g="__ack";
var q=500;
var i=10;
var b={};
var c={};
var w={};
var j={};
var m=0;
var H={};
var v={};
var d={};
var E={};
var k={};
var u={};
var l=(window.top!==window.self);
var n=window.name;
var F=(function(){function I(J){return function(){gadgets.log("gadgets.rpc."+J+"("+gadgets.json.stringify(Array.prototype.slice.call(arguments))+"): call ignored. [caller: "+document.location+", isChild: "+l+"]")
}
}return{getCode:function(){return"noop"
},isParentVerifiable:function(){return true
},init:I("init"),setup:I("setup"),call:I("call")}
})();
if(gadgets.util){E=gadgets.util.getUrlParameters()
}var z=(E["rpc_earlyq"]==="1");
function a(){return typeof window.postMessage==="function"?gadgets.rpctx.wpm:typeof window.postMessage==="object"?gadgets.rpctx.wpm:window.ActiveXObject?gadgets.rpctx.ifpc:navigator.userAgent.indexOf("WebKit")>0?gadgets.rpctx.rmr:navigator.product==="Gecko"?gadgets.rpctx.frameElement:gadgets.rpctx.ifpc
}function A(N,L){var J=B;
if(!L){J=F
}k[N]=J;
var I=u[N]||[];
for(var K=0;
K<I.length;
++K){var M=I[K];
M.t=x(N);
J.call(N,M.f,M)
}u[N]=[]
}function t(J){if(J&&typeof J.s==="string"&&typeof J.f==="string"&&J.a instanceof Array){if(j[J.f]){if(j[J.f]!==J.t){throw new Error("Invalid auth token. "+j[J.f]+" vs "+J.t)
}}if(J.s===g){window.setTimeout(function(){A(J.f,true)
},0);
return
}if(J.c){J.callback=function(K){gadgets.rpc.call(J.f,s,null,J.c,K)
}
}var I=(b[J.s]||b[r]).apply(J,J.a);
if(J.c&&typeof I!=="undefined"){gadgets.rpc.call(J.f,s,null,J.c,I)
}}}function D(K){if(!K){return""
}K=K.toLowerCase();
if(K.indexOf("//")==0){K=window.location.protocol+K
}if(K.indexOf("://")==-1){K=window.location.protocol+"//"+K
}var L=K.substring(K.indexOf("://")+3);
var I=L.indexOf("/");
if(I!=-1){L=L.substring(0,I)
}var N=K.substring(0,K.indexOf("://"));
var M="";
var O=L.indexOf(":");
if(O!=-1){var J=L.substring(O+1);
L=L.substring(0,O);
if((N==="http"&&J!=="80")||(N==="https"&&J!=="443")){M=":"+J
}}return N+"://"+L+M
}var B=a();
b[r]=function(){gadgets.warn("Unknown RPC service: "+this.s)
};
b[s]=function(J,I){var K=H[J];
if(K){delete H[J];
K(I)
}};
function o(K,I){if(v[K]===true){return
}if(typeof v[K]==="undefined"){v[K]=0
}var J=document.getElementById(K);
if(K===".."||J!=null){if(B.setup(K,I)===true){v[K]=true;
return
}}if(v[K]!==true&&v[K]++<i){window.setTimeout(function(){o(K,I)
},q)
}else{k[K]=F;
v[K]=true
}}function f(J,M){if(typeof d[J]==="undefined"){d[J]=false;
var L=gadgets.rpc.getRelayUrl(J);
if(D(L)!==D(window.location.href)){return false
}var K=null;
if(J===".."){K=window.parent
}else{K=window.frames[J]
}try{d[J]=K.gadgets.rpc.receiveSameDomain
}catch(I){gadgets.error("Same domain call failed: parent= incorrectly set.")
}}if(typeof d[J]==="function"){d[J](M);
return true
}return false
}function h(J,I,K){c[J]=I;
w[J]=!!K
}function x(I){return j[I]
}function e(I,J){J=J||"";
j[I]=String(J);
o(I,J)
}function p(I){function K(N){var P=N?N.rpc:{};
var M=P.parentRelayUrl;
if(M.substring(0,7)!=="http://"&&M.substring(0,8)!=="https://"&&M.substring(0,2)!=="//"){if(typeof E.parent==="string"&&E.parent!==""){if(M.substring(0,1)!=="/"){var L=E.parent.lastIndexOf("/");
M=E.parent.substring(0,L+1)+M
}else{M=D(E.parent)+M
}}}var O=!!P.useLegacyProtocol;
h("..",M,O);
if(O){B=gadgets.rpctx.ifpc;
B.init(t,A)
}e("..",I)
}var J={parentRelayUrl:gadgets.config.NonEmptyStringValidator};
gadgets.config.register("rpc",J,K)
}function y(K,I){var J=I||E.parent;
if(J){h("..",J);
e("..",K)
}}function C(I,M,O){if(!gadgets.util){return
}var L=document.getElementById(I);
if(!L){throw new Error("Cannot set up gadgets.rpc receiver with ID: "+I+", element not found.")
}var J=M||L.src;
h(I,J);
var N=gadgets.util.getUrlParameters(L.src);
var K=O||N.rpctoken;
e(I,K)
}function G(I,K,L){if(I===".."){var J=L||E.rpctoken||E.ifpctok||"";
if(gadgets.config){p(J)
}else{y(J,K)
}}else{C(I,K,L)
}}if(l){G("..")
}return{register:function(J,I){if(J===s||J===g){throw new Error("Cannot overwrite callback/ack service")
}if(J===r){throw new Error("Cannot overwrite default service:"+" use registerDefault")
}b[J]=I
},unregister:function(I){if(I===s||I===g){throw new Error("Cannot delete callback/ack service")
}if(I===r){throw new Error("Cannot delete default service:"+" use unregisterDefault")
}delete b[I]
},registerDefault:function(I){b[r]=I
},unregisterDefault:function(){delete b[r]
},forceParentVerifiable:function(){if(!B.isParentVerifiable()){B=gadgets.rpctx.ifpc
}},call:function(I,J,O,M){I=I||"..";
var N="..";
if(I===".."){N=n
}++m;
if(O){H[m]=O
}var L={s:J,f:N,c:O?m:0,a:Array.prototype.slice.call(arguments,3),t:j[I],l:w[I]};
if(f(I,L)){return
}var K=k[I]?k[I]:B;
if(!K){if(!u[I]){u[I]=[L]
}else{u[I].push(L)
}return
}if(w[I]){K=gadgets.rpctx.ifpc
}if(K.call(I,N,L)===false){k[I]=F;
B.call(I,N,L)
}},getRelayUrl:function(J){var I=c[J];
if(I&&I.indexOf("//")==0){I=document.location.protocol+I
}return I
},setRelayUrl:h,setAuthToken:e,setupReceiver:G,getAuthToken:x,getRelayChannel:function(){return B.getCode()
},receive:function(I){if(I.length>4){t(gadgets.json.parse(decodeURIComponent(I[I.length-1])))
}},receiveSameDomain:function(I){I.a=Array.prototype.slice.call(I.a);
window.setTimeout(function(){t(I)
},0)
},getOrigin:D,init:function(){if(B.init(t,A)===false){B=F
}},ACK:g,RPC_ID:n}
}();
gadgets.rpc.init();;
var JsonRpcContainer=function(C){opensocial.Container.call(this);
var H=C.path;
this.path_=H.replace("%host%",document.location.host);
var F=C.invalidatePath;
this.invalidatePath_=F.replace("%host%",document.location.host);
var G=C.supportedFields;
var E={};
for(var B in G){if(G.hasOwnProperty(B)){E[B]={};
for(var D=0;
D<G[B].length;
D++){var A=G[B][D];
E[B][A]=true
}}}this.environment_=new opensocial.Environment(C.domain,E);
this.securityToken_=shindig.auth.getSecurityToken();
gadgets.rpc.register("shindig.requestShareApp_callback",JsonRpcContainer.requestShareAppCallback_)
};
var JsonRpcRequestItem=function(B,A){this.rpc=B;
this.processData=A||function(C){return C
};
this.processResponse=function(C,F,E,D){var G=E?JsonRpcContainer.translateHttpError(E.code):null;
return new opensocial.ResponseItem(C,E?null:this.processData(F),G,D)
}
};
(function(){var A={};
JsonRpcContainer.inherits(opensocial.Container);
JsonRpcContainer.prototype.getEnvironment=function(){return this.environment_
};
JsonRpcContainer.prototype.requestShareApp=function(F,H,C,D){var E="cId_"+Math.random();
A[E]=C;
var B=gadgets.util.unescapeString(H.getField(opensocial.Message.Field.BODY));
if(!B||B.length===0){var G=gadgets.util.unescapeString(H.getField(opensocial.Message.Field.BODY_ID));
B=gadgets.Prefs.getMsg(G)
}gadgets.rpc.call("..","shindig.requestShareApp",null,E,F,B)
};
JsonRpcContainer.requestShareAppCallback_=function(F,G,C,E){callback=A[F];
if(callback){A[F]=null;
var D=null;
if(E){D={recipientIds:E}
}var B=new opensocial.ResponseItem(null,D,C);
callback(B)
}};
JsonRpcContainer.prototype.requestCreateActivity=function(E,C,B){B=B||function(){};
var D=opensocial.newDataRequest();
var F=opensocial.newIdSpec({userId:"VIEWER"});
D.add(this.newCreateActivityRequest(F,E),"key");
D.send(function(G){B(G.get("key"))
})
};
JsonRpcContainer.prototype.requestData=function(G,K){K=K||function(){};
var E=G.getRequestObjects();
var I=E.length;
if(I===0){window.setTimeout(function(){K(new opensocial.DataResponse({},true))
},0);
return 
}var L=new Array(I);
for(var F=0;
F<I;
F++){var J=E[F];
L[F]=J.request.rpc;
if(J.key){L[F].id=J.key
}}var C=function(X){if(X.errors[0]){JsonRpcContainer.generateErrorResponse(X,E,K);
return 
}X=X.data;
var N=false;
var W={};
for(var R=0;
R<X.length;
R++){X[X[R].id]=X[R]
}for(var O=0;
O<E.length;
O++){var Q=E[O];
var P=X[O];
if(Q.key&&P.id!==Q.key){throw"Request key("+Q.key+") and response id("+P.id+") do not match"
}var M=P.data;
var U=P.error;
var T="";
if(U){T=U.message
}var S=Q.request.processResponse(Q.request,M,U,T);
N=N||S.hadError();
if(Q.key){W[Q.key]=S
}}var V=new opensocial.DataResponse(W,N);
K(V)
};
var H={CONTENT_TYPE:"JSON",METHOD:"POST",AUTHORIZATION:"SIGNED",POST_DATA:gadgets.json.stringify(L)};
var B=[this.path_];
var D=shindig.auth.getSecurityToken();
if(D){B.push("?st=",encodeURIComponent(D))
}this.sendRequest(B.join(""),C,H,"application/json")
};
JsonRpcContainer.prototype.sendRequest=function(B,E,C,D){gadgets.io.makeNonProxiedRequest(B,E,C,D)
};
JsonRpcContainer.generateErrorResponse=function(B,E,G){var C=JsonRpcContainer.translateHttpError(B.rc||B.data.error)||opensocial.ResponseItem.Error.INTERNAL_ERROR;
var F={};
for(var D=0;
D<E.length;
D++){F[E[D].key]=new opensocial.ResponseItem(E[D].request,null,C)
}G(new opensocial.DataResponse(F,true))
};
JsonRpcContainer.translateHttpError=function(B){if(B==501){return opensocial.ResponseItem.Error.NOT_IMPLEMENTED
}else{if(B==401){return opensocial.ResponseItem.Error.UNAUTHORIZED
}else{if(B==403){return opensocial.ResponseItem.Error.FORBIDDEN
}else{if(B==400){return opensocial.ResponseItem.Error.BAD_REQUEST
}else{if(B==500){return opensocial.ResponseItem.Error.INTERNAL_ERROR
}else{if(B==404){return opensocial.ResponseItem.Error.BAD_REQUEST
}else{if(B==417){return opensocial.ResponseItem.Error.LIMIT_EXCEEDED
}}}}}}}};
JsonRpcContainer.prototype.makeIdSpec=function(B){return opensocial.newIdSpec({userId:B})
};
JsonRpcContainer.prototype.translateIdSpec=function(B){var E=B.getField("userId");
var D=B.getField("groupId");
if(!opensocial.Container.isArray(E)){E=[E]
}for(var C=0;
C<E.length;
C++){if(E[C]==="OWNER"){E[C]="@owner"
}else{if(E[C]==="VIEWER"){E[C]="@viewer"
}}}if(D==="FRIENDS"){D="@friends"
}else{if(D==="SELF"||!D){D="@self"
}}return{userId:E,groupId:D}
};
JsonRpcContainer.prototype.newFetchPersonRequest=function(E,D){var B=this.newFetchPeopleRequest(this.makeIdSpec(E),D);
var C=this;
return new JsonRpcRequestItem(B.rpc,function(F){return C.createPersonFromJson(F,D)
})
};
JsonRpcContainer.prototype.newFetchPeopleRequest=function(B,D){var E={method:"people.get"};
E.params=this.translateIdSpec(B);
FieldTranslations.addAppDataAsProfileFields(D);
FieldTranslations.translateStandardArguments(D,E.params);
FieldTranslations.translateNetworkDistance(B,E.params);
if(D.profileDetail){FieldTranslations.translateJsPersonFieldsToServerFields(D.profileDetail);
E.params.fields=D.profileDetail
}var C=this;
return new JsonRpcRequestItem(E,function(I){var H;
if(I.list){H=I.list
}else{H=[I]
}var G=[];
for(var F=0;
F<H.length;
F++){G.push(C.createPersonFromJson(H[F],D))
}return new opensocial.Collection(G,I.startIndex,I.totalResults)
})
};
JsonRpcContainer.prototype.createPersonFromJson=function(B,C){FieldTranslations.translateServerPersonToJsPerson(B,C);
return new JsonPerson(B)
};
JsonRpcContainer.prototype.getFieldsList=function(B){if(this.hasNoKeys(B)||this.isWildcardKey(B[0])){return[]
}else{return B
}};
JsonRpcContainer.prototype.hasNoKeys=function(B){return !B||B.length===0
};
JsonRpcContainer.prototype.isWildcardKey=function(B){return B==="*"
};
JsonRpcContainer.prototype.newFetchPersonAppDataRequest=function(B,D,C){var E={method:"appdata.get"};
E.params=this.translateIdSpec(B);
E.params.appId="@app";
E.params.fields=this.getFieldsList(D);
FieldTranslations.translateNetworkDistance(B,E.params);
return new JsonRpcRequestItem(E,function(F){return opensocial.Container.escape(F,C,true)
})
};
JsonRpcContainer.prototype.newUpdatePersonAppDataRequest=function(B,C){var D={method:"appdata.update"};
D.params={userId:["@viewer"],groupId:"@self"};
D.params.appId="@app";
D.params.data={};
D.params.data[B]=C;
D.params.fields=B;
return new JsonRpcRequestItem(D)
};
JsonRpcContainer.prototype.newRemovePersonAppDataRequest=function(B){var C={method:"appdata.delete"};
C.params={userId:["@viewer"],groupId:"@self"};
C.params.appId="@app";
C.params.fields=this.getFieldsList(B);
return new JsonRpcRequestItem(C)
};
JsonRpcContainer.prototype.newFetchActivitiesRequest=function(B,C){var D={method:"activities.get"};
D.params=this.translateIdSpec(B);
D.params.appId="@app";
FieldTranslations.translateStandardArguments(C,D.params);
FieldTranslations.translateNetworkDistance(B,D.params);
return new JsonRpcRequestItem(D,function(F){F=F.list;
var G=[];
for(var E=0;
E<F.length;
E++){G.push(new JsonActivity(F[E]))
}return new opensocial.Collection(G)
})
};
JsonRpcContainer.prototype.newActivity=function(B){return new JsonActivity(B,true)
};
JsonRpcContainer.prototype.newMediaItem=function(D,B,C){C=C||{};
C.mimeType=D;
C.url=B;
return new JsonMediaItem(C)
};
JsonRpcContainer.prototype.newCreateActivityRequest=function(B,C){var D={method:"activities.create"};
D.params=this.translateIdSpec(B);
D.params.appId="@app";
FieldTranslations.translateNetworkDistance(B,D.params);
D.params.activity=C.toJsonObject();
return new JsonRpcRequestItem(D)
};
JsonRpcContainer.prototype.invalidateCache=function(){var F={method:"cache.invalidate"};
var C={invalidationKeys:["@viewer"]};
F.params=C;
var E={CONTENT_TYPE:"JSON",METHOD:"POST",AUTHORIZATION:"SIGNED",POST_DATA:gadgets.json.stringify(F)};
var B=[this.invalidatePath_];
var D=shindig.auth.getSecurityToken();
if(D){B.push("?st=",encodeURIComponent(D))
}this.sendRequest(B.join(""),null,E,"application/json")
}
})();
JsonRpcContainer.prototype.newMessage=function(A,B){return new JsonMessage(A,B)
};
JsonRpcContainer.prototype.newMessageCollection=function(A){return new JsonMessageCollection(A)
};
JsonRpcContainer.prototype.newFetchMessageCollectionsRequest=function(A,B){var C={method:"messages.get"};
C.params=this.translateIdSpec(A);
return new JsonRpcRequestItem(C,function(E){E=E.list;
var F=[];
for(var D=0;
D<E.length;
D++){F.push(new JsonMessageCollection(E[D]))
}return new opensocial.Collection(F)
})
};
JsonRpcContainer.prototype.newFetchMessagesRequest=function(A,C,B){var D={method:"messages.get"};
D.params=this.translateIdSpec(A);
D.params.msgCollId=C;
return new JsonRpcRequestItem(D,function(G){G=G.list;
var F=[];
for(var E=0;
E<G.length;
E++){F.push(new JsonMessage(G[E]))
}return new opensocial.Collection(F)
})
};;
gadgets.io.originalMakeRequest=gadgets.io.makeRequest;
gadgets.io.makeRequest=function(a,f,d){if(!d){d=[]
}var e=gadgets.io;
var c=e.RequestParameters;
var b=d[c.AUTHORIZATION];
d[c.AUTHORIZATION]=b||e.AuthorizationType.SIGNED;
e.originalMakeRequest(a,function(g){if(g&&g.rc&&g.rc>=400&&g.errors&&g.errors[0]===undefined){g.errors[0]=g.rc+""
}f(g)
},d)
};
opensocial.requestSendMessage=function(a,d,b,c){opensocial.Container.get().requestSendMessage(a,d,b,c)
};
opensocial.Container.prototype.requestSendMessage=function(e,i,f,k){var q="theRecipients";
var l="recipientDestOwnerIdKey";
var g="viewerDestOwnerIdKey";
var c=undefined;
var o=undefined;
var p=undefined;
var s=undefined;
var j=i.getField(opensocial.Message.Field.BODY);
var d=i.getField(opensocial.Message.Field.TITLE);
var a=opensocial.newDataRequest();
var m=false;
var n=false;
if(e&&(e.setField||(e instanceof Array))){if((e instanceof Array)||(!e.getField)){e=new opensocial.newIdSpec({userId:e})
}else{e.setField(opensocial.IdSpec.Field.GROUP_ID,"")
}a.add(a.newFetchPeopleRequest(e),q);
m=true
}if(k&&k[opensocial.NavigationParameters.DestinationType.RECIPIENT_DESTINATION]){var r=k[opensocial.NavigationParameters.DestinationType.RECIPIENT_DESTINATION];
if(r.getField("owner")){if(r.getField("owner").getField&&r.getField("owner").getField("userId")){if(r.getField("owner").getField("userId")=="0"){n=true
}else{a.add(a.newFetchPeopleRequest(r.getField("owner")),l);
m=true
}}else{if(r.getField("owner")=="0"){n=true
}else{a.add(a.newFetchPeopleRequest(new opensocial.IdSpec({userId:r.getField("owner")})),l);
m=true
}}}if(r.getField("view")){c=r.getField("view").getName()
}if(r.getField("parameters")){o=r.getField("parameters")
}}var b="home";
if(gadgets.views){b=gadgets.views.getCurrentView().getName()
}var h={};
if(gadgets.util.getUrlParameters()["view-params"]&&gadgets.util.getUrlParameters()["view-params"]!={}){h=gadgets.json.parse(decodeURIComponent(gadgets.util.getUrlParameters()["view-params"]))
}var t=false;
if(k&&k[opensocial.NavigationParameters.DestinationType.VIEWER_DESTINATION]){var r=k[opensocial.NavigationParameters.DestinationType.VIEWER_DESTINATION];
if(r.getField("owner")&&r.getField("owner").getField&&r.getField("owner").getField("userId")&&r.getField("owner").getField("userId")!="0"){a.add(a.newFetchPeopleRequest(r.getField("owner")),g);
m=true
}else{if(r.getField("owner")&&r.getField("owner")!="0"){a.add(a.newFetchPeopleRequest(opensocial.newIdSpec({userId:r.getField("owner")})),g);
m=true
}else{a.add(a.newFetchPeopleRequest(opensocial.newIdSpec({userId:"OWNER"})),g);
m=true
}}if(r.getField("view")){t=true;
p=r.getField("view").getName()
}else{p=b
}if(r.getField("parameters")){s=r.getField("parameters")
}if(!t){p=b;
s=h
}}if(m){a.send(_LI_requestSendMessageHelper(d,j,q,l,c,o,g,p,s,n))
}else{gadgets.rpc.call(null,"requestSendMessage",null,"",j,d,c,undefined,o,p,undefined,s,n)
}};
JsonRpcContainer.prototype.requestShareApp=function(a,e,c,d){var b=opensocial.newMessage();
b.setField(opensocial.Message.Field.BODY,"I would like you to try this Application on LinkedIn.");
b.setField(opensocial.Message.Field.TITLE,"Try this Application");
if(!e){e=b
}opensocial.Container.get().requestSendMessage(a,e,c,d)
};
opensocial.requestCreateActivity=function(e,b,a){if(!e||!e.getField(opensocial.Activity.Field.BODY)){if(a){a(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.BAD_REQUEST,"Activity BODY is mandatory."))
}return
}if(e.getField(opensocial.Activity.Field.URL)==""||e.getField(opensocial.Activity.Field.URL)==undefined){var d=gadgets.util.getUrlParameters()["signedUrlToCanvasView"];
e.setField(opensocial.Activity.Field.URL,d)
}a=a||{};
var c=opensocial.newDataRequest();
c.add(opensocial.Container.get().newCreateActivityRequest(opensocial.newIdSpec({userId:"VIEWER"}),e),"key");
c.send(function(f){a(f.get("key"))
})
};
opensocial.Container.prototype.hasPermission=function(a){if(a!=opensocial.Permission.VIEWER){return false
}var b=gadgets.util.getUrlParameters()["viewerAccess"];
return b=="true"
};
opensocial.Container.prototype.requestPermission=function(c,d,b){if((!c)||(!(c instanceof Array))||(!c[0])||(c[0]=="")||(c[0]!=opensocial.Permission.VIEWER)){var a="Unknown error";
if(!c){message="permissions is undefined"
}else{if(!(c instanceof Array)){message="permissions must be an array of opensocial.Permission"
}else{if(!c[0]){message="permissions[0] is undefined"
}else{if(c[0]==""){message="permissions[0] is empty"
}else{if(c[0]!=opensocial.Permission.VIEWER){message="Only request permission to access to "+opensocial.Permission.VIEWER+" is allowed"
}}}}}b(new opensocial.ResponseItem(null,null,opensocial.ResponseItem.Error.BAD_REQUEST,message))
}if(!opensocial.Container.get().hasPermission([opensocial.Permission.VIEWER])){gadgets.rpc.call(null,"requestPermission",null,c[0],d,b)
}else{if(b){b([opensocial.Permission.VIEWER])
}}};
if(gadgets.views){gadgets.views.requestNavigateTo=function(b,f,c){var e=opensocial.newDataRequest();
var a=false;
var d="viewerDestOwnerIdKey";
if(c=="viewer"){e.add(e.newFetchPeopleRequest(new opensocial.newIdSpec({userId:"viewer"})),d);
a=true
}if(a){e.send(_LI_requestNavigateToHelper(b,f,c,d))
}else{gadgets.rpc.call(null,"requestNavigateTo",null,b.getName(),f,c)
}}
}opensocial.DataRequest.prototype.addDefaultProfileFields_orig=opensocial.DataRequest.prototype.addDefaultProfileFields;
opensocial.DataRequest.prototype.addDefaultProfileFields=function(b){opensocial.DataRequest.prototype.addDefaultProfileFields_orig(b);
var a=opensocial.DataRequest.PeopleRequestFields;
var c=b[a.PROFILE_DETAILS]||[];
b[a.PROFILE_DETAILS]=b[a.PROFILE_DETAILS].concat([opensocial.Person.Field.PROFILE_URL])
};;
_LI_requestSendMessageHelper=function(i,g,b,d,j,h,e,f,a,l){this._subject=i;
this._body=g;
this._recipientsKey=b;
this._recipientDestOwnerIdKey=d;
this._recipientDestViewName=j;
this._recipientDestParams=h;
this._viewerDestOwnerIdKey=e;
this._viewerDestViewName=f;
this._viewerDestParams=a;
this._useImplicitOwner=l;
var c=function k(m){var o=new Array();
if(m.get(_recipientsKey)&&m.get(_recipientsKey).getData()){var n=m.get(_recipientsKey).getData();
if(n.each){n.each(function(p){o.push(p.getField(opensocial.Person.Field.ID))
})
}else{o.push(person.getField(opensocial.Person.Field.ID))
}}if(m.get(_recipientDestOwnerIdKey)&&m.get(_recipientDestOwnerIdKey).getData()){this._recipientDestOwnerId=m.get(_recipientDestOwnerIdKey).getData().asArray()[0].getField(opensocial.Person.Field.ID)
}if(m.get(_viewerDestOwnerIdKey)&&m.get(_viewerDestOwnerIdKey).getData()){this._viewerDestOwnerId=m.get(_viewerDestOwnerIdKey).getData().asArray()[0].getField(opensocial.Person.Field.ID)
}gadgets.rpc.call(null,"requestSendMessage",null,o.join(","),this._body,this._subject,this._recipientDestViewName,this._recipientDestOwnerId,this._recipientDestParams,this._viewerDestViewName,this._viewerDestOwnerId,this._viewerDestParams,this._useImplicitOwner)
};
return c
};
_LI_requestNavigateToHelper=function(a,e,c,d){this._view=a;
this._opt_params=e;
this._opt_ownerId=c;
this._viewerIdKey=d;
var f=function b(g){if(g.get(this._viewerIdKey)&&g.get(this._viewerIdKey).getData()){this._opt_ownerId=g.get(this._viewerIdKey).getData().asArray()[0].getField(opensocial.Person.Field.ID)
}gadgets.rpc.call(null,"requestNavigateTo",null,this._view.getName(),this._opt_params,this._opt_ownerId)
};
return f
};;

      var requiredConfig = {
        "path": gadgets.config.NonEmptyStringValidator,
        "domain": gadgets.config.NonEmptyStringValidator,
        "enableCaja": gadgets.config.BooleanValidator,
        "supportedFields": gadgets.config.ExistsValidator
      };

      gadgets.config.register("opensocial-0.9", requiredConfig,
        function(config) {
          ShindigContainer = function() {
            JsonRpcContainer.call(this, config["opensocial-0.9"]);
          };
          ShindigContainer.inherits(JsonRpcContainer);

          opensocial.Container.setContainer(new ShindigContainer());
      });
      gadgets.config.register("opensocial-0.8", requiredConfig,
        function(config) {
          ShindigContainer = function() {
            JsonRpcContainer.call(this, config["opensocial-0.9"]);
          };
          ShindigContainer.inherits(JsonRpcContainer);

          opensocial.Container.setContainer(new ShindigContainer());
      });

    ;
var gadgets=gadgets||{};
gadgets.window=gadgets.window||{};
(function(){gadgets.window.getViewportDimensions=function(){var A,B;
if(self.innerHeight){A=self.innerWidth;
B=self.innerHeight
}else{if(document.documentElement&&document.documentElement.clientHeight){A=document.documentElement.clientWidth;
B=document.documentElement.clientHeight
}else{if(document.body){A=document.body.clientWidth;
B=document.body.clientHeight
}else{A=0;
B=0
}}}return{width:A,height:B}
}
})();;
var gadgets=gadgets||{};
gadgets.window=gadgets.window||{};
(function(){var C;
function A(F,D){var E=window.getComputedStyle(F,"");
var G=E.getPropertyValue(D);
G.match(/^([0-9]+)/);
return parseInt(RegExp.$1,10)
}function B(){var E=0;
var D=[document.body];
while(D.length>0){var I=D.shift();
var H=I.childNodes;
for(var G=0;
G<H.length;
G++){var J=H[G];
if(typeof J.offsetTop!=="undefined"&&typeof J.scrollHeight!=="undefined"){var F=J.offsetTop+J.scrollHeight+A(J,"margin-bottom");
E=Math.max(E,F)
}D.push(J)
}}return E+A(document.body,"border-bottom")+A(document.body,"margin-bottom")+A(document.body,"padding-bottom")
}gadgets.window.adjustHeight=function(I){var F=parseInt(I,10);
var E=false;
if(isNaN(F)){E=true;
var K=gadgets.window.getViewportDimensions().height;
var D=document.body;
var J=document.documentElement;
if(document.compatMode==="CSS1Compat"&&J.scrollHeight){F=J.scrollHeight!==K?J.scrollHeight:J.offsetHeight
}else{if(navigator.userAgent.indexOf("AppleWebKit")>=0){F=B()
}else{if(D&&J){var G=J.scrollHeight;
var H=J.offsetHeight;
if(J.clientHeight!==H){G=D.scrollHeight;
H=D.offsetHeight
}if(G>K){F=G>H?G:H
}else{F=G<H?G:H
}}}}}if(F!==C&&!isNaN(F)&&!(E&&F===0)){C=F;
gadgets.rpc.call(null,"resize_iframe",null,F)
}}
}());
var _IG_AdjustIFrameHeight=gadgets.window.adjustHeight;;
var tamings___=tamings___||[];
tamings___.push(function(A){caja___.whitelistFuncs([[gadgets.window,"adjustHeight"],[gadgets.window,"getViewportDimensions"],])
});;
var gadgets=gadgets||{};
gadgets.window=gadgets.window||{};
gadgets.window.setTitle=function(A){gadgets.rpc.call(null,"set_title",null,A)
};
var _IG_SetTitle=gadgets.window.setTitle;;
var gadgets=gadgets||{};
gadgets.views=function(){var f=null;
var b={};
var d={};
function a(i){if(!i){i=window.event
}var h;
if(i.target){h=i.target
}else{if(i.srcElement){h=i.srcElement
}}if(h.nodeType===3){h=h.parentNode
}if(h.nodeName.toLowerCase()==="a"){var g=h.getAttribute("href");
if(g&&g[0]!=="#"&&g.indexOf("://")===-1){gadgets.views.requestNavigateTo(f,g);
if(i.stopPropagation){i.stopPropagation()
}if(i.preventDefault){i.preventDefault()
}i.returnValue=false;
i.cancelBubble=true;
return false
}}return false
}function c(k){var j=k.views||{};
for(var n in j){if(j.hasOwnProperty(n)){if(n!="rewriteLinks"){var o=j[n];
if(!o){continue
}b[n]=new gadgets.views.View(n,o.isOnlyVisible);
var g=o.aliases||[];
for(var m=0,l;
l=g[m];
++m){b[l]=new gadgets.views.View(n,o.isOnlyVisible)
}}}}var h=gadgets.util.getUrlParameters();
if(h["view-params"]){d=gadgets.json.parse(h["view-params"])||d
}f=b[h.view]||b["default"];
if(j.rewriteLinks){if(document.attachEvent){document.attachEvent("onclick",a)
}else{document.addEventListener("click",a,false)
}}}gadgets.config.register("views",null,c);
return{bind:function(I,G){var m=n("owner",[]);
var z=this.getCurrentView().getName().split(".")[0];
if(m&&(m=="0")&&z=="canvas"){var x="{-join|&|params}";
var r=gadgets.util.getUrlParameters()["urlToCanvasView"];
I=r+"&_ownerId=0&"+x
}if(typeof I!="string"){throw new Error("Invalid urlTemplate")
}if(!G){G={}
}if(typeof G!="object"){throw new Error("Invalid environment")
}var F=/^([a-zA-Z0-9][a-zA-Z0-9_\.\-]*)(=([a-zA-Z0-9\-\._~]|(%[0-9a-fA-F]{2}))*)?$/,K=new RegExp("\\{([^}]*)\\}","g"),H=/^-([a-zA-Z]+)\|([^|]*)\|(.+)$/,s=[],C=0,p,o,l,A,q,j,w,E;
function n(v,k){if(!G||G=={}){return""
}return G.hasOwnProperty(v)?G[v]:k
}function i(k){if(!(o=k.match(F))){throw new Error("Invalid variable : "+k)
}}function J(N,k,M){var v,L=N.split(",");
for(v=0;
v<L.length;
++v){i(L[v]);
if(M(k,n(o[1]),o[1])){break
}}return k
}while(p=K.exec(I)){s.push(I.substring(C,p.index));
C=K.lastIndex;
if(o=p[1].match(F)){l=o[1];
A=o[2]?o[2].substr(1):"";
s.push(n(l,A))
}else{if(o=p[1].match(H)){q=o[1];
j=o[2];
w=o[3];
E=0;
switch(q){case"neg":E=1;
case"opt":if(J(w,{flag:E},function(L,k){if(typeof k!="undefined"&&(typeof k!="object"||k.length)){L.flag=!L.flag;
return 1
}}).flag){s.push(j)
}break;
case"join":var y=n("params",[]);
var g=0;
var B="";
var t="";
var u=false;
for(e in y){g++;
if(e!=="0"&&g==1){u=true
}if(u){B=e;
t=y[e];
s.push('"'+B+'":"'+t+'",')
}else{if(Math.round(g/2)!=(g/2)){B=y[e]
}else{t=y[e];
s.push('"'+B+'":"'+t+'",')
}}}var D=s[0];
s[0]="";
var h=s.join("");
s=new Array();
s.push(D+"appParams="+encodeURIComponent("{"+h.substring(0,h.length-1)+"}"));
break;
case"list":i(w);
value=n(o[1]);
if(typeof value==="object"&&typeof value.join==="function"){s.push(value.join(j))
}break;
case"prefix":E=1;
case"suffix":i(w);
value=n(o[1],o[2]&&o[2].substr(1));
if(typeof value==="string"){s.push(E?j+value:value+j)
}else{if(typeof value==="object"&&typeof value.join==="function"){s.push(E?j+value.join(j):value.join(j)+j)
}}break;
default:throw new Error("Invalid operator : "+q)
}}else{throw new Error("Invalid syntax : "+p[0])
}}}s.push(I.substr(C));
return s.join("")
},requestNavigateTo:function(g,i,h){if(typeof g!=="string"){g=g.getName()
}gadgets.rpc.call(null,"requestNavigateTo",null,g,i,h)
},getCurrentView:function(){return f
},getSupportedViews:function(){return b
},getParams:function(){return d
}}
}();
gadgets.views.View=function(a,b){this.name_=a;
this.isOnlyVisible_=!!b
};
gadgets.views.View.prototype.getName=function(){return this.name_
};
gadgets.views.View.prototype.getUrlTemplate=function(){var b="{-join|&|params}";
var h=gadgets.util.getUrlParameters();
var f=h["signedUrlToCanvasView"];
var d=h["baseLeoNonSecureURL"];
var c=h["ownerProfileUrl"];
var a=this.name_.split(".")[0];
if(a=="canvas"){var g=this.name_==a?"":"&view="+this.name_;
return f+g+"&"+b
}else{if(a=="home"){return d+"home"
}else{if(a=="profile"){return c
}}}};
gadgets.views.View.prototype.bind=function(a){return gadgets.views.bind(this.getUrlTemplate(),a)
};
gadgets.views.View.prototype.isOnlyVisibleGadget=function(){return this.isOnlyVisible_
};
gadgets.views.ViewType=gadgets.util.makeEnum(["CANVAS","HOME","PREVIEW","PROFILE","FULL_PAGE","DASHBOARD","POPUP"]);;

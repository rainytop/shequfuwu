/*TMODJS:{"version":"1.0.0"}*/
!function(){function a(a,b){return(/string|function/.test(typeof b)?h:g)(a,b)}function b(a,c){return"string"!=typeof a&&(c=typeof a,"number"===c?a+="":a="function"===c?b(a.call(a)):""),a}function c(a){return l[a]}function d(a){return b(a).replace(/&(?![\w#]+;)|[<>"']/g,c)}function e(a,b){if(m(a))for(var c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)}function f(a,b){var c=/(\/)[^\/]+\1\.\.\1/,d=("./"+a).replace(/[^\/]+$/,""),e=d+b;for(e=e.replace(/\/\.\//g,"/");e.match(c);)e=e.replace(c,"/");return e}function g(b,c){var d=a.get(b)||i({filename:b,name:"Render Error",message:"Template not found"});return c?d(c):d}function h(a,b){if("string"==typeof b){var c=b;b=function(){return new k(c)}}var d=j[a]=function(c){try{return new b(c,a)+""}catch(d){return i(d)()}};return d.prototype=b.prototype=n,d.toString=function(){return b+""},d}function i(a){var b="{Template Error}",c=a.stack||"";if(c)c=c.split("\n").slice(0,2).join("\n");else for(var d in a)c+="<"+d+">\n"+a[d]+"\n\n";return function(){return"object"==typeof console&&console.error(b+"\n\n"+c),b}}var j=a.cache={},k=this.String,l={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},m=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},n=a.utils={$helpers:{},$include:function(a,b,c){return a=f(c,a),g(a,b)},$string:b,$escape:d,$each:e},o=a.helpers=n.$helpers;a.get=function(a){return j[a.replace(/^\.\//,"")]},a.helper=function(a,b){o[a]=b},"function"==typeof define?define(function(){return a}):"undefined"!=typeof exports?module.exports=a:this.template=a,/*v:1*/
a("Admin_order",'<html> <head> <meta http-equiv="Content-type" content="text/html; charset=utf-8"> <meta name="viewport" content="width=100%, initial-scale=1, minimum-scale=1, maximum-scale=1"> <meta name="apple-mobile-web-app-capable" content="yes"> <title>\u8ba2\u5355\u7ba1\u7406\u4e2d\u5fc3</title> <link rel="stylesheet" href="__CSS__/style.min.css"> <link rel="stylesheet" href="__CSS__/iphone.min.css"> <link rel="stylesheet" href="__CSS__/swiper.min.css"> <style type="text/css"> .pagination { margin: 12px 0; text-align: center; } .current { float: left; width: 47px; height: 24px; line-height: 24px; border: 1px solid #3e3e3e; text-align: center; font-size: 12px; color: #2c2c2c; cursor: pointer; border-color: #fafaf0 #fafaf0 #dfdfdf; border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#fafaf0\', endColorstr=\'#dfdfdf\', GradientType=0); filter: progid:DXImageTransform.Microsoft.gradient(enabled=false) } .current { background-color: #ff6703; color: #fff; } .num { float: left; width: 47px; height: 24px; line-height: 24px; border: 1px solid #3e3e3e; text-align: center; font-size: 12px; color: #2c2c2c; cursor: pointer; border-color: #fafaf0 #fafaf0 #dfdfdf; border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#fafaf0\', endColorstr=\'#dfdfdf\', GradientType=0); filter: progid:DXImageTransform.Microsoft.gradient(enabled=false) } .prev { float: left; width: 47px; height: 24px; line-height: 24px; border: 1px solid #3e3e3e; text-align: center; font-size: 12px; color: #2c2c2c; cursor: pointer; border-color: #fafaf0 #fafaf0 #dfdfdf; border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#fafaf0\', endColorstr=\'#dfdfdf\', GradientType=0); filter: progid:DXImageTransform.Microsoft.gradient(enabled=false) } .next { float: left; width: 47px; height: 24px; line-height: 24px; border: 1px solid #3e3e3e; text-align: center; font-size: 12px; color: #2c2c2c; cursor: pointer; border-color: #fafaf0 #fafaf0 #dfdfdf; border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#fafaf0\', endColorstr=\'#dfdfdf\', GradientType=0); filter: progid:DXImageTransform.Microsoft.gradient(enabled=false) } </style> </head> <body> <div id="main" style="margin: 0px;padding: 0px;"> <div class="container-gird" style="margin-top: 0px;"> <div class="confirmation-form"> <div class="confirmation-list"> <img src="{$user.avater}" class="avater lazy"> <div style="text-align: center;padding: 10px 0px;">\u5458\u5de5</div> <div class="divider" style="background-color: #f5f5f0"></div> <div class="dotted-divider" style="width: 105.263157894737%; margin-left: -2.9%"></div> <ul> <li> <div class="confirmation-item"> <div class="item-info"> <span class="item-name">\u6211\u7684\u8d26\u53f7:<br></span> </div> <div class="select-box" id="nickname">{$user[\'username\']?$user[\'username\']:\'\u533f\u540d\'}</div> </div> </li> </ul> </div> </div> </div> <div class="my-order-header"> <span>\u8ba2\u5355\u7ba1\u7406</span> <div class="dotted-divider"></div> </div> <div class="myOrderList"> <div> <div class="container-gird" style="margin-top: 20px;padding: 10px;">  <div> <div class="orderResult-list" id="items-order-result-list"> <ul> <empty name="order"> <div style="text-align: center;padding: 10px;">\u6682\u65e0\u8981\u5904\u7406\u7684\u8ba2\u5355</div> </empty> <volist name="order" id="order"> <li> <div class="order-info"><span class="number">\u8ba2\u5355\u53f7\uff1a<span id="order-no">{$order.orderid}</span></span><span class="date" style="float: right">{$order.time}</span><span class="order-status"> <php> $pay_status = \'\u672a\u4ed8\u6b3e\'; if ($order["pay_status"] == 1) { $pay_status = \'\u5df2\u4ed8\u6b3e\'; } $order_status = \'\u672a\u5904\u7406\'; if ($order["status"] == 1) { $order_status = \'\u6b63\u5728\u914d\u9001\'; } else if ($order["status"] == 2) { $order_status = \'\u5df2\u5b8c\u6210\'; } else if ($order["status"] == -1) { $order_status = \'\u5df2\u53d6\u6d88\'; } </php> {$pay_status},{$order_status} </span></div> <div class="order-list" id="item-order-list"> <ul> <volist name="order.detail" id="detail"> <li><span class="order-item-name">{$detail.name}</span><span class="order-item-price">\uffe5{$detail.price}</span><span class="order-item-amount">{$detail.num}\u4efd</span></li> </volist> </ul> <div class="mytotal-info"><span class="deliver">\u8fd0\u8d39\uff1a{$order.freight}\u5143</span><span class="total">\u5171{$order.totalprice}\u5143</span> </div> <div class="mytotal-info"><span class="deliver">\u8054\u7cfb\u4eba\uff1a{$order.contact.name}</span> </div> <div class="mytotal-info"><span class="deliver">\u8054\u7cfb\u65b9\u5f0f\uff1a{$order.contact.phone}</span></div> <div class="mytotal-info"><span class="deliver">\u914d\u9001\u5730\u5740\uff1a{$order.contact.city}-{$order.contact.area}-{$order.contact.address}</span> </div> </div> <div class="order-footer"> <span class="payOrder" onclick="openUrl(\'{:U(\\\'App/Admin/orderCancel\\\',array(\\\'id\\\'=>$order[\\\'id\\\']))}\')">\u53d6\u6d88</span>  <span class="payOrder" onclick="openUrl(\'{:U(\\\'App/Admin/orderPublish\\\',array(\\\'id\\\'=>$order[\\\'id\\\']))}\')">\u53d1\u8d27</span> <span class="payOrder" onclick="openUrl(\'{:U(\\\'App/Admin/orderComplete\\\',array(\\\'id\\\'=>$order[\\\'id\\\']))}\')">\u5b8c\u6210</span>  </div> <div class="divider"></div> </li> </volist> </ul> </div> </div> </div> </div> </div> <div id="page_tag_load"><img src="__IMG__/ajax-loader.gif" alt="loader"></div> <div style="display: none"> <a href="javascript:void(0);" style="text-align: center;background-color: #fff; color: #949494;font-size: 12px;display: block;">inuoer</a> </div> </div> <script src="__JS__/jquery.min.js"></script> <script src="__JS__/jquery.lazyload.js"></script> <script> function openUrl(url) { $.ajax({ type: "get", url: url, success: function () { window.location.reload() }, beforeSend: function () { $("#page_tag_load").show(); }, complete: function () { $("#page_tag_load").hide(); } }); } </script> </body> </html>'),/*v:1*/
a("ads-container",function(a){"use strict";var b=this,c=(b.$helpers,b.$escape),d=a.imageUrl,e=b.$each,f=a.ads,g=(a.value,a.i,a.uploadsUrl),h="";return h+='<div class="header-bar select-shopbar"> <span style="line-height:45px;position:relative;float:right;Z-index:1056"> <a href="#/showShopInfo" id="showShopInfo"> <img class="dianpu-img" src="',h+=c(d),h+='/dianpu.png"> </a> </span> <div class="header-title" style="display:inline-block;">=={$name}==</div> <span style="line-height:45px;position:absolute;"> <a href="#/selectShop" id="selectShop"> <img class="dianpu-img" src="',h+=c(d),h+='/zhoubian.png"> </a> </span> </div>  <div class="swiper-container"> <div class="swiper-wrapper" style="height:180px;"> ',e(f,function(a){h+=" ",1==a.adsname&&(h+=' <div class="swiper-slide"> <a href="',h+=c(a.url),h+='"> <img class="lazy" src="',h+=c(d),h+='/blank.gif" data-echo="',h+=c(g+a.savepath+a.savename),h+='" style="display: inline; width: 100%;"> </a> </div> '),h+=" "}),h+=' </div> <div class="swiper-pagination"></div> </div> <div class="mod-desc"> <ul> ',e(f,function(a){h+=" ",2==a.adsname&&(h+=' <li class="item item_third"> <a href="',h+=c(a.url),h+='" title="',h+=c(a.name),h+='"> <div class="item-image item-image_third"><img src="',h+=c(d),h+='/blank.gif" data-echo="',h+=c(g+a.savepath+a.savename),h+='" class="lazy" style="width: 100%; margin-top: 0px; display: inline;background: #FFF url(',h+=c(d),h+='/loading.gif) no-repeat center center;background-size: 30px;"> <div class="select-shadow"> <div class="select-inner"><img src="',h+=c(d),h+='/ico_select.png" alt="selected"><span>\u5df2\u9009</span> </div> </div> </div> </a> <div class="single-item-info"> <div class="item-title contentCenter">',h+=c(a.name),h+="</div> </div> </li> "),h+=" "}),h+=' </ul> </div> <div class="m-component-promotion" id="list-section"> <ul class="list-unstyled" id="list-sale"> ',e(f,function(a){h+=" ",3==a.adsname&&(h+=' <li> <a href="',h+=c(a.url),h+='"> <img class="lazy" src="',h+=c(d),h+='/blank.gif" data-echo="',h+=c(g+a.savepath+a.savename),h+='" style="display: inline; height: 137px;"> </a> </li> '),h+=" "}),h+=" </ul> </div>",new k(h)}),/*v:1*/
a("cart-container",function(a){"use strict";var b=this,c=(b.$helpers,b.$escape),d=a.config,e="";return e+='<div class="container-gird"> <div class="confirmation-form"> <div class="confirmation-header"> <span>\u8ba2\u5355\u786e\u8ba4</span> </div> <div class="confirmation-list" id="item-list"> <div class="dotted-divider" style="width: 105.263157894737%; margin-left: -2.9%"></div> <ul>  </ul> <div class="total-info"> <span class="items-total-amount">\u8fd0\u8d39\uff1a<span id="items-total-amount">',e+=c(d.freight),e+='</span>\u5143</span> <span class="items-total-amount">\u6ee1\uff1a<span>',e+=c(d.full),e+='</span>\u5143</span> <span class="items-total-amount">\u51cf\uff1a<span>',e+=c(d.discount),e+='</span>\u5143</span> <span class="items-total-price">\u603b\u8ba1\uff1a<span id="items-total-price">0</span>\u5143</span> </div> </div> </div> </div> <a class="next mybtn" href="javascript:cartNext();"> <span class="pi_next" style="display: block; height: 39px; font-size: 1.2em;margin: 10px;background: #FF4146;color: #ffffff;border-radius: 6px;border: 0.5px solid #c3c4c8;">\u4e0b\u4e00\u6b65</span> </a> <div style="padding-top:190px;"></div>',new k(e)}),/*v:1*/
a("delivery-container",function(a){"use strict";var b=this,c=(b.$helpers,a.config),d="";return d+='<div class="confirmation-form"> <div class="confirmation-header-nb"> <span>\u6536\u8d27\u4eba\u4fe1\u606f</span> <div class="dotted-divider"></div> </div> <div class="container-gird"> <form class="delivery-info"> <ul class="form_table"> <li> <span class="td_left">\u59d3\u540d</span> <span class="td_right"> <input type="text" name="username" id="username" placeholder="\u52a1\u5fc5\u4f7f\u7528\u771f\u5b9e\u59d3\u540d" value="" required=""> <input type="hidden" name="id" id="id" value="0"> </span> </li> <li> <span class="td_left">\u624b\u673a</span> <span class="td_right"><input type="text" name="tel" id="tel" placeholder="" value="" required=""></span> </li> <li> <span class="td_left">\u5730\u5740</span> <span class="td_right"> <select id="hat_city" name="hat_city" class="hat_select" onchange="changeCity(this)"> </select> <select id="hat_area" name="hat_area" class="hat_select"> </select> </span> </li> <li> <span class="td_left"></span> <span class="td_right"> <input type="text" name="address" id="address" placeholder="\u8be6\u7ec6\u5730\u5740" value="" required=""> </span> </li> <li> <span class="td_left">\u5907\u6ce8</span> <span class="td_right"><input type="text" name="note" id="note" placeholder="\u9009\u586b"></span> </li> <li> <span class="td_left">\u914d\u9001\u65f6\u95f4</span> <span class="td_right"> <select id="deliveryTime" name="deliveryTime" class="hat_select"> </select> </span> </li> <li></li> </ul> </form> </div> </div> <div class="payment"> <p class="heading">\u652f\u4ed8\u65b9\u5f0f</p> <div class="container-gird"> <div class="payment-content"> ',"1"==c.balance_payment&&(d+=' <span class="line" id="balance-payment"> <span class="radio"></span> <span class="label">\u8d26\u6237\u652f\u4ed8</span> </span> '),d+=" ","1"==c.wechat_payment&&(d+=' <span class="line" id="wechat-payment"> <span class="radio"></span> <span class="label">\u5fae\u4fe1\u652f\u4ed8</span> </span> '),d+=" ","1"==c.alipay_payment&&(d+=' <span class="line" id="alipay-payment"> <span class="radio"></span> <span class="label">\u652f\u4ed8\u5b9d\u652f\u4ed8</span> </span> '),d+=" ","1"==c.cool_payment&&(d+=' <span class="line" id="cool-payment"> <span class="radio"></span> <span class="label">\u8d27\u5230\u4ed8\u6b3e</span> </span> '),d+=' </div> </div> </div> <a class="next mybtn" href="javascript:submitOrder();"> <span class="pi_next1" style="display: block; height: 39px; font-size: 1.2em;margin: 10px;background: #FF4146;color: #ffffff;border-radius: 6px;border: 0.5px solid #c3c4c8;">\u63d0\u4ea4\u8ba2\u5355</span> </a> <div style="padding-top:80px;"> <a href="javascript:void(0);" style="text-align: center;color: #949494;font-size: 12px;display: block;"></a> </div>',new k(d)}),/*v:1*/
a("forgetPassword-container",'<div class="container-gird"> <div class="login-form"> <table style="width:100%;"> <tbody> <tr> <td style="text-align:left;width:30%;"><label>\u7528\u6237\u540d\uff1a</label></td> <td colspan="2" style="text-align:left;width:60%;"><input style="width:86%;" type="text" name="forgetUsername" id="forgetUsername"> </td> <td style="width:10%"><span class="clear-input" onclick="empty(\'forgetUsername\');"></span></td> </tr> <tr> <td style="text-align:left;width:30%;"><label>\u624b\u673a\u53f7\uff1a</label></td> <td colspan="2" style="text-align:left;width:60%;"><input style="width:86%;" type="tel" name="forgetPhone" id="forgetPhone"></td> <td style="width:10%"><span class="clear-input" onclick="empty(\'forgetPhone\');"></span></td> </tr> <tr> <td style="text-align:left;width:30%;"><label>\u65b0\u5bc6\u7801\uff1a</label></td> <td colspan="2" style="text-align:left;width:60%;"><input style="width:86%;" type="tel" name="forgetPassword" id="forgetPassword"> </td> <td style="width:10%"><span class="clear-input" onclick="empty(\'forgetPassword\');"></span></td> </tr> </tbody> </table> <table style="width:100%;padding: 5% 0;"> <tbody> <tr> <td> <button id="forgetSubmit" onclick="resetPassword()" class="mybtn" style="width:100%;">\u63d0\u4ea4</button> </td> </tr> </tbody> </table> </div> </div>'),/*v:28*/
a("Index_index",'<html> <head> <meta http-equiv="Content-type" content="text/html; charset=utf-8"> <meta name="viewport" content="width=100%, initial-scale=1, minimum-scale=1, maximum-scale=1"> <meta name="apple-mobile-web-app-capable" content="yes"> <title id="oti"></title> <link rel="stylesheet" href="__CSS__/style.min.css?v=<?php echo getResourceVersion(); ?>"> <link rel="stylesheet" href="__CSS__/shop.min.css?v=2"> <link rel="stylesheet" href="__CSS__/icon/iconfont.css"> <link rel="stylesheet" href="__CSS__/iphone.css"> <link rel="stylesheet" href="__CSS__/swiper.min.css"> </head> <body> <div id="main"></div> <div id="page_tag_load"><img src="__IMG__/ajax-loader.gif" alt="loader"></div> <div class="navigation-wrap"> <a class="navigation-item selected" id="nav-ads" href="#/index" onclick="openAds(this)"> <div class="icon-home selected"></div> <div>\u9996\u9875</div> </a> <a class="navigation-item" id="nav-product" href="#/product" onclick="openProduct(this)"> <div class="icon-product"></div> <div>\u5168\u90e8\u5546\u54c1</div> </a> <a class="navigation-item" id="nav-cart" href="#/cart" onclick="openCart(this)"> <div class="icon-cart"> <div class="icon-hit" id="shopcart-tip" style="display:none"></div> </div> <div>\u8d2d\u7269\u8f66</div> </a> <a class="navigation-item" id="nav-user" href="#/user" onclick="openUser(this)"> <div class="icon-user"></div> <div>\u6211\u7684</div> </a> </div> <div id="wechatShare"> <input type="hidden" id="wechatjs_appId" value="{$signPackage.appId}"> <input type="hidden" id="wechatjs_timestamp" value="{$signPackage.timestamp}"> <input type="hidden" id="wechatjs_nonceStr" value="{$signPackage.nonceStr}"> <input type="hidden" id="wechatjs_signature" value="{$signPackage.signature}"> <input type="hidden" id="wechatjs_shopData_name" value="{$shopData.name}"> <input type="hidden" id="wechatjs_shopData_remark" value="{$shopData.remark}"> <input type="hidden" id="wechatjs_shopData_image" value="{$shopData.savepath}{$shopData.savename}"> <input type="hidden" id="wechatjs_hostName" value="{$hostName}"> <div id="wechatShareJS"> </div> </div> <script> var cartData = []; var totalNum = 0; var totalPrice = 0; var area = \'\'; var payment = -1; var data = { \'wxConfig\': {$wxConfig? $wxConfig : \'[]\'}, \'config\': {$config? $config : \'[]\'}, \'user\': {$user? $user : \'[]\'}, \'ads\': {$ads? $ads : \'[]\'}, \'menu\': {$menu? $menu : \'[]\'}, \'product\': {$product? $product : \'[]\'}, \'baseUrl\': \'__APP__\', \'uploadsUrl\': \'__PUBLIC__/Uploads/\', \'imageUrl\': \'__IMG__\', \'jsUrl\':\'__JS__\', \'shopId\': {$shopId}, } console.log(data); </script> <if condition="APP_DEBUG eq true"> <script src="__JS__/jquery.min.js"></script> <script src="__JS__/swiper.min.js"></script> <script src="__JS__/jweixin-1.0.0.js"></script> <else/> <script src="//cdn.bootcss.com/jquery/3.0.0/jquery.min.js"></script> <script src="//cdn.bootcss.com/Swiper/3.0.4/js/swiper.min.js"></script> <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script> </if> <script src=\'{:U("Home/Min/Index","g=appJs")}\'></script>  <script src="__JS__/wemall.js?v=<?php echo getResourceVersion(); ?>"></script> <script type="text/javascript"> $(document).ready(function () { var html= "<script src=\\"__JS__/wechatShare.js\\" />"; $("#wechatShareJS").html(html); }); </script> <script> $(\'#oti\').html(\'\u6b22\u8fce\u6765\u5230\' + data.config.name); initShop({$shopId}); </script> </body> </html>'),/*v:2*/
a("Index_mustsubscribe",'<html> <head> <meta http-equiv="Content-type" content="text/html; charset=utf-8"> <meta name="viewport" content="width=100%, initial-scale=1, minimum-scale=1, maximum-scale=1"> <meta name="apple-mobile-web-app-capable" content="yes"> <title id="oti"></title> <link rel="stylesheet" href="__CSS__/style.css?v=19"> <link rel="stylesheet" href="__CSS__/shop.css?v=2"> <link rel="stylesheet" href="__CSS__/icon/iconfont.css"> <link rel="stylesheet" href="__CSS__/iphone.css"> <link rel="stylesheet" href="__CSS__/swiper.min.css"> </head> <body> <div id="main"> \u8bf7\u5148\u5173\u6ce8\u672c\u5e73\u53f0\u540e\u8fdb\u884c\u8d2d\u7269\u6d88\u8d39\u3002\u5173\u6ce8\u65b9\u6cd5\uff1a<br/> 1\u3001\u626b\u63cf(\u6216\u957f\u63093\u79d2\u5fae\u4fe1\u5c06\u81ea\u52a8\u8bc6\u522b)\u4ee5\u4e0b\u4e8c\u7ef4\u7801\u8fdb\u884c\u5173\u6ce8\u3002<br/> 2\u3001\u641c\u7d22\u516c\u4f17\u53f7\u540d\u79f0\u201czzlshsm\u201d\u8fdb\u884c\u5173\u6ce8\u3002<br/> <img src="__PUBLIC__/Uploads/qrcode_430.jpg"/> </div> </body> </html>'),/*v:25*/
a("Index_shop",'<html> <head> <meta http-equiv="Content-type" content="text/html; charset=utf-8"> <meta name="viewport" content="width=100%, initial-scale=1, minimum-scale=1, maximum-scale=1"> <meta name="apple-mobile-web-app-capable" content="yes"> <title id="oti">{:C(\'PROJECT_NAME\')}</title> <link rel="stylesheet" href=\'{:U("Home/Min/Index","g=appCss")}\'>  <link rel="stylesheet" href="__CSS__/icon/iconfont.css"> <if condition="APP_DEBUG eq true"> <link rel="stylesheet" href="__CSS__/weui.min.css"> <else/> <link href="//cdn.bootcss.com/weui/0.4.3/style/weui.min.css" rel="stylesheet"> </if> </head> <body> <div id="main"> <div class="pi_sousuo1" style=""> <div class="weui_cells" style="margin-top:0px;"> <div class="weui_cell weui_cell_select weui_select_before"> <div class="weui_cell_hd"> <select class="weui_select" style="width:85px;padding-left:10px;" name="searchContentType" id="searchContentType"> <option value="shop">\u5e97\u94fa</option> <option value="product">\u4ea7\u54c1</option> </select> </div> <div class="weui_cell_bd weui_cell_primary"> <input class="pi_input" placeholder="\u8bf7\u8f93\u5165\u5e97\u94fa\u6216\u4ea7\u54c1\u540d\u79f0" style=""> <span class="pi_sousuo2" style="" onclick="searchShop();">\u641c\u7d22</span> </div> </div> </div> </div> <div style="padding:5px 14px;background-color: #f5f5f5;"> <i class="iconfont" style="color:A9A9A9;">&#xe600;</i> <span id="pi_address" style=""></span> </div> <div class="shop-list" id="mod-desc"> </div> </div> <div id="page_tag_load"><img src="__IMG__/ajax-loader.gif" alt="loader"></div> <script> var data = { \'wxConfig\': {$wxConfig? $wxConfig : \'[]\'}, \'config\': {$config? $config : \'[]\'}, \'user\': {$user? $user : \'[]\'}, \'ads\': {$ads? $ads : \'[]\'}, \'menu\': {$menu? $menu : \'[]\'}, \'product\': {$product? $product : \'[]\'}, \'baseUrl\': \'__APP__\', \'uploadsUrl\': \'__PUBLIC__/Uploads/\', \'imageUrl\': \'__IMG__\', \'shopId\': \'\', } console.log(data); </script> <if condition="APP_DEBUG eq true"> <script src="__JS__/jquery.min.js"></script> <script src="__JS__/swiper.min.js"></script> <script src="__JS__/jweixin-1.0.0.js"></script> <else/> <script src="//cdn.bootcss.com/jquery/3.0.0/jquery.min.js"></script> <script src="//cdn.bootcss.com/Swiper/3.0.4/js/swiper.min.js"></script> <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script> </if> <script src=\'{:U("Home/Min/Index","g=appJs")}\'></script>   <script> $(\'#page_tag_load\').show(); wx.config({ debug: false, // \u5f00\u542f\u8c03\u8bd5\u6a21\u5f0f,\u8c03\u7528\u7684\u6240\u6709api\u7684\u8fd4\u56de\u503c\u4f1a\u5728\u5ba2\u6237\u7aefalert\u51fa\u6765\uff0c\u82e5\u8981\u67e5\u770b\u4f20\u5165\u7684\u53c2\u6570\uff0c\u53ef\u4ee5\u5728pc\u7aef\u6253\u5f00\uff0c\u53c2\u6570\u4fe1\u606f\u4f1a\u901a\u8fc7log\u6253\u51fa\uff0c\u4ec5\u5728pc\u7aef\u65f6\u624d\u4f1a\u6253\u5370\u3002 appId: data.wxConfig.appId, // \u5fc5\u586b\uff0c\u516c\u4f17\u53f7\u7684\u552f\u4e00\u6807\u8bc6 timestamp: data.wxConfig.timestamp, // \u5fc5\u586b\uff0c\u751f\u6210\u7b7e\u540d\u7684\u65f6\u95f4\u6233 nonceStr: data.wxConfig.nonceStr, // \u5fc5\u586b\uff0c\u751f\u6210\u7b7e\u540d\u7684\u968f\u673a\u4e32 signature: data.wxConfig.signature,// \u5fc5\u586b\uff0c\u7b7e\u540d\uff0c\u89c1\u9644\u5f551 jsApiList: [\'getLocation\'] // \u5fc5\u586b\uff0c\u9700\u8981\u4f7f\u7528\u7684JS\u63a5\u53e3\u5217\u8868\uff0c\u6240\u6709JS\u63a5\u53e3\u5217\u8868\u89c1\u9644\u5f552 }); wx.ready(function () { wx.getLocation({ type: \'wgs84\', // \u9ed8\u8ba4\u4e3awgs84\u7684gps\u5750\u6807\uff0c\u5982\u679c\u8981\u8fd4\u56de\u76f4\u63a5\u7ed9openLocation\u7528\u7684\u706b\u661f\u5750\u6807\uff0c\u53ef\u4f20\u5165\'gcj02\' success: function (res) { lat = res.latitude; // \u7eac\u5ea6\uff0c\u6d6e\u70b9\u6570\uff0c\u8303\u56f4\u4e3a90 ~ -90 lng = res.longitude; // \u7ecf\u5ea6\uff0c\u6d6e\u70b9\u6570\uff0c\u8303\u56f4\u4e3a180 ~ -180\u3002 var speed = res.speed; // \u901f\u5ea6\uff0c\u4ee5\u7c73/\u6bcf\u79d2\u8ba1 var accuracy = res.accuracy; // \u4f4d\u7f6e\u7cbe\u5ea6 locationmy(lat, lng); shopList(lat, lng); } }); }) function locationmy(lat, lng) { // lng = 113.650035;//\u7528\u6237\u7ecf\u5ea6 // lat = 34.7854;//\u7528\u6237\u7eac\u5ea6 var script = document.createElement(\'script\'); script.type = \'text/javascript\'; script.src = \'http://restapi.amap.com/v3/geocode/regeo?output=json&location=\' + lng + \',\' + lat + \'&key=22f9022b217b7d764f5befb4aa74456f&radius=1000&extensions=all&callback=renderOption\'; document.head.appendChild(script); } function renderOption(response) { document.getElementById(\'pi_address\').innerHTML = response.regeocode.formatted_address; } </script> </body> </html>'),/*v:5*/
a("itemsDetail-container",'<div class="detail" id="itemsDetail"> <div class="container-gird"> <div class="swiper-container" style="height: 200px">  <input type="hidden" id="productMainImage"> <div class="swiper-wrapper productsContainer">  </div>  <div class="swiper-scrollbar"></div> </div> <div class="detail-image-container contentCenter"> </div> <div class="detail-msg"> <span class="single-name"></span>  </div> <div class="detail-msg"> <span class="detail-price"> <span class="new-price">\uffe5<span></span></span> </span> <span class="detail-label"></span> </div> <div class="detail-msg none" style="padding-bottom: 12px;" id="product-attr"> <span class="detail-attr"> <span>\u5546\u54c1\u5c5e\u6027</span><br/> <span id="detail-attr-btn"></span> </span> </div> <div class="select-area" id="addCartBtn" style="display: none"> <button class="addItem btn-shopping" onclick=""><i class="ico ico-shop"></i>\u6dfb\u52a0\u5230\u8d2d\u7269\u8f66</button> </div> <div class="select-area" id="soldOut" style="display: none"> <span style="float: right;color: #646464;">\u5df2\u552e\u7f44</span> </div> </div> <div class="detail-content"> <input type="hidden" name="detail-id" id="detail-id" class="detail-id"> <div class="container-gird"> <p class="detail-score detail-item">\u8d60\u9001\u79ef\u5206\uff1a<span style="font-weight: normal;"></span></p> </div> <div class="container-gird"> <p class="detail-unit detail-item">\u51fa\u552e\u5355\u4f4d\uff1a<span id="sale-unit" style="font-weight: normal;"></span><span style="font-weight: normal;">(\u672c\u4e3a\u9ed8\u8ba4\u5355\u4f4d\u3002\u9664\u975e\u5546\u54c1\u5c5e\u6027\u4e2d\u53e6\u884c\u6307\u5b9a\u3002)</span></p> </div> <div class="container-gird"> <p class="detail-title detail-item">\u5546\u54c1\u8be6\u60c5</p> <div></div> </div> <div class="container-gird"> <p class="detail-commit detail-item">\u5546\u54c1\u8bc4\u8bba</p> <div style="text-align: center"> <ul id="commentList"> </ul>  </div> </div> </div> <div class="backToTop"> <div class="backToTop-inner" onclick="backToTop()"> <i class="ico ico-top"></i><span>\u56de\u5230\u9876\u90e8</span> </div> </div> </div> <div id="shopmenu-cart"> <div id="shopmenu-cart-bar" class="shopmenu-cart-bar"> <div class="row-num" onclick="location.href=\'#/cart\'" ng-class="shopCartAnimate"><em class="cart-count " id="shopcart-tip" style="display:none">1</em> </div> <div class="row-cart"> <div class="price-info"> <div class="cart-price">\u5171&nbsp;\xa5<span id="shopcart-totalPrice">0.00</span>\u5143</div> <div class="cart-premium" style="display: none;"></div> </div> <a class="row-status" style="display: none;">\u5dee\xa58\u8d77\u9001</a> </div> <a class="row-status" id="shopcart-sure" onclick="openCartsure()" style="display: none;">\u9009\u597d\u4e86</a> </div> </div>'),/*v:1*/
a("login-container",function(a){"use strict";var b=this,c=(b.$helpers,b.$escape),d=a.title,e="";return e+='<div class="container-gird"> <div class="login-header"> <center><h3>',e+=c(d),e+='</h3></center> <span class="login-tips">\u6e29\u99a8\u63d0\u793a\uff1a\u8d26\u53f7\u6ce8\u518c\u652f\u6301App\u7aef\u767b\u5f55</span> </div> <div class="login-form"> <table style="width:100%;"> <tbody> <tr> <td style="text-align:left;width:30%;"><label>\u624b\u673a\u53f7\uff1a</label></td> <td colspan="2" style="text-align:left;width:60%;"><input style="width:86%;" type="text" name="loginPhone" id="loginPhone"></td> <td style="width:10%"><span class="clear-input" onclick="empty(\'loginPhone\');"></span></td> </tr> <tr> <td style="text-align:left;width:30%;"><label>\u5bc6&nbsp;&nbsp;&nbsp;&nbsp;\u7801\uff1a</label></td> <td colspan="2" style="text-align:left;width:60%;"><input style="width:86%;" type="password" name="loginPassword" id="loginPassword"></td> <td style="width:10%"><span class="clear-input" onclick="empty(\'loginPassword\');"></span></td> </tr> </tbody> </table> <table style="width:100%;padding: 5% 0;"> <tbody> <tr> <td> <button id="login" class="mybtn" onclick="login()" style="width:100%;">\u767b \u5f55</button> </td> </tr> <tr> <td style="text-align:left"> <button class="back" style="width:15%;" onclick="openRegister()">\u6ce8 \u518c</button> <button class="forgetPassword" style="float:right" onclick="openForgetPassword()">\u627e\u56de\u5bc6\u7801?</button> </td> </tr> </tbody> </table> </div> </div>',new k(e)}),/*v:5*/
a("orderItems",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.orders,e=(a.value,a.index,b.$escape),f="";return c(d,function(a){f+=' <li><span style="color:#16aad8;">',f+=e(a.shop.name),f+="</span> </li> "}),f+=" ",new k(f)})}();
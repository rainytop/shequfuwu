/**
 * Created by heqing on 15/1/13.
 */
$(document).ready(function () {
    var cookie = $.cookie("load");
    if (cookie) {
        cookie = JSON.parse(cookie);
        cartData = cookie.cartData;
        totalPrice = cookie.totalPrice;
        totalNum = cookie.totalNum;

        $("#shopcart-tip").show();
        $("#shopcart-tip").html(totalNum);
        if (totalNum == 0) {
            $("#shopcart-tip").hide();
        }
    }

    // js路由
    Path.map("#/index").to(function () {
        $(".navigation-wrap").show();
        $('#nav-ads').click();
        var mySwiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            autoplay: 5000,//可选选项，自动滑动
        });
        var html = "<script src= '" + data.jsUrl + "/wechatShare.js' />";
        $("#wechatShareJS").html(html);
    });
    Path.map("#/product").to(function () {
        $('#nav-product').click();
        var html = "<script src= '" + data.jsUrl + "/wechatShare.js' />";
        $("#wechatShareJS").html(html);
    });
    Path.map("#/product/:id").to(function () {
        var id = this.params['id'];
        clickItemDetail(id);
    });
    Path.map("#/groupbuy/:id").to(function () {
        var id = this.params['id'];
        clickGroupBuyDetail(id);
    });
    Path.map("#/cart").to(function () {
        $('#nav-cart').click();
        var html = "<script src= '" + data.jsUrl + "/wechatShare.js' />";
        $("#wechatShareJS").html(html);
    });
    Path.map("#/order/:id").to(function () {
        var id = this.params['id'];
        displayOrderResult(id);
    });
    Path.map("#/user").to(function () {
        $('#nav-user').click();
        var html = "<script src= '" + data.jsUrl + "/wechatShare.js' />";
        $("#wechatShareJS").html(html);
    });
    Path.map("#/selectShop").to(function () {
        selectShop();
        var html = "<script src= '" + data.jsUrl + "/wechatShare.js' />";
        $("#wechatShareJS").html(html);
    });
    Path.map("#/showShopInfo").to(function () {
        showShopInfo();
        var html = "<script src= '" + data.jsUrl + "/wechatShare.js' />";
        $("#wechatShareJS").html(html);
    });
    Path.root("#/index");
    Path.listen();
    // $("#selectShop12").click();
    // selectShop();
    // $("#nav-cart").click();

    //下拉刷新懒加载店铺
    // var lazyNum = 1;
    // $(window).scroll(function () {
    //     var doc = document,
    //     win = window,
    //     scrollBottom = $(doc).height() - $(win).height() - $(win).scrollTop();
    //     if(scrollBottom<30){
    //         lazyNum++;
    //         lazyShop(lazyNum);
    //     }
    // });
});

var lng = '';//用户经度
var lat = '';//用户纬度
function locationmy() {
    // lng = 113.650035;//用户经度
    // lat = 34.7854;//用户纬度
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://restapi.amap.com/v3/geocode/regeo?output=json&location=' + lng + ',' + lat + '&key=22f9022b217b7d764f5befb4aa74456f&radius=1000&extensions=all&callback=renderOption';
    document.head.appendChild(script);
}
function renderOption(response) {
    document.getElementById('pi_address').innerHTML = response.regeocode.formatted_address;
}

// 微信定位
var appIdo = ''; // 必填，公众号的唯一标识
var timestampo = ''; // 必填，生成签名的时间戳
var nonceStro = ''; // 必填，生成签名的随机串
var signatureo = '';// 必填，签名，见附录1


wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.wxConfig.appId, // 必填，公众号的唯一标识
    timestamp: data.wxConfig.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.wxConfig.nonceStr, // 必填，生成签名的随机串
    signature: data.wxConfig.signature,// 必填，签名，见附录1
    jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
//pidong 打开多店铺
function selectShop() {
    tabTmpl("select-shop");
    $(".navigation-wrap").hide();
    var firstOpen = data.config.id;
    if (firstOpen != 0 && firstOpen != undefined && firstOpen != '') {
        $("#pi_back").show();
    } else {
        $("#pi_back").hide();
    }
    wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
            lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            lng = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
            locationmy();
            //shopList();
            searchShop();
        }
    });
}

function showShopInfo() {
    tabTmpl("show-shopinfo");
}


/**
 * 本地商城
 * @param pageIndex
 * @param saletype int 销售类型零售还是批发
 */
function areaShops(saletype, pageIndex, searchShopCategory) {
    var name = $('.pi_input').val();
    var category = searchShopCategory;

    var city = $('#citySelector').val();

    if (!pageIndex) {
        pageIndex = 1;
    }

    var postData = {
        name: name,
        city: city,
        category: category,
        pageIndex: pageIndex,
        saletype: saletype,
    };

    ajaxRenderShops("/General/Biz/getAreaShops", postData, pageIndex);
}

// function areaShopsByCategory(saletype, pageIndex) {
//     var name = "";
//     var category = ''; //TODO
//
//     var city = $('#citySelector').val();
//
//     if (!pageIndex) {
//         pageIndex = 1;
//     }
//
//     var postData = {
//         name: name,
//         city: city,
//         category: category,
//         pageIndex: pageIndex,
//         saletype: saletype,
//     };
//
//     ajaxRenderShops("/General/Biz/getAreaShops", postData, pageIndex);
// }

function excellentShops(pageIndex) {
    var name = $('.pi_input').val();
    var category = ''; //TODO

    var city = $('#citySelector').val();

    if (!pageIndex) {
        pageIndex = 1;
    }

    var postData = {
        name: name,
        city: city,
        category: category,
        pageIndex: pageIndex,
    };

    ajaxRenderShops("/General/Biz/getExcellentShops", postData, pageIndex);
}

function ajaxRenderShops($postAction, $postData, pageIndex) {
    $.ajax({
        type: "post",
        url: data.baseUrl + $postAction,
        data: $postData,
        success: function (res) {
            var html = '';
            if (res == null || res == "") {
                html = '已经没有更多信息了:)<br/>';
            } else {
                var dataSending = {
                    shopes: res,
                    jsData: data,
                    uploadsUrl: data.uploadsUrl,
                    imageUrl: data.imageUrl
                };
                html = template("shopItems", dataSending);
            }

            if (pageIndex == 1) {
                $('#mod-desc').html(html);
            } else {
                $('#mod-desc').append(html);
            }
        },
        beforeSend: function () {
            $('#page_tag_load').show();
        },
        complete: function () {
            $('#page_tag_load').hide();
        }
    });
}

/**
 * 根据定位获取附近的店铺
 */
function searchShop() {
    var name = $('.pi_input').val();
    var searchContentType = $('#searchContentType').val();

    $.ajax({
        type: "post",
        url: data.baseUrl + "/General/Biz/getShopList",
        data: {
            name: name,
            searchContentType: searchContentType,
            lng: lng,
            lat: lat,
        },
        success: function (res) {
            var dataSending = {
                shopes: res,
                jsData: data,
                uploadsUrl: data.uploadsUrl,
                imageUrl: data.imageUrl
            };

            var html = '';
            if (searchContentType == 'shop') {
                html = template("shopItems", dataSending);
            } else {
                html = template("shopItemsWithProduct", dataSending);
            }

            $('#mod-desc').html(html);
        },
        beforeSend: function () {
            $('#page_tag_load').show();
        },
        complete: function () {
            $('#page_tag_load').hide();
        }
    });
}

//pidong 打开当前店铺
function openTHisShop(id) {
    window.location.href = data.baseUrl + "/App/Index/index/shopId/" + id;
    initShop(id);
}

function setShopID(id) {
    set("shopId", id);
}

function initShop(id) {
    set("shopId", id);
    cartData = [];
    totalNum = 0;
    totalPrice = 0;
    payment = -1;
    initProduct();
}

function set(key, data) {
    return window.localStorage.setItem(key, window.JSON.stringify(data));
}
function get(key) {
    return window.JSON.parse(window.localStorage.getItem(key));
}
function remove(key) {
    return window.localStorage.removeItem(key);
}

function backToTop() {
    $("html,body").animate({scrollTop: 0}, 200);
}

function displayOrderResult(id) {
    $.ajax({
        type: "get",
        url: data.baseUrl + "/App/Order/getOrder",
        data: {
            id: id
        },
        success: function (data) {
            $('#nav-cart').click();
            tabTmpl("orderResult-container");
            $(".header-title").html("支付结果");

            $('#result-order-no').html(data.orderid);
            $('#items-order-result').find('.date').html(data.time);
            $('#items-order-result').find('.freight').html(data.freight);
            if (data.totalprice >= data.full) {
                $('#items-order-result').find('.discount').html(data.discount);
            }
            $('#items-order-result').find('.totalscore').html(data.totalscore);
            $('#items-order-result').find('.total').children().html(data.totalprice);

            if (data.pay_status == 1) {
                $('#status').html("支付成功");
            } else {
                $('#status').html("未支付");
            }

            var json = eval(data.detail);
            var html = '';
            $.each(json, function (index, value) {
                var sku = '';
                if (parseInt(value.sku_id)) {
                    sku = '（' + value.sku_name + '）';
                }
                html += '<li><span class="order-item-name">' + value.name + sku + '</span><span class="order-item-price">￥' + value.price + '</span><span class="order-item-amount">' + value.num + '份</span></li>';
            });
            $('#item-order-list ul').html(html);
        },
        beforeSend: function () {
            $('#page_tag_load').show();
        },
        complete: function () {
            $('#page_tag_load').hide();
        }
    });
}

function doCart(obj, id, name, price, skuIs) {
    if ($('#itemsDetail').length > 0) {
        if (skuIs == "") {
            var flag = 0;
            $.each(cartData, function (index, value) {
                if (value.id == id) {
                    flag = 1;
                    value.num++;
                    return;
                }
            });
            if (flag == 0) {
                var current = '{"id":"' + id + '","name":"' + name + '","num":"' + 1 + '","price":"' + price + '"}';
                cartData.push(JSON.parse(current));
            }
        } else {
            if (sku.product_id != id) {
                alert("error");
                return;
            }

            var flag = 0;
            $.each(cartData, function (index, value) {
                if (value.id == id && value.sku_id == sku.sku_id) {
                    flag = 1;
                    value.num++;
                    return;
                }
            });
            if (flag == 0) {
                var current = '{"id":"' + id + '","name":"' + name + '","num":"' + 1 + '","price":"' + sku.price + '","sku_name":"' + sku.sku_name + '","sku_id":"' + sku.sku_id + '"}';
                cartData.push(JSON.parse(current));
            }
        }
        // console.log(cartData);
        initProduct();
        return;
    } else {
        var flag = 0;
        $.each(cartData, function (index, value) {
            if (value.id == id) {
                flag = 1;
                value.num++;
                return;
            }
        });
        if (flag == 0) {
            var current = '{"id":"' + id + '","name":"' + name + '","num":"' + 1 + '","price":"' + price + '"}';
            cartData.push(JSON.parse(current));
        }
        // console.log(cartData);
        initProduct();
        return;
    }
}
function initProduct() {
    $.each($('#items').children(), function (index, value) {
        $(this).find('.numbers-minus').hide();
        $(this).find('.numbers').hide();
        $(this).find('.numbers').val(0);
    });
    $.each(cartData, function (index, value) {
        $('#items').find('li[label-id="' + value.id + '"]').find('.numbers-minus').show();
        $('#items').find('li[label-id="' + value.id + '"]').find('.numbers').show();
        $('#items').find('li[label-id="' + value.id + '"]').find('.numbers').val(value.num);

        $('#product-hot').find('li[label-id="' + value.id + '"]').find('.numbers-minus').show();
        $('#product-hot').find('li[label-id="' + value.id + '"]').find('.numbers').show();
        $('#product-hot').find('li[label-id="' + value.id + '"]').find('.numbers').val(value.num);
    });
    initCartDate();
}

function initCartDate() {
    totalNum = 0;
    totalPrice = 0;

    $.each(cartData, function (index, value) {
        totalNum += parseInt(value.num);
        totalPrice += parseFloat(value.price) * value.num;
    });

    totalPrice = (parseFloat(totalPrice) + parseFloat(data.config.freight)).toFixed(2);

    if (totalPrice > parseFloat(data.config.full)) {
        totalPrice = (totalPrice - parseFloat(data.config.discount)).toFixed(2);
    }
    $('#shopcart-tip').show();
    $('#shopcart-sure').show();
    $('#shopcart-tip').html(totalNum);
    $('#shopcart-totalPrice').html(totalPrice);
    if (totalNum == 0) {
        $('#shopcart-tip').hide();
        $('#shopcart-sure').hide();
        $('#shopcart-totalPrice').html(0);
    }

    var cookie = {
        cartData: cartData,
        totalPrice: totalPrice,
        totalNum: totalNum,
    };
    $.cookie("load", JSON.stringify(cookie), {path: "/"});
}

function clickItemDetail(id) {
    tabTmpl("itemsDetail-container");
    backContainer = "product-container";
    if (totalNum != 0) {
        $('#shopcart-tip').show();
        $('#shopcart-tip').html(totalNum);
    }
    // pushHistory();

    //attr = {};
    $.ajax({
        type: "get",
        url: data.baseUrl + "/App/Shop/getProduct",
        data: {
            id: id
        },
        success: function (res) {
            var json = eval(res);
            $('#itemsDetail .single-name').html(json.name);
            $('#itemsDetail .new-price').children().html(json.price);
            $('#itemsDetail .detail-label').children().html(json.label);
            $('#itemsDetail .detail-title').next().html(json.detail);
            $('#itemsDetail .detail-score').children().html(json.score);
            $('#itemsDetail #sale-unit').html(json.unit);
            $('#itemsDetail #detail-id').val(json.id);
            $('#itemsDetail #productMainImage').val(data.uploadsUrl + json.savepath + json.savename);
            $('#itemsDetail .addItem.btn-shopping').attr("onclick", 'doCart(this ,' + json.id + ',\'' + json.name + '\',' + json.price + ',\'\')');

            $('#product-attr').hide();

            if (json.status == 1) {
                $('#itemsDetail #addCartBtn').show();
                $('#itemsDetail .addItem.btn-shopping').attr("onclick", 'doCart(this ,' + json.id + ',\'' + json.name + '\',' + json.price + ',' + json.sku.length + ')');
            } else {
                $('#itemsDetail #soldOut').show();
            }

            if (json.sku.length) {
                var html = '';
                $.each(json.sku, function (index, value) {
                    html += '<p class="attr-btn" onclick="addAttr(this , ' + json.id + ' ,' + value.id + ' , \'' + value.name + '\', \'' + value.price + '\')">' + value.name + '</p>';
                });
                $('#itemsDetail #detail-attr-btn').html(html);
                $('#product-attr').show();
            }

            if (json.albums == "") {
                var topimage = [];
                topimage.push(JSON.parse('{"savename":"' + json.savename + '","savepath":"' + json.savepath + '"}'));
                json.albums = topimage;
            }

            var html = '';
            $.each(json.albums, function (index, value) {
                html += '<div class="swiper-slide" style="text-align: -webkit-center;"><img style="height: 200px" src="' + data.uploadsUrl + value.savepath + value.savename + '"></div>';
            });
            $('#itemsDetail .swiper-wrapper').html(html);

            initCartDate();
            $('#items-total-price').html(totalPrice);

            if (res.comment != null) {
                json = eval(res.comment);
                var html = '';
                $.each(json, function (index, value) {
                    html += '<li><span class="commit_left">' + value.user_name + '</span><span class="commit_right">' + value.name + '</span></li>';
                });
                $('#commentList').html(html);
            } else {
                $('#commentList').html('');
            }

            var html = "<script src= '" + data.jsUrl + "/wechatShare.js' />";
            $("#wechatShareJS").html(html);
        },
        beforeSend: function () {
            $('#page_tag_load').show();
        },
        complete: function () {
            $('#page_tag_load').hide();

            var mySwiper = new Swiper('.swiper-container', {
                direction: 'horizontal',
                loop: true,

                // 如果需要分页器
                pagination: '.swiper-pagination',

                // 如果需要滚动条
                scrollbar: '.swiper-scrollbar'
            });

            $('.attr-btn').first().click();
        }
    });
}

var sku = {};
function addAttr(obj, product_id, sku_id, sku_name, price) {
    $('.attr-btn').css("background-color", "#ffffff");
    $('.attr-btn').css("color", "#000000");
    $(obj).css("background-color", "#FF4146");
    $(obj).css("color", "#ffffff");
    $('.new-price').children().html(price);

    sku.product_id = product_id;
    sku.sku_name = sku_name;
    sku.sku_id = sku_id;
    sku.price = price;

    //更新sku的图片
    $.ajax({
        type: "get",
        url: data.baseUrl + "/App/Shop/getSku",
        data: {
            id: sku_id
        },
        success: function (res) {
            var json = eval(res);
            var imgSrc = '';
            if (json.savename) {
                imgSrc = data.uploadsUrl + json.savepath + json.savename;
                var html = '<img class="detail-image contentCenter" style="height:200px" src="' + imgSrc + '">';
                $('#itemsDetail .detail-image-container').html(html);
                //$('#itemsDetail .detail-image').attr('style', "height:200px");
                //$('#itemsDetail .detail-image').attr('src', imgSrc);
            } else {
                //$('#itemsDetail .detail-image').attr('style', "height:0px");
                $('#itemsDetail .detail-image-container').html('');
            }
        }
    });
}

function addproductNum(obj, id, sku_id) {
    var productNum = 0;
    $.each(cartData, function (index, value) {
        if (sku_id == 0) {
            if (value.id == id) {
                productNum = value.num;
                value.num++;
                if (productNum == 1) {
                    $(obj).prev().prev().removeClass('disabled');
                }
            }
        } else {
            if (value.id == id && value.sku_id == sku_id) {
                productNum = value.num;
                value.num++;
                if (productNum == 1) {
                    $(obj).prev().prev().removeClass('disabled');
                }
            }
        }

    });
    productNum++;
    $(obj).prev().val(productNum);
    $(obj).parent().prev().find('.item-amount').html(productNum);
    initCartDate();
    $('#items-total-price').html(totalPrice);
}
function reducehotproductNum(obj, id, sku_id) {
    var productNum = 0;
    $.each(cartData, function (index, value) {
        if (sku_id == 0) {
            if (value.id == id) {
                productNum = value.num;
                value.num--;
                if (value.num == 0) {
                    cartData.splice(index, 1);
                    initProduct();
                    $('#items-total-price').html(totalPrice);
                    $('#product-hot').find('li[label-id="' + value.id + '"]').find('.numbers-minus').hide();
                    $('#product-hot').find('li[label-id="' + value.id + '"]').find('.numbers').hide();
                    $('#item').find('li[label-id="' + value.id + '"]').find('.numbers-minus').hide();
                    $('#item').find('li[label-id="' + value.id + '"]').find('.numbers').hide();
                    return;
                }
                if (productNum == 1) {
                    $(obj).addClass('disabled');
                }
            }
        } else {
            if (value.id == id && value.sku_id == sku_id) {
                productNum = value.num;
                value.num--;
                if (value.num == 0) {
                    cartData.splice(index, 1);
                    initProduct();
                    $('#items-total-price').html(totalPrice);
                    $('#product-hot').find('li[label-id="' + value.id + '"]').find('.numbers-minus').hide();
                    $('#product-hot').find('li[label-id="' + value.id + '"]').find('.numbers').hide();
                    $('#item').find('li[label-id="' + value.id + '"]').find('.numbers-minus').hide();
                    $('#item').find('li[label-id="' + value.id + '"]').find('.numbers').hide();
                    return;
                }
                if (productNum == 1) {
                    $(obj).addClass('disabled');
                }
            }
        }
    });
    productNum--;
    $(obj).next().val(productNum);
    $(obj).parent().prev().find('.item-amount').html(productNum);
    initCartDate();
    $('#items-total-price').html(totalPrice);
}


function reduceproductNum(obj, id, sku_id) {
    var productNum = 0;
    $.each(cartData, function (index, value) {
        if (sku_id == 0) {
            if (value.id == id) {
                productNum = value.num;
                value.num--;
                if (value.num == 0) {
                    cartData.splice(index, 1);
                    $(obj).parent().parent().parent().remove();
                    initProduct();
                    $('#items-total-price').html(totalPrice);

                    if (cartData.length == 0) {
                        $('#nav-product').click();
                    }
                    return;
                }
                if (productNum == 1) {
                    $(obj).addClass('disabled');
                }
            }
        } else {
            if (value.id == id && value.sku_id == sku_id) {
                productNum = value.num;
                value.num--;
                if (value.num == 0) {
                    cartData.splice(index, 1);
                    $(obj).parent().parent().parent().remove();
                    initProduct();
                    $('#items-total-price').html(totalPrice);

                    if (cartData.length == 0) {
                        $('#nav-product').click();
                    }
                    return;
                }
                if (productNum == 1) {
                    $(obj).addClass('disabled');
                }
            }
        }
    });
    productNum--;
    $(obj).next().val(productNum);
    $(obj).parent().prev().find('.item-amount').html(productNum);
    initCartDate();
    $('#items-total-price').html(totalPrice);
}

function deleteProduct(obj, id, sku_id) {
    $.each(cartData, function (index, value) {
        if (sku_id == 0) {
            if (value.id == id) {
                cartData.splice(index, 1);
                $(obj).parent().parent().parent().remove();
                initProduct();
                $('#items-total-price').html(totalPrice);

                if (cartData.length == 0) {
                    $('#nav-product').click();
                }
                return;
            }
        } else {
            if (value.id == id && value.sku_id == sku_id) {
                cartData.splice(index, 1);
                $(obj).parent().parent().parent().remove();
                initProduct();
                $('#items-total-price').html(totalPrice);

                if (cartData.length == 0) {
                    $('#nav-product').click();
                }
                return;
            }
        }
    });
}

function clickGroupBuyDetail(id) {
    tabTmpl("groupBuyDetail-container");

    $.ajax({
        type: "get",
        url: data.baseUrl + "/General/Biz/getGroupBuy",
        data: {
            id: id
        },
        success: function (res) {
            var json = eval(res);

            var maxCountCanBuy = 0;
            if (json.soldcount >= json.piececount) {
                maxCountCanBuy = 0;
            } else {
                maxCountCanBuy = json.piececount - json.soldcount;
            }

            $('#itemsDetail #detail-id').val(json.id);
            $('#itemsDetail .single-name').html(json.name);

            var price = "单份价格为" + json.totalprice + "元，在线支付" + json.prepayprice + "元，剩余费用货到付款。";
            $('#itemsDetail .detail-price').html(price);
            $('#itemsDetail .detail-memo').next().html(json.memo);

            var mainImageUrl = data.uploadsUrl + json.savepath + json.savename;
            var mainImage = "<img src='" + mainImageUrl + "'>";
            $('#itemsDetail #productMainImage').val(mainImageUrl);
            $(".detail-image-container").html(mainImage);

            if (json.soldcount == null) {
                json.soldcount = 0;
            }
            var saleinfo = "本次拼团共" + json.piececount + "份，现已经售出" + json.soldcount + "份。";
            $('#itemsDetail #sale-info').html(saleinfo);

            $('#itemsDetail .addItem.btn-shopping').attr("doCartOfGroupBuy", 'doCart(this ,' + json.id + ',\'' + json.name + '\',' + json.totalprice + ',' + json.prepayprice + ',' + maxCountCanBuy + ')');
            $('#itemsDetail .numbers-add').attr("onclick", 'doCartOfGroupBuy(this ,' + json.id + ',\'' + json.name + '\',' + json.totalprice + ',' + json.prepayprice + ',' + maxCountCanBuy + ')');
            $('#itemsDetail .numbers-minus').attr("onclick", 'reduceGroupBuyNum(this ,' + json.id + ', false)');

            $('#items-total-price').html(totalPrice);


            var countInGroupBuyCart = 0;
            $.each(cartDataOfgroupBuy, function (index, value) {
                if (value.id == json.id) {
                    countInGroupBuyCart = value.num;
                    return;
                }
            });

            if (countInGroupBuyCart <= 0) {
                $('#itemsDetail .numbers-minus').addClass('disabled').attr("disabled", true);
            } else {
                $('#itemsDetail .numbers-minus').removeClass('disabled').attr("disabled", false);
            }

            var html = "<script src= '" + data.jsUrl + "/wechatShare.js' />";
            $("#wechatShareJS").html(html);
        },
        beforeSend: function () {
            $('#page_tag_load').show();
        },
        complete: function () {
            $('#page_tag_load').hide();
        }
    });
}


function doCartOfGroupBuy(obj, id, name, allPrice, prePrice, maxCountCanBuy) {
    var flag = 0;
    var productNum = 0;
    $.each(cartDataOfgroupBuy, function (index, value) {
        if (value.id == id) {
            flag = 1;
            value.num++;
            productNum = value.num;

            if (productNum >= maxCountCanBuy) {
                $(obj).addClass('disabled').attr("disabled", true);
            }
            return;
        }
    });
    if (flag == 0) {
        productNum = 1;
        var current = '{"id":"' + id + '","name":"' + name + '","num":"' + productNum + '","allPrice":"' + allPrice + '","prePrice":"' + prePrice + '"}';
        cartDataOfgroupBuy.push(JSON.parse(current));
    }

    $(obj).prev().val(productNum);
    $(".item-amount").html(productNum);
    if (productNum >= 1) {
        $(obj).parent().find(".numbers-minus").removeClass('disabled').attr("disabled", false);
    }

    displayGroupBuyCart();
    return;
}

function displayGroupBuyCart() {
    totalNumOfGroupBuy = 0;
    totalAllPriceOfgroupBuy = 0;
    totalPrePriceOfgroupBuy = 0;

    //console.log(cartDataOfgroupBuy);
    $.each(cartDataOfgroupBuy, function (index, value) {
        totalNumOfGroupBuy += parseInt(value.num);
        totalAllPriceOfgroupBuy += parseFloat(value.allPrice) * value.num;
        totalPrePriceOfgroupBuy += parseFloat(value.prePrice) * value.num;
    });

    totalAllPriceOfgroupBuy = (parseFloat(totalAllPriceOfgroupBuy) + parseFloat(data.config.freight)).toFixed(2);

    if (totalAllPriceOfgroupBuy > parseFloat(data.config.full)) {
        totalAllPriceOfgroupBuy = (totalAllPriceOfgroupBuy - parseFloat(data.config.discount)).toFixed(2);
    }
    $('#shopcart-tip').show();
    $('#shopcart-sure').show();
    $('#shopcart-tip').html(totalNumOfGroupBuy);
    $('#shopcart-totalAllPrice').html(totalAllPriceOfgroupBuy);
    $('#shopcart-totalPrePrice').html(totalPrePriceOfgroupBuy);
    $('#items-total-price').html(totalAllPriceOfgroupBuy);
    $('#items-total-preprice').html("/预付" + totalPrePriceOfgroupBuy);

    if (totalNumOfGroupBuy == 0) {
        $('#shopcart-tip').hide();
        $('#shopcart-sure').hide();
        $('#shopcart-totalAllPrice').html(0);
        $('#shopcart-totalPrePrice').html(0);
    }

    var cookie = {
        cartData: cartDataOfgroupBuy,
        totalAllPrice: totalAllPriceOfgroupBuy,
        totalPrePrice: totalPrePriceOfgroupBuy,
        totalNum: totalNumOfGroupBuy,
    };
    $.cookie("load4GroupBuy", JSON.stringify(cookie), {path: "/"});
}

function reduceGroupBuyNum(obj, id) {
    var productNum = 0;
    //console.log(cartDataOfgroupBuy);
    $.each(cartDataOfgroupBuy, function (index, value) {
        if (value.id == id) {
            productNum = value.num;
            value.num--;

            if (productNum == 1) {
                $(obj).addClass('disabled').attr("disabled", true);
            }

            $(obj).parent().find(".numbers-add").removeClass('disabled').attr("disabled", false);
        }
    });

    productNum--;
    $(obj).next().val(productNum);
    $(".item-amount").html(productNum)
    displayGroupBuyCart();
}

function deleteGroupBuyNum(obj, id) {
    $.each(cartDataOfgroupBuy, function (index, value) {
        if (value.id == id) {
            cartDataOfgroupBuy.splice(index, 1);
            $(obj).parent().parent().parent().remove();
            displayGroupBuyCart();

            return;
        }
    });
}

function cartNext(isGroupBuy) {
    if (cartData.length == 0 && cartDataOfgroupBuy.length == 0) {
        // alert("购物车为空,请先选择商品!");
        return;
    }

    tabTmpl("delivery-container");
    backContainer = "cart-container";
    $('.header-left').show();
    // pushHistory();

    if (isGroupBuy) {
        $(".payment-content .groupBuyPrePay").attr("style", "display:block;");
        $("#btnSubmitOrder").attr("onclick", "submitOrder(true);");

        //团购订单不可以货到付款
        $(".payment-content #cool-payment").attr("style", "display:none;");
    } else {
        $("#btnSubmitOrder").attr("onclick", "submitOrder(false);");
    }

    $(".payment-content .line").each(
        function (index, item) {
            $(this).click(function () {
                $('.payment-content').find('.radio').removeClass('selected');
                $(this).find('.radio').addClass('selected');
                payment = $(this).attr("paymentValue");
            });
        });

    $.ajax({
        type: "get",
        url: data.baseUrl + "/App/User/getContactList",
        data: {
            getProvince: true,
            shopId: data.shopId,
        },
        success: function (res) {
            // console.log(res);
            if (res) {
                if (res.code == 0) {
                    openLogin();
                    return;
                }

                if (res.province != []) {
                    var html = '';
                    var province = eval(res.province);

                    if (province != null) {
                        $.each(province, function (index, value) {
                            //html += '<option label="' + index + '" value="' + value.name + '">' + value.name + '</option>';
                            html += '<option index="' + index + '" value="' + value.name + '">' + value.name + '</option>';
                        });
                        //alert(html);
                        $('#hat_province').html(html);
                    }

                    var html4City = '';
                    if (province[0]["city"] != null) {
                        $.each(province[0]["city"], function (index, value) {
                            html4City += '<option value="' + value.name + '">' + value.name + '</option>';
                        });
                        $('#hat_city').html(html4City);
                    }
                    area = res.province;
                }

                var html = '';
                var deliveryTime = eval(data.config.delivery_time);
                $.each(deliveryTime, function (index, value) {
                    html += '<option value="' + value + '">' + value + '</option>';
                });
                $('#deliveryTime').html(html);

                if (res[0] != null) {
                    $('#username').val(res[0].name);
                    $('#tel').val(res[0].phone);
                    $('#id').val(res[0].id);
                    $('#address').val(res[0].address);

                    var label = $('#hat_province').find("option:selected").attr("label");
                    if (label) {
                        var html = '';
                        $.each(province[label]['city'], function (index, value) {
                            html += '<option value="' + value.name + '">' + value.name + '</option>';
                            $('#hat_city').html(html);
                        });
                    }
                    $('#hat_city').val(res[0].city);
                }
            }
        },
        beforeSend: function () {
            //$('#page_tag_load').show();
        },
        complete: function () {
            //$('#page_tag_load').hide();
        }
    });
}

/*订单可提交标志*/
var submitEnableFlag = true;

function submitOrder(isGroupBuy) {
    if (submitEnableFlag == false) {
        alert("请不要重复操作!");
        return;
    }
    var name = $('#username').val();
    var id = $('#id').val();
    var phone = $('#tel').val();
    var province = $('#hat_province').val();
    var city = $('#hat_city').val();
    var address = $('#address').val();
    var note = $('#note').val();
    var deliveryTime = $('#deliveryTime').val();
    var shopId = get("shopId");

    if (payment == -1) {
        alert("请选择支付方式!");
        return;
    }
    if (name.length == 0 || phone.length == 0 || address.length == 0) {
        alert("请核对输入的信息!");
        return;
    }

    var freights = data.config.freight;
    var contact = {
        "id": id,
        "name": name,
        "phone": phone,
        "province": province,
        "city": city,
        "address": address,
    }

    var orderType = 0;//0:普通订单；1：团购订单
    var cartDataLocal = [];
    var totalAllPriceLocal = 0;
    var totalPrePriceLocal = 0;
    if (isGroupBuy) {
        orderType = 1;

        cartDataLocal = cartDataOfgroupBuy;
        totalAllPriceLocal = totalAllPriceOfgroupBuy;
        totalPrePriceLocal = totalPrePriceOfgroupBuy;
        //console.log("sssss:"+totalPrePriceLocal);
    } else {
        orderType = 0;

        cartDataLocal = cartData;
        totalAllPriceLocal = totalPrice;
    }

    if (totalPrice >= data.config.full) {
        var discount = data.config.discount;
    } else {
        var discount = 0;
    }

    var order = {
        shop_id: shopId,
        remark: note,
        delivery_time: deliveryTime,
        totalprice: totalAllPriceLocal,
        freight: freights,
        payment: payment,
        discount: discount,
        totalpreprice: totalPrePriceLocal,
        ordertype: orderType,
    };

    submitEnableFlag = false;
    $.ajax({
        type: "post",
        url: data.baseUrl + "/App/Order/addOrder",
        data: {
            contact: contact,
            cartData: cartDataLocal,
            order: order
        },
        success: function (res) {
            if (res) {
                tabTmpl('orderResult-container');
                $('#result-order-no').html(res.orderid);
                $('#items-order-result').find('.date').html(res.time);
                $('#items-order-result').find('.totalscore').html(res.totalscore);
                $('#items-order-result').find('.total').children().html(res.totalprice);

                $('.freight').html(res.freight);
                $('.discount').html(res.discount);


                if (res.pay_status == 1) {
                    $('#status').html("支付成功");
                } else {
                    $('#status').html("未支付");
                }

                var json = eval(res.detail);
                var html = '';
                $.each(json, function (index, value) {
                    var sku = '';
                    if (parseInt(value.sku_id)) {
                        sku = '（' + value.sku_name + '）';
                    }
                    html += '<li><span class="order-item-name">' + value.name + sku + '</span><span class="order-item-price">￥' + value.price + '</span><span class="order-item-amount">' + value.num + '份</span></li>';
                });
                $('#item-order-list ul').html(html);

                if (isGroupBuy) {
                    cartDataOfgroupBuy = [];
                    totalNumOfgroupBuy = 0;
                    totalAllPriceOfgroupBuy = 0;
                    totalPrePriceOfgroupBuy = 0;
                    payment = -1;
                } else {
                    cartData = [];
                    totalNum = 0;
                    totalPrice = 0;
                    payment = -1;
                    initProduct();
                }

                if (res.payUrl) {
                    if (res.qrCodePay) {
                        var html = template("qrcodePay-container", {qrcode: res.payUrl});
                        $("#orderResult").append(html);
                    } else {
                        layer.open({
                            content: '请稍后,正在打开在线支付...',
                            //shade: false,
                            style: 'border-radius: 3px;text-align: center;border:0;',
                        });
                        window.location.href = res.payUrl;
                    }
                }
            } else {
                alert('提交失败!余额不足或者商品已下架,请重新选购!');
            }
        },
        beforeSend: function () {
            $('#page_tag_load').show();
            backToTop();
        },
        complete: function () {
            $('#page_tag_load').hide();
            submitEnableFlag = true;
        }
    });
}

function empty(id) {
    $('#' + id).val("");
}

function changeCity(obj) {
    var index = $(obj).find("option:selected").attr("index");
    $('#hat_city').html("");

    var html = '';
    $.each(area[index]['city'], function (index, value) {
        html += '<option value="' + value.name + '">' + value.name + '</option>';
    });

    $('#hat_city').html(html);
}

function cancelOrder(id) {
    $('#orderCancel-popup').show();
    $('#yesOrder').one('click', function () {
        $.ajax({
            type: "get",
            url: data.baseUrl + "/App/Order/setOrderStatus",
            data: {
                id: id,
                status: -1,
            },
            success: function (data) {
                $('#nav-user').click();
                $('#orderCancel-popup').hide();
            },
            beforeSend: function () {
                $('#page_tag_load').show();
            },
            complete: function () {
                $('#page_tag_load').hide();
            }

        });
    });
    $('#noOrder').one('click', function () {
        $('#orderCancel-popup').hide();
    });
}

function commentOrder(id) {
    $('#orderComment-popup').show();
    $('#yesCommit').one('click', function () {
        if ($('#comment-text').val().length == 0) {
            alert("请核对输入的信息!");
            return;
        }
        $.ajax({
            type: "post",
            url: data.baseUrl + "/App/Order/commentOrder",
            data: {
                name: $('#comment-text').val(),
                id: id
            },
            success: function (res) {
                $('#orderComment-popup').hide();
                alert(res.msg);
            },
            beforeSend: function () {
                $('#page_tag_load').show();
            },
            complete: function () {
                $('#page_tag_load').hide();
            }

        });
        $('#orderComment-popup').hide();
        $('#comment-text').val("");
    });
    $('#noCommit').one('click', function () {
        $('#orderComment-popup').hide();
        $('#comment-text').val("");
    });
}

function openLogin() {
    tabTmpl("login-container");
    $(".header-title").html("登录");
    $(".header-left").show();

    backContainer = "user-container";
}

function openRegister() {
    tabTmpl("register-container");
    $(".header-title").html("注册");
    $(".header-left").show();

    backContainer = "user-container";
}
function openForgetPassword() {
    tabTmpl("forgetPassword-container");
    $(".header-title").html("忘记密码");
    $(".header-left").show();

    backContainer = "login-container";
}

function login() {
    var phone = $('#loginPhone').val();
    var password = $('#loginPassword').val();

    if (phone.length == 0 || password.length == 0) {
        alert("请核对输入的信息!");
        return;
    }

    $.ajax({
        type: "post",
        url: data.baseUrl + "/App/User/login",
        data: {
            phone: phone,
            password: password
        },
        success: function (res) {
            if (res) {
                data.username = res.username;
                data.avater = res.image;
                $("#nav-user").click();
            } else {
                alert("登录失败!");
            }
        },
        beforeSend: function () {
            $('#page_tag_load').show();
        },
        complete: function () {
            $('#page_tag_load').hide();
        }
    });
}
function register() {
    var username = $('#registerUsername').val();
    var phone = $('#registerPhone').val();
    var password = $('#registerPassword').val();
    var password2 = $('#registerPassword2').val();

    if (password != password2) {
        alert("两次输入密码不相同!");
        return;
    }
    if (phone.length == 0 || password.length == 0) {
        alert("请核对输入的信息!");
        return;
    }

    $.ajax({
        type: "post",
        url: data.baseUrl + "/App/User/register",
        data: {
            phone: phone,
            password: password,
            username: username,
        },
        success: function (data) {
            if (data) {
                $('#nav-user').click();
            } else {
                alert("注册失败!");
            }
        },
        beforeSend: function () {
            $('#page_tag_load').show();
        },
        complete: function () {
            $('#page_tag_load').hide();
        }
    });
}

function resetPassword() {
    var username = $('#forgetUsername').val();
    var phone = $('#forgetPhone').val();
    var password = $('#forgetPassword').val();

    if (username.length == 0 || phone.length == 0 || password.length == 0) {
        alert("请核对输入的信息!");
        return;
    }

    $.ajax({
        type: "post",
        url: data.baseUrl + "/App/User/resetPassword",
        data: {
            username: username,
            phone: phone,
            password: password
        },
        success: function (data) {
            if (data) {
                alert("密码修改成功,请使用新密码登录!");
                tabTmpl("login-container");
                $(".header-title").html("注册");
            } else {
                alert("密码修改失败!");
            }
            $('#orderComment-popup').hide();
        },
        beforeSend: function () {
            $('#page_tag_load').show();
        },
        complete: function () {
            $('#page_tag_load').hide();
        }
    });
}

function payOrder(method, orderid) {
    if (method == 1) {
        window.location.href = data.baseUrl + "/App/Pay/wxPay/id/" + orderid;
    } else {
        window.location.href = data.baseUrl + "/App/Pay/alipay/id/" + orderid;
    }
}

function navSelect(o) {
    $('.navigation-item').removeClass("selected");
    $('.navigation-item').children().removeClass("selected");
    $(o).addClass("selected");
    $(o).children().addClass("selected");
}

function openAds(o) {
    navSelect(o);
    $('#shopcart-tip').show();
    $('#shopcart-tip').html(totalNum);

    tabTmpl("ads-container", "getThumb", function (filePath, fileName, width, height) {
        $.ajax({
            type: "get",
            url: data.baseUrl + "/General/Biz/getThumb",
            data: {
                savepath: filePath,
                savename: fileName,
                width: width,
                height: height,
            },
            success: function (res) {
                if (res) {
                    //return res;
                }
            }
        });
    });

    initProduct();
    // $(".header-title").show();

    var headerTitle = data.config.name;
    var shopTelephone = data.config.tel;
    if (shopTelephone) {
        headerTitle += " " + shopTelephone;
    }
    $(".header-title").html(headerTitle);
}

function tabTmpl(id, helperFuncName, helperFunc) {
    if (helperFuncName && helperFunc) {
        template.helper(helperFuncName, helperFunc);
    }

    var html = template(id, data);
    $("#main").html(html);

    $('.header-left').hide();

    echo.init({
        offset: 100,
        throttle: 250,
        unload: false,
        callback: function (element, op) {
        }
    });
    backToTop();

    menuId = 0;
}

function openProduct(o) {
    navSelect(o);
    $('#shopcart-tip').hide();

    var html = template("product-container", data);
    $("#main").html(html);

    echo.init({
        offset: 100,
        throttle: 250,
        unload: false,
        callback: function (element, op) {
        }
    });

    initProduct();

    var lastSelectedMenuID = get('lastSelectedMenuID');
    var lastSelectedOfShopID = get('lastSelectedOfShopID');

    if (lastSelectedMenuID && lastSelectedOfShopID == data.shopId) {
        switchMenu(null, lastSelectedMenuID, false);
    } else {
        $('.shop-menu li').first().click();
    }

    var swiper = new Swiper('#swiper-container', {
        slidesPerView: 3,
        spaceBetween: 0
    });
}

function openCartsure() {
    $("#nav-cart").click();
}

function openCart(o, isGroupBuy) {
    if (o) {
        navSelect(o);
    }

    tabTmpl("cart-container");

    $('#shopcart-tip').show();
    $('#shopcart-tip').html(totalNum);
    if (totalNum == 0) {
        $('#shopcart-tip').hide();
    }
    // console.log(cartData);

    var html = '';
    if (isGroupBuy) {
        $("#btnCartNext").attr("onclick", "cartNext(true);");

        $.each(cartDataOfgroupBuy, function (index, value) {
            html += '<li><div class="confirmation-item"><div class="item-info"><span class="item-name">' + value.name + '<br></span><span class="item-price-info"><span><span class="item-single-price">' + value.allPrice + '</span>×<span class="item-amount">' + value.num + '</span></span></span></div><div class="select-box"><span class="minus disabled" onclick="reduceGroupBuyNum(this,' + value.id + ')">—</span><input class="amount" type="text" name="amount" value="' + value.num + '" autocomplete="off" readonly=""><span class="add" onclick="doCartOfGroupBuy(this,' + value.id + ')">+</span></div><div class="delete"><a class="delete-btn" onclick="deleteGroupBuyNum(this,' + value.id + ')"><i class="ico ico-delete"></i></a></div></div><div class="divider"></div></li>';
        });
        $('#items-total-price').html(totalAllPriceOfgroupBuy);
        $('#items-total-preprice').html("/预付" + totalPrePriceOfgroupBuy);
    } else {
        $("#btnCartNext").attr("onclick", "cartNext(false);");

        $.each(cartData, function (index, value) {
            var sku = '';
            var sku_id = 0;
            if (value.sku_id) {
                sku = '（' + value.sku_name + '）';
                sku_id = value.sku_id;
            }
            html += '<li><div class="confirmation-item"><div class="item-info"><span class="item-name">' + value.name + sku + '<br></span><span class="item-price-info"><span><span class="item-single-price">' + value.price + '</span>×<span class="item-amount">' + value.num + '</span></span></span></div><div class="select-box"><span class="minus disabled" onclick="reduceproductNum(this,' + value.id + ',' + sku_id + ')">—</span><input class="amount" type="text" name="amount" value="' + value.num + '" autocomplete="off" readonly=""><span class="add" onclick="addproductNum(this,' + value.id + ',' + sku_id + ')">+</span></div><div class="delete"><a class="delete-btn" onclick="deleteProduct(this,' + value.id + ',' + sku_id + ')"><i class="ico ico-delete"></i></a></div></div><div class="divider"></div></li>';
        });
        $('#items-total-price').html(totalPrice);
    }

    $('#item-list ul').html(html);
}

function openUser(o) {
    navSelect(o);
    if (totalNum != 0) {
        $('#shopcart-tip').show();
        $('#shopcart-tip').html(totalNum);
    }

    if (data.user.length == 2) {
        openLogin();
        return;
    }

    tabTmpl("user-container");
    loadOrder(1);
}

function getBizConstText(prefix, constValue) {
    var allConsts = eval(data.bizConsts);
    for (var item in allConsts) {
        if (item.indexOf(prefix) == 0 && allConsts[item] == constValue) {
            return allConsts[item + "_TEXT"];
        }
    }

    return "";
}

function loadOrder(pageIndex) {
    $.ajax({
        type: "get",
        url: data.baseUrl + "/App/User/getUser",
        data: {
            getOrder: true,
            pageIndex: pageIndex,
            shopId: data.shopId,
        },
        success: function (res) {
            $('#balance').html("");
            if (res) {
                if (res.identity == 1) {
                    $('#identity').html('管理员');
                }
                $('#balance').html(res.money + '元');

                var scoreInShop = 0;
                if (res.scoreInShop) {
                    scoreInShop = res.scoreInShop;
                }

                scoreInShop += '分';

                if (res.medalInShop) {
                    scoreInShop += "/" + res.medalInShop;
                }
                $('#score').html(scoreInShop);

                if (res.order != undefined) {
                    var json = eval(res.order);
                    var html = '';

                    if (json.length != 0) {
                        $('.myOrderList').show();

                        template.helper("orderPayStatusFormat", function (status) {
                            return getBizConstText("ORDER_PAYSTATUS_", status);
                        });

                        template.helper("orderStatusFormat", function (status) {
                            return getBizConstText("ORDER_STATUS_", status);
                        });

                        var dataSending = {
                            orders: json,
                            jsData: data,
                            systemConfig: eval(res.systemConfig),
                        };

                        html = template("orderItems", dataSending);
                    } else {
                        html = "已经没有更多信息了:)<br/>";
                    }

                    $("#items-order-result-list>ul").append(html);
                }
            }
        },
        beforeSend: function () {
            $('#page_tag_load').show();
        },
        complete: function () {
            $('#page_tag_load').hide();
        }
    });
}

jQuery.fn.shake = function (times, offset, delay) {//次数,偏移,间隔
    this.stop().each(function () {
        var Obj = $(this);
        var marginLeft = parseInt(Obj.css('margin-left'));
        var delay = delay > 20 ? delay : 20;
        Obj.animate({'margin-left': marginLeft + offset}, delay, function () {
            Obj.animate({'margin-left': marginLeft}, delay, function () {
                times = times - 1;
                if (times > 0)
                    Obj.shake(times, offset, delay);
            })
        });

    });
    return this;
};

var backContainer = '';
function headerBack() {
    if (backContainer != '') {
        switch (backContainer) {
            case "product-container":
                $("#nav-product").click();
                backContainer = '';
                break;
            case "cart-container":
                $("#nav-cart").click();
                backContainer = '';
                break;
            case "user-container":
                $("#nav-user").click();
                backContainer = '';
                break;
            case "login-container":
                openLogin();
                break;
        }
    }
}

// function pushHistory() {
//     var state = {
//         title: "title",
//         url: "#"
//     };
//     window.history.pushState(state, "title", "");
// }

//忽略webkit load popstate事件
// pushHistory();
// window.addEventListener('load', function () {
//     setTimeout(function () {
//         window.addEventListener('popstate', function (e) {
//             var state = e.state;
//             if (state) {
//                 headerBack();
//             } else {
//                 close_wechat();
//             }
//         });
//     }, 0);
// });

// function close_wechat() {
//     if (window.confirm('你确定要离开吗?')) {
//         WeixinJSBridge.call("closeWindow");
//     } else {
//         pushHistory();
//     }
// }


//左侧菜单切换
var menuId = 0;
function switchMenu(obj, id, isManual) {
    if (!obj) {
        obj = $('#menu_li_' + id);
    }

    $(obj).removeClass("lia").addClass("lib").siblings().removeClass("lib").addClass("lia");
    $('.menu-name span').html($(obj).html());
    menuId = id;

    $.ajax({
        type: "get",
        url: data.baseUrl + "/App/Index/getProducts",
        data: {
            menuId: id
        },
        success: function (res) {

            var products = res;//eval(res);
            var dataSending = {
                products: products,
                uploadsUrl: data.uploadsUrl,
                imageUrl: data.imageUrl
            };

            template.helper("getThumb", function (filePath, fileName, width, height) {
                $.ajax({
                    type: "get",
                    url: data.baseUrl + "/General/Biz/getThumb",
                    data: {
                        savepath: filePath,
                        savename: fileName,
                        width: width,
                        height: height,
                    },
                    success: function (res) {
                        if (res) {
                            //return res;
                        }
                    }
                });
            });

            var html = template("productItems", dataSending);
            $("#productInfoItems").html(html);

            echo.init({
                offset: 100,
                throttle: 250,
                unload: false,
                callback: function (element, op) {
                }
            });
        },
        error: function () {
            // view("异常！");
            alert("网络异常，请稍后再试！");
        },
        beforeSend: function () {
            $('#page_tag_load').show();
        },
        complete: function () {
            if (isManual == true) {
                backToTop();
            } else {
                var scrollPosition = get("scrollPositionOfProductPage");
                if (scrollPosition) {
                    //$(".shop-product").animate({scrollTop: scrollPosition}, 200);
                    $("#productInfoItems").scrollTop(scrollPosition);
                } else {
                    backToTop();
                }
            }
            $('#page_tag_load').hide();
        }
    });

    //将选定的id保存起来，用于用户“返回”操作的东西
    set("lastSelectedMenuID", id);
    set("lastSelectedOfShopID", data.shopId);
}

function prevView(obj) {
    var src = $(obj).attr('osrc');
    layer.open({
        content: '<img style="width: 200px" src="' + src + '"/>'
    });
}


function openSearch() {
    var searchtxt = $("input[name = 'searchtxt']").val();
    if (!searchtxt) {
        layer.open({
            content: '请输入要查询的产品名称！'
        });
    } else {

        $.ajax({
            type: "get",
            url: data.baseUrl + "/App/Index/searchProducts",
            data: {
                keyword: searchtxt,
                shopId: data.shopId
            },
            success: function (res) {
                if (res) {
                    var products = res;//eval(res);
                    //alert(products);
                    var dataSending = {
                        products: products,
                        uploadsUrl: data.uploadsUrl,
                        imageUrl: data.imageUrl
                    };

                    template.helper("getThumb", function (filePath, fileName, width, height) {
                        $.ajax({
                            type: "get",
                            url: data.baseUrl + "/General/Biz/getThumb",
                            data: {
                                savepath: filePath,
                                savename: fileName,
                                width: width,
                                height: height,
                            },
                            success: function (res) {
                                if (res) {
                                    //return res;
                                }
                            }
                        });
                    });

                    var html = template("productItems", dataSending);
                    $("#productInfoItems").html(html);

                    $(".shop-menu .lib").removeClass("lib").addClass("lia");
                    $('.shop-product li').hide().filter(':contains("' + searchtxt + '")').show();

                } else {
                    layer.open({
                        content: '没有搜到此商品'
                    });
                }

                echo.init({
                    offset: 100,
                    throttle: 250,
                    unload: false,
                    callback: function (element, op) {
                    }
                });
                backToTop();
            },
            error: function () {
                // view("异常！");
                alert("网络异常，请稍后再试！");
            },
            beforeSend: function () {
                $('#page_tag_load').show();
            },
            complete: function () {
                $('#page_tag_load').hide();
            }
        });
    }
}
/*TMODJS:{"version":19,"md5":"638c44d93d54d1614f711b2628a3b28c"}*/
template('itemsDetail-container','<div class="detail" id="itemsDetail"> <div class="container-gird"> <div class="swiper-container" style="height: 200px"> <div class="swiper-wrapper">  </div>  <div class="swiper-scrollbar"></div> </div> <div class="detail-image-container contentCenter"> </div> <div class="detail-msg"> <span class="single-name"></span>  </div> <div class="detail-msg"> <span class="detail-price"> <span class="new-price">￥<span></span></span> </span> <span class="detail-label"></span> </div> <div class="detail-msg none" style="padding-bottom: 12px;" id="product-attr"> <span class="detail-attr"> <span>商品属性</span><br/> <span id="detail-attr-btn"></span> </span> </div> <div class="select-area" id="addCartBtn" style="display: none"> <button class="addItem btn-shopping" onclick=""><i class="ico ico-shop"></i>添加到购物车</button> </div> <div class="select-area" id="soldOut" style="display: none"> <span style="float: right;color: #646464;">已售罄</span> </div> </div> <div class="detail-content"> <div class="container-gird"> <p class="detail-score detail-item">赠送积分：<span style="font-weight: normal;"></span></p> </div> <div class="container-gird"> <p class="detail-unit detail-item">出售单位：<span id="sale-unit" style="font-weight: normal;"></span><span style="font-weight: normal;">(本为默认单位。除非商品属性中另行指定。)</span></p> </div> <div class="container-gird"> <p class="detail-title detail-item">商品详情</p> <div></div> </div> <div class="container-gird"> <p class="detail-commit detail-item">商品评论</p> <div style="text-align: center"> <ul id="commentList"> </ul>  </div> </div> </div> <div class="backToTop"> <div class="backToTop-inner" onclick="backToTop()"> <i class="ico ico-top"></i><span>回到顶部</span> </div> </div> </div> <div id="shopmenu-cart"> <div id="shopmenu-cart-bar" class="shopmenu-cart-bar"> <div class="row-num" onclick="location.href=\'#/cart\'" ng-class="shopCartAnimate"><em class="cart-count " id="shopcart-tip" style="display:none">1</em> </div> <div class="row-cart"> <div class="price-info"> <div class="cart-price">共&nbsp;¥<span id="shopcart-totalPrice">0.00</span>元</div> <div class="cart-premium" style="display: none;"></div> </div> <a class="row-status" style="display: none;">差¥8起送</a> </div> <a class="row-status" id="shopcart-sure" onclick="openCartsure()" style="display: none;">选好了</a> </div> </div>');
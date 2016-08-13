<?php
namespace App\Controller;


use Common\Model\BizConst;
use Common\Model\ViewLink;
use Common\Model\WechatBiz;
use Vendor\Hiland\Biz\Loger\CommonLoger;
use Vendor\Hiland\Utils\Data\MathHelper;
use Vendor\Hiland\Utils\DataModel\ModelMate;
use Vendor\Hiland\Utils\DataModel\ViewMate;
use Vendor\Hiland\Utils\Web\EnvironmentHelper;

class IndexController extends BaseController
{
    public function index()
    {
        $oauth2Url = "App/Public/oauthLogin";
        $user = R($oauth2Url);

        if (C('BROWSE_MUST_SUBSCRIBE')) {
            $userMate = new ModelMate('user');
            $condition = array();
            $condition['openid'] = $user['openid'];
            $userFound = $userMate->find($condition);

            if ($userFound['subscribe'] != C("USER_COMEFROM_SUBSCRIBEDWEIXINUSER")) {
                //$currentUrl= $_SERVER['REQUEST_URI'];
                //$this->assign("url",$currentUrl);
                $shopId = I("shopId");

                $shop = array();
                $shopName = '福轮网络';
                $qrUrl = "__PUBLIC__/Uploads/qrcode_430.jpg";
                if ($shopId) {
                    $shopMate = new ModelMate('shop');
                    $shop = $shopMate->get($shopId);
                    $shopName = $shop['name'];
                    $qrUrl = WechatBiz::getQRCodeUrl($shopId);
                }

                $this->assign("shopid", $shopId);
                $this->assign("shopName", $shopName);
                $this->assign('qrUrl', $qrUrl);
                $this->display('mustsubscribe');
                exit;
            }
        }

        $user = json_encode($user);
        $this->assign("user", $user);
        $shopId = I("get.shopId");
        session("shop_id", $shopId);
        $this->assign("shopId", $shopId);

        $configs = D("Config")->get();
        $config = D("Shop")->getShop(array('id' => $shopId), true);
        //$config["delivery_time"] = explode(",", $config["delivery_time"]);
        //--[将换行分隔的，逗号分隔的都转换成数组元素]--------------------------------------
        $deliveryTime= $config["delivery_time"];
        $deliveryTime=  str_replace("\r\n",",",$deliveryTime);
        $deliveryTime=explode(",", $deliveryTime);
        $deliveryTime= array_filter($deliveryTime);
        $config["delivery_time"]= $deliveryTime;

        $config["balance_payment"] = $configs["balance_payment"];
        $config["wechat_payment"] = $configs["wechat_payment"];
        $config["alipay_payment"] = $configs["alipay_payment"];
        $config["cool_payment"] = $configs["cool_payment"];
        $this->assign("config", json_encode($config));
        $this->assign("shopData", $config);

        $menu = D("Menu")->getList(array("shop_id" => $shopId), true, "rank desc,id desc");
        $menu = list_to_tree($menu, 'id', 'pid', 'sub');
        $this->assign("menu", json_encode($menu));

        $hostName = EnvironmentHelper::getServerHostName();
        $this->assign("hostName", $hostName);

//        $product = D("Product")->getList(array("status" => array("neq", -1), "shop_id" => $shopId), true, "rank desc", 0, 0, 0);
//        $this->assign("product", json_encode($product));




        //$ads = D("Ads")->getList(array("shop_id" => $shopId), true,"rank desc");

        $mate = new ViewMate("ads", ViewLink::getCommon_File());
        $ads = $mate->select(array("shop_id" => $shopId), true, "rank desc");
        $this->assign("ads", json_encode($ads));

        //暂时先在base基类中实现
        $wxConfig = D("WxConfig")->getJsSign();
        $this->assign("wxConfig", json_encode($wxConfig));

        $bizConsts = BizConst::getConsts();
        $this->assign("bizConsts", json_encode($bizConsts, JSON_UNESCAPED_SLASHES));

        $bizConfig['SYSTEM_PAY_WEIXIN_COMMISSION'] = C("SYSTEM_PAY_WEIXIN_COMMISSION", null, 0);
        $bizConfig['SYSTEM_PAY_WEIXIN_COMMISSION_VALUE'] = MathHelper::percent2Float($bizConfig['SYSTEM_PAY_WEIXIN_COMMISSION']);
        $bizConfig['SYSTEM_PAY_ZHIFUBAO_COMMISSION'] = C("SYSTEM_PAY_ZHIFUBAO_COMMISSION", null, 0);
        $bizConfig['SYSTEM_PAY_ZHIFUBAO_COMMISSION_VALUE'] = MathHelper::percent2Float($bizConfig['SYSTEM_PAY_ZHIFUBAO_COMMISSION']);
        $this->assign("bizConfig", json_encode($bizConfig));

        //self::calcTime('html-main-page-begin');

        $this->display();
    }

    public function calcTime($beginName = 'beginName', $endName = '')
    {
        if (empty($endName)) {
            G($beginName);
        } else {
            $timeUsed = G($beginName, $endName);
            CommonLoger::log("$beginName 到 $endName 耗时", $timeUsed);
        }
    }

    public function aop()
    {
        $oauth2Url = "App/Public/oauthLogin";

        $user = R($oauth2Url);

        dump('aopppppppppppppppp');
    }

    //pidong 通过shopid获取当前店铺信息
    public function getThisShop()
    {
        $this->display();
    }

    //pidong 通过shopid获取当前店铺信息
    /**
     * 附近店铺功能
     */
    public function shop()
    {
        CommonLoger::log('附近店铺加载');

        $wxConfig = D("WxConfig")->getJsSign();
        $this->assign("wxConfig", json_encode($wxConfig));

        $this->display();
    }


    public function init()
    {
        $data = array();
        $config = D("Config")->get();
        $config["delivery_time"] = explode(",", $config["delivery_time"]);
        $data["config"] = $config;

        $data["ads"] = D("Ads")->getList(array(), true);

        $menu = D("Menu")->getList(array(), true, "rank desc,id desc");
        $menu = list_to_tree($menu, 'id', 'pid', 'sub');
        $data["menu"] = $menu;

        $data["product"] = D("Product")->getList(array("status" => array("neq", -1)), true, "rank desc", 0, 0, 0);
        $this->ajaxReturn($data);
    }

    /**
     * 按照类别获取产品
     * @param int $menuId 产品类别id（菜单id）
     */
    public function getProducts($menuId = 0)
    {
        $products = D("Product")->getList(array("status" => array("neq", -1), "menu_id" => $menuId), true, "rank desc", 0, 0, 0);
        $this->ajaxReturn($products);
    }


    public function searchProducts($shopId, $keyword)
    {
        $condition = array();
        $condition['status'] = array("neq", -1);
        $condition['shop_id'] = $shopId;
        $condition['name'] = array("like", "%$keyword%");

        $products = D("Product")->getList($condition, true, "rank desc", 0, 0, 0);
        $this->ajaxReturn($products);
    }

    /**
     * 获取某个地区的零售店铺
     */
    public function AreaShops()
    {
        $wxConfig = D("WxConfig")->getJsSign();
        $this->assign("wxConfig", json_encode($wxConfig));

        $this->display();
    }

    /**
     * 获取某个地区的渠道店铺
     */
    public function ChannelShops()
    {
        $wxConfig = D("WxConfig")->getJsSign();
        $this->assign("wxConfig", json_encode($wxConfig));

        $this->display();
    }

    /**
     * 获取某个地区的渠道店铺
     */
    public function ExcellentShops()
    {
        $wxConfig = D("WxConfig")->getJsSign();
        $this->assign("wxConfig", json_encode($wxConfig));

        $this->display();
    }
}
<?php
namespace App\Controller;

use Vendor\Hiland\Utils\DataModel\ModelMate;

class ShopController extends BaseController
{
    public function getProduct()
    {
        $product = D("Product")->get(array("id" => I("get.id")), true, true);
        $shopId = $product['shop_id'];

        $labelMate = new ModelMate("productLabel");
        $labelsOfShop = $labelMate->select(array("shop_id" => $shopId));
        $labelsOfProduct = explode(",", $product['label']);
        $labelsResult = "";
        foreach ($labelsOfProduct as $ov) {
            foreach ($labelsOfShop as $iv) {
                if ($iv["name"] == $ov) {
                    if ($iv["onlyforshop"] == 1) {
                        //
                    } else {
                        $labelsResult .= $ov . ",";
                    }
                }
            }
        }

        $product["label"]= $labelsResult;

        $albums = explode(",", $product["albums"]);
        $product["albums"] = $albums ? D("File")->getList(array("id" => array("in", $albums))) : "";
        $this->ajaxReturn($product);
    }

    public function getProductList()
    {
        $product = D("Product")->getList();
        $this->ajaxReturn($product);
    }

    public function getSku()
    {
        $sku = D("ProductSku")->get(array("id" => I("get.id")), true);
        $albums = explode(",", $sku["albums"]);
        $sku["albums"] = $albums ? D("File")->getList(array("id" => array("in", $albums))) : "";
        $this->ajaxReturn($sku);
    }

    public function getMenu()
    {
        $menu = D("Menu")->get(array("id" => I("get.id")));
        $this->ajaxReturn($menu);
    }

    public function getMenuList()
    {
        $menu = D("Menu")->getList();
        $this->ajaxReturn($menu);
    }

    public function getMenuTreeList()
    {
        $menu = D("Menu")->getList();
        $menuTree = list_to_tree($menu, 'id', 'pid', 'sub');
        $this->ajaxReturn($menuTree);
    }

    public function getAdsList()
    {
        $ads = D("Ads")->getList(array(), true);
        $this->ajaxReturn($ads);
    }

    public function addFeedback()
    {
        $data = I("post.");
        $data["user_id"] = session("userId");
        D("Feedback")->addFeedback($data);
    }

    public function bindShop()
    {
        R("App/Public/oauthLogin");

        $shop = D("Shop")->getShop(array("id" => I("get.shopId")));
        $employee = explode(",", $shop["employee"]);
        foreach ($employee as $key => $value) {
            if ($value == session("userId")) {
                $this->assign("result", 1);
                $this->display();
                die();
            }
        }
        array_push($employee, session("userId"));

        D("Shop")->saveShop(array("id" => I("get.shopId"), "employee" => implode(",", $employee)));
        $this->display();
    }

    public function getUserIdByWeixin()
    {
        R("App/Public/oauthLogin");
        $userID = session("userId");

        $this->ajaxReturn($userID);
    }
}
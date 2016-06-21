<?php
/**
 * Created by PhpStorm.
 * User: xiedalie
 * Date: 2016/5/30
 * Time: 16:42
 */

namespace Home\Controller;


use Common\Model\BizHelper;
use Think\Controller;
use Vendor\Hiland\Utils\DataModel\ModelMate;
use Vendor\Hiland\Utils\Web\EnvironmentHelper;

class FooController extends Controller
{
    public function pathop()
    {
        //dump('sssssssss');
        $targetUrl = U("Home/Config/address");
        dump($targetUrl);
        //WebHelper::redirectUrl($targetUrl);
        $this->assign('url', $targetUrl);
        $this->display();
    }

    public function redirecturlajax()
    {
        header('Content-Type:application/json; charset=utf-8');
        $data['info'] = 'sssssssssss';
        $data['status'] = 1;
        $data['url'] = 'www.sss.ff/gg/22/pp';

        exit(json_encode($data, 0));
    }

    public function configop($configname = 'PROJECT_NAME')
    {
        dump(C($configname));
    }

    public function configdbop()
    {
        $mate = new ModelMate('config');
        $data = $mate->get(1);
        dump($data);
    }

    public function buyershopop($shopid = 3)
    {
        $openid = 'gasdgawegewgew';
        $result = BizHelper::relateUserShopScaned($openid, $shopid);
        dump($result);
    }

    public function serverhostop()
    {
        dump('HostName:' . EnvironmentHelper::getServerHostName());
        dump('ServerName:' . EnvironmentHelper::getWebServerName());
        dump('Root:' . __ROOT__);
    }

    public function webphysicalrootpathop()
    {
        dump('file:' . __FILE__);
        dump('PHP_SELF:' . $_SERVER['PHP_SELF']);
        dump('SCRIPT_NAME' . $_SERVER['SCRIPT_NAME']);//它将返回包含当前脚本的路径。这在页面需要指向自己时非常有用
        dump('SCRIPT_FILENAME' . $_SERVER['SCRIPT_FILENAME']);//它将返回当前文件所在的绝对路径信息

        dump('REQUEST_URI' . $_SERVER['REQUEST_URI']);

        dump(realpath(dirname(__FILE__) . '/../'));
        dump(str_replace('\\', '/', realpath(dirname(__FILE__) . '/../')));
        dump('hostName:' . EnvironmentHelper::getServerHostName());
        //dump(WebHelper::getWebPhysicalRootPath());
    }

    public function wxmenuop()
    {
        $m = D("WxMenu");
        $menu = $m->getList(array("pid" => 0), false, array('rank' => 'desc', 'id' => 'desc'), 0, 0, 3);
        dump($menu);
    }

    public function paraUsed($order = array('id' => 'desc'))
    {
        dump($order);
    }

    public function paraop()
    {
        $this->paraUsed("rank desc,id");
    }

    public function skulistop()
    {
        $condition = array(
            "product_id" => 23,
        );
        $result = D("ProductSku")->getList($condition, true, "rank desc");
        dump($result);
    }

    /**
     * @param int $shopid
     */
    public function calctimeofshop($shopid = 146)
    {
        G('shopBeginTime');
        $product = D("Product")->getList(array("status" => array("neq", -1), "shop_id" => $shopid), true, "rank desc", 0, 0, 0);
        $jsons = json_encode($product);
        dump(G('shopBeginTime', 'shopEndTime'));
        //dump($product);
    }
}
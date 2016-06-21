<?php
/**
 * Created by PhpStorm.
 * User: heqing
 * Date: 15/10/8
 * Time: 16:18
 */

namespace Home\Controller;

class FileController extends BaseController
{
    public function imageUploader()
    {
        $condition = array(
            "shop_id" => session("homeShopId") ? session("homeShopId") : 0
        );

        //dump($condition);

        $num = 8;
        $p = I("get.page") ? I("get.page") : 1;
        $file = D("File")->getFileList($condition, false, "id desc", $p, $num);
        $this->assign('file', $file);

        $count = D("File")->getFileListCount($condition);// 查询满足要求的总记录数
        $Page = new \Think\Page($count, $num);// 实例化分页类 传入总记录数和每页显示的记录数
        $Page->setConfig('theme', "<ul class='pagination no-margin pull-right'></li><li>%FIRST%</li><li>%UP_PAGE%</li><li>%LINK_PAGE%</li><li>%DOWN_PAGE%</li><li>%END%</li><li><a> %HEADER%  %NOW_PAGE%/%TOTAL_PAGE% 页</a></ul>");
        $show = $Page->show();// 分页显示输出
        $this->assign('page', $show);// 赋值分页输出
        $this->display('', false);
    }

    public function delImage()
    {
        D("File")->delImage(I("get.id"));
    }

    public function uploadImage()
    {
        //dump('ssssssss');
        D("File")->uploadImage();
    }
}
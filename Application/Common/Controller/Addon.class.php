<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.inuoer.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: better <einsqing@gmail.com>
// +----------------------------------------------------------------------

namespace Common\Controller;

use Think\Controller;

/**
 * 插件类
 * @author better <einsqing@gmail.com>
 */
abstract class Addon extends Controller
{
    /**
     * 视图实例对象
     * @var view
     * @access protected
     */
    protected $view = null;

    public $addon_path = '';
    public $config_file = '';
    public $view_path = '';

    public function __construct()
    {
        $this->view = \Think\Think::instance('Think\View');
        $this->addon_path = ADDON_PATH . '/' . $this->getName() . '/';
        $this->view_path = __ROOT__ . '/' . ADDON_PATH . '/' . $this->getName() . '/';
    }

    /**
     * 模板主题设置
     * @access protected
     * @param string $theme 模版主题
     * @return Action
     */
    final protected function theme($theme)
    {
        $this->view->theme($theme);
        return $this;
    }

    public function is_pjax()
    {
        return array_key_exists('HTTP_X_PJAX', $_SERVER) && $_SERVER['HTTP_X_PJAX'];
    }

    //显示方法
    final protected function display($template = '', $toggle = false)
    {
        //reset default_theme,view_path
        if (is_file($this->addon_path . 'Conf/config.php')) {
            $this->config_file = $this->addon_path . 'Conf/config.php';
            $configInit = array(
                'DEFAULT_THEME' => '',
                'VIEW_PATH' => '',
            );
            $config = include $this->config_file;
            $config = array_merge($configInit, $config);
            C($config);
        }

        C("TMPL_PARSE_STRING", array(
            '__IMG__' => $this->view_path . 'View' . C('DEFAULT_THEME') . '/Public/image',
            '__CSS__' => $this->view_path . 'View' . C('DEFAULT_THEME') . '/Public/css',
            '__JS__' => $this->view_path . 'View' . C('DEFAULT_THEME') . '/Public/js',
            '__ADDON_PUBLIC__' => $this->view_path . 'View' . C('DEFAULT_THEME') . '/Public',
        ));

        if ($template == '')
            $template = CONTROLLER_NAME;
        $action = ACTION_NAME;

        if ($toggle) {
            if ($this->is_pjax()) {
                layout(false);
            } else {
                define("THEME_PATH", "Application/Admin/View/");
                layout('layout');
            }
        } else {
            layout(false);
        }

        echo($this->fetch($template, $action));
    }

    /**
     * 模板变量赋值
     * @access protected
     * @param mixed $name 要显示的模板变量
     * @param mixed $value 变量的值
     * @return Action
     */
    final protected function assign($name, $value = '')
    {
        $this->view->assign($name, $value);
        return $this;
    }


    //用于显示模板的方法
    final protected function fetch($templateFile = CONTROLLER_NAME, $action = ACTION_NAME)
    {
        if (!is_file($templateFile)) {
            if (C('VIEW_PATH')) {
                $templateFile = C('VIEW_PATH') . C('DEFAULT_THEME') . '/' . $templateFile . '/' . $action . C('TMPL_TEMPLATE_SUFFIX');
            } else {
                $templateFile = $this->addon_path . 'View' . C('DEFAULT_THEME') . '/' . $templateFile . C('TMPL_FILE_DEPR') . $action . C('TMPL_TEMPLATE_SUFFIX');
            }

            if (!is_file($templateFile)) {
                throw new \Exception("模板不存在:$templateFile");
            }
        }
        return $this->view->fetch($templateFile);
    }

    final public function getName()
    {
        $class = get_class($this);

        $str = explode('\\', $class);
        return $str[1];
    }


    //必须实现安装
    abstract public function install();

    //必须卸载插件方法
    abstract public function uninstall();

}

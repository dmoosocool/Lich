<!-- 继承模板. -->
{% extends "../devDependencies/tpl/layout.swig" %}
<!-- 设置页面Title. -->
{% block title %}Lich.js 案例.{% endblock %}
<!-- 引用公用头部. -->
{% block headerImport %}
    {% parent %}
    <!-- 通过 gulp-lich-include 插件引用页面样式文件 -->
    <!-- Lich css-local="css/index" -->
{% endblock %}
<!-- 设置body的class. -->
{% block bodyClass %}ax-kh,black{% endblock%}
<!-- body中间的东西. -->
{% block content %}
{% endblock %}
<!-- 引用公共脚本. -->
{% block footerImport %}
    {% parent %}
    <!-- 通过 gulp-lich-include 插件引用页面脚本文件. -->
    <!-- Lich js-local="js/index" -->
{% endblock %}
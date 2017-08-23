{% extends "../devDependencies/tpl/layout.swig" %}
{% block title %}Lich.js 案例.{% endblock %}
{% block headerImport %}
    {% parent %}
    //=css examples/css/index
{% endblock %}

{% block content %}
<body>
{% endblock %}

{% block footerImport %}
{% parent %}
//=js examples/js/index
{% endblock %}
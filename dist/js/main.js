var tooltip=function(){var o=0,e="#e0ad9a";return createToolTip=function(t,i){t.css("outline","1px solid "+e);var l=t.parent();l.append('<div class="error_block tooltip'+o+'">'+i+"</div>");var r=l.find("div").width(),n=$(".tooltip"+o);n.css({top:"8px",left:-r-17+"px"}),o++},removeToolTip=function(o){o.css("outline","none"),o.parent().find("div.error_block").remove()},removeToolTips=function(){$.each(elements,function(o,e){_removeToolTip(e),e.val("")}),$("label.input").text("Загрузите изображение"),o=0},hasToolTip=function(o){return""!==o.parent().find("div.error_block")},{createToolTip:createToolTip,removeToolTip:removeToolTip,removeToolTips:removeToolTips,hasToolTip:hasToolTip}}();$(document).ready(function(){var o=function(){function o(){e()}function e(){$("#new_project").on("click",_showModal),$("#send_project_form").on("click",_validateFields),$("input, textarea").on("keydown",function(o){tooltips.removeToolTip($(this))}),$("#file").change(function(o){var e=$.trim($(this).val()),i="";""===e?(i="Загрузите изображение",t.pic.val("")):(tooltips.hasToolTip(t.pic)&&tooltips.removeToolTip(t.pic),t.pic.val(e),i=e),$("label.input").text(i)}),$.browser.msie&&$("label").click(function(){""!=$(this).attr("for")&&$("#"+$(this).attr("for")).click()})}var t={name:$("#project_name"),pic:$("#project_picture"),url:$("#project_url"),desc:$("#project_desc")};return _showModal=function(o){o.preventDefault(),$("#add_project").bPopup({speed:650,transition:"slideDown",onClose:tooltips.removeToolTips})},_validateFields=function(o){o.preventDefault();var e=t.name.val(),i=t.pic.val(),l=t.url.val(),r=t.desc.val();""===$.trim(e)&&tooltips.createToolTip(t.name,"введите название"),""===$.trim(i)&&tooltips.createToolTip(t.pic,"изображение"),""===$.trim(l)&&tooltips.createToolTip(t.url,"ссылка на проект"),""===$.trim(r)&&tooltips.createToolTip(t.desc,"описание проекта")},{init:o}}();o.init()});
$(document).ready(
	function() {
		// Объявление модуля
		var myModule = (function () {
			var _ttCounter = 0;
			var _ttOutlineColor = '#e0ad9a';
			var elements = 	{
								name: $('#project_name'), 
								pic: $('#project_picture'), 
								url: $('#project_url'), 
								desc: $('#project_desc')
						 	};
			// Инициализирует наш модуль
			function init () {
				//console.log("Main module initialized");
				_setUpListners();
			};

			// Прослушивает события 
			function _setUpListners () {
				// Вызов модального окна
				$('#new_project').on('click', _showModal);
				// Вызов обработчика формы
				$('#send_project_form').on('click', _validateFields);
				// Удаление тултипа при изменении инпутов
				$('input, textarea').on('keydown', function (e) {
					_removeToolTip($(this));
				});
				$('#file').change(function(event) {
					var path = $.trim($(this).val());
					var caption = '';
					if (path === '') // Путь пустой
					{
						caption = 'Загрузите изображение';
						elements.pic.val('');
					}
					else
					{
						if (_hasToolTip(elements.pic))
							_removeToolTip(elements.pic);
						elements.pic.val(path);
						caption = path;
					}
					$("label.input").text(caption);
				});
				// alert(($.browser.msie) ? "IE" : "NOT IE");

				// IE8 FIX: Label for
				if ($.browser.msie) {
				  	$("label").click(function(){
					    if ($(this).attr("for") != "")
					        $("#" + $(this).attr("for")).click();
						}
					);
				}
			};

		 	// Открытие модального окна
			_showModal = function (e) {
				e.preventDefault();
				//console.log('Activated popup');
				$('#add_project').bPopup({
					speed: 650,
					transition: 'slideDown',
					onClose: _removeToolTips
				});
			};

			// Валидация формы
			_validateFields = function (e) {
				e.preventDefault();
				var name = elements.name.val();
				var pic = elements.pic.val();
				var url = elements.url.val();
				var desc = elements.desc.val();

				if ($.trim(name) === '')
				{
					_createToolTip(elements.name, 'введите название');
				}

				if ($.trim(pic) === '')
				{
					_createToolTip(elements.pic, 'изображение');
				}

				if ($.trim(url) === '')
				{
					_createToolTip(elements.url, 'ссылка на проект');
				}

				if ($.trim(desc) === '')
				{
					_createToolTip(elements.desc, 'описание проекта');
				}
			};

			// Создание тултипа
			_createToolTip = function (element, text) {
				element.css('outline', '1px solid ' + _ttOutlineColor);
				var wrapper = element.parent();
				wrapper.append('<div class="error_block tooltip' + _ttCounter + '">' + text + '</div>');
				var left = wrapper.find('div').width();
				var tooltip = $('.tooltip' + _ttCounter);
				tooltip.css({
					'top': '8px',
					'left': -left - 17 + 'px'
				});

				_ttCounter++;
			}

			// Удаление тултипа
			_removeToolTip = function (element) {
				element.css('outline', 'none');
				element.parent().find('div.error_block').remove();
			}

			// Удаление всех тултипов
			_removeToolTips = function () {
				// console.log('removing all tooltips');
				$.each(elements, function(index, val) {
					 _removeToolTip(val);
					 val.val('');
				});

				$("label.input").text('Загрузите изображение');
				_ttCounter = 0;
			}

			// Есть ли тултип у элемента
			_hasToolTip = function (element) {
				return element.parent().find('div.error_block') !== '';
			}

			// Возвращаем объект (публичные методы) 
			return {
				init: init
			};

		})();

		// Вызов модуля
		myModule.init();		
	}
)

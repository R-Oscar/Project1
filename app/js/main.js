$(document).ready(
	function() {
		// Объявление модуля
		var myModule = (function () {
			var _ttCounter = 0;
			var _ttOutlineColor = '#e0ad9a';
			// Инициализирует наш модуль
			function init () {
				//console.log("Main module initialized");
				_setUpListners();
			};

			// Прослушивает события 
			function _setUpListners () {
				$('#new_project').on('click', _showModal);
				$('#send_project_form').on('click', _validateFields);
				$('input, textarea').on('keydown', function (e) {
					_removeToolTip($(this));
				});
				//$('#project_picture').on('keydown', _removeToolTip(($('#project_picture'))));
			};

			_testFunc = function (event) {
				console.log(event);
			}

		 	// Открытие модального окна
			_showModal = function (e) {
				e.preventDefault();
				//console.log('Activated popup');
				//console.log($('#add_project'));
				$('#add_project').bPopup({
					speed: 650,
					transition: 'slideDown',
					onClose: _removeToolTips
				});
			};

			// Валидация формы
			_validateFields = function (e) {
				e.preventDefault();
				var name = $('#project_name').val();
				var pic = $('#project_picture').val();
				var url = $('#project_url').val();
				var desc = $('#project_desc').val();

				if (name.trim() === '')
				{
					_createToolTip($('#project_name'), 'введите название');
				}

				if (pic.trim() === '')
				{
					_createToolTip($('#project_picture'), 'изображение');
				}

				if (url.trim() === '')
				{
					_createToolTip($('#project_url'), 'ссылка на проект');
				}

				if (desc.trim() === '')
				{
					_createToolTip($('#project_desc'), 'описание проекта');
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
				element.next().remove();
			}

			// Удаление всех тултипов
			_removeToolTips = function () {
				console.log('removing all tooltips');
				_removeToolTip($('#project_name'));
				_removeToolTip($('#project_url'));
				_removeToolTip($('#project_picture'));
				_removeToolTip($('#project_desc'));

				$('#project_name').val('');
				$('#project_url').val('');
				$('#project_picture').val('');
				$('#project_desc').val('');
				_ttCounter = 0;
			}

			// Возвращаем объект (публичные методы) 
			return {
				init: init
			};

		})();

	// Вызов модуля
	myModule.init();		
	})

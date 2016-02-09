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
	};

 	// Открытие модального окна
	_showModal = function (e) {
		e.preventDefault();
		//console.log('Activated popup');
		//console.log($('#add_project'));
		$('#add_project').bPopup({
			speed: 650,
			transition: 'slideDown'
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
		var wrapper = element.wrap('<div class="input_block"></div>').parent();
		wrapper.append('<div class="error_block tooltip' + _ttCounter + '">' + text + '</div>');
		var left = wrapper.find('div').width();
		var tooltip = $('.tooltip' + _ttCounter);
		tooltip.css({
			'top': '8px',
			'left': -left - 17 + 'px'
		});

		_ttCounter++;
	}

	// Возвращаем объект (публичные методы) 
	return {
		init: init
	};

})();

// Вызов модуля
myModule.init();
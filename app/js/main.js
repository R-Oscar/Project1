$(document).ready(
	function() {
		// Объявление модуля
		var myModule = (function() {
			var elements = {
				name: $('#project_name'),
				pic: $('#project_picture'),
				url: $('#project_url'),
				desc: $('#project_desc')
			};

			var elements_message = {
				name: "введите название",
				pic: "изображение",
				url: "ссылка на проект",
				desc: "описание проекта"
			}

			var feedback_elements = {
				name: $('#form_name'),
				mail: $('#form_email'),
				msg: $('#form_letter'),
				captcha: $('#form_captcha')
			};

			var feedback_message = {
				name: "укажите имя",
				mail: "введите адрес почты",
				msg: "заполните письмо",
				captcha: "введите символы"
			}

			var feedback_position = {
				name: 'left',
				mail: 'right',
				msg: 'left',
				captcha: 'right'
			}

			var feedback_caption = {
					name: 'Как к Вам обращаться',
					mail: 'Куда мне писать',
					msg: 'Кратко в чём суть',
					captcha: 'Введите код'
				}
				// Инициализирует наш модуль
			function init() {
				//console.log("Main module initialized");
				_setUpListners();
			};

			// Прослушивает события 
			function _setUpListners() {
				// Вызов модального окна
				$('#new_project').on('click', _showModal);

				// Вызов окна авторизации
				$('#login').on('click', _showAuth);

				// Вызов обработчика формы
				$('#send_project_form').on('click', _validateFields);

				// Сброс формы обратной связи
				$('#reset_feedback').on('click', function(e) {
					tooltips.removeToolTips(feedback_elements);
					$.each(feedback_elements, function(index, val) {
						val.attr('placeholder', feedback_caption[index]);
					});
				})

				// Удаление тултипа при изменении инпутов
				$('input, textarea').on('keydown', function(e) {
					tooltips.removeToolTip($(this));
				});

				// Обработчик при выборе / отмены выбора файла
				$('#file').change(function(event) {
					var path = $.trim($(this).val());
					var caption = '';
					if (path === '') // Путь пустой
					{
						caption = 'Загрузите изображение';
						elements.pic.val('');
					} else {
						if (tooltips.hasToolTip(elements.pic))
							tooltips.removeToolTip(elements.pic);
						elements.pic.val(path);
						caption = path;
					}
					$("label.input").text(caption);
				});

				// Обработка обратной связи
				$('#send_feedback').click(_validateFeedBack);

				// IE8 FIX: Label for
				if ($.browser.msie) {
					$("label").click(function() {
						if ($(this).attr("for") != "")
							$("#" + $(this).attr("for")).click();
					});
				}
			};

			// Открытие модального окна
			_showModal = function(e) {
				e.preventDefault();
				//console.log('Activated popup');
				$('#add_project').bPopup({
					speed: 650,
					transition: 'fadeIn',
					onClose: function() {
						tooltips.removeToolTips(elements);
					}
				});
			};

			// Открытие окна авторизации
			_showAuth = function(e) {
				$('#auth').bPopup({
					speed: 650,
					transition: 'fadeIn',
				})
			}

			// Валидация формы
			_validateFields = function(e) {
				e.preventDefault();
				$.each(elements, function(index, val) {
					_checkField(val, elements_message[index], 'left');
				});
			};

			// Валидация обратной связи
			_validateFeedBack = function(e) {
				e.preventDefault();
				$.each(feedback_elements, function(index, val) {
					_checkField(val, feedback_message[index], feedback_position[index]);
				});
			}

			_checkField = function(field, message, position) {
				if ($.trim(field.val()) === '')
					tooltips.createToolTip(field, message, position);
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
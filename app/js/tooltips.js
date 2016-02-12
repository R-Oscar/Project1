var tooltips = (function() {
	
	var _ttCounter = 0;
	var _ttOutlineColor = '#e0ad9a';
	// Создание тултипа
	createToolTip = function(element, text, position) {
		element.css('outline', '1px solid ' + _ttOutlineColor);
		var wrapper = element.parent();
		wrapper.append('<div class="error_block' + ( (position === 'right') ? '_right' : '' ) + ' tooltip' + _ttCounter + '">' + text + '</div>');
		var width = wrapper.find('div').width();
		var tooltip = $('.tooltip' + _ttCounter);
		tooltip.css('top', '8px');
		tooltip.css(position, -width - 17 + 'px');

		_ttCounter++;
	}

	// Удаление тултипа
	removeToolTip = function(element) {
		element.css('outline', 'none');
		element.parent().find('div.error_block').remove();
		element.parent().find('div.error_block_right').remove();
	}

	// Удаление всех тултипов
	removeToolTips = function(elements) {
		// console.log('removing all tooltips');
		$.each(elements, function(index, val) {
			removeToolTip(val);
			val.val('');
		});

		$("label.input").text('Загрузите изображение');
		_ttCounter = 0;
	}

	// Есть ли тултип у элемента
	hasToolTip = function(element) {
		return element.parent().find('div.error_block') !== '';
	}

	// Возвращаем объект (публичные методы) 
	return {
		createToolTip: createToolTip,
		removeToolTip: removeToolTip,
		removeToolTips: removeToolTips,
		hasToolTip: hasToolTip
	};

})();
$('#menu-button').on('click', function() {
	$('body').toggleClass('menu-open');
});

$('.header__menu a').on('click', function() {
	$('body').removeClass('menu-open');
});

$(document).ready(function() {
	// mainSectionSize();
	animOnLoad();
	animOnScroll();

	// $(window).on( 'resize', function() {
	//     mainSectionSize();
	// } );
});

function mainSectionSize() {
	$('.section-main-space').css({ height: $('.section-main').outerHeight() + $('.header').outerHeight() });
	$('.section-main').css({ top: $('.header').outerHeight() });
	$('.header').css({ top: -$('.header').outerHeight() });
}

function animOnLoad() {
	var animate = $('.onload-animate');
	$.each(animate, function() {
		$(this).addClass('animated ' + $(this).data("animation"));
		$(this).removeClass('onload-animate');
	});
}

function animOnScroll() {

	var h = $(window).height();
	var animate = $('.scroll-animate');

	$(window).on('scroll', function() {
		$.each(animate, function() {
			if (($(window).scrollTop() + h / 1.2) >= $(this).offset().top) {
				if ($(this).hasClass('scroll-animate')) {
					$(this).addClass('animated ' + $(this).data("animation"));
					$(this).removeClass('scroll-animate');
				}
			}
		});
	});

}


function calculator(calc) {
	var _this = this;

	this.calc = $(calc);
	this.items = this.calc.find('.section-calculator__input input');
	this.resultHtml = this.calc.find('.section-calculator__amount-number');
	this.amount = 0;
	this.percent = 0.1;
	this.profitNumber = 0;
	this.addModal = initModal();
	this.modalShowTime = 2000;
	this.isZero = false;

	this.calc.find('.addPosition').on('click', addPosition);

	function addPosition() {
		_this.addPosition(this);
	}

	function initModal() {
		var modal = '<div class="modal nout fade" data-backdrop="false" id="calcModal" tabindex="-1" role="dialog" >\
						<div class="modal-dialog" role="document">\
							<div class="modal-content text-center">\
								<div class="modal-body">\
									<h3 style="margin: 20px 0; font-weight: 600;">Добавлено в калькулятор</h3>\
								</div>\
							</div>\
						</div>\
						</div>'

		$('body').append(modal);

		return $('#calcModal');
	}


	var ids = $(this.calc).find('.section-calculator__delete');

	for (var i = 0; i < ids.length; i++) {
		$('.slider__item[data-productID="' + $(ids[i]).data('id') + '"]').addClass('slider__item--inCalc');

		function onKeyUp() {
			$(this).data('value', parseInt($(this).val().replace(/\D+/g, '')));
			_this.calculate();
		};

		$(ids[i]).parents('.section-calculator__item').find('input').on('keyup', onKeyUp);
	}


	this.initRemove()
	this.calculate();
}

calculator.prototype.showModal = function() {
	var _this = this;

	function hide() {
		_this.addModal.modal('hide');
	}

	this.addModal.modal('show');

	setTimeout(hide, this.modalShowTime);

}

calculator.prototype.calculate = function() {
	var amount = 0;

	this.isZero = false;

	this.items = this.calc.find('.section-calculator__input input');

	for (var i = 0; i < this.items.length; i++) {
		amount += $(this.items[i]).data('value');
		if ($(this.items[i]).data('value') == 0 && !this.isZero) {
			this.isZero = true;
		}
	}

<<<<<<< HEAD
	this.amount = this.isZero ? 0 : amount;

	if (this.items.length === 3) {
		this.amount_2 = this.isZero ? 0 : $(this.items[2]).data('value');
	}


=======
	if (this.items.length === 3) {
		this.amount_2 = this.isZero ? 0 : $(this.items[2]).data('value');
		this.amount = this.isZero ? 0 : $(this.items[0]).data('value') + $(this.items[1]).data('value');
	} else {
		this.amount = this.isZero ? 0 : amount;
	}

>>>>>>> 8901584e36d6a46a14b07fbde10077baaa5b2249
	this.profit();
	this.show();
	this.checkLastItem();
};

calculator.prototype.initRemove = function() {
	var _this = this;

	function remove() {
		var id = $(this).parents('.section-calculator__item').removeClass('section-calculator__item--full').find('.section-calculator__delete').data('id');
		$('.slider__item[data-productID="' + id + '"]').removeClass('slider__item--inCalc');
		$(this).unbind();

		$(this).parents('.section-calculator__prod').html('');
		_this.calculate();
	}

	this.calc.find('.section-calculator__delete').unbind();
	this.calc.find('.section-calculator__delete').on('click', remove);
};

calculator.prototype.profit = function() {
	var items = this.calc.find('.section-calculator__input input'),
		itemsType = [];

	for (var i = 0; i < items.length; i++) {
		itemsType.push($(items[i]).data('type'));
	}


	if (this.amount != 0 && !isNaN(this.amount)) {
		if ($.inArray(1, itemsType) != -1 && $.inArray(2, itemsType) != -1 && $.inArray(3, itemsType) != -1 && itemsType.length == 3) {

			if (this.amount > 0 && this.amount <= 40000) {
				this.profitNumber = Math.round(this.amount_2 * 0.3);
			} else if (this.amount > 40000 && this.amount <= 80000) {
				this.profitNumber = Math.round(this.amount_2 * 0.4);
			} else {
				this.profitNumber = Math.round(this.amount_2 * 0.5);
			}

		} else if ($.inArray(1, itemsType) != -1 && $.inArray(2, itemsType) != -1 && itemsType.length == 2) {

			if (this.amount > 0 && this.amount <= 40000) {
				this.profitNumber = 5000;
			} else if (this.amount > 40000 && this.amount <= 80000) {
				this.profitNumber = 8000;
			} else {
				this.profitNumber = 10000;
			}

		} else if ($.inArray(3, itemsType) != -1 && itemsType.length == 1) {

			if (this.amount > 0 && this.amount <= 40000) {
				this.profitNumber = 3000;
			} else if (this.amount > 40000 && this.amount <= 80000) {
				this.profitNumber = 6000;
			} else {
				this.profitNumber = 9000;
			}

		} else {
			this.profitNumber = 0;
		}
	} else {
		this.profitNumber = 0;
	}

};

calculator.prototype.show = function() {
	this.resultHtml.html(this.profitNumber);
};

calculator.prototype.removeAll = function() {
	this.calc.find('.section-calculator__delete').unbind();

	this.calc.find('.section-calculator__item').removeClass('section-calculator__item--full');
	this.calc.find('.section-calculator__prod').html('');

	this.items = this.calc.find('.section-calculator__input input');
	$('.slider__item--inCalc').removeClass('slider__item--inCalc');
};

calculator.prototype.add = function(el, price, priceNum, name) {

<<<<<<< HEAD
	var productType = el.data('type'),
		typeInCalc = this.calc.find('.section-calculator__input input[data-type="' + productType + '"]'),
		id = typeInCalc.parents('.section-calculator__item').find('.section-calculator__delete').data('id');
=======
	var productType = parseInt(el.data('type')),
		typeInCalc = this.calc.find('.section-calculator__input input[data-type="' + productType + '"]'),
		id = typeInCalc.parents('.section-calculator__item').find('.section-calculator__delete').data('id'),
		max = (productType === 3) ? 'max 120 000р' : 'max 150 000р';
>>>>>>> 8901584e36d6a46a14b07fbde10077baaa5b2249

	$('.slider__item[data-productID="' + id + '"]').removeClass('slider__item--inCalc');

	var _this = this,
		itemTemplate = '<div class="section-calculator__name">\
							<div class="section-calculator__text">\
							<h5>' + name + '</h5>\
<<<<<<< HEAD
=======
							<div class="section-calculator__helper">' + max + '</div>\
>>>>>>> 8901584e36d6a46a14b07fbde10077baaa5b2249
							<div class="section-calculator__delete" data-id="' + el.data('productid') + '"></div>\
							</div>\
						</div>\
						<div class="section-calculator__input">\
							<input value="' + price + '" placeholder="0 руб." data-value="' + priceNum + '" data-type="' + productType + '">\
						</div>';

	var container = $('.section-calculator__item[data-type="' + productType + '"]'),
		item = container.find('.section-calculator__prod').html(itemTemplate);

	container.addClass('section-calculator__item--full');

	$('.slider__item[data-productID="' + el.data('productid') + '"]').addClass('slider__item--inCalc');

	function onKeyUp() {
<<<<<<< HEAD
		$(this).data('value', parseInt($(this).val().replace(/\D+/g, '')));
=======
		
		var val = parseInt($(this).val().replace(/\D+/g, '')),
			max = (parseInt($(this).data('type')) === 3) ? 120000 : 150000;

		if ( val > max) {
			$(this).data('value', max);
			$(this).val( max );
		} else {
			$(this).data('value', val);
		}
		
>>>>>>> 8901584e36d6a46a14b07fbde10077baaa5b2249
		_this.calculate();
	};

	item.find('input').on('keyup', onKeyUp);

	this.showModal();
	this.initRemove();
	this.calculate();

};

calculator.prototype.checkLastItem = function() {

	if (this.items.length === 3) {

		this.calc.addClass('section-calculator__item--remove-plus');

		return true;

	} else {

		this.calc.removeClass('section-calculator__item--remove-plus');

		return false;

	}
};

calculator.prototype.addPosition = function(el) {

	var _this = this,
		parentEl = $(el).parents('.section-calculator__item'),
<<<<<<< HEAD
		productType = parentEl.data('type'),
		productName = parentEl.data('name'),
		itemTemplate = '<div class="section-calculator__name">\
							<div class="section-calculator__text">\
							<h5>' + productName + '</h5>\
=======
		productType = parseInt(parentEl.data('type')),
		productName = parentEl.data('name'),
		max = (productType === 3) ? 'max 120 000р' : 'max 150 000р';
		itemTemplate = '<div class="section-calculator__name">\
							<div class="section-calculator__text">\
							<h5>' + productName + '</h5>\
							<div class="section-calculator__helper">' + max + '</div>\
>>>>>>> 8901584e36d6a46a14b07fbde10077baaa5b2249
							<div class="section-calculator__delete"></div>\
							</div>\
						</div>\
						<div class="section-calculator__input">\
							<input value="" placeholder="0 руб." data-value="0" data-type="' + productType + '">\
						</div>';

	var container = $('.section-calculator__item[data-type="' + productType + '"]'),
		item = container.find('.section-calculator__prod').html(itemTemplate);

	container.addClass('section-calculator__item--full');

	function onKeyUp() {
<<<<<<< HEAD
		$(this).data('value', parseInt($(this).val().replace(/\D+/g, '')));
=======

		var val = parseInt($(this).val().replace(/\D+/g, '')),
			max = (parseInt($(this).data('type')) === 3) ? 120000 : 150000;

		if ( val > max) {
			$(this).data('value', max);
			$(this).val( max );
		} else {
			$(this).data('value', val);
		}

>>>>>>> 8901584e36d6a46a14b07fbde10077baaa5b2249
		_this.calculate();
	};

	item.find('input').on('keyup', onKeyUp);

	this.initRemove()
	this.calculate();

};

var calc = new calculator('.section-calculator__calculator');

$('.addToCalc').on('click', function() {
	var item = $(this).parents('.container-fixed').find('.slider .owl-item.center'),
		price = item.find('.slider__price').html(),
		priceNum = item.find('.slider__price').data('price'),
		name = item.find('.slider__title').html();

	calc.add(item.find('.slider__item'), price, priceNum, name);
});

$('.section-calculate__item .button').on('click', function() {
	calc.removeAll();

	var item = $(this).parents('.section-calculate__item').find('.products__item');

	for (var i = 0; i < item.length; i++) {
		var priceNum = $(item[i]).data('price'),
			name = $(item[i]).data('name');

		calc.add($(item[i]), '', priceNum, name);
	}

	$(window).scrollTop($('#own-calc').offset().top);
});


$(document).ready(function() {
	$('.awesome-tooltip').tooltip({
		placement: 'right'
	});

	$(window).bind('scroll', function(e) {
		dotnavigation();
	});

	function dotnavigation() {

		var numSections = $('.section-nav').length;

		$('#dot-nav li a').removeClass('active').parent('li').removeClass('active');
		$('.section-nav').each(function(i, item) {
			var ele = $(item),
				nextTop;


			if (ele.offset() !== null) {
				thisTop = ele.offset().top;
				thisBottom = ele.offset().top + ele.outerHeight();
			} else {
				thisTop = 0;
			}

			var docLine = $(document).scrollTop() + $(window).innerHeight() / 2;

			if (docLine >= thisTop && (docLine < thisBottom)) {
				$('#dot-nav li').eq(i).addClass('active');
			}
		});
	}

	$('#dot-nav li').click(function() {


		var id = $(this).find('a').attr("href"),
			_this = this,
			posi,
			ele,
			padding = 0;

		ele = $(id);
		posi = ($(ele).offset() || 0).top - padding;

		$('html, body').animate({ scrollTop: posi }, 'slow', addActive);

		function addActive() {

			setTimeout(function() {
				$('#dot-nav li a').removeClass('active').parent('li').removeClass('active');
				$(_this).addClass('active');
			}, 500);

		}

		return false;
	});

});

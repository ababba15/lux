function mainSectionSize(){$(".section-main-space").css({height:$(".section-main").outerHeight()+$(".header").outerHeight()}),$(".section-main").css({top:$(".header").outerHeight()}),$(".header").css({top:-$(".header").outerHeight()})}function animOnLoad(){var t=$(".onload-animate");$.each(t,function(){$(this).addClass("animated "+$(this).data("animation")),$(this).removeClass("onload-animate")})}function animOnScroll(){var t=$(window).height(),i=$(".scroll-animate");$(window).on("scroll",function(){$.each(i,function(){$(window).scrollTop()+t/1.2>=$(this).offset().top&&$(this).hasClass("scroll-animate")&&($(this).addClass("animated "+$(this).data("animation")),$(this).removeClass("scroll-animate"))})})}function calculator(t){function i(){e.addPosition()}function a(){var t='<div class="modal fade" data-backdrop="false" id="calcModal" tabindex="-1" role="dialog" >\t\t\t\t\t\t<div class="modal-dialog" role="document">\t\t\t\t\t\t\t<div class="modal-content text-center">\t\t\t\t\t\t\t\t<div class="modal-body">\t\t\t\t\t\t\t\t\t<h3>Добавлено в калькулятор</h3>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>';return $("body").append(t),$("#calcModal")}var e=this;this.calc=$(t),this.items=this.calc.find(".section-calculator__input input"),this.resultHtml=this.calc.find(".section-calculator__amount-number"),this.amount=0,this.percent=.1,this.profitNumber=0,this.addModal=a(),this.modalShowTime=2e3,this.calc.find(".addPosition").on("click",i);for(var c=$(this.calc).find(".section-calculator__delete"),o=0;o<c.length;o++)$('.slider__item[data-productID="'+$(c[o]).data("id")+'"]').addClass("slider__item--inCalc");this.initRemove(),this.calculate()}$("#menu-button").on("click",function(){$("body").toggleClass("menu-open")}),$(document).ready(function(){animOnLoad(),animOnScroll()}),calculator.prototype.showModal=function(){function t(){i.addModal.modal("hide")}var i=this;this.addModal.modal("show"),setTimeout(t,this.modalShowTime)},calculator.prototype.calculate=function(){var t=0;this.items=this.calc.find(".section-calculator__input input");for(var i=0;i<this.items.length;i++)t+=$(this.items[i]).data("value");this.amount=t,this.profit(),this.show(),this.checkLastItem()},calculator.prototype.initRemove=function(){function t(){var t=$(this).parents(".section-calculator__item").find(".section-calculator__delete").data("id");$('.slider__item[data-productID="'+t+'"]').removeClass("slider__item--inCalc"),$(this).unbind(),$(this).parents(".section-calculator__item").remove(),i.calculate()}var i=this;this.calc.find(".section-calculator__delete").unbind(),this.calc.find(".section-calculator__delete").on("click",t)},calculator.prototype.profit=function(){this.profitNumber=Math.round(this.amount*this.percent)},calculator.prototype.show=function(){this.resultHtml.html(this.profitNumber)},calculator.prototype.removeAll=function(){this.calc.find(".section-calculator__delete").unbind(),this.calc.find(".section-calculator__item").remove(),this.items=this.calc.find(".section-calculator__input input"),$(".slider__item--inCalc").removeClass("slider__item--inCalc")},calculator.prototype.add=function(t,i,a,e){if(this.items.length<3){var c='<div class="section-calculator__item">\t\t\t\t\t\t\t\t<div class="section-calculator__name">\t\t\t\t\t\t\t\t\t<div class="section-calculator__text">\t\t\t\t\t\t\t\t\t<h5>'+e+'</h5>\t\t\t\t\t\t\t\t\t<div class="section-calculator__delete" data-id="'+t.data("productid")+'"></div>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="section-calculator__input">\t\t\t\t\t\t\t\t\t<input value="'+i+'" data-value="'+a+'">\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>',o=$(c).insertBefore(this.calc.find(".button"));$('.slider__item[data-productID="'+t.data("productid")+'"]').addClass("slider__item--inCalc"),this.showModal(),this.initRemove(),this.calculate()}},calculator.prototype.checkLastItem=function(){return 3===this.items.length?(this.calc.addClass("section-calculator__item--remove-plus"),!0):(this.calc.removeClass("section-calculator__item--remove-plus"),!1)},calculator.prototype.addPosition=function(){function t(){$(this).data("value",parseInt($(this).val().replace(/\D+/g,""))),i.calculate()}if(this.items.length<3){var i=this,a='<div class="section-calculator__item">\t\t\t\t\t\t\t\t<div class="section-calculator__name">\t\t\t\t\t\t\t\t\t<div class="section-calculator__text">\t\t\t\t\t\t\t\t\t<h5>Позиция</h5>\t\t\t\t\t\t\t\t\t<div class="section-calculator__delete"></div>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="section-calculator__input">\t\t\t\t\t\t\t\t\t<input value="0 руб." data-value="0">\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>',e=$(a).insertBefore(this.calc.find(".button"));e.find("input").on("keyup",t),this.initRemove(),this.calculate()}};var calc=new calculator(".section-calculator__calculator");$(".addToCalc").on("click",function(){var t=$(this).parents(".container-fixed").find(".slider .owl-item.center"),i=t.find(".slider__price").html(),a=t.find(".slider__price").data("price"),e=t.find(".slider__title").html();calc.add(t.find(".slider__item"),i,a,e)}),$(".section-calculate__item .button").on("click",function(){calc.removeAll();for(var t=$(this).parents(".section-calculate__item").find(".products__item"),i=0;i<t.length;i++){var a=$(t[i]).data("price"),e=$(t[i]).data("name");calc.add($(t[i]),a+" руб.",a,e)}}),$(document).ready(function(){function t(){var t=$(".section-nav").length;$("#dot-nav li a").removeClass("active").parent("li").removeClass("active"),$(".section-nav").each(function(t,i){var a=$(i),e;null!==a.offset()?(thisTop=a.offset().top,thisBottom=a.offset().top+a.outerHeight()):thisTop=0;var c=$(document).scrollTop()+$(window).innerHeight()/2;c>=thisTop&&c<thisBottom&&$("#dot-nav li").eq(t).addClass("active")})}$(window).bind("scroll",function(i){t()}),$("#dot-nav li").click(function(){function t(){setTimeout(function(){$("#dot-nav li a").removeClass("active").parent("li").removeClass("active"),$(a).addClass("active")},500)}var i=$(this).find("a").attr("href"),a=this,e,c,o=0;return c=$(i),e=($(c).offset()||0).top-o,$("html, body").animate({scrollTop:e},"slow",t),!1})});
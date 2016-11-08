require([], function() {
	var isMobileInit = false;
	var loadMobile = function() {
		require(["/js/mobile.js"], function(mobile) {
			mobile.init();
			isMobileInit = true
		})
	};
	var isPCInit = false;
	var loadPC = function() {
		require(["/js/pc.js"], function(pc) {
			pc.init();
			isPCInit = true
		})
	};
	var browser = {
		versions: function() {
			var u = window.navigator.userAgent;
			return {
				trident: u.indexOf("Trident") > -1,
				presto: u.indexOf("Presto") > -1,
				webKit: u.indexOf("AppleWebKit") > -1,
				gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1,
				mobile: !!u.match(/AppleWebKit.*Mobile.*/),
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
				iPhone: u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1,
				iPad: u.indexOf("iPad") > -1,
				webApp: u.indexOf("Safari") == -1,
				weixin: u.indexOf("MicroMessenger") == -1
			}
		}()
	};
	$(window).bind("resize", function() {
		if (isMobileInit && isPCInit) {
			$(window).unbind("resize");
			return
		}
		var w = $(window).width();
		if (w >= 700) {
			loadPC()
		} else {
			loadMobile()
		}
	});
	if (browser.versions.mobile === true || $(window).width() < 700) {
		loadMobile()
	} else {
		loadPC()
	}
	if (yiliaConfig.fancybox === true) {
		require(["/fancybox/jquery.fancybox.js"], function(pc) {
			var isFancy = $(".isFancy");
			if (isFancy.length != 0) {
				var imgArr = $(".article-inner img");
				for (var i = 0, len = imgArr.length; i < len; i++) {
					var src = imgArr.eq(i).attr("src");
					var title = imgArr.eq(i).attr("alt");
					imgArr.eq(i).replaceWith("<a href='" + src + "' title='" + title + "' rel='fancy-group' class='fancy-ctn fancybox'><img src='" + src + "' title='" + title + "'></a>")
				}
				$(".article-inner .fancy-ctn").fancybox()
			}
		})
	}
	if (yiliaConfig.animate === true) {
		require(["/js/jquery.lazyload.js"], function() {
			$(".js-avatar").attr("src", $(".js-avatar").attr("lazy-src"));
			$(".js-avatar")[0].onload = function() {
				$(".js-avatar").addClass("show")
			}
		});
		if (yiliaConfig.isHome === true) {
			function showArticle() {
				$(".article").each(function() {
					if ($(this).offset().top <= $(window).scrollTop() + $(window).height() && !($(this).hasClass("show"))) {
						$(this).removeClass("hidden").addClass("show");
						$(this).addClass("is-hiddened")
					} else {
						if (!$(this).hasClass("is-hiddened")) {
							$(this).addClass("hidden")
						}
					}
				})
			}
			$(window).on("scroll", function() {
				showArticle()
			});
			showArticle()
		}
	}
	if (yiliaConfig.open_in_new == true) {
		$(".article a[href]").attr("target", "_blank")
	}
});
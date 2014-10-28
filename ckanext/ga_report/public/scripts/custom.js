$(document).ready(function() {
			String.prototype.endsWith = function(suffix) {
			    return this.indexOf(suffix, this.length - suffix.length) !== -1;
			};
			if (window.location.pathname.endsWith('site-usage')) {
				var target = $('#legend_none')
				$(target).css('display', 'block').addClass('current').html('')
				$(document).on('click', 'a[data-toggle="tab"]', function(){
					var pane = $(this).attr('data-hash').replace('_','-')
					switch (pane){
						case 'browsers-names':
						pane = 'browsers';
						break;
						case 'browsers-versions':
						pane = 'browser-versions';
						break;
						case 'os-versions':
						pane = 'os_versions';
						break;
						case 'social-networks':
						pane = 'social_networks';
						break;
						case 'os':
						case 'languages':
						case 'country':
						break;
						default:
						pane = false;
						break;

					}
					$('div.rickshaw_legend.current, #legend_none').css('display', 'none')
					if (pane){
						var target = $('#legend_'+pane)
						$(target).css('display', 'block').addClass('current')
					} else {
						var target = $('#legend_none')
						$(target).css('display', 'block').addClass('current')
					}
				})
			}
		    if ($(window).width() <= 979) {
		        searchmobile();

		       
		    }

		    $('[placeholder]').focus(function() {
			  var input = $(this);
			  if (input.val() == input.attr('placeholder')) {
			    input.val('');
			    input.removeClass('placeholder');
			  }
			}).blur(function() {
			  var input = $(this);
			  if (input.val() == '' || input.val() == input.attr('placeholder')) {
			    input.addClass('placeholder');
			    input.val(input.attr('placeholder'));
			  }
			}).blur();

    
		    if (!(navigator.userAgent.indexOf(' MSIE ') == -1)) {
		        var par = document.querySelector('.toolba')
		        var sr = document.getElementById('sr-home')
		        par.removeChild(sr)
	    	}


		});

		function searchmobile() {
		    $('header.navbar.masthead form.section.site-search').click(function(e) {
		        if (e.target.nodeName != "FORM" && e.target.nodeName != "I") {
		            e.stopPropagation();
		            return false;
		        }
		        hideNavigation()
		        $(this).find('.field').slideToggle();
		        $(this).toggleClass('active');
		        document.getElementById('field-sitewide-search').focus()



		    });
		 	var ress = $('#result-title')
		        $('.form-select.control-group.control-order-by').insertAfter(ress)

		    $('div.container.header-area').click(function(e) {
		        if ($('form.section.site-search.simple-input').hasClass('active')) {
		            $('form.section.site-search.simple-input').click()
		        }
		        hideNavigation()
		    })
		    $('div[role="main"]').click(function(e) {
		        hideNavigation()
		    })

		    var mobileImage = document.querySelector('.aside-image')
		    if (mobileImage) document.querySelector('.primary.span9').insertBefore(mobileImage.cloneNode(true),document.querySelector('.primary.span9').firstChild)

		}

		function hideNavigation() {
		    if ($('div.nav-collapse.collapse').hasClass('in')) {
		        if (document.querySelector('.btn.btn-navbar.collapsed')) document.querySelector('.btn.btn-navbar.collapsed').click()
		    }
		}

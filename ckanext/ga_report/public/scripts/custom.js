$(document).ready(function() {
		    if ($(window).width() <= 979) {
		        searchmobile();

		        $('.tab-pane').prepend($('<div>').text('Best viewed in landscape').css({'padding':'10px', 'text-align':'center'}))
		    }

		     

    
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

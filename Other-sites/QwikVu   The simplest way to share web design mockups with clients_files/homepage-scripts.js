$(document).ready(function() {
	// Smooth scrolling to anchors
	$('a[href^="#"]').click(function() {
		$('html, body').stop().animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, 1000);
	});

	// Styling file upload inputs
	$('input[type=file]')
		.each(function() {
			var parent = $(this).parent('.field-file');
						
			parent.append('<div class="file-append"><span>No file selected</span> <a href="#" class="filetoggle">Select a file</a></div>');
			
			$(this).css({ 'opacity': 0 });
		})
		.change(function() {
			var $this = $(this),
				valArray = $this.val().split('\\'),
				newVal = valArray[valArray.length - 1];
			$('.file-append span', $this.parent('.field-file')).addClass('hasFile').text(newVal);
		});
	
	$('a.filetoggle').click(function() {
		$(this).closest('.field-file').find('input[type=file]').click();
		return false;
	});
	
	if( $('html').is('.ie6') || $('html').is('.ie7') || $('html').is('.ie8')) {
	
	}
	else {
		$('.prolinks').cycle({fx:'scrollLeft', delay: -4000});
	}
	
	$(document).placeholder({
          'set_class' : true,
          'skip' : false,
          'ie_submit_swap' : true, // If fallback validation isn't working in IE try setting to false.
          'ie_password_callback' : '' // Takes string to analyze and returns boolean. Workaround for if swap doesn't work.
        });
});
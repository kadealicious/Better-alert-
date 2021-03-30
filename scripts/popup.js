var show_hide_anim, fade_anim;

window.onload = function() {
	var copy_texts = document.getElementsByClassName("copy_text");
	for(var i = 0; i < copy_texts.length; i++) {
		copy_texts[i].addEventListener("click", function(event) {event.preventDefault();} );
	}
};

function CopyTextToKeyboard(text_elem, popup_id) {
	var win = window;
	var doc = win.document, sel, range;
    if (win.getSelection && doc.createRange) {
        sel = win.getSelection();
        range = doc.createRange();
        range.selectNodeContents(text_elem);
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (doc.body.createTextRange) {
        range = doc.body.createTextRange();
        range.moveToElementText(text_elem);
        range.select();
    }
	doc.execCommand("copy");
	sel.removeAllRanges();
	
	if(popup_id != -1)
		PopupHandle(text_elem, popup_id, 2000, 2500);
}

function PopupHandle(parent_elem, popup_id, time_tofade, time_tohide) {
	var popup = document.getElementById(popup_id);
	PopupOrientToElem(popup, parent_elem);
	
	PopupToggleShowHide(popup);
	fade_anim = setTimeout(() => {
		popup.classList.toggle("fade");
	}, time_tofade);
	show_hide_anim = setTimeout(() => {
		if(popup.classList.contains("show"))
			PopupToggleShowHide(popup);
	}, time_tohide);
}
function PopupOrientToElem(popup, elem) {
	var elem_rect = elem.getBoundingClientRect();
	var scroll_left = window.pageXOffset || document.documentElement.scrollLeft;
	var scroll_top = window.pageYOffset || document.documentElement.scrollTop;
	
	var xnew = elem_rect.left + scroll_left + (elem_rect.width / 2) - (popup.clientWidth / 2);
	var ynew = elem_rect.top + scroll_top - popup.clientHeight;
	popup.style.left = xnew + "px";
	popup.style.top = ynew + "px";
}
function PopupFadeOut(popup) {
	popup.classList.toggle("fade");
	clearTimeout(show_hide_anim);
}
function PopupToggleShowHide(popup) {
	popup.classList.toggle("show");
	if(popup.classList.contains("fade"))
		popup.classList.remove("fade");
	clearTimeout(show_hide_anim);
	clearTimeout(fade_anim);
}
var _bookmarkFolders = [];
var _selectId = 'toolbar_____';

function restore() {
	chrome.storage.local.get('setting', (d) => {
		if(d.setting) {
			_selectId = d.setting.topId;
			$('#newTab').prop('checked', d.setting.newTab);
			if (!d.setting.css.length) {
				$('#css').val(popup_css);
			} else { $('#css').val(d.setting.css) };
		}
		setFolderList();
	});
}

function save() {
	var a = {
		'topId': $('#topId').val(),
		'newTab': $('#newTab').prop('checked'),
		'css': $('#css').val()
	};
	chrome.storage.local.set({'setting': a});
}

function revertCss() {
	$('#css').val(popup_css);
}

function setFolderList() {
	chrome.bookmarks.getTree((root) => {
		var tops = [];
		for (let c of root[0].children) {
			if(c.id === 'toolbar_____') tops.unshift(c);
			else tops.push(c);
		}
		addBookmarkItem(tops, 0);
		
		let select = $('#topId');
		for (bmf of _bookmarkFolders) {
			select.append('<option value="'+ bmf.id +'">'+ bmf.title +'</option>');
		}
		
		$('#folder_loading').hide();
		$('#topId').show();
		$('#topId').val(_selectId);
	});

	function addBookmarkItem(bookmarks, index) {
		for (bm of bookmarks) {
			if(!bm.url && bm.children) {
				_bookmarkFolders.push({id: bm.id, title: '　'.repeat(index) + bm.title});
				addBookmarkItem(bm.children, index + 1);
			}
		}
	}
}

var gm = n => chrome.i18n.getMessage(n);
$('#settings').text(gm('settings'));
$('#popup_folder').text(gm('popup_folder'));
$('#open_in_new_tab').text(gm('open_in_new_tab'));
$('#notes').text(gm('notes'));
$('#update_favicon').text(gm('update_favicon'));
$('#open_wo_closing').text(gm('open_wo_closing'));
$('#style-textarea').text(gm('style_textarea'));
$('#revertCss').val(gm('revert_css'));
$('#saveCss').val(gm('save_css'));

//---
$('select, input').on('change', () => save());
$('#revertCss').on('click', () => revertCss());
$('#saveCss').on('click', () => save());
restore();
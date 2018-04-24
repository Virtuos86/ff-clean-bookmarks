var _toolbarId = 'toolbar_____';
var _defFavicon = 'imgs/default_favicon.png';
var _spinFavicon = 'imgs/spin.svg';
var _saveList = null;
var _parent = {};
var _container = $('#container');
var _bmKey = 'bookmark_key';

var _pop_topId = _toolbarId;
var _pop_newTab = true;
var _pop_css = null;
var _pop_autoOpen = true;
var _pop_autoOpenPause = 1000;

var _onItemFocusTimeoutId = null;
var _onReturnBoxFocusTimeoutId = null;

//var _needUpdate = true;

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function setSetting(setting) {
	if(setting) {
		_pop_topId = setting.topId !== null ? setting.topId : _toolbarId;
		_pop_newTab = setting.newTab;
		_pop_css = setting.css.replace("\n", ";");
		_pop_autoOpen = setting.autoOpen;
		_pop_autoOpenPause = isNumeric(setting.autoOpenPause) ? setting.autoOpenPause : _pop_autoOpenPause;
	}
}

var escapeHtml = (function (String) {
	var escapeMap = {
		'&': '&amp;',
		"'": '&#x27;',
		'`': '&#x60;',
		'"': '&quot;',
		'<': '&lt;',
		'>': '&gt;'
	};
	var escapeReg = '[';
	var reg;
	for (var p in escapeMap) {
		if (escapeMap.hasOwnProperty(p)) {
			escapeReg += p;
		}
	}
	escapeReg += ']';
	reg = new RegExp(escapeReg, 'g');

	return function escapeHtml(str) {
		str = (str === null || str === undefined) ? '' : '' + str;
		return str.replace(reg, (match) => {
			return escapeMap[match];
		});
	};
}(String));

function createPanel(bid, parentId, isSubFolder=false) {
	//if (!_needUpdate) return;
	var style = document.createElement('style');
  style.innerHTML = _pop_css;
  document.head.removeChild(document.head.lastChild);
  document.head.appendChild(style);
	chrome.bookmarks.getChildren(bid, children => {
		var index = 0, isUpdate = false;
		if(!children) 
			return;
		if(parentId)
			_parent[bid] = parentId;
		
		var panel = $('<div class="panel" id="panel"></div>');
		var settingsDiv = $('<div class="toolbar"></div>');
		var settingsBtn = $('<img src="imgs/settings.png">');
		settingsBtn.click(() => { chrome.runtime.openOptionsPage(); window.close(); });
		settingsBtn.appendTo(settingsDiv);
		settingsDiv.appendTo(panel);
		var ul = $('<table></table>').appendTo(panel);
		var ignoreSep = false;
		for(let i = 0; i < children.length; i++) {
			let c = children[i];

			if(c.type == "separator") {
				let li = $('<tr><td colspan="3"><div class="splitter"></div></td></tr>');
				if(ignoreSep === true) {
					continue;
				} else {
					ul.append(li);
				};
				index++;
				continue;
			} else {
				ignoreSep = false;
			};

			if((c.type == "bookmark") && c.url.startsWith("place:")) {
				ignoreSep = true;
			    continue;
			};
			let arwstr = !c.url ? '<img src="imgs/arrow.png" alt="">' : '',
				title = c.title !== '' ? escapeHtml(c.title) : c.url,
				note = title + "\r\n" + (c.url || '');
			var titleClass;
			var iconClass = "icon";
			if(arwstr != '') {
				if(isSubFolder) {
					titleClass = "subfolder";
					iconClass = "subfolder-icon";
				} else {
					titleClass = "folder";
				}
			} else {
				if(isSubFolder) {
					titleClass = "subfolder-title";
					iconClass = "subfolder-icon";
				} else {
					titleClass = "title";
				}
			}
			let li = $(`<tr><td class="${iconClass}"></td><td class="${titleClass}" title="` + note + '"><span>' + title + '</span></td><td class="arrow">' + arwstr + '</td></tr>');
			li.data(_bmKey, c);
			
			let sbm = _saveList[c.id];
			if(sbm && sbm.url === c.url) {
				let icon = $('<img src="'+ sbm.faviconUrl +'" alt="">');
				icon[0].onerror = function() { this.onerror = null; this.src = _defFavicon; };
				li.find(`td.${iconClass}`).append(icon);
			} else {
				let icon = $('<img src="'+ _spinFavicon +'" alt="">');
				setFavicon(icon, c, false);
				li.find(`td.${iconClass}`).append(icon);
				isUpdate = true;
			}

			li.click(function() {
				let bm = $(this).data(_bmKey);
				if(bm.url) {
					if(_pop_newTab)
						chrome.tabs.create({url: bm.url});
					else
						chrome.tabs.update({url: bm.url});
					window.close();
				} else createPanel(bm.id, bid, true);
			})
			.mousedown(function(e) {
				if(e.which === 3) {
					let icon = $(this).find(`td.${iconClass} img`);
					console.log(icon);
					icon[0].src = 'imgs/spin.svg';
					setFavicon(icon, $(this).data(_bmKey), true);
				}
			})
			.mouseup(function(e) {
				if(e.which === 2) {
					let bm = $(this).data(_bmKey);
					if(bm.url)
						chrome.tabs.create({url: bm.url});
				}
			})
			.mouseenter(function(e, self=li) {
				if (!_pop_autoOpen) return;
				_onItemFocusTimeoutId = setTimeout(function() {
					let bm = $(self).data(_bmKey);
					if(!bm.url) createPanel(bm.id, bid, true);
				}, _pop_autoOpenPause);
			})
      .mouseleave(function(e) {
				if (!_pop_autoOpen) return;
        clearTimeout(_onItemFocusTimeoutId);
      });
;
			
			ul.append(li);
			index++;
		}

		if(children.length === 0) {
			ul.append('<tr><td class="icon"></td><td class="subfolder-title"><span class="empty">' + chrome.i18n.getMessage("empty") + '</span></td><td class="arrow"></td></tr>');
		}

		_container.empty();
		_container.append(panel);
		
		let pw = panel.outerWidth(), ph = panel.outerHeight();
		if(ph > 595) {
			//panel.find('td.arrow').css('padding-right', 20);
			pw = panel.outerWidth();
		}
		if(_parent[bid]) {
			//panel.children('table').css('padding-left', 20);
			let rtn = $('<div class="return_box"><img src="imgs/return.png" alt=""></div>').appendTo(panel);
			rtn.css({'top': 0, 'height': ph});
			rtn.children('img').css('margin-top', (rtn.height() - 13) / 2);
			pw = panel.outerWidth();
			rtn.click(() => {
				createPanel(_parent[bid], null, (_parent[bid] === _pop_topId) ? false : true );
			})
			.mouseenter(function(e) {
				if (!_pop_autoOpen) return;
				_onReturnBoxFocusTimeoutId = setTimeout(function() {
					createPanel(_parent[bid], null, (_parent[bid] === _pop_topId) ? false : true );
				}, _pop_autoOpenPause);
			})
      .mouseleave(function(e) {
				if (!_pop_autoOpen) return;
        clearTimeout(_onReturnBoxFocusTimeoutId);
      });
		}
		_container.width(pw).height(ph);
	});
}

function setFavicon(img, bookmark, noTimeout) {
	var googleFaviconApi = 'http://www.google.com/s2/favicons?domain=';
	var setIcon = (url) => {
		img.attr('src', url);
		img[0].onerror = function() {
			if(this.src.indexOf(_defFavicon) === -1) {
				if(this.src.indexOf(googleFaviconApi) === -1) 
					setIcon(googleFaviconApi + bookmark.url.split('/')[2]);
				else
					setIcon(_defFavicon);
			}
		};
		_saveList[bookmark.id] = {url: bookmark.url, faviconUrl: url};
		chrome.storage.local.set({'list': _saveList});
	};
	
	if(!bookmark.url) {
		setIcon('imgs/folder.png');
		return;
	}
	
	if(bookmark.url.trim().substring(0, 4) !== 'http') {
		setIcon(_defFavicon);
		return;
	}
	
	var sp = bookmark.url.split('/');
	if(sp.length < 3) return setIcon(_defFavicon);
	
	if(!noTimeout) {
		setTimeout(() => {
			if(img[0].src.indexOf(_spinFavicon) >= 0) 
				setIcon(_defFavicon);
		}, 5000);
	}
	
	var favicon = sp.slice(0, 3).join('/') + '/favicon.ico';
	$.get(favicon)
	.done((imgd) => {
		setIcon(favicon);
	})
	.fail(() => {
		$.get(bookmark.url)
		.done(data => {
			var len = data.length, point = data.indexOf('"shortcut icon"'),
				lp = null, rp = null;
			if(point < 0) {
				point = data.indexOf('"icon"')
				if(point < 0) 
					return setIcon(_defFavicon);
			}
			
			for(let i = point; i > 0; i--) {
				if(data.charAt(i) === '<') {
					lp = i;
					break;
				}
			}
			for(let i = point; i < len; i++) {
				if(data.charAt(i) === '>') {
					rp = i;
					break;
				}
			}
			if(lp === null || rp === null) return setIcon(_defFavicon);
			
			let favLink = $(data.substring(lp, rp + 1));
			if(!favLink) return setIcon(_defFavicon);
			favicon = $(data.substring(lp, rp + 1)).attr('href');
			if(!favicon) return setIcon(_defFavicon);
			
			if(favicon.trim().substring(0, 4) !== 'http') {
				var last = sp.length === 3 || favicon.charAt(0) === '/' ? 3 : sp.length - 1;
				favicon = sp.slice(0, last).join('/') + '/' + favicon;
			}
			setIcon(favicon);
		})
		.fail(() => setIcon(googleFaviconApi + bookmark.url.split('/')[2]));
	});
}

//-------------

document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.local.get(['list', 'setting'], (d) => {
		_saveList = d['list'] || {};
		setSetting(d['setting']);
		createPanel(_pop_topId, null);
	})
});

/*function listener(message) {
	if (message === "update!") {
		_needUpdate = true;
		createPanel(_pop_topId, null);
		_needUpdate = false;
	}
}

chrome.runtime.onMessage.addListener(listener);*/
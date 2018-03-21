chrome.runtime.onInstalled.addListener((details) => {
	if(details.reason == "update") {
		//chrome.tabs.create({url: "https://github.com/virtuos86/ff-clean-bookmarks"});
	}
});
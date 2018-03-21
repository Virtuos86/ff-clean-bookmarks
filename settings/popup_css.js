var popup_css = '/* This is the default style. */\n\
html, body {\n\
    margin: 0px; padding: 0px;\n\
    overflow: hidden;\n\
}\n\
/* Contains a panel */\n\
#container {\n\
    border: 0 solid #888;\n\
    background-color: #f2f2f2;\n\
}\n\
/* Pop-up list of bookmarks by itself */\n\
.panel {\n\
    width: fit-content;\n\
    height: fit-content;\n\
    background-color: #ffffff;\n\
    position:absolute; top: 0; left: 0;\n\
    font-size: 12px; padding: 0 0 0 0;\n\
    user-select: none;\n\
    -moz-user-select: none;\n\
    -webkit-user-select: none;\n\
    overflow-x: hidden; overflow-y: auto;\n\
    max-height: 590px;\n\
    max-width: 400px;\n\
    min-width: 400px;\n\
}\n\
/* Top toolbar with the settings button */\n\
.toolbar {\n\
    height: 20px;\n\
    margin: 0px;\n\
    background-color: #dddddd;\n\
}\n\
/* The settings button on toolbar */\n\
.toolbar img {\n\
    float: right;\n\
    width: 20px;\n\
    height: inherit;\n\
    padding": 2px;\n\
}\n\
/* Pop-up list of bookmarks is represented as a table. Every row matches a bookmark, or a folder. Every row contains 3 columns: an icon, a title, and optionally arrow`s image (for folder items). */\n\
table {\n\
    border-spacing: 0px;\n\
    margin: 0px; padding: 0px;\n\
}\n\
td {\n\
    margin: 0px; padding: 1px 1px 1px 1px;\n\
}\n\
td * {\n\
    vertical-align: middle;\n\
}\n\
/* An arrow`s image in folder item */\n\
td.arrow {\n\
    padding: 1px 5px 1px 1px;\n\
}\n\
/* Bookmark icon */\n\
td.icon img,\n\
td.subfolder-icon img {\n\
    border: none; width: 14px; height: 14px;\n\
    margin-top: -1px;\n\
}\n\
/* Item icon in subfolder */\n\
td.subfolder-icon img {\n\
    margin-left: 14px; /* Attention: this parameter is bound with width of the `div.return_box` */\n\
}\n\
/* Item title */\n\
td.title span,\n\
td.folder span,\n\
/* Subfolder item title */\n\
td.subfolder-title span,\n\
td.subfolder span {\n\
    font-family: "Arial", sans;\n\
    display: inline-block;\n\
    margin-right: 5px;\n\
    white-space: nowrap;\n\
    overflow: hidden;\n\
    text-overflow: ellipsis;\n\
    cursor: default;\n\
    max-width: 369px;\n\
    min-width: 369px;\n\
}\n\
/* Folder title */\n\
td.folder span {\n\
    font-weight: bold;\n\
}\n\
/* Subfolder title */\n\
td.subfolder span {\n\
    font-weight: bold;\n\
}\n\
/* Actives when you hover mouse pointer on item */\n\
tr:hover {\n\
    background-color: #bbbbff20;\n\
}\n\
/* Horizontal line, that separates list items */\n\
div.splitter {\n\
    width: inherit; height: 1px; background-color: #d7d7d7;\n\
    margin: 0 0 0 0;\n\
}\n\
/* A block on left side in subfolders for returning to parent folder */\n\
div.return_box {\n\
    position:fixed; left: 0px; width: 14px;\n\
    background-color: #fbfbfb; border: 0px solid #c0c0c0;\n\
    border-left: none;\n\
}\n\
/* Actives when you hover mouse pointer on the return box */\n\
div.return_box:hover {\n\
    background-color: #badeff;\n\
}\n\
/* This sets style of arrows image in the return box */\n\
div.return_box img {\n\
    margin-left: 4px;\n\
}\n\
/* An empty item (with "...") */\n\
span.empty {\n\
    color: #aaa;\n\
}';
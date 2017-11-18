let popup_css = 'html, body {\n\
    margin: 0px; padding: 0px;\n\
    overflow: hidden;\n\
}\n\
#container {\n\
    border: 0 solid #888;\n\
    background-color: #f2f2f2;\n\
}\n\
.panel {\n\
    width: fit-content;\n\
    height: fit-content;\n\
    background-color: #efefef;\n\
    position:absolute; top: 0; left: 0;\n\
    font-size: 12px; padding: 0 0 0 0;\n\
    user-select: none;\n\
    -moz-user-select: none;\n\
    -webkit-user-select: none;\n\
    overflow-x: hidden; overflow-y: auto;\n\
    max-height: 590px;\n\
}\n\
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
td.arrow {\n\
    padding: 1px 5px 1px 1px;\n\
}\n\
td.icon img {\n\
    border: none; width: 14px; height: 14px;\n\
    margin-top: -1px;\n\
}\n\
td.title span {\n\
    font-family: "Arial", sans;\n\
    display: inline-block;\n\
    margin-right: 5px;\n\
    white-space: nowrap;\n\
    overflow: hidden;\n\
    text-overflow: ellipsis;\n\
    cursor: default;\n\
    max-width: 500px;\n\
    min-width: 125px;\n\
}\n\
tr:hover {\n\
    background-color: #bbbbff20;\n\
}\n\
div.splitter {\n\
    width: inherit; height: 1px; background-color: #d7d7d7;\n\
    margin: 0 0 0 0;\n\
}\n\
div.return_box {\n\
    position:fixed; left: 0px; width: 20px;\n\
    background-color: #fbfbfb; border: 0px solid #c0c0c0;\n\
    border-left: none;\n\
}\n\
div.return_box:hover {\n\
    background-color: #badeff;\n\
}\n\
div.return_box img {\n\
    margin-left: 7px;\n\
}\n\
span.empty {\n\
    color: #aaa;\n\
}';
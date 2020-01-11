/* eslint-disable no-undef */
console.log("chrome extensions injected js")
var result = {};
// eslint-disable-next-line no-unused-vars

function getContent() {
    // eslint-disable-next-line no-undef
    var inputs = document.querySelectorAll("#form-download input");
    for (const input of inputs) {
        result[input.name] = input.value;
    }
   console.log("fshare data", result)
    // result = {
    //     formHtml: document.forms[1].innerHTML,
    //     // eslint-disable-next-line no-undef
    //     code: jQuery("[name='linkcode']").val()
    // }
}

getContent();
// eslint-disable-next-line no-unused-expressions
result;
import { getPTemplateList } from "./ptemplate_api.js";
import { renderPTemplateList } from "./renderPTemplateList.js";

const pageSize = 10;
let page = 1;

getPTemplateList(page, pageSize, receivePTemplates, receiveError);

function receivePTemplates(templates) {
    if (templates.code == 200) {
        templates = templates.data;
        // console.log(templates);
    }
    renderPTemplateList(templates);
}

function receiveError(error) {
    console.log(error);
}

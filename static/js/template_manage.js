import { getCTemplateList } from './ctemplate.js'
import { renderCTemplateList } from './renderTemplateList.js'

const pageSize = 40;
let page = 1;

getCTemplateList(page, pageSize, receiveCTemplates, receiveError);

function receiveCTemplates(templates) {
    if (templates.code == 200) {
        templates = templates.data;
        // console.log(templates);
    }
    renderCTemplateList(templates);
}

function receiveError(error) {
    console.log(error);
}

function handlePreviousPage() {
    if (page > 1) {
        page--;
        getCTemplateList(page, pageSize, receiveCTemplates, receiveError);
    }
}

function handleNextPage() {
    page++;
    getCTemplateList(page, pageSize, receiveCTemplates, receiveError);
}

export { handlePreviousPage, handleNextPage };

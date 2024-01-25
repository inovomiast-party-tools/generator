/* 
    Template.js by: INovomiast

    Util functions for template.
*/

//! MODULES
import * as fs from 'fs'
import * as os from 'os'

/**
 * [ Get your template and parse it in a syncronous way ]
 * @param {string} location The location path of the template. [html]
 * @param {string} encoding The encoding of the template file.
 */
export const getTemplateSync = (location, encoding) => {
    let fullpath = `${process.cwd()}${location}`;
    const fileData = fs.readFileSync(fullpath, {encoding: encoding});
    return (fileData.toString());
}


export const templateAddData = (where, data, template) => {
    if (!where || !data || !template)
        throw new Error("templateAddData - All arguments needed!");
    // Split all the template in lines
    const splitted_template = template.split('\n');
    console.log(splitted_template);
    // Find the body tag
    if (splitted_template.includes('<body>') && splitted_template.includes('</body>'))
    {
        // Get the position of the <body> tags.
        const bodyTags = [splitted_template.indexOf('<body>'), splitted_template.indexOf('</body>')]; // Find the position of the <body> tags (Opening and closing)
        // Now we need to read all the content from lines x to x
        for (let line = bodyTags[0] + 1; line < bodyTags[1]; line++)
        {
            const tags = splitted_template[line].split('\n'); // Split every line of the code in an array.
            const fixedTags = tags.map(tag => tag.replace(/^\s+/, '')); // Remove spaces
            // Take only the part of the tag that has the id="value"
            console.log(fixedTags);
        }
        
    } else {
        throw new Error('Invalid template!'); //! If the html is badly created
    }
}

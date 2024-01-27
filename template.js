/* 
    Template.js by: INovomiast

    Util functions for template.
*/

//! MODULES
import * as fs from "fs";
import * as os from "os";

/**
 * [ Get your template and parse it in a syncronous way ]
 * @param {string} location The location path of the template. [html]
 * @param {string} encoding The encoding of the template file.
 */
export const getTemplateSync = (location, encoding) => {
  let fullpath = `${process.cwd()}${location}`;
  const fileData = fs.readFileSync(fullpath, { encoding: encoding });
  return fileData.toString();
};

/**
 * Add dynamic data from POST request or any kind of data
 * to the pdf template. [⚠️ this will replace all the content
 * in between the parsed tags, be carefull and use the correct
 * id for this function ⚠️].
 *
 * @param {string} where The id of the tags to inject data on the template.
 * @param {string} data This is the data to be injected by the function into the tags.
 * @param {any} template This is the value returned by: getTemplateSync()
 * @see getTemplateSync
 *
 */

export const templateAddData = (where, data, template) => {
  let lineFound;

  if (!where || !data || !template)
    throw new Error("templateAddData - All arguments needed!");
  // Split all the template in lines
  const splitted_template = template.split("\n");
  // Find the body tag
  if (
    splitted_template.includes("<body>") &&
    splitted_template.includes("</body>")
  ) {
    // Get the position of the <body> tags.
    const bodyTags = [
      splitted_template.indexOf("<body>"),
      splitted_template.indexOf("</body>"),
    ]; // Find the position of the <body> tags (Opening and closing)
    // Now we need to read all the content from lines x to x
    for (let line = bodyTags[0] + 1; line < bodyTags[1]; line++) {
      if (splitted_template[line].includes(`id="${where}"`)) {
        let foundLine = splitted_template[line];
        lineFound = true;
        if (foundLine && lineFound) {
          // Replace it in the splitted_template array.
          const foundLinePosition = splitted_template.indexOf(foundLine);
          console.log(foundLinePosition);
          // Now let's move around the tags, and find the center <tag>{data}</tag>s
          foundLine = foundLine.replace(/>(.*?)</, `>${data}<`);
          return foundLine.toString();
        }
        break; // Exit the loop once the line is found
      }
    }

    if (!lineFound) {
      console.log("No matching line found");
    }
  } else {
    throw new Error("Invalid template!"); //! If the html is badly created
  }
};

/**
 * Compile all the templateAddData changes into the final
 * template and send it thru the app.
 * 
 * @param {Array} changes [⚠️AN ARRAY IS MANDATORY⚠️] takes all the data changed and appends it to the template.
 * @param {any} template The template to be compiled with the injected data
 * @param {object} config [🚧 UNDER DEV 🚧]
 * /----------------------------------------/
 * @see templateAddData
 */
export const templateInject = (changes, template, config) => {
  // Loop thru all the changes of the template
  // and replace it on the splitted_template
  if (template && changes)
  {
    const splitted_template = template.split('\n');
    for (let change = 0; change < changes.length; change++)
    {
      console.log(splitted_template);
      console.log(changes[change])
    }
  }
  else
  {
    throw new Error("Changes and Template must have values!")
  }
}

// export class templateServer {
//   constructor() {

//   }

//   /**
//    * Run this and automatically put up&running
//    * a full server that accept's POST request
//    * to create the pdf, and you can visualize
//    * them afterwards!
//    * 
//    * @param {Number} port The port where the server is created!
//    * @param {any} template The template that needs to render.
//    * @param {object} config Configuration for the server.
//    */
//   create(port, template, config) {
//     console.log("Template Server Creation");
//   }

//   close() {
//     console.log("Template Server Close");
//   }
// }
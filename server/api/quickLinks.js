// Copyright (c) 2022 soumya
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 17:58:22
 * @modify date 2022-02-26 17:58:22
 * @desc Configurable list for quicklinks
 */
module.exports = {
    /**
 * Card Template
 * { //item
 *      linkTitle: string, //title of the link
        linkUrl: string, // External link url
        iconClass: string, //If you want to use font awsome v 4 icon 
        iconSrc: string, //if you want to choose a custome icon place it inside assets folder
        }
 */
    quickLinksMetaData: [{
            linkTitle: "Google", //title of the link
            linkUrl: "http://google.com", // External link url
            iconClass: "fa fa-google", //If you want to use font awsome v 4 icon 
        },
        {
            linkTitle: "Firefox", //title of the link
            linkUrl: "http://firefox.com", // External link url
            iconClass: "fa fa-firefox", //If you want to use font awsome v 4 icon 
        },
    ],
}
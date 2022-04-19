// Copyright (c) 2022 soumya
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-04-19 17:58:22
 * @modify date 2022-04-19 17:58:22
 * @desc Configurable list for dynamicobjects attribute of type list
 */
module.exports = {
    /**
     * Lists Defination:
     * Lists:<JSON>={
     * [
     * {
     * value:string,
     * text:string
     * },
     * {
     * value:string,
     * text:string
     * }
     * ]
     * }
     * To avoid missmatch please use type string for value field
 * Lists Template
 * Lists: {'status': [
 * {
 *      value: "true",
 *      text: 'Active'
 * },
 * {
 *      value: "false",
 *      text: 'Inactive'
 * }
 * ]
 */
    Lists: {
        severity:[
        {
            value:"1",
            text:'Critical'
        },
        {
            value:"2",
            text:'High'
        },
        {
            value:"3",
            text:'Medium'
        },
        {
            value: "4",
            text: 'Low'
        }
        ],
        complexity:[
            {
                value:"5",
                text:'Complex'
            },
            {
                value:"4",
                text:'High'
            },
            {
                value:"3",
                text:'Medium'
            },
            {
                value: "2",
                text: 'Low'
            },
            {
                value: "1",
                text: 'Minor'
            }
        ]
    }
}
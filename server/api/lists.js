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
     * Lists:<JSON >={
     * <item>:<JSONArray>   [
     * {
     * value:string,
     * text:string,
     * template:string
     * },
     * {
     * value:string,
     * text:string,
     * template:string
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
    ratings: [
      {
        value: "5",
        text: "Excellent",
        template: `<span  style="color:var(--success)">
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                </span>`,
      },
      {
        value: "4",
        text: "Good",
        template: `<span style="color:var(--orange)">
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                </span>`,
      },
      {
        value: "3",
        text: "Average",
        template: `<span style="color:var(--orange)">
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                </span>`,
      },
      {
        value: "2",
        text: "Poor",
        template: `<span  style="color:var(--red)">
                <i class="fa  fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                </span>`,
      },
      {
        value: "1",
        text: "Terrible",
        template: `<span style="color:var(--red)">
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                </span>`,
      },
    ],
    status: [
      {
        value: "ACTIVE",
        text: "ACTIVE",
        template: `<i style=" color: #5cb85c;" class="fa fa-check-circle"></i>`,
      },
      {
        value: "INACTIVE",
        text: "INACTIVE",
        template: `<i style="color:#f90000;" class="fa fa-times-circle"></i>`,
      },
    ],
    yorn: [
      {
        value: "true",
        text: "Yes",
        template: `<span style="padding:5px !important;" class=" alert alert-success"><b>Yes</b></span>`,
      },
      {
        value: "false",
        text: "No",
        template: `<span style="padding:5px !important;" class=" alert alert-danger"><b>No</b></span>`,
      },
    ],
    severity: [
      {
        value: "1",
        text: "Critical",
      },
      {
        value: "2",
        text: "High",
      },
      {
        value: "3",
        text: "Medium",
      },
      {
        value: "4",
        text: "Low",
      },
    ],
    months: [
      { value: "JAN", text: "JAN" },
      { value: "FEB", text: "FEB" },
      { value: "MAR", text: "MAR" },
      { value: "APR", text: "APR" },
      { value: "MAY", text: "MAY" },
      { value: "JUNE", text: "JUNE" },
      { value: "JULY", text: "JULY" },
      { value: "AUG", text: "AUG" },
      { value: "SEPT", text: "SEPT" },
      { value: "OCT", text: "OCT" },
      { value: "NOV", text: "NOV" },
      { value: "DEC", text: "DEC" },
    ],
    complexity: [
      {
        value: "5",
        text: "Complex",
      },
      {
        value: "4",
        text: "High",
      },
      {
        value: "3",
        text: "Medium",
      },
      {
        value: "2",
        text: "Low",
      },
      {
        value: "1",
        text: "Minor",
      },
    ],
    envtype: [
      {
        value: "dev",
        text: "Development",
      },
      {
        value: "prod",
        text: "Production",
      },
    ],
  },
};

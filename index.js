// ==UserScript==
// @name         aliCloudHelper
// @namespace    aliCloudHelper
// @version      0.0.1
// @author       liubei2077
// @description  a cool aliCloud tool
// @homepage     https://github.com/liubei2077/aliCloudHelper
// @include      *://aliyundrive.com/*
// @icon
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @grant        GM_log
// @connect      api.aliyundrive.com
// @connect      aliyundrive.com
// ==/UserScript==

;(async () => {
  //cdn方式引入axios
  var script_el = document.createElement("script")
  var head = document.getElementsByTagName("head")
  head[0].appendChild(script_el)
  script_el.onload = () => {
    ;(async () => {
      let tokenStr = localStorage.getItem("token")
      let tokenObj = JSON.parse(tokenStr)
      console.log(tokenObj)
      let res = await axios({
        method: "post",
        url: "https://api.aliyundrive.com/v2/user/get",
        data: {},
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "zh-CN,zh;q=0.9",
          authorization: tokenObj.access_token,
          "content-type": "application/json;charset=UTF-8",
        },
      })
      console.log(res)

      let res2 = await axios({
        method: "post",
        url: "https://api.aliyundrive.com/v2/file/create",
        data: {
          check_name_mode: "auto_rename",
          content_hash: "9F51C77CA2DFE23CFA1FF49767CBCB22092CADE0",
          content_hash_name: "sha1",
          drive_id: tokenObj.default_drive_id,
          name: "test2.mp4",
          parent_file_id: "root",
          part_info_list: Array.from(
            { length: Math.ceil(1524471299 / 1024 / 1024 / 10) },
            (_, index) => {
              return { part_number: index + 1 }
            }
          ),
          size: 1524471299, // 字节
          type: "file",
        },
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "zh-CN,zh;q=0.9",
          authorization: tokenObj.access_token,
          "content-type": "application/json;charset=UTF-8",
        },
      })
      console.log(res2)
    })()
  }
  script_el.src = "https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"
})()

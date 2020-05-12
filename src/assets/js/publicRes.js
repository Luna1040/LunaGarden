import vue from 'vue'
import axios from 'axios'
import {
  url
} from './url.js'
// import { setToken, getToken } from '@/libs/util'
// post请求
const getData = function (branchUrl, info) {
  // let formdata = new FormData();
  // formdata.append('file','123');
  const headData = {
    headers: {
      mac: info.mac
    }
  }
  return axios.post(url + branchUrl, info, headData).then((msg) => {
    console.log(msg);
    if (msg.status === 200) {
      if (msg.data.status) {
        if (msg.data.data) {
          // console.log("打印POST请求返回结果msg.data.data:" + JSON.stringify(msg.data.data));
          return msg.data
        } else {
          // console.log("打印POST请求返回结果msg.data:" + JSON.stringify(msg.data));
          return msg.data
        }
      }
    }
  })
}
const getDataGet = function (branchUrl, info) {
  const infopage = info || ''
  return axios.get(url + branchUrl + infopage).then((msg) => {
    if (msg.status === 200) {
      if (msg.data.status) {
        return msg.data.data
      }
    }
  })
}
// patch请求
const getDataPatch = function (branchUrl, info) {
  return axios.patch(url + branchUrl, info).then((msg) => {
    if (msg.status === 200) {
      if (msg.data.status) {
        return msg.data.data
      }
    }
  })
}

// put请求
const getDataPut = function (branchUrl, info) {
  return axios.put(url + branchUrl, info).then((msg) => {
    if (msg.status === 200) {
      if (msg.data.status) {
        if (msg.data.data) {
          return msg.data
        } else {
          return msg.data
        }
      }
    }
  })
}

const getDataPutMsg = function (branchUrl, info) {
  return axios.put(url + branchUrl, info).then((msg) => {
    if (msg.status === 200) {
      return msg.data
    }
  })
}
// delete删除
const getDataDel = function (branchUrl, info) {
  const infopage = info || ''
  return axios.delete(url + branchUrl + infopage).then((msg) => {
    if (msg.status === 200) {
      if (msg.data.status) {
        if (msg.data.data) {
          return msg.data
        } else {
          return msg.data
        }
      }
    }
  })
}
// delete删除副本 部门删除用
const getDataDels = function (branchUrl) {
  return axios.delete(url + branchUrl, info).then((msg) => {
    if (msg.status === 200) {
      if (msg.data.status) {
        return msg.data.data
        // return msg.data.status
      }
    }
  })
}

const getDataDelMsg = function (branchUrl) {
  return axios.delete(url + branchUrl).then((msg) => {
    if (msg.status === 200) {
      return msg.data
    }
  })
}

// const getDataBatchDel = function (branchUrl, info) {
//   return axios.delete(url + branchUrl, info).then((msg) => {
//     if (msg.status == 200) {
//       if (msg.data.status) {
//         return msg.data.data
//       }
//     }
//   })
// }

// 多个请求
const getDataAll = function (branchUrls) {
  const list = []
  branchUrls.forEach((branchUrl) => {
    list.push(axios.get(url + branchUrl))
  })

  return axios.all(list)
    .then(axios.spread((...args) => {
      const results = []
      args.map(msg => {
        let result
        if (msg.status === 200) {
          if (msg.data.status) {
            result = msg.data.data
          }
        }
        results.push(result)
      })
      // console.log('yy1', results.pop())
      // console.log('yy2', results.pop())
      return results
    }))
}

// 编辑请求 operation判断是编辑还是新增
const editSelect = function (operation, curId) {
  if (operation == 'add') {} else if (operation == 'edit') {
    if (curId) {
      this.editId = curId
    } else {
      alert('请选择其中一项进行修改')
    }
  }
}

// 测试
const getList = function (operation, curId) {
  if (operation == 'add') {} else if (operation == 'edit') {
    if (curId) {
      this.editId = curId
    } else {
      alert('请选择其中一项进行修改')
    }
  }
}

vue.prototype.editSelect = editSelect
vue.prototype.getData = getData
vue.prototype.getDataPatch = getDataPatch
vue.prototype.getDataDel = getDataDel
vue.prototype.getDataDels = getDataDels
vue.prototype.getDataDelMsg = getDataDelMsg
vue.prototype.getDataPut = getDataPut
vue.prototype.getDataPutMsg = getDataPutMsg
vue.prototype.getDataAll = getDataAll
vue.prototype.getDataGet = getDataGet
// vue.prototype.getDataBatchDel = getDataBatchDel
// export{ getData , getDataPatch,getDataDel,editSelect,getDataGet}

// axios.interceptors.request.use((config) => {
//   if (getToken()) {
//       // 全局配置请求头添加内容
//     // config.headers['Authorization'] = getToken().replace(/Bearer /g, '')

//   } else {

//   }
//   return config
// })

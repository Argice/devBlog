var express = require('express');
var router = express.Router();


// 文章模板导入
let Article = require('../models/article')
// 转换时间格式的工具包导入
let moment = require('moment')

/* GET home page. */
router.get('/', async function (req, res, next) {
  let cPage = req.query.page || 1
  // console.log(cPage);
  // let data = await Article.find()
  // console.log(data);
  let userName = req.session.username || ''

  let data = {
    blogList: [],//文章列表
    currPage: cPage,//当前页数
    PagesTotle: '',//总页数
  }
  // 设定每页渲染的条数
  let pageSize = 4
  // 确定每页显示的数据
  data.blogList = await Article.find()
    .limit(pageSize)//限定展示出来的条数
    .skip((data.currPage - 1) * pageSize)//限定从第几条开始截取
    .sort({ id: -1 })
  // 总数据
  let blogAll = await Article.find()
  // 总页码
  data.PagesTotle = blogAll.length / pageSize
  // console.log(data.PagesTotle);
  // 将所有的时间戳转换成时间
  data.blogList.map(item => {
    let a = moment(item.id).format('MMMM Do YYYY');
    item['time'] = a
  })
  res.render('index', { userName, data });
});
// 写文章页面路由配置
router.get('/write', async (req, res, next) => {
  let userName = req.session.username || ''
  let _id = req.query._id || ''
  // 如果存在id渲染页面数据
  if (_id) {
    let page = req.query.page

    console.log(_id);
    console.log(page);

    // 文章数据查询渲染

    let details = await Article.findOne({ _id: _id })
    details.page = page
    // 时间处理
    res.render('write', { userName, details })

  } else {
    // 如果不存在id，直接渲染无数据页面(null--------------‘’)
    let details = {
      title: '',
      content: '',
      _id: ''
    }
    res.render('write', { userName, details })
  }
})
// 登录路由配置
router.get('/login', function (req, res) {
  res.render('login', {})
})
// 注册路由配置
router.get('/register', function (req, res) {
  res.render('register', {})
})

// 文章详情页路由配置
router.get('/article', function (req, res) {
  res.render('abc_article', {})
})

module.exports = router;

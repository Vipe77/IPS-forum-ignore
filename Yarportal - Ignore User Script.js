// ==UserScript==
// @name        Yarportal Ignore
// @namespace   http://yarportal.ru
// @description Игнор на Ярпортале
// @include     http://yarportal.ru/*
// @include     http://www.yarportal.ru/*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==

// Шерстим темы
var Users = [
  {
    userName: 'xxx',
    hideThread: true,
    hidePost: true,
    hideQuote: true
  },
  {
    userName: 'xxx',
    hideThread: true,
    hidePost: true,
    hideQuote: true
  },
  {
    userName: 'xxx',
    hideThread: true,
    hidePost: true,
    hideQuote: true
  },
  {
    userName: 'xxx',
    hideThread: true,
    hidePost: true,
    hideQuote: true
  },
  {
    userName: 'xxx',
    hideThread: true,
    hidePost: true,
    hideQuote: true
  }
];
var curPageName = window.location.pathname.toString();
function checkContains(elem, text) {
  var result = 0;
  elem.each(function () {
    if (~this.innerHTML.indexOf(text)) result++;
  });
  return result;
}
if (~curPageName.indexOf('forum')) {
  var threads = $('table tr');
  threads.each(function (index) {
    var thread = $(this);
    for (var id in Users)
    {
      var hideUser = Users[id].userName;
      var hideThread = Users[id].hideThread;
      if (hideThread)
      {
        var check = checkContains(thread.find('td.row2 a'), hideUser);
        var checkTwo = checkContains(thread.find('td.row2 span.desc b a'), hideUser);
        if ((check - checkTwo) == 1)
        {
          thread.hide();
        }
      }
    }
  });
}

if (~curPageName.indexOf('topic')) {
  // Шерстим посты
  var posts = $('table tr');
  posts.each(function (index) {
    var post = $(this);
    for (var id in Users)
    {
      var hideUser = Users[id].userName;
      var hidePost = Users[id].hidePost;
      var hideQuote = Users[id].hideQuote;
      var hideUserN = hideUser.replace(' ', '&nbsp;');
      var check = checkContains(post.find('td.row4 span.normalname a'), hideUserN);
      if (check > 0)
      {
        if (hidePost) {
          post.parent().hide();
        }
      }
      if (hideQuote)
      {
        var hideUser = '(' + hideUser + ' @';
        var check = checkContains(post.find('td'), hideUser);
        if (check > 0) {
          post.parent().hide();
        }
      }
    }
  });
}

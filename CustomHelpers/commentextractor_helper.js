const Helper = require('@codeceptjs/helper');

class CommentExtractor extends Helper {

  // Нерабочий извлекатель комментариев - CodeceptJS не имеет доступа
  // к глобальным переменным location и document.

  async grabComment() {
    let htmlToStr = document.documentElement.innerHTML.slice(-100);
    //or 
    htmlToStr = await fetch(location.pathname).then(resp=>resp.text());
    let comment = /<!--.*?-->/g[Symbol.match](htmlToStr)[1]||[];
    comment = comment.split(' ');
    comment = comment[comment.length-1].slice(0, -3);
    testsDataArray.push(comment);
  }

}

module.exports = CommentExtractor;

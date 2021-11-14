if(window.snake)snake.invisible = function() {
  [...document.getElementsByTagName('img')].forEach((e, i) => i !== 3 && i !== 10 && i < 86 && (e.src = ''));

  const scripts = document.getElementsByTagName('script');
  for(let script of scripts) {
    const req = new XMLHttpRequest();
    req.open('GET', script.src);
    req.onload = function() {
      const code = this.responseText;

      if(code.indexOf('#A2') === -1)
        return;

      eval(
        code.match(
          /[a-zA-Z0-9_$]{1,8}\.prototype\.render=function\(a,b,c,d,e\){[^]*?}/
        )[0].replace(
          /this\.[a-zA-Z0-9_$]{1,8}\.canvas/,
          'new Image()'
        )
      );

      const fd = code.match(
        /[a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8}\.play\(\);/
      )[0].match(/[a-zA-Z0-9_$]{1,8}/)[0];

      eval(
        `for(_ of Object.keys(${fd}))${fd}[_].play = function() {}`
      );

      eval(
        code.match(
          /[a-zA-Z0-9_$]{1,8}=function\(a\){return a\.[a-zA-Z0-9_$]{1,8}\.canvas}/
        )[0].replace(/{[^]*?}/, '{return new Image()}')
      );




    };
    req.send();
  }
};

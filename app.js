function startGame() {
  $('#menu').css('visibility', 'hidden');

  let start = 3;

  document.getElementById('number').innerHTML = start;
  setInterval(() => {
    if (start == 0) {
      $('#number').css('display', 'none');
    }
    start--;
    document.getElementById('number').innerHTML = start;
  }, 1000);

  let count = 0;
  function Score() {
    setTimeout(function () {
      var myVar = setInterval(myTimer, 1000);

      function myTimer() {
        count++;
        document.getElementById('time').innerHTML = count;
      }

      setInterval(function () {
        if (
          collision($('#character'), $('#obstacle4')) ||
          collision($('#character'), $('#obstacle3')) ||
          collision($('#character'), $('#obstacle2')) ||
          collision($('#character'), $('#obstacle1')) ||
          collision($('#character'), $('#obstacle0'))
        ) {
          clearInterval(myVar);
          $('#final').css('visibility', 'visible');
          document.getElementById('finalscore').innerHTML = count;

          let imgscr = '';
          if (count < 15) {
            imgscr = 'img/weakness.jpg';
          } else if (count >= 15 && count <= 30) {
            imgscr = 'img/obama.jpg';
          } else if (count > 30 && count <= 99) {
            imgscr = 'img/hdydi.jpg';
          } else {
            imgscr = 'img/d.jpg';
          }
          $('#image').attr('src', imgscr);
        }
      }, 10);
    }, 3200);
  }

  setTimeout(() => {
    Score();

    setInterval(function () {
      StartMove(obstacle0);
    }, 3200);

    setInterval(function () {
      StartMove(obstacle1);
    }, 3600);

    setInterval(function () {
      StartMove(obstacle2);
    }, 3100);

    setInterval(function () {
      StartMove(obstacle3);
    }, 3700);

    setInterval(function () {
      StartMove(obstacle4);
    }, 3500);
  }, 1200);

  //falling divs
  const obstacle0 = document.getElementById('obstacle0');
  const obstacle1 = document.getElementById('obstacle1');
  const obstacle2 = document.getElementById('obstacle2');
  const obstacle3 = document.getElementById('obstacle3');
  const obstacle4 = document.getElementById('obstacle4');

  function StartMove(o) {
    let zerotothree = Math.floor(Math.random() * 4);

    if (zerotothree == 0) {
      o.classList.add('animation0');

      setTimeout(function () {
        o.classList.remove('animation0');
      }, 2500);
    } else if (zerotothree == 1) {
      o.classList.add('animation1');
      setTimeout(function () {
        o.classList.remove('animation1');
      }, 3000);
    } else if (zerotothree == 2) {
      o.classList.add('animation2');
      setTimeout(function () {
        o.classList.remove('animation2');
      }, 2000);
    } else if (zerotothree == 3) {
      o.classList.add('animation3');
      setTimeout(function () {
        o.classList.remove('animation3');
      }, 2200);
    }
  }

  // character movement
  $(function () {
    var pane = $('#game-space'),
      box = $('#character'),
      wh = pane.width() - box.width(),
      wv = pane.height() - box.height(),
      d = {},
      x = 5;

    function newh(v, a, b) {
      var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
      return n < 0 ? 0 : n > wh ? wh : n;
    }

    function newv(v, a, b) {
      var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
      /* return n < 0 ? 0 : n > wv ? wv : n; */
    }

    $(window).keydown(function (e) {
      d[e.which] = true;
    });

    $('#right').click(function () {
      d[39] = true;
      setTimeout(function () {
        d[39] = false;
      }, 120);
    });

    $('#left').click(function () {
      d[37] = true;
      setTimeout(function () {
        d[37] = false;
      }, 120);
    });

    $(window).keyup(function (e) {
      d[e.which] = false;
    });

    setInterval(function () {
      box.css({
        left: function (i, v) {
          return newh(v, 37, 39);
        },
        top: function (i, v) {
          return newv(v, 38, 40);
        },
      });
      wh = pane.width() - box.width();
      wv = pane.height() - box.height();
    }, 20);
  });

  //check if two div touch each other
  function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
  }

  // end the game
  setInterval(function () {
    if (
      collision($('#character'), $('#obstacle4')) ||
      collision($('#character'), $('#obstacle3')) ||
      collision($('#character'), $('#obstacle2')) ||
      collision($('#character'), $('#obstacle1')) ||
      collision($('#character'), $('#obstacle0'))
    ) {
      $('#game-space').css('visibility', 'hidden');
      return;
    }
  }, 10);
}

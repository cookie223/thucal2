// Generated by IcedCoffeeScript 1.4.0b
(function() {
  var buildArray, cmp, getTOffset, inferYear, parseTermId, parseTimeStr, parseWeekStr, period,
    __slice = [].slice;

  window.buildArray = buildArray = function() {
    var a, d, dims, i, _i, _j, _len;
    dims = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (!(dims != null ? dims.length : void 0)) return null;
    d = dims != null ? dims.shift() : void 0;
    if (d.length != null) {
      a = [];
      for (_i = 0, _len = d.length; _i < _len; _i++) {
        i = d[_i];
        a[i] = buildArray.apply(null, dims);
      }
    } else {
      a = new Array(d);
      for (i = _j = 0; _j < d; i = _j += 1) {
        a[i] = buildArray.apply(null, dims);
      }
    }
    return a;
  };

  window.cmp = cmp = function(a, b) {
    switch (false) {
      case !(a < b):
        return -1;
      case !(a > b):
        return +1;
      default:
        return 0;
    }
  };

  window.inferYear = inferYear = function(termIdP, m, d) {
    var md, th, y;
    md = moment().month(m - 1).date(d);
    th = moment().month(5 - 1).date(1);
    if (termIdP.termN === 1 && md.isAfter(th)) {
      y = termIdP.beginY;
    } else {
      y = termIdP.endY;
    }
    return moment([y, m - 1, d]);
  };

  window.getTOffset = getTOffset = function(t) {
    return t.clone().diff(t.clone().startOf('day'));
  };

  window.period = period = ["00:00", "08:00", "09:50", "13:30", "15:20", "17:05", "19:20"].map(function(s) {
    var t;
    t = moment(s, 'HHmm');
    return {
      beginT: getTOffset(t),
      endT: getTOffset(t.add(1, 'hours').add(35, 'minutes'))
    };
  });

  window.parseTermId = parseTermId = function(termId) {
    var match;
    if ((match = /(\d{4})-(\d{4})-(\d)/.exec(termId)) == null) return null;
    return {
      beginY: parseInt(match[1]),
      endY: parseInt(match[2]),
      termN: parseInt(match[3])
    };
  };

  window.printTermId = function(termIdP) {
    return termIdP.beginY + '-' + termIdP.endY + '-' + ((function() {
      switch (termIdP.termN) {
        case 1:
          return '秋';
        case 2:
          return '春';
        default:
          return '不科学';
      }
    })());
  };

  window.parseTimeStr = parseTimeStr = function(infoStr) {
    var match;
    if ((match = /时间(\d{1,2}:\d{1,2})-(\d{1,2}:\d{1,2})/.exec(infoStr)) == null) {
      return null;
    }
    return {
      beginT: getTOffset(moment(match[1], 'HHmm')),
      endT: getTOffset(moment(match[2], 'HHmm'))
    };
  };

  window.parseWeekStr = parseWeekStr = function(weekStr) {
    var match, part, ret, s, w, _i, _j, _len, _ref, _ref1, _ref2;
    if (!(part = /(([\d,-]+)|全|前八|后八|单|双)周/.exec(weekStr))) return null;
    switch (part[1].charAt(0)) {
      case '全':
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      case '前':
        return [1, 2, 3, 4, 5, 6, 7, 8];
      case '后':
        return [9, 10, 11, 12, 13, 14, 15, 16];
      case '单':
        return (function() {
          var _i, _results;
          _results = [];
          for (w = _i = 1; _i <= 16; w = _i += 2) {
            _results.push(w);
          }
          return _results;
        })();
      case '双':
        return (function() {
          var _i, _results;
          _results = [];
          for (w = _i = 2; _i <= 16; w = _i += 2) {
            _results.push(w);
          }
          return _results;
        })();
      default:
        ret = [];
        _ref = part[2].split(',');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          s = _ref[_i];
          if ((match = /^\d+$/.exec(s)) != null) ret.push(Number(match[0]));
          if ((match = /^(\d+)-(\d+)$/.exec(s)) != null) {
            for (w = _j = _ref1 = Number(match[1]), _ref2 = Number(match[2]); _j <= _ref2; w = _j += 1) {
              ret.push(w);
            }
          }
        }
        return ret;
    }
  };

}).call(this);

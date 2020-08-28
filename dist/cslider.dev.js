"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function createCSlider(a, b, c, d) {
  r = new CSlider(a, b, c, d);
  return r;
}

var CSlider =
/*#__PURE__*/
function () {
  function CSlider(min, max) {
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (min + max) / 2;
    var step = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    _classCallCheck(this, CSlider);

    this.width = 130;
    this.height = 20;
    var widthtoheight = this.width - this.height;
    this.ratio = this.width / widthtoheight;
    this.x = 10;
    this.y = -1000;
    this.spos = this.x + this.width / 2 - this.height / 2;
    this.newspos = this.spos;
    this.sposMin = this.x;
    this.sposMax = this.x + this.width - this.height;
    this.vmin = min;
    this.vmax = max;
    this.svalue = constrain(value, this.vmin, this.vmax);
    this.vstep = step;
    this.loose = 1;
    this.over = false;
    this.locked = false;
    this.scale = 1;
  }

  _createClass(CSlider, [{
    key: "update",
    value: function update() {
      if (this.overEvent()) {
        this.over = true;
      } else {
        this.over = false;
      }

      if (mouseIsPressed && this.over) {
        this.locked = true;
      }

      if (!mouseIsPressed) {
        this.locked = false;
      }

      if (this.locked) {
        this.newspos = constrain(mouseX / this.scale - this.height / 2, this.sposMin, this.sposMax);
        this.svalue = this.vmin + (this.vmax - this.vmin) * ((this.newspos - this.sposMin) / (this.sposMax - this.sposMin));

        if (this.vstep > 0) {
          this.svalue = constrain(this.vmin + round((this.svalue - this.vmin) / this.vstep) * this.vstep, this.vmin, this.vmax);
        }

        this.newspos = this.x + (this.width - this.height) * ((this.svalue - this.vmin) / (this.vmax - this.vmin));
      }

      if (abs(this.newspos - this.spos) > 1) {
        this.spos = this.spos + (this.newspos - this.spos) / this.loose;
      }
    }
  }, {
    key: "overEvent",
    value: function overEvent() {
      if (mouseX / this.scale > this.x && mouseX / this.scale < this.x + this.width && mouseY / this.scale > this.y && mouseY / this.scale < this.y + this.height) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "display",
    value: function display() {
      noStroke();
      fill(204);
      rect(this.x, this.y, this.width, this.height);

      if (this.over || this.locked) {
        fill(0, 0, 0);
      } else {
        fill(102, 102, 102);
      }

      rect(this.spos, this.y, this.height, this.height);
    }
  }, {
    key: "getPos",
    value: function getPos() {
      // Convert spos to be values between
      // 0 and the total width of the scrollbar
      return this.spos * this.ratio;
    }
  }, {
    key: "value",
    value: function value() {
      return this.svalue;
    }
  }, {
    key: "setScale",
    value: function setScale(sc) {
      this.scale = sc;
    }
  }, {
    key: "position",
    value: function position(xp, yp) {
      this.x = xp;
      this.y = yp;

      if (this.vstep > 0) {
        this.svalue = constrain(this.vmin + round((this.svalue - this.vmin) / this.vstep) * this.vstep, this.vmin, this.vmax);
      }

      this.spos = this.x + (this.width - this.height) * ((this.svalue - this.vmin) / (this.vmax - this.vmin)); //console.log(this.smin);

      this.newspos = this.spos;
      this.sposMin = this.x;
      this.sposMax = this.x + this.width - this.height;
      push();
      this.update();
      this.display();
      pop();
    }
  }]);

  return CSlider;
}();
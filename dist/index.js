'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function (_React$Component) {
  _inherits(Component, _React$Component);

  function Component(props) {
    _classCallCheck(this, Component);

    var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props));

    _this.state = {
      availability: {
        morning: {},
        day: {},
        evening: {},
        overnight: {}
      }
    };

    _this.getValue = _this.getValue.bind(_this);
    _this.renderShiftWeek = _this.renderShiftWeek.bind(_this);
    _this.handleBlockClick = _this.handleBlockClick.bind(_this);
    return _this;
  }

  /**
   * Returns the value of this.state.availability
   */


  _createClass(Component, [{
    key: 'getValue',
    value: function getValue() {
      return this.state.availability;
    }

    /**
     * Render a <td> with onClick handler and style based on `status`
     * @param {bool|null} status true=avail, false=unavail, undefined=not set
     */

  }, {
    key: 'renderBlock',
    value: function renderBlock(status, shift, day) {
      var styles = {
        available: { backgroundColor: 'green' },
        unavailable: { backgroundColor: 'orange' }
      };

      var style = status === true ? styles.available : styles.unavailable;
      Object.assign(style, {
        height: '50px', width: '100%'
      });

      return _react2.default.createElement(
        'td',
        { key: Math.random() },
        _react2.default.createElement('div', { style: style, 'data-id': shift + '|' + day, onClick: this.handleBlockClick })
      );
    }
  }, {
    key: 'renderShiftWeek',
    value: function renderShiftWeek(shift) {
      var self = this;
      var week = [0, 1, 2, 3, 4, 5, 6, 7];
      return week.map(function (el, i) {
        if (i === 0) {
          return _react2.default.createElement(
            'td',
            { key: Math.random(), style: { fontWeight: '700' } },
            shift
          );
        }
        shift = shift.toLowerCase();
        return self.renderBlock(self.state.availability[shift][i], shift, i);
      });
    }
  }, {
    key: 'handleBlockClick',
    value: function handleBlockClick(e) {
      var el = e.currentTarget.getAttribute('data-id');
      var shift = el.substr(0, el.indexOf('|'));
      var day = el.substr(el.indexOf('|') + 1, el.length);

      var availability = {};
      Object.assign(availability, this.state.availability);
      availability[shift][day] = availability[shift][day] || false;

      this.setState({
        availability: availability
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var renderKey = function renderKey() {
        return _react2.default.createElement(
          'div',
          { style: { width: '250px', padding: '10px' } },
          _react2.default.createElement(
            'span',
            { style: { fontSize: '12px', color: 'grey' } },
            '* Click on the time blocks to change your availability'
          ),
          _react2.default.createElement(
            'div',
            { style: { backgroundColor: 'green', margin: '5px', padding: '5px' } },
            'Available'
          ),
          _react2.default.createElement(
            'div',
            { style: { backgroundColor: 'orange', margin: '5px', padding: '5px' } },
            'Unavailable'
          )
        );
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'table',
          { style: { width: '100%', border: '1px solid grey', textAlign: 'center' } },
          _react2.default.createElement(
            'tbody',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement('th', { style: { width: '100px' } }),
              _react2.default.createElement(
                'th',
                { style: { textAlign: 'center' } },
                'Mon'
              ),
              _react2.default.createElement(
                'th',
                { style: { textAlign: 'center' } },
                'Tue'
              ),
              _react2.default.createElement(
                'th',
                { style: { textAlign: 'center' } },
                'Wed'
              ),
              _react2.default.createElement(
                'th',
                { style: { textAlign: 'center' } },
                'Thu'
              ),
              _react2.default.createElement(
                'th',
                { style: { textAlign: 'center' } },
                'Fri'
              ),
              _react2.default.createElement(
                'th',
                { style: { textAlign: 'center' } },
                'Sat'
              ),
              _react2.default.createElement(
                'th',
                { style: { textAlign: 'center' } },
                'Sun'
              )
            ),
            _react2.default.createElement(
              'tr',
              null,
              this.renderShiftWeek('Morning')
            ),
            _react2.default.createElement(
              'tr',
              null,
              this.renderShiftWeek('Day')
            ),
            _react2.default.createElement(
              'tr',
              null,
              this.renderShiftWeek('Evening')
            ),
            _react2.default.createElement(
              'tr',
              null,
              this.renderShiftWeek('Overnight')
            )
          )
        ),
        renderKey()
      );
    }
  }]);

  return Component;
}(_react2.default.Component);

exports.default = Component;

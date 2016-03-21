define('dummy/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('dummy/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'dummy/tests/helpers/start-app', 'dummy/tests/helpers/destroy-app'], function (exports, _qunit, _dummyTestsHelpersStartApp, _dummyTestsHelpersDestroyApp) {
  var _slice = Array.prototype.slice;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _dummyTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          var _options$beforeEach;

          (_options$beforeEach = options.beforeEach).call.apply(_options$beforeEach, [this].concat(_slice.call(arguments)));
        }
      },

      afterEach: function afterEach() {
        (0, _dummyTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          var _options$afterEach;

          (_options$afterEach = options.afterEach).call.apply(_options$afterEach, [this].concat(_slice.call(arguments)));
        }
      }
    });
  };
});
define('dummy/tests/helpers/register-select-helper', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = function () {
    _ember['default'].Test.registerAsyncHelper('select', function (app, selector) {
      for (var _len = arguments.length, texts = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        texts[_key - 2] = arguments[_key];
      }

      var $options = app.testHelpers.findWithAssert(selector + ' option');

      $options.each(function () {
        var _this = this;

        var $option = _ember['default'].$(this);

        _ember['default'].run(function () {
          _this.selected = texts.some(function (text) {
            return $option.is(':contains(\'' + text + '\')');
          });
          $option.trigger('change');
        });
      });

      return app.testHelpers.wait();
    });
  };
});
define('dummy/tests/helpers/resolver', ['exports', 'dummy/resolver', 'dummy/config/environment'], function (exports, _dummyResolver, _dummyConfigEnvironment) {

  var resolver = _dummyResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _dummyConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _dummyConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('dummy/tests/helpers/start-app', ['exports', 'ember', 'dummy/app', 'dummy/config/environment'], function (exports, _ember, _dummyApp, _dummyConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _dummyConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs);

    _ember['default'].run(function () {
      application = _dummyApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('dummy/tests/integration/components/device-selection/component-test', ['exports', 'ember', 'ember-qunit'], function (exports, _ember, _emberQunit) {

  var tHelper = _ember['default'].Helper.extend({
    compute: function compute(params) {
      return params[0];
    }
  });

  var andHelper = _ember['default'].Helper.extend({
    compute: function compute(params) {
      return params[0] && params[1];
    }
  });

  var webrtcService = _ember['default'].Service.extend({
    canShareAudio: true,
    canListDevices: true,
    canShareVideo: true,
    cameraList: _ember['default'].A(),
    microphoneList: _ember['default'].A(),
    outputDeviceList: _ember['default'].A(),
    resolutionList: _ember['default'].A()
  });

  var mockDevices = [{ deviceId: 'foobar', label: 'foobar' }, { deviceId: 'fizzbuzz', label: 'fizzbuzz' }];

  var renderDefault = function renderDefault() {
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 3,
              'column': 4
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n        ');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('\n    ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['content', 'device-selection', ['loc', [null, [2, 8], [2, 28]]]]],
        locals: [],
        templates: []
      };
    })()));
  };

  (0, _emberQunit.moduleForComponent)('device-selection', 'Integration | Component | device selection', {
    integration: true,

    beforeEach: function beforeEach() {
      this.register('helper:t', tHelper);
      this.register('helper:and', andHelper);
      this.register('service:webrtc', webrtcService);
      this.inject.service('webrtc', { as: 'webrtc' });
      this.renderDefault = renderDefault.bind(this);
    }
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value')
    // Handle any actions with this.on('myAction', function(val) { ... });"

    this.renderDefault();

    assert.equal(this.$('.options').length, 1);
  });

  (0, _emberQunit.test)('it shows a message iff the browser cannot enumerate devices', function (assert) {
    this.set('webrtc.canListDevices', false);
    this.renderDefault();
    assert.equal(this.$('.browser-settings-message').length, 1);

    this.set('webrtc.canListDevices', true);
    this.renderDefault();
    assert.equal(this.$('.browser-settings-message').length, 0);
  });

  (0, _emberQunit.test)('it shows a camera select and resolution select iff there are cameras, and video is true', function (assert) {
    return _ember['default'].run(this, function () {
      this.get('webrtc.cameraList').pushObjects(mockDevices);
      this.renderDefault();
      assert.equal(this.$('select').length, 2);

      this.get('webrtc.cameraList').clear();
      this.renderDefault();
      assert.equal(this.$('select').length, 0);

      this.get('webrtc.cameraList').pushObjects(mockDevices);
      this.render(_ember['default'].HTMLBars.template((function () {
        return {
          meta: {
            'fragmentReason': {
              'name': 'missing-wrapper',
              'problems': ['wrong-type']
            },
            'revision': 'Ember@2.3.1',
            'loc': {
              'source': null,
              'start': {
                'line': 1,
                'column': 0
              },
              'end': {
                'line': 3,
                'column': 6
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('\n          ');
            dom.appendChild(el0, el1);
            var el1 = dom.createComment('');
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode('\n      ');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [['inline', 'device-selection', [], ['video', false], ['loc', [null, [2, 10], [2, 42]]]]],
          locals: [],
          templates: []
        };
      })()));
      assert.equal(this.$('select').length, 0);
      this.get('webrtc.cameraList').clear();
    });
  });

  (0, _emberQunit.test)('it shows microphone select iff there are microphones and audio is true', function (assert) {
    return _ember['default'].run(this, function () {
      this.get('webrtc.microphoneList').pushObjects(mockDevices);
      this.renderDefault();
      assert.equal(this.$('select').length, 1);

      this.get('webrtc.microphoneList').pushObjects(mockDevices);
      this.render(_ember['default'].HTMLBars.template((function () {
        return {
          meta: {
            'fragmentReason': {
              'name': 'missing-wrapper',
              'problems': ['wrong-type']
            },
            'revision': 'Ember@2.3.1',
            'loc': {
              'source': null,
              'start': {
                'line': 1,
                'column': 0
              },
              'end': {
                'line': 3,
                'column': 6
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('\n          ');
            dom.appendChild(el0, el1);
            var el1 = dom.createComment('');
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode('\n      ');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [['inline', 'device-selection', [], ['audio', false], ['loc', [null, [2, 10], [2, 42]]]]],
          locals: [],
          templates: []
        };
      })()));
      assert.equal(this.$('select').length, 0);
      this.get('webrtc.microphoneList').clear();
    });
  });

  // TODO: test initial selection of the selects

  // TODO: test changing value of the selects
});
define('dummy/tests/test-helper', ['exports', 'dummy/tests/helpers/resolver', 'dummy/tests/helpers/register-select-helper', 'ember-qunit'], function (exports, _dummyTestsHelpersResolver, _dummyTestsHelpersRegisterSelectHelper, _emberQunit) {
  (0, _dummyTestsHelpersRegisterSelectHelper['default'])();

  (0, _emberQunit.setResolver)(_dummyTestsHelpersResolver['default']);
});
define('dummy/tests/unit/mixins/device-enumeration-test', ['exports', 'ember', 'webrtc-devices/mixins/device-enumeration', 'qunit'], function (exports, _ember, _webrtcDevicesMixinsDeviceEnumeration, _qunit) {

  (0, _qunit.module)('Unit | Mixin | device enumeration');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var DeviceEnumerationObject = _ember['default'].Object.extend(_webrtcDevicesMixinsDeviceEnumeration['default']);
    var subject = DeviceEnumerationObject.create();
    assert.ok(subject);
  });

  (0, _qunit.test)('hasCamera should by false if there are no cameras with non-default id', function (assert) {
    var DeviceEnumerationObject = _ember['default'].Object.extend(_webrtcDevicesMixinsDeviceEnumeration['default']);
    var subject = DeviceEnumerationObject.create();
    assert.equal(subject.get('hasCamera'), false);
  });
});
/* jshint ignore:start */

require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
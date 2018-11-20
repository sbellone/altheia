const isPlainObject = require('lodash/isPlainObject');

const LangBase = require('./lang');
const Validator = require('./validator');
const BaseValidator = require('./base');

const AnyValidator = require('./any');
const StringValidator = require('./string');
const ObjectValidator = require('./object');
const NumberValidator = require('./number');
const DateValidator = require('./date');
const ArrayValidator = require('./array');
const BooleanValidator = require('./boolean');
const InternetValidator = require('./internet');
const FunctionValidator = require('./function');

const Instance = (lang) => {
  const inst = (schema) => {
    return new Validator(schema, inst);
  };
  inst.langList = Object.assign({}, LangBase);
  inst.templates = {};

  inst.Base = BaseValidator;
  inst.instance = (newLang = {}) => {
    return Instance(Object.assign({}, inst.lang, newLang));
  };

  inst.use = (Plugin) => {
    const test = new Plugin.Class();
    inst[test.name || test.constructor.name] = () => {
      return new Plugin.Class(inst);
    };
    inst.lang(Plugin.lang);
    return inst;
  };

  inst.lang = (key, tpl) => {
    if (isPlainObject(key)) {
      inst.langList = Object.assign({}, inst.langList, key);
    } else {
      inst.langList[key] = tpl;
    }
  };

  inst.template = (name, schema) => {
    inst.templates[name] = schema;
  };

  inst.is = (name) => {
    if (typeof inst.templates[name] === 'undefined') {
      throw new Error(`unknow template ${name}`);
    }

    return inst.templates[name].clone();
  };

  inst.formatError = ({ name, args, result }, label = 'value', position = null) => {
    // Get messages from error
    let msg;
    if (typeof inst.langList[name] !== 'undefined') {
      msg = inst.langList[name](label, args, result);
    } else {
      msg = 'Invalid value';
    }

    const formatted = {
      label,
      type: name,
      message: msg,
    };

    if (position) {
      formatted.position = position;
    }

    // nested errors
    if (result && result.errors) {
      formatted.errors = result.errors.map((error) => inst.formatError(error.test, error.label, error.position));
    }
    return formatted;
  };

  // Declare basic plugins
  inst.use(AnyValidator);
  inst.use(StringValidator);
  inst.use(NumberValidator);
  inst.use(DateValidator);
  inst.use(ObjectValidator);
  inst.use(ArrayValidator);
  inst.use(BooleanValidator);
  inst.use(InternetValidator);
  inst.use(FunctionValidator);

  // Add passed lang object
  if (lang && isPlainObject(lang)) {
    inst.lang(lang);
  }

  return inst;
};

module.exports = Instance();

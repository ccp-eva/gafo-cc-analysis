var webppl = require("/usr/lib/node_modules/webppl/src/main.js");
var args = require("/usr/lib/node_modules/webppl/src/args.js");
args.makeGlobal(__filename, process.argv.slice(2));
var webpplJson = require("/home/manuel_bohn/gafo-cc-analysis/model/node_modules/webppl-json");
var webpplSampleWriter = require("/home/manuel_bohn/gafo-cc-analysis/model/node_modules/webppl-sample-writer");
webppl.requireHeader("/home/manuel_bohn/gafo-cc-analysis/model/node_modules/webppl-sample-writer/src/header.js");
var __runner__ = util.trampolineRunners.cli();
function topK(s, x) {
  console.log(x);
};
var main = (function (_globalCurrentAddress) {
    return function (p) {
        return function (runTrampoline) {
            return function (s, k, a) {
                runTrampoline(function () {
                    return p(s, k, a);
                });
            };
        };
    }(function (globalStore, _k0, _address0) {
        var _currentAddress = _address0;
        _addr.save(_globalCurrentAddress, _address0);
        var Bernoulli = dists.makeBernoulli;
        var Beta = dists.makeBeta;
        var Binomial = dists.makeBinomial;
        var Categorical = dists.makeCategorical;
        var Cauchy = dists.makeCauchy;
        var Delta = dists.makeDelta;
        var DiagCovGaussian = dists.makeDiagCovGaussian;
        var Dirichlet = dists.makeDirichlet;
        var Discrete = dists.makeDiscrete;
        var Exponential = dists.makeExponential;
        var Gamma = dists.makeGamma;
        var Gaussian = dists.makeGaussian;
        var ImproperUniform = dists.makeImproperUniform;
        var IspNormal = dists.makeIspNormal;
        var KDE = dists.makeKDE;
        var Laplace = dists.makeLaplace;
        var LogNormal = dists.makeLogNormal;
        var LogisticNormal = dists.makeLogisticNormal;
        var LogitNormal = dists.makeLogitNormal;
        var Marginal = dists.makeMarginal;
        var Mixture = dists.makeMixture;
        var Multinomial = dists.makeMultinomial;
        var MultivariateBernoulli = dists.makeMultivariateBernoulli;
        var MultivariateGaussian = dists.makeMultivariateGaussian;
        var Poisson = dists.makePoisson;
        var RandomInteger = dists.makeRandomInteger;
        var SampleBasedMarginal = dists.makeSampleBasedMarginal;
        var TensorGaussian = dists.makeTensorGaussian;
        var TensorLaplace = dists.makeTensorLaplace;
        var Uniform = dists.makeUniform;
        var gaussianDrift = function gaussianDrift(globalStore, _k361, _address31, params) {
            var _currentAddress = _address31;
            _addr.save(_globalCurrentAddress, _address31);
            return function () {
                return Gaussian(globalStore, function (globalStore, _result362) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    return function () {
                        return sample(globalStore, _k361, _address31.concat('_58'), _result362, {
                            driftKernel: function (globalStore, _k363, _address32, prevVal) {
                                var _currentAddress = _address32;
                                _addr.save(_globalCurrentAddress, _address32);
                                var _k364 = function (globalStore, width) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    return function () {
                                        return Gaussian(globalStore, _k363, _address32.concat('_57'), {
                                            mu: prevVal,
                                            sigma: width
                                        });
                                    };
                                };
                                return function () {
                                    return _.has(params, 'width') ? _k364(globalStore, params.width) : _k364(globalStore, ad.scalar.mul(params.sigma, 0.7));
                                };
                            }
                        });
                    };
                }, _address31.concat('_56'), _.omit(params, 'width'));
            };
        };
        var uniformDrift = function uniformDrift(globalStore, _k353, _address35, params) {
            var _currentAddress = _address35;
            _addr.save(_globalCurrentAddress, _address35);
            return function () {
                return Uniform(globalStore, function (globalStore, _result354) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    return function () {
                        return sample(globalStore, _k353, _address35.concat('_64'), _result354, {
                            driftKernel: function (globalStore, _k355, _address36, prevVal) {
                                var _currentAddress = _address36;
                                _addr.save(_globalCurrentAddress, _address36);
                                var _k356 = function (globalStore, width) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var a = ad.scalar.max(params.a, ad.scalar.sub(prevVal, width));
                                    var b = ad.scalar.min(params.b, ad.scalar.add(prevVal, width));
                                    return function () {
                                        return Uniform(globalStore, _k355, _address36.concat('_63'), {
                                            a: a,
                                            b: b
                                        });
                                    };
                                };
                                return function () {
                                    return _.has(params, 'width') ? _k356(globalStore, params.width) : _k356(globalStore, 0.1);
                                };
                            }
                        });
                    };
                }, _address35.concat('_62'), _.omit(params, 'width'));
            };
        };
        var constF = function constF(globalStore, _k322, _address47, f) {
            var _currentAddress = _address47;
            _addr.save(_globalCurrentAddress, _address47);
            return function () {
                return _k322(globalStore, function (globalStore, _k323, _address48) {
                    var _currentAddress = _address48;
                    _addr.save(_globalCurrentAddress, _address48);
                    return function () {
                        return _k323(globalStore, f);
                    };
                });
            };
        };
        var map_helper = function map_helper(globalStore, _k299, _address66, i, j, f) {
            var _currentAddress = _address66;
            _addr.save(_globalCurrentAddress, _address66);
            var n = ad.scalar.add(ad.scalar.sub(j, i), 1);
            return function () {
                return ad.scalar.eq(n, 0) ? _k299(globalStore, []) : ad.scalar.eq(n, 1) ? f(globalStore, function (globalStore, _result300) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    return function () {
                        return _k299(globalStore, [_result300]);
                    };
                }, _address66.concat('_74'), i) : function (globalStore, n1) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    return function () {
                        return map_helper(globalStore, function (globalStore, _result301) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return map_helper(globalStore, function (globalStore, _result302) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    return function () {
                                        return _k299(globalStore, _result301.concat(_result302));
                                    };
                                }, _address66.concat('_76'), ad.scalar.add(i, n1), j, f);
                            };
                        }, _address66.concat('_75'), i, ad.scalar.sub(ad.scalar.add(i, n1), 1), f);
                    };
                }(globalStore, ad.scalar.ceil(ad.scalar.div(n, 2)));
            };
        };
        var map = function map(globalStore, _k297, _address67, fn, l) {
            var _currentAddress = _address67;
            _addr.save(_globalCurrentAddress, _address67);
            return function () {
                return map_helper(globalStore, _k297, _address67.concat('_78'), 0, ad.scalar.sub(l.length, 1), function (globalStore, _k298, _address68, i) {
                    var _currentAddress = _address68;
                    _addr.save(_globalCurrentAddress, _address68);
                    return function () {
                        return fn(globalStore, _k298, _address68.concat('_77'), l[i]);
                    };
                });
            };
        };
        var map2 = function map2(globalStore, _k295, _address69, fn, l1, l2) {
            var _currentAddress = _address69;
            _addr.save(_globalCurrentAddress, _address69);
            return function () {
                return map_helper(globalStore, _k295, _address69.concat('_80'), 0, ad.scalar.sub(l1.length, 1), function (globalStore, _k296, _address70, i) {
                    var _currentAddress = _address70;
                    _addr.save(_globalCurrentAddress, _address70);
                    return function () {
                        return fn(globalStore, _k296, _address70.concat('_79'), l1[i], l2[i]);
                    };
                });
            };
        };
        var reduce = function reduce(globalStore, _k283, _address78, fn, init, ar) {
            var _currentAddress = _address78;
            _addr.save(_globalCurrentAddress, _address78);
            var n = ar.length;
            var helper = function helper(globalStore, _k284, _address79, i) {
                var _currentAddress = _address79;
                _addr.save(_globalCurrentAddress, _address79);
                return function () {
                    return ad.scalar.peq(i, n) ? _k284(globalStore, init) : helper(globalStore, function (globalStore, _result285) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        return function () {
                            return fn(globalStore, _k284, _address79.concat('_88'), ar[i], _result285);
                        };
                    }, _address79.concat('_87'), ad.scalar.add(i, 1));
                };
            };
            return function () {
                return helper(globalStore, _k283, _address78.concat('_89'), 0);
            };
        };
        var sum = function sum(globalStore, _k281, _address80, l) {
            var _currentAddress = _address80;
            _addr.save(_globalCurrentAddress, _address80);
            return function () {
                return reduce(globalStore, _k281, _address80.concat('_90'), function (globalStore, _k282, _address81, a, b) {
                    var _currentAddress = _address81;
                    _addr.save(_globalCurrentAddress, _address81);
                    return function () {
                        return _k282(globalStore, ad.scalar.add(a, b));
                    };
                }, 0, l);
            };
        };
        var repeat = function repeat(globalStore, _k225, _address110, n, fn) {
            var _currentAddress = _address110;
            _addr.save(_globalCurrentAddress, _address110);
            var helper = function helper(globalStore, _k232, _address111, m) {
                var _currentAddress = _address111;
                _addr.save(_globalCurrentAddress, _address111);
                return function () {
                    return ad.scalar.peq(m, 0) ? _k232(globalStore, []) : ad.scalar.peq(m, 1) ? fn(globalStore, function (globalStore, _result233) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        return function () {
                            return _k232(globalStore, [_result233]);
                        };
                    }, _address111.concat('_131')) : function (globalStore, m1) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var m2 = ad.scalar.sub(m, m1);
                        return function () {
                            return helper(globalStore, function (globalStore, _result234) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                return function () {
                                    return helper(globalStore, function (globalStore, _result235) {
                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                        return function () {
                                            return _k232(globalStore, _result234.concat(_result235));
                                        };
                                    }, _address111.concat('_133'), m2);
                                };
                            }, _address111.concat('_132'), m1);
                        };
                    }(globalStore, ad.scalar.ceil(ad.scalar.div(m, 2)));
                };
            };
            var _k229 = function (globalStore, _dummy228) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var _k227 = function (globalStore, _dummy226) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    return function () {
                        return helper(globalStore, _k225, _address110.concat('_136'), n);
                    };
                };
                return function () {
                    return _.isFunction(fn) ? _k227(globalStore, undefined) : error(globalStore, _k227, _address110.concat('_135'), 'Expected second argument to be a function.');
                };
            };
            var _k231 = function (globalStore, _result230) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                return function () {
                    return _result230 ? error(globalStore, _k229, _address110.concat('_134'), 'Expected first argument to be a non-negative integer.') : _k229(globalStore, undefined);
                };
            };
            return function () {
                return util.isInteger(n) ? _k231(globalStore, ad.scalar.lt(n, 0)) : _k231(globalStore, !util.isInteger(n));
            };
        };
        var error = function error(globalStore, _k195, _address122, msg) {
            var _currentAddress = _address122;
            _addr.save(_globalCurrentAddress, _address122);
            return function () {
                return _k195(globalStore, util.error(msg));
            };
        };
        var SampleGuide = function SampleGuide(globalStore, _k191, _address126, wpplFn, options) {
            var _currentAddress = _address126;
            _addr.save(_globalCurrentAddress, _address126);
            return function () {
                return ForwardSample(globalStore, _k191, _address126.concat('_156'), wpplFn, _.assign({ guide: !0 }, _.omit(options, 'guide')));
            };
        };
        var OptimizeThenSample = function OptimizeThenSample(globalStore, _k189, _address127, wpplFn, options) {
            var _currentAddress = _address127;
            _addr.save(_globalCurrentAddress, _address127);
            return function () {
                return Optimize(globalStore, function (globalStore, _dummy190) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var opts = _.pick(options, 'samples', 'onlyMAP', 'callbacks', 'verbose');
                    return function () {
                        return SampleGuide(globalStore, _k189, _address127.concat('_158'), wpplFn, opts);
                    };
                }, _address127.concat('_157'), wpplFn, _.omit(options, 'samples', 'onlyMAP', 'callbacks'));
            };
        };
        var AISforInfer = function AISforInfer(globalStore, _k185, _address128, wpplFn, options) {
            var _currentAddress = _address128;
            _addr.save(_globalCurrentAddress, _address128);
            return function () {
                return constF(globalStore, function (globalStore, _result188) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    return function () {
                        return Infer(globalStore, function (globalStore, dummyMarginal) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return AIS(globalStore, function (globalStore, _result187) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var _dummy186 = _.assign(dummyMarginal, { normalizationConstant: _result187 });
                                    return function () {
                                        return _k185(globalStore, dummyMarginal);
                                    };
                                }, _address128.concat('_161'), wpplFn, options);
                            };
                        }, _address128.concat('_160'), _result188);
                    };
                }, _address128.concat('_159'), !0);
            };
        };
        var DefaultInfer = function DefaultInfer(globalStore, _k175, _address129, wpplFn, options) {
            var _currentAddress = _address129;
            _addr.save(_globalCurrentAddress, _address129);
            var _dummy184 = util.mergeDefaults(options, {}, 'Infer');
            var maxEnumTreeSize = 200000;
            var minSampleRate = 250;
            var samples = 1000;
            return function () {
                return Enumerate(globalStore, function (globalStore, enumResult) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k183 = function (globalStore, _dummy182) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _dummy181 = console.log('Using "rejection"');
                        return function () {
                            return Rejection(globalStore, function (globalStore, rejResult) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                return function () {
                                    return rejResult instanceof Error ? function (globalStore, _dummy180) {
                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                        return function () {
                                            return CheckSampleAfterFactor(globalStore, function (globalStore, hasSampleAfterFactor) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                var _k178 = function (globalStore, _dummy177) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    var _dummy176 = console.log('Using "MCMC"');
                                                    return function () {
                                                        return MCMC(globalStore, _k175, _address129.concat('_168'), wpplFn, { samples: samples });
                                                    };
                                                };
                                                return function () {
                                                    return hasSampleAfterFactor ? function (globalStore, _dummy179) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        return function () {
                                                            return SMC(globalStore, function (globalStore, smcResult) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                return function () {
                                                                    return dists.isDist(smcResult) ? _k175(globalStore, smcResult) : smcResult instanceof Error ? _k178(globalStore, console.log(ad.scalar.add(smcResult.message, '..quit SMC'))) : error(globalStore, _k178, _address129.concat('_167'), 'Invalid return value from SMC');
                                                                };
                                                            }, _address129.concat('_166'), wpplFn, {
                                                                throwOnError: !1,
                                                                particles: samples
                                                            });
                                                        };
                                                    }(globalStore, console.log('Using "SMC" (interleaving samples and factors detected)')) : _k178(globalStore, undefined);
                                                };
                                            }, _address129.concat('_165'), wpplFn);
                                        };
                                    }(globalStore, console.log(ad.scalar.add(rejResult.message, '..quit rejection'))) : dists.isDist(rejResult) ? _k175(globalStore, rejResult) : error(globalStore, _k175, _address129.concat('_169'), 'Invalid return value from rejection');
                                };
                            }, _address129.concat('_164'), wpplFn, {
                                minSampleRate: minSampleRate,
                                throwOnError: !1,
                                samples: samples
                            });
                        };
                    };
                    return function () {
                        return dists.isDist(enumResult) ? _k175(globalStore, enumResult) : enumResult instanceof Error ? _k183(globalStore, console.log(ad.scalar.add(enumResult.message, '..quit enumerate'))) : error(globalStore, _k183, _address129.concat('_163'), 'Invalid return value from enumerate');
                    };
                }, _address129.concat('_162'), wpplFn, {
                    maxEnumTreeSize: maxEnumTreeSize,
                    maxRuntimeInMS: 5000,
                    throwOnError: !1,
                    strategy: 'depthFirst'
                });
            };
        };
        var Infer = function Infer(globalStore, _k168, _address130, options, maybeFn) {
            var _currentAddress = _address130;
            _addr.save(_globalCurrentAddress, _address130);
            var _k174 = function (globalStore, wpplFn) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var _k173 = function (globalStore, _dummy172) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var methodMap = {
                        SMC: SMC,
                        MCMC: MCMC,
                        PMCMC: PMCMC,
                        asyncPF: AsyncPF,
                        rejection: Rejection,
                        enumerate: Enumerate,
                        incrementalMH: IncrementalMH,
                        forward: ForwardSample,
                        optimize: OptimizeThenSample,
                        AIS: AISforInfer,
                        defaultInfer: DefaultInfer
                    };
                    var _k171 = function (globalStore, methodName) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _k170 = function (globalStore, _dummy169) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            var method = methodMap[methodName];
                            return function () {
                                return method(globalStore, _k168, _address130.concat('_172'), wpplFn, _.omit(options, 'method', 'model'));
                            };
                        };
                        return function () {
                            return _.has(methodMap, methodName) ? _k170(globalStore, undefined) : function (globalStore, methodNames) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var msg = ad.scalar.add(ad.scalar.add(ad.scalar.add(ad.scalar.add('Infer: \'', methodName), '\' is not a valid method. The following methods are available: '), methodNames.join(', ')), '.');
                                return function () {
                                    return error(globalStore, _k170, _address130.concat('_171'), msg);
                                };
                            }(globalStore, _.keys(methodMap));
                        };
                    };
                    return function () {
                        return options.method ? _k171(globalStore, options.method) : _k171(globalStore, 'defaultInfer');
                    };
                };
                return function () {
                    return _.isFunction(wpplFn) ? _k173(globalStore, undefined) : error(globalStore, _k173, _address130.concat('_170'), 'Infer: a model was not specified.');
                };
            };
            return function () {
                return util.isObject(options) ? maybeFn ? _k174(globalStore, maybeFn) : _k174(globalStore, options.model) : _k174(globalStore, options);
            };
        };
        var json = {
            read: webpplJson.read,
            write: webpplJson.write
        };
        var chain = 5;
        var foreach = function foreach(globalStore, _k43, _address165, fn, lst) {
            var _currentAddress = _address165;
            _addr.save(_globalCurrentAddress, _address165);
            var foreach_ = function foreach_(globalStore, _k44, _address166, i) {
                var _currentAddress = _address166;
                _addr.save(_globalCurrentAddress, _address166);
                return function () {
                    return ad.scalar.lt(i, lst.length) ? fn(globalStore, function (globalStore, _dummy45) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        return function () {
                            return foreach_(globalStore, _k44, _address166.concat('_258'), ad.scalar.add(i, 1));
                        };
                    }, _address166.concat('_257'), lst[i]) : _k44(globalStore, undefined);
                };
            };
            return function () {
                return foreach_(globalStore, _k43, _address165.concat('_259'), 0);
            };
        };
        var multiply = function multiply(globalStore, _k39, _address169, x, y) {
            var _currentAddress = _address169;
            _addr.save(_globalCurrentAddress, _address169);
            return function () {
                return _k39(globalStore, ad.scalar.mul(x, y));
            };
        };
        var levels = function levels(globalStore, _k38, _address170, df, label) {
            var _currentAddress = _address170;
            _addr.save(_globalCurrentAddress, _address170);
            return function () {
                return _k38(globalStore, _.uniq(_.map(df, label)));
            };
        };
        var data = json.read('model_data/akure-model-data.json');
        return function () {
            return levels(globalStore, function (globalStore, subjects) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var maxCoord = 1920;
                var granularity = 20;
                var granCoord = ad.scalar.div(maxCoord, granularity);
                var cords = _.range(0, granCoord);
                return function () {
                    return map(globalStore, function (globalStore, sampleCoord) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var coordinates = _.range(0, 1920);
                        var model = function model(globalStore, _k1, _address173) {
                            var _currentAddress = _address173;
                            _addr.save(_globalCurrentAddress, _address173);
                            return function () {
                                return gaussianDrift(globalStore, function (globalStore, infInt) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    return function () {
                                        return gaussianDrift(globalStore, function (globalStore, infSlope) {
                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                            return function () {
                                                return uniformDrift(globalStore, function (globalStore, sdInfSigma) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    return function () {
                                                        return gaussianDrift(globalStore, function (globalStore, priorSdInt) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            return function () {
                                                                return uniformDrift(globalStore, function (globalStore, priorSdSlope) {
                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                    return function () {
                                                                        return map(globalStore, function (globalStore, sampLog) {
                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                            var sampLogGuess = [];
                                                                            var sampLogInf = [];
                                                                            var sampLogCenter = [];
                                                                            return function () {
                                                                                return foreach(globalStore, function (globalStore, _dummy8) {
                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                    return function () {
                                                                                        return sum(globalStore, function (globalStore, _result7) {
                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                            var _dummy6 = query.add([
                                                                                                chain,
                                                                                                'guess'
                                                                                            ], _result7);
                                                                                            return function () {
                                                                                                return sum(globalStore, function (globalStore, _result5) {
                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                    var _dummy4 = query.add([
                                                                                                        chain,
                                                                                                        'inf'
                                                                                                    ], _result5);
                                                                                                    return function () {
                                                                                                        return sum(globalStore, function (globalStore, _result3) {
                                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                            var _dummy2 = query.add([
                                                                                                                chain,
                                                                                                                'center'
                                                                                                            ], _result3);
                                                                                                            return function () {
                                                                                                                return _k1(globalStore, query);
                                                                                                            };
                                                                                                        }, _address173.concat('_296'), sampLogCenter);
                                                                                                    };
                                                                                                }, _address173.concat('_295'), sampLogInf);
                                                                                            };
                                                                                        }, _address173.concat('_294'), sampLogGuess);
                                                                                    };
                                                                                }, _address173.concat('_293'), function (globalStore, _k9, _address185, number) {
                                                                                    var _currentAddress = _address185;
                                                                                    _addr.save(_globalCurrentAddress, _address185);
                                                                                    var _dummy11 = sampLogGuess.push(number.subLogGuess);
                                                                                    var _dummy10 = sampLogInf.push(number.subLogInf);
                                                                                    return function () {
                                                                                        return _k9(globalStore, sampLogCenter.push(number.subLogCenter));
                                                                                    };
                                                                                }, sampLog);
                                                                            };
                                                                        }, _address173.concat('_292'), function (globalStore, _k12, _address174, subjid) {
                                                                            var _currentAddress = _address174;
                                                                            _addr.save(_globalCurrentAddress, _address174);
                                                                            var idData = _.filter(data, { subjid: subjid });
                                                                            var age = idData[0].agecentered;
                                                                            var sdInfAge = ad.scalar.add(infInt, ad.scalar.mul(infSlope, age));
                                                                            return function () {
                                                                                return gaussianDrift(globalStore, function (globalStore, sdInfSamp) {
                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                    var sdInfId = ad.scalar.exp(sdInfSamp);
                                                                                    var priorSdAge = ad.scalar.add(priorSdInt, ad.scalar.mul(priorSdSlope, age));
                                                                                    return function () {
                                                                                        return map(globalStore, function (globalStore, subLog) {
                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                            var subLogGuess = [];
                                                                                            var subLogInf = [];
                                                                                            var subLogCenter = [];
                                                                                            return function () {
                                                                                                return foreach(globalStore, function (globalStore, _dummy16) {
                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                    return function () {
                                                                                                        return sum(globalStore, function (globalStore, _result13) {
                                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                            return function () {
                                                                                                                return sum(globalStore, function (globalStore, _result14) {
                                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                    return function () {
                                                                                                                        return sum(globalStore, function (globalStore, _result15) {
                                                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                            return function () {
                                                                                                                                return _k12(globalStore, {
                                                                                                                                    subLogGuess: _result13,
                                                                                                                                    subLogInf: _result14,
                                                                                                                                    subLogCenter: _result15
                                                                                                                                });
                                                                                                                            };
                                                                                                                        }, _address174.concat('_291'), subLogCenter);
                                                                                                                    };
                                                                                                                }, _address174.concat('_290'), subLogInf);
                                                                                                            };
                                                                                                        }, _address174.concat('_289'), subLogGuess);
                                                                                                    };
                                                                                                }, _address174.concat('_288'), function (globalStore, _k17, _address184, number) {
                                                                                                    var _currentAddress = _address184;
                                                                                                    _addr.save(_globalCurrentAddress, _address184);
                                                                                                    var _dummy19 = subLogGuess.push(number.logGuess);
                                                                                                    var _dummy18 = subLogInf.push(number.logInf);
                                                                                                    return function () {
                                                                                                        return _k17(globalStore, subLogCenter.push(number.logCenter));
                                                                                                    };
                                                                                                }, subLog);
                                                                                            };
                                                                                        }, _address174.concat('_287'), function (globalStore, _k20, _address175, row) {
                                                                                            var _currentAddress = _address175;
                                                                                            _addr.save(_globalCurrentAddress, _address175);
                                                                                            var click = ad.scalar.round(row.clickscaledx);
                                                                                            var targetCenterY = row.targetcentery;
                                                                                            var eyeCenterLX = row.eyecenterleftx;
                                                                                            var eyeCenterLY = row.eyecenterlefty;
                                                                                            var eyeCenterRX = row.eyecenterrightx;
                                                                                            var eyeCenterRY = row.eyecenterrighty;
                                                                                            var pupilLX = row.pupilfinalleftx;
                                                                                            var pupilLY = row.pupilfinallefty;
                                                                                            var pupilRX = row.pupilfinalrightx;
                                                                                            var pupilRY = row.pupilfinalrighty;
                                                                                            var _k35 = function (globalStore, tAlphaL) {
                                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                var _k34 = function (globalStore, tAlphaR) {
                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                    return function () {
                                                                                                        return map(globalStore, function (globalStore, lDist) {
                                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                            return function () {
                                                                                                                return map(globalStore, function (globalStore, rDist) {
                                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                    return function () {
                                                                                                                        return map(globalStore, function (globalStore, lNormDist) {
                                                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                            return function () {
                                                                                                                                return map(globalStore, function (globalStore, rNormDist) {
                                                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                                    return function () {
                                                                                                                                        return map2(globalStore, function (globalStore, xDist) {
                                                                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                                            return function () {
                                                                                                                                                return map(globalStore, function (globalStore, priorDist) {
                                                                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                                                    return function () {
                                                                                                                                                        return map(globalStore, function (globalStore, priorNormDist) {
                                                                                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                                                            return function () {
                                                                                                                                                                return map2(globalStore, function (globalStore, gazePriorDist) {
                                                                                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                                                                    return function () {
                                                                                                                                                                        return map(globalStore, function (globalStore, xCoordDist) {
                                                                                                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                                                                            return function () {
                                                                                                                                                                                return Categorical(globalStore, function (globalStore, gazePred) {
                                                                                                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                                                                                    var logInf = gazePred.score(click);
                                                                                                                                                                                    return function () {
                                                                                                                                                                                        return Uniform(globalStore, function (globalStore, guessPred) {
                                                                                                                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                                                                                            var logGuess = guessPred.score(click);
                                                                                                                                                                                            return function () {
                                                                                                                                                                                                return Gaussian(globalStore, function (globalStore, centerPred) {
                                                                                                                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                                                                                                    var logCenter = centerPred.score(click);
                                                                                                                                                                                                    return function () {
                                                                                                                                                                                                        return _k20(globalStore, {
                                                                                                                                                                                                            logGuess: logGuess,
                                                                                                                                                                                                            logInf: logInf,
                                                                                                                                                                                                            logCenter: logCenter
                                                                                                                                                                                                        });
                                                                                                                                                                                                    };
                                                                                                                                                                                                }, _address175.concat('_286'), {
                                                                                                                                                                                                    mu: 960,
                                                                                                                                                                                                    sigma: 160
                                                                                                                                                                                                });
                                                                                                                                                                                            };
                                                                                                                                                                                        }, _address175.concat('_285'), {
                                                                                                                                                                                            a: 0,
                                                                                                                                                                                            b: 1920
                                                                                                                                                                                        });
                                                                                                                                                                                    };
                                                                                                                                                                                }, _address175.concat('_284'), {
                                                                                                                                                                                    ps: xCoordDist.flat(),
                                                                                                                                                                                    vs: coordinates
                                                                                                                                                                                });
                                                                                                                                                                            };
                                                                                                                                                                        }, _address175.concat('_283'), function (globalStore, _k21, _address182, x) {
                                                                                                                                                                            var _currentAddress = _address182;
                                                                                                                                                                            _addr.save(_globalCurrentAddress, _address182);
                                                                                                                                                                            return function () {
                                                                                                                                                                                return repeat(globalStore, _k21, _address182.concat('_282'), granularity, function (globalStore, _k22, _address183) {
                                                                                                                                                                                    var _currentAddress = _address183;
                                                                                                                                                                                    _addr.save(_globalCurrentAddress, _address183);
                                                                                                                                                                                    return function () {
                                                                                                                                                                                        return _k22(globalStore, x);
                                                                                                                                                                                    };
                                                                                                                                                                                });
                                                                                                                                                                            };
                                                                                                                                                                        }, gazePriorDist);
                                                                                                                                                                    };
                                                                                                                                                                }, _address175.concat('_281'), multiply, xDist, priorNormDist);
                                                                                                                                                            };
                                                                                                                                                        }, _address175.concat('_280'), function (globalStore, _k23, _address181, x) {
                                                                                                                                                            var _currentAddress = _address181;
                                                                                                                                                            _addr.save(_globalCurrentAddress, _address181);
                                                                                                                                                            var priorNormDist = ad.scalar.exp(ad.scalar.sub(x, util.logsumexp(priorDist)));
                                                                                                                                                            return function () {
                                                                                                                                                                return _k23(globalStore, priorNormDist);
                                                                                                                                                            };
                                                                                                                                                        }, priorDist);
                                                                                                                                                    };
                                                                                                                                                }, _address175.concat('_279'), function (globalStore, _k24, _address180, coord) {
                                                                                                                                                    var _currentAddress = _address180;
                                                                                                                                                    _addr.save(_globalCurrentAddress, _address180);
                                                                                                                                                    return function () {
                                                                                                                                                        return Gaussian(globalStore, function (globalStore, _result25) {
                                                                                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                                                            var dist = _result25.score(coord);
                                                                                                                                                            return function () {
                                                                                                                                                                return _k24(globalStore, dist);
                                                                                                                                                            };
                                                                                                                                                        }, _address180.concat('_278'), {
                                                                                                                                                            mu: 960,
                                                                                                                                                            sigma: priorSdAge
                                                                                                                                                        });
                                                                                                                                                    };
                                                                                                                                                }, sampleCoord);
                                                                                                                                            };
                                                                                                                                        }, _address175.concat('_277'), multiply, lNormDist, rNormDist);
                                                                                                                                    };
                                                                                                                                }, _address175.concat('_276'), function (globalStore, _k26, _address179, x) {
                                                                                                                                    var _currentAddress = _address179;
                                                                                                                                    _addr.save(_globalCurrentAddress, _address179);
                                                                                                                                    var rNormDist = ad.scalar.exp(ad.scalar.sub(x, util.logsumexp(rDist)));
                                                                                                                                    return function () {
                                                                                                                                        return _k26(globalStore, rNormDist);
                                                                                                                                    };
                                                                                                                                }, rDist);
                                                                                                                            };
                                                                                                                        }, _address175.concat('_275'), function (globalStore, _k27, _address178, x) {
                                                                                                                            var _currentAddress = _address178;
                                                                                                                            _addr.save(_globalCurrentAddress, _address178);
                                                                                                                            var lNormDist = ad.scalar.exp(ad.scalar.sub(x, util.logsumexp(lDist)));
                                                                                                                            return function () {
                                                                                                                                return _k27(globalStore, lNormDist);
                                                                                                                            };
                                                                                                                        }, lDist);
                                                                                                                    };
                                                                                                                }, _address175.concat('_274'), function (globalStore, _k28, _address177, coord) {
                                                                                                                    var _currentAddress = _address177;
                                                                                                                    _addr.save(_globalCurrentAddress, _address177);
                                                                                                                    var _k30 = function (globalStore, betaR) {
                                                                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                        return function () {
                                                                                                                            return Gaussian(globalStore, function (globalStore, _result29) {
                                                                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                                var betaRDist = _result29.score(betaR);
                                                                                                                                return function () {
                                                                                                                                    return _k28(globalStore, betaRDist);
                                                                                                                                };
                                                                                                                            }, _address177.concat('_273'), {
                                                                                                                                mu: tAlphaR,
                                                                                                                                sigma: sdInfId
                                                                                                                            });
                                                                                                                        };
                                                                                                                    };
                                                                                                                    return function () {
                                                                                                                        return ad.scalar.gt(eyeCenterRX, coord) ? _k30(globalStore, ad.scalar.atan(ad.scalar.div(ad.scalar.abs(ad.scalar.sub(eyeCenterRX, coord)), ad.scalar.sub(eyeCenterRY, targetCenterY)))) : _k30(globalStore, ad.scalar.neg(ad.scalar.atan(ad.scalar.div(ad.scalar.abs(ad.scalar.sub(eyeCenterRX, coord)), ad.scalar.sub(eyeCenterRY, targetCenterY)))));
                                                                                                                    };
                                                                                                                }, sampleCoord);
                                                                                                            };
                                                                                                        }, _address175.concat('_272'), function (globalStore, _k31, _address176, coord) {
                                                                                                            var _currentAddress = _address176;
                                                                                                            _addr.save(_globalCurrentAddress, _address176);
                                                                                                            var _k33 = function (globalStore, betaL) {
                                                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                return function () {
                                                                                                                    return Gaussian(globalStore, function (globalStore, _result32) {
                                                                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                        var betaLDist = _result32.score(betaL);
                                                                                                                        return function () {
                                                                                                                            return _k31(globalStore, betaLDist);
                                                                                                                        };
                                                                                                                    }, _address176.concat('_271'), {
                                                                                                                        mu: tAlphaL,
                                                                                                                        sigma: sdInfId
                                                                                                                    });
                                                                                                                };
                                                                                                            };
                                                                                                            return function () {
                                                                                                                return ad.scalar.gt(eyeCenterLX, coord) ? _k33(globalStore, ad.scalar.atan(ad.scalar.div(ad.scalar.abs(ad.scalar.sub(eyeCenterLX, coord)), ad.scalar.sub(eyeCenterLY, targetCenterY)))) : _k33(globalStore, ad.scalar.neg(ad.scalar.atan(ad.scalar.div(ad.scalar.abs(ad.scalar.sub(eyeCenterLX, coord)), ad.scalar.sub(eyeCenterLY, targetCenterY)))));
                                                                                                            };
                                                                                                        }, sampleCoord);
                                                                                                    };
                                                                                                };
                                                                                                return function () {
                                                                                                    return ad.scalar.gt(eyeCenterRX, pupilRX) ? _k34(globalStore, ad.scalar.atan(ad.scalar.div(ad.scalar.abs(ad.scalar.sub(eyeCenterRX, pupilRX)), ad.scalar.sub(eyeCenterRY, pupilRY)))) : _k34(globalStore, ad.scalar.neg(ad.scalar.atan(ad.scalar.div(ad.scalar.abs(ad.scalar.sub(eyeCenterRX, pupilRX)), ad.scalar.sub(eyeCenterRY, pupilRY)))));
                                                                                                };
                                                                                            };
                                                                                            return function () {
                                                                                                return ad.scalar.gt(eyeCenterLX, pupilLX) ? _k35(globalStore, ad.scalar.atan(ad.scalar.div(ad.scalar.abs(ad.scalar.sub(eyeCenterLX, pupilLX)), ad.scalar.sub(eyeCenterLY, pupilLY)))) : _k35(globalStore, ad.scalar.neg(ad.scalar.atan(ad.scalar.div(ad.scalar.abs(ad.scalar.sub(eyeCenterLX, pupilLX)), ad.scalar.sub(eyeCenterLY, pupilLY)))));
                                                                                            };
                                                                                        }, idData);
                                                                                    };
                                                                                }, _address174.concat('_270'), {
                                                                                    mu: sdInfAge,
                                                                                    sigma: sdInfSigma,
                                                                                    width: 0.1
                                                                                });
                                                                            };
                                                                        }, subjects);
                                                                    };
                                                                }, _address173.concat('_269'), {
                                                                    a: 0,
                                                                    b: 500,
                                                                    width: 10
                                                                });
                                                            };
                                                        }, _address173.concat('_268'), {
                                                            mu: 400,
                                                            sigma: 100,
                                                            width: 10
                                                        });
                                                    };
                                                }, _address173.concat('_267'), {
                                                    a: 0,
                                                    b: 1,
                                                    width: 0.1
                                                });
                                            };
                                        }, _address173.concat('_266'), {
                                            mu: 0,
                                            sigma: 1,
                                            width: 0.1
                                        });
                                    };
                                }, _address173.concat('_265'), {
                                    mu: 0,
                                    sigma: 1,
                                    width: 0.1
                                });
                            };
                        };
                        var header = 'iteration,chain,model,loglike,score';
                        var output_file = ad.scalar.add(ad.scalar.add('output/akure_model_comparison_chain', chain), '.csv');
                        var callback = webpplSampleWriter.streamQueryCSV(output_file, header);
                        return function () {
                            return Infer(globalStore, function (globalStore, output) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                return function () {
                                    return _k0(globalStore, undefined);
                                };
                            }, _address0.concat('_297'), {
                                model: model,
                                samples: 500000,
                                burn: 50000,
                                lag: 0,
                                method: 'MCMC',
                                verbose: T,
                                callbacks: [callback]
                            });
                        };
                    }, _address0.concat('_264'), function (globalStore, _k36, _address172, x) {
                        var _currentAddress = _address172;
                        _addr.save(_globalCurrentAddress, _address172);
                        return function () {
                            return _k36(globalStore, ad.scalar.mul(x, granularity));
                        };
                    }, cords);
                };
            }, _address0.concat('_263'), data, 'subjid');
        };
    });
});

webppl.runEvaled(main, __runner__, {}, {}, topK, '');
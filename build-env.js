var PROD_ENV = 'prod';
var STAGE_ENV = 'stage';
var DEV_ENV = 'dev';

module.exports =  {
    _prodEnv: PROD_ENV,
    _stageEnv: STAGE_ENV,
    _devEnv: DEV_ENV,
    _envs: [
        PROD_ENV,
        STAGE_ENV,
        DEV_ENV,
    ],

    env: null,

    init: function(env) {
        if (this._envs.indexOf(env) === -1) {
            throw new Error(
                    'You must pass correct env. ' +
                    'Allowed values: "' + this._envs.join('", "') + '". ' +
                    'Passed env: ' + env
            );
        }

        this.env = env;
    },

    isProdEnv: function() {
        return this.env === this._prodEnv;
    },

    isStageEnv: function() {
        return this.env === this._stageEnv;
    },

    isDevEnv: function() {
        return this.env === this._devEnv;
    },

    isDebugEnabled: function() {
        return !!(this.env === this._devEnv || this.env === this._stageEnv);
    },

    isWatchEnabled: function() {
        return this.env === this._devEnv;
    }
};


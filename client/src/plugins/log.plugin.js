export default {
    install(Vue) {
        /**
         * Logger
         * @param{string} level can be 'info' | 'warn' | 'error'
         * */
        Vue.prototype.$log = function (message, level='info') {
            const levels = new Set(['info', 'warn', 'error']);
            if (!levels.has(level)) return;
            if (process.env.NODE_ENV !== 'production') {
                if (level === 'error') {
                    console.error(message);
                } else if (level === 'warn') {
                    console.warn(message);
                } else {
                    console.log(message);
                }
            }

        };
    },
};
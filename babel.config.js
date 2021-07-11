module.exports = {
    presets: [
        // './my-babel-preset'
        ['@babel/preset-env', {
            targets: {
                // chrome 79버전까지는 변환이 되어야 한다.
                chrome: '79',
                // IE 11버전 이상에서만 변환
                ie: '11'

                // chrome과 ie 모두에서 사용가능하도록 변환
                // "use strict";
                // var alert = function alert(msg) {
                //     return window.alert(msg);
                // };
            },
            useBuiltIns: 'usage', // 'entry', false
            corejs: {
                version: 2, // 3
            }
        }]
    ]
}
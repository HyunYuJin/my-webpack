module.exports = {
    presets: [
        // './my-babel-preset'
        ['@babel/preset-env', {
            targets: {
                // chrome 79버전 이상에서만 변환
                chrome: '79',
                // IE 11버전 이상에서만 변환
                ie: '11'

                // chrome과 ie 모두에서 사용가능하도록 변환
                // "use strict";
                // var alert = function alert(msg) {
                //     return window.alert(msg);
                // };
            }
        }]
    ]
}
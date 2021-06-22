const path = require('path');

module.exports = {
    mode: 'development',
    entry: { // 모듈의 시작점
        // 이름은 main
        main: './src/app.js'
    },
    // 모든 js를 하나로 만들어서 output이라는 곳에 넣어준다.
    output: {
        // [name]에 해당하는 곳은 entry에 추가한 main이 문자열로 들어오는 방식이다.
        filename: '[name].js',
        // 절대 경로를 계산해주는 resolve 함수를 사용해준다.
        // dist 폴더에 결과물을 저장한다.
        path: path.resolve('./dist')
    }
}
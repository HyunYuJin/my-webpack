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
    },
    module: {
        rules: [
            {
                // loader가 처리해야할 파일들의 패턴(정규표현식)을 정의한다.
                test: /\.js$/, // js 확장자를 가진 모든 파일들은 로더로 돌리겠다는 뜻
                // 사용할 loader를 명시한다.
                // js 파일이 여러개면 loader가 여러번 돈다.
                use: {
                    loader: './my-webpack-loader.js'
                },
            },
            {
                test: /\.css$/,
                // 순서는 가장 마지막부터 위로 순차적으로 실행
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    // 파일 로더가 처리하는 파일을 로더가 사용했을 때 경로 앞에 추가된다.
                    publicPath: './dist/',
                    // 파일로더가 파일 아웃풋에 복사할 때 사용힌디.
                    // [원본 파일명].[확장자명][캐시 무력화를 위해서 쿼리 스트링으로 매번 달라지는 hash 값을 입력]
                    name: '[name].[ext]?[hash]',
                    limit: 20000, // 20KB 미만은 js 문자열로 변환해버린다.
                }
            }
        ]
    }
}
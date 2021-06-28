# my-webpack
목표: 나만의 빌드 시스템을 만들어보자!

## npm을 이용한 프로젝트 개발 프로젝트 세팅
```bash
npm init
```
명령어를 실행하면 프로젝트의 모든 정보를 기록하는 **package.json**을 생성할 수 있습니다.
  
* name: 프로젝트 이름
* version: 프로젝트 버전 정보
* description: 프로젝트 설명
* main: 노드 어플리케이션일 경우 진입점 경로. 프론트엔드 프로젝트일 경우 사용하지 않는다.
* scripts: 프로젝트 명령어를 등록할 수 있다.초기화시 test 명령어가 샘플로 등록되어 있다
* author: 프로그램 작성자
* license: 라이센스

  
## 프로젝트 실행 방법
실행 명령어를 package.json의 script 부분에 등록해줍니다. (build script를 작성)
```json
{
  "scripts": {
    "build": "webpack"
  }
}
```
  
그리고 다음처럼 커스텀 명령어로 실행할 수 있습니다.
```bash
npm run build
```

  
## Webpack
브라우저에 영향을 받지 않고 모듈 시스템을 사용하기 위해서는 여러개의 파일을 하나로 합쳐주는 번들러가 필요합니다. 다양한 번들러가 있지만 Webpack을 사용하겠습니다.
엔트리 포인트로부터 의존적인 모든 모듈들을 찾아 하나의 파일로 번들링 해주는 역할을 합니다.
```bash
npm install -D webpack webpack-cli
```

설치를 마치게되면, node-modules라는 폴더가 생기고 .bin이라는 폴더에 실행 가능한 명령어를 확인할 수 있습니다. 


### entry, output
webpack 또는 webpack-cli 둘 중 하나를 실행합니다.   
```bash
node_modules/.bin/webpack --mode development --entry ./src/app.js --output-path dist/
```

실행 결과, dist/main.js에 번들링된 결과가 나오게 됩니다.

* mode: 웹팩 실행 모드를 의미. 개발 버전인 development 지정
* entry: 시작점 경로를 지정하는 옵션
* output: 번들링 결과물을 위치할 경로
  
  
#### webpack.config.js 설정

```javascript
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
```
  

#### Webpack 실행을 위한 커스텀 명령어 추가
package.json에 설정해준대로 번들링 작업을 시켜주기 위해 커스텀 명령어를 추가합니다.

```json
{
  "scripts": {
    "build": "./node_modules/.bin/webpack"
  }
}
```
이제 실행시킬 때 간단하게 커스텀 명령어만 실행해주면 번들링 작업을 할 수 있게 됩니다.


### Loader
Loader는 함수 형태로 작성합니다.
로더는 modules에 rules라는 배열에 추가할 수 있습니다.

#### webpack.config.js
```javascript
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
    }
  ]
}
```

### css-loader
흔히 우리는 css 파일을 모듈로 import해서 사용합니다.
webpack의 loader가 css를 모듈로 바꿔버리는 역할을 하는데, 이를 위해서 css-loader를 설치해주어야 합니다.

```bash
npm install css-loader
```

#### webpack.config.js
```javascript
module: {
  rules: [
    ...
    {
      // loader가 처리해야할 파일들의 패턴(정규표현식)을 정의한다.
      test: /\.css$/, // js 확장자를 가진 모든 파일들은 로더로 돌리겠다는 뜻
      // 사용할 loader를 명시한다.
      // js 파일이 여러개면 loader가 여러번 돈다.
      use: [
          'css-loader'
      ],
    }
  ]
}
```

### style-loader
css를 js로 변환한 후 style-loader를 이용해서 실제 DOM에 넣어주는 작업을 해주어야 합니다.

```bash
npm install style-loader
```

#### webpack.config.js
```javascript
module: {
  rules: [
    ...
    {
      // loader가 처리해야할 파일들의 패턴(정규표현식)을 정의한다.
      test: /\.css$/, // css 확장자를 가진 모든 파일들은 로더로 돌리겠다는 뜻
      use: [
          'style-loader',
          'css-loader'
      ],
    }
  ]
}
```

### file-loader
이미지 등의 파일등을 가져올 때는 file-loader를 설치해주어야 합니다.

```bash
npm install file-loader
```

#### webpack.config.js
```javascript
module: {
  rules: [
    ...
    {
      test: /\.png$/,
      loader: 'file-loader',
      options: {
          // 파일 로더가 처리하는 파일을 로더가 사용했을 때 경로 앞에 추가된다.
          publicPath: './dist/',
          // 파일로더가 파일 아웃풋에 복사할 때 사용힌디.
          // [원본 파일명].[확장자명][캐시 무력화를 위해서 쿼리 스트링으로 매번 달라지는 hash 값을 입력]
          name: '[name].[ext]?[hash]'
      }
    }
  ]
}
```

### url-loader
사이즈가 큰 파일의 경우는 base64로 인코딩해서 넣어버려서 해결할 수 있습니다.

```javascript
{
  test: /\.(png|jpg|gif|svg)$/,
  loader: 'url-loader',
  options: {
      publicPath: './dist/',
      name: '[name].[ext]?[hash]',
      limit: 2000, // 2KB 미만은 js 문자열로 변환해버린다.
  }
}
```

### Plugin
Loader가 각 파일 단위로 처리했던 것에 반해서 Plugin은 번들된 결과물 하나를 처리합니다.(js 코드 난독화, 특정 텍스트 추출 등)
  
-> 모든 파일을 뭉쳐둔 번들파일에 의해서 한번만 실행이 됩니다.

#### webpack.config.js
```javascript
// custom plugin
const MyWebpackPlugin = require('./my-webpack-plugin')

...
plugins: [
  new MyWebpackPlugin()
]
```


### BannerPlugin
빌드한 결과물에 빌드 정보나 커밋 버전 등을 추가할 수 있습니다.

#### webpack.config.js
```javascript
plugins: [
  new webpack.BannerPlugin({
    banner: `
      Build Date: ${new Date().toLocaleString()}
      Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
      Author: ${childProcess.execSync('git config user.name')}
    `,
  })
]
```

#### 결과('./dist/main.js')
[BannerPlugin Build 결과](https://user-images.githubusercontent.com/38209966/123196953-c0ab8e80-d4e5-11eb-83c5-8102e90262b6.png)


### DefinePlugin
환경정보를 제공하는 플러그인입니다.  
API와 같은 환경 의존적인 정보는 소스가 아니라 다른 곳에서 관리해주는 것이 더 좋습니다.

#### webpack.config.js
```javascript
plugins: [
  ...
  new webpack.DefinePlugin({})
]
```
빈 객체를 전달해도 기본적으로 노드 환경정보인 process.env.NODE_ENV(mode: 'development')를 넣어줍니다.
```javascript
// app.js

console.log(process.env.NODE_ENV) // development
```



## Babel
Babel은 

```javascript
const alert = msg => window.alert(msg)
```

### Block-scoping
const, let 처럼 블록 스코핑을 따르는 예약어를 함수 스코핑을 사용하는 var 변경해주는 플러그인 입니다.

```javascript
var alert = msg => window.alert(msg);
```

### Arrow-functions
인터넷 익스플로어에서는 arrow function을 지원해주지 않는데, 이를 일반 함수로 변경해주는 플러그인 입니다.

```javascript 
var alert = function (msg) {
  return window.alert(msg);
};
```

### Strict-mode
상단에 strict-mode를 정의하여, 엄격모드로 브라우저가 실행되도록 하는 플러그인 입니다.

```javascript
"use strict";

var alert = function (msg) {
  return window.alert(msg);
};
```

[참고: 김정환의 블로그](https://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html)
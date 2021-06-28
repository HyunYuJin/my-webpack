// Custom Plugin
class MyWebpackPlugin {
    apply(compiler) {
        // Plugin이 종료되었을 때 실행
        compiler.hooks.done.tap('My Plugin', (stats) => {
            // plugin이 완료되었을 때 동작하는 callback 함수다.
            console.log('MyPlugin: done')
        })
    }
}

module.exports = MyWebpackPlugin
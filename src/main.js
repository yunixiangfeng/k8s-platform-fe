import { createApp } from 'vue'
import App from './App.vue'
// 代码引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入图标视图
import * as ELIcons from '@element-plus/icons-vue'
//引入路由配置和规则
import router from "./router"
//codemirror编辑器
import { GlobalCmComponent } from "codemirror-editor-vue3";
// 引入主题
import 'codemirror/theme/idea.css'
// 引入yaml
import 'codemirror/mode/yaml/yaml.js'


// 创建app实例
const app = createApp(App)
// 图标注册为全局组件
for (let iconName in ELIcons) {
    app.component(iconName, ELIcons[iconName])
}
app.use(ElementPlus)
app.use(router)


// 挂载
app.mount('#app')


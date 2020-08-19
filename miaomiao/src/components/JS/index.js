import Vue from 'vue'
import MessageBox from './MessageBox'


//对外接口
export var messageBox = (function(){
    


    
    return function( opts){  //配置参数
        var defaults = { //默认值
            title : '',
            content : '',
            cancel : '',
            ok : '',
            handleCancel : null,
            handleOk : null,
        };

        var MyComponent = Vue.extend(MessageBox);   //js和MessageBox的vue文件结合


        for(var attr in opts){  //配置对默认参数进行覆盖
            defaults[attr] = opts[attr];
        }

        var vm = new MyComponent({   //创建MyComponent对象
            el : document.createElement('div'),  //创建个div容器
            data : {
                title : defaults.title,
                content : defaults.content,
                cancel : defaults.cancel,
                ok : defaults.ok,
            },
            methods : {//当点击按钮的时候，删掉弹窗
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.call(this); //为了拿到vm这个对象使用call
                    document.body.removeChild(vm.$el);
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild(vm.$el);
                }
            }
        });

        document.body.appendChild(vm.$el)

    }
})()
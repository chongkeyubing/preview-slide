//幻灯片模板
var mianTpl=`
    <div class="main-item" id="main_{{index}}">
        <!-- 标题 -->
        <div class="caption">
            <h2>{{h2}}</h2>
            <h3>{{h3}}</h3>
        </div>
        <img class="picture" src="{{img}}">
    </div>`;

//控制项模板
var ctrlTpl=`
    <a id="ctrl_{{index}}" class="ctrl-item" href="javascript:switchSlider({{index}});">
        <img src="{{img}}">
    </a>`;

//数据结构
var data=[
    {img:'imgs/1.jpg',h2:'Creative',h3:'DUET'},
    {img:'imgs/2.jpg',h2:'Friendly',h3:'DEVIL'},
    {img:'imgs/3.jpg',h2:'Tranquilent',h3:'COMPATRIOT'},
    {img:'imgs/4.jpg',h2:'Insecure',h3:'HUSSLER'},
    {img:'imgs/5.jpg',h2:'Loving',h3:'REBEL'},
    {img:'imgs/6.jpg',h2:'Passionate',h3:'SEEKER'},
    {img:'imgs/7.jpg',h2:'Crazy',h3:'FRIEND'}
];

//向页面添加html结构
function addSlider(){
    //输出到页面的html
    var sliderHtml = [],
        ctrlHtml=[],
        template_main = document.querySelector('#template_main'),
        template_ctrl = document.querySelector('#template_ctrl');

    //遍历数据构建html
    for(var i=0,len=data.length;i<len;i++){
        var _sliderHtml = mianTpl
            .replace(/{{index}}/g,i+1)
            .replace(/{{img}}/g,data[i].img)
            .replace(/{{h2}}/g,data[i].h2)
            .replace(/{{h3}}/g,data[i].h3);

        var _ctrlHtml = ctrlTpl
            .replace(/{{index}}/g,i+1)
            .replace(/{{img}}/g,data[i].img);

        sliderHtml.push(_sliderHtml);
        ctrlHtml.push(_ctrlHtml);
    }
    //添加html结构
    template_main.innerHTML = sliderHtml.join('');
    template_ctrl.innerHTML = ctrlHtml.join('');

    //添加切换背景html结构
    template_main.innerHTML += `<div class="main-item" id="sliderBackground"></div>`;

}

//切换幻灯片
function switchSlider(i){
    //去掉当前已激活的样式
    var mainActive =  document.querySelector('.main-item.active'),
        ctrlAcitve =  document.querySelector('.ctrl-item.active'),
        main =  document.querySelector('#main_'+i),
        ctrl =  document.querySelector('#ctrl_'+i);
    if(mainActive && ctrlAcitve) {
        mainActive.className = mainActive.className.replace(' active', '');
        ctrlAcitve.className = ctrlAcitve.className.replace(' active', '');
    }

    //激活当前点中
    main.className += ' active';
    ctrl.className += ' active';

    //添加背景内容，填补切换时的空白
    document.querySelector('#sliderBackground').innerHTML = main.innerHTML;
}

window.onload=function(){
    addSlider();

    //异步激活第一个幻灯片
    setTimeout(function(){
        switchSlider(1);
    },0)
};

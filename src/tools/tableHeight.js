/**
 * 动态计算所有表格页面表格高度
 * 操作dom 在$nextTick中执行
 * 改方法建议在获取表格数据后调用
 */

export default (some) => {
    some.$nextTick(function () {  //计算表格高度
        if (document.querySelector('.page-contents>.card>.card-body>.card-data')) {
            let ch = document.querySelector('.page-contents>.card >.card-body') ? document.querySelector('.page-contents>.card >.card-body').clientHeight : 0 //card容器高度
            let tot = document.querySelector('.page-contents>.card >.card-body>.toolbar') ? document.querySelector('.page-contents>.card >.card-body>.toolbar').clientHeight : 0 //表格偏移高度
            let pch = document.querySelector('.page-contents>.card >.card-body>.pagination') ? document.querySelector('.page-contents>.card >.card-body>.pagination').clientHeight : 0  //分页高度
            some.$data.MAX_TABLE_HEIGHT = ch - tot - pch - 80; //80 = 总 margin
        }
    })
}

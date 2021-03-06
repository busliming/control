export default {
    accountName: /^([a-z]|[A-Z]|[0-9]){6,14}$/,     //账号名称输入验证
    chineseChar: /^[\u4e00-\u9fa5|0-9]*$/,          //输入中文＋数字
    numberCheck: /^[0-9]*$/,                        //输入数字
    nonChineseChar: /[\u4e00-\u9fa5]/,              //不能输入中文
    urlCheck: new RegExp('(https?|ftp|file|ws|wss)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'),  //url验证
    space: /\s/,                                    //空格
    phone:/^1[34578]\d{9}$/,                        //手机号
    qq:/^[1-9]\d{4,10}$/,                             //qq
    weixin:/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/,       //微信号
    account:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/,  //厅主账号
    pwd:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/,  //密码
    zzs: /^\+?[1-9][0-9]*$/,  //正整数
    ffzs:/^\d+$/,  //正整数+0
    zs:/^([1-9][0-9]*|-[1-9][0-9]*)$/,   //正负整数（不含0）
    zs0:/^(0|[1-9][0-9]*|-[1-9][0-9]*)$/,   //正负整数（含0）
    xs2:/^\d+(\.\d{1,2})?$/, //验证小数点后是2位
}

<template>
    <div class="card card-primary betdetail">
        <div class="card-header">
            <div class="card-text">
                <h3>投注详情</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true">
                    <el-form-item>
                        <el-button type="info" size="small" icon="el-icon-back" style="width: 100px" @click="goback">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <benChiBaoMa v-if="gameId == 1"></benChiBaoMa>
            <feiQinZouShou v-if="gameId == 2"></feiQinZouShou>
            <!-- 捕鱼类4个游戏 -->
            <jinChanBuYu v-if="gameId == 3 || gameId == 13 || gameId == 19 || gameId == 29"></jinChanBuYu>
            <douDiZhu v-if="gameId == 4"></douDiZhu>
            <baiRenNiuNiu v-if="gameId == 5"></baiRenNiuNiu>
            <hongHeiDaZhan v-if="gameId == 6"></hongHeiDaZhan>
            <erRenPinShi v-if="gameId == 7"></erRenPinShi>
            <huanLe30Miao v-if="gameId == 8"></huanLe30Miao>
            <qiangZhuangNiuNiu v-if="gameId == 9"></qiangZhuangNiuNiu>
            <zhaJinHua v-if="gameId == 11"></zhaJinHua>
            <yaoYiYao v-if="gameId == 12"></yaoYiYao>
            <deZhou v-if="gameId == 15"></deZhou>
            <shiSanShui v-if="gameId == 17"></shiSanShui>
            <tongBiNiuNiu v-if="gameId == 20"></tongBiNiuNiu>
            <yaZhuangLongHu v-if="gameId == 21"></yaZhuangLongHu>
            <erShiYiDian v-if="gameId == 22"></erShiYiDian>
            <qiangZhuangPaiJiu v-if="gameId == 23"></qiangZhuangPaiJiu>
            <erBaGang v-if="gameId == 24"></erBaGang>
            <sanGong v-if="gameId == 25"></sanGong>
            <senLinWuHui v-if="gameId == 26"></senLinWuHui>
            <xueZhanDaoDi v-if="gameId == 27"></xueZhanDaoDi>
            <shuiHuZhuan v-if="gameId == 28"></shuiHuZhuan>
        </div>
    </div>
</template>

<script>
import request from '@/requests/reportQuery'
import BenChiBaoMa from './components/BenChiBaoMa'
import FeiQinZouShou from './components/FeiQinZouShou'
import JinChanBuYu from './components/JinChanBuYu'
import DouDiZhu from './components/DouDiZhu'
import BaiRenNiuNiu from './components/BaiRenNiuNiu'
import HongHeiDaZhan from './components/HongHeiDaZhan'
import ErRenPinShi from './components/ErRenPinShi'
import HuanLe30Miao from './components/HuanLe30Miao'
import QiangZhuangNiuNiu from './components/QiangZhuangNiuNiu'
import YaoYiYao from './components/YaoYiYao'
import DeZhou from './components/DeZhou'
import ShiSanShui from './components/ShiSanShui'
import ZhaJinHua from './components/ZhaJinHua'
import TongBiNiuNiu from './components/TongBiNiuNiu'
import QiangZhuangPaiJiu from './components/QiangZhuangPaiJiu'
import ErBaGang from './components/ErBaGang'
import YaZhuangLongHu from './components/YaZhuangLongHu'
import SanGong from './components/SanGong'
import ErShiYiDian from './components/ErShiYiDian'
import SenLinWuHui from './components/SenLinWuHui'
import XueZhanDaoDi from './components/XueZhanDaoDi'
import ShuiHuZhuan from './components/ShuiHuZhuan'

export default {
    data(){
        return{
            gameId:this.$route.params.gameId,
        }
    },
    methods:{
        goback(){
            var info = JSON.parse(sessionStorage.getItem("page3info"))
            this.$router.push({
                path: `/memberReportDetail/siteId=${info.sid}&account=${info.acc}`,
            })
        },
    },
    components: {
        BenChiBaoMa,
        FeiQinZouShou,
        JinChanBuYu,
        DouDiZhu,
        BaiRenNiuNiu,
        HongHeiDaZhan,
        ErRenPinShi,
        HuanLe30Miao,
        QiangZhuangNiuNiu,
        ZhaJinHua,
        YaoYiYao,
        DeZhou,
        ShiSanShui,
        TongBiNiuNiu,
        QiangZhuangPaiJiu,
        ErBaGang,
        YaZhuangLongHu,
        SanGong,
        ErShiYiDian,
        SenLinWuHui,
        XueZhanDaoDi,
        ShuiHuZhuan,
    },
}
</script>

<style lang="scss">
.betdetail{
    .el-card{
        border: none;
        width: 50%;
        margin-bottom: 20px;
        .el-card__header{

            color: #fff;
            font-weight: 600
        }
        .text {
            font-size: 14px;
        }
        .item {
            padding: 10px 0;
            font-weight: 600;
            color: #676a6c;
        }
    }
    .el-card:nth-child(1) .el-card__header,.el-card:nth-child(3) .el-card__header{
        background: #008afb;
    }
    .el-card:nth-child(2) .el-card__header{
        background: #23c6c8;
    }
}
</style>




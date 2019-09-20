<template>
    <div class="card card-primary">
        <div class="card-header">
            <div class="card-text">
                <h3>厅主游戏管理</h3>
            </div>
        </div>
        <div class="card-body">
            <div class="toolbar">
                <el-form :inline="true">
                    <el-form-item>
                        <el-button type="info" size="small" icon="el-icon-back" style="width: 100px" @click="$router.push({path: '/gameRoomManage'})">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="card-data">
                <el-table ref="mainTable" :max-height="MAX_TABLE_HEIGHT" :data="tableData" style="width: 100%" size="medium" stripe :cell-style="{textAlign:'center'}"
                        :header-cell-style="{textAlign:'center'}" v-loading='tableLoading'>
                    <el-table-column prop="gameName" label="游戏名称" sortable></el-table-column>
                    <el-table-column prop="gameGenre" label="游戏分组" sortable>
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.gameGenre =='1'">棋牌游戏</el-tag>
                            <el-tag type="primary" v-else-if="scope.row.gameGenre =='2'">捕鱼游戏</el-tag>
                            <el-tag type="warning" v-else>电玩街机</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="游戏状态" sortable>
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.status =='1'">正常</el-tag>
                            <el-tag type="danger" v-else-if="scope.row.status =='2'">关闭</el-tag>
                            <el-tag type="warning" v-else-if="scope.row.status =='3'">开发中</el-tag>
                            <el-tag v-else-if="scope.row.status =='4'">敬请期待</el-tag>
                            <el-tag type="warning" v-else-if="scope.row.status =='5'">即将上线</el-tag>
                            <el-tag type="info" v-else>维护中</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作" width="400" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="warning" size="mini" @click="roomlist(scope.row)">房间列表</el-button>
                            <el-button type="primary" size="mini" @click="add(scope.row)">新增场次</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageNum" :page-sizes="[10,20,50,100,200]"
                :page-size.sync="queryParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
            <!-- 新增场次弹框 -->
            <el-dialog :visible.sync="dialog.visible" width="950px" top="5vh" :close-on-click-modal="false">
                <div class="custom-dialog">
                    <div class="dialog-header">
                        <div class="card-text">
                            <h3>房间配置</h3>
                        </div>
                    </div>
                    <div class="dialog-body">
                        <!-- 下注类游戏 -->
                        <template v-if="dialog.type == 1">
                            <el-row>
                                <el-form label-width="150px">
                                    <h3 style="margin:25px">房间基本配置</h3>
                                    <el-col :span="11">
                                        <el-form-item label="房间名称:">
                                            <el-input type="text" size="small" clearable v-model="formData.type1.roomName" @blur="defaultOut"></el-input>
                                        </el-form-item>
                                        <el-form-item label="房间类型:">
                                            <el-select size="small" style="width: 100%" v-model="formData.type1.roomType">
                                                <el-option :value="1" label="体验房">体验房</el-option>
                                                <el-option :value="2" label="普通房">普通房</el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="最低携带金额:">
                                            <el-input type="number" size="small" v-model.number="formData.type1.minMoney"></el-input>
                                        </el-form-item>
                                        <el-form-item label="税收比例:">
                                            <el-input v-model.number="formData.type1.taxRatio" type="number" size="small">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="倍数场次:" v-if="formData.type1.gameId == 5">
                                            <el-select size="small" style="width: 100%" v-model="formData.type1.multiples">
                                                <el-option :value="1" label="4倍场">4倍场</el-option>
                                                <el-option :value="2" label="10倍场">10倍场</el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" label-width="10px" v-for="i in [1,0,2,3]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i :class="['el-icon-question', msg[i] == '' ? 'hidden' : '']"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="房间人数:">
                                            <el-input type="number" size="small" v-model.number="formData.type1.roomPersons"></el-input>
                                        </el-form-item>
                                        <el-form-item label="货币类型:">
                                            <span v-if="formData.type1.roomType == 1" style="font-weight:bold;">积分类型</span>
                                            <span v-if="formData.type1.roomType == 2" style="font-weight:bold;">财富类型</span>
                                        </el-form-item>
                                        <el-form-item label="下注限红:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.bottomRed1"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.bottomRed2"></el-input>
                                        </el-form-item>
                                        <el-form-item label="盘口下注限制:">
                                            <el-input type="number" size="small" v-model.number="formData.type1.robotDoorScore"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" label-width="10px" v-for="i in [4,0,5,6]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i :class="['el-icon-question', msg[i] == '' ? 'hidden' : '']"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                            <el-row>
                                <el-form label-width="150px">
                                    <h3 style="margin:25px">时间配置</h3>
                                    <el-col :span="11">
                                        <el-form-item label="空闲时间(秒):">
                                            <el-input type="number" size="small" v-model.number="formData.type1.freeTime"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" label-width="10px" v-for="i in [7]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="下注时间(秒):">
                                            <el-input type="number" size="small" v-model.number="formData.type1.betTime"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" label-width="10px" v-for="i in [8]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                            <el-row>
                                <el-form label-width="150px">
                                    <h3 style="margin:25px">筹码设置</h3>
                                    <el-col :span="11">
                                        <el-form-item label="筹码1:">
                                            <el-input type="number" size="small" v-model.number="formData.type1.chips1"></el-input>
                                        </el-form-item>
                                        <el-form-item label="筹码2:">
                                            <el-input type="number" size="small" v-model.number="formData.type1.chips2"></el-input>
                                        </el-form-item>
                                        <el-form-item label="筹码3:">
                                            <el-input type="number" size="small" v-model.number="formData.type1.chips3"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" label-width="10px" v-for="i in [0]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i :class="['el-icon-question', msg[i] == '' ? 'hidden' : '']"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="筹码4:">
                                            <el-input type="number" size="small" v-model.number="formData.type1.chips4"></el-input>
                                        </el-form-item>
                                        <el-form-item label="筹码5:">
                                            <el-input type="number" size="small" v-model.number="formData.type1.chips5"></el-input>
                                        </el-form-item>
                                        <el-form-item label="筹码6:">
                                            <el-input type="number" size="small" v-model.number="formData.type1.chips6"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                            <el-row v-if="formData.type1.gameId != 26">
                                <el-form label-width="150px">
                                    <h3 style="margin:25px">上庄配置</h3>
                                    <el-col :span="11">
                                        <el-form-item label="上庄条件:">
                                            <el-input type="number" size="small" v-model.number="formData.type1.bankerCond"></el-input>
                                        </el-form-item>
                                        <el-form-item label="额外条件:">
                                            <el-input type="number" size="small" v-model.number="formData.type1.addedCond"></el-input>
                                        </el-form-item>
                                        <el-form-item label="" label-width="25px">
                                            <el-checkbox v-model="formData.type1.sysBanker">允许玩家上庄</el-checkbox>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" label-width="10px" v-for="i in [9,10]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="坐庄局数:">
                                            <el-input type="number" size="small" v-model.number="formData.type1.bankerTime"></el-input>
                                        </el-form-item>
                                        <el-form-item label="额外局数:">
                                            <el-input type="number" size="small" v-model.number="formData.type1.addedTime"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" label-width="10px" v-for="i in [11,12]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                            <el-row>
                                <el-form label-width="150px">
                                    <h3 style="margin:25px">机器人配置</h3>
                                    <el-form-item label="" label-width="25px">
                                        <el-checkbox v-model="formData.type1.robotJoining">允许机器人加入</el-checkbox>
                                    </el-form-item>
                                    <el-col :span="11">
                                        <el-form-item label="机器人携带金币:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotGold1"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotGold2"></el-input>
                                        </el-form-item>
                                        <el-form-item label="下注筹码个数:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotMinChipsCount"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotMaxChipsCount"></el-input>
                                        </el-form-item>
                                        <el-form-item label="取钱范围:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotMinHaveScore"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotMaxHaveScore"></el-input>
                                        </el-form-item>
                                        <el-form-item label="机器人下注额度:">
                                            <el-input v-model.number="formData.type1.robotBettingByBankerScore" type="number" size="small">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="胆小机器人占比:">
                                            <el-input v-model.number="formData.type1.robotTimidRobotPro" type="number" size="small">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="普通机器人占比:">
                                            <el-input v-model.number="formData.type1.robotNomalRobotPro" type="number" size="small">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="大胆机器人占比:">
                                            <el-input v-model.number="formData.type1.robotBoldRobotPro" type="number" size="small">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="margin-top:-48px">
                                        <el-form-item label="" :label-width="i == 13 ? '-240px' : '10px'" v-for="i in [13,14,15,16,17,18,19,20]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="机器人数量:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotCount1"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotCount2"></el-input>
                                        </el-form-item>
                                        <el-form-item label="机器人下注个数:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotMinRobotPlayCount"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotMaxRobotPlayCount"></el-input>
                                        </el-form-item>
                                        <el-form-item label="机器人取钱:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotMinTakeScore"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotMaxTakeScore"></el-input>
                                        </el-form-item>
                                        <el-form-item label="昵称更换时间(分):">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotMinChangeNickName"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotMaxChangeNickName"></el-input>
                                        </el-form-item>
                                        <el-form-item label="胆小机器人下注范围:">
                                            <el-input v-model.number="formData.type1.robotTimidBettingPro" type="number" size="small">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="普通机器人下注范围:">
                                            <el-input v-model.number="formData.type1.robotNomalBettingPro" type="number" size="small">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="大胆机器人下注范围:">
                                            <el-input v-model.number="formData.type1.robotBoldBettingPro" type="number" size="small">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" label-width="10px" v-for="i in [21,22,23,24,25,26,27]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                            <el-row v-if="formData.type1.gameId != 26">
                                <el-form label-width="150px">
                                    <h3 style="margin:25px">上庄机器人配置</h3>
                                    <el-form-item label="" label-width="25px">
                                        <el-checkbox v-model="formData.type1.sysGold">允许机器人上庄</el-checkbox>
                                    </el-form-item>
                                    <el-col :span="11">
                                        <el-form-item label="上庄携带金币:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.goldCoin1"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.goldCoin2"></el-input>
                                        </el-form-item>
                                        <el-form-item label="坐庄次数:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotMinUpBankerCnt"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotMaxUpBankerCnt"></el-input>
                                        </el-form-item>
                                        <el-form-item label="空几局坐庄:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotMinWaitNoBanker"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotMaxWaitNoBanker"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="margin-top:-48px">
                                        <el-form-item label="" :label-width="i == 28 ? '-240px' : '10px'" v-for="i in [28,29,30,31]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="上庄数量:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.goldCount1"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.goldCount2"></el-input>
                                        </el-form-item>
                                        <el-form-item label="列表人数:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotMinUpBankerList"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type1.robotMaxUpBankerList"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" label-width="10px" v-for="i in [32,33]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                        </template>
                        <!-- 捕鱼类游戏 -->
                        <template v-if="dialog.type == 2">
                            <el-row>
                                <el-form label-width="150px">
                                    <h3 style="margin:25px">房间基本配置</h3>
                                    <el-col :span="11">
                                        <el-form-item label="房间名称:">
                                            <el-input type="text" size="small" clearable v-model="formData.type2.roomName" @blur="defaultOut"></el-input>
                                        </el-form-item>
                                        <el-form-item label="房间类型:">
                                            <el-select size="small" style="width: 100%" v-model="formData.type2.roomType">
                                                <el-option :value="1" label="体验房">体验房</el-option>
                                                <el-option :value="2" label="普通房">普通房</el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="最低携带金额:">
                                            <el-input type="number" size="small" v-model.number="formData.type2.minMoney"></el-input>
                                        </el-form-item>
                                        <el-form-item label="房间人数:">
                                            <el-input type="number" size="small" v-model.number="formData.type2.roomPersons"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" label-width="10px" v-for="i in [1,0,49,4]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i :class="['el-icon-question', msg[i] == '' ? 'hidden' : '']"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="游戏底分:">
                                            <el-input type="number" size="small" v-model.number="formData.type2.roomField"></el-input>
                                        </el-form-item>
                                        <el-form-item label="货币类型:">
                                            <span v-if="formData.type2.roomType == 1" style="font-weight:bold;">积分类型</span>
                                            <span v-if="formData.type2.roomType == 2" style="font-weight:bold;">财富类型</span>
                                        </el-form-item>
                                        <el-form-item label="抽水:">
                                            <el-input v-model.number="formData.type2.pumpRate" type="number" size="small">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" label-width="10px" v-for="i in [34,0,53]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i :class="['el-icon-question', msg[i] == '' ? 'hidden' : '']"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                            <el-row>
                                <el-form label-width="150px">
                                    <h3 style="margin:25px">机器人配置</h3>
                                    <el-form-item label="" label-width="25px">
                                        <el-checkbox v-model="formData.type2.robotJoining">允许机器人加入</el-checkbox>
                                    </el-form-item>
                                    <el-col :span="11">
                                        <el-form-item label="机器人携带金币:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type2.robotGold1"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type2.robotGold2"></el-input>
                                        </el-form-item>
                                        <el-form-item label="机器人数量:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type2.robotCount1"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type2.robotCount2"></el-input>
                                        </el-form-item>
                                        <el-form-item label="机器人取钱:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type2.robotMinTakeScore"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type2.robotMaxTakeScore"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="margin-top:-48px">
                                        <el-form-item label="" :label-width="i == 13 ? '-240px' : '10px'" v-for="i in [13,14,21,23]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="取钱范围:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type2.robotMinHaveScore"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type2.robotMaxHaveScore"></el-input>
                                        </el-form-item>
                                        <el-form-item label="昵称更换时间(分):">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type2.robotMinChangeNickName"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type2.robotMaxChangeNickName"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" label-width="10px" v-for="i in [16,24]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                            <el-row>
                                <el-form label-width="150px">
                                    <h3 style="margin:25px">炮台设置</h3>
                                    <el-col :span="11">
                                        <el-form-item label="炮台初始威力:">
                                            <el-input type="number" size="small" v-model.number="formData.type2.turretInitRank"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" label-width="10px" v-for="i in [35]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="调控参数:">
                                            <el-input type="number" size="small" v-model.number="formData.type2.chargeValue"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" label-width="10px" v-for="i in [35]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                        </template>
                        <!-- 对战类游戏 -->
                        <template v-if="dialog.type == 3">
                            <el-row v-if="formData.type3.gameId != 27">
                                <el-form label-width="150px">
                                    <h3 style="margin:25px">房间基本配置</h3>
                                    <el-col :span="11">
                                        <el-form-item label="房间名称:">
                                            <el-input type="text" size="small" clearable v-model="formData.type3.roomName" @blur="defaultOut"></el-input>
                                        </el-form-item>
                                        <el-form-item label="房间人数:">
                                            <el-input type="number" size="small" v-model.number="formData.type3.roomPersons"></el-input>
                                        </el-form-item>
                                        <el-form-item label="机器人离场概率:">
                                            <el-input v-model.number="formData.type3.robotOutTablePro" type="number" size="small">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="房间类型:">
                                            <el-select size="small" style="width: 100%" v-model="formData.type3.roomType">
                                                <el-option :value="1" label="体验房">体验房</el-option>
                                                <el-option :value="2" label="普通房">普通房</el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="游戏底分:" v-if="formData.type3.gameId != 7 && formData.type3.gameId != 11">
                                            <el-input type="number" size="small" v-model.number="formData.type3.roomField"></el-input>
                                        </el-form-item>
                                        <el-form-item label="游戏底分:" v-if="formData.type3.gameId == 11">
                                            <el-input type="number" size="small" v-model.number="formData.type3.roomField" style="width:108px" placeholder="底注"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" v-model.number="formData.type3.roomLimit" style="width:108px" placeholder="封顶"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" v-if="formData.type3.gameId != 11">
                                        <el-form-item label="" label-width="10px" v-for="i in [1,4,36]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i :class="['el-icon-question', msg[i] == '' ? 'hidden' : '']"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" v-else>
                                        <el-form-item label="" label-width="10px" v-for="i in [1,4,36,0,37]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i :class="['el-icon-question', msg[i] == '' ? 'hidden' : '']"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="税收比例:">
                                            <el-input v-model.number="formData.type3.taxRatio" type="number" size="small">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="最低携带金额:" v-if="formData.type3.gameId != 15 && formData.type3.gameId != 22">
                                            <el-input type="number" size="small" v-model.number="formData.type3.minMoney"></el-input>
                                        </el-form-item>
                                        <el-form-item label="携带金额:" v-else>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type3.texasMoney1"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type3.texasMoney2"></el-input>
                                        </el-form-item>
                                        <el-form-item label="准备时间:">
                                            <el-input type="number" size="small" v-model.number="formData.type3.robotReadyTime"></el-input>
                                        </el-form-item>
                                        <el-form-item label="货币类型:">
                                            <span v-if="formData.type3.roomType == 1" style="font-weight:bold;">积分类型</span>
                                            <span v-if="formData.type3.roomType == 2" style="font-weight:bold;">财富类型</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" v-if="formData.type3.gameId != 15 && formData.type3.gameId != 22">
                                        <el-form-item label="" label-width="10px" v-for="i in [3,38,40]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i :class="['el-icon-question', msg[i] == '' ? 'hidden' : '']"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" v-else>
                                        <el-form-item label="" label-width="10px" v-for="i in [3,39,40]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i :class="['el-icon-question', msg[i] == '' ? 'hidden' : '']"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                            <el-row v-else>
                                <el-form label-width="150px">
                                    <h3 style="margin:25px">房间基本配置</h3>
                                    <el-col :span="11">
                                        <el-form-item label="房间名称:">
                                            <el-input type="text" size="small" clearable v-model="formData.type3.roomName"></el-input>
                                        </el-form-item>
                                        <el-form-item label="房间人数:">
                                            <el-input type="number" size="small" v-model.number="formData.type3.roomPersons"></el-input>
                                        </el-form-item>
                                        <el-form-item label="房间类型:">
                                            <el-select size="small" style="width: 100%" v-model="formData.type3.roomType">
                                                <el-option :value="1" label="体验房">体验房</el-option>
                                                <el-option :value="2" label="普通房">普通房</el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="房间场次:">
                                            <el-select size="small" style="width: 100%" v-model="formData.type3.roomPerformance">
                                                <el-option :value="1" label="加番场">加番场</el-option>
                                                <el-option :value="2" label="乘番场">乘番场</el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="自摸设置:">
                                            <el-select size="small" style="width: 100%" v-model="formData.type3.selfSetting">
                                                <el-option :value="1" label="自摸加底">自摸加底</el-option>
                                                <el-option :value="2" label="自摸加番">自摸加番</el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="机器人离场概率:">
                                            <el-input v-model.number="formData.type3.robotOutTablePro" type="number" size="small">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" label-width="10px" v-for="i in [1,4,0,50,51,36]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i :class="['el-icon-question', msg[i] == '' ? 'hidden' : '']"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="游戏底分:">
                                            <el-input type="number" size="small" v-model.number="formData.type3.roomField"></el-input>
                                        </el-form-item>
                                        <el-form-item label="最低携带金额:">
                                            <el-input type="number" size="small" v-model.number="formData.type3.minMoney"></el-input>
                                        </el-form-item>
                                        <el-form-item label="货币类型:">
                                            <span v-if="formData.type3.roomType == 1" style="font-weight:bold;">积分类型</span>
                                            <span v-if="formData.type3.roomType == 2" style="font-weight:bold;">财富类型</span>
                                        </el-form-item>
                                        <el-form-item label="番数封顶:">
                                            <el-select size="small" style="width: 100%" v-model="formData.type3.toppingSeal">
                                                <el-option :value="1" label="4番">4番</el-option>
                                                <el-option :value="2" label="无限番">无限番</el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="税收比例:">
                                            <el-input v-model.number="formData.type3.taxRatio" type="number" size="small">
                                                <template slot="append">%</template>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="准备时间:">
                                            <el-input type="number" size="small" v-model.number="formData.type3.robotReadyTime"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" label-width="10px" v-for="i in [0,2,54,52,3,40]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i :class="['el-icon-question', msg[i] == '' ? 'hidden' : '']"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                            <el-row>
                                <el-form label-width="150px">
                                    <h3 style="margin:25px">时间配置</h3>
                                    <el-col :span="11">
                                        <el-form-item label="匹配时间(秒):">
                                            <el-input type="number" size="small" v-model.number="formData.type3.startTime"></el-input>
                                        </el-form-item>
                                        <el-form-item label="叫分/抢庄时间(秒):" v-if="formData.type3.gameId != 15 && formData.type3.gameId != 17 &&
                                        formData.type3.gameId != 11 && formData.type3.gameId != 20 && formData.type3.gameId != 22 && formData.type3.gameId != 27">
                                            <el-input type="number" size="small" v-model.number="formData.type3.callTime"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" v-if="formData.type3.gameId != 15 && formData.type3.gameId != 17 && formData.type3.gameId != 11
                                    && formData.type3.gameId != 20 && formData.type3.gameId != 22 && formData.type3.gameId != 27">
                                        <el-form-item label="" label-width="10px" v-for="i in [41,43]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" v-else>
                                        <el-form-item label="" label-width="10px" v-for="i in [41]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="出牌/下注时间(秒):">
                                            <el-input type="number" size="small" v-model.number="formData.type3.betTime"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" v-if='formData.type3.gameId != 7'>
                                        <el-form-item label="" label-width="10px" v-for="i in [42]" :key="i" >
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" v-else>
                                        <el-form-item label="" label-width="10px" v-for="i in [44]" :key="i" >
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                            <!-- 扎金花其他设置 -->
                            <el-row  v-if="formData.type3.gameId == 11">
                                <el-form label-width="150px">
                                    <h3 style="margin:25px">其他设置</h3>
                                    <el-col :span="11">
                                        <el-form-item label="" label-width="25px">
                                            <el-checkbox v-model="formData.type3.firstView">首家首轮不允许看牌</el-checkbox>
                                        </el-form-item>
                                        <el-form-item label="豹子（三条A）:">
                                            <el-input type="number" size="small" v-model.number="formData.type3.leopardThree"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" :label-width="i == 45 ? '-210px' : '10px'" v-for="i in [45,46]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="" label-width="25px">
                                            <el-checkbox v-model="formData.type3.openMoney">开启喜钱</el-checkbox>
                                        </el-form-item>
                                        <el-form-item label="豹 子:">
                                            <el-input type="number" size="small" v-model.number="formData.type3.leopard"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" :label-width="i == 47 ? '-280px' : '10px'" v-for="i in [47,48]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                            <el-row>
                                <el-form label-width="150px">
                                    <h3 style="margin:25px">机器人配置</h3>
                                    <el-form-item label="" label-width="25px">
                                        <el-checkbox v-model="formData.type3.robotJoining">允许机器人加入</el-checkbox>
                                    </el-form-item>
                                    <el-col :span="11">
                                        <el-form-item label="机器人携带金币:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type3.robotGold1"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type3.robotGold2"></el-input>
                                        </el-form-item>
                                        <!-- <el-form-item label="机器人数量:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type3.robotCount1"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type3.robotCount2"></el-input>
                                        </el-form-item> -->
                                        <el-form-item label="机器人取钱:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type3.robotMinTakeScore"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type3.robotMaxTakeScore"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1" style="margin-top:-48px">
                                        <el-form-item label="" :label-width="i == 13 ? '-240px' : '10px'" v-for="i in [13,14,23]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="取钱范围:">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type3.robotMinHaveScore"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type3.robotMaxHaveScore"></el-input>
                                        </el-form-item>
                                        <el-form-item label="昵称更换时间(分):">
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type3.robotMinChangeNickName"></el-input>
                                            <span style="padding: 0 8px;">至</span>
                                            <el-input type="number" size="small" style="width:108px" v-model.number="formData.type3.robotMaxChangeNickName"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-form-item label="" label-width="10px" v-for="i in [16,24]" :key="i">
                                            <el-tooltip class="item" effect="dark" :content="msg[i]" placement="right">
                                                <i class="el-icon-question"></i>
                                            </el-tooltip>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                            <el-row>
                                <el-form label-width="150px">
                                    <h3 style="margin:25px">分组</h3>
                                    <el-form-item label="" label-width="25px">
                                        <el-checkbox v-model="formData.type3.allowPlayerGame">允许玩家匹配到一起</el-checkbox>
                                    </el-form-item>
                                    <el-form-item label="" label-width="25px">
                                        <el-checkbox v-model="formData.type3.allowLastTimePlay">允许上次同桌的玩家匹配到一起</el-checkbox>
                                    </el-form-item>
                                    <el-form-item label="" label-width="25px">
                                        <el-checkbox v-model="formData.type3.allowIpEqualPlay">允许玩家客户端地址相同的玩家匹配到一起</el-checkbox>
                                    </el-form-item>
                                </el-form>
                            </el-row>
                        </template>
                    </div>
                    <div class="dialog-footer">
                        <el-button type="danger" icon="el-icon-error" plain :loading="dialog.loading" @click="dialog.visible=false" style="margin-right: 20px;">取消</el-button>
                        <el-button type="primary" icon="el-icon-success" :loading="dialog.loading" @click="judge">保存</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import request from '@/requests/gameRoomManage'
import defaultData from './defaultRoomSettings'
import exp from '@/tools/regexp'

export default {
    props: ['MAX_TABLE_HEIGHT'],
    data(){
        return{
            // 查询条件
            queryParams: {
                limit: 10,
                offset: 0,
                sort: 'createDate',
                sortOrder: 'desc',
                conditionsMap: { // 组合查询条件
                    siteId: this.$route.params.siteId
                }
            },

            // 列表属性
            tableData: [],
            tableLoading: false,

            //分页属性
            pageNum: 1,
            pageSize: 10,
            total: 0,

            //弹框属性
            dialog: {
                type: 1,
                visible: false,
                loading: false,
                gameId:'',
            },

            //表单信息
            formData: {
                type1:{//下注类
                    gameRoomId:"",
                    siteId:"",
                    gameId:"",

                    roomName: '',//房间名称
                    roomType: '',//房间类型
                    moneyType:'',//货币类型
                    minMoney:'',//最低金额
                    roomPersons:'',//房间人数
                    bottomRed1:'',//下注限红1
                    bottomRed2:'',//下注限红2
                    taxRatio:'',//税收比例
                    multiples:'',//倍数场次
                    robotDoorScore:'',//盘口下注限制

                    freeTime: '',//空闲时间
                    betTime: '',//下注时间

                    chips1:'',//筹码1
                    chips2:'',//筹码2
                    chips3:'',//筹码3
                    chips4:'',//筹码4
                    chips5:'',//筹码5
                    chips6:'',//筹码6

                    bankerCond:'',//上庄条件
                    addedCond:'',//额外条件
                    bankerTime:'',//坐庄局数
                    addedTime:'',//额外局数
                    sysBanker:'',//是否允许玩家上庄 1允许 2不允许

                    robotJoining:'',//是否允许机器人加入 1允许 2不允许
                    robotGold1:'',//机器人携带金币1
                    robotGold2:'',//机器人携带金币2
                    robotMinChipsCount:"",//下注筹码个数1
                    robotMaxChipsCount:"",//下注筹码个数2
                    robotMinHaveScore:"",//取钱范围1
                    robotMaxHaveScore:"",//取钱范围2
                    robotTimidRobotPro:"",//胆小机器人占比
                    robotNomalRobotPro:"",//普通机器人占比
                    robotBoldRobotPro:"",//大胆机器人占比
                    robotBettingByBankerScore:"",//机器人下注额度
                    robotCount1:'',//机器人数量1
                    robotCount2:'',//机器人数量2
                    robotMinRobotPlayCount:"",//机器人下注个数1
                    robotMaxRobotPlayCount:"",//机器人下注个数2
                    robotMinTakeScore:"",//机器人取钱1
                    robotMaxTakeScore:"",//机器人取钱2
                    robotMinChangeNickName:"",//昵称更换时间1
                    robotMaxChangeNickName:"",//昵称更换时间2
                    robotTimidBettingPro:"",//胆小机器人下注范围
                    robotNomalBettingPro:"",//普通机器人下注范围
                    robotBoldBettingPro:"",//大胆机器人下注范围

                    sysGold:'',//是否允许机器人上庄 1允许 2不允许
                    goldCoin1:'',//上庄携带金币1
                    goldCoin2:'',//上庄携带金币2
                    robotMinUpBankerCnt:'',//坐庄次数1
                    robotMaxUpBankerCnt:'',//坐庄次数2
                    robotMinWaitNoBanker:'',//空几局坐庄1
                    robotMaxWaitNoBanker:'',//空几局坐庄1
                    goldCount1:'',//上庄数量1
                    goldCount2:'',//上庄数量2
                    robotMinUpBankerList:'',//列表人数1
                    robotMaxUpBankerList:'',//列表人数2
                },
                type2:{//捕鱼类
                    gameRoomId:"",
                    siteId:"",
                    gameId:"",

                    roomName: '',//房间名称
                    roomField: '',//游戏底分
                    roomType: '',//房间类型
                    moneyType:'',//货币类型
                    minMoney:'',//最低金额
                    roomPersons:'',//房间人数
                    pumpRate: '', //抽水

                    robotJoining:'',//是否允许机器人加入 1允许 2不允许
                    robotGold1:'',//机器人携带金币1
                    robotGold2:'',//机器人携带金币2
                    robotCount1:'',//机器人数量1
                    robotCount2:'',//机器人数量2
                    robotMinTakeScore:"",//机器人取钱1
                    robotMaxTakeScore:"",//机器人取钱2
                    robotMinHaveScore:'',//取钱范围1
                    robotMaxHaveScore:'',//取钱范围2
                    robotMinChangeNickName:'',//昵称更换时间1
                    robotMaxChangeNickName:'',//昵称更换时间2

                    turretInitRank: '',//炮台初始威力
                    chargeValue: ''//调控参数
                },
                type3:{//对战类
                    gameRoomId:"",
                    siteId:"",
                    gameId:"",

                    roomName: '',//房间名称
                    roomPersons:'',//房间人数
                    roomType: '',//房间类型
                    taxRatio:'',//税收比例
                    roomField: '',//游戏底分
                    moneyType:'',//货币类型
                    minMoney:'',//最低携带金额
                    roomLimit:'',//封顶
                    texasMoney1:'',//携带金额1 德州 21点
                    texasMoney2:'',//携带金额2 德州 21点
                    roomPerformance:'',//血战 房间场次
                    selfSetting:'',//血战 自摸设置
                    toppingSeal:"",//血战 番数封顶
                    robotOutTablePro:'',//机器人离场概率
                    robotReadyTime:'',//准备时间

                    leopardThree:'',//AAA
                    leopard:'',//豹子
                    firstView:'',//首家不许看牌
                    openMoney:'',//开启喜钱

                    startTime:'',//匹配时间
                    callTime: '',//叫分/抢庄时间
                    betTime:'',//出牌/下注时间

                    robotJoining:'',//是否允许机器人加入 1允许 2不允许
                    robotGold1:'',//机器人携带金币1
                    robotGold2:'',//机器人携带金币2
                    // robotCount1:'',//机器人数量1
                    // robotCount2:'',//机器人数量2
                    robotMinTakeScore:'',//机器人取钱1
                    robotMaxTakeScore:'',//机器人取钱2
                    robotMinHaveScore:'',//取钱范围1
                    robotMaxHaveScore:'',//取钱范围2
                    robotMinChangeNickName:'',//昵称更换时间1
                    robotMaxChangeNickName:'',//昵称更换时间2

                    allowPlayerGame:'',//允许玩家匹配到一起 0不允许 1允许
                    allowLastTimePlay:'',//允许同桌玩家匹配一起 0不允许 1允许
                    allowIpEqualPlay:'',//允许同IP玩家匹配一起 0不允许 1允许
                }
            },
            msg:defaultData.msg,
        }
    },
    created(){
        this.getlist()
    },
    methods:{
        //获取列表
        getlist(){
            request.getSiteGames(this.queryParams).then(res => {
                this.tableData = res.rows;
                this.total = res.total;
            })
        },
        //房间列表按钮
        roomlist(row){
            this.$router.push({path: `/roomList/siteId=${row.siteId}&gameId=${row.gameId}`});
        },
        //新增场次按钮
        add(row){
            this.dialog.visible = true;
            this.dialog.type = row.gameType;
            this.dialog.gameId = row.gameId
            //新增时需带上的默认值
            this.setDialogData({
                gameRoomId:row.id,
                siteId:row.siteId,
                gameId:row.gameId*1,
                roomType:1,
                sysBanker:true,
                sysGold:true,
                robotJoining:true,
                firstView:true,
                openMoney:true,
            })
        },
        //formData数据状态
        setDialogData(obj){
            for (let item in this.formData['type'+this.dialog.type]) {
                this.formData['type'+this.dialog.type][item] = obj[item] ? obj[item] : ''
            }
        },
        //保存按钮
        save(){
            var str = ""
            if(this.dialog.type == 1){
                str = "addBetGameRoom"
                var {...data} = this.formData.type1
                data.sysBanker = this.formData.type1.sysBanker ? 1 : 2           //是否允许玩家上庄
                data.sysGold = this.formData.type1.sysGold ? 1 : 2               //是否允许机器人上庄
                data.robotJoining = this.formData.type1.robotJoining ? 1 : 2     //是否允许机器人加入
                data.taxRatio = this.formData.type1.taxRatio/100
                data.moneyType = this.formData.type1.roomType
            }
            if(this.dialog.type == 2){
                str = "addFishTbGameRoom"
                var {...data} = this.formData.type2
                data.robotJoining = this.formData.type2.robotJoining ? 1 : 2     //是否允许机器人加入
                data.pumpRate = this.formData.type2.pumpRate/100  //抽水
                data.moneyType = this.formData.type2.roomType
            }
            if(this.dialog.type == 3){
                str = "addFightTbGameRoom"
                var {...data} = this.formData.type3
                data.firstView = this.formData.type3.firstView ? 2 : 1   //扎金花首轮看牌
                data.openMoney = this.formData.type3.openMoney ? 1 : 2   //扎金花开启喜钱
                data.robotJoining = this.formData.type3.robotJoining ? 1 : 2     //是否允许机器人加入
                data.taxRatio = this.formData.type3.taxRatio/100
                data.allowPlayerGame = this.formData.type3.allowPlayerGame ? 1 : 0     //是否允许玩家匹配到一起
                data.allowLastTimePlay = this.formData.type3.allowLastTimePlay ? 1 : 0     //是否允许同桌玩家匹配一起
                data.allowIpEqualPlay = this.formData.type3.allowIpEqualPlay ? 1 : 0     //是否允许同IP玩家匹配一起
                data.moneyType = this.formData.type3.roomType
            }
            this.dialog.loading = true
            request[str](data).then(res => {
                this.dialog.loading = false
                if(res.code === '200'){
                    this.$notify.success({title:res.msg});
                    this.dialog.visible = false;
                    this.getlist();
                }else{
                    this.$notify.error({title:res.msg})
                }
            })
        },
        //表单验证
        judge(){
            var str = '请完善表单信息！'
            try{
                //下注类
                if(this.dialog.type == 1){
                    var t1 = this.formData.type1
                    if(!t1.roomName  || t1.minMoney === '' || t1.robotDoorScore === ''){
                        throw str
                    }
                    if(t1.roomPersons > 200 || !exp.zzs.test(t1.roomPersons) || t1.roomPersons === ''){
                        throw "房间人数应为1-200(包含)之间的正整数"
                    }
                    if(t1.bottomRed2 < t1.bottomRed1 || t1.bottomRed1 === '' || t1.bottomRed2 === ''){
                        throw "下注限红不符合要求"
                    }
                    if(t1.taxRatio < 0 || t1.taxRatio > 5 || t1.taxRatio === '' || !exp.xs2.test(t1.taxRatio)){
                        throw '税收比例应为0-5(包含)之间,最多保留两位小数'
                    }
                    if(t1.gameId == 5 && t1.multiples === ''){
                        throw str
                    }
                    if(!exp.zzs.test(t1.freeTime) || t1.freeTime === ''){
                        throw "空闲时间只能为正整数"
                    }
                    if(!exp.zzs.test(t1.betTime) || t1.betTime === ''){
                        throw "下注时间只能为正整数"
                    }
                    if(t1.chips1 === '' || t1.chips2 === '' || t1.chips3 === '' || t1.chips4 === ''
                    || t1.chips5 === '' || t1.chips6 === ''){
                        throw str
                    }
                    if(t1.chips1 < t1.bottomRed1){
                        throw '筹码1的值不能低于下注限红的最小值'
                    }
                    if(t1.chips6 > t1.bottomRed2){
                        throw '筹码6的值不能大于下注限红的最大值'
                    }
                    if(t1.chips2 <= t1.chips1 || t1.chips3 <= t1.chips2
                    || t1.chips4 <= t1.chips3 || t1.chips5 <= t1.chips4
                    || t1.chips6 <= t1.chips5){
                        throw '筹码必须输入升序排列的数值'
                    }
                    if(t1.gameId != 26){ //森林舞会无上庄
                        if(t1.sysBanker){//允许玩家上庄
                            if(t1.bankerCond === '' || t1.addedCond === ''
                            || t1.bankerTime === '' || t1.addedTime === ''){
                                throw str
                            }
                        }
                        if(t1.sysGold){ //允许机器人上庄
                            if(t1.goldCoin1 === '' || t1.goldCoin2 === '' || t1.goldCount1 === '' || t1.goldCount2 === ''
                            || t1.robotMinUpBankerCnt === '' || t1.robotMaxUpBankerCnt === '' || t1.robotMinWaitNoBanker === ''
                            || t1.robotMaxWaitNoBanker === '' || t1.robotMinUpBankerList === '' || t1.robotMaxUpBankerList === ''){
                                throw str
                            }
                            if(!exp.zzs.test(t1.goldCount1) || !exp.zzs.test(t1.goldCount2)
                            || t1.goldCount2 < t1.goldCount1){
                                throw "上庄数量不符合要求"
                            }
                            if(t1.goldCoin2 < t1.goldCoin1){
                                throw "上庄携带金币不符合要求"
                            }
                            if(t1.goldCoin1 < t1.bankerCond){
                                throw "最低上庄携带金币不能低于上庄条件"
                            }
                            if(!exp.zzs.test(t1.robotMinUpBankerCnt) || !exp.zzs.test(t1.robotMaxUpBankerCnt)
                            || t1.robotMaxUpBankerCnt < t1.robotMinUpBankerCnt){
                                throw "坐庄次数不符合要求"
                            }
                            if(!exp.zzs.test(t1.robotMinWaitNoBanker) || !exp.zzs.test(t1.robotMaxWaitNoBanker)
                            || t1.robotMaxWaitNoBanker < t1.robotMinWaitNoBanker){
                                throw "空几局坐庄不符合要求"
                            }
                            if(!exp.zzs.test(t1.robotMinUpBankerList) || !exp.zzs.test(t1.robotMaxUpBankerList)
                            || t1.robotMaxUpBankerList < t1.robotMinUpBankerList){
                                throw "列表人数不符合要求"
                            }
                        }
                    }
                    if(t1.robotJoining){ //允许机器人加入
                        if(t1.robotGold1 === '' || t1.robotGold2 === '' || t1.robotCount1 === ''|| t1.robotCount2 === '' || t1.robotMinChipsCount === ''
                        || t1.robotMaxChipsCount === '' || t1.robotMinHaveScore === '' || t1.robotMaxHaveScore === '' || t1.robotMinRobotPlayCount === ''
                        || t1.robotMaxRobotPlayCount === '' || t1.robotMinTakeScore === '' || t1.robotMaxTakeScore === '' || t1.robotBettingByBankerScore === ''
                        || t1.robotMinChangeNickName === '' || t1.robotMaxChangeNickName === '' || t1.robotTimidRobotPro === '' || t1.robotNomalRobotPro === ''
                        || t1.robotBoldRobotPro === '' || t1.robotTimidBettingPro === '' || t1.robotNomalBettingPro === '' || t1.robotBoldBettingPro === ''){
                            throw str
                        }
                        if(t1.robotGold2 < t1.robotGold1){
                            throw "机器人携带金币不符合要求"
                        }
                        if(t1.robotGold1 < t1.minMoney){
                            throw "机器人最低携带金币不得小于最低携带金额"
                        }
                        if(!exp.zzs.test(t1.robotCount1) || !exp.zzs.test(t1.robotCount2)
                        || t1.robotCount2 < t1.robotCount1){
                            throw "机器人数量不符合要求"
                        }
                        if(t1.robotCount1 < 50 || t1.robotCount2 > 500){
                            throw "机器人数量最小值不得小于50，最大值不能超过500"
                        }
                        if(!exp.zzs.test(t1.robotMinChipsCount) || !exp.zzs.test(t1.robotMaxChipsCount)
                        || t1.robotMaxChipsCount < t1.robotMinChipsCount){
                            throw "下注筹码个数不符合要求"
                        }
                        if(!exp.zzs.test(t1.robotMinRobotPlayCount) || !exp.zzs.test(t1.robotMaxRobotPlayCount)
                        || t1.robotMaxRobotPlayCount < t1.robotMinRobotPlayCount){
                            throw "机器人下注个数不符合要求"
                        }
                        if(!exp.zzs.test(t1.robotMinHaveScore) || !exp.zzs.test(t1.robotMaxHaveScore)
                        || t1.robotMaxHaveScore < t1.robotMinHaveScore){
                            throw "取钱范围不符合要求"
                        }
                        if(t1.robotMinHaveScore < t1.robotGold1){
                            throw '取钱范围最小值不得小于机器人携带金币最小值'
                        }
                        if(!exp.zzs.test(t1.robotMinTakeScore) || !exp.zzs.test(t1.robotMaxTakeScore)
                        || t1.robotMaxTakeScore < t1.robotMinTakeScore){
                            throw "机器人取钱不符合要求"
                        }
                        if(!exp.zzs.test(t1.robotMinChangeNickName) || !exp.zzs.test(t1.robotMaxChangeNickName)
                        || t1.robotMaxChangeNickName < t1.robotMinChangeNickName){
                            throw "昵称更换时间只能为正整数"
                        }
                    }
                }
                //捕鱼类
                if(this.dialog.type == 2){
                    var t2 = this.formData.type2
                    if(!t2.roomName || t2.minMoney === '' || t2.roomField === '' || t2.turretInitRank === ''
                    || t2.chargeValue === ''){
                        throw str
                    }
                    if(t2.roomPersons > 500 || !exp.zzs.test(t2.roomPersons) || t2.roomPersons === ''){
                        throw "房间人数应为1-500(包含)之间的正整数"
                    }
                    if(t2.pumpRate < 0 || t2.pumpRate > 5 || t2.pumpRate === '' || !exp.xs2.test(t2.pumpRate)){
                        throw '抽水应为0-5(包含)之间,最多保留两位小数'
                    }
                    if(t2.roomField <= 0){
                        throw '游戏底分需大于0'
                    }
                    if(t2.roomType != 1 && t2.roomField > t2.minMoney){ // 体验房不做限制
                        throw '游戏底分不得大于最低携带金额'
                    }
                    if(t2.robotJoining){ //允许机器人加入
                        if(t2.robotGold1 === '' || t2.robotGold2 === '' || t2.robotCount1 === '' || t2.robotCount2 === ''
                        || t2.robotMinHaveScore === '' || t2.robotMaxHaveScore === '' || t2.robotMinTakeScore === ''
                        || t2.robotMaxTakeScore === '' || t2.robotMinChangeNickName === '' || t2.robotMaxChangeNickName === ''){
                            throw str
                        }
                        if(t2.robotGold2 < t2.robotGold1){
                            throw "机器人携带金币不符合要求"
                        }
                        if(t2.robotGold1 < t2.minMoney){
                            throw "机器人最低携带金币不得小于最低携带金额"
                        }
                        if(!exp.zzs.test(t2.robotCount1) || !exp.zzs.test(t2.robotCount2)
                        || t2.robotCount2 < t2.robotCount1){
                            throw "机器人数量不符合要求"
                        }
                        if(t2.robotCount1 < 50 || t2.robotCount2 > 500){
                            throw "机器人数量最小值不得小于50，最大值不能超过500"
                        }
                        if(t2.robotMaxHaveScore < t2.robotMinHaveScore){
                            throw "取钱范围不符合要求"
                        }
                        if(t2.robotMinHaveScore < t2.robotGold1){
                            throw '取钱范围最小值不得小于机器人携带金币最小值'
                        }
                        if(t2.robotMaxTakeScore < t2.robotMinTakeScore){
                            throw "机器人取钱不符合要求"
                        }
                        if(!exp.zzs.test(t2.robotMinChangeNickName) || !exp.zzs.test(t2.robotMaxChangeNickName)
                        || t2.robotMaxChangeNickName < t2.robotMinChangeNickName){
                            throw "昵称更换时间只能为正整数"
                        }
                    }
                }
                //对战类
                if(this.dialog.type == 3){
                    var t3 = this.formData.type3
                    if(!t3.roomName || t3.robotOutTablePro === '' || t3.robotReadyTime === ''){
                        throw str
                    }
                    if(t3.roomPersons > 500 || !exp.zzs.test(t3.roomPersons) || t3.roomPersons === ''){
                        throw "房间人数应为1-500(包含)之间的正整数"
                    }
                    if(t3.gameId != 7 && t3.gameId != 15 && t3.gameId != 22){
                        if(t3.roomField === ''){
                            throw str
                        }
                        if(t3.roomType != 1 && t3.roomField > t3.minMoney){ //体验房不做限制
                            throw '游戏底分不得大于最低携带金额'
                        }
                        if(t3.roomField <= 0){
                            throw '游戏底分需大于0'
                        }
                    }
                    if(t3.taxRatio < 0 || t3.taxRatio > 5 || t3.taxRatio === '' || !exp.xs2.test(t3.taxRatio)){
                        throw '税收比例应为0-5(包含)之间,最多保留两位小数'
                    }
                    if(t3.gameId != 15 && t3.gameId != 22){ //不为德州或21点
                        if(t3.minMoney === ''){
                            throw str
                        }
                    }
                    if(t3.gameId == 11){
                        if(t3.roomLimit === ''){
                            throw str
                        }
                        if(t3.roomPersons % 2 != 0){
                            throw "房间人数需为2的倍数"
                        }
                        if(t3.roomField < 0.1 && t3.roomLimit < 0.5){
                            throw "顶注不得低于0.5"
                        }
                        if(t3.roomField > 0.1 && t3.roomLimit < t3.roomField*5){
                            throw "顶注不得低于底注的5倍"
                        }
                    }
                    if(t3.gameId == 15 || t3.gameId == 22){ //德州 21点
                        if(t3.texasMoney1 === '' || t3.texasMoney2 === ''){
                            throw str
                        }
                        if(t3.texasMoney2 <= t3.texasMoney1){
                            throw "携带金额第二个值需大于第一个值"
                        }
                        if(t3.roomType != 1 && t3.roomField > t3.texasMoney1){
                            throw '游戏底分不得大于携带金额最小值'
                        }
                        if(t3.roomField <= 0){
                            throw '游戏底分需大于0'
                        }
                    }
                    if(t3.gameId == 27){ //血战到底
                        if(t3.roomPerformance === '' || t3.selfSetting === '' || t3.toppingSeal === ''){
                            throw str
                        }
                    }
                    if(t3.startTime === '' || t3.betTime === ''){
                        throw str
                    }
                    if(!exp.zzs.test(t3.startTime)){
                        throw "匹配时间只能为正整数"
                    }
                    if(!exp.zzs.test(t3.betTime)){
                        throw "出牌/下注时间只能为正整数"
                    }
                    if(t3.gameId != 11 && t3.gameId != 15 && t3.gameId != 17
                    && t3.gameId != 20 && t3.gameId != 22 && t3.gameId != 27){
                        if(t3.callTime === ''){
                            throw str
                        }
                        if(!exp.zzs.test(t3.callTime)){
                            throw "叫分/抢庄时间只能为正整数"
                        }
                    }
                    if(t3.robotJoining){ //允许机器人加入
                        if(t3.robotGold1 === '' || t3.robotGold2 === ''
                        // || t3.robotCount1 === '' || t3.robotCount2 === ''
                        || t3.robotMinHaveScore === '' || t3.robotMaxHaveScore === '' || t3.robotMinTakeScore === ''
                        || t3.robotMaxTakeScore === '' || t3.robotMinChangeNickName === '' || t3.robotMaxChangeNickName === ''){
                            throw str
                        }
                        if(t3.robotGold2 < t3.robotGold1){
                            throw "机器人携带金币不符合要求"
                        }
                        if(t3.gameId == 15 || t3.gameId == 22){ //德州 21点
                            if(t3.robotGold1 < t3.texasMoney1){
                                throw "机器人最低携带金币不得小于最低携带金额"
                            }
                        }else{
                            if(t3.robotGold1 < t3.minMoney){
                                throw "机器人最低携带金币不得小于最低携带金额"
                            }
                        }
                        // if(!exp.zzs.test(t3.robotCount1) || !exp.zzs.test(t3.robotCount2)
                        // || t3.robotCount2 < t3.robotCount1){
                        //     throw "机器人数量不符合要求"
                        // }
                        // if(t3.robotCount1 < 50 || t3.robotCount2 > 500){
                        //     throw "机器人数量最小值不得小于50，最大值不能超过500"
                        // }
                        if(t3.robotMaxHaveScore < t3.robotMinHaveScore){
                            throw "取钱范围不符合要求"
                        }
                        if(t3.robotMinHaveScore < t3.robotGold1){
                            throw '取钱范围最小值不得小于机器人携带金币最小值'
                        }
                        if(t3.robotMaxTakeScore < t3.robotMinTakeScore){
                            throw "机器人取钱不符合要求"
                        }
                        if(!exp.zzs.test(t3.robotMinChangeNickName) || !exp.zzs.test(t3.robotMaxChangeNickName)
                        || t3.robotMaxChangeNickName < t3.robotMinChangeNickName){
                            throw "昵称更换时间只能为正整数"
                        }
                    }
                }
            }
            catch (e) {
                this.$message.error(e);
                return false
            }
            this.save()
        },
        //弹出是否选择默认数据(根据房间名)
        defaultOut(){
            let index = -1;
            let txt = '';
            let str = this.formData["type"+this.dialog.type].roomName
            let num = this.formData["type"+this.dialog.type].gameId
            if (str.indexOf('体验房') !== -1) {
                index = 0;
                if(JSON.stringify(defaultData.defaultSettings[this.dialog.gameId][index]) != '{}'){ //有体验房配置
                    txt = '是否需用使用默认体验房配置？';
                }
            }
            if (str.indexOf('初级房') !== -1) {
                index = 1;
                txt = '是否需用使用默认初级房配置？'
            }
            if (str.indexOf('中级房') !== -1) {
                index = 2;
                txt = '是否需用使用默认中级房配置？'
            }
            if (str.indexOf('高级房') !== -1) {
                index = 3;
                txt = '是否需用使用默认高级房配置？'
            }
            if (str.indexOf('富豪房') !== -1) {
                index = 4;
                txt = '是否需用使用默认富豪房配置？'
            }
            if (str.indexOf('至尊房') !== -1) {
                index = 5;
                txt = '是否需用使用默认至尊房配置？'
            }

            if (txt) {
                this.$confirm(txt, '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    center: true,
                    type: "warning"
                }).then(() => {
                    let obj = defaultData.defaultSettings[this.dialog.gameId][index];
                    for (let key in obj) {
                        this.formData["type"+this.dialog.type][key] = obj[key]
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        },
        sizeChangeHandle(size) {  //表格显示条数改变
            this.queryParams.limit = size;
            this.getlist();
        },
        currentChangeHandle(activePage) {  //表格显示页数改变
            this.pageNum = activePage;
            this.queryParams.offset = (activePage - 1) * this.queryParams.limit;
            this.getlist();
        },
    }
}
</script>

<style>
.el-icon-question{font-size:16px;vertical-align:middle}
.hidden{visibility: hidden;}
.el-select input{height: 32px!important}
/* chrome type为number移除箭头 */
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
     -webkit-appearance:textfield;
}
</style>





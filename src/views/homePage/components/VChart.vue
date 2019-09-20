<template>
    <div class="VChart">
        <el-card
                v-loading="data.chartLoading"
                element-loading-background="rgba(0, 0, 0, 0.1)"
        >
            <div slot="header">
                <span>{{ data.mainTitle }}</span>
            </div>
            <div class="chart-container">
                <el-card class="summary" shadow="hover">
                    <div class="row-data" v-for="(item,index) in data.summary" :key="index">
                        <p>{{ item.label }}</p>
                        <p v-if="item.val2">{{ item.val1 }} / {{ item.val2 }}</p>
                        <p v-else>{{ item.val1 }}</p>
                        <br/>
                    </div>
                </el-card>
                <el-card class="chart" shadow="hover">
                    <div class="toolbox-top">
                        <el-form :inline="true">
                            <el-form-item label="近期状况">
                                <el-button size="mini"
                                           @click="setQueryDate(1)">
                                    今天
                                </el-button>
                                <el-button size="mini"
                                           @click="setQueryDate(2)">
                                    本周
                                </el-button>
                                <el-button size="mini"
                                           @click="setQueryDate(3)">
                                    本月
                                </el-button>
                            </el-form-item>
                            <el-form-item label="">
                                <el-date-picker
                                        size="mini" v-model="daterange" type="daterange"
                                        value-format="yyyy-MM-dd" range-separator="~"
                                        start-placeholder="开始日期" end-placeholder="结束日期"
                                        @change="queryChartData"
                                />
                            </el-form-item>
                        </el-form>
                    </div>

                    <ve-line
                            height='300px'
                            :legend-visible='false'
                            :data="data.chartData"
                            :settings="chartSettings"
                    />

                    <div class="toolbox-bottom" v-if="data.chartType">
                        <el-button
                                size="mini" :type="data.chartType === 1 ? 'primary'　: ''"
                                @click="handleChartTypeChange(1)"
                        >
                            <template v-if="data.type === 1">提现笔数</template>
                            <template v-if="data.type === 2">提现金额</template>
                            <template v-if="data.type === 3">系统盈亏</template>
                        </el-button>
                        <el-button
                                size="mini" :type="data.chartType === 2 ? 'primary'　: ''"
                                @click="handleChartTypeChange(2)"
                        >
                            <template v-if="data.type === 1">充值笔数</template>
                            <template v-if="data.type === 2">充值金额</template>
                            <template v-if="data.type === 3">推广返水</template>
                        </el-button>
                        <el-button
                                size="mini" :type="data.chartType === 3 ? 'primary'　: ''"
                                @click="handleChartTypeChange(3)"
                        >
                            <template v-if="data.type === 1">首充笔数</template>
                            <template v-if="data.type === 2">首充金额</template>
                            <template v-if="data.type === 3">服务税收</template>
                        </el-button>
                    </div>
                </el-card>
            </div>
        </el-card>

        <el-card
                v-if="data.rightBar"
                v-loading='data.rightBar.loading'
                element-loading-background="rgba(0, 0, 0, 0.1)"
        >
            <div slot="header">
                <span>{{ data.rightBar.title }}</span>
            </div>
            <div>
                <template>
                    <el-tabs
                            v-if="data.rightBar.tabList.length"
                            v-model="activeTab"
                            @tab-click="handleTabClick"
                    >
                        <el-tab-pane
                                v-for="(tab, index) in data.rightBar.tabList"
                                :label="tab"
                                :key="tab"
                                :name="index+1+''"
                        />
                    </el-tabs>
                    <el-table
                            :data="data.rightBar.tableData"
                            size="small" stripe max-height="462"
                            :cell-style="{textAlign:'center'}"
                            :header-cell-style="{textAlign:'center'}"
                    >
                        <!--注册人数-->
                        <template v-if="data.type === 1">
                            <el-table-column label="日期" prop="registeredDate"/>
                            <el-table-column label="人数" prop="registeredCount"/>
                        </template>
                        <!--游戏热度-->
                        <template v-if="data.type === 2">
                            <el-table-column label="排名" type="index"/>
                            <el-table-column label="名称" prop="gameName"/>
                            <el-table-column
                                    v-if="activeTab === '1'"
                                    label="金额" prop="gameMoney"
                                    :formatter="divideBy1000">
                            </el-table-column>
                            <el-table-column
                                    v-if="activeTab === '2'"
                                    label="人数" prop="gameCount"/>
                        </template>
                        <!--流量分布-->
                        <template v-if="data.type === 3">
                            <el-table-column label="日期" prop="operDate"/>
                            <el-table-column label="人数" prop="count"/>
                            <el-table-column label="下载数量" prop="downloadCount"/>
                        </template>
                    </el-table>
                </template>
            </div>
        </el-card>
    </div>
</template>

<script>
    import formatter from "@/tools/formatter";

    export default {
        props: ['data', 'chartSettings', 'isUpdated'],
        data() {
            return {
                activeTab: '1',
                daterange: [],
                queryParams: {
                    startDate: '',
                    endDate: '',
                }
            };
        },
        watch: {
            isUpdated(val) {
                this.queryChartData();
            }
        },
        filters: {
            divideBy1000(val) {
                return formatter.divideBy1000(val)
            }
        },
        methods: {
            divideBy1000(row) {
                return formatter.divideBy1000(row.gameMoney)
            },
            setQueryDate(val) {
                let date = new Date();      //今天的日期
                let day = date.getDay();    //今天的日子
                let time = date.getTime();  //现在的时分秒
                let start;                  //开始时间
                let end;                    //结束时间
                if (val === 1) {
                    start = date;
                    end = date;
                }
                if (val === 2) {    //本周
                    start = day === 0 ? time - 6 * 3600 * 1000 * 24 : time - (day - 1) * 3600 * 1000 * 24;
                    end = date
                }
                if (val === 3) {    //本月
                    start = time - (date.getDate() - 1) * 3600 * 1000 * 24;//本月一号
                    end = date;
                }
                this.daterange = [new Date(start), new Date(end)];
                this.queryChartData()
            },
            handleChartTypeChange(val) {
                this.$emit('mutation', 'handleChartTypeChange', val)
            },
            queryChartData() {
                if (this.daterange) {
                    this.queryParams.startDate = formatter.DateToYMD(this.daterange[0]);
                    this.queryParams.endDate = formatter.DateToYMD(this.daterange[1]);
                    this.$emit('mutation', 'queryChartData', this.queryParams)
                }
            },
            handleTabClick() {
                this.$emit('mutation', 'handleTableTypeChange', this.activeTab)
            }
        },
        created() {
            this.setQueryDate(1);
        }
    }
</script>

<style lang="scss">
    .VChart {
        display: flex;
        .el-card:first-child {
            width: 66%;
            margin-right: 2%;
            .chart-container {
                display: flex;
                .summary {
                    height: 100%;
                    width: 180px;
                    margin-right: 20px;
                    margin-bottom: 40px;
                    .row-data {
                        line-height: 30px;
                        p:nth-child(1) {
                            font-size: .9rem;
                            /*font-size: 12px;*/
                            color: rgb(152, 152, 152)
                        }
                        p:nth-child(2) {
                            font-size: 1.7rem;
                            /*font-size: 28px;*/
                            color: rgb(102, 102, 102)
                        }
                    }
                }
                .chart {
                    display: flex;
                    justify-content: space-between;
                    width: calc(100% - 200px);
                    .toolbox-top {
                        .el-form-item {
                            margin-bottom: 5px;
                        }
                    }
                    .el-card__body {
                        width: 100%;
                    }
                    .toolbox-bottom {
                        text-align: center;
                    }
                }
            }
        }

        .el-card:nth-child(2) {
            width: 32%;
            overflow-y: auto;
        }
    }
</style>

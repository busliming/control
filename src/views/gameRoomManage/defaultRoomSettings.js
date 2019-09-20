export default {
    defaultSettings:{
        // gameName = 奔驰宝马, gameId = 1, gameType = 1
        '1':[
            //体验房
            { 
            },
            //初级房
            {
                roomType: 2,//房间类型
                minMoney:10,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:1,//下注限红1
                bottomRed2:100,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:5000,//上庄条件
                addedCond:6000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:5000,//上庄携带金币1
                goldCoin2:20000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:30,//机器人携带金币1
                robotGold2:200,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:10000,//盘口下注限制
                chips1:1,//筹码1
                chips2:5,//筹码2
                chips3:10,//筹码3
                chips4:20,//筹码4
                chips5:50,//筹码5
                chips6:100,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:40,//取钱范围1
                robotMaxHaveScore:200,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:10,//机器人取钱1
                robotMaxTakeScore:50,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 中级房
            {
                roomType: 2,//房间类型
                minMoney:50,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:10,//下注限红1
                bottomRed2:500,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:10000,//上庄条件
                addedCond:15000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:10000,//上庄携带金币1
                goldCoin2:50000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:50,//机器人携带金币1
                robotGold2:500,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:20000,//盘口下注限制
                chips1:10,//筹码1
                chips2:20,//筹码2
                chips3:50,//筹码3
                chips4:100,//筹码4
                chips5:200,//筹码5
                chips6:500,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:50,//取钱范围1
                robotMaxHaveScore:500,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:50,//机器人取钱1
                robotMaxTakeScore:100,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 高级房
            {
                roomType: 2,//房间类型
                minMoney:100,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:50,//下注限红1
                bottomRed2:2000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:50000,//上庄条件
                addedCond:75000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:50000,//上庄携带金币1
                goldCoin2:200000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:200,//机器人携带金币1
                robotGold2:2000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:50000,//盘口下注限制
                chips1:50,//筹码1
                chips2:100,//筹码2
                chips3:200,//筹码3
                chips4:500,//筹码4
                chips5:1000,//筹码5
                chips6:2000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:300,//取钱范围1
                robotMaxHaveScore:1000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:100,//机器人取钱1
                robotMaxTakeScore:200,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 富豪房
            {
                roomType: 2,//房间类型
                minMoney:200,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:200,//下注限红1
                bottomRed2:10000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:100000,//上庄条件
                addedCond:150000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:100000,//上庄携带金币1
                goldCoin2:500000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000,//机器人携带金币1
                robotGold2:5000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:80000,//盘口下注限制
                chips1:200,//筹码1
                chips2:500,//筹码2
                chips3:1000,//筹码3
                chips4:2000,//筹码4
                chips5:5000,//筹码5
                chips6:10000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:500,//取钱范围1
                robotMaxHaveScore:2000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:200,//机器人取钱1
                robotMaxTakeScore:1000,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 至尊房
            {
                roomType: 2,//房间类型
                minMoney:500,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:200,//下注限红1
                bottomRed2:10000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:200000,//上庄条件
                addedCond:300000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:200000,//上庄携带金币1
                goldCoin2:1000000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000,//机器人携带金币1
                robotGold2:10000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:100000,//盘口下注限制
                chips1:200,//筹码1
                chips2:500,//筹码2
                chips3:1000,//筹码3
                chips4:2000,//筹码4
                chips5:5000,//筹码5
                chips6:10000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:1000,//取钱范围1
                robotMaxHaveScore:5000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:500,//机器人取钱1
                robotMaxTakeScore:3000,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            }
        ],
        // gameName = 飞禽走兽, gameId = 2, gameType = 1
        '2':[
            //体验房
            { 
            },
            //初级房
            {
                roomType: 2,//房间类型
                minMoney:10,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:1,//下注限红1
                bottomRed2:100,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:5000,//上庄条件
                addedCond:6000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:5000,//上庄携带金币1
                goldCoin2:20000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:30,//机器人携带金币1
                robotGold2:200,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:10000,//盘口下注限制
                chips1:1,//筹码1
                chips2:5,//筹码2
                chips3:10,//筹码3
                chips4:20,//筹码4
                chips5:50,//筹码5
                chips6:100,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:40,//取钱范围1
                robotMaxHaveScore:200,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:10,//机器人取钱1
                robotMaxTakeScore:50,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 中级房
            {
                roomType: 2,//房间类型
                minMoney:50,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:10,//下注限红1
                bottomRed2:500,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:10000,//上庄条件
                addedCond:15000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:10000,//上庄携带金币1
                goldCoin2:50000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:50,//机器人携带金币1
                robotGold2:500,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:20000,//盘口下注限制
                chips1:10,//筹码1
                chips2:20,//筹码2
                chips3:50,//筹码3
                chips4:100,//筹码4
                chips5:200,//筹码5
                chips6:500,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:50,//取钱范围1
                robotMaxHaveScore:500,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:50,//机器人取钱1
                robotMaxTakeScore:100,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 高级房
            {
                roomType: 2,//房间类型
                minMoney:100,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:50,//下注限红1
                bottomRed2:2000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:50000,//上庄条件
                addedCond:75000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:50000,//上庄携带金币1
                goldCoin2:200000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:200,//机器人携带金币1
                robotGold2:2000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:50000,//盘口下注限制
                chips1:50,//筹码1
                chips2:100,//筹码2
                chips3:200,//筹码3
                chips4:500,//筹码4
                chips5:1000,//筹码5
                chips6:2000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:300,//取钱范围1
                robotMaxHaveScore:1000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:100,//机器人取钱1
                robotMaxTakeScore:200,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 富豪房
            {
                roomType: 2,//房间类型
                minMoney:200,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:200,//下注限红1
                bottomRed2:10000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:100000,//上庄条件
                addedCond:150000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:100000,//上庄携带金币1
                goldCoin2:500000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000,//机器人携带金币1
                robotGold2:5000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:80000,//盘口下注限制
                chips1:200,//筹码1
                chips2:500,//筹码2
                chips3:1000,//筹码3
                chips4:2000,//筹码4
                chips5:5000,//筹码5
                chips6:10000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:500,//取钱范围1
                robotMaxHaveScore:2000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:200,//机器人取钱1
                robotMaxTakeScore:1000,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 至尊房
            {
                roomType: 2,//房间类型
                minMoney:500,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:200,//下注限红1
                bottomRed2:10000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:200000,//上庄条件
                addedCond:300000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:200000,//上庄携带金币1
                goldCoin2:1000000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000,//机器人携带金币1
                robotGold2:10000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:100000,//盘口下注限制
                chips1:200,//筹码1
                chips2:500,//筹码2
                chips3:1000,//筹码3
                chips4:2000,//筹码4
                chips5:5000,//筹码5
                chips6:10000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:1000,//取钱范围1
                robotMaxHaveScore:5000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:500,//机器人取钱1
                robotMaxTakeScore:3000,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            }
        ],
        // gameName = 金蟾捕鱼, gameId = 3, gameType = 2
        '3':[
            //体验房
            { 
                roomField: 100,//游戏底分
                roomType: 1,//房间类型
                minMoney:0,//最低金额
                roomPersons:500,//房间人数
                pumpRate:0, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000000,//机器人携带金币1
                robotGold2:1000000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:200000,//机器人取钱1
                robotMaxTakeScore:300000,//机器人取钱2
                robotMinHaveScore:1000000,//取钱范围1
                robotMaxHaveScore:1000000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 3,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //初级房
            {
                roomField: 0.01,//游戏底分
                roomType: 2,//房间类型
                minMoney:10,//最低金额
                roomPersons:500,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:10,//机器人携带金币1
                robotGold2:100,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:10,//机器人取钱1
                robotMaxTakeScore:12,//机器人取钱2
                robotMinHaveScore:20,//取钱范围1
                robotMaxHaveScore:70,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //中级房
            {
                roomField: 0.05,//游戏底分
                roomType: 2,//房间类型
                minMoney:30,//最低金额
                roomPersons:500,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:30,//机器人携带金币1
                robotGold2:500,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:30,//机器人取钱1
                robotMaxTakeScore:35,//机器人取钱2
                robotMinHaveScore:30,//取钱范围1
                robotMaxHaveScore:400,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //高级房
            {
                roomField: 0.1,//游戏底分
                roomType: 2,//房间类型
                minMoney:50,//最低金额
                roomPersons:500,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:50,//机器人携带金币1
                robotGold2:1000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:50,//机器人取钱1
                robotMaxTakeScore:56,//机器人取钱2
                robotMinHaveScore:50,//取钱范围1
                robotMaxHaveScore:900,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //富豪房
            {
                roomField: 1,//游戏底分
                roomType: 2,//房间类型
                minMoney:100,//最低金额
                roomPersons:500,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:500,//机器人携带金币1
                robotGold2:10000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:100,//机器人取钱1
                robotMaxTakeScore:200,//机器人取钱2
                robotMinHaveScore:1000,//取钱范围1
                robotMaxHaveScore:9000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //至尊房
            {
                roomField: 10,//游戏底分
                roomType: 2,//房间类型
                minMoney:500,//最低金额
                roomPersons:500,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:2000,//机器人携带金币1
                robotGold2:20000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:500,//机器人取钱1
                robotMaxTakeScore:2000,//机器人取钱2
                robotMinHaveScore:2001,//取钱范围1
                robotMaxHaveScore:10000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
        ],
        // gameName = 斗地主, gameId = 4, gameType = 3
        '4':[
            //体验房
            {
                roomPersons:200,//房间人数
                roomType: 1,//房间类型
                taxRatio:0,//税收比例
                roomField: 100,//游戏底分
                minMoney:0,//最低携带金额

                startTime:3,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:15,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000000,//机器人携带金币1
                robotGold2:1000000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:200000,//机器人取钱1
                robotMaxTakeScore:300000,//机器人取钱2
                robotMinHaveScore:1000000,//取钱范围1
                robotMaxHaveScore:1000000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //初级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 0.01,//游戏底分
                minMoney:0.1,//最低携带金额

                startTime:3,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:15,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:0.1,//机器人携带金币1
                robotGold2:25,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:0.1,//机器人取钱1
                robotMaxTakeScore:25,//机器人取钱2
                robotMinHaveScore:0.3,//取钱范围1
                robotMaxHaveScore:20,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //中级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 0.1,//游戏底分
                minMoney:0.5,//最低携带金额

                startTime:3,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:15,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:0.5,//机器人携带金币1
                robotGold2:45,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:0.5,//机器人取钱1
                robotMaxTakeScore:45,//机器人取钱2
                robotMinHaveScore:0.8,//取钱范围1
                robotMaxHaveScore:40,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //高级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 1,//游戏底分
                minMoney:20,//最低携带金额

                startTime:3,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:15,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:10,//机器人携带金币1
                robotGold2:200,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:10,//机器人取钱1
                robotMaxTakeScore:200,//机器人取钱2
                robotMinHaveScore:15,//取钱范围1
                robotMaxHaveScore:150,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //富豪房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 5,//游戏底分
                minMoney:100,//最低携带金额

                startTime:3,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:15,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:120,//机器人携带金币1
                robotGold2:2000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:120,//机器人取钱1
                robotMaxTakeScore:2000,//机器人取钱2
                robotMinHaveScore:150,//取钱范围1
                robotMaxHaveScore:1500,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            }
        ],
        // gameName = 百人牛牛, gameId = 5, gameType = 1
        '5':[
            //体验房
            {},
            //初级房
            {
                roomType: 2,//房间类型
                minMoney:10,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:1,//下注限红1
                bottomRed2:100,//下注限红2
                taxRatio:5,//税收比例
                multiples:1,//倍数场次

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:10000,//上庄条件
                addedCond:6000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:5000,//上庄携带金币1
                goldCoin2:20000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:30,//机器人携带金币1
                robotGold2:200,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:80,//机器人数量2

                robotDoorScore:20000,//盘口下注限制
                chips1:1,//筹码1
                chips2:5,//筹码2
                chips3:10,//筹码3
                chips4:20,//筹码4
                chips5:50,//筹码5
                chips6:100,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:100,//取钱范围1
                robotMaxHaveScore:500,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:4,//机器人取钱1
                robotMaxTakeScore:6,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:50,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 中级房
            {
                roomType: 2,//房间类型
                minMoney:50,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:10,//下注限红1
                bottomRed2:500,//下注限红2
                taxRatio:5,//税收比例
                multiples:1,//倍数场次

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:50000,//上庄条件
                addedCond:15000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:10000,//上庄携带金币1
                goldCoin2:50000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:100,//机器人携带金币1
                robotGold2:500,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:80,//机器人数量2

                robotDoorScore:40000,//盘口下注限制
                chips1:10,//筹码1
                chips2:20,//筹码2
                chips3:50,//筹码3
                chips4:100,//筹码4
                chips5:200,//筹码5
                chips6:500,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:200,//取钱范围1
                robotMaxHaveScore:1000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:40,//机器人取钱1
                robotMaxTakeScore:43,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:50,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 高级房
            {
                roomType: 2,//房间类型
                minMoney:200,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:50,//下注限红1
                bottomRed2:2000,//下注限红2
                taxRatio:5,//税收比例
                multiples:1,//倍数场次

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:100000,//上庄条件
                addedCond:75000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:50000,//上庄携带金币1
                goldCoin2:200000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:300,//机器人携带金币1
                robotGold2:2000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:80,//机器人数量2

                robotDoorScore:60000,//盘口下注限制
                chips1:50,//筹码1
                chips2:100,//筹码2
                chips3:200,//筹码3
                chips4:500,//筹码4
                chips5:1000,//筹码5
                chips6:2000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:500,//取钱范围1
                robotMaxHaveScore:2000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:200,//机器人取钱1
                robotMaxTakeScore:210,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:50,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 富豪房
            {
                roomType: 2,//房间类型
                minMoney:400,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:100,//下注限红1
                bottomRed2:5000,//下注限红2
                taxRatio:5,//税收比例
                multiples:1,//倍数场次

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:200000,//上庄条件
                addedCond:150000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:100000,//上庄携带金币1
                goldCoin2:500000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:600,//机器人携带金币1
                robotGold2:5000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:80,//机器人数量2

                robotDoorScore:80000,//盘口下注限制
                chips1:200,//筹码1
                chips2:500,//筹码2
                chips3:1000,//筹码3
                chips4:2000,//筹码4
                chips5:5000,//筹码5
                chips6:10000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:500,//取钱范围1
                robotMaxHaveScore:10000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:400,//机器人取钱1
                robotMaxTakeScore:410,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:50,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 至尊房
            {
                roomType: 2,//房间类型
                minMoney:800,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:200,//下注限红1
                bottomRed2:10000,//下注限红2
                taxRatio:5,//税收比例
                multiples:1,//倍数场次

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:500000,//上庄条件
                addedCond:300000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:200000,//上庄携带金币1
                goldCoin2:1000000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000,//机器人携带金币1
                robotGold2:10000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:80,//机器人数量2

                robotDoorScore:100000,//盘口下注限制
                chips1:200,//筹码1
                chips2:500,//筹码2
                chips3:1000,//筹码3
                chips4:2000,//筹码4
                chips5:5000,//筹码5
                chips6:10000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:1000,//取钱范围1
                robotMaxHaveScore:200000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:800,//机器人取钱1
                robotMaxTakeScore:810,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:50,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            }
        ],
        // gameName = 红黑大战, gameId = 6, gameType = 1
        '6':[
            //体验房
            { 
            },
            //初级房
            {
                roomType: 2,//房间类型
                minMoney:10,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:1,//下注限红1
                bottomRed2:100,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:5000,//上庄条件
                addedCond:6000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:5000,//上庄携带金币1
                goldCoin2:20000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:30,//机器人携带金币1
                robotGold2:200,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:10000,//盘口下注限制
                chips1:1,//筹码1
                chips2:5,//筹码2
                chips3:10,//筹码3
                chips4:20,//筹码4
                chips5:50,//筹码5
                chips6:100,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:40,//取钱范围1
                robotMaxHaveScore:200,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:10,//机器人取钱1
                robotMaxTakeScore:50,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 中级房
            {
                roomType: 2,//房间类型
                minMoney:50,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:10,//下注限红1
                bottomRed2:500,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:10000,//上庄条件
                addedCond:15000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:10000,//上庄携带金币1
                goldCoin2:50000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:50,//机器人携带金币1
                robotGold2:500,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:20000,//盘口下注限制
                chips1:10,//筹码1
                chips2:20,//筹码2
                chips3:50,//筹码3
                chips4:100,//筹码4
                chips5:200,//筹码5
                chips6:500,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:50,//取钱范围1
                robotMaxHaveScore:500,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:50,//机器人取钱1
                robotMaxTakeScore:100,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 高级房
            {
                roomType: 2,//房间类型
                minMoney:100,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:50,//下注限红1
                bottomRed2:2000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:50000,//上庄条件
                addedCond:75000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:50000,//上庄携带金币1
                goldCoin2:200000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:200,//机器人携带金币1
                robotGold2:2000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:50000,//盘口下注限制
                chips1:50,//筹码1
                chips2:100,//筹码2
                chips3:200,//筹码3
                chips4:500,//筹码4
                chips5:1000,//筹码5
                chips6:2000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:300,//取钱范围1
                robotMaxHaveScore:1000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:100,//机器人取钱1
                robotMaxTakeScore:200,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 富豪房
            {
                roomType: 2,//房间类型
                minMoney:200,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:200,//下注限红1
                bottomRed2:10000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:100000,//上庄条件
                addedCond:150000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:100000,//上庄携带金币1
                goldCoin2:500000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000,//机器人携带金币1
                robotGold2:5000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:80000,//盘口下注限制
                chips1:200,//筹码1
                chips2:500,//筹码2
                chips3:1000,//筹码3
                chips4:2000,//筹码4
                chips5:5000,//筹码5
                chips6:10000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:500,//取钱范围1
                robotMaxHaveScore:2000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:200,//机器人取钱1
                robotMaxTakeScore:1000,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 至尊房
            {
                roomType: 2,//房间类型
                minMoney:500,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:200,//下注限红1
                bottomRed2:10000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:200000,//上庄条件
                addedCond:300000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:200000,//上庄携带金币1
                goldCoin2:1000000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000,//机器人携带金币1
                robotGold2:10000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:100000,//盘口下注限制
                chips1:200,//筹码1
                chips2:500,//筹码2
                chips3:1000,//筹码3
                chips4:2000,//筹码4
                chips5:5000,//筹码5
                chips6:10000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:1000,//取钱范围1
                robotMaxHaveScore:5000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:500,//机器人取钱1
                robotMaxTakeScore:3000,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            }
        ],
        // gameName = 二人拼十, gameId = 7, gameType = 3
        '7':[
            //体验房
            {
                roomPersons:200,//房间人数
                roomType: 1,//房间类型
                taxRatio:0,//税收比例
                minMoney:0,//最低携带金额

                startTime:15,//匹配时间
                callTime: 15,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000000,//机器人携带金币1
                robotGold2:1000000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:200000,//机器人取钱1
                robotMaxTakeScore:300000,//机器人取钱2
                robotMinHaveScore:1000000,//取钱范围1
                robotMaxHaveScore:1000000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //初级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                minMoney:10,//最低携带金额

                startTime:15,//匹配时间
                callTime: 15,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:10,//机器人携带金币1
                robotGold2:100,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:10,//机器人取钱1
                robotMaxTakeScore:20,//机器人取钱2
                robotMinHaveScore:20,//取钱范围1
                robotMaxHaveScore:90,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //中级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                minMoney:30,//最低携带金额

                startTime:15,//匹配时间
                callTime: 15,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:30,//机器人携带金币1
                robotGold2:300,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:30,//机器人取钱1
                robotMaxTakeScore:50,//机器人取钱2
                robotMinHaveScore:30,//取钱范围1
                robotMaxHaveScore:250,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //高级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                minMoney:50,//最低携带金额

                startTime:15,//匹配时间
                callTime: 15,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:50,//机器人携带金币1
                robotGold2:500,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:50,//机器人取钱1
                robotMaxTakeScore:80,//机器人取钱2
                robotMinHaveScore:50,//取钱范围1
                robotMaxHaveScore:450,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //富豪房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                minMoney:100,//最低携带金额

                startTime:15,//匹配时间
                callTime: 15,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:100,//机器人携带金币1
                robotGold2:1000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:100,//机器人取钱1
                robotMaxTakeScore:200,//机器人取钱2
                robotMinHaveScore:200,//取钱范围1
                robotMaxHaveScore:800,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            }
        ],
        // gameName = 百家乐(欢乐30秒), gameId = 8, gameType = 1
        '8':[
            //体验房
            { 
            },
            //初级房
            {
                roomType: 2,//房间类型
                minMoney:10,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:1,//下注限红1
                bottomRed2:100,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:5000,//上庄条件
                addedCond:6000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:5000,//上庄携带金币1
                goldCoin2:20000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:30,//机器人携带金币1
                robotGold2:200,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:10000,//盘口下注限制
                chips1:1,//筹码1
                chips2:5,//筹码2
                chips3:10,//筹码3
                chips4:20,//筹码4
                chips5:50,//筹码5
                chips6:100,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:40,//取钱范围1
                robotMaxHaveScore:200,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:10,//机器人取钱1
                robotMaxTakeScore:50,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 中级房
            {
                roomType: 2,//房间类型
                minMoney:50,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:10,//下注限红1
                bottomRed2:500,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:10000,//上庄条件
                addedCond:15000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:10000,//上庄携带金币1
                goldCoin2:50000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:50,//机器人携带金币1
                robotGold2:500,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:20000,//盘口下注限制
                chips1:10,//筹码1
                chips2:20,//筹码2
                chips3:50,//筹码3
                chips4:100,//筹码4
                chips5:200,//筹码5
                chips6:500,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:50,//取钱范围1
                robotMaxHaveScore:500,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:50,//机器人取钱1
                robotMaxTakeScore:100,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 高级房
            {
                roomType: 2,//房间类型
                minMoney:100,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:50,//下注限红1
                bottomRed2:2000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:50000,//上庄条件
                addedCond:75000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:50000,//上庄携带金币1
                goldCoin2:200000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:200,//机器人携带金币1
                robotGold2:2000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:50000,//盘口下注限制
                chips1:50,//筹码1
                chips2:100,//筹码2
                chips3:200,//筹码3
                chips4:500,//筹码4
                chips5:1000,//筹码5
                chips6:2000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:300,//取钱范围1
                robotMaxHaveScore:1000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:100,//机器人取钱1
                robotMaxTakeScore:200,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 富豪房
            {
                roomType: 2,//房间类型
                minMoney:200,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:200,//下注限红1
                bottomRed2:10000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:100000,//上庄条件
                addedCond:150000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:100000,//上庄携带金币1
                goldCoin2:500000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000,//机器人携带金币1
                robotGold2:5000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:80000,//盘口下注限制
                chips1:200,//筹码1
                chips2:500,//筹码2
                chips3:1000,//筹码3
                chips4:2000,//筹码4
                chips5:5000,//筹码5
                chips6:10000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:500,//取钱范围1
                robotMaxHaveScore:2000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:200,//机器人取钱1
                robotMaxTakeScore:1000,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 至尊房
            {
                roomType: 2,//房间类型
                minMoney:500,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:200,//下注限红1
                bottomRed2:10000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:200000,//上庄条件
                addedCond:300000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:200000,//上庄携带金币1
                goldCoin2:1000000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000,//机器人携带金币1
                robotGold2:10000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:100000,//盘口下注限制
                chips1:200,//筹码1
                chips2:500,//筹码2
                chips3:1000,//筹码3
                chips4:2000,//筹码4
                chips5:5000,//筹码5
                chips6:10000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:1000,//取钱范围1
                robotMaxHaveScore:5000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:500,//机器人取钱1
                robotMaxTakeScore:3000,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            }
        ],
        // gameName = 抢庄拼十, gameId = 9, gameType = 3
        '9':[
            //体验房
            {
                roomPersons:200,//房间人数
                roomType: 1,//房间类型
                taxRatio:0,//税收比例
                roomField: 100,//游戏底分
                minMoney:0,//最低携带金额

                startTime:15,//匹配时间
                callTime: 5,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000000,//机器人携带金币1
                robotGold2:1000000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:200000,//机器人取钱1
                robotMaxTakeScore:300000,//机器人取钱2
                robotMinHaveScore:1000000,//取钱范围1
                robotMaxHaveScore:1000000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //初级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 4,//游戏底分
                minMoney:24,//最低携带金额

                startTime:15,//匹配时间
                callTime: 5,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:24,//机器人携带金币1
                robotGold2:240,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:24,//机器人取钱1
                robotMaxTakeScore:50,//机器人取钱2
                robotMinHaveScore:50,//取钱范围1
                robotMaxHaveScore:190,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //中级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 10,//游戏底分
                minMoney:60,//最低携带金额

                startTime:15,//匹配时间
                callTime: 5,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:60,//机器人携带金币1
                robotGold2:600,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:60,//机器人取钱1
                robotMaxTakeScore:100,//机器人取钱2
                robotMinHaveScore:100,//取钱范围1
                robotMaxHaveScore:500,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //高级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 30,//游戏底分
                minMoney:180,//最低携带金额

                startTime:15,//匹配时间
                callTime: 5,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:180,//机器人携带金币1
                robotGold2:1800,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:180,//机器人取钱1
                robotMaxTakeScore:300,//机器人取钱2
                robotMinHaveScore:300,//取钱范围1
                robotMaxHaveScore:1600,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //富豪房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 100,//游戏底分
                minMoney:600,//最低携带金额

                startTime:15,//匹配时间
                callTime: 5,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:600,//机器人携带金币1
                robotGold2:6000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:600,//机器人取钱1
                robotMaxTakeScore:1200,//机器人取钱2
                robotMinHaveScore:1200,//取钱范围1
                robotMaxHaveScore:4800,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
        ],
        // gameName = 扎金花, gameId = 11, gameType = 3
        '11':[
            //体验房
            {
                roomPersons:500,//房间人数
                roomType: 1,//房间类型
                taxRatio:0,//税收比例
                roomField: 10,//游戏底分
                minMoney:0,//最低携带金额
                roomLimit:300,//封顶

                leopardThree:30,//AAA
                leopard:20,//豹子
                firstView:true,//首家不许看牌
                openMoney:true,//开启喜钱

                startTime:3,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000000,//机器人携带金币1
                robotGold2:1000000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:200000,//机器人取钱1
                robotMaxTakeScore:300000,//机器人取钱2
                robotMinHaveScore:1000000,//取钱范围1
                robotMaxHaveScore:1000000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //初级房
            {
                roomPersons:500,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 0.01,//游戏底分
                minMoney:1,//最低携带金额
                roomLimit:0.5,//封顶

                leopardThree:0.03,//AAA
                leopard:0.02,//豹子
                firstView:true,//首家不许看牌
                openMoney:true,//开启喜钱

                startTime:3,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:30,//机器人携带金币1
                robotGold2:100,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:20,//机器人取钱1
                robotMaxTakeScore:100,//机器人取钱2
                robotMinHaveScore:40,//取钱范围1
                robotMaxHaveScore:160,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //中级房
            {
                roomPersons:500,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 1,//游戏底分
                minMoney:60,//最低携带金额
                roomLimit:100,//封顶

                leopardThree:3,//AAA
                leopard:2,//豹子
                firstView:true,//首家不许看牌
                openMoney:true,//开启喜钱

                startTime:3,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:200,//机器人携带金币1
                robotGold2:1000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:50,//机器人取钱1
                robotMaxTakeScore:300,//机器人取钱2
                robotMinHaveScore:200,//取钱范围1
                robotMaxHaveScore:450,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //高级房
            {
                roomPersons:500,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 5,//游戏底分
                minMoney:250,//最低携带金额
                roomLimit:200,//封顶

                leopardThree:15,//AAA
                leopard:10,//豹子
                firstView:true,//首家不许看牌
                openMoney:true,//开启喜钱

                startTime:3,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:500,//机器人携带金币1
                robotGold2:2500,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:100,//机器人取钱1
                robotMaxTakeScore:500,//机器人取钱2
                robotMinHaveScore:600,//取钱范围1
                robotMaxHaveScore:2000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //富豪房
            {
                roomPersons:500,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 10,//游戏底分
                minMoney:600,//最低携带金额
                roomLimit:300,//封顶

                leopardThree:30,//AAA
                leopard:20,//豹子
                firstView:true,//首家不许看牌
                openMoney:true,//开启喜钱

                startTime:3,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:1500,//机器人携带金币1
                robotGold2:6000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:600,//机器人取钱1
                robotMaxTakeScore:2000,//机器人取钱2
                robotMinHaveScore:1500,//取钱范围1
                robotMaxHaveScore:3000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
        ],
        // gameName = 摇一摇, gameId = 12, gameType = 1
        '12':[
            //体验房
            { 
            },
            //初级房
            {
                roomType: 2,//房间类型
                minMoney:10,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:1,//下注限红1
                bottomRed2:100,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:5000,//上庄条件
                addedCond:6000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:5000,//上庄携带金币1
                goldCoin2:20000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:30,//机器人携带金币1
                robotGold2:200,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:20000,//盘口下注限制
                chips1:1,//筹码1
                chips2:5,//筹码2
                chips3:10,//筹码3
                chips4:20,//筹码4
                chips5:50,//筹码5
                chips6:100,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:10,//取钱范围1
                robotMaxHaveScore:200,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:1,//机器人取钱1
                robotMaxTakeScore:3,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 中级房
            {
                roomType: 2,//房间类型
                minMoney:50,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:10,//下注限红1
                bottomRed2:500,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:10000,//上庄条件
                addedCond:15000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:10000,//上庄携带金币1
                goldCoin2:50000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:50,//机器人携带金币1
                robotGold2:500,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:40000,//盘口下注限制
                chips1:10,//筹码1
                chips2:20,//筹码2
                chips3:50,//筹码3
                chips4:100,//筹码4
                chips5:200,//筹码5
                chips6:500,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:50,//取钱范围1
                robotMaxHaveScore:500,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:10,//机器人取钱1
                robotMaxTakeScore:15,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 高级房
            {
                roomType: 2,//房间类型
                minMoney:100,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:50,//下注限红1
                bottomRed2:2000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:50000,//上庄条件
                addedCond:75000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:50000,//上庄携带金币1
                goldCoin2:200000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:200,//机器人携带金币1
                robotGold2:2000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:60000,//盘口下注限制
                chips1:50,//筹码1
                chips2:100,//筹码2
                chips3:200,//筹码3
                chips4:500,//筹码4
                chips5:1000,//筹码5
                chips6:2000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:100,//取钱范围1
                robotMaxHaveScore:1000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:50,//机器人取钱1
                robotMaxTakeScore:100,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 富豪房
            {
                roomType: 2,//房间类型
                minMoney:200,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:200,//下注限红1
                bottomRed2:10000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:100000,//上庄条件
                addedCond:150000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:100000,//上庄携带金币1
                goldCoin2:500000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000,//机器人携带金币1
                robotGold2:5000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:80000,//盘口下注限制
                chips1:200,//筹码1
                chips2:500,//筹码2
                chips3:1000,//筹码3
                chips4:2000,//筹码4
                chips5:5000,//筹码5
                chips6:10000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:300,//取钱范围1
                robotMaxHaveScore:5000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:100,//机器人取钱1
                robotMaxTakeScore:200,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 至尊房
            {
                roomType: 2,//房间类型
                minMoney:500,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:200,//下注限红1
                bottomRed2:10000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:200000,//上庄条件
                addedCond:300000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:200000,//上庄携带金币1
                goldCoin2:1000000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000,//机器人携带金币1
                robotGold2:10000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:100000,//盘口下注限制
                chips1:200,//筹码1
                chips2:500,//筹码2
                chips3:1000,//筹码3
                chips4:2000,//筹码4
                chips5:5000,//筹码5
                chips6:10000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:500,//取钱范围1
                robotMaxHaveScore:10000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:200,//机器人取钱1
                robotMaxTakeScore:400,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            }
        ],
        // gameName = 李逵劈鱼, gameId = 13, gameType = 2
        '13':[
            //体验房
            { 
                roomField: 100,//游戏底分
                roomType: 1,//房间类型
                minMoney:0,//最低金额
                roomPersons:500,//房间人数
                pumpRate:0, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000000,//机器人携带金币1
                robotGold2:1000000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:200000,//机器人取钱1
                robotMaxTakeScore:300000,//机器人取钱2
                robotMinHaveScore:1000000,//取钱范围1
                robotMaxHaveScore:1000000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 3,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //初级房
            {
                roomField: 0.01,//游戏底分
                roomType: 2,//房间类型
                minMoney:10,//最低金额
                roomPersons:500,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:10,//机器人携带金币1
                robotGold2:100,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:10,//机器人取钱1
                robotMaxTakeScore:12,//机器人取钱2
                robotMinHaveScore:20,//取钱范围1
                robotMaxHaveScore:70,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //中级房
            {
                roomField: 0.05,//游戏底分
                roomType: 2,//房间类型
                minMoney:30,//最低金额
                roomPersons:500,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:30,//机器人携带金币1
                robotGold2:500,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:30,//机器人取钱1
                robotMaxTakeScore:35,//机器人取钱2
                robotMinHaveScore:30,//取钱范围1
                robotMaxHaveScore:400,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //高级房
            {
                roomField: 0.1,//游戏底分
                roomType: 2,//房间类型
                minMoney:50,//最低金额
                roomPersons:500,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:50,//机器人携带金币1
                robotGold2:1000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:50,//机器人取钱1
                robotMaxTakeScore:56,//机器人取钱2
                robotMinHaveScore:50,//取钱范围1
                robotMaxHaveScore:900,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //富豪房
            {
                roomField: 1,//游戏底分
                roomType: 2,//房间类型
                minMoney:100,//最低金额
                roomPersons:500,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:500,//机器人携带金币1
                robotGold2:10000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:100,//机器人取钱1
                robotMaxTakeScore:200,//机器人取钱2
                robotMinHaveScore:1000,//取钱范围1
                robotMaxHaveScore:9000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //至尊房
            {
                roomField: 10,//游戏底分
                roomType: 2,//房间类型
                minMoney:500,//最低金额
                roomPersons:500,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:2000,//机器人携带金币1
                robotGold2:20000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:500,//机器人取钱1
                robotMaxTakeScore:2000,//机器人取钱2
                robotMinHaveScore:2001,//取钱范围1
                robotMaxHaveScore:10000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
        ],
        // gameName = 德州扑克, gameId = 15, gameType = 3
        '15':[
            //体验房
            {
                roomPersons:200,//房间人数
                roomType: 1,//房间类型
                taxRatio:0,//税收比例
                roomField: 100,//游戏底分
                texasMoney1:0,//携带金额1 德州 21点
                texasMoney2:1000000,//携带金额2 德州 21点

                startTime:15,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000000,//机器人携带金币1
                robotGold2:1000000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:200000,//机器人取钱1
                robotMaxTakeScore:300000,//机器人取钱2
                robotMinHaveScore:1000000,//取钱范围1
                robotMaxHaveScore:1000000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //初级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 1,//游戏底分
                texasMoney1:10,//携带金额1 德州 21点
                texasMoney2:400,//携带金额2 德州 21点

                startTime:15,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:10,//机器人携带金币1
                robotGold2:400,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:20,//机器人取钱1
                robotMaxTakeScore:30,//机器人取钱2
                robotMinHaveScore:20,//取钱范围1
                robotMaxHaveScore:370,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //中级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 10,//游戏底分
                texasMoney1:50,//携带金额1 德州 21点
                texasMoney2:2000,//携带金额2 德州 21点

                startTime:15,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:50,//机器人携带金币1
                robotGold2:2000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:50,//机器人取钱1
                robotMaxTakeScore:100,//机器人取钱2
                robotMinHaveScore:100,//取钱范围1
                robotMaxHaveScore:1900,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //高级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 50,//游戏底分
                texasMoney1:100,//携带金额1 德州 21点
                texasMoney2:4000,//携带金额2 德州 21点

                startTime:15,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:100,//机器人携带金币1
                robotGold2:4000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:200,//机器人取钱1
                robotMaxTakeScore:500,//机器人取钱2
                robotMinHaveScore:500,//取钱范围1
                robotMaxHaveScore:3500,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //富豪房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 100,//游戏底分
                texasMoney1:200,//携带金额1 德州 21点
                texasMoney2:8000,//携带金额2 德州 21点

                startTime:15,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:200,//机器人携带金币1
                robotGold2:8000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:500,//机器人取钱1
                robotMaxTakeScore:1000,//机器人取钱2
                robotMinHaveScore:1000,//取钱范围1
                robotMaxHaveScore:7000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
        ],
        // gameName = 十三水, gameId = 17, gameType = 3
        '17':[
            //体验房
            {
                roomPersons:200,//房间人数
                roomType: 1,//房间类型
                taxRatio:0,//税收比例
                roomField: 50,//游戏底分
                minMoney:0,//最低携带金额

                startTime:15,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000000,//机器人携带金币1
                robotGold2:1000000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:200000,//机器人取钱1
                robotMaxTakeScore:300000,//机器人取钱2
                robotMinHaveScore:1000000,//取钱范围1
                robotMaxHaveScore:1000000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //初级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 1,//游戏底分
                minMoney:20,//最低携带金额

                startTime:15,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:20,//机器人携带金币1
                robotGold2:200,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:20,//机器人取钱1
                robotMaxTakeScore:40,//机器人取钱2
                robotMinHaveScore:40,//取钱范围1
                robotMaxHaveScore:160,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //中级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 5,//游戏底分
                minMoney:60,//最低携带金额

                startTime:15,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:60,//机器人携带金币1
                robotGold2:600,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:60,//机器人取钱1
                robotMaxTakeScore:150,//机器人取钱2
                robotMinHaveScore:150,//取钱范围1
                robotMaxHaveScore:450,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //高级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 20,//游戏底分
                minMoney:250,//最低携带金额

                startTime:15,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:250,//机器人携带金币1
                robotGold2:2500,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:250,//机器人取钱1
                robotMaxTakeScore:500,//机器人取钱2
                robotMinHaveScore:500,//取钱范围1
                robotMaxHaveScore:2000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //富豪房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 50,//游戏底分
                minMoney:600,//最低携带金额

                startTime:15,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:600,//机器人携带金币1
                robotGold2:6000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:600,//机器人取钱1
                robotMaxTakeScore:2000,//机器人取钱2
                robotMinHaveScore:2000,//取钱范围1
                robotMaxHaveScore:4000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
        ],
        // gameName = 哪吒闹海, gameId = 19, gameType = 2
        '19':[
            //体验房
            { 
                roomField: 100,//游戏底分
                roomType: 1,//房间类型
                minMoney:0,//最低金额
                roomPersons:500,//房间人数
                pumpRate:0, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000000,//机器人携带金币1
                robotGold2:1000000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:200000,//机器人取钱1
                robotMaxTakeScore:300000,//机器人取钱2
                robotMinHaveScore:1000000,//取钱范围1
                robotMaxHaveScore:1000000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 3,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //初级房
            {
                roomField: 0.01,//游戏底分
                roomType: 2,//房间类型
                minMoney:10,//最低金额
                roomPersons:500,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:10,//机器人携带金币1
                robotGold2:100,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:10,//机器人取钱1
                robotMaxTakeScore:12,//机器人取钱2
                robotMinHaveScore:20,//取钱范围1
                robotMaxHaveScore:70,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //中级房
            {
                roomField: 0.05,//游戏底分
                roomType: 2,//房间类型
                minMoney:30,//最低金额
                roomPersons:500,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:30,//机器人携带金币1
                robotGold2:500,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:30,//机器人取钱1
                robotMaxTakeScore:35,//机器人取钱2
                robotMinHaveScore:30,//取钱范围1
                robotMaxHaveScore:400,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //高级房
            {
                roomField: 0.1,//游戏底分
                roomType: 2,//房间类型
                minMoney:50,//最低金额
                roomPersons:500,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:50,//机器人携带金币1
                robotGold2:1000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:50,//机器人取钱1
                robotMaxTakeScore:56,//机器人取钱2
                robotMinHaveScore:50,//取钱范围1
                robotMaxHaveScore:900,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //富豪房
            {
                roomField: 1,//游戏底分
                roomType: 2,//房间类型
                minMoney:100,//最低金额
                roomPersons:500,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:500,//机器人携带金币1
                robotGold2:10000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:100,//机器人取钱1
                robotMaxTakeScore:200,//机器人取钱2
                robotMinHaveScore:1000,//取钱范围1
                robotMaxHaveScore:9000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //至尊房
            {
                roomField: 10,//游戏底分
                roomType: 2,//房间类型
                minMoney:500,//最低金额
                roomPersons:500,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:2000,//机器人携带金币1
                robotGold2:20000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:500,//机器人取钱1
                robotMaxTakeScore:2000,//机器人取钱2
                robotMinHaveScore:2001,//取钱范围1
                robotMaxHaveScore:10000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
        ],
        // gameName = 通比牛牛, gameId = 20, gameType = 3
        '20':[
            //体验房
            {
                roomPersons:200,//房间人数
                roomType: 1,//房间类型
                taxRatio:0,//税收比例
                roomField: 100,//游戏底分
                minMoney:0,//最低携带金额

                startTime:15,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000000,//机器人携带金币1
                robotGold2:1000000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:200000,//机器人取钱1
                robotMaxTakeScore:300000,//机器人取钱2
                robotMinHaveScore:1000000,//取钱范围1
                robotMaxHaveScore:1000000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //初级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 4,//游戏底分
                minMoney:24,//最低携带金额

                startTime:15,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:24,//机器人携带金币1
                robotGold2:240,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:24,//机器人取钱1
                robotMaxTakeScore:50,//机器人取钱2
                robotMinHaveScore:50,//取钱范围1
                robotMaxHaveScore:190,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //中级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 10,//游戏底分
                minMoney:60,//最低携带金额

                startTime:15,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:60,//机器人携带金币1
                robotGold2:600,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:60,//机器人取钱1
                robotMaxTakeScore:100,//机器人取钱2
                robotMinHaveScore:100,//取钱范围1
                robotMaxHaveScore:500,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //高级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 30,//游戏底分
                minMoney:180,//最低携带金额

                startTime:15,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:180,//机器人携带金币1
                robotGold2:1800,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:180,//机器人取钱1
                robotMaxTakeScore:300,//机器人取钱2
                robotMinHaveScore:300,//取钱范围1
                robotMaxHaveScore:1500,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //富豪房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 100,//游戏底分
                minMoney:600,//最低携带金额

                startTime:15,//匹配时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:600,//机器人携带金币1
                robotGold2:6000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:600,//机器人取钱1
                robotMaxTakeScore:1000,//机器人取钱2
                robotMinHaveScore:1000,//取钱范围1
                robotMaxHaveScore:5000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
        ],
        // gameName = 押庄龙虎, gameId = 21, gameType = 1
        '21':[
            //体验房
            { 
            },
            //初级房
            {
                roomType: 2,//房间类型
                minMoney:10,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:1,//下注限红1
                bottomRed2:100,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:5000,//上庄条件
                addedCond:6000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:5000,//上庄携带金币1
                goldCoin2:20000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:30,//机器人携带金币1
                robotGold2:200,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:10000,//盘口下注限制
                chips1:1,//筹码1
                chips2:5,//筹码2
                chips3:10,//筹码3
                chips4:20,//筹码4
                chips5:50,//筹码5
                chips6:100,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:40,//取钱范围1
                robotMaxHaveScore:200,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:10,//机器人取钱1
                robotMaxTakeScore:50,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 中级房
            {
                roomType: 2,//房间类型
                minMoney:50,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:10,//下注限红1
                bottomRed2:500,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:10000,//上庄条件
                addedCond:15000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:10000,//上庄携带金币1
                goldCoin2:50000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:50,//机器人携带金币1
                robotGold2:500,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:20000,//盘口下注限制
                chips1:10,//筹码1
                chips2:20,//筹码2
                chips3:50,//筹码3
                chips4:100,//筹码4
                chips5:200,//筹码5
                chips6:500,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:50,//取钱范围1
                robotMaxHaveScore:500,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:50,//机器人取钱1
                robotMaxTakeScore:100,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 高级房
            {
                roomType: 2,//房间类型
                minMoney:100,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:50,//下注限红1
                bottomRed2:2000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:50000,//上庄条件
                addedCond:75000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:50000,//上庄携带金币1
                goldCoin2:200000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:200,//机器人携带金币1
                robotGold2:2000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:50000,//盘口下注限制
                chips1:50,//筹码1
                chips2:100,//筹码2
                chips3:200,//筹码3
                chips4:500,//筹码4
                chips5:1000,//筹码5
                chips6:2000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:300,//取钱范围1
                robotMaxHaveScore:1000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:100,//机器人取钱1
                robotMaxTakeScore:200,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 富豪房
            {
                roomType: 2,//房间类型
                minMoney:200,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:200,//下注限红1
                bottomRed2:10000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:100000,//上庄条件
                addedCond:150000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:100000,//上庄携带金币1
                goldCoin2:500000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000,//机器人携带金币1
                robotGold2:5000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:80000,//盘口下注限制
                chips1:200,//筹码1
                chips2:500,//筹码2
                chips3:1000,//筹码3
                chips4:2000,//筹码4
                chips5:5000,//筹码5
                chips6:10000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:500,//取钱范围1
                robotMaxHaveScore:2000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:200,//机器人取钱1
                robotMaxTakeScore:1000,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            },
            // 至尊房
            {
                roomType: 2,//房间类型
                minMoney:500,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:200,//下注限红1
                bottomRed2:10000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 5,//空闲时间
                betTime: 15,//下注时间

                bankerCond:200000,//上庄条件
                addedCond:300000,//额外条件
                bankerTime:10,//坐庄局数
                addedTime:0,//额外局数
                sysBanker:true,//是否允许玩家上庄

                sysGold:true,//是否允许机器人上庄
                goldCoin1:200000,//上庄携带金币1
                goldCoin2:1000000,//上庄携带金币2
                goldCount1:1,//上庄数量1
                goldCount2:2,//上庄数量2

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000,//机器人携带金币1
                robotGold2:10000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:100,//机器人数量2

                robotDoorScore:100000,//盘口下注限制
                chips1:200,//筹码1
                chips2:500,//筹码2
                chips3:1000,//筹码3
                chips4:2000,//筹码4
                chips5:5000,//筹码5
                chips6:10000,//筹码6
                robotMinChipsCount:1,//下注筹码个数1
                robotMaxChipsCount:3,//下注筹码个数2
                robotMinHaveScore:1000,//取钱范围1
                robotMaxHaveScore:5000,//取钱范围2
                robotTimidRobotPro:60,//胆小机器人占比
                robotNomalRobotPro:45,//普通机器人占比
                robotBoldRobotPro:5,//大胆机器人占比
                robotBettingByBankerScore:70,//机器人下注额度
                robotMinRobotPlayCount:50,//机器人下注个数1
                robotMaxRobotPlayCount:80,//机器人下注个数2
                robotMinTakeScore:500,//机器人取钱1
                robotMaxTakeScore:3000,//机器人取钱2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
                robotTimidBettingPro:10,//胆小机器人下注范围
                robotNomalBettingPro:30,//普通机器人下注范围
                robotBoldBettingPro:70,//大胆机器人下注范围
                robotMinUpBankerCnt:2,//坐庄次数1
                robotMaxUpBankerCnt:10,//坐庄次数2
                robotMinWaitNoBanker:1,//空几局坐庄1
                robotMaxWaitNoBanker:3,//空几局坐庄1
                robotMinUpBankerList:2,//列表人数1
                robotMaxUpBankerList:5,//列表人数2
            }
        ],
        // gameName = 21点, gameId = 22, gameType = 3
        '22':[
            //体验房
            {
                roomPersons:500,//房间人数
                roomType: 1,//房间类型
                taxRatio:0,//税收比例
                roomField: 100,//游戏底分
                texasMoney1:0,//携带金额1 德州 21点
                texasMoney2:1000000,//携带金额2 德州 21点

                startTime:3,//匹配时间
                betTime:15,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000000,//机器人携带金币1
                robotGold2:1000000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:200000,//机器人取钱1
                robotMaxTakeScore:300000,//机器人取钱2
                robotMinHaveScore:1000000,//取钱范围1
                robotMaxHaveScore:1000000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //初级房
            {
                roomPersons:500,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 1,//游戏底分
                texasMoney1:10,//携带金额1 德州 21点
                texasMoney2:400,//携带金额2 德州 21点

                startTime:3,//匹配时间
                betTime:15,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:10,//机器人携带金币1
                robotGold2:400,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:10,//机器人取钱1
                robotMaxTakeScore:25,//机器人取钱2
                robotMinHaveScore:10,//取钱范围1
                robotMaxHaveScore:300,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //中级房
            {
                roomPersons:500,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 10,//游戏底分
                texasMoney1:50,//携带金额1 德州 21点
                texasMoney2:2000,//携带金额2 德州 21点

                startTime:3,//匹配时间
                betTime:15,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:50,//机器人携带金币1
                robotGold2:2000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:50,//机器人取钱1
                robotMaxTakeScore:200,//机器人取钱2
                robotMinHaveScore:50,//取钱范围1
                robotMaxHaveScore:1000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //高级房
            {
                roomPersons:500,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 50,//游戏底分
                texasMoney1:100,//携带金额1 德州 21点
                texasMoney2:4000,//携带金额2 德州 21点

                startTime:3,//匹配时间
                betTime:15,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:100,//机器人携带金币1
                robotGold2:4000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:100,//机器人取钱1
                robotMaxTakeScore:300,//机器人取钱2
                robotMinHaveScore:100,//取钱范围1
                robotMaxHaveScore:2000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //富豪房
            {
                roomPersons:500,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 100,//游戏底分
                texasMoney1:200,//携带金额1 德州 21点
                texasMoney2:8000,//携带金额2 德州 21点

                startTime:3,//匹配时间
                betTime:15,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:200,//机器人携带金币1
                robotGold2:8000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:200,//机器人取钱1
                robotMaxTakeScore:500,//机器人取钱2
                robotMinHaveScore:200,//取钱范围1
                robotMaxHaveScore:5000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
        ],
        // gameName = 抢庄牌九, gameId = 23, gameType = 3
        '23':[
            //体验房
            {
                roomPersons:200,//房间人数
                roomType: 1,//房间类型
                taxRatio:0,//税收比例
                roomField: 100,//游戏底分
                minMoney:0,//最低携带金额

                startTime:15,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000000,//机器人携带金币1
                robotGold2:1000000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:200000,//机器人取钱1
                robotMaxTakeScore:300000,//机器人取钱2
                robotMinHaveScore:1000000,//取钱范围1
                robotMaxHaveScore:1000000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //初级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 4,//游戏底分
                minMoney:16,//最低携带金额

                startTime:15,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:16,//机器人携带金币1
                robotGold2:160,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:16,//机器人取钱1
                robotMaxTakeScore:30,//机器人取钱2
                robotMinHaveScore:30,//取钱范围1
                robotMaxHaveScore:130,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //中级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 10,//游戏底分
                minMoney:40,//最低携带金额

                startTime:15,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:40,//机器人携带金币1
                robotGold2:400,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:40,//机器人取钱1
                robotMaxTakeScore:60,//机器人取钱2
                robotMinHaveScore:60,//取钱范围1
                robotMaxHaveScore:450,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //高级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 30,//游戏底分
                minMoney:120,//最低携带金额

                startTime:15,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:120,//机器人携带金币1
                robotGold2:1200,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:120,//机器人取钱1
                robotMaxTakeScore:300,//机器人取钱2
                robotMinHaveScore:300,//取钱范围1
                robotMaxHaveScore:900,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //富豪房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 100,//游戏底分
                minMoney:400,//最低携带金额

                startTime:15,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:400,//机器人携带金币1
                robotGold2:4000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:400,//机器人取钱1
                robotMaxTakeScore:800,//机器人取钱2
                robotMinHaveScore:800,//取钱范围1
                robotMaxHaveScore:3200,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
        ],
        // gameName = 二八杠, gameId = 24, gameType = 3
        '24':[
            //体验房
            {
                roomPersons:200,//房间人数
                roomType: 1,//房间类型
                taxRatio:0,//税收比例
                roomField: 100,//游戏底分
                minMoney:0,//最低携带金额

                startTime:15,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000000,//机器人携带金币1
                robotGold2:1000000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:200000,//机器人取钱1
                robotMaxTakeScore:300000,//机器人取钱2
                robotMinHaveScore:1000000,//取钱范围1
                robotMaxHaveScore:1000000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //初级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 1,//游戏底分
                minMoney:50,//最低携带金额

                startTime:15,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:50,//机器人携带金币1
                robotGold2:300,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:50,//机器人取钱1
                robotMaxTakeScore:70,//机器人取钱2
                robotMinHaveScore:50,//取钱范围1
                robotMaxHaveScore:250,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //中级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 5,//游戏底分
                minMoney:100,//最低携带金额

                startTime:15,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:100,//机器人携带金币1
                robotGold2:500,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:100,//机器人取钱1
                robotMaxTakeScore:200,//机器人取钱2
                robotMinHaveScore:100,//取钱范围1
                robotMaxHaveScore:1400,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //高级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 20,//游戏底分
                minMoney:300,//最低携带金额

                startTime:15,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:300,//机器人携带金币1
                robotGold2:6000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:300,//机器人取钱1
                robotMaxTakeScore:500,//机器人取钱2
                robotMinHaveScore:1000,//取钱范围1
                robotMaxHaveScore:5000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //富豪房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 200,//游戏底分
                minMoney:600,//最低携带金额

                startTime:15,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:600,//机器人携带金币1
                robotGold2:60000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:600,//机器人取钱1
                robotMaxTakeScore:800,//机器人取钱2
                robotMinHaveScore:600,//取钱范围1
                robotMaxHaveScore:57000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
        ],
        // gameName = 三公, gameId = 25, gameType = 3
        '25':[
            //体验房
            {
                roomPersons:200,//房间人数
                roomType: 1,//房间类型
                taxRatio:0,//税收比例
                roomField: 100,//游戏底分
                minMoney:0,//最低携带金额

                startTime:15,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000000,//机器人携带金币1
                robotGold2:1000000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:200000,//机器人取钱1
                robotMaxTakeScore:300000,//机器人取钱2
                robotMinHaveScore:1000000,//取钱范围1
                robotMaxHaveScore:1000000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //初级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 3,//游戏底分
                minMoney:24,//最低携带金额

                startTime:15,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:24,//机器人携带金币1
                robotGold2:240,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:24,//机器人取钱1
                robotMaxTakeScore:50,//机器人取钱2
                robotMinHaveScore:50,//取钱范围1
                robotMaxHaveScore:190,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //中级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 10,//游戏底分
                minMoney:80,//最低携带金额

                startTime:15,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:80,//机器人携带金币1
                robotGold2:800,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:80,//机器人取钱1
                robotMaxTakeScore:200,//机器人取钱2
                robotMinHaveScore:200,//取钱范围1
                robotMaxHaveScore:600,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //高级房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 30,//游戏底分
                minMoney:240,//最低携带金额

                startTime:15,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:240,//机器人携带金币1
                robotGold2:2400,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:180,//机器人取钱1
                robotMaxTakeScore:300,//机器人取钱2
                robotMinHaveScore:300,//取钱范围1
                robotMaxHaveScore:1500,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            //富豪房
            {
                roomPersons:200,//房间人数
                roomType: 2,//房间类型
                taxRatio:5,//税收比例
                roomField: 100,//游戏底分
                minMoney:800,//最低携带金额

                startTime:15,//匹配时间
                callTime: 10,//叫分/抢庄时间
                betTime:10,//出牌/下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:800,//机器人携带金币1
                robotGold2:8000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:600,//机器人取钱1
                robotMaxTakeScore:1000,//机器人取钱2
                robotMinHaveScore:1000,//取钱范围1
                robotMaxHaveScore:5000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
        ],
        // gameName = 森林舞会, gameId = 26, gameType = 1
        '26':[
            //体验房
            { 
            },
            //初级房
            {
                roomType: 2,//房间类型
                minMoney:10,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:1,//下注限红1
                bottomRed2:100,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 3,//空闲时间
                betTime: 15,//下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:10,//机器人携带金币1
                robotGold2:1000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:80,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:10,//机器人取钱1
                robotMaxTakeScore:100,//机器人取钱2
                robotMinHaveScore:100,//取钱范围1
                robotMaxHaveScore:1000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            // 中级房
            {
                roomType: 2,//房间类型
                minMoney:30,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:10,//下注限红1
                bottomRed2:500,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 3,//空闲时间
                betTime: 15,//下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:30,//机器人携带金币1
                robotGold2:3000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:80,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:30,//机器人取钱1
                robotMaxTakeScore:300,//机器人取钱2
                robotMinHaveScore:300,//取钱范围1
                robotMaxHaveScore:2000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            // 高级房
            {
                roomType: 2,//房间类型
                minMoney:50,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:50,//下注限红1
                bottomRed2:2500,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 3,//空闲时间
                betTime: 15,//下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:50,//机器人携带金币1
                robotGold2:5000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:80,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:50,//机器人取钱1
                robotMaxTakeScore:1000,//机器人取钱2
                robotMinHaveScore:1000,//取钱范围1
                robotMaxHaveScore:4000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            // 富豪房
            {
                roomType: 2,//房间类型
                minMoney:100,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:100,//下注限红1
                bottomRed2:5000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 3,//空闲时间
                betTime: 15,//下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:100,//机器人携带金币1
                robotGold2:10000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:80,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:100,//机器人取钱1
                robotMaxTakeScore:2000,//机器人取钱2
                robotMinHaveScore:2000,//取钱范围1
                robotMaxHaveScore:8000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            },
            // 至尊房
            {
                roomType: 2,//房间类型
                minMoney:200,//最低金额
                roomPersons:200,//房间人数
                bottomRed1:200,//下注限红1
                bottomRed2:10000,//下注限红2
                taxRatio:5,//税收比例

                freeTime: 3,//空闲时间
                betTime: 15,//下注时间

                robotJoining:true,//是否允许机器人加入
                robotGold1:200,//机器人携带金币1
                robotGold2:20000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:80,//机器人数量2

                robotOutTablePro:50,//机器人离场概率
                robotReadyTime:10,//准备时间
                robotMinTakeScore:200,//机器人取钱1
                robotMaxTakeScore:5000,//机器人取钱2
                robotMinHaveScore:5000,//取钱范围1
                robotMaxHaveScore:20000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2
            }
        ],
        // gameName = 水浒传, gameId = 28, gameType = 1
        '28':[
            {},
        ],
        // gameName = 追鱼传说, gameId = 29, gameType = 2
        '29':[
            //体验房
            { 
                roomField: 100,//游戏底分
                roomType: 1,//房间类型
                minMoney:0,//最低金额
                roomPersons:200,//房间人数
                pumpRate:0, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:1000000,//机器人携带金币1
                robotGold2:1000000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:200000,//机器人取钱1
                robotMaxTakeScore:300000,//机器人取钱2
                robotMinHaveScore:1000000,//取钱范围1
                robotMaxHaveScore:1000000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 3,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //初级房
            {
                roomField: 0.001,//游戏底分
                roomType: 2,//房间类型
                minMoney:0.5,//最低金额
                roomPersons:200,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:0.5,//机器人携带金币1
                robotGold2:100,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:0.5,//机器人取钱1
                robotMaxTakeScore:90,//机器人取钱2
                robotMinHaveScore:20,//取钱范围1
                robotMaxHaveScore:70,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //中级房
            {
                roomField: 0.01,//游戏底分
                roomType: 2,//房间类型
                minMoney:10,//最低金额
                roomPersons:200,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:10,//机器人携带金币1
                robotGold2:500,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:10,//机器人取钱1
                robotMaxTakeScore:490,//机器人取钱2
                robotMinHaveScore:100,//取钱范围1
                robotMaxHaveScore:400,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //高级房
            {
                roomField: 0.1,//游戏底分
                roomType: 2,//房间类型
                minMoney:50,//最低金额
                roomPersons:200,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:50,//机器人携带金币1
                robotGold2:1000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:50,//机器人取钱1
                robotMaxTakeScore:990,//机器人取钱2
                robotMinHaveScore:500,//取钱范围1
                robotMaxHaveScore:900,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //富豪房
            {
                roomField: 1,//游戏底分
                roomType: 2,//房间类型
                minMoney:100,//最低金额
                roomPersons:200,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:500,//机器人携带金币1
                robotGold2:10000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:100,//机器人取钱1
                robotMaxTakeScore:9900,//机器人取钱2
                robotMinHaveScore:1000,//取钱范围1
                robotMaxHaveScore:9000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
            //至尊房
            {
                roomField: 10,//游戏底分
                roomType: 2,//房间类型
                minMoney:500,//最低金额
                roomPersons:500,//房间人数
                pumpRate:2, //抽水

                robotJoining:true,//是否允许机器人加入
                robotGold1:2000,//机器人携带金币1
                robotGold2:20000,//机器人携带金币2
                robotCount1:50,//机器人数量1
                robotCount2:500,//机器人数量2
                robotMinTakeScore:500,//机器人取钱1
                robotMaxTakeScore:2000,//机器人取钱2
                robotMinHaveScore:2001,//取钱范围1
                robotMaxHaveScore:10000,//取钱范围2
                robotMinChangeNickName:60,//昵称更换时间1
                robotMaxChangeNickName:180,//昵称更换时间2

                turretInitRank: 1,//炮台初始威力
                chargeValue: 100//调控参数
            },
        ],
        
    },
    msg:[
        "",
        "房间名称配置",//房间名称
        "低于此金额时，玩家处于观战状态，无法下注",//下注-最低携带金额
        "房间税收最低收取0%，最多收取5%",//下注-税收比例
        "房间人数设置范围为1-200，请尽量输入较大数值",//房间人数
        "此为玩家的最低下注和最高下注，最高下注不能低于最低下注。（单局所有盘口下注总金额）",//下注限红
        "在单个盘口下注最大限制",//盘口下注限制
        "本局结束到下局开始的间隔时间，以秒作为时间单位",//空闲时间
        "单局下注的时间，有效配置最大为60秒，以秒作为时间单位",//下注时间
        "满足设定金额可上庄，低于则被踢下庄",//上庄条件
        "坐庄局数满后，达到此金额可继续坐庄",//额外条件
        "上庄后，可坐庄的局数",//坐庄局数
        "额外继续坐庄的局数。额外坐庄过程低于额外条件时踢下庄", //额外局数
        "勾选后允许机器人加入房间,取消勾选后房间中不存在机器人",//是否允许机器人加入
        "允许机器人加入的情况下生效,此设置为机器人携带金币的范围",//机器人携带金币
        "机器人下注的筹码个数",//下注筹码个数
        "根据范围值随机一个金额，给机器人增加金额",//取钱范围
        "不超过盘口下注限制的百分比",//机器人下注额度
        "代表机器人数量比例",//机器人占比
        "代表机器人数量比例",//机器人占比
        "代表机器人数量比例",//机器人占比
        "房间中机器人的数量",//机器人数量
        "根据范围值随机出机器人数量，随机到的机器人才会去下注",//机器人下注个数
        "机器人金额低于该值，需要退出房间，增加金额后再次进入",//机器人取钱
        "机器人每隔多少分钟，跟换机器人昵称与头像",//昵称更换时间
        "金额的下注范围",//机器人下注范围
        "金额的下注范围",//机器人下注范围
        "金额的下注范围",//机器人下注范围
        "勾选允许机器人上庄,取消不允许机器人上庄",//是否允许机器人上庄
        "机器人上庄时会携带此范围的金币上庄",//上庄携带金币
        "机器人坐庄的次数",//坐庄次数
        "机器人空几局之后申请上庄",//空几局坐庄
        "申请上庄的机器人数量",//上庄数量
        "低于此人数则随机派机器人上庄",//列表人数
        "当前房间最低等级子弹每一发子弹的金额",// 捕鱼-游戏底分
        "遵循默认参数配置，禁止修改，如有修改必要请联系产品",//炮台初始威力 及 调控参数
        "每个机器人有多少概率离开房间",//机器人离场概率
        "每轮下注最小注和最大注，最小0.01，最大1000",//扎金花底分
        "低于此金额时，玩家无法进入此房间，已经处于房间的玩家不能继续游戏",// 对战-最低携带金额
        "此金额表示进入房间所携带最小注码和此房间最大可下注注码", //对战-德州 21点  携带金额
        "进入房间后的准备时间",//准备时间
        "匹配的最大时间，以秒作为时间单位",//匹配时间
        "一回合出牌/下注思考的最大时间，以秒作为时间单位",//出牌/下注时间
        "叫分/抢庄的最大时间，以秒作为时间单位",//叫分/抢庄时间
        "下注和摊牌时的最大思考时间",//二人牛牛-出牌/下注时间
        "勾选后，首家必须跟注，并且无法看牌",//扎金花首轮看牌
        "设定玩家拿到三条A时候可以获得系统给的喜钱",//扎金花AAA
        "勾选表示启用喜钱功能",//扎金花开启喜钱
        "设定玩家拿到豹子（除开AAA）时候可以获得系统给的喜钱",//扎金花-豹子
        "低于此金额无法进入房间",//捕鱼-最低携带金额
        "当前房间在结算时按加番还是乘番进行结算",//血战-房间场次
        "自摸加底：自摸后结算时加底分；自摸加番：自摸后加一番",//血战-自摸设置
        "当前房间的最大番数",//血战-番数封顶
        "代表发射炮弹后抽掉的金额",//捕鱼—抽水
        "",
    ],
    
}

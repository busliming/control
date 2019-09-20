<template>
    <div class="page-contents">
        <router-view :MAX_TABLE_HEIGHT="MAX_TABLE_HEIGHT"></router-view>
    </div>
</template>

<script>
    import setTableHeight from '@/tools/tableHeight'

    export default {
        data() {
            return {
                //列表高度
                MAX_TABLE_HEIGHT: 0
            }
        },
        watch: {
            '$route'(route) {
                // console.log(route)
                if (route.name) {
                    setTableHeight(this);
                }
            }
        },
        created() {
            setTableHeight(this);
        }
    }
</script>

<style lang="scss">
    .page-contents {
        height: calc(100vh - 59px);
        min-height: 500px;
        box-sizing: border-box;
        padding: 10px 60px 20px;
        .card {
            min-width: 700px;
            height: calc(100% - 40px);
            /*box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .14);*/
            border: 0;
            margin-bottom: 30px;
            margin-top: 30px;
            border-radius: 6px;
            color: #333;
            background-color: rgba(0, 0, 0, 0.2);
            width: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            word-wrap: break-word;
            background-clip: border-box;
            .card-header {
                display: inline-block;
                border-bottom: none;
                background: 0 0;
                z-index: 3 !important;
                margin: 0 15px;
                padding: 0;
                /*position: relative;*/
                overflow: visible;
                .card-text {
                    line-height: 30px;
                    border-radius: 3px;
                    padding: 10px 25px;
                    margin-top: -20px;
                    float: none;
                    display: inline-block;
                    margin-right: 0;
                    color: #fff;
                    letter-spacing: 2px;
                    &:hover {
                        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .34), 0 7px 10px -5px rgba(0, 188, 212, .4);
                    }
                    h3 {
                        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                        -webkit-mask-image: linear-gradient(-75deg, rgba(0, 0, 0, 0.7) 30%, #d8dfe2 50%, rgba(0, 0, 0, 0.7) 70%);
                        -webkit-mask-size: 200%;
                        animation: shine 3s infinite
                    }
                }
            }

            .card-header.center {
                text-align: center;
                min-width: 200px;
            }
            .card-body {
                position: relative;
                flex: 1 1 auto;
                padding: 1.25rem;
                overflow-x: hidden;
                overflow-y: auto;
                .toolbar {
                    padding: 0 20px;
                    .search-btn,
                    .el-input {
                        width: 180px;
                    }
                    hr {
                        margin-bottom: 10px
                    }
                    label {
                        font-weight: bolder;
                        color: #102858;
                    }
                    .el-form {
                        justify-self: stretch;
                        .el-form-item{
                            margin-bottom: 10px;
                        }
                    }
                }
                .card-data {
                    padding: 0 20px;
                    .el-table {
                        border-radius: 6px;
                        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .24);
                        &:hover {
                            box-shadow: 0 3px 6px 2px rgba(0, 0, 0, .34);
                        }
                    }
                    .el-table thead {
                        padding-top: 10px;
                        color: #102858;
                        font-weight: 800;
                    }
                }
                .pagination {
                    text-align: center;
                    margin: 30px auto 10px;
                    height: 35px;
                    span {
                        font-weight: bolder;
                        color: #102858;
                    }
                }
            }
        }
        .el-input__inner {
            text-align: center;
        }
        .el-dialog {
            background: transparent;
            border: none;
            min-width: 400px;
            .el-dialog__body,
            .el-dialog__header {
                padding: 0;
            }
            .el-dialog__headerbtn {
                z-index: 999;
            }
            .custom-dialog {
                /*height: calc(100% - 40px);*/
                box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .14);
                border: 0;
                margin-bottom: 30px;
                margin-top: 30px;
                border-radius: 6px;
                /*color: #333;*/
                background-color: #ffffff;
                width: 100%;
                position: relative;
                display: flex;
                flex-direction: column;
                word-wrap: break-word;
                background-clip: border-box;
                .dialog-header {
                    min-width: 300px;
                    border-bottom: none;
                    background: 0 0;
                    z-index: 3 !important;
                    margin: 0 15px;
                    padding: 0;
                    text-align: center;
                    overflow: visible;
                    .card-text {
                        line-height: 30px;
                        height: 50px;
                        border-radius: 3px;
                        padding: 10px 25px;
                        margin-top: -20px;
                        float: none;
                        display: inline-block;
                        margin-right: 0;
                        color: #fff;
                        letter-spacing: 2px;
                        background: linear-gradient(45deg, #00bcd4, #009cb2);
                        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(0, 188, 212, .4);
                        &:hover {
                            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .34), 0 7px 10px -5px rgba(0, 188, 212, .4);
                        }
                        h3 {
                            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                            -webkit-mask-image: linear-gradient(-75deg, rgba(0, 0, 0, 0.7) 30%, #d8dfe2 50%, rgba(0, 0, 0, 0.7) 70%);
                            -webkit-mask-size: 200%;
                            vertical-align: center;
                            animation: shine 3s infinite
                        }
                    }
                }
                .dialog-body {
                    max-height: 80vh;
                    flex: 1 1 auto;
                    padding: 20px 40px;
                    overflow-x: hidden;
                    overflow-y: auto;
                    .el-form-item {
                        margin-bottom: 8px;
                        .el-form-item__label {
                            font-weight: bold;
                        }
                        .el-select {
                            width: 100%;
                        }
                    }
                    .checkbox-group-wrapper {
                        border-radius: 5px;
                        border: 1px solid #dcdfe6;
                        padding: 0 10px;
                    }
                    .sites-box {
                        display: flex;
                        flex-flow: row wrap;
                        border: 1px solid #e2e2e2;
                        border-radius: 5px;
                        padding: 20px;
                        min-height: 150px;
                        max-height: 450px;
                        margin-top: 10px;
                        overflow-y: auto;
                    }
                }
                .dialog-footer {
                    text-align: center;
                    flex: 1 1 auto;
                    padding: 0 20px 20px 20px;
                    overflow-x: hidden;
                    overflow-y: auto;
                }
            }
        }
        /*color-based card*/
        .card-primary {
            .card-header {
                .card-text {
                    background: linear-gradient(45deg, #00bcd4, #009cb2);
                    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(0, 188, 212, .4);
                }
            }
        }
        .el-dropdown-link {
            color: #006eb4;
            cursor: pointer;
        }
        .form-group {
            padding: 13px;
            border: 1px solid #ddd;
            border-radius: 5px;
            &:hover, &:focus {
                border-color: #008080;
            }
        }
        .shine {
            text-shadow: 0 1px 2px rgba(0, 0, 0, .1);
            -webkit-mask-image: linear-gradient(-75deg, rgba(0, 0, 0, 0.7) 30%, #000 50%, rgba(0, 0, 0, 0.7) 70%);
            -webkit-mask-size: 200%;
            animation: shine 3s infinite
        }

        @-webkit-keyframes shine {
            from {
                -webkit-mask-position: 150%;
            }

            to {
                -webkit-mask-position: -50%;
            }
        }
        .heading, .el-card .el-card__header, .el-tabs__item {
            font-weight: bolder;
            // color: #102858;
        }
    }
</style>


export default (data) => {
    let fd = new FormData();
    for(let i in data){
        fd.append(i,data[i])
    }
    return fd;
}

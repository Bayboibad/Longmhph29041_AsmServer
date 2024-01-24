const io = require( "socket.io" )();
const socketapi = {
    io:io
};
//==== Viết code tương tác ở trước dòng export
io.on("connection", (client) =>{
    console.log("Client connected : " + client.id);
    // định nghĩa 1 sự kiện
    client.on('new msg', (data)=>{
    // nhận dữ liệu từ client gửi lên
    console.log("New msg: " + data );
    // gửi phản hồi
    client.emit('new msg', data );
    });
    
    
    // sự kiện ngắt kết nối
    client.on('disconnect', ()=>{
    console.log("Client disconected!");
    })
});    
module.exports = socketapi;
interface DataUI {
    title: string;
    subject: string;
    name: string;
    date: string;
    frame: string;
    count: number;
    background: string;
}
export const uiTicket = (qr: string, data: DataUI) => {
    return `<div style="background-image:url('${data.background}');background-repeat: no-repeat;background-size:100% 100%;background-attachment: fixed;background-position: center;width:500px;height:250px;display:-webkit-flex;justify-content:center;flex-direction:column;border-radius:10px;border:solid 1px;border-color:black">
    <div style="width:25%;height:100%;display:-webkit-flex;;align-items:center;">
        <img src="${qr}" alt="qr-code" style="width:120px;height:120px;margin:auto;background-color:transparent">
    </div>
    <div class="content" style="width:75%;height:100%">
      <h1 style="color:white;text-align:center;cursor:pointer">${data.subject}</h1>
      <h2 style="color:white;text-align:center;cursor:pointer">${data.title}</h2>
      <div style="width:100%;display:flex">
        <div style="color:white;width:50%;cursor:pointer">Name: ${data.name}</div>
        <div style="color:white;width:50%;cursor:pointer">Time: ${data.frame}:00</div>
      </div>
      <div style="width:100%;display:flex">
        <div style="color:white;width:50%;cursor:pointer">Date:${data.date}</div>
        <div style="color:white;width:50%;cursor:pointer">Quantity:${data.count}</div>
      </div>
      <h3 style="color:white;cursor:pointer">Payment: Paypal</h3>
    </div>
  </div>`;
};
class ChatApp{
    private messages: any
    private connection
    constructor(url : any) {
        this.messages = [];
        this.connection = new WebSocket(url);

        this.connection.onmessage = event => {
            console.log('event.data', event.data);
            this.messages.push(event.data);
        };
    }

    sendMessage(message: any) {
        type Data1 = {
            name: string;
            message: string;
            time: number;
        };
        const data: Data1 = message
        data.time =  Date.now()
        this.connection.send(message);
    }
}

function timestamp(previous: number) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    const current = Date.now();
    const elapsed = current - previous;
    const seconds = Math.round(elapsed/1000)

    if (elapsed < msPerMinute) return seconds ? seconds + ' seconds ago' : 'now';
    else if (elapsed < msPerHour) return Math.round(elapsed/msPerMinute) + ' minutes ago';
    else if (elapsed < msPerDay ) return Math.round(elapsed/msPerHour ) + ' hours ago';
    else if (elapsed < msPerMonth) return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    else if (elapsed < msPerYear) return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
    else return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
}

export {
    ChatApp,
    timestamp
}
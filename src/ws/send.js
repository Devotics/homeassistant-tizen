export const send = ws => request => ws.send(JSON.stringify(request));

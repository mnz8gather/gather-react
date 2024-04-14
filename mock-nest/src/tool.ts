import * as net from 'net';

export async function findAvailablePort(port: number): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const server = net.createServer();

    server.once('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        // 端口被占用，尝试下一个端口
        server.close(() => {
          findAvailablePort(port + 1)
            .then(resolve)
            .catch(reject);
        });
      } else {
        // 其他错误，拒绝启动应用
        reject(err);
      }
    });

    server.once('listening', () => {
      // 服务器成功监听端口，关闭服务器并返回该端口
      server.close(() => {
        resolve(port);
      });
    });

    server.listen(port);
  });
}

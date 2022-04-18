import {createApp} from './src/lib/createApp';
require('dotenv').config();
import cluster from 'cluster';


const PORT = process.env.PORT || 5000;
const main = async () => {
    try {
        if (cluster.isMaster) {
            var cpuCount = require('os').cpus().length;
            for (let i = 0; i < cpuCount; i += 1) {
                cluster.fork();
            }
            cluster.on('exit', function (worker) {
                console.log(`Worker ${worker.id} died but it will be restarted`);
                cluster.fork();
            });

            return null;
        } else {
            const app = await createApp();
            await app.listen(PORT, async () => {
                console.log(
                    `Server started on port: http://localhost:${PORT}`
                );
        });
      return app;
    }
    } catch (error) {
        console.error(error); 
        process.exit(1);
        return null;
    }
}

export default main();
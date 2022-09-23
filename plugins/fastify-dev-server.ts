import { spawn } from 'child_process';
import path from 'path';

let child = null;
function closeProcess() {
    if (child) {
        child.stdin.pause();
        child.kill();
        child = null;
    }
}

function startAndWatch(options: any, root: string) {
    console.info(root)
    const entry_point = options.entry_point || path.join(root, './server.js');
    child = spawn('node', [entry_point], { env: process.env, detached: false });
    child.stdout.on('data', (data: any) => console.info(data?.toString()));
    child.stderr.on('data', (data: any) => console.error(data?.toString()));
    child.on('close', () => {
        const code = child?.exitCode || child?.signalCode || 0;
        console.error(`Server process exited with code ${code}\n`);
    });

}

export const fastifyDevServer = (options: any = {}) => {
    let config;
    return {
        name: 'fastify-dev-server',
        // use stored config in other hooks
        config(config, { command }) {
            //inject proxy configuration
            if (command === 'serve') {
                if (typeof options?.proxy === 'object') {
                    config.server.proxy = { ...options.proxy };
                }
            }
        },
        configResolved(resolvedConfig) {
            // store the resolved config
            config = resolvedConfig
            if(config.command === 'serve'){
                // dev: plugin invoked by dev server
                startAndWatch(options, config.root);
            }
        },
        handleHotUpdate() {
            closeProcess();
            startAndWatch(options, config.root);
        }
    }
}

export default fastifyDevServer; 
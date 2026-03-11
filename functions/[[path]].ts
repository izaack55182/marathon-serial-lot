import handle from 'hono-react-router-adapter/cloudflare-pages'
// @ts-ignore - build will be present after react-router build
import * as build from '../build/server'
import server, { getLoadContext } from '../server'

export const onRequest = handle(build, server, {
    getLoadContext: (args) => {
        const c = args.context.hono.context
        // ✅ El env de Cloudflare Pages está aquí
        const cloudflareEnv = args.context.cloudflare
        Object.assign(c.env, cloudflareEnv)
        return getLoadContext(c)
    }
})
import handle from 'hono-react-router-adapter/cloudflare-pages'
// @ts-ignore - build will be present after react-router build
import * as build from '../build/server'
import server from '../server'

export const onRequest = handle(build, server)

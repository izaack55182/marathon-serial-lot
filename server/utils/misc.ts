import { getServerEnv } from '@/utils/env.server'

const getMode = () => getServerEnv().NODE_ENV ?? 'development'
const getAllowIndexing = () => getServerEnv().ALLOW_INDEXING !== 'false'
const getIsDev = () => getMode() === 'development'
const getIsProd = () => getMode() === 'production'

export { getIsProd as IS_PROD, getIsDev as IS_DEV, getAllowIndexing as ALLOW_INDEXING }

import { avatars as srcAvatars } from '../config.ts'

const avatars: Record<string, string> = {}
Object.entries(srcAvatars).map(([key, value]) => {
    if (typeof value === 'string') {
        avatars[key] = value;
    } else {
        avatars[key] = `https://q1.qlogo.cn/g?b=qq&nk=${value}&s=640`;
    }
})

export default avatars
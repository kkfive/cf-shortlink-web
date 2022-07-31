/**
 * 生成随机字符串
 * @param length 长度
 * @returns
 */
export function randomString(length: number = 6): string {
  let $chars =
    'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = $chars.length
  let result = ''
  for (let i = 0; i < length; i++) {
    result += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return result
}

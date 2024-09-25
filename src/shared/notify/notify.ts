import { ElNotification } from 'element-plus'
import type { ElNotificationType } from '../types/notification'

export function customNotification({ title, message, type }: ElNotificationType) {
  ElNotification({
    title,
    message,
    type,
  })
}

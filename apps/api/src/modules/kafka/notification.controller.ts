import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, KafkaContext } from '@nestjs/microservices';

@Controller()
export class NotificationController {
  @MessagePattern('notify.user')
  handleUserNotification(@Payload() message: any, context: KafkaContext) {
    const originalMessage = context.getMessage();
    const messageValue = JSON.parse(originalMessage.value.toString());

    const { userId, message: notificationMessage } = messageValue;

    console.log(`Notification for user ${userId}: ${notificationMessage}`);
  }
}

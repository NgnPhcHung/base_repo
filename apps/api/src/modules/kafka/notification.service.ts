import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NotificationService {
  constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('notify.user');
    await this.kafkaClient.connect();
  }

  async sendUserNotification(userId: string, message: string) {
    const result = this.kafkaClient.send('notify.user', {
      userId,
      message,
    });

    return lastValueFrom(result);
  }
}

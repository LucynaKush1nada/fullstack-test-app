import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { KafkaService } from './kafka.service';
import {
  KAFKA_LISTENER_METADATA,
  KafkaListenerOptions,
} from './kafka.decorator';

@Injectable()
export class KafkaDiscoveryService implements OnModuleInit {
  constructor(
    private discoveryService: DiscoveryService,
    private metadataScanner: MetadataScanner,
    private reflector: Reflector,
    private kafkaService: KafkaService,
  ) { }

  async onModuleInit() {
    await this.discoverKafkaListeners();
  }

  private async discoverKafkaListeners() {
    const instanceWrappers = this.discoveryService.getProviders();

    for (const wrapper of instanceWrappers) {
      const { instance } = wrapper;
      if (!instance || typeof instance === 'string') {
        continue;
      }

      const prototype = Object.getPrototypeOf(instance);
      const methodNames = this.metadataScanner.getAllMethodNames(prototype);

      for (const methodName of methodNames) {
        const options: KafkaListenerOptions = this.reflector.get(
          KAFKA_LISTENER_METADATA,
          instance[methodName],
        );

        if (options) {
          const handler = instance[methodName].bind(instance);
          await this.kafkaService.subscribeToTopic(
            options.topic,
            options.groupId,
            handler,
          );

          console.log(
            `Registered Kafka listener: ${instance.constructor.name}.${methodName} for topic "${options.topic}"`,
          );
        }
      }
    }
  }
}

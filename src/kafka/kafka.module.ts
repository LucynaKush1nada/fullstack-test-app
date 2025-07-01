import { Module, Global } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { KafkaDiscoveryService } from './kafka-discovery.service';
import { KafkaService } from './kafka.service';

@Global()
@Module({
    imports: [DiscoveryModule],
    providers: [KafkaService, KafkaDiscoveryService],
    exports: [KafkaService],
})
export class KafkaModule { }

export { KafkaListener } from './kafka.decorator'; 
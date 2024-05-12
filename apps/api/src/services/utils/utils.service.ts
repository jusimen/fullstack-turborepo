import { Injectable } from '@nestjs/common';
import { Utils } from '@repo/utils';

@Injectable()
export class UtilsService extends Utils {
  constructor() {
    super();
  }
}

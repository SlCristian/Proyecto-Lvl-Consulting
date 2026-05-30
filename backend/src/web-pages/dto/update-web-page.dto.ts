import { PartialType } from '@nestjs/mapped-types';
import { CreateWebPageDto } from './create-web-page.dto';

export class UpdateWebPageDto extends PartialType(CreateWebPageDto) {}

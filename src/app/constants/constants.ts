import {environment as dev} from '../../environments/environment';
import {environment as prod} from '../../environments/environment.prod';

export const ENVIRONMENT = prod.production ? prod : dev;

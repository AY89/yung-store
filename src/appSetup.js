import injectTapEventPlugin from 'react-tap-event-plugin';

import appConfig from './appConfig';
import logger from './common/support/logger';

export default function() {
    // Needed for onTouchTap
    // http://stackoverflow.com/a/34015469/988941
    injectTapEventPlugin();

    //logger.config(appConfig.log.enabled, appConfig.log.level);
}
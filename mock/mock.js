import getTransLoop from './json/getTransLoop.json';
import convergeAlarm from './json/convergeAlarm';
import getTransAlarm from './json/getTransAlarmCount';
import login from './json/login';

export default {
  'POST /api/login': login,
  'POST /api/getTransLoop': getTransLoop,
  'POST /api/convergeAlarm' : convergeAlarm,
  'GET /api/getTransAlarm' : getTransAlarm,
}

/*  This file contain some constant value
 *  
 */

const RESULTMAP = {
  '-6': 'Waiting',
  '-5': 'Presentation Error',
  '-4': 'Compile Error',
  '-3': 'Wrong Answer',
  '-2': 'Judging',
  '-1': 'Pending',
  '0':  'Accepted',
  '1':  'Time Limit Exceeded',
  '2':  'Time Limit Exceeded',
  '3':  'Memory Limit Exceeded',
  '4':  'Runtime Error',
  '5':  'System Error'
};

const RESULTBUTTONTYPE = {
  'Waiting'               : 'info',
  'Presentation Error'    : 'warning',
  'Compile Error'         : 'info',
  'Wrong Answer'          : 'danger',
  'Judging'               : 'primary',
  'Pending'               : 'primary',
  'Accepted'              : 'success',
  'Time Limit Exceeded'   : 'danger',
  'Memory Limit Exceeded' : 'danger',
  'Runtime Error'         : 'warning',
  'System Error'          : 'info'
};

const RESULTFILTER = [
  { text: 'Accepted', value: 'Accepted' },
  { text: 'Wrong Answer', value: 'Wrong Answer' },
  { text: 'Time Limit Exceeded', value: 'Time Limit Exceeded' },
  { text: 'Memory Limit Exceeded', value: 'Memory Limit Exceeded' },
  { text: 'Runtime Error', value: 'Runtime Error' },
  { text: 'Compile Error', value: 'Compile Error' },
  { text: 'Presentation Error', value: 'Presentation Error' },
  { text: 'System Error', value: 'System Error' }
];

const RATINGCOLOR = function (rating) {
  if (rating < 1200) return 'gray';
  else if (rating < 1400) return 'green';
  else if (rating < 1600) return '#03A89E';
  else if (rating < 1900) return 'blue';
  else if (rating < 2100) return '#A0A';
  else if (rating < 2400) return '#FF8C00';
  else return 'red';
}

const GLOBLE_BASEURL = process.env.VUE_APP_BASE_URL;

export default {
  GLOBLE_BASEURL,
  RESULTMAP,
  RESULTBUTTONTYPE,
  RESULTFILTER,
  RATINGCOLOR
}
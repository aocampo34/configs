/*
  Slate Config
*/

// Monitors
var laptopMonitor = '1';
var dellMonitor   = '0';
var rightMonitor  = '2';

// Default configurations
slate.configAll({
  'defaultToCurrentScreen'  : true,
  'secondsBetweenRepeat'    : 0.1,
  'checkDefaultsOnLoad'     : true,
  'orderScreensLeftToRight' : true,
  'windowHintsShowIcons'    : true
});


// Screen configurations
var fullScreen = slate.operation('move', {
  'x'      : 'screenOriginX',
  'y'      : 'screenOriginY',
  'width'  : 'screenSizeX',
  'height' : 'screenSizeY'
});

var minScreen = fullScreen.dup({
  'x'      : 'screenOriginX - screenOriginX / 8',
  'y'      : 'screenOriginY - screenOriginY / 16',
  'width'  : 'screenSizeX - screenSizeX / 8',
  'height' : 'screenSizeY - screenSizeY / 8'
});

var leftHalf      = fullScreen.dup({ 'width' : 'screenSizeX / 2' });

var leftTwoThird  = fullScreen.dup({ 'width' : 'screenSizeX - screenSizeX / 3' });
var rightOneThird = leftHalf.dup({ 'width' : 'screenSizeX / 3', 'x' : 'screenOriginX + (2 * screenSizeX / 3)' });


// Bring to Front configurations
var show = slate.operation('show', {
  'screen' : dellMonitor,
  'app' : 'app'
});
var focus = slate.operation('focus', {
  'screen' : dellMonitor,
  'direction' : 'above',
  'app' : 'app'
});

var focusSublime = focus.dup({ 'app' : 'Sublime Text' });
var showSublime = show.dup({ 'app' : 'Sublime Text' });
var focusBrowser = focus.dup({ 'app' : 'Google Chrome' });
var showBrowser = show.dup({ 'app' : 'Google Chrome' });

// Focus configurations
var bringToFrontSublime = slate.operation('chain', {
  'operations': [focusSublime, showSublime]
});
var bringToFrontBrowser = slate.operation('chain', {
  'operations': [focusBrowser, showBrowser]
});


slate.bindAll({
  'esc:cmd': slate.operation('hint'),
  
  'return:ctrl;alt;cmd' : fullScreen,
  'return:ctrl;cmd'     : minScreen,
  'a:ctrl;cmd'          : leftHalf,
  'd:ctrl;cmd'          : rightHalf,
  'z:ctrl;cmd'          : leftTwoThird,
  'c:ctrl;cmd'          : rightOneThird,
  
  'backslash:ctrl;cmd'  : bringToFrontSublime,
  'delete:ctrl;cmd'     : bringToFrontBrowser
});
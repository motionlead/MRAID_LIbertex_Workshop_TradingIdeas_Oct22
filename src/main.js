import Track from "./trackings.js";
import tracking from "./tracking"; // Automatically tracks the seconds
import { logError } from "./helper";
//import { Video } from "./components/video/Video";
import { Carousel } from "./components/Carousel/Carousel";
//import { CountDown } from "./components/CountDown/CountDown";
//import { MultipleSpriteSheet } from "./components/MultipleSpriteSheet/MultipleSpriteSheet";
//import { DragSpriteSheet } from "./components/DragSpriteSheet/DragSpriteSheet";
//import { Particles } from "./components/Particles/Particles";
//import { MotionShaper } from "./components/MotionShaper/MotionShaper";
import { getMobileLanguage } from "./helper";

// Get the width and height of the canvas
let width = stage.canvas.width;
let height = stage.canvas.height;

// console.log("width :", width);
// console.log("height :", height);
// Shorthands
const c = createjs;
const images = ad.assets.images;

// Create scaled container, the scaled container is used to avoid scaling each
// element one by one
const sc = new c.Container();
// - Scale it
sc.scaleX = width / 640;
sc.scaleY = sc.scaleX;
// - Add it to the stage
stage.addChild(sc);
// - Update the width and height to be scaled according to the scaled container
width /= sc.scaleX;
height /= sc.scaleY;

// Create the close button
const cc = sc.clone();
stage.addChild(cc); // Handle close button

if (window.mraid && window.mraid.useCustomClose) {
  // Disable default close button
  window.mraid.useCustomClose(true);

  // Setup close button
  const closeButton = new c.Bitmap(images.cross);
  closeButton.regX = images.cross.width / 2;
  closeButton.regY = images.cross.height / 2;
  closeButton.x = width - images.cross.width;
  closeButton.y = 50;
  cc.addChild(closeButton);

  closeButton.on("click", function () {
    ad.close();
  });
} else {
  // Nothing to do here, non-mraid interstitials already have a close button
}

const track = new Track();
tracking.setupFirstInteractionTracking(sc);

/*~~~~~~~~~~~ START CODE HERE ~~~~~~~~~~~*/
track.track("display");

///////////////////////////////////////////
//////////// GLOBAL VARIABLES /////////////
///////////////////////////////////////////
const logComponentArgs = (currComponent) => {
  const now = new Date().getTime();
  if (now - clickTime > 200) {
    const componentArgs = currComponent.getArgs();
    let params = "{\n";
    Object.keys(componentArgs).forEach((key) => {
      let value = componentArgs[key];
      if (typeof value === "string") {
        value = `"${value}"`;
      } else if (typeof value === "object") {
        value = `[${value}]`;
      }
      params += `   ${key}: ${value},\n`;
    });
    params += "}";
    logError("component params: ");
    console.dir(params);
    clickTime = now;
  }
};
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

const suffix = getMobileLanguage();

let clickTime = 0;
let clickable = []; //[background];

//grid//

const background = new c.Bitmap(images.background);

//** BG IMAGE */

const women = new c.Bitmap(images.women);
women.regX = women.image.width / 2;
women.regY = women.image.height;
women.x = width / 2;
women.y = height * 1.3;

const man = new c.Bitmap(images["man-" + suffix]);
man.regX = man.image.width / 2;
man.regY = man.image.height / 2;
man.x = width / 2;
man.y = height / 2;

const phone = new c.Bitmap(images.phone);
phone.regX = phone.image.width / 2;
phone.regY = phone.image.height;
phone.x = width / 2;
phone.y = height * 1.17;

// //** LOGO */

const logo = new c.Bitmap(images.logo);
logo.regX = logo.image.width / 2;
logo.regY = 0;
logo.x = width / 2;
logo.y = height * 0.08;

// //** CTA+WORDING */

const p1Wording = new c.Bitmap(images["p1Wording-" + suffix]);
p1Wording.x = width * 0.08;
p1Wording.y = logo.y + 90;

const p2Wording = new c.Bitmap(images["p2Wording-" + suffix]);
p2Wording.x = width * 0.05;
p2Wording.y = height * 0.35;

const p3Wording = new c.Bitmap(images["p3Wording-" + suffix]);
p3Wording.regX = p3Wording.image.width / 2;
p3Wording.regY = p3Wording.image.height;
p3Wording.x = width / 2;
p3Wording.y = phone.y - phone.image.height - p3Wording.image.height / 2 - 20;

// const cta = new c.Bitmap(images["cta-" + suffix]);
// cta.regX = cta.image.width / 2;
// cta.regY = cta.image.height / 2;
// cta.x = width / 2;
// cta.y = height * 0.9;

// const ctaSmall = new c.Bitmap(images["ctaSmall-" + suffix]);
// ctaSmall.regX = ctaSmall.image.width / 2;
// ctaSmall.regY = ctaSmall.image.height / 2;
// ctaSmall.x = width * 0.71;
// ctaSmall.y = phone.y - phone.image.height / 2 - 12;

//** GROUP */

// let p_1 = [women, p1Wording];
// let p_2 = [man, p2Wording];
// let p_3 = [
//   phone,
//   // p3Wording, ctaSmall
// ];

///////////////////////////////////////////////
///////////////////  carousel /////////////////
///////////////////////////////////////////////

// const onCenteredFadeObjects = (objects) => {
//   console.log("onCenteredFadeObjects objects: ", objects);
// };
// const onCenteredObject = (object) => {
//   console.log("onCenteredObject object: ", object);
// };

const fadeItems = [];

const bgImage_fadeItems = [
  new c.Bitmap(images["women"]),
  new c.Bitmap(images["man"]),
  new c.Bitmap(images["phone"]),
];

const wording_fadeItems = [
  new c.Bitmap(images["p1Wording"]),
  new c.Bitmap(images["p2Wording"]),
  new c.Bitmap(images["p3Wording"]),
];

const ctaSmall_fadeItems = [new c.Bitmap(images["ctaSmall"])];

// const wordingObjCont = new c.Container();
// wordingObjCont.name = "bg";
// wordingObjCont.alpha = 1;

// for (var i = 0; i < wording_fadeItems.length; i++) {
//   const wording = wording_fadeItems[i];
//   wording.regX = wording.image.width / 2;
//   wording.regY = wording.image.height;
//   wording.y = height * 1.05;
//   wording.x = width * 0.5;

//   wordingObjCont.addChild(wording);
//   fadeItems.push([wording]);
// }

const carouselParameters = {
  images: ["women, p1wording", "man, p2wording", "phone,p3wrding"],
  // urls: [

  // ],
  // videoWidth: 640,
  // videoHeight: 360,
  splashScreens: ["", "", ""],
  // debug: true,
  isCyclic: true,
  // startIndex: 1,
  masked: false,
  scaleUnfocus: 1,
  alignFocusV: 50, // vertically align the focused element. From 0 (top) to 100 (bottom)
  alignUnfocus: 50, // vertically align the unfocused elements. From 0 (top) to 100 (bottom)
  alignFocusH: 50, // horizontally align the focused element. From 0 (left) to 100 (right)
  opacityUnfocus: 0.3, // from 0 to 1
  speedDeceleration: 0.92,
  width: width,
  height: height * 0.45,
  // showSoundButtons: false,
  // gap: 20,
  name: "carousel_1", // useful for tracking when several carousels at once
  speedThreshold: 0.02,
  fadeObjects: fadeItems,
  // onCenteredFadeObjects,
  // onCenteredObject,
  autoPlay: 1.5, // period in seconds
  // languageSuffix: 'en', // getMobileLanguage(),
  // isVertical: true,
  tooltip: "hand",
  layout: "2d", // '2d', '3d', 'android'
};

const myCarousel = new Carousel(carouselParameters);
myCarousel.x = width * 0.5;
myCarousel.y = height * 0.65;
myCarousel.regX = myCarousel.width / 2;
myCarousel.regY = myCarousel.height / 2;

//carousel controls

// setTimeout(function () {
//   // myCarousel.moveFocus(-1);
//   myCarousel.moveFocus(+1);
// }, 2000);

////////////////////////////////////////////////
///////////////// ADD TO STAGE  ////////////////
////////////////////////////////////////////////

sc.addChild(
  background,
  // myCarousel,
  women,
  // man,
  // phone,
  p1Wording,
  // p2Wording,
  p3Wording,
  // ctaSmall,
  cta,
  logo
);

// CTA BOUNCE
function ctaSmallBounce() {
  const scale1 = 1;
  const scale2 = scale1 + 0.1;
  const scale3 = scale1 - 0.1;
  const scale4 = scale1 + 0.05;
  const scale5 = scale1 - 0.05;

  c.Tween.get(cta, { loop: true })
    .wait(1000)
    .to({ scaleX: scale1, scaleY: scale1 }, 500, c.Ease.quadOut)
    .to({ scaleX: scale2, scaleY: scale2 }, 250, c.Ease.quadOut)
    .to({ scaleX: scale3, scaleY: scale3 }, 150, c.Ease.quadOut)
    .to({ scaleX: scale4, scaleY: scale4 }, 150, c.Ease.quadOut)
    .to({ scaleX: scale5, scaleY: scale5 }, 100, c.Ease.quadOut)
    .to({ scaleX: scale1, scaleY: scale1 }, 75, c.Ease.quadOut)
    .wait(1000);
}

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

clickable.forEach((element) => {
  element.on("click", () => {
    const now = new Date().getTime();
    if (now - clickTime > 200) {
      track.track("adOpen_click_on_" + element.name);
      ad.open();
      clickTime = now;
    }
  });
});

// time tracks
[5, 10, 15].map((time) =>
  setTimeout(() => track.track("time" + time), time * 1000)
);

/*~~~~~~~~~~~ End Matter engine ~~~~~~~~~~~*/
// Restarts the ad on resize event
ad.on("resize", function () {
  ad.restart();
});

// Remove all event listeners added on DOM objects in here (e.g. accelerometer,
// etc)
ad.on("cleanup", function () {
  // No need to remove events listeners on EaselJS objects
});

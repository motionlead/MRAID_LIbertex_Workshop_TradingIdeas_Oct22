// Automatically tracks the seconds
let tracking = require("./tracking");
let Track = require("./trackings.js");
let helper = require("./helper");
// const Particles = require("./particles");
const Carousel = require("./carousel");
// const MultipleSpritesheet = require("./multipleSpritesheet");

let track = new Track();

// Get the width and height of the canvas
let width = stage.canvas.width;
let height = stage.canvas.height;

// Sbottomthands
let c = createjs;
let images = ad.assets.images;

// Create scaled container, the scaled container is used to avoid scaling each
// elements one by one
let sc = new c.Container();
// - Scale it
sc.scaleX = width / 640;
sc.scaleY = sc.scaleX;
// - Add it to the stage
stage.addChild(sc);
// - Update the width and height to be scaled according to the scaled container
width /= sc.scaleX;
height /= sc.scaleY;

// Create the close button
let cc = sc.clone();
stage.addChild(cc);

// Handle close button
if (window.mraid && window.mraid.useCustomClose) {
  // Disable default close button
  window.mraid.useCustomClose(true);

  // Setup close button
  let closeButton = new c.Bitmap(images.cross);
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

// Add tracking for the first interaction on the scaled container
tracking.setupFirstInteractionTracking(sc);
track.track("display");

// let timeoutIds = [5, 10, 15].map(function (time) {
//   return setTimeout(function () {
//     track.track("time" + time);
//   }, time * 1000);
// });

/*~~~~~~~~~~~ START CODE HERE ~~~~~~~~~~~*/
const suffix = helper.getMobileLanguage();
// const cta = new c.Bitmap(images["cta-" + suffix]);

let bg = new c.Bitmap(images.bg);
bg.regX = bg.image.width / 2;
bg.regY = bg.image.height / 2;
bg.x = width / 2;
bg.y = height / 2;
bg.name = "bg";

let logo = new c.Bitmap(images.logo);
logo.regX = logo.image.width / 2;
logo.regY = logo.image.height;
logo.scaleX = logo.scaleY = 1;
logo.x = width * 0.5;
logo.y = height * .1;
logo.name = "logo";

const cta = new c.Bitmap(images["cta-" + suffix]);
cta.regX = cta.image.width / 2;
cta.regY = cta.image.height * 0.25;
cta.x = width / 2;
cta.y = height * 0.9;
cta.scaleX = cta.scaleY = 2;
cta.alpha = 0;
cta.name = "cta";

const ctaSmall = new c.Bitmap(images["ctaSmall-" + suffix]);
ctaSmall.regX = ctaSmall.image.width / 2;
ctaSmall.regY = ctaSmall.image.height * 0.25;
ctaSmall.x = width * .7 + 20;
ctaSmall.y = height * 0.6 + 10;
ctaSmall.scaleX = ctaSmall.scaleY = 1;
ctaSmall.alpha = 0;
ctaSmall.name = "cta";

c.Tween.get(ctaSmall)
.call(ctaSmallBounce)


// Carousel faded objects
const fadeItems = [];
const wordings = [
  new c.Bitmap(images["p1Wording-" + suffix]),
  new c.Bitmap(images["p2Wording-" + suffix]),
  new c.Bitmap(images["p3Wording-" + suffix]),
];

const wordingObjCont = new c.Container();
wordingObjCont.name = "wording";
wordingObjCont.alpha = 1;
wordingObjCont.y = height * 0.1;

for (let i = 0; i < wordings.length; i++) {
  const wording = wordings[i];
  wording.regX = wording.image.width / 2;
  wording.regY = wording.image.height / 2;
  wording.x = width * 0.5;
  wording.y = height * 0.15;

  fadeItems.push([wording]);
  wordingObjCont.addChild(wording);
}
//////////// setting the positions of the fadeobjects //////////////////
wordings[0].x = width * .5
wordings[0].y = height * .2

wordings[1].x = width * .33 - 20
wordings[1].y = height * .3

wordings[2].y = height * .1

function showItem(){
  if (wordings[2].alpha >= .8) {
    ctaSmall.alpha = 1;
  } else {
    ctaSmall.alpha = 0;
  }
}

// Carousel props
const carouselParameters = {
  images: ["women", ["man-" + suffix], "phone"],
  // urls: [
  //   "https://www.google.com/?q=1",
  // ],
  // videoWidth: 640,
  // videoHeight: 360,
  // splashScreens: ["", "asset_1", "", "asset_2", "", "asset_1"],
  // debug: true,
  isCyclic: true,
  startIndex: 0,
  masked: false,
  scaleFocus: 1,
  scaleUnfocus: 1,
  alignFocusV: 100, // vertically align the focused element. From 0 (top) to 100 (bottom)
  alignUnfocus: 50, // vertically align the unfocused elements. From 0 (top) to 100 (bottom)
  alignFocusH: 50, // horizontally align the focused element. From 0 (left) to 100 (right)
  opacityUnfocus: 0.5, // from 0 to 1
  speedDeceleration: 0.92,
  width: width * 0.8,
  height: images.product_1.height,
  showSoundButtons: false,
  // gap: width * 0.25,
  name: "carousel", // useful for tracking when several carousels at once
  speedThreshold: 0.02,
  fadeObjects: fadeItems,
  onCenteredFadeObjects: showItem,
  // onCenteredObject,
  autoPlay: 4, // period in seconds
  // languageSuffix: 'en', // getMobileLanguage(),
  isVertical: false,
  // tooltip: "hand",
  layout: "2d",
};

const carousel = new Carousel(carouselParameters);
carousel.regX = carousel.width / 2;
carousel.regY = carousel.height / 2;
carousel.x = width * 0.5;
carousel.y = height * 0.85;
carousel.alpha = 1;
carousel.scaleX = carousel.scaleY = 1;
// carousel.mouseEnabled = false;


sc.addChild(bg, carousel, wordingObjCont, ctaSmall, logo, cta);
let clickable = [bg, wordingObjCont, logo, cta];

// ANIMATIONS
c.Ticker.addEventListener("tick", handleTick);
function handleTick() {}

c.Tween.get(cta)
  .wait(1250)
  .to({ scaleX: 0.9, scaleY: 0.9, alpha: 1 }, 250, c.Ease.quadIn)
  .to({ scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 250, c.Ease.quadIn)
  .to({ scaleX: 1, scaleY: 1 }, 200, c.Ease.quadOut)
  .call(ctaBounce);

// c.Tween.get(part).wait(1500).to({ alpha: 1 }, 1000, c.Ease.quadIn);

// FUNCTIONS

function ctaBounce() {
  const scale1 = 1;
  const scale2 = scale1 + 0.2;
  const scale3 = scale1 - 0.2;
  const scale4 = scale1 + 0.1;
  const scale5 = scale1 - 0.1;

  c.Tween.get(cta, { loop: true })
    .wait(1000)
    .to({ scaleX: scale1, scaleY: scale1 }, 500, c.Ease.quadOut)
    .to({ scaleX: scale2, scaleY: scale2 }, 250, c.Ease.quadOut)
    .to({ scaleX: scale3, scaleY: scale3 }, 150, c.Ease.quadOut)
    .to({ scaleX: scale4, scaleY: scale4 }, 150, c.Ease.quadOut)
    .to({ scaleX: scale5, scaleY: scale5 }, 100, c.Ease.quadOut)
    .to({ scaleX: scale1, scaleY: scale1 }, 75, c.Ease.quadOut);
}

function ctaSmallBounce() {
  const scale1 = 1;
  const scale2 = scale1 + 0.2;
  const scale3 = scale1 - 0.2;
  const scale4 = scale1 + 0.1;
  const scale5 = scale1 - 0.1;

  c.Tween.get(ctaSmall, { loop: true })
    .wait(1000)
    .to({ scaleX: scale1, scaleY: scale1 }, 500, c.Ease.quadOut)
    .to({ scaleX: scale2, scaleY: scale2 }, 250, c.Ease.quadOut)
    .to({ scaleX: scale3, scaleY: scale3 }, 150, c.Ease.quadOut)
    .to({ scaleX: scale4, scaleY: scale4 }, 150, c.Ease.quadOut)
    .to({ scaleX: scale5, scaleY: scale5 }, 100, c.Ease.quadOut)
    .to({ scaleX: scale1, scaleY: scale1 }, 75, c.Ease.quadOut);
}

/*~~~~~~~~~~~~ END CODE HERE ~~~~~~~~~~~~*/

let clickTime = 0;
clickable.forEach(function (element) {
  element.on("click", function () {
    let now = new Date().getTime();
    if (now - clickTime > 200) {
      track.track("adOpen_click_on_" + element.name);
      ad.open();
    }
    clickTime = now;
  });
});

// Restarts the ad on resize event
ad.on("resize", function () {
  ad.restart();
});

// Remove all event listeners added on DOM objects in here (e.g. accelerometer,
// etc)
ad.on("cleanup", function () {
  // No need to remove events listeners on EaselJS objects
});

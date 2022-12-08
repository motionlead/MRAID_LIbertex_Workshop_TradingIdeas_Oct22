/*
author: Oghel JOYE
for: Adikteev
october 2020

This is a component that is used with a video or a carousel of videos.

A new soundButtons component can be invoked by using: new soundButtons(args).
args is an object, with the following properties:

  action: [Function] what to do when toggling the buttons,
*/

class SoundButtons extends createjs.Container {
  constructor(args = {}) {
    // invoke Container constructor
    super();

    if (!ad.assets.images.soundOn || !ad.assets.images.soundOff) {
      console.log('ERROR: sound buttons assets are missing');
      return;
    }

    const { action = () => {} } = args;

    this.lastClick = 0; // used to make sure a single interaction is not counted twice
    this.isMuted = true;

    const soundButtonOn = new createjs.Bitmap(ad.assets.images.soundOn);
    const soundButtonOff = new createjs.Bitmap(ad.assets.images.soundOff);
    [soundButtonOn, soundButtonOff].forEach((soundButton, i) => {
      this.width = soundButton.image.width;
      this.height = soundButton.image.height;
      this.regX = this.width;
      this.regY = this.height;
      soundButton.visible = i === 1;
      this.addChild(soundButton);
    });

    const soundShape = new createjs.Shape();
    soundShape.alpha = 0.01;
    this.addChild(soundShape);

    soundShape.graphics
      .beginFill('white')
      .drawRect(0, 0, this.width, this.height);

    soundShape.on('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      const now = new Date().getTime();
      if (now - this.lastClick > 150) {
        this.isMuted = !this.isMuted;
        soundButtonOn.visible = !this.isMuted;
        soundButtonOff.visible = this.isMuted;
        this.lastClick = now;
        e.preventDefault();
        e.stopImmediatePropagation();
        action(this.isMuted);
      }
    });

    // pevents an unwanted asset redirection when used in Carousel
    this.on('pressup', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    });
  }
}

module.exports = createjs.promote(SoundButtons, 'Container');

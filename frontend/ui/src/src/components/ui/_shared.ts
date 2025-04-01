/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                        💪 CORE 💪                           */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export const STYLES = {
  CONTENT_OVERFLOW_POPOVER:
    "z-50 overflow-hidden rounded-md border bg-popover text-popover-foreground",
  ACCENT: "focus:bg-accent focus:text-accent-foreground",
  ACCENT_FOCUS: "focus:bg-accent focus:text-accent-foreground",
  ACCENT_STATE_OPEN: "focus:bg-accent data-[state=open]:bg-accent",
  // BORDER_INPUT: "border border-input",
  BORDER_INPUT: "border",
  CURSOR_DEFAULT: "cursor-default",
  DISABLED_NOT_ALLOWED: "disabled:cursor-not-allowed disabled:opacity-50",
  DISABLED_EVENTS_NONE: "disabled:pointer-events-none disabled:opacity-50",
  DISABLED_EVENTS_NONE_DATA:
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  OFFSET_BG: "ring-offset-background",
  RING_FOCUS: "focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1",
  RING_FOCUS_VISIBLE:
    "focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
  FLEX_CENTER: "flex items-center",
  FLEX_CENTER_JUSTIFIED: "flex items-center justify-center",
  FULL_CENTER_INLINE: "inline-flex items-center justify-center",
  FLEX_BETWEEN: "flex items-center justify-between",
  FLEX_COL: "flex flex-col",
  FLEX_WRAP: "flex flex-wrap items-center",
  GRID_START: "grid w-full grid-cols-1 items-start",
  GROUP_RELATIVE: "group relative",
  SIZE_FULL: "h-full w-full",
  TEXT_MUTED_PLACEHOLDER: "placeholder:text-muted-foreground",
  MARQUEE: "pointer-events-none absolute from-white dark:from-background",
  // DATA STATES
  DATA_STATE_CHECKED:
    "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
  DATA_STATE_TABS:
    "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
  // DEMOS
  DEMO_CARD:
    "relative flex min-h-[300px]  h-full w-full items-center justify-center rounded-lg border bg-background p-20 md:shadow-xl  overflow-hidden",
  DEMO_TITLE:
    "z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white",
} as const;

//

//
/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                       💫 MOTION 💫                          */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export const MOTION = {
  ANIMATE_IN: "data-[state=open]:animate-in",
  ANIMATE_OUT: "data-[state=closed]:animate-out",
  FADE_IN_OUT: "data-[state=closed]:fadeOut-0 data-[state=open]:fadeIn-0",
  ZOOM_IN_OUT: "data-[state=closed]:zoomOut-95 data-[state=open]:zoomIn-95",
  SLIDE_IN:
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  DIALOG_SLIDE_IN_OUT:
    "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]  data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
  TODO_STATE_TOOLTIP:
    "animate-in fadeIn-0 zoomIn-95 data-[state=closed]:fadeOut-0 data-[state=closed]:zoomOut-95",
  // TAILWIND CONFIG
  ANIMATE_ACCORDION:
    "data-[state=closed]:animate-accordionUp data-[state=open]:animate-accordionDown",
  ANIMATE_BG_RETRO: "animate-grid",
  ANIMATE_BG_RETRO_LIGHT:
    "[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]",
  ANIMATE_BG_RETRO_DARK:
    "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]",
  ANIMATE_BG_RIPPLE: "animate-ripple",
  ANIMATE_BEAM_BORDER:
    "absolute inset-[0] rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]  ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]   after:animate-beamBorder after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
  ANIMATE_LOGO_SECTION: "animate-logoSection  flex shrink-0 flex-row justify-around",
  ANIMATE_METEOR_EFFECT: "animate-meteor-effect",
  ANIMATE_RADAR_SPIN: "animate-radarSpin",
  ANIMATE_FADE_UP: "animate-fadeUp opacity-0",
  ANIMATE_SCROLL_FADE_OUT:
    "animate-fadeOutDown   [animation-range:0px_300px] [animation-timeline:scroll()] supports-no-scroll-driven-animations:animate-none",
  ANIMATE_SCROLL_BIGGER:
    "animate-makeItBigger   [animation-range:0%_60%] [animation-timeline:--quote] [view-timeline-name:--quote] supports-no-scroll-driven-animations:animate-none",
  ANIMATE_TEXT_SHIMMER:
    "animate-shimmer bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
  ANIMATE_TEXT_GRADIENT:
    "inline animate-gradient bg-gradient-to-r bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
  ANIMATE_TEXT_GRADIENT_BTN:
    "animate-gradient absolute inset-0 block h-full w-full   bg-gradient-to-r bg-[length:var(--bg-size)_100%] p-[1px] [border-radius:inherit] ![mask-composite:subtract] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
  //  ------------- 👇 [ANIMATIONS] 👇 ------------- //
  ANIMATE_BLINK: "animate-blink",
  ANIMATE_BLURRED_FADE_IN: "animate-blurredFadeIn",
  ANIMATE_BOUNCE_VERTICAL: "animate-bounceVertical",
  ANIMATE_BOUNCE_HORIZONTAL: "animate-bounceHorizontal",
  ANIMATE_CONTRACT_HORIZONTALLY: "animate-contractHorizontally",
  ANIMATE_CONTRACT_VERTICALLY: "animate-contractVertically",
  ANIMATE_EXPAND_HORIZONTALLY: "animate-expandHorizontally",
  ANIMATE_EXPAND_VERTICALLY: "animate-expandVertically",
  ANIMATE_FADE_OUT_UP: "animate-fadeOutUp",
  ANIMATE_FADE_OUT_DOWN_V2: "animate-fadeOutDownV2", // TODO: V2
  ANIMATE_FADE_OUT_LEFT: "animate-fadeOutLeft",
  ANIMATE_FADE_OUT_RIGHT: "animate-fadeOutRight",
  ANIMATE_FLASH_V0: "animate-flashV0", // TODO
  ANIMATE_FLASH: "animate-flash",
  ANIMATE_FLIP_HORIZONTAL: "animate-flipHorizontal",
  ANIMATE_FLIP_VERTICAL: "animate-flipVertical",
  ANIMATE_FLIP_X: "animate-flipX",
  ANIMATE_FLIP_Y: "animate-flipY",
  ANIMATE_FLIP_IN_Y: "animate-flipInY",
  ANIMATE_FLIP_IN_X: "animate-flipInX",
  ANIMATE_FLIP_OUT_Y: "animate-flipOutY",
  ANIMATE_FLIP_OUT_X: "animate-flipOutX",
  ANIMATE_FLOAT: "animate-float",
  ANIMATE_FLOATING_IN_SPACE: "animate-floatingInSpace",
  ANIMATE_HANG: "animate-hang",
  ANIMATE_HORIZONTAL_VIBRATION: "animate-horizontalVibration",
  ANIMATE_JIGGLE_V0: "animate-jiggleV0", // TODO
  ANIMATE_JIGGLE: "animate-jiggle",
  ANIMATE_JUMP: "animate-jump",
  ANIMATE_LED_BOARD: "animate-ledBoard ease-in-out",
  ANIMATE_POP: "animate-pop",
  ANIMATE_RUBBER_BAND_V0: "animate-rubberBand-v0", // TODO
  ANIMATE_RUBBER_BAND: "animate-rubberBand",
  ANIMATE_RISE: "animate-rise",
  ANIMATE_ROTATE_90: "animate-rotate90",
  ANIMATE_ROTATE_180: "animate-rotate180",
  ANIMATE_ROTATE_360: "animate-rotate360",
  ANIMATE_ROTATE_IN: "animate-rotateIn",
  ANIMATE_ROLL_IN: "animate-rollIn",
  ANIMATE_ROLL_OUT: "animate-rollOut",
  ANIMATE_ROTATIONAL_WAVE: "animate-rotationalWave",
  ANIMATE_ROTATE_OUT: "animate-rotateOut",
  ANIMATE_SCALE: "animate-scale",
  ANIMATE_SINK: "animate-sink",
  ANIMATE_SKEW: "animate-skew",
  ANIMATE_SWAY: "animate-sway",
  ANIMATE_SHAKE_V0: "animate-shakeV0", // TODO
  ANIMATE_SHAKE: "animate-shake",
  ANIMATE_SLIDE_IN_TOP: "animate-slideInTop",
  ANIMATE_SLIDE_IN_BOTTOM: "animate-slideInBottom",
  ANIMATE_SLIDE_IN_LEFT: "animate-slideInLeft",
  ANIMATE_SLIDE_IN_RIGHT: "animate-slideInRight",
  ANIMATE_SLIDE_OUT_TOP: "animate-slideOutTop",
  ANIMATE_SLIDE_OUT_BOTTOM: "animate-slideOutBottom",
  ANIMATE_SLIDE_OUT_LEFT: "animate-slideOurLeft",
  ANIMATE_SLIDE_OUT_RIGHT: "animate-slideOutLeft",
  ANIMATE_SLIDE_ROTATE_IN: "animate-slideRotateIn",
  ANIMATE_SLIDE_ROTATE_OUT: "animate-slideRotateOut",
  ANIMATE_SLIDE_UP: "animate-slideUp",
  ANIMATE_SLIDE_DOWN: "animate-slideDown",
  ANIMATE_SLIDE_LEFT: "animate-slideLeft",
  ANIMATE_SLIDE_RIGHT: "animate-slideRight",
  ANIMATE_SLIDE_DOWN_AND_FADE: "animate-slideDownAndFade",
  ANIMATE_SLIDE_LEFT_AND_FADE: "animate-slideLeftAndFade",
  ANIMATE_SLIDE_UP_AND_FADE: "animate-slideUpAndFade",
  ANIMATE_SLIDE_RIGHT_AND_FADE: "animate-slideRightAndFade",
  ANIMATE_SPIN_CLOCKWISE: "animate-spinClockwise",
  ANIMATE_SPIN_COUNTER_CLOCKWISE: "animate-spinCounterClockwise",
  ANIMATE_SWING_V0: "animate-swingV0", // TODO
  ANIMATE_SWING: "animate-swing",
  ANIMATE_TADA: "animate-tada",
  ANIMATE_VIBRATE: "animate-vibrate",
  ANIMATE_WOBBLE: "animate-wobble",
  ANIMATE_ZOOM_IN: "animate-zoomIn",
  ANIMATE_ZOOM_OUT: "animate-zoomOut",
  ANIMATE_TILT_HORIZONTAL: "animate-tiltHorizontal",
  ANIMATE_SQUEEZE: "animate-squeeze",
  ANIMATE_SLIDE_UP_FADE: "animate-slideUpFade",
  ANIMATE_BOUNCE_FADE_IN: "animate-bounceFadeIn",
  ANIMATE_PULSE_FADE_IN: "animate-pulseFadeIn",
  ANIMATE_SWING_DROP_IN: "animate-swingDropIn",
  ANIMATE_BOUNCE_CUSTOM: "animate-bounceCustom",
  ANIMATE_PULSE_CUSTOM: "animate-pulseCustom",
  ANIMATE_BOUNCE: "animate-bounce", // by default with Tailwind
  ANIMATE_PULSE: "animate-pulse", // by default with Tailwind
  ANIMATE_SPIN: "animate-spin", // by default with Tailwind
  ANIMATE_PING: "animate-ping", // by default with Tailwind
  //  ------------- 👆 [ANIMATIONS] 👆 ------------- //
} as const;

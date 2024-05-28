export const opacityAnimation = {
  viewport: { once: true },
  variants: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  initial: "hidden",
  whileInView: "show",
  transition: { duration: 0.5, delay: 0.25 },
};

export const opacityUpwardsAnimation = {
  viewport: { once: true },
  variants: {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0 },
  },
  initial: "hidden",
  whileInView: "show",
  transition: { duration: 0.5, delay: 0.25 },
};

export const opacityRightAnimation = {
  viewport: { once: true },
  variants: {
    hidden: { opacity: 0, x: -25 },
    show: { opacity: 1, x: 0 },
  },
  initial: "hidden",
  whileInView: "show",
  transition: { duration: 0.5, delay: 0.25 },
};

export const opacityLeftAnimation = {
  viewport: { once: true },
  variants: {
    hidden: { opacity: 0, x: 25 },
    show: { opacity: 1, x: 0 },
  },
  initial: "hidden",
  whileInView: "show",
  transition: { duration: 0.5, delay: 0.25 },
};

export const staggerVariant = {
  variants: {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  },
  initial : "hidden",
  animate : "visible",
};

export const slowStaggerVariant = {
    variants: {
      hidden: { opacity: 0 },
      visible: (i) => ({
        opacity: 1,
        transition: {
          delay: i * 0.25,
        },
      }),
    },
    initial : "hidden",
    animate : "visible",
  };
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable indent */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
export function slideUp(element: any, duration = 500) {
  return new Promise((resolve) => {
    element.style.height = `${element.offsetHeight}px`;
    element.style.transitionProperty = 'height, margin, padding';
    element.style.transitionDuration = `${duration}ms`;
    element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;
    window.setTimeout(() => {
      element.style.display = 'none';
      element.style.removeProperty('height');
      element.style.removeProperty('padding-top');
      element.style.removeProperty('padding-bottom');
      element.style.removeProperty('margin-top');
      element.style.removeProperty('margin-bottom');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
      resolve(false);
    }, duration);
  });
}

export function slideDown(element: any, duration = 500) {
  return new Promise(() => {
    element.style.removeProperty('display');
    let { display } = window.getComputedStyle(element);

    if (display === 'none') display = 'block';

    element.style.display = display;
    const height = element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;
    element.offsetHeight;
    element.style.transitionProperty = 'height, margin, padding';
    element.style.transitionDuration = `${duration}ms`;
    element.style.height = `${height}px`;
    element.style.removeProperty('padding-top');
    element.style.removeProperty('padding-bottom');
    element.style.removeProperty('margin-top');
    element.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      element.style.removeProperty('height');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, duration);
  });
}

export function slideToggle(element: any, duration = 500) {
  if (window.getComputedStyle(element).display === 'none') {
    return slideDown(element, duration);
  }
  return slideUp(element, duration);
}

export const flatDeep = (arr: any, d = 1) =>
  d > 0
    ? arr.reduce(
        (acc: any, val: any) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
        []
      )
    : arr.slice();

export function slugify(text: any) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export function normalizedData(data: any, key = 'section') {
  let allContent: any;

  data.forEach((item: any) => {
    const newObj: any = Object.entries(item).reduce((acc, cur) => {
      const [k, property] = cur;
      if (property === null) {
        return acc;
      }
      return {
        ...acc,
        [k]: property,
      };
    }, {});

    allContent = {
      ...allContent,
      [newObj[key]]: {
        ...newObj,
      },
    };
  });

  return allContent;
}

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

export const getMonth = (date: any) => months[date.getMonth()];

export const containsObject = (obj: any, list: any) => {
  let i;
  for (i = 0; i < list.length; i++) {
    if (list[i].slug === obj.slug) {
      return i;
    }
  }

  return -1;
};

export const shuffleArray = (array: any) => {
  const newArr = array.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

export const hasKey = (obj: any, key: any) => !!Object.prototype.hasOwnProperty.call(obj, key);

export const isEmpty = (obj: any) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
};

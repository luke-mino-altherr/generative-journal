export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

export const pageview = (url: string) => {
  (window as any).gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Enhanced event tracking with better typing
export interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export const event = (eventData: GAEvent) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventData.action, {
      event_category: eventData.category,
      event_label: eventData.label,
      value: eventData.value,
      ...eventData.custom_parameters,
    });
  }
};

// Specific tracking functions for common actions
export const trackOutboundLink = (url: string, label?: string) => {
  event({
    action: 'click',
    category: 'outbound_link',
    label: label || url,
    custom_parameters: {
      link_url: url,
    },
  });
};

export const trackSocialClick = (platform: string, url: string) => {
  event({
    action: 'click',
    category: 'social',
    label: platform,
    custom_parameters: {
      link_url: url,
      social_platform: platform,
    },
  });
};

export const trackDrawingView = (drawingSlug: string, title: string) => {
  event({
    action: 'view_item',
    category: 'drawing',
    label: drawingSlug,
    custom_parameters: {
      item_id: drawingSlug,
      item_name: title,
      content_type: 'generative_art',
    },
  });
};

export const trackNavigationClick = (destination: string) => {
  event({
    action: 'click',
    category: 'navigation',
    label: destination,
  });
};

export const trackContactClick = (method: string) => {
  event({
    action: 'contact',
    category: 'engagement',
    label: method,
  });
};

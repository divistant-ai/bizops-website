import React from 'react';

export function transformContent(data: any) {
  if (!data) {
    return null;
  }

  // Shallow clone
  const transformed = { ...data };

  // Helper to serialize icon
  const serializeIcon = (icon: any, className: string) => {
    if (!icon) {
      return null;
    }
    if (typeof icon === 'string') {
      return icon;
    } // URL or name
    if (React.isValidElement(icon)) {
      return icon;
    } // Already JSX

    // Assume Component (Function or ForwardRef Object)
    try {
      return React.createElement(icon, { className });
    } catch (e) {
      return null;
    }
  };

  // 1. Hero Icon
  if (transformed.icon) {
    transformed.icon = serializeIcon(transformed.icon, 'w-8 h-8');
  }

  // Helper for lists
  const processList = (list: any[], iconClass = 'w-7 h-7') => {
    if (!Array.isArray(list)) {
      return [];
    }
    return list.map((item: any) => {
      // Create a new item object to avoid mutating original nested objects if reused
      const newItem = { ...item };
      if (newItem.icon) {
        newItem.icon = serializeIcon(newItem.icon, iconClass);
      }
      return newItem;
    });
  };

  // 2. Features / Solutions
  if (transformed.features) {
    transformed.features = processList(transformed.features);
  }
  if (transformed.solutions) {
    transformed.solutions = processList(transformed.solutions);
  }

  // 3. Problems -> Challenges
  if (transformed.problems) {
    transformed.challenges = processList(transformed.problems);
    delete transformed.problems; // Remove unsafe data
  } else if (transformed.challenges) {
    transformed.challenges = processList(transformed.challenges);
  }

  // 4. Services Mapping (ServicesData)
  // Maps specific service fields to generic template props
  if (data.methodology) {
    transformed.features = processList(data.methodology);
    transformed.featuresTitle = 'Methodology';
    transformed.featuresSubtitle = 'Pendekatan terstruktur untuk hasil maksimal.';
    delete transformed.methodology;
  }

  if (data.benefits) {
    // Map Benefits to Challenges section (visually acts as a list of key points)
    // We override the title to "Key Benefits"
    transformed.challenges = processList(data.benefits);
    transformed.challengesTitle = 'Key Benefits';
    transformed.challengesSubtitle = 'Nilai tambah yang langsung Anda rasakan.';
    delete transformed.benefits;
  }

  if (data.deliverables) {
    // Map Deliverables to ListSection
    transformed.listSection = {
      title: 'Deliverables',
      items: data.deliverables, // It's an array of strings, safe to pass
    };
    delete transformed.deliverables;
  }

  if (typeof data.cta === 'string') {
    transformed.cta = {
      btn: data.cta,
      head: 'Siap Memulai Proyek?',
    };
  }

  return transformed;
}

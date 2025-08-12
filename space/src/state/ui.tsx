// state/ui.ts
'use client';
import { proxy } from 'valtio';

export type PanelName = 'Home' | 'About Me' | 'Experience' | 'Projects' | 'Other' | null;

export const ui = proxy({
  panel: null as PanelName,
  nextPanel: null as PanelName,
  isTransitioning: false,
  // Top status bar content for planet hover
  hoverTitle: '' as string,
  hoverSubtitle: '' as string,
});

export const onCloseAndSwitch = (section: PanelName) => {
    if (ui.panel === section) return;  // If clicking the same panel, do nothing.
    ui.isTransitioning = true
    if (ui.panel === null) {
      ui.panel = section
    } else {
      ui.nextPanel = section;
      ui.panel = null;  // Trigger exit animation first.
    }
}

export const closePanel = () => {
  ui.isTransitioning = true
  ui.panel = null;
};

export const handleExitComplete = () => {
  if (ui.nextPanel) {
    ui.panel = ui.nextPanel;
    ui.nextPanel = null
  }
  ui.isTransitioning = false
}

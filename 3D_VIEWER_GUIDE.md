# 3D Viewer with 360° Rotation Guide

## Overview

The configurator now includes an interactive 3D viewer with 360-degree rotation capabilities. The 3D model updates in real-time based on your configuration selections.

## Features

### ✅ 360° Rotation
- **Auto-rotate**: Automatically rotates when a model is selected
- **Manual control**: Drag to rotate, scroll to zoom, right-click to pan
- **Toggle rotation**: Pause/play button to control auto-rotation

### ✅ Interactive 3D Model
- **Real-time updates**: Model changes based on selected modules and materials
- **Visual feedback**: Hover effects on interactive elements
- **Material colors**: Updates based on your material selections
- **Module visibility**: Shows/hides modules based on your selections

### ✅ Controls
- **Orbit Controls**: Full 360° rotation in all directions
- **Zoom**: Scroll wheel to zoom in/out
- **Pan**: Right-click and drag to pan
- **Auto-rotate toggle**: Start/pause automatic rotation
- **Control visibility**: Show/hide control instructions

## How It Works

### 1. Model Selection
When you select a kitchen model in Step 1, the 3D viewer displays the base structure.

### 2. Module Selection
As you add modules in Step 2:
- **Grill**: Appears on the left side
- **Sink**: Appears on the right side
- **Storage**: Side cabinets appear
- **Prep Station**: Extended countertop area
- **Refrigerator**: Standalone unit on the right

### 3. Material Selection
In Step 3, material selections update the 3D model colors:
- **Cabinets**: Base cabinet color
- **Countertop**: Countertop surface color
- **Accents**: Detail trim color

## Controls

### Mouse/Trackpad
- **Left-click + Drag**: Rotate the model 360°
- **Scroll**: Zoom in/out
- **Right-click + Drag**: Pan the view
- **Hover**: Highlight interactive elements

### On-Screen Controls
- **Pause/Start Rotation**: Toggle auto-rotation
- **Hide/Show Controls**: Toggle instruction panel

## Technical Details

### Libraries Used
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Helpful utilities and controls
- **three**: Core 3D library

### Performance
- Optimized rendering with shadows
- Environment lighting for realistic appearance
- Responsive design for all screen sizes

## Customization

### Adjust Rotation Speed
In `components/Kitchen3DViewer.tsx`:
```typescript
<Kitchen3DViewer
  rotationSpeed={0.5} // Change this value (0.1 - 2.0)
/>
```

### Change Auto-Rotate
```typescript
<Kitchen3DViewer
  autoRotate={true} // Set to false to disable
/>
```

### Add More Modules
Edit the `KitchenModel` component in `Kitchen3DViewer.tsx` to add more 3D elements based on module selections.

## Future Enhancements

Potential improvements:
- Load actual 3D model files (GLTF/GLB)
- Add texture mapping for materials
- Animate module additions/removals
- Add measurement tools
- Export 3D view as image

## Troubleshooting

### 3D Viewer Not Loading
- Check browser console for errors
- Ensure all dependencies are installed: `npm install`
- Try refreshing the page

### Performance Issues
- Reduce rotation speed
- Disable auto-rotate
- Close other browser tabs

### Controls Not Working
- Check if controls are enabled (show controls button)
- Try clicking on the 3D canvas first
- Check browser compatibility (modern browsers required)

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ⚠️ Older browsers may have limited support


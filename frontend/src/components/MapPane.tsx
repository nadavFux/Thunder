import React, { useEffect, useRef, useState, useMemo } from 'react';
import MapGL from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import DeckGL from '@deck.gl/react';
import { MapViewState } from '@deck.gl/core';
import { HybridSatelliteLayer } from '../layers/HybridSatelliteLayer';
import { useItemStore } from '../store/itemStore';
import { useLayoutStore } from '../store/layoutStore';
import { useHotkeys } from 'react-hotkeys-hook';

export const MapPane: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<MapGL.Map | null>(null);
  
  const { isAnalysisMode, toggleAnalysisMode } = useLayoutStore();
  const { activeItemId, draSettings, updateDRA, resetDRA, setActiveItem } = useItemStore();

  const [viewState, setViewState] = useState<MapViewState>({
    longitude: 13.4050, latitude: 52.5200, zoom: 12, pitch: 0, bearing: 0
  });

  // Default item setup for testing (Berlin)
  const SAMPLE_ID = 'S2B_33UUT_20260415_0_L2A';
  useEffect(() => { setActiveItem(SAMPLE_ID); }, [setActiveItem]);

  const activeDRA = useMemo(() => {
    return activeItemId && draSettings[activeItemId] 
      ? draSettings[activeItemId] 
      : { contrast: 1.0, brightness: 0.0, gamma: 1.0 };
  }, [activeItemId, draSettings]);

  // Expert Hotkeys
  useHotkeys('h', toggleAnalysisMode, { enableOnFormTags: true });
  useHotkeys('[', () => activeItemId && updateDRA(activeItemId, { contrast: Math.max(0.1, activeDRA.contrast - 0.1) }));
  useHotkeys(']', () => activeItemId && updateDRA(activeItemId, { contrast: Math.min(5.0, activeDRA.contrast + 0.1) }));
  useHotkeys('0', () => activeItemId && resetDRA(activeItemId));

  useEffect(() => {
    if (map.current || !mapContainer.current) return;
    map.current = new MapGL.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      interactive: false,
    });
    return () => { map.current?.remove(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLossless = useMemo(() => {
    return viewState.zoom >= 14 || isAnalysisMode;
  }, [viewState.zoom, isAnalysisMode]);

  const layers = useMemo(() => {
    if (!activeItemId) return [];

    return [
      new HybridSatelliteLayer({
        id: `hybrid-satellite-${activeItemId}`,
        collection: 'sentinel-2-l2a',
        itemId: activeItemId,
        isLossless,
        // Request standard WebP for discovery, or Lossless WebP for analysis
        data: [`http://localhost:8082/collections/sentinel-2-l2a/items/${activeItemId}/WebMercatorQuad/tiles/{z}/{x}/{y}@1x?assets=visual&lossless=${isLossless}`],
        contrast: activeDRA.contrast,
        brightness: activeDRA.brightness,
        gamma: activeDRA.gamma,
        updateTriggers: {
          // Re-fetch data only when lossless mode toggles
          data: [isLossless],
          // Sub-layers need to update uniforms when DRA params change
          renderSubLayers: [activeDRA.contrast, activeDRA.brightness, activeDRA.gamma]
        }
      })
    ];
  }, [activeItemId, isLossless, activeDRA]);

  return (
    <div className="w-full h-full relative bg-black">
      <div ref={mapContainer} className="absolute inset-0" />
      <DeckGL
        viewState={viewState}
        onViewStateChange={(e: any) => {
          const nextViewState = e.viewState;
          setViewState(nextViewState);
          map.current?.jumpTo({
            center: [nextViewState.longitude, nextViewState.latitude],
            zoom: nextViewState.zoom, bearing: nextViewState.bearing, pitch: nextViewState.pitch
          });
        }}
        controller={true}
        layers={layers}
        getCursor={() => 'crosshair'}
      />
    </div>
  );
};

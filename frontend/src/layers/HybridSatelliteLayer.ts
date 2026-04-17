import { TileLayer } from '@deck.gl/geo-layers';
import type { TileLayerProps } from '@deck.gl/geo-layers';
import { BitmapLayer } from '@deck.gl/layers';
import type { BitmapLayerProps } from '@deck.gl/layers';
import type { UpdateParameters } from '@deck.gl/core';

export interface HybridSatelliteLayerProps extends TileLayerProps {
  collection: string;
  itemId: string;
  isLossless: boolean;
  contrast?: number;
  brightness?: number;
  gamma?: number;
}

interface DRABitmapLayerProps extends BitmapLayerProps {
  contrast?: number;
  brightness?: number;
  gamma?: number;
}

/**
 * Internal BitmapLayer that applies DRA via fragment shader.
 */
class DRABitmapLayer extends BitmapLayer<DRABitmapLayerProps> {
  static layerName = 'DRABitmapLayer';

  getShaders() {
    const shaders = super.getShaders();
    return {
      ...shaders,
      inject: {
        'fs:#decl': `
          uniform float contrast;
          uniform float brightness;
          uniform float invGamma;
        `,
        'fs:deckgl-raster-color': `
          // Apply contrast and brightness around the 0.5 midpoint
          color.rgb = (color.rgb - 0.5) * contrast + 0.5 + brightness;
          
          // Apply gamma correction (pre-clamped to avoid negative values)
          color.rgb = max(vec3(0.0), color.rgb);
          color.rgb = pow(color.rgb, vec3(invGamma));
        `
      }
    };
  }

  updateState(params: UpdateParameters<this>) {
    super.updateState(params);
    const { props, changeFlags } = params;

    if (changeFlags.propsChanged && this.state.model) {
      const { contrast = 1.0, brightness = 0.0, gamma = 1.0 } = props;
      
      (this.state.model as any).setUniforms({
        contrast,
        brightness,
        invGamma: 1.0 / Math.max(0.01, gamma)
      });
    }
  }
}

/**
 * Expert Satellite Layer that manages discovery (8-bit) and 
 * analysis (Lossless) data fetching with client-side DRA.
 */
export class HybridSatelliteLayer extends TileLayer<unknown, HybridSatelliteLayerProps> {
  static layerName = 'HybridSatelliteLayer';

  renderSubLayers(props: any) {
    const {
      bbox: { west, south, east, north }
    } = props.tile;

    const { contrast, brightness, gamma } = this.props;

    return new DRABitmapLayer(props as unknown as DRABitmapLayerProps, {
      id: `${props.id}-dra`,
      data: undefined,
      image: props.data,
      bounds: [west, south, east, north],
      contrast,
      brightness,
      gamma,
      updateTriggers: {
        // Optimization: Sub-layer only updates uniforms when these change
        contrast,
        brightness,
        gamma
      }
    });
  }
}

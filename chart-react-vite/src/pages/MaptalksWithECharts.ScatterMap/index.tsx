import { useEffect } from 'react';
import { Map, TileLayer } from 'maptalks';
import { E4Layer } from './maptalksE4';
import type { EChartsOption } from 'echarts';

export function MapScatter() {
  useEffect(() => {
    const map = new Map('map', {
      center: [120.13066322374, 30.240018034923],
      zoom: 14,
    });

    const tileLayer = new TileLayer('base', {
      urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      subdomains: ['a', 'b', 'c', 'd'],
    });

    map.addLayer(tileLayer);

    const data = [
      {
        coord: [120.13066322374, 30.240018034923],
        value: [120.13066322374, 30.240018034923, 800],
      },
      {
        coord: [120.14280555506, 30.23633761213],
        value: [120.14280555506, 30.23633761213, 500],
      },
      {
        coord: [120.13413680453, 30.232112168844],
        value: [120.13413680453, 30.232112168844, 300],
      },
      {
        coord: [120.16768945362, 30.260492843279],
        value: [120.16768945362, 30.260492843279, 600],
      },
      {
        coord: [120.17188256162, 30.243300457669],
        value: [120.17188256162, 30.243300457669, 700],
      },
    ];

    const ecOption: EChartsOption = {
      animation: true,
      maptalks2D: {},
      visualMap: {
        show: false,
        top: 'top',
        min: 0,
        max: 5,
        seriesIndex: 0,
        calculable: true,
        inRange: {
          color: ['blue', 'blue', 'green', 'yellow', 'red'],
        },
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          type: 'effectScatter',
          coordinateSystem: 'maptalks2D',
          data: data,
          name: 'Top 5',
          // blurSize: 6,
          symbolSize: function (val) {
            return val[2] / 10;
          },
          encode: {
            value: 2,
          },
          showEffectOn: 'render',
          // rippleEffect: {
          //   brushType: 'stroke',
          // },
          // label: {
          //   formatter: '{b}',
          //   position: 'right',
          //   show: false,
          // },
          // itemStyle: {
          //   shadowBlur: 10,
          //   shadowColor: '#333',
          // },
          // emphasis: {
          //   label: {
          //     show: true,
          //   },
          // },
          zlevel: 1,
        },
      ],
    };

    const e4Layer = new E4Layer('e4', ecOption, {
      hideOnZooming: false,
      hideOnRotating: false,
      hideOnMoving: false,
      removeBaseLayer: true,
    }).addTo(map);

    e4Layer._renderer._ec.on('click', (...rest) => {
      console.log(rest);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <div id="map" style={{ width: '100%', height: '100%' }} />
    </>
  );
}

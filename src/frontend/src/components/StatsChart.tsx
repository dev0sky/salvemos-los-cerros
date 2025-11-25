import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import type { BarChartData, PieChartData } from '@/types';

interface BarChartProps {
  data: BarChartData[];
  keys: string[];
  indexBy: string;
}

interface PieChartProps {
  data: PieChartData[];
}

const CHART_THEME = {
  text: {
    fill: '#4A3B30',
    fontSize: 12,
  },
  axis: {
    ticks: {
      text: {
        fill: '#70625A',
      }
    }
  },
  grid: {
    line: {
      stroke: '#E0D8D0',
      strokeWidth: 1,
    }
  }
};

const BAR_COLORS = { scheme: 'brown_blueGreen' } as const;
const PIE_COLORS = { scheme: 'brown_blueGreen' } as const;

export const BarChart: React.FC<BarChartProps> = ({ data, keys, indexBy }) => {
  return (
    <div className="h-80 w-full">
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        colors={BAR_COLORS}
        borderRadius={8}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#FDF5E6"
        theme={CHART_THEME}
        animate={true}
        motionConfig="gentle"
      />
    </div>
  );
};

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <div className="h-80 w-full">
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={PIE_COLORS}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#4A3B30"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#FDF5E6"
        theme={CHART_THEME}
        animate={true}
        motionConfig="gentle"
      />
    </div>
  );
};

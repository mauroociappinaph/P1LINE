import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TelemetryPoint } from '../types';

interface TelemetryChartProps {
  data: any[];
  color: string;
  label: string;
  dataKey: string;
}

export const TelemetryChart = React.memo(({ data, color, label, dataKey }: TelemetryChartProps) => {
  return (
    <div className="h-48 w-full">
      <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-mono">{label}</p>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${label}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis dataKey="time" hide />
          <YAxis hide domain={['auto', 'auto']} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
            labelStyle={{ display: 'none' }}
          />
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            fillOpacity={1} 
            fill={`url(#gradient-${label})`} 
            strokeWidth={2}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

TelemetryChart.displayName = 'TelemetryChart';

'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { day: 'Mon', adherence: 95, date: '2024-01-15' },
  { day: 'Tue', adherence: 100, date: '2024-01-16' },
  { day: 'Wed', adherence: 85, date: '2024-01-17' },
  { day: 'Thu', adherence: 100, date: '2024-01-18' },
  { day: 'Fri', adherence: 90, date: '2024-01-19' },
  { day: 'Sat', adherence: 100, date: '2024-01-20' },
  { day: 'Sun', adherence: 95, date: '2024-01-21' },
];

export function AdherenceChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            className="text-xs"
          />
          <YAxis 
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            className="text-xs"
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-medium">{label}</p>
                    <p className="text-green-600">
                      Adherence: {payload[0].value}%
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line 
            type="monotone" 
            dataKey="adherence" 
            stroke="#10B981" 
            strokeWidth={3}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
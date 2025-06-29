// src/components/dashboard/StorageUsageChart.tsx
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const data = [
  { name: 'Google Drive', value: 55, color: '#facc15' }, // yellow-400
  { name: 'One Drive', value: 24, color: '#60a5fa' },   // blue-400
  { name: 'Mega Drive', value: 18, color: '#f472b6' },   // pink-400
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="font-bold">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export const StorageUsageChart = () => (
    <div className="relative w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    innerRadius="70%"
                    outerRadius="100%"
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-4xl font-bold text-slate-800">77%</span>
        </div>
    </div>
);
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// Цвета: темно-зеленый и светло-зеленый
const PIE_COLORS = ['#4C7745', '#8DDD80'];

const CompanyPieChart = ({ stressedPercent, noStressPercent, employeeCount, stressedCount, noStressCount }) => {
  const pieData = [
    { name: 'В стрессе', value: stressedPercent },
    { name: 'Без стресса', value: noStressPercent },
  ];

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Процентное соотношение сотрудников
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PieChart width={220} height={220}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            isAnimationActive={false}
            // Не показываем подписи на самой диаграмме
            label={false}
          >
            {PIE_COLORS.map((color, index) => (
              <Cell key={`cell-${index}`} fill={color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
        </PieChart>
        {/* Блок справа от диаграммы */}
        <Box sx={{ ml: 4, minWidth: 180 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>Всего сотрудников:</b> {employeeCount}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ width: 16, height: 16, bgcolor: PIE_COLORS[0], borderRadius: '50%', mr: 1 }} />
            <Typography variant="body2">
              <b>В стрессе:</b> {stressedCount} ({stressedPercent.toFixed(1)}%)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 16, height: 16, bgcolor: PIE_COLORS[1], borderRadius: '50%', mr: 1 }} />
            <Typography variant="body2">
              <b>Без стресса:</b> {noStressCount} ({noStressPercent.toFixed(1)}%)
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default CompanyPieChart;